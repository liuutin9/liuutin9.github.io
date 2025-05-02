import numpy as np
import torch
from torch.utils.data import DataLoader, TensorDataset, random_split

def load_data(batch_size, data_optim, val_flag):
    
    training_data = np.load('data_npy/train.npy')
    testing_data = np.load('data_npy/test.npy')

    raw_X = torch.tensor(training_data[:, :-1], dtype=torch.float32)
    y = torch.tensor(training_data[:, -1], dtype=torch.float32)
    raw_test_X = torch.tensor(testing_data[:, :], dtype=torch.float32)

    # Z-score normalization on continuous features
    print('Normalizing data...')
    discrete_features = [8, 25, 33, 36]
    for i in range(36):
        if i not in discrete_features:
            mean = raw_X[:, i].mean()
            std = raw_X[:, i].std()
            # Avoid division by zero
            if std == 0:
                std = 1.0
            raw_X[:, i] = (raw_X[:, i] - mean) / std
            raw_test_X[:, i] = (raw_test_X[:, i] - mean) / std

    print('Data normalized!')

    if data_optim == 'extreme':
        optim_col = [2, 10, 13, 15, 17, 19, 20, 23, 29, 31, 32, 34]
        raw_X = raw_X[:, optim_col]
        raw_test_X = raw_test_X[:, optim_col]
    elif data_optim == 'basic':
        raw_X = raw_X[:, :36]
        raw_test_X = raw_test_X[:, :36]
    elif data_optim == 'none':
        raw_X = raw_X
        raw_test_X = raw_test_X

    X = raw_X
    test_X = raw_test_X

    dataset = TensorDataset(X, y)
    test_dataset = TensorDataset(test_X)

    # 80% train, 20% validation
    if val_flag:
        train_size = int(0.8 * len(dataset))
        val_size = len(dataset) - train_size
        train_dataset, val_dataset = random_split(dataset, [train_size, val_size])
        
    # 100% train, no validation
    else:
        train_dataset = dataset
        val_dataset = None

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)
    if val_flag:
        val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
    else:
        val_loader = None

    pos_weight = (y == 0).sum() / (y == 1).sum()
    
    return train_loader, val_loader, test_loader, X.shape[1], pos_weight