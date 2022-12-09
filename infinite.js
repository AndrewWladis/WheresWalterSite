const params = new URLSearchParams(window.location.search);
const rv = document.getElementById('rv');
const walter = document.getElementById('walter');
const subtitle = document.getElementById('subtitle');
const title = document.getElementById('title');
const scoreHeader = document.getElementById('score');
const scoreGreen = 'rgb(46, 59, 46)';
const scoreBlue = 'rgb(93, 174, 177)';
let scoreColor = scoreGreen;
let scoreColorNum = 0;
let isGameOver = true;
let oppNum = 0;
let crystalNum = 5;
let score;
let musicNum = 0;
let num;
let isCrystalOnScreen = false;
let soundCondition = params.get('sound') == 'true';
let character = params.get('character');
let mode = 'infinite';
let tucoHealth = 100;

var images = [];

function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
    `assets/${character}running1.png`,
    `assets/${character}running2.png`,
    `assets/${character}.png`,
    `assets/${character}attacked.png`,
    `assets/${character}fight.png`,
    `assets/${character}punch.png`,
    'assets/0.png',
    'assets/1.png',
    'assets/2.png',
    'assets/3.png',
    'assets/4.png',
    'assets/tuco.png',
    'assets/tucoattacked.png',
    'assets/tucofight.png',
    'assets/tucopunch.png',
)



subtitle.classList.add('fade')
scoreHeader.style.color = scoreGreen;
walter.style.backgroundImage = `url("assets/${character}.png")`

function playMusic() {
    if (musicNum === 0 && soundCondition) {
        musicNum = 1;
        const theme = new Audio('assets/whereswalter.mp3');
        theme.play();
    }
}

function jump() {
    if (!isGameOver) {
        if (character === 'jr') {
            walter.style.backgroundImage = `url("assets/${character}jumping.png")`;
            setTimeout(
                function() {
                    walter.style.backgroundImage = `url(assets/${character}running1.png)`;
                }, 750);
        } else {
            walter.classList.add('jump');
            let jumpSound = new Audio('assets/jump.mp3');
            if (soundCondition === true) {
                jumpSound.play();
            }
            setTimeout(
                function() {
                    walter.classList.remove('jump');
                }, 500);
        }
    }
}

function createCrystal() {
    let crystal = document.createElement('img');
    crystal.classList.add('crystal');
    document.body.append(crystal);
    crystal.id = `crystal-${oppNum}`;
    crystal.style.animation = 'moveopp 2s';
    crystal.src = 'assets/crystal.gif';
    crystalNum = Math.floor((Math.random() * 50) + 3);
    isCrystalOnScreen = true;
    setTimeout(
        function() {
            isCrystalOnScreen = false;
        }, 2000);
}

function createOpp() {
    if (num === 0) {
 
    } else if (crystalNum === 0 && character !== 'jr') {
        createCrystal();
    } else {
        let opp = document.createElement('img');
        opp.classList.add('opp');
        document.body.append(opp);
        opp.id = `opp${oppNum}`;
        opp.style.animation = 'moveopp 2s';
        opp.src = `assets/${Math.floor(Math.random() * 5)}.png`;
        oppNum++;
        crystalNum -= 1;
    }
    num++
}

function start() {
    walter.style.opacity = '100%';
    subtitle.classList.remove('fade');
    subtitle.classList.add('fadeout');
    title.classList.add('fadeout');
    playMusic()
    isGameOver = false;
    score = 0;
    num = 0;
    oppNum = 0;
    rv.style.animation = "slideout 2s cubic-bezier(.55,.6,.68,.28)";
    
    setTimeout(
        function() {
            subtitle.style.opacity = '0%';
            title.style.opacity = '0%';
            subtitle.classList.remove('fadeout');
            title.classList.remove('fadeout');
            walter.style.backgroundImage = `url(assets/${character}running1.png)`
        }, 499);
    setTimeout(
        function() {
            rv.style.opacity = "0%";
        }, 1995);
}

function endGame() {
    isGameOver = true;
    subtitle.innerText = 'CLICK TO RESTART';
    title.innerText = 'GAME OVER';
    subtitle.classList.add('fade');
    title.classList.add('fadein');
    walter.style.opacity = '0%';
    setTimeout(
        function() {
            title.style.opacity = '100%';
            score++
        }, 499);
}

const pressed = [];
const secretCode = 'yui';

document.addEventListener('keyup', e => {
    pressed.push(e.key)
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

    if(pressed.join('').includes(secretCode)) {
        score = 90;
    }
})

document.addEventListener('keydown', jump)

document.onclick = function(){
    if (!isGameOver) {
        jump()
    } else if (isGameOver) {
        start()
    }
}



setInterval(function () {
    if (!isGameOver) {
        createOpp();
    }
}, 800);


setInterval(function () {
    if (musicNum > 0) {
        musicNum++
    }
    if (musicNum >= 66 && soundCondition) {
        const theme = new Audio('assets/whereswalter.mp3');
        theme.play();
        musicNum = 1;
    }
    if (scoreColorNum > 0) {
        scoreColorNum -= 1;
    }
    if (scoreColorNum === 0) {
        scoreHeader.style.color = scoreGreen;
    }
}, 1000);

setInterval(function () {
    if (!isGameOver) {
        score++
        scoreHeader.innerText = score;
    }

    if (score >= 100 && mode === 'story') {
        fight();
    }
}, 500);

setInterval(function () {
    let waltuhImg = walter.style.backgroundImage;
    if(waltuhImg === `url("assets/${character}running1.png")`) {
        walter.style.backgroundImage = `url(assets/${character}running2.png)`;
    } else if(waltuhImg === `url("assets/${character}running2.png")`) {
        walter.style.backgroundImage = `url(assets/${character}running1.png)`;
    }
}, 100);

setInterval(function () {
    let crystalPosition;
    if (isCrystalOnScreen == false) {
        crystalPosition = null;
    } else if (isCrystalOnScreen == true) {
        crystalPosition = parseInt(window.getComputedStyle(document.getElementById(`crystal-${oppNum}`)).getPropertyValue('margin-left'));
    }
    let marginLeft = parseInt(window.getComputedStyle(document.getElementById(`opp${oppNum - 1}`)).getPropertyValue('margin-left'));
    let walterPosition = parseInt(window.getComputedStyle(walter).getPropertyValue('margin-top'));
    if (marginLeft <= 825 && marginLeft >= 720 && walterPosition > 175 && character !== 'jr') {
        endGame();
        if (soundCondition === true) {
            let deathSound = new Audio(`assets/${character}death.mp3`);
            deathSound.play();
        }
    }

    if(marginLeft <= 825 && marginLeft >= 720 && character === 'jr' && walter.style.backgroundImage !== `url("assets/${character}jumping.png")`) {
        endGame();
        if (soundCondition) {
            let deathSound = new Audio(`assets/${character}death.mp3`);
            deathSound.play();
        }
    }

    if (crystalPosition <= 825 && crystalPosition >= 720 && walterPosition < 175) {
        score += 10;
        scoreColorNum = 3;
        if (soundCondition) {
            let powerupSound = new Audio('assets/powerup.wav');
            powerupSound.play();
        }
        document.getElementById('score').style.color = scoreBlue;
    }
}, 30);