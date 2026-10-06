document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.navbar-nav a, a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: elementPosition - navbarHeight + 10,
                        behavior: 'smooth'
                    });

                    // Auto collapse mobile navbar after click
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // 2. Intersection Observer for Fade-In Scroll Animations
    const animatedElements = document.querySelectorAll('.fade-in-up');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // 3. Project Filter Functional Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 4. View Certificate Modal Handler
    const certButtons = document.querySelectorAll('.view-cert-btn');
    const certModalElement = document.getElementById('certificateModal');
    const certModal = new bootstrap.Modal(certModalElement);
    const modalTitle = document.getElementById('certificateModalLabel');
    const modalBody = document.getElementById('certificateModalBody');

    certButtons.forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const issuer = button.getAttribute('data-issuer');
            const src = button.getAttribute('data-src');
            const type = button.getAttribute('data-type');
            const link = button.getAttribute('data-link');

            modalTitle.textContent = title;

            if (link) {
                // External verification link (Internshala)
                window.open(link, '_blank');
            } else if (type === 'pdf') {
                modalBody.innerHTML = `
                    <p class="text-muted mb-3">Issued by <strong>${issuer}</strong></p>
                    <iframe src="${src}" class="cert-preview-frame mb-3"></iframe>
                    <div>
                        <a href="${src}" target="_blank" class="btn btn-primary rounded-pill px-4">
                            <i class="bi bi-box-arrow-up-right me-1"></i> Open PDF in New Tab
                        </a>
                    </div>
                `;
                certModal.show();
            } else if (src) {
                modalBody.innerHTML = `
                    <p class="text-muted mb-3">Issued by <strong>${issuer}</strong></p>
                    <img src="${src}" alt="${title}" class="img-fluid rounded-3 shadow-sm mb-3">
                    <div>
                        <a href="${src}" target="_blank" class="btn btn-primary rounded-pill px-4">
                            <i class="bi bi-download me-1"></i> View Full Image
                        </a>
                    </div>
                `;
                certModal.show();
            }
        });
    });

    // 5. Contact Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            formFeedback.classList.remove('d-none');
            contactForm.reset();

            setTimeout(() => {
                formFeedback.classList.add('d-none');
            }, 5000);
        });
    }
});