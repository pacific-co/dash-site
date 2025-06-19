// Terminal Demo Animation
class TerminalDemo {
    constructor() {
        this.commands = [
            { cmd: "blaze new hello_world", output: "Creating new Blaze project 'hello_world'...\n✓ Project created successfully!" },
            { cmd: "cd hello_world", output: "" },
            { cmd: "blaze compile", output: "Compiling hello_world v0.1.0\n✓ Compiled successfully to ./target/hello_world" },
            { cmd: "./target/hello_world", output: "Hello, World!" }
        ];
        
        this.currentCommand = 0;
        this.currentChar = 0;
        this.isTyping = true;
        this.displayText = "";
        this.outputText = "";
        
        this.textElement = document.getElementById('terminal-text');
        this.outputElement = document.getElementById('terminal-output');
        this.cursorElement = document.getElementById('terminal-cursor');
        
        this.init();
    }
    
    init() {
        this.animate();
        this.startCursorBlink();
    }
    
    animate() {
        if (this.currentCommand >= this.commands.length) {
            // Reset animation
            setTimeout(() => {
                this.currentCommand = 0;
                this.currentChar = 0;
                this.isTyping = true;
                this.displayText = "";
                this.outputText = "";
                this.textElement.textContent = "";
                this.outputElement.textContent = "";
                this.animate();
            }, 2000);
            return;
        }

        const command = this.commands[this.currentCommand];

        if (this.isTyping) {
            if (this.currentChar < command.cmd.length) {
                this.displayText = command.cmd.substring(0, this.currentChar + 1);
                this.textElement.textContent = this.displayText;
                this.currentChar++;
                setTimeout(() => this.animate(), 100);
            } else {
                this.isTyping = false;
                if (command.output) {
                    this.outputText += `\n${command.output}\n$ `;
                } else {
                    this.outputText += "\n$ ";
                }
                this.outputElement.textContent = this.outputText;
                setTimeout(() => this.animate(), 1500);
            }
        } else {
            this.currentCommand++;
            this.currentChar = 0;
            this.isTyping = true;
            this.displayText = "";
            this.textElement.textContent = "";
            setTimeout(() => this.animate(), 500);
        }
    }
    
    startCursorBlink() {
        setInterval(() => {
            if (this.cursorElement) {
                this.cursorElement.style.opacity = 
                    this.cursorElement.style.opacity === '0' ? '1' : '0';
            }
        }, 500);
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.activeSection = 'home';
        this.mobileMenuBtn = document.getElementById('mobile-menu');
        this.mobileNav = document.getElementById('mobile-nav');
        this.init();
    }
    
    init() {
        this.setupScrollListener();
        this.setupMobileMenu();
        this.updateActiveNavLinks();
    }
    
    setupScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    handleScroll() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 200) {
                current = section.getAttribute('id') || '';
            }
        });
        
        if (current && current !== this.activeSection) {
            this.activeSection = current;
            this.updateActiveNavLinks();
        }
    }
    
    updateActiveNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.textContent.toLowerCase().includes(this.activeSection) || 
                (this.activeSection === 'home' && link.textContent === 'Home')) {
                link.classList.add('active');
            }
        });
    }
    
    setupMobileMenu() {
        if (this.mobileMenuBtn && this.mobileNav) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.mobileNav.classList.toggle('hidden');
            });
        }
    }
}

// Documentation functionality
class Documentation {
    constructor() {
        this.activeSection = 'intro';
        this.init();
    }
    
    init() {
        this.showSection('intro');
    }
    
    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.docs-section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Show target section
        const targetSection = document.getElementById(`docs-${sectionId}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update navigation
        const navLinks = document.querySelectorAll('.docs-nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = document.querySelector(`[onclick="showDocsSection('${sectionId}')"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        this.activeSection = sectionId;
    }
}

// Code copying functionality
class CodeCopyManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Initialize highlight.js
        if (window.hljs) {
            hljs.highlightAll();
        }
    }
    
    async copyCode(button) {
        const codeBlock = button.closest('.code-block');
        const codeElement = codeBlock.querySelector('code');
        
        if (!codeElement) return;
        
        const code = codeElement.textContent;
        
        try {
            await navigator.clipboard.writeText(code);
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
            // Fallback for older browsers
            this.fallbackCopyTextToClipboard(code, button);
        }
    }
    
    fallbackCopyTextToClipboard(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }
}

// Smooth scrolling functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav && !mobileNav.classList.contains('hidden')) {
        mobileNav.classList.add('hidden');
    }
}

// Documentation section switching
function showDocsSection(sectionId) {
    if (window.documentation) {
        window.documentation.showSection(sectionId);
    }
}

// Code copying function
function copyCode(button) {
    if (window.codeCopyManager) {
        window.codeCopyManager.copyCode(button);
    }
}

// Responsive handling
class ResponsiveHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleResize() {
        const isMobile = window.innerWidth <= 768;
        const hiddenMobileElements = document.querySelectorAll('.hidden-mobile');
        const mobileMenuBtn = document.getElementById('mobile-menu');
        
        if (isMobile) {
            hiddenMobileElements.forEach(el => el.style.display = 'none');
            if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
        } else {
            hiddenMobileElements.forEach(el => el.style.display = 'flex');
            if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
            
            // Hide mobile nav on desktop
            const mobileNav = document.getElementById('mobile-nav');
            if (mobileNav) mobileNav.classList.add('hidden');
        }
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupPreloadHints();
    }
    
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe elements that should animate on scroll
            const animateElements = document.querySelectorAll('.feature-card, .code-block, .docs-card');
            animateElements.forEach(el => observer.observe(el));
        }
    }
    
    setupPreloadHints() {
        // Preload critical fonts
        const fontPreloads = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
            'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&display=swap'
        ];
        
        fontPreloads.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }
}

// Theme and accessibility
class ThemeManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const mobileNav = document.getElementById('mobile-nav');
                if (mobileNav && !mobileNav.classList.contains('hidden')) {
                    mobileNav.classList.add('hidden');
                }
            }
        });
    }
    
    setupFocusManagement() {
        // Ensure focus is visible for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// Error handling and logging
class ErrorHandler {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    window.terminalDemo = new TerminalDemo();
    window.navigation = new Navigation();
    window.documentation = new Documentation();
    window.codeCopyManager = new CodeCopyManager();
    window.responsiveHandler = new ResponsiveHandler();
    window.performanceOptimizer = new PerformanceOptimizer();
    window.themeManager = new ThemeManager();
    window.errorHandler = new ErrorHandler();
    
    // Add loading complete class
    document.body.classList.add('loaded');
    
    console.log('🔥 Blaze website initialized successfully!');
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
