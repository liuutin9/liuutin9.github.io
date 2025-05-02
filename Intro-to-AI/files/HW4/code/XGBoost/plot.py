import matplotlib.pyplot as plt

def plot_feature_importance(importances): 
    plt.figure(figsize=(10, 6))
    plt.bar(range(len(importances)), importances)
    plt.xlabel('Feature Index')
    plt.ylabel('Importance')
    plt.title('Feature Importances (XGBoost)')
    plt.tight_layout()
    plt.savefig('XGBoost/feature_importance_xgb.png')
    print('Feature importance plot saved to feature_importance_xgb.png!')