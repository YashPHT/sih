/**
 * ============================================
 * GLASS EFFECT MODULE
 * ============================================
 * 
 * Enhances landing page elements with glassmorphism effects including
 * backdrop blur, dynamic shadows, and smooth interactions. Provides
 * visual depth and modern aesthetic while maintaining accessibility.
 * 
 * FEATURES:
 * - Dynamic glassmorphism effects with backdrop-filter blur
 * - Parallax mouse tracking for depth perception
 * - Smooth hover animations and transitions
 * - Theme-aware styling (light/dark mode)
 * - Respects prefers-reduced-motion for accessibility
 * - Browser fallback for unsupported backdrop-filter
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - Uses CSS transforms for hardware acceleration
 * - Throttles mouse move events to prevent excessive repaints
 * - Automatically disables effects if backdrop-filter is unsupported
 * - Minimal JavaScript footprint - mostly CSS-driven
 * - RequestAnimationFrame for smooth parallax updates
 * 
 * BROWSER SUPPORT:
 * - Chrome/Edge 76+: Full support
 * - Safari 9+: Full support (with -webkit- prefix)
 * - Firefox 103+: Full support (enabled by default)
 * - Fallback: Solid background with reduced opacity for older browsers
 * 
 * ADJUSTABLE PARAMETERS:
 * See the CONFIG object below for all customizable settings including:
 * - Blur intensity and opacity levels
 * - Parallax sensitivity and smoothing
 * - Shadow colors and spread
 * - Animation durations
 * - Interactive effects
 */

export class GlassEffect {
  /**
   * CONFIGURATION OBJECT
   * =====================
   * Adjust these values to customize glass effects and interactions
   * 
   * @property {number} blurAmount - Backdrop filter blur in pixels (8-20 recommended)
   * @property {number} opacity - Base glass opacity (0.6-0.9 for best effect)
   * @property {number} parallaxStrength - Mouse parallax sensitivity (0-1, 0 = disabled)
   * @property {number} parallaxSmoothing - Parallax easing factor (0.05-0.3)
   * @property {boolean} enableShadows - Dynamic shadow effects on hover
   * @property {boolean} enableParallax - Parallax tracking on mouse movement
   * @property {number} throttleMs - Mouse event throttle interval in milliseconds
   */
  static CONFIG = {
    // Glass appearance
    blurAmount: 12,              // Backdrop blur intensity in pixels
    opacity: 0.7,                // Glass element opacity
    borderOpacity: 0.18,         // Glass border opacity
    
    // Interactive effects
    enableParallax: true,        // Parallax effect on mouse movement
    parallaxStrength: 0.02,      // Parallax sensitivity (lower = subtler)
    parallaxSmoothing: 0.1,      // Parallax easing (lower = smoother, higher = snappier)
    
    enableShadows: true,         // Dynamic shadows on hover
    shadowIntensity: 0.2,        // Shadow opacity
    
    enableHoverLift: true,       // Lift effect on hover
    hoverLiftAmount: 8,          // Lift distance in pixels
    
    // Performance
    throttleMs: 16,              // Throttle mouse events (~60fps)
    useRAF: true,                // Use requestAnimationFrame for updates
    
    // Theme-specific colors
    colors: {
      light: {
        glassBase: 'rgba(255, 255, 255, 0.7)',
        glassBorder: 'rgba(255, 255, 255, 0.18)',
        shadowColor: 'rgba(31, 38, 135, 0.15)'
      },
      dark: {
        glassBase: 'rgba(15, 23, 42, 0.7)',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
        shadowColor: 'rgba(0, 0, 0, 0.3)'
      }
    }
  };
  
  constructor() {
    this.glassElements = [];
    this.parallaxElements = [];
    this.currentTheme = 'light';
    this.prefersReducedMotion = false;
    this.supportsBackdropFilter = false;
    this.rafId = null;
    this.targetPosition = { x: 0, y: 0 };
    this.currentPosition = { x: 0, y: 0 };
    this.lastThrottle = 0;
    
    // Bind methods
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.updateParallax = this.updateParallax.bind(this);
  }
  
  /**
   * INITIALIZATION
   * ==============
   * Detects browser support, checks accessibility preferences,
   * and sets up glass effects on target elements
   */
  init() {
    // Check browser support for backdrop-filter
    this.supportsBackdropFilter = this.checkBackdropFilterSupport();
    
    // Check reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Listen for reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
      if (this.prefersReducedMotion) {
        this.disableAnimations();
      } else {
        this.enableAnimations();
      }
    });
    
    // Apply fallback styles if backdrop-filter is not supported
    if (!this.supportsBackdropFilter) {
      this.applyFallbackStyles();
      console.warn('Backdrop filter not supported, using fallback glass effect');
    }
    
    // Find and enhance all glass elements
    this.enhanceGlassElements();
    
    // Set up parallax if enabled and motion is allowed
    if (GlassEffect.CONFIG.enableParallax && !this.prefersReducedMotion) {
      this.initParallax();
    }
    
    // Detect current theme
    this.currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    this.applyThemeColors();
  }
  
  /**
   * BROWSER SUPPORT DETECTION
   * ==========================
   * Checks if backdrop-filter is supported with proper prefixes
   */
  checkBackdropFilterSupport() {
    const element = document.createElement('div');
    const prefixes = ['backdrop-filter', '-webkit-backdrop-filter'];
    
    for (const prefix of prefixes) {
      element.style.setProperty(prefix, 'blur(1px)');
      if (element.style[prefix.replace(/-/g, '')] !== undefined) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * FALLBACK STYLES
   * ===============
   * Applies alternative styling for browsers without backdrop-filter support
   * Uses solid backgrounds with reduced opacity as fallback
   */
  applyFallbackStyles() {
    const style = document.createElement('style');
    style.id = 'glass-effect-fallback';
    style.textContent = `
      .glass-card {
        background: ${GlassEffect.CONFIG.colors[this.currentTheme].glassBase} !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      
      /* Add subtle background pattern for depth */
      .glass-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
          rgba(255,255,255,0.1) 0%, 
          transparent 50%, 
          rgba(0,0,0,0.05) 100%);
        pointer-events: none;
        border-radius: inherit;
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * GLASS ELEMENT ENHANCEMENT
   * ==========================
   * Finds and enhances elements with glass-card class
   * Adds hover effects and dynamic styling
   */
  enhanceGlassElements() {
    this.glassElements = Array.from(document.querySelectorAll('.glass-card'));
    
    this.glassElements.forEach(element => {
      // Store original styles
      element.dataset.originalTransform = element.style.transform || '';
      
      // Add hover effects if enabled
      if (GlassEffect.CONFIG.enableHoverLift && !this.prefersReducedMotion) {
        element.addEventListener('mouseenter', () => this.onGlassHover(element, true));
        element.addEventListener('mouseleave', () => this.onGlassHover(element, false));
      }
      
      // Apply dynamic shadows if enabled
      if (GlassEffect.CONFIG.enableShadows) {
        this.updateShadow(element, false);
      }
    });
  }
  
  /**
   * HOVER EFFECTS
   * =============
   * Handles hover state changes for glass elements
   * Applies lift effect and enhanced shadows
   */
  onGlassHover(element, isHovered) {
    if (this.prefersReducedMotion) return;
    
    if (isHovered) {
      // Apply lift effect
      const lift = GlassEffect.CONFIG.hoverLiftAmount;
      const currentTransform = element.dataset.parallaxTransform || '';
      element.style.transform = `${currentTransform} translateY(-${lift}px)`;
      
      // Enhance shadow
      if (GlassEffect.CONFIG.enableShadows) {
        this.updateShadow(element, true);
      }
    } else {
      // Return to original position
      const currentTransform = element.dataset.parallaxTransform || '';
      element.style.transform = currentTransform;
      
      // Reset shadow
      if (GlassEffect.CONFIG.enableShadows) {
        this.updateShadow(element, false);
      }
    }
  }
  
  /**
   * DYNAMIC SHADOWS
   * ===============
   * Updates element shadows based on hover state
   */
  updateShadow(element, isEnhanced) {
    const shadowColor = GlassEffect.CONFIG.colors[this.currentTheme].shadowColor;
    
    if (isEnhanced) {
      element.style.boxShadow = `
        0 12px 40px 0 ${shadowColor},
        0 2px 8px 0 ${shadowColor}
      `;
    } else {
      element.style.boxShadow = `0 8px 32px 0 ${shadowColor}`;
    }
  }
  
  /**
   * PARALLAX INITIALIZATION
   * =======================
   * Sets up mouse tracking for parallax effects
   */
  initParallax() {
    this.parallaxElements = this.glassElements.filter(el => 
      !el.hasAttribute('data-no-parallax')
    );
    
    if (this.parallaxElements.length === 0) return;
    
    // Add mouse move listener
    document.addEventListener('mousemove', this.handleMouseMove);
    
    // Start animation loop
    if (GlassEffect.CONFIG.useRAF) {
      this.startParallaxLoop();
    }
  }
  
  /**
   * MOUSE MOVEMENT HANDLING
   * =======================
   * Throttled mouse position tracking for parallax effect
   */
  handleMouseMove(event) {
    const now = performance.now();
    
    // Throttle events
    if (now - this.lastThrottle < GlassEffect.CONFIG.throttleMs) {
      return;
    }
    
    this.lastThrottle = now;
    
    // Calculate normalized position (-1 to 1)
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;
    
    this.targetPosition = { x, y };
    
    // Update immediately if not using RAF
    if (!GlassEffect.CONFIG.useRAF) {
      this.updateParallax();
    }
  }
  
  /**
   * PARALLAX ANIMATION LOOP
   * =======================
   * Smoothly interpolates parallax position using RAF
   */
  startParallaxLoop() {
    const animate = () => {
      this.updateParallax();
      this.rafId = requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  /**
   * PARALLAX UPDATE
   * ===============
   * Applies smooth parallax transform to elements
   */
  updateParallax() {
    if (this.prefersReducedMotion) return;
    
    // Smooth interpolation
    const smoothing = GlassEffect.CONFIG.parallaxSmoothing;
    this.currentPosition.x += (this.targetPosition.x - this.currentPosition.x) * smoothing;
    this.currentPosition.y += (this.targetPosition.y - this.currentPosition.y) * smoothing;
    
    // Apply transform to each parallax element
    this.parallaxElements.forEach((element, index) => {
      // Different layers move at different speeds for depth
      const depth = (index + 1) * GlassEffect.CONFIG.parallaxStrength;
      const x = this.currentPosition.x * depth * 20;
      const y = this.currentPosition.y * depth * 20;
      
      const transform = `translate(${x}px, ${y}px)`;
      element.dataset.parallaxTransform = transform;
      
      // Preserve any existing transforms (like hover lift)
      if (element.matches(':hover') && GlassEffect.CONFIG.enableHoverLift) {
        element.style.transform = `${transform} translateY(-${GlassEffect.CONFIG.hoverLiftAmount}px)`;
      } else {
        element.style.transform = transform;
      }
    });
  }
  
  /**
   * THEME MANAGEMENT
   * ================
   * Updates glass effect colors based on current theme
   */
  updateTheme(theme) {
    this.currentTheme = theme;
    this.applyThemeColors();
  }
  
  applyThemeColors() {
    const colors = GlassEffect.CONFIG.colors[this.currentTheme];
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--glass-bg', colors.glassBase);
    document.documentElement.style.setProperty('--glass-border', colors.glassBorder);
    
    // Update shadows on existing elements
    if (GlassEffect.CONFIG.enableShadows) {
      this.glassElements.forEach(element => {
        this.updateShadow(element, element.matches(':hover'));
      });
    }
    
    // Update fallback styles if needed
    if (!this.supportsBackdropFilter) {
      const fallbackStyle = document.getElementById('glass-effect-fallback');
      if (fallbackStyle) {
        fallbackStyle.textContent = fallbackStyle.textContent.replace(
          /rgba\([^)]+\)/g,
          colors.glassBase
        );
      }
    }
  }
  
  /**
   * ACCESSIBILITY
   * =============
   * Disables/enables animations based on user preferences
   */
  disableAnimations() {
    // Stop parallax
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    // Reset transforms
    this.glassElements.forEach(element => {
      element.style.transform = '';
      element.style.transition = 'none';
    });
  }
  
  enableAnimations() {
    if (!this.prefersReducedMotion) {
      // Re-enable transitions
      this.glassElements.forEach(element => {
        element.style.transition = '';
      });
      
      // Restart parallax if it was running
      if (GlassEffect.CONFIG.enableParallax && GlassEffect.CONFIG.useRAF) {
        this.startParallaxLoop();
      }
    }
  }
  
  /**
   * CLEANUP
   * =======
   * Removes event listeners and cancels animations
   */
  destroy() {
    // Remove event listeners
    document.removeEventListener('mousemove', this.handleMouseMove);
    
    // Cancel animation frame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    // Clean up element references
    this.glassElements.forEach(element => {
      element.style.transform = '';
      element.style.boxShadow = '';
    });
    
    this.glassElements = [];
    this.parallaxElements = [];
    
    // Remove fallback styles
    const fallbackStyle = document.getElementById('glass-effect-fallback');
    if (fallbackStyle) {
      fallbackStyle.remove();
    }
  }
  
  /**
   * PUBLIC API
   * ==========
   * Utility methods for manual control
   */
  
  /**
   * Refresh glass elements (call after DOM changes)
   */
  refresh() {
    this.enhanceGlassElements();
    if (GlassEffect.CONFIG.enableParallax && !this.prefersReducedMotion) {
      this.initParallax();
    }
  }
  
  /**
   * Check if effects are active
   */
  isActive() {
    return !this.prefersReducedMotion && this.supportsBackdropFilter;
  }
  
  /**
   * Get current configuration
   */
  getConfig() {
    return { ...GlassEffect.CONFIG };
  }
  
  /**
   * Update configuration at runtime
   * @param {Object} config - Partial config object to merge
   */
  updateConfig(config) {
    Object.assign(GlassEffect.CONFIG, config);
    this.refresh();
  }
}

/**
 * USAGE EXAMPLE:
 * ==============
 * 
 * import { GlassEffect } from './glassEffect.js';
 * 
 * // Basic initialization
 * const glassEffect = new GlassEffect();
 * glassEffect.init();
 * 
 * // Customize before initialization
 * GlassEffect.CONFIG.blurAmount = 16;
 * GlassEffect.CONFIG.parallaxStrength = 0.05;
 * GlassEffect.CONFIG.enableShadows = true;
 * 
 * const glassEffect = new GlassEffect();
 * glassEffect.init();
 * 
 * // Theme switching
 * glassEffect.updateTheme('dark');
 * 
 * // Runtime configuration updates
 * glassEffect.updateConfig({
 *   parallaxStrength: 0.03,
 *   hoverLiftAmount: 12
 * });
 * 
 * // Refresh after adding new glass elements
 * glassEffect.refresh();
 * 
 * // Cleanup
 * glassEffect.destroy();
 * 
 * HTML USAGE:
 * ===========
 * Add 'glass-card' class to elements you want to enhance:
 * 
 * <div class="glass-card">
 *   <!-- Content -->
 * </div>
 * 
 * Disable parallax on specific elements:
 * <div class="glass-card" data-no-parallax>
 *   <!-- This card won't move with mouse -->
 * </div>
 * 
 * PERFORMANCE TIPS:
 * =================
 * - Limit number of glass elements on page (2-4 recommended)
 * - Reduce parallaxStrength for subtler, less CPU-intensive effects
 * - Disable parallax on mobile devices for better battery life
 * - Increase throttleMs if experiencing performance issues
 * - Use data-no-parallax attribute for static elements
 * 
 * BROWSER FALLBACK BEHAVIOR:
 * ==========================
 * 
 * No backdrop-filter support (older browsers):
 * - Solid semi-transparent backgrounds used instead
 * - Subtle gradient overlay added for depth
 * - All interactive effects still work
 * 
 * Prefers-reduced-motion enabled:
 * - All animations disabled
 * - Static glass effect applied
 * - Hover effects simplified or removed
 * - Parallax completely disabled
 * 
 * BROWSER-SPECIFIC NOTES:
 * =======================
 * 
 * Safari:
 * - Full support with -webkit- prefix
 * - Backdrop-filter performs excellently
 * - Hardware acceleration works well
 * 
 * Firefox:
 * - Backdrop-filter enabled by default in Firefox 103+
 * - Earlier versions need layout.css.backdrop-filter.enabled = true
 * - Fallback automatically applied if disabled
 * 
 * Chrome/Edge:
 * - Best performance and support
 * - All features work as expected
 * 
 * Mobile Browsers:
 * - Consider disabling parallax for battery savings
 * - Glass effects work well but may impact scrolling performance
 * - Test on target devices for optimal experience
 */
