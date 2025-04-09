// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Hide mobile menu after clicking
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Chat Widget
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

chatToggle.addEventListener('click', () => {
    chatContainer.classList.toggle('hidden');
});

chatClose.addEventListener('click', () => {
    chatContainer.classList.add('hidden');
});

// Function to add a message to the chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser 
        ? 'user-message bg-indigo-100 p-3 rounded-lg mb-2 max-w-xs ml-auto' 
        : 'bot-message bg-gray-100 p-3 rounded-lg mb-2 max-w-xs';
    
    const messageP = document.createElement('p');
    messageP.textContent = message;
    
    messageDiv.appendChild(messageP);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message when clicking send button
chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    
    if (message !== '') {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simple bot response (this would be replaced with actual chatbot functionality)
        setTimeout(() => {
            addMessage('Thanks for your message! One of our team members will get back to you soon.');
        }, 1000);
    }
});

// Send message when pressing Enter
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatSend.click();
    }
});

// Contact form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your server
    // This is just a placeholder functionality
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Add animation for services cards
const animateOnScroll = () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on initial load
    setTimeout(animateOnScroll, 300);
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
});
