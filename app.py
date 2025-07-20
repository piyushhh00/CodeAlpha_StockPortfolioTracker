import os
from flask import Flask, render_template, request, redirect, url_for, flash
import csv
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'stock_tracker_secret_key'

# Hardcoded dictionary of stock prices
STOCK_PRICES = {
    'AAPL': 180,
    'TSLA': 250,
    'MSFT': 320,
    'AMZN': 145,
    'GOOGL': 135,
    'META': 310,
    'NFLX': 550,
    'NVDA': 420,
    'AMD': 110,
    'INTC': 35
}

# Store user's portfolio
portfolio = []

@app.route('/')
def index():
    total_investment = sum(item['quantity'] * STOCK_PRICES[item['stock']] for item in portfolio)
    return render_template('index.html', 
                           stock_prices=STOCK_PRICES, 
                           portfolio=portfolio, 
                           total_investment=total_investment)

@app.route('/add_stock', methods=['POST'])
def add_stock():
    stock = request.form.get('stock')
    quantity_str = request.form.get('quantity')
    
    # Validate inputs
    if not stock or stock not in STOCK_PRICES:
        flash('Please select a valid stock')
        return redirect(url_for('index'))
    
    try:
        quantity = int(quantity_str)
        if quantity <= 0:
            raise ValueError("Quantity must be positive")
    except (ValueError, TypeError):
        flash('Please enter a valid quantity')
        return redirect(url_for('index'))
    
    # Add to portfolio
    portfolio.append({
        'stock': stock,
        'quantity': quantity,
        'price': STOCK_PRICES[stock],
        'value': quantity * STOCK_PRICES[stock]
    })
    
    flash(f'Added {quantity} shares of {stock}')
    return redirect(url_for('index'))

@app.route('/clear_portfolio')
def clear_portfolio():
    portfolio.clear()
    flash('Portfolio cleared')
    return redirect(url_for('index'))

@app.route('/save_portfolio', methods=['POST'])
def save_portfolio():
    file_type = request.form.get('file_type', 'txt')
    
    if not portfolio:
        flash('Portfolio is empty. Nothing to save.')
        return redirect(url_for('index'))
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    if file_type == 'csv':
        filename = f'portfolio_{timestamp}.csv'
        with open(filename, 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['Stock', 'Quantity', 'Price', 'Value'])
            for item in portfolio:
                writer.writerow([item['stock'], item['quantity'], item['price'], item['value']])
    else:  # txt
        filename = f'portfolio_{timestamp}.txt'
        with open(filename, 'w') as file:
            file.write("Stock Portfolio\n")
            file.write("==============\n\n")
            for item in portfolio:
                file.write(f"Stock: {item['stock']}\n")
                file.write(f"Quantity: {item['quantity']}\n")
                file.write(f"Price: ${item['price']}\n")
                file.write(f"Value: ${item['value']}\n\n")
            
            total = sum(item['value'] for item in portfolio)
            file.write(f"\nTotal Investment: ${total}")
    
    flash(f'Portfolio saved to {filename}')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)