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
     

    // mu ug add parallax effect to background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const bgContainer = document.querySelector('.bg-container');
        
        if (bgContainer) {
            bgContainer.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
})
    // mu ug add parallax effect to background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const bgContainer = document.querySelector('.bg-container');
        
        if (bgContainer) {
            bgContainer.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });


document.addEventListener('DOMContentLoaded', () => {
    const bgButton = document.getElementById('change-bg-btn');
    const bgContainer = document.querySelector('.bg-container2');
  
    const gifs = [
    
      'resources/cafe-table.gif',
      'resources/cafe.gif'
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
 document.addEventListener('DOMContentLoaded', async () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    let sourceNode;

    // Load the music file
    const response = await fetch('music/bg-music.mp3'); // Adjust path
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Create source node
    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;

    // Connect to gain and output
    sourceNode.connect(gainNode).connect(audioContext.destination);

    // Set initial volume and fade in to 30%
    const targetVolume = 0.3; // Adjust volume here (0.0 to 1.0)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(targetVolume, audioContext.currentTime + 3); // 3-second fade-in

    // Start playback
    sourceNode.start();

    // Resume audio context on first user interaction (required by browsers)
    const resumeAudio = () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        document.removeEventListener('click', resumeAudio);
    };
    document.addEventListener('click', resumeAudio);

    // Optional: Fade out on unload
    window.addEventListener('beforeunload', () => {
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);
        setTimeout(() => {
            try { sourceNode.stop(); } catch (e) {}
        }, 2000);
    });
});
   
  const music = document.getElementById("background-music");

  // Set default volume or restore previous volume
  const savedVolume = localStorage.getItem("bgMusicVolume");
  music.volume = savedVolume ? parseFloat(savedVolume) : 0.2;

  // Restore playback time
  const savedTime = localStorage.getItem("bgMusicTime");
  if (savedTime) {
    music.currentTime = parseFloat(savedTime);
  }

  // Try to play (some browsers require interaction)
  music.play().catch(() => {
    // Auto-play might be blocked — you could show a play button if needed
    console.log("Autoplay blocked. Waiting for user interaction.");
  });

  // Save volume changes
  music.addEventListener("volumechange", () => {
    localStorage.setItem("bgMusicVolume", music.volume);
  });

  // Save playback time every second
  music.addEventListener("timeupdate", () => {
    localStorage.setItem("bgMusicTime", music.currentTime);
  });

  /* Modern Slideshow */
  document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.showcase-slide');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let isAnimating = false;
    let autoplayInterval;

    function updateSlideshow(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Update track position
        track.style.transform = `translateX(-${index * 100}%)`;

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        updateSlideshow(currentIndex);
    }

    // Event Listeners
    prev.addEventListener('click', () => {
        clearInterval(autoplayInterval);
        goToSlide(currentIndex - 1);
        startAutoplay();
    });

    next.addEventListener('click', () => {
        clearInterval(autoplayInterval);
        goToSlide(currentIndex + 1);
        startAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoplayInterval);
            goToSlide(index);
            startAutoplay();
        });
    });

    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    // Pause autoplay on hover
    track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    track.addEventListener('mouseleave', startAutoplay);

    // Start autoplay
    startAutoplay();
  });