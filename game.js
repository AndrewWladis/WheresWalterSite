const params = new URLSearchParams(window.location.search);
const rv = document.getElementById('rv');
const walter = document.getElementById('walter');
const subtitle = document.getElementById('subtitle');
const title = document.getElementById('title');
const scoreHeader = document.getElementById('score');
const scoreGreen = 'rgb(46, 59, 46)';
const scoreBlue = 'rgb(93, 174, 177)';
const theme = new Audio('assets/whereswalter.mp3');
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
let isFightOn = false;
let tucoHealth = 100;



async function typeSentence(sentence, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while(i < letters.length) {
      await waitForMs(delay);
      subtitle.append(letters[i].toUpperCase());
      i++
    }
    return;
  }
  
  
  function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }  

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
        theme.play();
    }
}

function jump() {
    if (!isGameOver && !isFightOn) {
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
    crystalNum = Math.floor((Math.random() * 30) + 3);
    isCrystalOnScreen = true;
    setTimeout(
        function() {
            isCrystalOnScreen = false;
        }, 2000);
}

function createOpp() {
    if (num === 0) {
 
    } else if (crystalNum === 0 && character !== 'jr' && score < 155) {
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
    score = 95;
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

function createTuco() {
    let tucoDiv = document.createElement('div');
    let tuco = document.createElement('div');
    tuco.classList.add('tuco');
    tuco.id = 'tucoSalamaca'
    tucoDiv.classList.add('tuco-div')
    tucoDiv.innerHTML= `<progress class="tucoHealth" value="100" max="100"></progress>`;
    document.body.append(tucoDiv)
    tucoDiv.appendChild(tuco)
    setTimeout(
        function() {
            tucoDiv.style.marginLeft = '65%';
            walter.style.backgroundImage = `url(assets/${character}fight.png)`;
        }, 495); 
}

function fight() {
    document.getElementById(`opp${oppNum - 1}`).remove()
    walter.style.backgroundImage = `url(assets/${character}.png)`;
    isFightOn = true;
    isGameOver = true;
    /*
    scoreHeader.style.animation = 'fadeout 1s'
    score++
    setTimeout(
        function() {
            scoreHeader.style.opacity = '0%';
        }, 990);
    */
    setTimeout(
        function() {
            createTuco();
            let num = Math.floor(Math.random() * 1);
        }, 1500);
    setTimeout(
        function() {
            subtitle.style.opacity = '100%';
            subtitle.innerText = 'PRESS A TO ATTACK'
        }, 3000);
}

function credits() {
    subtitle.innerText = ''
    subtitle.style.opacity = '100%';
    typeSentence('CREATED BY ANDY WLADIS');
    setTimeout(
        function() {
            subtitle.innerText = ''
            typeSentence('A DUCKY COMICS PRODUCTION')
            setTimeout(
                function() {
                    subtitle.innerText = '';
                    title.style.opacity = '100%';
                    title.innerText = "WHERE'S WALTER";
                }, 5000);
        }, 5000);
}

function rvCrash() {
    document.querySelector('.tucoHealth').style.opacity = '0%';
    const tucoD = document.querySelector('#tucoSalamaca');
    const rv = document.createElement('img');
    rv.src = 'assets/rv.png'
    rv.classList.add('rv');
    document.body.append(rv);
    setTimeout(
        function() {
            rv.style.marginLeft = '65%'
        }, 490);
    setTimeout(
        function() {
            tucoD.style.animation = 'killTuco 0.5s';
            setTimeout(
                function() {
                    tucoD.style.opacity = '0%';
                    subtitle.innerText = ''
                    let characterTLC = character.toLowerCase()
                    if (characterTLC === 'walter') {
                        typeSentence('Jesse: Yo Mr Bitch! Hop in')
                    } else {
                        typeSentence(`Walter: ${characterTLC.charAt(0).toUpperCase() + characterTLC.slice(1)}, hop in`)
                    }
                    setTimeout(
                        function() {
                            document.body.style.animation = 'fadeout 1s'
                            setTimeout(
                                function() {
                                    walter.style.opacity = '0%'
                                    rv.style.opacity = '0%'
                                    subtitle.style.opacity = '0%'
                                    scoreHeader.style.opacity = '0%'
                                    setTimeout(
                                        function() {
                                            credits()
                                        }, 1000);
                                }, 990);
                        }, 8000);
                }, 490);
        }, 400);
}




 

document.addEventListener('keyup', e => {
    if (e.key === "a" && subtitle.innerText === 'PRESS A TO ATTACK') {
        tucoHealth -= 2;
        document.querySelector('.tucoHealth').value = tucoHealth;
        walter.style.backgroundImage = `url(assets/${character}punch.png)`;
        document.querySelector('.tuco').style.backgroundImage = 'url(assets/tucoattacked.png)';
        setTimeout(
            function() {
                walter.style.backgroundImage = `url(assets/${character}fight.png)`;
                document.querySelector('.tuco').style.backgroundImage = 'url(assets/tucofight.png)';
            }, 100);
        if (tucoHealth === 0) {
            subtitle.innerText = ''
            if (character.toLowerCase() === 'walter') {
                typeSentence('Tuco: You came here to give me more meth?')
            } else {
                typeSentence('Tuco: You are dead')
            }
            setTimeout(
                function() {
                    subtitle.innerText = ''
                    if (character.toLowerCase() === 'jr') {
                        typeSentence('Jr: Your a pussy')
                    } else if (character.toLowerCase() === 'walter') {
                        typeSentence('Walter: This is not meth')
                    } else if (character.toLowerCase() === 'jesse') {
                        typeSentence('Jesse: Your about to die, bitch')
                    }
                }, 6250);
            setTimeout(
                function() {
                    rvCrash();
                }, 10250);
        }
    }
})

document.addEventListener('keydown', jump)

document.onclick = function(){
    if (isGameOver && !isFightOn) {
        start();
    } else if (isGameOver && isFightOn) {
        jump()
    } else {
        jump()
    }
}



setInterval(function () {
    if (!isGameOver) {
        createOpp();
    }
}, 800);


setInterval(function () {
    if (!isGameOver && isFightOn) {
        musicNum++
    }
    if (musicNum >= 129) {
        musicNum = 0;
        playMusic();
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

    if (score >= 100) {
        fight();
    }
}, 500);

setInterval(function () {
    if (subtitle.innerText === 'PRESS A TO ATTACK') {
        if (character === 'jr') {
            score -= 6;
        } else {
            score -= 4;
        }
        scoreHeader.innerText = score;
        scoreHeader.style.color = 'red';
        walter.style.backgroundImage = `url(assets/${character}attacked.png)`;
        document.querySelector('.tuco').style.backgroundImage = 'url(assets/tucopunch.png)';
        setTimeout(
            function() {
                scoreHeader.style.color = scoreColor;
                walter.style.backgroundImage = `url(assets/${character}fight.png)`;
                document.querySelector('.tuco').style.backgroundImage = 'url(assets/tucofight.png)';
            }, 100);
        if(score < 1) {
            endGame();

        }
    }
}, 499);

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
        if (soundCondition === true) {
            let deathSound = new Audio(`assets/${character}death.mp3`);
            deathSound.play();
        }
    }

    if (crystalPosition <= 825 && crystalPosition >= 720 && walterPosition < 175) {
        score += 10;
        scoreColorNum = 3;
        document.getElementById('score').style.color = scoreBlue;
    }
}, 30);