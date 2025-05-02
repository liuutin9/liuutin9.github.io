import matplotlib.pyplot as plt

def plot_loss_f1(num_epochs, train_losses, val_losses, val_f1_scores):
    plt.figure(figsize=(12, 5))
    plt.subplot(1, 2, 1)
    plt.plot(range(1, num_epochs + 1), train_losses, label='Train Loss')
    plt.plot(range(1, num_epochs + 1), val_losses, label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Loss Curve')
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(range(1, num_epochs + 1), val_f1_scores, label='Validation F1', color='green')
    plt.xlabel('Epoch')
    plt.ylabel('F1 Score')
    plt.title('Validation F1 Curve')
    plt.legend()
    
    plt.tight_layout()
    plt.savefig('neural_network/loss_f1_curve.png')