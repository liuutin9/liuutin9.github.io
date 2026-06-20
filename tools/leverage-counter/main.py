current_price = 0
cross_price = 0
tuition_fee = 0
open_value = 0

trading_fee_rate = 0.00055

tuition_fee = float(input("Enter the tuition fee: "))
current_price = float(input("Enter the current price: "))
cross_price = float(input("Enter the cross price: "))
trading_fee_rate = float(input("Enter the trading fee rate (as a decimal): "))

open_value = tuition_fee / (abs((cross_price - current_price) / current_price) + trading_fee_rate)

print("The open value is: ", open_value)