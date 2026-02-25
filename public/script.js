// 像素时钟更新
let hoursEl, minutesEl, secondsEl, dateEl;
let cachedDate = '';

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (hoursEl && minutesEl && secondsEl) {
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
    }

    // 日期每天更新一次即可
    const currentDateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' });
    if (dateEl && cachedDate !== currentDateStr) {
        dateEl.textContent = currentDateStr;
        cachedDate = currentDateStr;
    }
}

// 初始化时钟
function initClock() {
    hoursEl = document.querySelector('.clock-label[data-label="H"]');
    minutesEl = document.querySelector('.clock-label[data-label="M"]');
    secondsEl = document.querySelector('.clock-label[data-label="S"]');
    dateEl = document.getElementById('clockDate');
    updateClock();
    setInterval(updateClock, 1000);
}

// 生成背景粒子（合并创建函数）
function createBackgroundParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    const twinklingContainer = document.getElementById('twinklingContainer');
    const matrixContainer = document.getElementById('matrixContainer');

    if (!particlesContainer || !twinklingContainer || !matrixContainer) return;

    // 使用文档片段批量添加
    const particlesFragment = document.createDocumentFragment();
    const twinklingFragment = document.createDocumentFragment();
    const matrixFragment = document.createDocumentFragment();

    // 漂浮像素粒子
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'pixel-particle';
        particle.style.cssText = `
            width: ${Math.random() * 6 + 4}px;
            height: ${Math.random() * 6 + 4}px;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 15}s;
            animation-duration: ${Math.random() * 10 + 15}s;
        `;
        particlesFragment.appendChild(particle);
    }

    // 闪烁像素点
    for (let i = 0; i < 50; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'twinkling-pixel';
        pixel.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
            animation-duration: ${Math.random() * 2 + 1}s;
        `;
        twinklingFragment.appendChild(pixel);
    }

    // 数字矩阵
    const binaryChars = ['0', '1'];
    for (let i = 0; i < 8; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        let binaryString = '';
        for (let j = 0; j < 30; j++) {
            binaryString += binaryChars[Math.floor(Math.random() * binaryChars.length)];
        }
        column.textContent = binaryString;
        column.style.cssText = `
            left: ${(i / 8) * 100 + (Math.random() * 10 - 5)}%;
            animation-delay: ${Math.random() * 8}s;
            animation-duration: ${Math.random() * 5 + 8}s;
        `;
        matrixFragment.appendChild(column);
    }

    particlesContainer.appendChild(particlesFragment);
    twinklingContainer.appendChild(twinklingFragment);
    matrixContainer.appendChild(matrixFragment);
}

// 鼠标光晕跟随（使用CSS变量优化性能）
let glowSpot;
let mouseX = 0, mouseY = 0;
let isGlowVisible = false;

function initMouseGlow() {
    glowSpot = document.createElement('div');
    glowSpot.className = 'mouse-glow';
    glowSpot.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(0, 229, 229, 0.15) 0%, rgba(255, 110, 199, 0.08) 30%, transparent 70%);
        pointer-events: none;
        border-radius: 50%;
        z-index: 0;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.1s ease-out;
        will-change: transform, opacity;
    `;
    document.body.appendChild(glowSpot);
}

// 使用requestAnimationFrame优化光晕跟随
let glowAnimationId;
function updateGlowPosition() {
    if (glowSpot && isGlowVisible) {
        glowSpot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        glowAnimationId = requestAnimationFrame(updateGlowPosition);
    }
}

// 头像悬停效果
function initAvatarEffect() {
    const avatar = document.querySelector('.avatar');
    if (!avatar) return;

    let shakeCount = 0;
    let isShaking = false;

    avatar.addEventListener('mouseenter', () => {
        if (isShaking) return;
        isShaking = true;
        shakeCount = 0;

        const shake = () => {
            if (shakeCount >= 10) {
                isShaking = false;
                return;
            }
            const x = Math.random() * 6 - 3;
            const y = Math.random() * 6 - 3;
            avatar.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
            shakeCount++;
            requestAnimationFrame(shake);
        };
        shake();
    });

    avatar.addEventListener('mouseleave', () => {
        avatar.style.transform = 'scale(1)';
        isShaking = false;
    });
}

// 卡片3D倾斜效果（优化版）
let card, cardRect, centerX, centerY;
let tiltAnimationId;

function updateCardTilt(e) {
    if (!cardRect) {
        cardRect = card.getBoundingClientRect();
        centerX = cardRect.width / 2;
        centerY = cardRect.height / 2;
    }

    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;

    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;
    const shadowX = (x - centerX) / 10;
    const shadowY = (centerY - y) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.boxShadow = `${-shadowX}px ${-shadowY}px 40px rgba(0, 229, 229, 0.3), 0 0 0 4px var(--bg-dark), 0 0 0 6px var(--primary-cyan)`;
}

function initCardEffect() {
    card = document.querySelector('.card');
    if (!card) return;

    card.addEventListener('mouseenter', () => {
        cardRect = card.getBoundingClientRect();
        centerX = cardRect.width / 2;
        centerY = cardRect.height / 2;
    });

    card.addEventListener('mousemove', (e) => {
        cancelAnimationFrame(tiltAnimationId);
        tiltAnimationId = requestAnimationFrame(() => updateCardTilt(e));
    });

    card.addEventListener('mouseleave', () => {
        cancelAnimationFrame(tiltAnimationId);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.boxShadow = '';
        cardRect = null;
    });
}

// 像素光标跟随（优化版）
let cursorTrailPool = [];
let lastCursorTime = 0;
const MAX_CURSOR_TRAILS = 20;

function createCursorTrail(e) {
    const now = Date.now();
    if (now - lastCursorTime < 50) return;
    lastCursorTime = now;

    // 从池中复用元素
    let cursor = cursorTrailPool.pop();
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            pointer-events: none;
            z-index: 9999;
            will-change: opacity, transform;
        `;
        document.body.appendChild(cursor);
    }

    const isCyan = Math.random() > 0.5;
    cursor.style.background = isCyan ? 'rgba(0, 229, 229, 0.8)' : 'rgba(255, 110, 199, 0.8)';
    cursor.style.left = (e.clientX - 3) + 'px';
    cursor.style.top = (e.clientY - 3) + 'px';
    cursor.style.animation = 'none';
    cursor.style.opacity = '1';
    cursor.style.transform = 'scale(1) rotate(0deg)';

    // 强制重绘
    cursor.offsetHeight;

    cursor.style.animation = 'pixelTrail 0.8s ease-out forwards';

    setTimeout(() => {
        cursorTrailPool.push(cursor);
    }, 800);
}

// 按钮磁吸效果（使用事件委托）
function initButtonEffects() {
    const links = document.querySelectorAll('.project-link, .social-link');
    links.forEach(link => {
        link.style.willChange = 'transform';
        link.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });

        // 点击波纹效果
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            ripple.style.cssText = `
                position: absolute;
                background: rgba(0, 229, 229, 0.4);
                transform: scale(0);
                animation: ripple 0.5s ease-out forwards;
                pointer-events: none;
                width: 80px;
                height: 80px;
                left: ${e.clientX - rect.left - 40}px;
                top: ${e.clientY - rect.top - 40}px;
                border-radius: 0;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
        });
    });
}

// 合并所有动画样式
function initAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes pixelTrail {
            0% { opacity: 1; transform: scale(1) rotate(0deg); }
            100% { opacity: 0; transform: scale(0) rotate(180deg); }
        }
        @keyframes ripple {
            to { transform: scale(3); opacity: 0; }
        }
        @keyframes glitchBlock {
            0% { opacity: 0; transform: translate(0, 0) scale(0); }
            20% { opacity: 1; transform: translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) scale(1); }
            40% { transform: translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px); }
            100% { opacity: 0; transform: translate(0, 0) scale(0); }
        }
        @keyframes borderRotate {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        @keyframes pulseExpand {
            0% { width: 10px; height: 10px; opacity: 1; }
            100% { width: 200px; height: 200px; opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
}

// 随机故障块（优化版，使用对象池）
let glitchBlockPool = [];
function createGlitchBlock() {
    if (!card) return;

    let block = glitchBlockPool.pop();
    if (!block) {
        block = document.createElement('div');
        block.className = 'glitch-block';
        block.style.cssText = `
            position: absolute;
            z-index: 0;
            pointer-events: none;
            will-change: opacity, transform;
        `;
        card.appendChild(block);
    }

    const size = Math.random() * 20 + 5;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const isCyan = Math.random() > 0.5;
    const color = isCyan ? 'rgba(0, 229, 229, 0.8)' : 'rgba(255, 110, 199, 0.8)';

    block.style.width = size + 'px';
    block.style.height = size + 'px';
    block.style.background = color;
    block.style.left = left + '%';
    block.style.top = top + '%';
    block.style.opacity = '0';
    block.style.transform = 'translate(0, 0) scale(0)';
    block.style.animation = 'none';
    block.offsetHeight;
    block.style.animation = 'glitchBlock 0.3s ease-out forwards';

    setTimeout(() => {
        glitchBlockPool.push(block);
    }, 300);
}

// 动态边框流光
function initBorderGlow() {
    if (!card) return;

    const borderGlow = document.createElement('div');
    borderGlow.className = 'border-glow';
    borderGlow.style.cssText = `
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border: 3px solid transparent;
        border-image: linear-gradient(45deg, var(--primary-cyan), var(--primary-pink), var(--primary-cyan)) 1;
        z-index: -1;
        animation: borderRotate 3s linear infinite;
        opacity: 0;
        transition: opacity 0.3s ease;
        will-change: opacity, filter;
    `;
    card.appendChild(borderGlow);

    card.addEventListener('mouseenter', () => {
        borderGlow.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
        borderGlow.style.opacity = '0';
    });
}

// 卡片点击脉冲
function initCardPulse() {
    if (!card) return;

    card.addEventListener('click', function(e) {
        const pulse = document.createElement('div');
        pulse.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(0, 229, 229, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            transform: translate(-50%, -50%);
            z-index: 9999;
            animation: pulseExpand 0.6s ease-out forwards;
            will-change: width, height, opacity;
        `;
        document.body.appendChild(pulse);
        setTimeout(() => pulse.remove(), 600);
    });
}

// 像素装饰块动画（减少频率）
function initPixelBlocks() {
    const blocks = document.querySelectorAll('.pixel-block');
    blocks.forEach((block, index) => {
        let blockInterval = setInterval(() => {
            const randomDelay = Math.random() * 0.3;
            block.style.animationDelay = `${randomDelay}s`;
        }, 2000 + index * 500);
    });
}

// 名字故障效果（优化版）
function initNameGlitch() {
    const nameAccent = document.querySelector('.name-accent');
    if (!nameAccent) return;

    const originalText = nameAccent.textContent;
    const glitchChars = ['▓', '▒', '░', '█', '▮'];

    setInterval(() => {
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        nameAccent.textContent = randomChar;
        setTimeout(() => {
            nameAccent.textContent = originalText;
        }, 50);
    }, 3000);
}

// 主初始化函数
function init() {
    // 延迟初始化非关键功能
    requestAnimationFrame(() => {
        initClock();
        createBackgroundParticles();
        initAnimationStyles();
        initMouseGlow();
        initAvatarEffect();
        initCardEffect();
        initButtonEffects();
        initBorderGlow();
        initCardPulse();
        initPixelBlocks();
        initNameGlitch();

        // 全局事件监听
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isGlowVisible = true;
            createCursorTrail(e);
            if (!glowAnimationId) {
                glowAnimationId = requestAnimationFrame(updateGlowPosition);
            }
        });

        document.addEventListener('mouseleave', () => {
            isGlowVisible = false;
            if (glowSpot) {
                glowSpot.style.opacity = '0';
            }
        });

        // 故障块效果（降低频率）
        setInterval(() => {
            if (Math.random() > 0.75) {
                createGlitchBlock();
            }
        }, 300);
    });
}

// 使用DOMContentLoaded确保DOM完全加载
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}