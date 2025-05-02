import torch
import torch.nn as nn
import torch.optim as optim
import torchmetrics
from neural_network.plot import plot_loss_f1

class BinaryClassifier(nn.Module):
    def __init__(self, input_size):
        super(BinaryClassifier, self).__init__()
        self.model = nn.Sequential(
            nn.Linear(input_size, 48),
            nn.ReLU(),
            nn.BatchNorm1d(48),
            nn.Dropout(0.2),
            
            nn.Linear(48, 24),
            nn.ReLU(),
            nn.BatchNorm1d(24),
            nn.Dropout(0.2),
            
            nn.Linear(24, 12),
            nn.ReLU(),
            nn.BatchNorm1d(12),
            nn.Dropout(0.2),

            nn.Linear(12, 1)
        )

    def forward(self, x):
        return self.model(x)
    
def train_model(model:BinaryClassifier, train_loader, val_loader, pos_weight, device, num_epochs, learning_rate, decay_step, decay_rate, val_flag):
    pos_weight = pos_weight.clone().detach().to(device)
    criterion = nn.BCEWithLogitsLoss(pos_weight=pos_weight)
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    # optimizer = optim.AdamW(model.parameters(), lr=learning_rate, weight_decay=1e-4)
    scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=decay_step, gamma=decay_rate)

    model.to(device)
    criterion.to(device)

    f1_metric = torchmetrics.classification.BinaryF1Score().to(device)

    train_losses = []
    val_losses = []
    val_f1_scores = []

    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        for inputs, labels in train_loader:
            inputs = inputs.to(device)
            labels = labels.to(device)

            optimizer.zero_grad()
            outputs = model(inputs).squeeze()
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()

        scheduler.step()

        # Validation
        if val_flag:
            model.eval()
            val_loss = 0.0
            preds_list = []
            labels_list = []
            
            with torch.no_grad():
                for inputs, labels in val_loader:
                    inputs = inputs.to(device)
                    labels = labels.to(device)

                    outputs = model(inputs).squeeze()
                    loss = criterion(outputs, labels)
                    val_loss += loss.item()

                    probs = torch.sigmoid(outputs)
                    preds = (probs >= 0.5).int()
                    preds_list.append(preds)
                    labels_list.append(labels)

            # Record losses
            train_losses.append(running_loss / len(train_loader))
            val_losses.append(val_loss / len(val_loader))

            # Calculate F1 score
            preds_tensor = torch.cat(preds_list)
            labels_tensor = torch.cat(labels_list)
            f1 = f1_metric(preds_tensor, labels_tensor).item()
            val_f1_scores.append(f1)

            print(f'Epoch [{epoch+1}/{num_epochs}], Train Loss: {train_losses[-1]:.4f}, Val Loss: {val_losses[-1]:.4f}, Val F1: {f1:.4f}')
        else:
            train_losses.append(running_loss / len(train_loader))
            val_losses.append(0.0)
            val_f1_scores.append(0.0)
            print(f'Epoch [{epoch+1}/{num_epochs}], Train Loss: {train_losses[-1]:.4f}')
    
    if val_flag:
        print(f'Validation F1 Score: {val_f1_scores[-1]:.4f}')
    plot_loss_f1(num_epochs, train_losses, val_losses, val_f1_scores)