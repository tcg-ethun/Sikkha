// Educational Features JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const authService = window.authService;
    if (authService && !authService.isAuthenticated()) {
        // Redirect to login if not authenticated
        // Commented out for demo purposes
        // window.location.href = '/login.html';
    }

    // Initialize tabs
    initTabs();
    
    // Initialize quiz functionality
    initQuizzes();
    
    // Initialize facts functionality
    initFacts();
    
    // Initialize people filters
    initPeopleFilters();
    
    // Initialize MCQ functionality
    initMCQ();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const featureSections = document.querySelectorAll('.feature-section');
    
    // Tab Functionality
    function switchTab(tabId) {
        // Remove active class from all tabs and sections
        tabButtons.forEach(btn => btn.classList.remove('active'));
        featureSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding section
        const clickedTab = document.querySelector(`[data-tab="${tabId}"]`);
        const activeSection = document.getElementById(tabId);
        
        if (clickedTab && activeSection) {
            clickedTab.classList.add('active');
            activeSection.classList.add('active');
        }
    }

    // Add click event to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Set Great People tab as active by default
    switchTab('people');
}

// Quiz functionality
function initQuizzes() {
    const quizButtons = document.querySelectorAll('.quiz-categories .btn');
    const sampleQuizOptions = document.querySelectorAll('.quiz-options .option');
    const checkAnswerButton = document.querySelector('.quiz-preview .btn');
    
    // Sample quiz data
    const sampleQuizData = {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: "paris"
    };
    
    // Quiz category buttons
    quizButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.closest('.category-card').querySelector('h3').textContent;
            showMessage(`Starting ${category} quiz...`, 'info');
            
            // In a real app, this would load the quiz data from the server
            // For demo, we'll just show a message
            setTimeout(() => {
                showMessage(`${category} quiz loaded successfully!`, 'success');
            }, 1500);
        });
    });
    
    // Sample quiz options
    sampleQuizOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Clear previous selections
            sampleQuizOptions.forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
            });
            
            // Mark as selected
            option.classList.add('selected');
        });
    });
    
    // Check answer button
    if (checkAnswerButton) {
        checkAnswerButton.addEventListener('click', () => {
            const selectedOption = document.querySelector('.quiz-options .option input:checked');
            
            if (!selectedOption) {
                showMessage('Please select an answer', 'warning');
                return;
            }
            
            const selectedValue = selectedOption.value;
            const optionElement = selectedOption.closest('.option');
            
            // Check if answer is correct
            if (selectedValue === sampleQuizData.correctAnswer) {
                optionElement.classList.add('correct');
                showMessage('Correct answer!', 'success');
            } else {
                optionElement.classList.add('incorrect');
                
                // Show correct answer
                const correctOption = document.querySelector(`.quiz-options .option input[value="${sampleQuizData.correctAnswer}"]`);
                if (correctOption) {
                    correctOption.closest('.option').classList.add('correct');
                }
                
                showMessage('Incorrect answer. Try again!', 'error');
            }
        });
    }
}

// Facts functionality
function initFacts() {
    const factShareButtons = document.querySelectorAll('.fact-share-btn');
    const getNewFactButton = document.querySelector('.daily-fact .btn');
    
    // Sample facts data
    const facts = [
        "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
        "A day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once on its axis, but only 225 Earth days to orbit the Sun.",
        "The average person will spend six months of their life waiting for red lights to turn green.",
        "The world's oldest known living tree is a Great Basin Bristlecone Pine that is over 5,000 years old.",
        "Bananas are berries, but strawberries aren't.",
        "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
        "Octopuses have three hearts, nine brains, and blue blood.",
        "Cows have best friends and can become stressed when they are separated.",
        "The fingerprints of koalas are so similar to humans that they have on occasion been confused at crime scenes.",
        "A group of flamingos is called a 'flamboyance'."
    ];
    
    // Share fact buttons
    factShareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const factCard = e.target.closest('.fact-card');
            const factText = factCard.querySelector('p').textContent;
            
            // Create a temporary input element
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = factText;
            tempInput.select();
            
            // Copy the text
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Show feedback
            const originalIcon = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = originalIcon;
            }, 2000);
        });
    });
    
    // Get new fact button
    if (getNewFactButton) {
        getNewFactButton.addEventListener('click', () => {
            const dailyFactContent = document.querySelector('.daily-fact-content p');
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            
            // Animate fact change
            dailyFactContent.style.opacity = '0';
            setTimeout(() => {
                dailyFactContent.textContent = randomFact;
                dailyFactContent.style.opacity = '1';
            }, 300);
        });
    }
}

// People filters functionality
function initPeopleFilters() {
    const filterButtons = document.querySelectorAll('.people-filter .filter-btn');
    const personCards = document.querySelectorAll('.person-card');
    
    // Filter Functionality
    function filterPeople(category) {
        personCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter the cards
            const category = button.getAttribute('data-filter');
            filterPeople(category);
        });
    });

    // Learn More Button Functionality
    const learnMoreButtons = document.querySelectorAll('.person-card .btn');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const personCard = button.closest('.person-card');
            const personName = personCard.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
            const url = `great-people/${personName}.html`;
            window.location.href = url;
        });
    });
}

// MCQ functionality
function initMCQ() {
    const subjectButtons = document.querySelectorAll('.subject-card .btn');
    const mcqOptions = document.querySelectorAll('.mcq-options .option');
    const showAnswerButton = document.querySelector('.mcq-controls .btn.secondary');
    const nextQuestionButton = document.querySelector('.mcq-controls .btn.primary');
    const examPrepButtons = document.querySelectorAll('.exam-card .btn');
    
    // Sample MCQ data
    const mcqSampleData = {
        question: "Which of the following sorting algorithms has the best average-case time complexity?",
        options: [
            "Bubble Sort - O(n²)",
            "Quick Sort - O(n log n)",
            "Selection Sort - O(n²)",
            "Insertion Sort - O(n²)"
        ],
        correctAnswer: "b" // Quick Sort
    };
    
    // Subject buttons
    subjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const subject = e.target.closest('.subject-card').querySelector('h3').textContent;
            showMessage(`Loading ${subject} practice questions...`, 'info');
            
            // In a real app, this would load the MCQ data from the server
            // For demo, we'll just show a message
            setTimeout(() => {
                showMessage(`${subject} practice questions loaded successfully!`, 'success');
            }, 1500);
        });
    });
    
    // MCQ options
    mcqOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Clear previous selections
            mcqOptions.forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
            });
            
            // Mark as selected
            option.classList.add('selected');
        });
    });
    
    // Show answer button
    if (showAnswerButton) {
        showAnswerButton.addEventListener('click', () => {
            // Show correct answer
            const correctOption = document.querySelector(`.mcq-options .option input[value="${mcqSampleData.correctAnswer}"]`);
            if (correctOption) {
                mcqOptions.forEach(opt => opt.classList.remove('correct'));
                correctOption.closest('.option').classList.add('correct');
            }
        });
    }
    
    // Next question button
    if (nextQuestionButton) {
        nextQuestionButton.addEventListener('click', () => {
            showMessage('Loading next question...', 'info');
            
            // In a real app, this would load the next question
            // For demo, we'll just show a message
            setTimeout(() => {
                showMessage('Next question would be displayed here.', 'success');
            }, 1500);
        });
    }
    
    // Exam prep buttons
    examPrepButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const examName = e.target.closest('.exam-card').querySelector('h4').textContent;
            showMessage(`Starting ${examName} preparation...`, 'info');
            
            // In a real app, this would load the exam prep data
            // For demo, we'll just show a message
            setTimeout(() => {
                showMessage(`${examName} preparation materials loaded successfully!`, 'success');
            }, 1500);
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    
    if (menuToggle && navLinks && overlay) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        overlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
    }
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
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
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

// Add CSS styles for messages
function addMessageStyles() {
    if (!document.getElementById('message-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'message-styles';
        styleElement.textContent = `
            .message-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 350px;
            }
            
            .message {
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 12px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                animation: slideIn 0.3s ease forwards;
                border-left: 4px solid #4a90e2;
            }
            
            .message.success { border-color: #28a745; }
            .message.error { border-color: #dc3545; }
            .message.warning { border-color: #ffc107; }
            .message.info { border-color: #17a2b8; }
            
            .message-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .message-content i {
                font-size: 1.2rem;
            }
            
            .message.success i { color: #28a745; }
            .message.error i { color: #dc3545; }
            .message.warning i { color: #ffc107; }
            .message.info i { color: #17a2b8; }
            
            .message-close {
                background: none;
                border: none;
                color: #6c757d;
                cursor: pointer;
                padding: 0;
                font-size: 0.9rem;
            }
            
            .message.closing {
                animation: slideOut 0.3s ease forwards;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(50px);
                }
            }
            
            /* Quiz option styles */
            .option.selected {
                border-color: #4a90e2;
                background-color: rgba(74, 144, 226, 0.1);
            }
            
            .option.correct {
                border-color: #28a745;
                background-color: rgba(40, 167, 69, 0.1);
            }
            
            .option.incorrect {
                border-color: #dc3545;
                background-color: rgba(220, 53, 69, 0.1);
            }
            
            /* Dark mode adjustments */
            .dark-mode .message {
                background-color: #2d3436;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }
            
            .dark-mode .message-close {
                color: #adb5bd;
            }
        `;
        document.head.appendChild(styleElement);
    }
}

// Add message styles when the script loads
addMessageStyles(); 