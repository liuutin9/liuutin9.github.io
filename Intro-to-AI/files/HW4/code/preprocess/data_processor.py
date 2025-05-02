print('Importing modules...')
import numpy as np
import pandas as pd
import os
print('Modules imported!')

print('Loading data...')
training_data = pd.read_csv('data_csv/train.csv').to_numpy()
testing_data = pd.read_csv('data_csv/test.csv').to_numpy()
print('Data loaded!')

print('Deleting outliers...')
np_training_data = training_data[:, 1:]
np_raw_test_X = testing_data[:, 1:]

x_lower_bound = np_raw_test_X.min(axis=0, keepdims=True)
x_upper_bound = np_raw_test_X.max(axis=0, keepdims=True)

x_q1 = np.percentile(np_raw_test_X, 25, axis=0, keepdims=True)
x_q3 = np.percentile(np_raw_test_X, 75, axis=0, keepdims=True)
x_qd = x_q3 - x_q1

# x_upper_bound = x_q3 + 1.5 * x_qd
# x_lower_bound = x_q1 - 1.5 * x_qd

discrete_features = [8, 25, 33, 36]

# Preprocess continuous features and use min/max to remove outliers
valid_np_training_data = []
for i in range(np_training_data.shape[0]):
    flag = True
    for j in range(36):
        if j not in discrete_features and np_training_data[i, j] < x_lower_bound[0, j] or np_training_data[i, j] > x_upper_bound[0, j]:
            flag = False
            break
    if flag:
        valid_np_training_data.append(np_training_data[i])
        
np_training_data = np.array(valid_np_training_data)
print(f'new_np_training_data shape: {np_training_data.shape}')
print('Outliers deleted!')

# Save to test.npy and train.npy
os.makedirs('data_npy', exist_ok=True)
np.save('data_npy/train.npy', np_training_data)
np.save('data_npy/test.npy', np_raw_test_X)
print('Processed data is saved in "data_npy/"')