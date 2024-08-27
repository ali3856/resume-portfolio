const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 50,
    y: 200,
    width: 32,
    height: 32,
    speed: 5,
    jumping: false,
    velocityY: 0
};

const levels = [
    { x: 150, y: 150, width: 100, height: 50, name: 'skills' },
    { x: 300, y: 100, width: 100, height: 50, name: 'experience' },
    { x: 450, y: 150, width: 100, height: 50, name: 'projects' }
];

const gravity = 0.5;
const keys = {};

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function update() {
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
    
    if (keys['ArrowUp'] && !player.jumping) {
        player.jumping = true;
        player.velocityY = -15; // Increased jump height
    }

    player.velocityY += gravity;
    player.y += player.velocityY;

    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.jumping = false;
    }

    // Wrap around screen
    if (player.x > canvas.width) player.x = 0;
    if (player.x < 0) player.x = canvas.width;

    // Check for collision with levels
    levels.forEach(level => {
        if (checkCollision(player, level)) {
            openLevel(level.name);
        }
    });
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw levels
    ctx.fillStyle = 'yellow';
    levels.forEach(level => {
        ctx.fillRect(level.x, level.y, level.width, level.height);
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText(level.name, level.x + 10, level.y + 30);
        ctx.fillStyle = 'yellow';
    });
}

function checkCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function openLevel(levelName) {
    window.open(`${levelName}.html`, '_blank');
}

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

gameLoop();