import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
import argparse
import time
from sklearn.metrics import f1_score
from decision_tree.loader import load_data
from decision_tree.plot import plot_feature_importance

parser = argparse.ArgumentParser(description='Decision Tree model training and prediction')
parser.add_argument('-v', '--validate', action='store_true', help="Enable validation mode")
val_flag = parser.parse_args().validate
print(f'Validation mode: {val_flag}')

X_train, y_train, X_val, y_val, test_X, scale_pos_weight = load_data(val_flag)

dt = DecisionTreeClassifier(class_weight={0: 1.0, 1: scale_pos_weight})

print('Training Decision Tree model...')
start_time = time.time()
dt.fit(X_train, y_train)
end_time = time.time()
print(f'Training time: {end_time - start_time:.2f} seconds')
print('Model trained!')

if val_flag:
    y_val_pred = dt.predict(X_val)
    val_f1 = f1_score(y_val, y_val_pred)
    print(f'Validation F1 Score: {val_f1:.4f}')

print('Predicting test set...')
start_time = time.time()
test_preds = dt.predict(test_X)
end_time = time.time()
print(f'Test prediction time: {end_time - start_time:.2f} seconds')
print('Prediction done!')

submission = pd.DataFrame({'index': np.arange(len(test_preds)), 'target': test_preds.astype(int)})
submission.to_csv('output/submission_dt.csv', index=False)
print('Test prediction saved to submission_dt.csv!')

importances = dt.feature_importances_
plot_feature_importance(importances)
