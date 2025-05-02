import numpy as np
from sklearn.model_selection import train_test_split

def load_data(data_optim, val_flag:bool=True):
    print('Loading data...')
    training_data = np.load('data_npy/train.npy')
    testing_data = np.load('data_npy/test.npy')

    raw_X = training_data[:, :-1]
    y = training_data[:, -1]
    raw_test_X = testing_data[:, :]

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

    if val_flag:
        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=0.2, shuffle=True
        )
    else:
        X_train = X
        y_train = y
        X_val = None
        y_val = None

    num_pos = np.sum(y == 1)
    num_neg = np.sum(y == 0)
    scale_pos_weight = num_neg / num_pos
    
    return X_train, y_train, X_val, y_val, test_X, scale_pos_weight