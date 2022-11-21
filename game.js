const rv = document.getElementById('rv');
const walter = document.getElementById('walter');
const subtitle = document.getElementById('subtitle');
const title = document.getElementById('title');
let isGameOver = true;
let oppClock = 1000;
let oppNum = 0;
let score;
let musicNum = 0;
let num;

subtitle.classList.add('fade')

function playMusic() {
    const theme = new Audio('assets/whereswalter.mp3');
    if (musicNum === 0) {
        theme.play();
    }
}

function jump() {
    if (!isGameOver) {
        walter.classList.add('jump');
        let jumpSound = new Audio('assets/jump.mp3');
        jumpSound.play();
    }
    setTimeout(
        function() {
            walter.classList.remove('jump');
        }, 500);
}

function createOpp() {
    if (num === 0) {
        console.log('first opp')
    } else {
        let opp = document.createElement('img');
        opp.classList.add('opp');
        document.body.append(opp);
        opp.id = `opp${oppNum}`;
        opp.style.animation = 'moveopp 2s';
        opp.src = `assets/${Math.floor(Math.random() * 4)}.png`;
        console.log(opp);
        oppNum++
    }
    num++
    if (score < 50) {
        oppClock = Math.floor((Math.random() * 1350) + 250);
    } else if (score > 50 && score < 100) {
        oppClock = Math.floor((Math.random() * 750) + 250);
    } else if (score > 100 && score < 150) {
        oppClock = Math.floor((Math.random() * 500) + 250);
    } else if (score > 150 && score < 200) {
        oppClock = Math.floor((Math.random() * 250) + 250);
    }
    console.log(oppClock);
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
            walter.style.backgroundImage = 'url(assets/walterrunning1.png)'
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
        }, 499);
}









 



document.addEventListener('keydown', jump)

document.onclick = function(){
    if (isGameOver) {
        start();
    } else {
        jump()
    }
}

setInterval(function () {
    if (!isGameOver) {
        createOpp();
    }
}, oppClock);


setInterval(function () {
    if (!isGameOver) {
        musicNum++
    }
    if (musicNum > 129) {
        playMusic();
        musicNum = 0;
    }
}, 1000);

setInterval(function () {
    if (!isGameOver) {
        score++
        document.getElementById('score').innerText = score;
    }
}, 500);

setInterval(function () {
    let waltuhImg = walter.style.backgroundImage;
    if(waltuhImg === 'url("assets/walterrunning1.png")') {
        walter.style.backgroundImage = 'url(assets/walterrunning2.png)';
    } else if(waltuhImg === 'url("assets/walterrunning2.png")') {
        walter.style.backgroundImage = 'url(assets/walterrunning1.png)';
    }
}, 100);

setInterval(function () {
    let marginLeft = parseInt(window.getComputedStyle(document.getElementById(`opp${oppNum - 1}`)).getPropertyValue('margin-left'));
    if (marginLeft <= 825 && marginLeft >= 720 && parseInt(window.getComputedStyle(walter).getPropertyValue('margin-top')) > 175) {
        endGame();
        let deathSound = new Audio('assets/walterdeath.mp3');
        deathSound.play();
    }
}, 30);