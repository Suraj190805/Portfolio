// ===== Certifications Page JavaScript =====

(function() {
    'use strict';

    // ===== Filter Functionality =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const domainGroups = document.querySelectorAll('.cert-domain-group');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            domainGroups.forEach(group => {
                if (filter === 'all' || group.getAttribute('data-domain') === filter) {
                    group.classList.remove('hidden');
                    group.style.opacity = '0';
                    group.style.transform = 'translateY(16px)';
                    requestAnimationFrame(() => {
                        group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        group.style.opacity = '1';
                        group.style.transform = 'translateY(0)';
                    });
                } else {
                    group.classList.add('hidden');
                }
            });
        });
    });

    // ===== Scroll Animations =====
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // ===== Certificate Image Modal =====
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('certModalImage');
    const modalClose = document.getElementById('certModalClose');
    const modalBackdrop = modal ? modal.querySelector('.cert-modal-backdrop') : null;

    // Open modal on certificate image click
    document.querySelectorAll('.cert-image-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const img = wrapper.querySelector('img');
            if (img && modal) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                modalImage.src = '';
            }, 300);
        }
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

})();
