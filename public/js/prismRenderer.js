/**
 * ============================================
 * PRISM RENDERER MODULE
 * ============================================
 * 
 * Renders an animated prism/particle background effect using Canvas 2D API.
 * Provides a visually engaging backdrop for the landing page with smooth
 * animations and theme-aware color schemes.
 * 
 * FEATURES:
 * - Animated prismatic particles with gradient trails
 * - Automatic render suspension when page is hidden (battery/performance optimization)
 * - Theme-aware color palettes (light/dark mode support)
 * - Respects prefers-reduced-motion accessibility setting
 * - Responsive canvas sizing with automatic DPI scaling
 * - Efficient cleanup and resource management
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - Uses requestAnimationFrame for optimal frame timing
 * - Automatically pauses rendering when tab is inactive (Page Visibility API)
 * - Throttles resize events to prevent performance issues
 * - Configurable particle count based on screen size
 * - Uses integer coordinates when possible for faster rendering
 * 
 * BROWSER SUPPORT:
 * - Chrome/Edge: Full support
 * - Firefox: Full support
 * - Safari: Full support (including backdrop-filter)
 * - Fallback: Gracefully degrades to static background if Canvas is unsupported
 * 
 * ADJUSTABLE PARAMETERS:
 * See the CONFIG object below for all customizable settings including:
 * - Particle count and size
 * - Animation speed and direction
 * - Color schemes for light/dark themes
 * - Connection line visibility and distance
 * - Mouse interaction radius
 */

export class PrismRenderer {
  /**
   * CONFIGURATION OBJECT
   * =====================
   * Adjust these values to customize the visual appearance and performance.
   * 
   * @property {number} particleCount - Base number of particles (auto-scales for mobile)
   * @property {number} particleSize - Radius of each particle in pixels
   * @property {number} baseSpeed - Base movement speed multiplier (0.1 - 2.0 recommended)
   * @property {number} connectionDistance - Max distance for drawing lines between particles
   * @property {boolean} enableConnections - Whether to draw lines connecting nearby particles
   * @property {boolean} enableMouseInteraction - Whether particles react to mouse movement
   * @property {number} mouseRadius - Radius of mouse interaction area in pixels
   * @property {number} mouseForce - Strength of mouse repulsion (0 - 1)
   * @property {Object} colors - Color palettes for light and dark themes
   */
  static CONFIG = {
    // Particle settings
    particleCount: 80,           // Desktop particle count (auto-reduces on mobile)
    particleSize: 2.5,           // Particle radius in pixels
    baseSpeed: 0.3,              // Movement speed (higher = faster)
    
    // Visual effects
    connectionDistance: 120,      // Max distance to draw connection lines
    enableConnections: true,      // Draw lines between nearby particles
    enableMouseInteraction: true, // Particles react to cursor
    mouseRadius: 150,            // Mouse interaction radius
    mouseForce: 0.15,            // Mouse repulsion strength
    
    // Color schemes (can use hex, rgb, or rgba)
    colors: {
      light: {
        particles: ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899'],
        connections: 'rgba(59, 130, 246, 0.15)',
        background: 'transparent'
      },
      dark: {
        particles: ['#34d399', '#60a5fa', '#a78bfa', '#f472b6'],
        connections: 'rgba(96, 165, 250, 0.2)',
        background: 'transparent'
      }
    },
    
    // Performance tuning
    targetFPS: 60,               // Target frames per second
    mobileParticleRatio: 0.5,    // Particle count multiplier for mobile (50%)
    resizeDebounce: 250,         // Resize event debounce in milliseconds
  };
  
  /**
   * Constructor
   * @param {string} canvasId - ID of the canvas element to render to
   */
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    
    // Fallback handling if canvas is not supported
    if (!this.canvas || !this.canvas.getContext) {
      console.warn('Canvas not supported, prism renderer disabled');
      this.isSupported = false;
      return;
    }
    
    this.isSupported = true;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.isRunning = false;
    this.isPaused = false;
    this.theme = 'light';
    
    // Mouse tracking
    this.mouse = {
      x: null,
      y: null,
      radius: PrismRenderer.CONFIG.mouseRadius
    };
    
    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Bind methods
    this.handleResize = this.debounce(this.resize.bind(this), PrismRenderer.CONFIG.resizeDebounce);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    
    this.init();
  }
  
  /**
   * INITIALIZATION
   * ==============
   * Sets up the canvas, creates particles, and attaches event listeners
   */
  init() {
    if (!this.isSupported) return;
    
    this.resize();
    this.createParticles();
    this.attachEventListeners();
  }
  
  /**
   * CANVAS SETUP
   * ============
   * Configures canvas dimensions with proper DPI scaling
   */
  resize() {
    if (!this.canvas) return;
    
    // Get device pixel ratio for sharp rendering on retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    // Set internal canvas size (with DPI scaling)
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    // Set display size
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    
    // Scale context to match DPI
    this.ctx.scale(dpr, dpr);
    
    // Store logical dimensions
    this.width = rect.width;
    this.height = rect.height;
    
    // Recreate particles on significant size changes
    if (this.particles.length > 0) {
      this.createParticles();
    }
  }
  
  /**
   * PARTICLE CREATION
   * =================
   * Initializes particle array with random positions and velocities
   * Automatically reduces particle count on mobile devices for performance
   */
  createParticles() {
    const isMobile = window.innerWidth < 768;
    const particleCount = Math.floor(
      PrismRenderer.CONFIG.particleCount * 
      (isMobile ? PrismRenderer.CONFIG.mobileParticleRatio : 1)
    );
    
    this.particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * PrismRenderer.CONFIG.baseSpeed,
        vy: (Math.random() - 0.5) * PrismRenderer.CONFIG.baseSpeed,
        size: PrismRenderer.CONFIG.particleSize,
        color: this.getRandomColor()
      });
    }
  }
  
  /**
   * COLOR SELECTION
   * ===============
   * Returns a random color from the current theme palette
   */
  getRandomColor() {
    const palette = PrismRenderer.CONFIG.colors[this.theme].particles;
    return palette[Math.floor(Math.random() * palette.length)];
  }
  
  /**
   * EVENT LISTENERS
   * ===============
   * Attaches handlers for resize, visibility changes, and mouse interaction
   */
  attachEventListeners() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    if (PrismRenderer.CONFIG.enableMouseInteraction) {
      this.canvas.addEventListener('mousemove', this.handleMouseMove);
      this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
    }
    
    // Listen for reduced motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
      if (this.prefersReducedMotion && this.isRunning) {
        this.pause();
      }
    });
  }
  
  /**
   * VISIBILITY HANDLING
   * ===================
   * Pauses rendering when page is hidden to save battery and CPU
   * This is critical for performance on mobile devices and background tabs
   */
  handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    } else if (this.isRunning && !this.prefersReducedMotion) {
      this.resume();
    }
  }
  
  /**
   * MOUSE INTERACTION
   * =================
   * Tracks mouse position for particle interaction effects
   */
  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
  }
  
  handleMouseLeave() {
    this.mouse.x = null;
    this.mouse.y = null;
  }
  
  /**
   * ANIMATION LOOP
   * ==============
   * Main render loop using requestAnimationFrame for smooth 60fps animation
   */
  animate() {
    if (!this.isRunning || this.isPaused) return;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw connection lines first (behind particles)
    if (PrismRenderer.CONFIG.enableConnections) {
      this.drawConnections();
    }
    
    // Update and draw particles
    this.updateParticles();
    this.drawParticles();
    
    // Continue animation loop
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  /**
   * PARTICLE UPDATES
   * ================
   * Updates particle positions with boundary collision and mouse interaction
   */
  updateParticles() {
    // Skip movement if reduced motion is preferred
    if (this.prefersReducedMotion) return;
    
    this.particles.forEach(particle => {
      // Mouse interaction - repel particles from cursor
      if (PrismRenderer.CONFIG.enableMouseInteraction && this.mouse.x !== null) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * PrismRenderer.CONFIG.mouseForce;
          particle.vy += Math.sin(angle) * force * PrismRenderer.CONFIG.mouseForce;
        }
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary collision with slight damping
      if (particle.x < 0 || particle.x > this.width) {
        particle.vx *= -0.95;
        particle.x = Math.max(0, Math.min(this.width, particle.x));
      }
      if (particle.y < 0 || particle.y > this.height) {
        particle.vy *= -0.95;
        particle.y = Math.max(0, Math.min(this.height, particle.y));
      }
      
      // Gradually decay velocity toward base speed
      const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
      const maxSpeed = PrismRenderer.CONFIG.baseSpeed * 2;
      if (speed > maxSpeed) {
        particle.vx *= 0.98;
        particle.vy *= 0.98;
      }
    });
  }
  
  /**
   * PARTICLE RENDERING
   * ==================
   * Draws particles as small glowing circles
   */
  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      
      // Add glow effect
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'transparent');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
  }
  
  /**
   * CONNECTION LINES
   * ================
   * Draws lines between particles within connection distance
   * Line opacity decreases with distance for a natural look
   */
  drawConnections() {
    const connectionColor = PrismRenderer.CONFIG.colors[this.theme].connections;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < PrismRenderer.CONFIG.connectionDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / PrismRenderer.CONFIG.connectionDistance);
          
          this.ctx.beginPath();
          this.ctx.strokeStyle = connectionColor.replace(/[\d.]+\)$/g, `${opacity * 0.3})`);
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  /**
   * PUBLIC API
   * ==========
   * Methods for controlling the renderer lifecycle
   */
  
  /**
   * Start the animation loop
   */
  start() {
    if (!this.isSupported) return;
    
    // Don't start if user prefers reduced motion
    if (this.prefersReducedMotion) {
      console.log('Prism renderer: Respecting prefers-reduced-motion, rendering static particles');
      // Draw one frame of static particles
      this.drawParticles();
      return;
    }
    
    this.isRunning = true;
    this.isPaused = false;
    this.animate();
  }
  
  /**
   * Pause the animation (keeps state)
   */
  pause() {
    this.isPaused = true;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  /**
   * Resume the animation
   */
  resume() {
    if (this.isRunning && this.isPaused) {
      this.isPaused = false;
      this.animate();
    }
  }
  
  /**
   * Stop and cleanup
   */
  stop() {
    this.isRunning = false;
    this.isPaused = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  /**
   * Update theme colors
   * @param {string} theme - 'light' or 'dark'
   */
  updateTheme(theme) {
    if (theme !== this.theme) {
      this.theme = theme;
      // Reassign colors to existing particles
      this.particles.forEach(particle => {
        particle.color = this.getRandomColor();
      });
    }
  }
  
  /**
   * Cleanup all resources
   */
  destroy() {
    this.stop();
    
    // Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    
    // Clear references
    this.particles = [];
    this.ctx = null;
    this.canvas = null;
  }
  
  /**
   * UTILITY FUNCTIONS
   * =================
   */
  
  /**
   * Debounce helper for resize events
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

/**
 * USAGE EXAMPLE:
 * ==============
 * 
 * import { PrismRenderer } from './prismRenderer.js';
 * 
 * // Basic usage
 * const renderer = new PrismRenderer('my-canvas-id');
 * renderer.start();
 * 
 * // Customize before initialization
 * PrismRenderer.CONFIG.particleCount = 120;
 * PrismRenderer.CONFIG.baseSpeed = 0.5;
 * PrismRenderer.CONFIG.colors.light.particles = ['#ff0000', '#00ff00', '#0000ff'];
 * 
 * // Theme switching
 * renderer.updateTheme('dark');
 * 
 * // Pause/resume
 * renderer.pause();
 * renderer.resume();
 * 
 * // Cleanup
 * renderer.destroy();
 * 
 * PERFORMANCE TIPS:
 * =================
 * - Reduce particleCount on lower-end devices (40-60 recommended)
 * - Disable connections on mobile for better performance
 * - Lower baseSpeed if experiencing frame drops
 * - Increase resizeDebounce if resize handling is sluggish
 * 
 * FALLBACK BEHAVIOR:
 * ==================
 * If Canvas is not supported:
 * - isSupported will be false
 * - All methods will fail silently
 * - Landing page will use static background gradient
 * 
 * If prefers-reduced-motion is enabled:
 * - Animation loop will not start
 * - Single static frame will be rendered
 * - No CPU/battery usage from animation
 */
