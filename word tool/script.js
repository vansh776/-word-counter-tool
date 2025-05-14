document.addEventListener('DOMContentLoaded', function() {
    // Word Counter Functionality
    const textInput = document.getElementById('text-input');
    const wordCount = document.getElementById('word-count');
    const characterCount = document.getElementById('character-count');
    const characterNoSpacesCount = document.getElementById('character-no-spaces-count');
    
    // Initialize counts
    updateCounts();
    
    // Add event listener for input changes
    textInput.addEventListener('input', updateCounts);
    
    function updateCounts() {
        const text = textInput.value;
        
        // Word count (split by whitespace and filter out empty strings)
        const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
        wordCount.textContent = words.length;
        
        // Character count (including spaces)
        characterCount.textContent = text.length;
        
        // Character count (excluding spaces)
        const charsNoSpaces = text.replace(/\s/g, '').length;
        characterNoSpacesCount.textContent = charsNoSpaces;
        
        // Add animation to result numbers
        animateResultNumbers();
    }
    
    function animateResultNumbers() {
        const resultNumbers = document.querySelectorAll('.result-number');
        
        resultNumbers.forEach(number => {
            number.style.transform = 'scale(1.1)';
            setTimeout(() => {
                number.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Get the answer element
            const answer = this.nextElementSibling;
            
            // Toggle answer visibility
            if (answer.classList.contains('show')) {
                answer.classList.remove('show');
            } else {
                // Close any other open answers
                document.querySelectorAll('.faq-answer').forEach(item => {
                    if (item !== answer) {
                        item.classList.remove('show');
                        item.previousElementSibling.classList.remove('active');
                    }
                });
                
                answer.classList.add('show');
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.slide-up, .fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            if (element.classList.contains('slide-up')) {
                element.style.transform = 'translateY(20px)';
            }
            observer.observe(element);
        });
    };
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Add smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Focus the textarea on page load for better UX
    textInput.focus();
});