# HW4: Machine Learning

**NTHU CS460100 – Spring 2025**  
**Introduction to Artificial Intelligence**

## Project Structure

```
project_root/
├── data_csv/               # Raw CSV data
├── data_npy/               # Processed data (output from data_processor.py)
├── decision_tree/          # Decision tree model implementation
├── neural_network/         # Neural network model implementation
├── output/                 # Predictions on the test set
├── preprocess/             # Data preprocess implementation
├── XGBoost/                # XGBoost model implementation
└── README.md               # Project documentation
```

## How to Use

### 1. Preprocess the Data

Run the following command to handle outliers and convert raw CSV files into `.npy` format:

```console
python -m preprocess.data_processor
```

### 2. Train the Model and Make Predictions

#### Neural Network

```console
python -m neural_network.main                        # Run training and prediction
python -m neural_network.main -v                     # Enable validation mode
python -m neural_network.main -o [none|basic|optim]  # Select data optimization mode
```

- `-v`: Enable validation mode  
- `-o`: Data optimization mode, options:
  - `none`: No optimization
  - `basic`: Basic optimization
  - `optim`: Optimized strategy

#### XGBoost

```console
python -m XGBoost.main                        # Run training and prediction
python -m XGBoost.main -v                     # Enable validation mode
python -m XGBoost.main -o [none|basic|optim]  # Select data optimization mode
```

- `-v`: Enable validation mode  
- `-o`: Data optimization mode, options:
  - `none`: No optimization
  - `basic`: Basic optimization
  - `optim`: Optimized strategy

#### Decision Tree

```console
python -m decision_tree.main              # Run training and prediction
python -m decision_tree.main -v           # Enable validation mode
```