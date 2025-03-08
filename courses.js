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

    // Course filtering functionality
    const categoryInputs = document.querySelectorAll('input[name="category"]');
    const courseCards = document.querySelectorAll('.course-card');
    const courseGrid = document.querySelector('.course-grid');

    // Create and append the no courses message
    const noCoursesMessage = document.createElement('div');
    noCoursesMessage.className = 'no-courses-message';
    noCoursesMessage.innerHTML = `
        <i class="fas fa-search" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem; display: block;"></i>
        <div>No courses found in this category.</div>
    `;
    courseGrid.appendChild(noCoursesMessage);

    function filterCourses(category) {
        let visibleCount = 0;
        
        courseCards.forEach(card => {
            const categories = card.dataset.category ? card.dataset.category.split(',') : [];
            
            if (category === 'all') {
                card.style.display = 'block';
            } else if (category === 'popular' && card.matches('[data-category*="backend,popular"]')) {
                // Only show C Programming in popular category
                card.style.display = 'block';
            } else if (category === 'more') {
                // Hide all cards for more category
                card.style.display = 'none';
            } else {
                card.style.display = categories.includes(category) ? 'block' : 'none';
            }
            if (card.style.display === 'block') {
                visibleCount++;
            }
        });

        // Show/hide no courses message
        if (visibleCount === 0) {
            noCoursesMessage.style.display = 'block';
            requestAnimationFrame(() => {
                noCoursesMessage.classList.add('visible');
            });
        } else {
            noCoursesMessage.classList.remove('visible');
            setTimeout(() => {
                noCoursesMessage.style.display = 'none';
            }, 300);
        }
    }

    categoryInputs.forEach(input => {
        input.addEventListener('change', () => {
            const selectedCategory = input.value;
            filterCourses(selectedCategory);
        });
    });

    // Initialize course cards with transitions
    courseCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });

    // Add horizontal scroll with mouse wheel for category filters
    const categoryFilters = document.querySelector('.category-filters');
    categoryFilters.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            categoryFilters.scrollLeft += e.deltaY;
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert('Thank you for subscribing! You will receive updates at: ' + email);
            newsletterForm.reset();
        });
    }
}); 