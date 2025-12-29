document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SUBTLE PARALLAX ON SCROLL (Optional but adds depth) ---
    const blobs = document.querySelectorAll('.aurora-blob');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        blobs.forEach((blob, index) => {
            // Very subtle vertical movement opposite to scroll
            // Multiplier (index + 1) makes them move at slightly different speeds
            const speed = (index + 1) * 0.05; 
            const yPos = -(scrolled * speed);
            
            // We only translate Y here. The CSS animation handles X, Scale, and Rotate.
            blob.style.transform = `translateY(${yPos}px)`;
        });
    });

    // --- 2. SCROLL REVEAL (INTERSECTION OBSERVER) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // --- 3. ACTIVE LINK STATE ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjustment for the floating nav height
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 4. DYNAMIC YEAR ---
    document.getElementById('year').textContent = new Date().getFullYear();
});