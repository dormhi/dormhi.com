// dormhi.com - Particle Background Animation

(function() {

    // Respect reduced-motion and data-saver preferences: skip particles entirely
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var saveData = !!(navigator.connection && navigator.connection.saveData);
    if (prefersReducedMotion || saveData) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;height:100dvh;z-index:-3;pointer-events:none;';
    document.body.prepend(canvas);

    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 80;
    var mouse = { x: null, y: null };
    var connectDistance = 120;
    var animId;
    var running = false;

    // Connections (O(n^2)) are disabled on small screens for performance
    var drawConnectionsEnabled = window.innerWidth >= 768;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };

    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, ' + this.opacity + ')';
        ctx.fill();
    };

    function init() {
        particles = [];
        // Adjust count based on screen size
        var count = Math.min(particleCount, Math.floor((canvas.width * canvas.height) / 15000));
        for (var i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectDistance) {
                    var opacity = (1 - dist / connectDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(0, 240, 255, ' + opacity + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Mouse connection
            if (mouse.x !== null) {
                var dmx = particles[i].x - mouse.x;
                var dmy = particles[i].y - mouse.y;
                var distM = Math.sqrt(dmx * dmx + dmy * dmy);

                if (distM < 150) {
                    var mOpacity = (1 - distM / 150) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(191, 0, 255, ' + mOpacity + ')';
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function(p) {
            p.update();
            p.draw();
        });

        if (drawConnectionsEnabled) drawConnections();
        animId = requestAnimationFrame(animate);
    }

    function start() {
        if (running) return;
        running = true;
        animate();
    }

    function stop() {
        running = false;
        if (animId) cancelAnimationFrame(animId);
    }

    // Event listeners
    window.addEventListener('resize', function() {
        drawConnectionsEnabled = window.innerWidth >= 768;
        resize();
        init();
    });

    window.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', function() {
        mouse.x = null;
        mouse.y = null;
    });

    // Pause when the tab/page is hidden to save battery
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stop();
        } else {
            start();
        }
    });

    // Reduce particles on mobile for performance
    if (window.innerWidth < 768) {
        particleCount = 35;
        connectDistance = 90;
    }

    resize();
    init();
    start();

})();
