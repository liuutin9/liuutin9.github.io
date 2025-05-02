import matplotlib.pyplot as plt

def plot_feature_importance(importances): 
    plt.figure(figsize=(10, 6))
    plt.bar(range(len(importances)), importances)
    plt.xlabel('Feature Index')
    plt.ylabel('Importance')
    plt.title('Feature Importances (Decision Tree)')
    plt.tight_layout()
    plt.savefig('decision_tree/feature_importance_dt.png')
    print('Feature importance plot saved to feature_importance_dt.png!')