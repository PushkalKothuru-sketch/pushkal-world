document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- Element Selectors ---
  const gateScreen = document.getElementById('gate-screen');
  const hackedScreen = document.getElementById('hacked-screen');
  const portfolioScreen = document.getElementById('portfolio-screen');

  const btnEnter = document.getElementById('btn-enter');
  const btnWhy = document.getElementById('btn-why');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const contactForm = document.getElementById('contact-form');

  // --- 1. Transition: Gate -> Hacked ---
  btnEnter.addEventListener('click', () => {
    // Phase 1: Glitch effect trigger
    document.body.classList.add('glitch-active');
    
    // Simulate a brief power failure / transition delay
    setTimeout(() => {
      gateScreen.classList.remove('active');
      gateScreen.classList.add('hidden');
      
      hackedScreen.classList.remove('hidden');
      // Trigger reflow to ensure transition works
      void hackedScreen.offsetWidth;
      hackedScreen.classList.add('active');
      
      // Start Hacked Page scripts
      startMatrixRain();
      startTerminalSimulation();
    }, 400);

    // Remove screen shake class after animation completes
    setTimeout(() => {
      document.body.classList.remove('glitch-active');
    }, 1000);
  });

  // --- 2. Matrix Rain Canvas Effect ---
  let matrixInterval = null;
  function startMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters (binary and cyber symbols)
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&+-*/<>[]{}';
    const charArr = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Drops tracking
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // stagger startup
    }
    
    function draw() {
      // Semi-transparent background to create trail effect
      ctx.fillStyle = 'rgba(3, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ff1e27'; // Darker red rain for cyberpunk hacked theme
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Randomize brightness of characters
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff'; // White highlight
        } else if (Math.random() > 0.9) {
          ctx.fillStyle = '#ff8c90'; // Light red
        } else {
          ctx.fillStyle = '#ff1e27'; // Cyber red
        }
        
        ctx.fillText(text, x, y);
        
        // Reset drop to top once it hits bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    }
    
    matrixInterval = setInterval(draw, 33);
  }

  // --- 3. Fake Terminal Log Output ---
  function startTerminalSimulation() {
    const consoleEl = document.getElementById('terminal-console');
    if (!consoleEl) return;
    
    consoleEl.innerHTML = ''; // Clear prior content
    
    // Gather system data dynamically
    const userAgent = navigator.userAgent;
    const platform = navigator.platform || 'Unknown OS';
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const localTime = new Date().toLocaleTimeString();
    
    const logs = [
      { text: `[INIT] Executing payload decryption package...`, type: 'info' },
      { text: `[INFO] Initializing system diagnostic scan...`, type: 'info' },
      { text: `[INFO] Host Platform: ${platform}`, type: 'info' },
      { text: `[INFO] Viewport Screen Resolution: ${screenWidth}x${screenHeight}`, type: 'info' },
      { text: `[INFO] User-Agent detected: ${userAgent.substring(0, 50)}...`, type: 'info' },
      { text: `[INFO] System Time Stamp: ${localTime}`, type: 'info' },
      { text: `[WARNING] Multiple network firewalls active. Bypassing...`, type: 'warn' },
      { text: `[SUCCESS] Port 443 handshake complete. Bypassing SSL pinning.`, type: 'info' },
      { text: `[SYSTEM] Mapping file directory structural hierarchy...`, type: 'info' },
      { text: `[SYSTEM] Encrypting files in documents, system, and user logs...`, type: 'info' },
      { text: `[ERROR] CRITICAL: Decryption block established. Key deleted.`, type: 'error' },
      { text: `[STATUS] Decryption instructions deployed. Ready for user feedback.`, type: 'info' },
    ];
    
    let index = 0;
    
    function printNextLine() {
      if (index >= logs.length) {
        // Log loop complete
        const finalLine = document.createElement('div');
        finalLine.className = 'terminal-line error';
        finalLine.innerHTML = `&gt; ACTION REQUIRED: CLICK BELOW TO UNDERSTAND RECOVERY OPTIONS.`;
        consoleEl.appendChild(finalLine);
        consoleEl.scrollTop = consoleEl.scrollHeight;
        return;
      }
      
      const log = logs[index];
      const lineEl = document.createElement('div');
      lineEl.className = 'terminal-line';
      
      if (log.type === 'error') {
        lineEl.classList.add('error');
      } else if (log.type === 'warn') {
        lineEl.style.color = '#ffb000';
      }
      
      lineEl.innerHTML = `&gt; ${log.text}`;
      consoleEl.appendChild(lineEl);
      
      // Keep scrollbar pinned to bottom
      consoleEl.scrollTop = consoleEl.scrollHeight;
      
      index++;
      // Staggered delay for typing realism
      setTimeout(printNextLine, 350 + Math.random() * 250);
    }
    
    // Start typing logs
    setTimeout(printNextLine, 500);
  }

  // --- 4. Transition: Hacked -> Portfolio ---
  btnWhy.addEventListener('click', () => {
    // Clear Matrix interval
    if (matrixInterval) {
      clearInterval(matrixInterval);
    }
    
    // Add screen shake glitch
    document.body.classList.add('glitch-active');
    
    setTimeout(() => {
      hackedScreen.classList.remove('active');
      hackedScreen.classList.add('hidden');
      
      portfolioScreen.classList.remove('hidden');
      // Trigger reflow
      void portfolioScreen.offsetWidth;
      portfolioScreen.classList.add('active');
      
      // Clean up body class
      document.body.classList.remove('glitch-active');
      
      // Scroll to top of portfolio
      window.scrollTo(0, 0);
    }, 450);
  });

  // --- 5. Portfolio Section Interactions ---
  // Mobile Nav Toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Update menu icon
      const icon = navToggle.querySelector('i');
      if (icon) {
        const isOpened = navLinks.classList.contains('active');
        icon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }
      });
    });
  }

  // Contact Form Submission Handler (simulated with premium toast feedback)
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const submitBtnText = submitBtn.querySelector('span');
      const submitBtnIcon = submitBtn.querySelector('i');
      
      // Show loading state
      const originalText = submitBtnText.textContent;
      submitBtnText.textContent = 'Sending Message...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        // Show success toast-like action
        submitBtnText.textContent = 'Message Sent!';
        submitBtnIcon.setAttribute('data-lucide', 'check');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
        submitBtn.style.background = 'linear-gradient(135deg, #00ff66 0%, #00ffcc 100%)';
        
        // Reset form inputs
        contactForm.reset();
        
        // Reset button state
        setTimeout(() => {
          submitBtnText.textContent = originalText;
          submitBtnIcon.setAttribute('data-lucide', 'send');
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
});
