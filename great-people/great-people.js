// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeImageGallery();
    initializeAnimations();
    initializeBackButton();
});

// Image Gallery functionality
function initializeImageGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            createImageModal(imgSrc);
        });
    });
}

function createImageModal(imgSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const img = document.createElement('img');
    img.src = imgSrc;
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '×';
    
    modalContent.appendChild(img);
    modal.appendChild(modalContent);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Add animation after a small delay
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Close modal functionality
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Smooth scroll and animations
function initializeAnimations() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('.profile-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Animate achievement cards on hover
    const cards = document.querySelectorAll('.achievement-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Animate quotes on hover
    const quotes = document.querySelectorAll('.quote-item');
    quotes.forEach(quote => {
        quote.addEventListener('mouseenter', () => {
            quote.style.transform = 'scale(1.02)';
        });
        
        quote.addEventListener('mouseleave', () => {
            quote.style.transform = 'scale(1)';
        });
    });
}

// Back button functionality
function initializeBackButton() {
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backButton.setAttribute('title', 'Back to Great People');
    
    backButton.addEventListener('click', () => {
        window.location.href = '../educational-features.html';
    });
    
    document.body.appendChild(backButton);
} 