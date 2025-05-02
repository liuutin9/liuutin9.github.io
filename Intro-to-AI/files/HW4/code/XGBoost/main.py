import pandas as pd
import numpy as np
from xgboost import XGBClassifier
import argparse
import time
from sklearn.metrics import f1_score
from XGBoost.loader import load_data
from XGBoost.plot import plot_feature_importance

parser = argparse.ArgumentParser(description='XGBoost model training and prediction')
parser.add_argument('-v', '--validate', action='store_true', help="Enable validation mode")
parser.add_argument('-o', '--data_optim', type=str, default='extreme', choices=['extreme', 'basic', 'none'], help="Data optimization method")
args = parser.parse_args()
data_optim = args.data_optim
val_flag = args.validate
print(f'Validation mode: {val_flag}')

X_train, y_train, X_val, y_val, test_X, scale_pos_weight = load_data(data_optim, val_flag)

hyperparams = {
    'scale_pos_weight': scale_pos_weight,
    'eval_metric': 'auc',
}

xgb = XGBClassifier(**hyperparams, n_jobs=-1)

print('======== Model summary ========')
print(f'Feature size: {X_train.shape[1]}')
print(f'Pos weight: {scale_pos_weight:.4f}')
print('===============================')

print('Training XGBoost model...')
start_time = time.time()
xgb.fit(X_train, y_train)
end_time = time.time()
print(f'Training time: {end_time - start_time:.2f} seconds')
print('Model trained!')

if val_flag:
    y_val_pred = xgb.predict(X_val)
    val_f1 = f1_score(y_val, y_val_pred)
    print(f'Validation F1 Score: {val_f1:.4f}')

print('Predicting test set...')
start_time = time.time()
test_preds = xgb.predict(test_X)
end_time = time.time()
print(f'Test prediction time: {end_time - start_time:.2f} seconds')
print('Prediction done!')

# 存成 CSV
submission = pd.DataFrame({'index': np.arange(len(test_preds)), 'target': test_preds})
submission.to_csv('output/submission_xgb.csv', index=False)
print('Test prediction saved to submission_xgb.csv!')

# Feature importance
importances = xgb.feature_importances_
plot_feature_importance(importances)
