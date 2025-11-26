// Smooth interactions and animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Google Sheets submission handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('application-form');
    const statusEl = document.getElementById('form-status');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxzV3IPVzR1LJswhcbWkp6OQr1DeuMcKjgmYNimAexDBXroADgos2-z_nY6r9zcfv_WvQ/exec';

    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        statusEl.textContent = 'Gönderiliyor...';

        const formData = new FormData(form);

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Ağ hatası');
            }

            statusEl.textContent = 'Başvurunuz başarıyla gönderildi!';
            form.reset();
        } catch (error) {
            console.error(error);
            statusEl.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
        }
    });
});
