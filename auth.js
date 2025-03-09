// Authentication JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked || false;
            
            // Simple validation
            if (!email || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate login (in a real app, this would be an API call)
            simulateLogin(email, password, remember);
        });
    }

    // Signup form handling
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        // Password strength meter
        const passwordInput = document.getElementById('password');
        const strengthSegments = document.querySelectorAll('.strength-segment');
        const strengthText = document.querySelector('.strength-text');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                const strength = checkPasswordStrength(passwordInput.value);
                updatePasswordStrengthUI(strength, strengthSegments, strengthText);
            });
        }
        
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms')?.checked || false;
            
            // Simple validation
            if (!firstName || !lastName || !email || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }
            
            if (!terms) {
                showMessage('Please agree to the terms and conditions', 'error');
                return;
            }
            
            // Check password strength
            const strength = checkPasswordStrength(password);
            if (strength < 2) {
                showMessage('Please choose a stronger password', 'error');
                return;
            }
            
            // Simulate signup (in a real app, this would be an API call)
            simulateSignup(firstName, lastName, email, password);
        });
    }

    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            // In a real app, this would trigger Google OAuth
            showMessage('Google login is not implemented in this demo', 'info');
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
            // In a real app, this would trigger Facebook OAuth
            showMessage('Facebook login is not implemented in this demo', 'info');
        });
    }
});

// Helper Functions

// Check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains lowercase and uppercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength += 1;
    
    // Contains special characters
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    return strength;
}

// Update password strength UI
function updatePasswordStrengthUI(strength, segments, strengthText) {
    // Reset all segments
    segments.forEach(segment => {
        segment.style.backgroundColor = '';
    });
    
    // Set colors based on strength
    const colors = ['#dc3545', '#ffc107', '#28a745', '#4a90e2'];
    const texts = ['Weak', 'Fair', 'Good', 'Strong'];
    
    // Update segments
    for (let i = 0; i < strength; i++) {
        segments[i].style.backgroundColor = colors[strength - 1];
    }
    
    // Update text
    strengthText.textContent = strength > 0 ? texts[strength - 1] : 'Password strength';
    strengthText.style.color = strength > 0 ? colors[strength - 1] : '';
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

// Simulate login (in a real app, this would be an API call)
function simulateLogin(email, password, remember) {
    // Show loading state
    const loginButton = document.querySelector('.auth-btn');
    const originalText = loginButton.textContent;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    loginButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // In a real app, you would validate credentials with a server
        // For demo purposes, we'll just redirect to the dashboard
        if (email === 'demo@example.com' && password === 'password') {
            showMessage('Login successful! Redirecting...', 'success');
            
            // Store user info in localStorage if remember is checked
            if (remember) {
                localStorage.setItem('user', JSON.stringify({
                    email: email,
                    name: 'John Doe',
                    role: 'Student'
                }));
            }
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            // Reset button
            loginButton.innerHTML = originalText;
            loginButton.disabled = false;
            
            // Show error
            showMessage('Invalid email or password', 'error');
        }
    }, 1500);
}

// Simulate signup (in a real app, this would be an API call)
function simulateSignup(firstName, lastName, email, password) {
    // Show loading state
    const signupButton = document.querySelector('.auth-btn');
    const originalText = signupButton.textContent;
    signupButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    signupButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // In a real app, you would send user data to a server
        // For demo purposes, we'll just redirect to the dashboard
        showMessage('Account created successfully! Redirecting...', 'success');
        
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify({
            email: email,
            name: `${firstName} ${lastName}`,
            role: 'Student'
        }));
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 1500);
} 