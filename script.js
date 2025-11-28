// Random hero text selection
const slogans = [
    "Duolingo'nun YKS versiyonu. Öğretici ve bağımlılık yapıyor.",
    "YKS öğrencilerinin Instagram'dan çok kullandığı uygulama.",
    "Zor konuları 5 dakikada kolayca öğreten uygulama.",
    "Zor konuları kolay yoldan öğren."
];

function setRandomHeroText() {
    const heroText = document.getElementById('hero-text');
    if (heroText) {
        const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
        heroText.textContent = randomSlogan;
    }
}

// Set random slogan immediately (before DOMContentLoaded for no flash)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setRandomHeroText);
} else {
    setRandomHeroText();
}

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
    const applicationForm = document.getElementById('application-form');
    const emailForm = document.getElementById('email-form');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz34YVrcN8kAnDu2d5aXtETM3l_1L_gNgbQZWTMXXwg4jA8w4z-MEnMss88jCxGSyah1Q/exec';

    // Application form handler
    if (applicationForm) {
        const statusEl = document.getElementById('form-status');
        
        applicationForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            statusEl.textContent = 'Gönderiliyor...';

            const formData = new FormData(applicationForm);
            const params = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                params.append(key, value);
            }

            try {
                const response = await fetch(scriptURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params.toString(),
                    redirect: 'follow'
                });

                const text = await response.text();
                statusEl.textContent = 'Başvurunuz başarıyla gönderildi!';
                applicationForm.reset();
            } catch (error) {
                console.error(error);
                statusEl.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
            }
        });
    }

    // Email form handler
    if (emailForm) {
        const statusEl = document.getElementById('email-status');
        
        emailForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            statusEl.textContent = 'Gönderiliyor...';

            const email = document.getElementById('email').value;
            
            // Create URL-encoded data
            const params = new URLSearchParams();
            params.append('type', 'email_signup');
            params.append('email', email);

            try {
                const response = await fetch(scriptURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params.toString(),
                    redirect: 'follow'
                });

                // Google Apps Script may return a redirect, so check if we got any response
                const text = await response.text();
                
                // If we get a response (even if redirected), consider it success
                statusEl.textContent = 'E-posta adresiniz başarıyla eklendi!';
                emailForm.reset();
            } catch (error) {
                console.error('Error details:', error);
                statusEl.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
            }
        });
    }
});
