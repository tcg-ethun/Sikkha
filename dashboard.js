// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }

    // Update user information
    updateUserInfo(user);

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        // Update icon and text
        const themeIcon = themeToggle.querySelector('i');
        const themeText = themeToggle.querySelector('span');
        
        if (themeIcon) themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        if (themeText) themeText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        
        // Update icon and text
        const themeIcon = themeToggle.querySelector('i');
        const themeText = themeToggle.querySelector('span');
        
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        if (themeText) themeText.textContent = 'Light Mode';
    }

    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            
            // Add overlay when sidebar is active
            let overlay = document.querySelector('.sidebar-overlay');
            
            if (sidebar.classList.contains('active')) {
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'sidebar-overlay';
                    document.body.appendChild(overlay);
                    
                    // Close sidebar when clicking overlay
                    overlay.addEventListener('click', () => {
                        sidebar.classList.remove('active');
                        overlay.remove();
                    });
                }
            } else {
                if (overlay) {
                    overlay.remove();
                }
            }
        });
    }

    // Notification dropdown
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', () => {
            // Toggle notification dropdown
            let dropdown = document.querySelector('.notification-dropdown');
            
            if (!dropdown) {
                dropdown = createNotificationDropdown();
                document.querySelector('.header-actions').appendChild(dropdown);
                
                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!notificationBell.contains(e.target) && !dropdown.contains(e.target)) {
                        dropdown.remove();
                    }
                });
            } else {
                dropdown.remove();
            }
        });
    }

    // User dropdown
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', () => {
            // Toggle user dropdown
            let dropdown = document.querySelector('.user-menu-dropdown');
            
            if (!dropdown) {
                dropdown = createUserMenuDropdown(user);
                document.querySelector('.header-actions').appendChild(dropdown);
                
                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!userDropdown.contains(e.target) && !dropdown.contains(e.target)) {
                        dropdown.remove();
                    }
                });
            } else {
                dropdown.remove();
            }
        });
    }

    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
});

// Helper Functions

// Update user information throughout the dashboard
function updateUserInfo(user) {
    // Update sidebar user info
    const userNameElements = document.querySelectorAll('.user-info h3, .user-dropdown span');
    const userRoleElements = document.querySelectorAll('.user-info p');
    
    userNameElements.forEach(element => {
        element.textContent = user.name;
    });
    
    userRoleElements.forEach(element => {
        element.textContent = user.role;
    });
    
    // Update welcome message
    const welcomeHeading = document.querySelector('.welcome-text h1');
    if (welcomeHeading) {
        const firstName = user.name.split(' ')[0];
        welcomeHeading.textContent = `Welcome back, ${firstName}!`;
    }
}

// Create notification dropdown
function createNotificationDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown';
    
    dropdown.innerHTML = `
        <div class="dropdown-header">
            <h3>Notifications</h3>
            <button class="mark-all-read">Mark all as read</button>
        </div>
        <div class="dropdown-content">
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="notification-info">
                    <p>New lesson available in HTML5 Fundamentals</p>
                    <span class="notification-time">10 minutes ago</span>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fas fa-comment"></i>
                </div>
                <div class="notification-info">
                    <p>Your instructor replied to your question</p>
                    <span class="notification-time">1 hour ago</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="notification-info">
                    <p>Your assignment has been graded</p>
                    <span class="notification-time">Yesterday</span>
                </div>
            </div>
        </div>
        <div class="dropdown-footer">
            <a href="notifications.html">View all notifications</a>
        </div>
    `;
    
    // Add functionality to mark all as read
    const markAllReadBtn = dropdown.querySelector('.mark-all-read');
    markAllReadBtn.addEventListener('click', () => {
        const unreadItems = dropdown.querySelectorAll('.notification-item.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
        });
        
        // Update notification badge
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'none';
        }
    });
    
    return dropdown;
}

// Create user menu dropdown
function createUserMenuDropdown(user) {
    const dropdown = document.createElement('div');
    dropdown.className = 'user-menu-dropdown';
    
    dropdown.innerHTML = `
        <div class="dropdown-header">
            <div class="user-info-large">
                <img src="assets/images/avatars/default-avatar.png" alt="User Avatar">
                <div>
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                </div>
            </div>
        </div>
        <div class="dropdown-content">
            <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
            <a href="settings.html"><i class="fas fa-cog"></i> Account Settings</a>
            <a href="my-courses.html"><i class="fas fa-book-open"></i> My Courses</a>
            <a href="certificates.html"><i class="fas fa-certificate"></i> Certificates</a>
        </div>
        <div class="dropdown-footer">
            <a href="#" class="logout-menu-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    `;
    
    // Add logout functionality
    const logoutMenuBtn = dropdown.querySelector('.logout-menu-btn');
    logoutMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
    
    return dropdown;
}

// Logout function
function logout() {
    // Clear user data
    localStorage.removeItem('user');
    
    // Show message
    showMessage('Logging out...', 'info');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Show message to user
function showMessage(message, type = 'success') {
    // Check if a message container already exists
    let messageContainer = document.querySelector('.message-container');
    
    // If not, create one
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        document.body.appendChild(messageContainer);
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="message-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to container
    messageContainer.appendChild(messageElement);
    
    // Add close button functionality
    const closeButton = messageElement.querySelector('.message-close');
    closeButton.addEventListener('click', () => {
        messageElement.classList.add('closing');
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.classList.add('closing');
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }, 5000);
} 