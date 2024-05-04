const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// ANIMASI MUSUH
let player = {
    x: 50,
    y: canvas.height / 2,
    width: 50,
    height: 70,
    speed: 5,
    health: 100,
    attackPower: 10
};

let attack = {
    width: 40,
    height: 40,
    x: player.x + player.width,
    y: player.y + (player.height / 2) - 10,
    active: false
};

let enemy = {
    x: canvas.width - 120,
    y: player.y,
    width: 70,
    height: 70,
    speed: 3,
    health: 50,
    isFacingLeft: true  
};
// GAMBAR
let ninjaImage = new Image();
ninjaImage.src = 'assets/images/mc.png';

let attackImage = new Image();
attackImage.src = 'assets/images/effect/normalattack.png';

let enemyImage = new Image();
enemyImage.src = 'assets/images/enemy.png';  

let imagesLoaded = 0;
let totalImages = 3;

ninjaImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        gameLoop();
    }
};

attackImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        gameLoop();
    }
};

enemyImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        gameLoop();
    }
};

function drawPlayer() {
    ctx.drawImage(ninjaImage, player.x, player.y, player.width, player.height);
}

function drawEnemy() {
    if (enemy.isFacingLeft) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(enemyImage, -enemy.x - enemy.width, enemy.y, enemy.width, enemy.height);
        ctx.restore(); 
    } else {
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

function drawAttack() {
    if (attack.active) {
        ctx.drawImage(attackImage, attack.x, attack.y, attack.width, attack.height);
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemy();
    drawAttack();
    requestAnimationFrame(gameLoop);
}

function performAttack() {
    const originalX = player.x;
    player.x += 600;

    attack.x = player.x + player.width;
    attack.y = player.y + (player.height / 2) - 10;
    attack.active = true;

    setTimeout(() => {
        attack.active = false;
        player.x = originalX;
    }, 500);
}

document.getElementById('attackButton').addEventListener('click', performAttack);
