// Stock Tracker Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Load mock data
    loadMockData();
    
    // Initialize portfolio chart
    initPortfolioChart();
}

function setupEventListeners() {
    // Search button click event
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Search input enter key event
    const searchInput = document.getElementById('stock-search');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // Add stock button click event
    const addStockBtn = document.querySelector('.add-stock-btn');
    if (addStockBtn) {
        addStockBtn.addEventListener('click', showAddStockModal);
    }
    
    // View portfolio button click event
    const viewPortfolioBtn = document.querySelector('.view-portfolio-btn');
    if (viewPortfolioBtn) {
        viewPortfolioBtn.addEventListener('click', navigateToPortfolio);
    }
    
    // More news button click event
    const moreNewsBtn = document.querySelector('.more-news-btn');
    if (moreNewsBtn) {
        moreNewsBtn.addEventListener('click', loadMoreNews);
    }
    
    // Navigation menu items
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            // Handle navigation (would load different views in a real app)
            console.log(`Navigating to: ${this.textContent}`);
        });
    });
    
    // Login button click event
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginModal);
    }
    
    // Sign up button click event
    const signupBtn = document.querySelector('.signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', showSignupModal);
    }
}

function handleSearch() {
    const searchInput = document.getElementById('stock-search');
    if (searchInput && searchInput.value.trim() !== '') {
        const searchTerm = searchInput.value.trim().toUpperCase();
        console.log(`Searching for: ${searchTerm}`);
        
        // In a real app, this would make an API call to get stock data
        // For now, we'll just show a mock result
        showSearchResult(searchTerm);
    }
}

function showSearchResult(symbol) {
    // Create a mock search result
    const mockStockData = {
        symbol: symbol,
        name: getCompanyNameForSymbol(symbol),
        price: (Math.random() * 1000).toFixed(2),
        change: (Math.random() * 10 - 5).toFixed(2)
    };
    
    // Create a modal to display the search result
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    const stockInfo = document.createElement('div');
    stockInfo.className = 'stock-info-modal';
    
    const changeClass = parseFloat(mockStockData.change) >= 0 ? 'positive' : 'negative';
    const changeSymbol = parseFloat(mockStockData.change) >= 0 ? '+' : '';
    
    stockInfo.innerHTML = `
        <h2>${mockStockData.symbol}</h2>
        <h3>${mockStockData.name}</h3>
        <p class="price">$${mockStockData.price}</p>
        <p class="change ${changeClass}">${changeSymbol}${mockStockData.change}%</p>
        <div class="stock-actions">
            <button class="add-to-watchlist">Add to Watchlist</button>
            <button class="add-to-portfolio">Add to Portfolio</button>
        </div>
    `;
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(stockInfo);
    modal.appendChild(modalContent);
    
    // Add modal to the body
    document.body.appendChild(modal);
    
    // Add event listeners to the buttons
    const addToWatchlistBtn = modal.querySelector('.add-to-watchlist');
    addToWatchlistBtn.addEventListener('click', function() {
        addToWatchlist(mockStockData);
        document.body.removeChild(modal);
    });
    
    const addToPortfolioBtn = modal.querySelector('.add-to-portfolio');
    addToPortfolioBtn.addEventListener('click', function() {
        showAddToPortfolioForm(mockStockData);
        document.body.removeChild(modal);
    });
    
    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .search-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            position: relative;
            width: 90%;
            max-width: 500px;
        }
        
        .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .stock-info-modal {
            text-align: center;
        }
        
        .stock-info-modal h2 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .stock-info-modal h3 {
            font-size: 1.2rem;
            color: #777;
            margin-bottom: 1rem;
        }
        
        .stock-info-modal .price {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .stock-info-modal .change {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }
        
        .stock-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }
        
        .stock-actions button {
            padding: 10px 20px;
            border-radius: 4px;
            font-weight: 500;
            cursor: pointer;
        }
        
        .add-to-watchlist {
            background-color: transparent;
            color: #2a52be;
            border: 1px solid #2a52be;
        }
        
        .add-to-portfolio {
            background-color: #2a52be;
            color: white;
            border: none;
        }
    `;
    
    document.head.appendChild(style);
}

function getCompanyNameForSymbol(symbol) {
    // Mock company names for common stock symbols
    const companies = {
        'AAPL': 'Apple Inc.',
        'MSFT': 'Microsoft Corporation',
        'GOOGL': 'Alphabet Inc.',
        'AMZN': 'Amazon.com, Inc.',
        'FB': 'Meta Platforms, Inc.',
        'TSLA': 'Tesla, Inc.',
        'NVDA': 'NVIDIA Corporation',
        'JPM': 'JPMorgan Chase & Co.',
        'V': 'Visa Inc.',
        'JNJ': 'Johnson & Johnson'
    };
    
    return companies[symbol] || `${symbol} Corporation`;
}

function addToWatchlist(stockData) {
    console.log(`Adding ${stockData.symbol} to watchlist`);
    
    // In a real app, this would update a database or local storage
    // For now, we'll just add it to the DOM
    
    const watchlist = document.querySelector('.stock-list');
    if (watchlist) {
        const stockCard = document.createElement('div');
        stockCard.className = 'stock-card';
        
        const changeClass = parseFloat(stockData.change) >= 0 ? 'positive' : 'negative';
        const changeSymbol = parseFloat(stockData.change) >= 0 ? '+' : '';
        
        stockCard.innerHTML = `
            <div class="stock-info">
                <h3>${stockData.symbol}</h3>
                <p>${stockData.name}</p>
            </div>
            <div class="stock-price">
                <p class="price">$${stockData.price}</p>
                <p class="change ${changeClass}">${changeSymbol}${stockData.change}%</p>
            </div>
        `;
        
        watchlist.appendChild(stockCard);
        
        // Show a notification
        showNotification(`${stockData.symbol} added to watchlist`);
    }
}

function showAddToPortfolioForm(stockData) {
    // Create a modal for the portfolio form
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    const form = document.createElement('form');
    form.className = 'portfolio-form';
    form.innerHTML = `
        <h2>Add ${stockData.symbol} to Portfolio</h2>
        <div class="form-group">
            <label for="shares">Number of Shares</label>
            <input type="number" id="shares" min="1" step="1" value="1" required>
        </div>
        <div class="form-group">
            <label for="purchase-price">Purchase Price ($)</label>
            <input type="number" id="purchase-price" min="0.01" step="0.01" value="${stockData.price}" required>
        </div>
        <div class="form-group">
            <label for="purchase-date">Purchase Date</label>
            <input type="date" id="purchase-date" value="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <button type="submit" class="submit-btn">Add to Portfolio</button>
    `;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const shares = document.getElementById('shares').value;
        const purchasePrice = document.getElementById('purchase-price').value;
        const purchaseDate = document.getElementById('purchase-date').value;
        
        addToPortfolio(stockData, shares, purchasePrice, purchaseDate);
        document.body.removeChild(modal);
    });
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    
    // Add modal to the body
    document.body.appendChild(modal);
    
    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .portfolio-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .form-group label {
            font-weight: 500;
        }
        
        .form-group input {
            padding: 8px;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
        }
        
        .submit-btn {
            background-color: #2a52be;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            margin-top: 1rem;
        }
    `;
    
    document.head.appendChild(style);
}

function addToPortfolio(stockData, shares, purchasePrice, purchaseDate) {
    console.log(`Adding ${shares} shares of ${stockData.symbol} to portfolio at $${purchasePrice} per share, purchased on ${purchaseDate}`);
    
    // In a real app, this would update a database or local storage
    // For now, we'll just update the portfolio summary
    
    const portfolioValue = document.querySelector('.portfolio-value p:first-of-type');
    if (portfolioValue) {
        const currentValue = parseFloat(portfolioValue.textContent.replace('$', '').replace(',', ''));
        const newValue = currentValue + (parseFloat(shares) * parseFloat(stockData.price));
        portfolioValue.textContent = `$${newValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
    
    // Show a notification
    showNotification(`${shares} shares of ${stockData.symbol} added to portfolio`);
}

function showAddStockModal() {
    // Create a modal for adding a stock
    const modal = document.createElement('div');
    modal.className = 'add-stock-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    const form = document.createElement('form');
    form.className = 'add-stock-form';
    form.innerHTML = `
        <h2>Add Stock to Watchlist</h2>
        <div class="form-group">
            <label for="stock-symbol">Stock Symbol</label>
            <input type="text" id="stock-symbol" placeholder="e.g., AAPL" required>
        </div>
        <button type="submit" class="submit-btn">Add Stock</button>
    `;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const symbol = document.getElementById('stock-symbol').value.trim().toUpperCase();
        
        if (symbol) {
            // In a real app, this would validate the symbol and get stock data
            // For now, we'll just create mock data
            const mockStockData = {
                symbol: symbol,
                name: getCompanyNameForSymbol(symbol),
                price: (Math.random() * 1000).toFixed(2),
                change: (Math.random() * 10 - 5).toFixed(2)
            };
            
            addToWatchlist(mockStockData);
            document.body.removeChild(modal);
        }
    });
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    
    // Add modal to the body
    document.body.appendChild(modal);
}

function navigateToPortfolio() {
    console.log('Navigating to portfolio page');
    // In a real app, this would navigate to the portfolio page
    // For now, we'll just show a notification
    showNotification('Portfolio feature coming soon!');
}

function loadMoreNews() {
    console.log('Loading more news');
    // In a real app, this would load more news articles
    // For now, we'll just add a few more mock news items
    
    const newsContainer = document.querySelector('.news-container');
    if (newsContainer) {
        const mockNews = [
            {
                title: 'Global Markets React to Economic Data',
                source: 'Reuters - 3 hours ago',
                snippet: 'International markets showed mixed reactions to the latest economic indicators released today...',
            },
            {
                title: 'New Regulations Impact Financial Sector',
                source: 'CNBC - 6 hours ago',
                snippet: 'Regulatory changes announced this week are expected to have significant implications for banks and financial institutions...',
            },
            {
                title: 'Tech Sector Leads Market Recovery',
                source: 'MarketWatch - 1 day ago',
                snippet: 'Technology companies are at the forefront of the recent market rebound, with several major players posting strong gains...',
            }
        ];
        
        mockNews.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <h3>${news.title}</h3>
                <p class="news-source">${news.source}</p>
                <p class="news-snippet">${news.snippet}</p>
                <a href="#" class="read-more">Read More</a>
            `;
            
            newsContainer.appendChild(newsCard);
        });
        
        // Show a notification
        showNotification('More news loaded');
    }
}

function showLoginModal() {
    // Create a modal for login
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    const form = document.createElement('form');
    form.className = 'login-form';
    form.innerHTML = `
        <h2>Login to Your Account</h2>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="your@email.com" required>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required>
        </div>
        <div class="form-options">
            <label>
                <input type="checkbox" id="remember-me">
                Remember me
            </label>
            <a href="#" class="forgot-password">Forgot Password?</a>
        </div>
        <button type="submit" class="submit-btn">Login</button>
        <p class="form-footer">Don't have an account? <a href="#" class="signup-link">Sign Up</a></p>
    `;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log(`Login attempt with email: ${email}`);
        // In a real app, this would authenticate the user
        // For now, we'll just show a notification
        showNotification('Login successful!');
        document.body.removeChild(modal);
        
        // Update the user menu
        updateUserMenuAfterLogin(email);
    });
    
    // Add event listener to the sign up link
    form.querySelector('.signup-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.body.removeChild(modal);
        showSignupModal();
    });
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    
    // Add modal to the body
    document.body.appendChild(modal);
    
    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .login-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .login-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9rem;
        }
        
        .forgot-password {
            color: #2a52be;
        }
        
        .form-footer {
            text-align: center;
            margin-top: 1rem;
            font-size: 0.9rem;
        }
        
        .signup-link {
            color: #2a52be;
            font-weight: 500;
        }
    `;
    
    document.head.appendChild(style);
}

function showSignupModal() {
    // Create a modal for signup
    const modal = document.createElement('div');
    modal.className = 'signup-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    const form = document.createElement('form');
    form.className = 'signup-form';
    form.innerHTML = `
        <h2>Create an Account</h2>
        <div class="form-group">
            <label for="full-name">Full Name</label>
            <input type="text" id="full-name" required>
        </div>
        <div class="form-group">
            <label for="signup-email">Email</label>
            <input type="email" id="signup-email" placeholder="your@email.com" required>
        </div>
        <div class="form-group">
            <label for="signup-password">Password</label>
            <input type="password" id="signup-password" required>
        </div>
        <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" required>
        </div>
        <div class="form-terms">
            <label>
                <input type="checkbox" id="terms" required>
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>
        </div>
        <button type="submit" class="submit-btn">Create Account</button>
        <p class="form-footer">Already have an account? <a href="#" class="login-link">Login</a></p>
    `;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        console.log(`Signup attempt with email: ${email}`);
        // In a real app, this would create a new user account
        // For now, we'll just show a notification
        showNotification('Account created successfully!');
        document.body.removeChild(modal);
        
        // Update the user menu
        updateUserMenuAfterLogin(email);
    });
    
    // Add event listener to the login link
    form.querySelector('.login-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.body.removeChild(modal);
        showLoginModal();
    });
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    
    // Add modal to the body
    document.body.appendChild(modal);
    
    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .signup-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .signup-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .form-terms {
            font-size: 0.9rem;
        }
        
        .form-terms a {
            color: #2a52be;
        }
    `;
    
    document.head.appendChild(style);
}

function updateUserMenuAfterLogin(email) {
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.innerHTML = `
            <div class="user-dropdown">
                <button class="user-btn">
                    <i class="fas fa-user-circle"></i>
                    <span>${email.split('@')[0]}</span>
                </button>
                <div class="dropdown-content">
                    <a href="#">Profile</a>
                    <a href="#">Settings</a>
                    <a href="#" class="logout-btn">Logout</a>
                </div>
            </div>
        `;
        
        // Add styles for the user dropdown
        const style = document.createElement('style');
        style.textContent = `
            .user-dropdown {
                position: relative;
                display: inline-block;
            }
            
            .user-btn {
                display: flex;
                align-items: center;
                gap: 8px;
                background-color: transparent;
                border: none;
                cursor: pointer;
                padding: 8px;
                border-radius: 4px;
            }
            
            .user-btn i {
                font-size: 1.2rem;
                color: #2a52be;
            }
            
            .dropdown-content {
                display: none;
                position: absolute;
                right: 0;
                background-color: white;
                min-width: 160px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                z-index: 1;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .dropdown-content a {
                color: #333;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
                transition: background-color 0.3s ease;
            }
            
            .dropdown-content a:hover {
                background-color: #f0f0f0;
            }
            
            .user-dropdown:hover .dropdown-content {
                display: block;
            }
            
            .logout-btn {
                border-top: 1px solid #e0e0e0;
            }
        `;
        
        document.head.appendChild(style);
        
        // Add event listener to the logout button
        const logoutBtn = userMenu.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real app, this would log the user out
                // For now, we'll just reset the user menu
                userMenu.innerHTML = `
                    <button class="login-btn">Login</button>
                    <button class="signup-btn">Sign Up</button>
                `;
                
                // Re-add event listeners
                const newLoginBtn = userMenu.querySelector('.login-btn');
                if (newLoginBtn) {
                    newLoginBtn.addEventListener('click', showLoginModal);
                }
                
                const newSignupBtn = userMenu.querySelector('.signup-btn');
                if (newSignupBtn) {
                    newSignupBtn.addEventListener('click', showSignupModal);
                }
                
                showNotification('Logged out successfully');
            });
        }
    }
}

function showNotification(message, type = 'success') {
    // Create a notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add the notification to the body
    document.body.appendChild(notification);
    
    // Add styles for the notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease, fadeOut 0.5s ease 2.5s forwards;
        }
        
        .notification.success {
            background-color: #28a745;
        }
        
        .notification.error {
            background-color: #dc3545;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    
    document.head.appendChild(style);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

function loadMockData() {
    // This function would load mock data for the application
    // In a real app, this would be replaced with API calls
    console.log('Loading mock data');
}

function initPortfolioChart() {
    // This function would initialize the portfolio chart
    // In a real app, this would use a charting library like Chart.js
    console.log('Initializing portfolio chart');
    
    // For now, we'll just update the chart placeholder
    const chartPlaceholder = document.querySelector('.chart-placeholder');
    if (chartPlaceholder) {
        chartPlaceholder.textContent = 'Portfolio Performance Chart (Mock Data)';
    }
}