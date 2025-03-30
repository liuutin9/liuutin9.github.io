# script.py - Python 代碼文件
import numpy as np
import matplotlib.pyplot as plt

def calculate_statistics(data):
    """計算基本統計值"""
    mean = np.mean(data)
    median = np.median(data)
    std_dev = np.std(data)
    
    return {
        "mean": mean,
        "median": median,
        "std_dev": std_dev
    }

# 測試函數
if __name__ == "__main__":
    data = np.random.normal(50, 15, 100)
    stats = calculate_statistics(data)
    print(f"均值: {stats['mean']:.2f}")
    print(f"中位數: {stats['median']:.2f}")
    print(f"標準差: {stats['std_dev']:.2f}")
