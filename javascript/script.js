// hulat for DOM to load // THIS JS 
document.addEventListener('DOMContentLoaded', function() {
    // mobile menu burgir
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Animate hamburger to X
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
    
    // remove welcome overlay after animation
    setTimeout(() => {
        const welcomeOverlay = document.querySelector('.welcome-overlay');
        if (welcomeOverlay) {
            welcomeOverlay.style.display = 'none';
        }
    }, 3000);
    
    // smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
     
 });
// HOME JS HANTUD ABOUT.HTML




// THIS KAY APIL NA SA INDEx, ABOUT, CONTACT
document.addEventListener('DOMContentLoaded', () => {
    const bgButton = document.getElementById('change-bg-btn');
    const bgContainer = document.querySelector('.bg-container');
  
    const gifs = [
     'resources/background.gif',
    'resources/tokyo.gif',
    'resources/city.gif',
    'resources/cafe.gif',
    'resources/forest.gif', 
    'resources/room.gif',
    'resources/witch.gif',
    'resources/diluc.gif',
    'resources/train.gif',
    'resources/lumine.gif'
    ];
  
    let currentGifIndex = 0;
    let isFading = false;
  
    bgButton.addEventListener('click', () => {
      if (isFading) return;
      isFading = true;
  
      // Trigger fade out
      bgContainer.style.opacity = '0';
  
      setTimeout(() => {
        // Update background
        currentGifIndex = (currentGifIndex + 1) % gifs.length;
        bgContainer.style.backgroundImage = `url('${gifs[currentGifIndex]}')`;
  
        // Trigger fade in
        bgContainer.style.opacity = '0.7';
  
        // Unlock click after fade
        setTimeout(() => {
          isFading = false;
        }, 500);
      }, 500);
    });
  });
/* projects */
   document.addEventListener('DOMContentLoaded', function() {
    const wrappers = document.querySelectorAll('.scrolling-wrapper');

    wrappers.forEach(wrapper => {
        const content = wrapper.querySelector('.scroll-content');
        const clone = content.cloneNode(true);
        wrapper.appendChild(clone);

        const totalWidth = content.offsetWidth;

        // Dynamically generate keyframes
        const style = document.createElement('style');
        const animationName = 'scroll-' + Math.random().toString(36).substr(2, 5); // unique name

        style.textContent = `
            @keyframes ${animationName} {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${totalWidth}px); }
            }

            .scrolling-wrapper {
                display: flex;
                width: max-content;
                animation: ${animationName} ${totalWidth / 50}s linear infinite;
            }

            .scrolling-wrapper:hover {
                animation-play-state: paused;
            }
        `;
        document.head.appendChild(style);
    });
});