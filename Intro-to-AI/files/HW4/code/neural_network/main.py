print('Importing modules...')
import torch
import numpy as np
import pandas as pd
import argparse
import time
from neural_network.model import BinaryClassifier, train_model
from neural_network.loader import load_data
print('Modules imported!')

# Use GPU if available
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f'Using device: {device}')

parser = argparse.ArgumentParser(description='XGBoost model training and prediction')
parser.add_argument('-v', '--validate', action='store_true', help="Enable validation mode")
parser.add_argument('-o', '--data_optim', type=str, default='extreme', choices=['extreme', 'basic', 'none'], help="Data optimization method")
args = parser.parse_args()
data_optim = args.data_optim
val_flag = args.validate
print(f'Validation mode: {val_flag}')

batch_size = 32
train_loader, val_loader, test_loader, features_size, pos_weight = load_data(batch_size, data_optim, val_flag)

hyperparams = {
    'num_epochs': 50,
    'learning_rate': 0.001,
    'decay_step': 12,
    'decay_rate': 0.3,
    'val_flag': val_flag,
}

model = BinaryClassifier(features_size)
print('====== Model Infromation ======')
print(model)
print('======== Model summary ========')
print(f'Feature size: {features_size}')
print(f'Batch size: {batch_size}')
print(f'Pos weight: {pos_weight:.4f}')
print('Hyperparameters summary:')
print(f'Num epochs: {hyperparams["num_epochs"]}')
print(f'Learning rate: {hyperparams["learning_rate"]}')
print(f'Decay step: {hyperparams["decay_step"]}')
print(f'Decay rate: {hyperparams["decay_rate"]}')
print(f'Data optimization: {data_optim}')
print(f'Validation flag: {hyperparams["val_flag"]}')
print('===============================')

print('Training model...')
start_time = time.time()
train_model(model, train_loader, val_loader, pos_weight, device, **hyperparams)
end_time = time.time()
print(f'Training time: {end_time - start_time:.2f} seconds')
print('Model trained!')

print('Predicting...')
model.eval()
predictions = []
start_time = time.time()
with torch.no_grad():
    for inputs in test_loader:
        inputs = inputs[0].to(device)
        outputs = model(inputs).squeeze()
        probs = torch.sigmoid(outputs)
        preds = (probs >= 0.5).int()
        predictions.append(preds.cpu())
end_time = time.time()
print(f'Test prediction time: {end_time - start_time:.2f} seconds')
print('Prediction done!')

print('Saving predictions...')
predictions = torch.cat(predictions).numpy()
submission = pd.DataFrame({'index': np.arange(len(predictions)), 'target': predictions})
submission.to_csv('output/submission_nn.csv', index=False)
print('Test prediction saved to submission_nn.csv!')
