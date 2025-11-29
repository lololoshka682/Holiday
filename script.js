// Получаем элементы
const themeToggle = document.getElementById('themeToggle');
const giftBox = document.getElementById('giftBox');
const donutsContainer = document.getElementById('donutsContainer');
const donutsPackage = document.getElementById('donutsPackage');
const packageClosed = document.querySelector('.package-closed');
const packageOpened = document.querySelector('.package-opened');

// Функция переключения темы
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Функция открытия подарка
function openGift() {
    // Анимация встряски подарка
    giftBox.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        // Скрываем подарок
        giftBox.style.display = 'none';
        document.querySelector('.gift-hint').style.display = 'none';
        
        // Показываем пончики
        donutsContainer.classList.add('show');
        
    }, 500);
}

// Функция открытия коробки с пончиками
function openDonutsPackage() {
    // Скрываем закрытую упаковку
    packageClosed.style.display = 'none';
    
    // Показываем открытую упаковку
    packageOpened.style.display = 'block';
    
    // Запускаем фейерверк
    createFireworks();
    
    // Создаем конфетти
    createConfetti();
}

// Функция создания фейерверка
function createFireworks() {
    const colors = ['#FF69B4', '#FF1493', '#FFD700', '#87CEEB', '#98FB98', '#FFA500'];
    
    // Создаем несколько фейерверков вокруг коробки
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            const rect = donutsPackage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Позиционируем фейерверк вокруг коробки
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100;
            const fireworkX = centerX + Math.cos(angle) * distance;
            const fireworkY = centerY + Math.sin(angle) * distance;
            
            firework.style.left = fireworkX + 'px';
            firework.style.top = fireworkY + 'px';
            
            document.body.appendChild(firework);
            
            // Создаем частицы фейерверка
            for (let j = 0; j < 12; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                const particleAngle = (j / 12) * Math.PI * 2;
                const particleDistance = 30 + Math.random() * 40;
                const tx = Math.cos(particleAngle) * particleDistance;
                const ty = Math.sin(particleAngle) * particleDistance;
                
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                
                firework.appendChild(particle);
            }
            
            // Удаляем фейерверк после анимации
            setTimeout(() => {
                firework.remove();
            }, 1000);
            
        }, i * 150);
    }
}

// Функция создания конфетти
function createConfetti() {
    const colors = ['#FF69B4', '#FF1493', '#DB7093', '#FF85C1', '#FFD700', '#87CEEB'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 1000;
        `;
        
        document.body.appendChild(confetti);
        
        // Анимация падения
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(180deg)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.1, 0.2, 0.8, 0.9)'
        }).onfinish = () => confetti.remove();
    }
}

// Загрузка сохраненной темы
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
}

// Добавляем обработчики событий
themeToggle.addEventListener('click', toggleTheme);
giftBox.addEventListener('click', openGift);
packageClosed.addEventListener('click', openDonutsPackage);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    console.log('Сайт с интерактивными пончиками загружен!');
});