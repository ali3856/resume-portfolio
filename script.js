// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links within the same page
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                e.preventDefault();
                document.body.style.opacity = 0;
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });

    // Fade in effect on page load
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 0);
});

// Add any additional functions or logic for your portfolio here
