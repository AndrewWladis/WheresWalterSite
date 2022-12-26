const params = new URLSearchParams(window.location.search);
const rv = document.getElementById('rv');
const walter = document.getElementById('walter');
const subtitle = document.getElementById('subtitle');
const title = document.getElementById('title');
const scoreHeader = document.getElementById('score');
const scoreGreen = 'rgb(46, 59, 46)';
const scoreBlue = 'rgb(93, 174, 177)';
let totalScore = 0;
let scoreColor = scoreGreen;
let scoreColorNum = 0;
let isGameOver = true;
let oppNum = 0;
let crystalNum = 5;
let score;
let musicNum = 0;
let num;
let isCrystalOnScreen = false;
let soundCondition = true;
let isFightOn = false;
let tucoHealth = 100;
let isTalking = false;
let talkNum = 0;
let level;


//SET THESE FOR EVERY LEVEL
let character;
let boss = false;
let stopGameNum = 0;
let bossAttack = 10;
//how much the boss attacks for, an example could be 4, which is the version you had for the tuco fight

let attackLevel = 4;
//how much you attack for, an example could be 2, which is the version you had for the tuco fight
let bossWithLastName;
//example could be gusFring or tucoSalamanca

const levelOneText = ['WALTER: PINKMAN?', 'JESSE: SHH! MR. WHITE?', 'WALTER: I THINK WE SHOULD PARTNER UP', 'JESSE: YOU WANT TO COOK?', 'WALTER: YOU KNOW THE BUISNESS,', 'WALTER: I KNOW THE CHEMISTRY', "JESSE: FINE. LET'S DO THIS, BITCH"];
const levelTwoText = ["WALTER: JESSE, WE NEED TO COOK", "JESSE: LEMME GET A BUYER FIRST", "WALTER: OK, BUT BE QUICK, I NEED TO BE HOME BY 7",];
const levelThreeText = ["JESSE: YO, WANNA BUY SOME GLASS", "TUCO: YEAH, I'LL GIVE YOU TOP DOLLAR", "JESSE: THANKS, I WON'T DISAPPOINT", "TUCO: YOU BETTER NOT, OR ELSE"];
const levelFourText = ["WALTER: I SAID BE QUICK", "JESSE: I'M SORRY, IT WAS A LONG WALK", "WALTER: WELL, LET'S COOK"];
const levelFiveText = ["JESSE: I SENT THE STUFF", "TUCO: I KNOW, IT'S GOOD SHIT", "JESSE: WELL, WHERE'S THE PAY?", "TUCO: WHAT PAY? YOU DON'T GET PAYED", "JESSE: I NEED THAT MONEY", "TUCO: NO"];
const levelSixText = ["WALTER: WHERE'S THE MONEY?", "JESSE: HE DIDN'T PAY", "WALTER: DIDN'T PAY? I'LL TALK TO HIM", "JESSE: YOU SHOULDN'T, IT'S NO USE", "WALTER: I WON'T TALK, HEISENBERG WILL"];
const levelSevenText = ["TUCO: WHO ARE YOU?", "WALTER: HEISENBERG, I'M WITH PINKMAN", "TUCO: IT WAS STUPID OF YOU TO COME ALONE", "WALTER: I'M NOT STUPID"];
let levelText;


function setNight() {
    document.body.style.backgroundImage = 'url(assets/night.svg)';
    subtitle.style.color = scoreBlue;
    title.style.color = scoreBlue;
    scoreHeader.style.color = scoreBlue;
}

function setCity() {
    document.body.style.backgroundImage = 'url(assets/city.jpg)'
    subtitle.style.color = '#3d473e';
    title.style.color = '#3d473e';
}

function setLevel(p) {
    level = p;
    title.innerText = `LEVEL ${p}: `
    if (level === 1) {
        localStorage.setItem('totalScore', 0)
        character = 'walter-familyman';
        stopGameNum = 25;
        title.append('PARTNER UP');
        levelText = levelOneText;
    } else if (level === 2) {
        totalScore = parseInt(localStorage.getItem('totalScore'));
        character = 'walter-familyman';
        stopGameNum = 25;
        title.append('NEED TO COOK');
        levelText = levelTwoText;
    } else if (level === 3) {
        totalScore = parseInt(localStorage.getItem('totalScore'));
        setCity()
        character = 'jesse';
        stopGameNum = 30;
        title.append('TOP DOLLAR');
        levelText = levelThreeText;
    } else if (level === 4) {
        setNight()
        totalScore = parseInt(localStorage.getItem('totalScore'));
        character = 'jesse';
        stopGameNum = 45;
        title.append("LET'S COOK");
        levelText = levelFourText;
    } else if (level === 5) {
        totalScore = parseInt(localStorage.getItem('totalScore'));
        setCity();
        character = 'jesse';
        stopGameNum = 30;
        title.append("WHAT PAY?");
        levelText = levelFiveText;
    } else if (level === 6) {
        totalScore = parseInt(localStorage.getItem('totalScore'));
        character = 'jesse';
        stopGameNum = 25;
        title.append("WHERE'S THE MONEY?");
        levelText = levelSixText;
    } else if (level === 7) {
        totalScore = parseInt(localStorage.getItem('totalScore'));
        setCity();
        character = 'walter';
        stopGameNum = 35;
        title.append("WITH PINKMAN");
        levelText = levelSevenText;
        boss = 'tuco'
    }

    walter.style.backgroundImage = `url("assets/${character}.png")`;
    scoreHeader.innerText = totalScore
}

if (localStorage.getItem('level') == null) {
    localStorage.setItem('level', 1);
    setLevel(1);
} else {
    setLevel(parseInt(localStorage.getItem('level')));
}

if (document.body.style.backgroundImage === 'url("assets/night.svg")') {
    scoreHeader.style.color = scoreBlue;
    scoreColor = scoreBlue;
} else {
    scoreHeader.style.color = scoreGreen;
}

title.style.fontSize = '60px';
subtitle.classList.add('fade');



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
    'assets/tucopunch.png'
)









async function typeSentence(sentence, delay = 70) {
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

function playMusic() {
    if (musicNum === 0 && soundCondition) {
        musicNum = 1;
        const theme = new Audio('assets/whereswalter.mp3');
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
    crystalNum = Math.floor((Math.random() * 50) + 3);
    isCrystalOnScreen = true;
    setTimeout(
        function() {
            isCrystalOnScreen = false;
        }, 2000);
}

function createOpp() {
    if (num === 0) {

    } else if (crystalNum === 0 && score < stopGameNum - 30)  {
    } else {
        let opp = document.createElement('img');
        opp.classList.add('opp');
        document.body.append(opp);
        opp.id = `opp${oppNum}`;
        opp.style.animation = 'moveopp 2s';
        opp.src = `assets/${Math.floor(Math.random() * 5)}.png`;
        oppNum++;
        if (score < stopGameNum - 20) {
            crystalNum -= 1;
        }
    }
    num++
}
function rvLeave() {
    rv.style.animation = "slideout 2s cubic-bezier(.55,.6,.68,.28)";
    setTimeout(
        function() {
            rv.style.opacity = "0%";
        }, 1995);
}

function start() {
    isCrystalOnScreen = false;
    soundCondition = true;
    isFightOn = false;
    isTalking = false;
    walter.style.opacity = '100%';
    subtitle.classList.remove('fade');
    subtitle.classList.add('fadeout');
    title.classList.add('fadeout');
    playMusic()
    isGameOver = false;
    score = 0;
    num = 0;
    oppNum = 0;
    setTimeout(
        function() {
            subtitle.style.opacity = '0%';
            title.style.opacity = '0%';
            subtitle.classList.remove('fadeout');
            title.classList.remove('fadeout');
            walter.style.backgroundImage = `url(assets/${character}running1.png)`
        }, 499);
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
    tuco.style.marginTop = '50px'
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
    walter.style.backgroundImage = 'url(assets/walterfight.png)';
    subtitle.style.opacity = '100%';
    subtitle.innerText = 'PRESS A TO ATTACK'
    console.log('fight test 2')
    isFightOn = true;
    isGameOver = true;
    isTalking = false;
    console.log('fight test 3')
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

function fadeOutandEndLevel() {
    document.body.style.animation = 'fadeout 1s'
    setTimeout(
        function() {
            localStorage.setItem('level', level + 1);
            localStorage.setItem('totalScore', totalScore + score)
            window.location.reload();
        }, 500);
}

function rvCrash(num) {
    document.querySelector('.tucoHealth').style.opacity = '0%';
    const tucoD = document.querySelector('#tucoSalamaca');
    const rv = document.createElement('img');
    rv.src = 'assets/rv.png';
    rv.classList.add('rv');
    if (num === 2) {
        rv.style.marginTop = '-10%'
    }
    document.body.append(rv);
    setTimeout(
        function() {
            rv.style.marginLeft = '65%'
        }, 490);
    if (level === 7) {
        setTimeout(
            function() {
                tucoD.style.animation = 'killTuco 0.5s';
                setTimeout(
                    function() {
                        tucoD.style.opacity = '0%';
                        subtitle.innerText = ''
                        let characterTLC = character.toLowerCase()
                        if (characterTLC === 'walter') {
                            typeSentence('Jesse: YEAH SCIENCE, YEAH MR WHITE!')
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
}

function appendSlideInGuy(name) {
    let guy = document.createElement('div');
    if (name === 'tuco') {
        guy.classList.add('tuco');
    } else {
        guy.classList.add('slideinguy');
    }
    guy.style.backgroundImage = `url(assets/${name}.png)`
    document.body.append(guy)
    setTimeout(
        function() {
            guy.style.marginLeft = '65%';
        }, 496); 
}









function levelEnding() {
    subtitle.innerText = ''
    if (level === 1) {
        subtitle.style.opacity = '100%';
        appendSlideInGuy('jesse');
        setTimeout(
            function() {
                isTalking = true;
                typeSentence(levelOneText[talkNum]);
            }, 2500);
    } else if (level === 2) {
        subtitle.style.opacity = '100%';
        rvCrash(2)
        setTimeout(
            function() {
                isTalking = true;
                typeSentence(levelTwoText[talkNum]);
            }, 2000);
    } else if (level === 3) {
        subtitle.style.opacity = '100%';
        appendSlideInGuy('tuco');
        setTimeout(
            function() {
                isTalking = true;
                typeSentence(levelThreeText[talkNum]);
            }, 2000);
    } else if (level === 4) {
        subtitle.style.opacity = '100%';
        appendSlideInGuy('walter-familyman');
        setTimeout(
            function() {
                isTalking = true;
                typeSentence(levelFourText[talkNum]);
            }, 2000);
    } else if (level === 5) {
        subtitle.style.opacity = '100%';
        appendSlideInGuy('tuco');
        setTimeout(
            function() {
                isTalking = true;
                typeSentence(levelFiveText[talkNum]);
            }, 2000);
    } else if (level === 6) {
        subtitle.style.opacity = '100%';
        appendSlideInGuy('walter-familyman');
        setTimeout(
            function() {
                isTalking = true;
                typeSentence(levelSixText[talkNum]);
            }, 2000);
    } else if (level === 7) {
        subtitle.style.opacity = '100%';
        createTuco();
        setTimeout(
            function() {
                isTalking = true;
                typeSentence(levelSevenText[talkNum]);
            }, 2000);
    }
}







const pressed = [];
const secretCode = 'yui';

document.addEventListener('keyup', e => {
    pressed.push(e.key)
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

    if(pressed.join('').includes(secretCode)) {
        score = stopGameNum - 5;
    }

    if (e.key === "a" && subtitle.innerText === 'PRESS A TO ATTACK' && title.innerText !== 'GAME OVER') {
        tucoHealth -= attackLevel;
        document.querySelector('.tucoHealth').value = tucoHealth;
        walter.style.backgroundImage = `url(assets/${character}punch.png)`;
        document.querySelector('.tuco').style.backgroundImage = `url(assets/${boss}attacked.png)`;
        setTimeout(
            function() {
                walter.style.backgroundImage = `url(assets/${character}fight.png)`;
                document.querySelector('.tuco').style.backgroundImage = `url(assets/${boss}fight.png)`;
            }, 100);
        if (tucoHealth === 0) {
            subtitle.innerText = ''
            typeSentence('TUCO: YOU ARE DEAD')
            setTimeout(
                function() {
                    subtitle.innerText = ''
                    typeSentence('WALTER: YOUR RIGHT...')
                }, 2000);
            setTimeout(
                function() {
                    subtitle.innerText = ''
                    typeSentence('WALTER: IT WOULD BE STUPID TO COME ALONE')
                }, 5000);
            setTimeout(
                function() {
                    rvCrash();
                }, 10000);
        }
    }
})

document.addEventListener('keydown', jump)

document.onclick = function(){
    if (isGameOver && !isFightOn && !isTalking) {
        start();
    } else if (isGameOver && !isFightOn && isTalking) {
        talkNum++
        if (talkNum < levelText.length) {
            subtitle.innerText = '';
            typeSentence(levelText[talkNum]);
        } else {
            if (level === 5) {
                totalScore -= 10;
                scoreHeader.innerText = score + totalScore;
                scoreHeader.style.color = 'red';
                walter.style.backgroundImage = 'url(assets/jesseattacked.png)';
                document.querySelector('.tuco').style.backgroundImage = 'url(assets/tucopunch.png)';
                setTimeout(
                    function() {
                        scoreHeader.style.color = scoreColor;
                        walter.style.backgroundImage = 'url(assets/jesse.png)';
                        document.querySelector('.tuco').style.backgroundImage = 'url(assets/tuco.png)';;
                        setTimeout(
                            function() {
                                fadeOutandEndLevel()
                        }, 1000)
                }, 200);
            } else if (level === 7) {
                fight();
            } else {
                fadeOutandEndLevel()     
            }
        }
    } else if (isFightOn) {

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
        if (document.body.style.backgroundImage === 'url("assets/night.svg")') {
            scoreHeader.style.color = scoreBlue;
        } else {
            scoreHeader.style.color = scoreGreen;
        }
    }
}, 1000);

setInterval(function () {
    if (!isGameOver) {
        score++
        scoreHeader.innerText = score + totalScore;
    }

    if (score >= stopGameNum) {
        document.getElementById(`opp${oppNum - 1}`).remove()
        walter.style.backgroundImage = `url(assets/${character}.png)`;
        isGameOver = true;
        levelEnding();
    }
}, 500);

setInterval(function () {
    if (subtitle.innerText === 'PRESS A TO ATTACK' && title.innerText !== 'GAME OVER') {
        totalScore -= bossAttack;
        console.log(totalScore)
        scoreHeader.innerText = score + totalScore;
        scoreHeader.style.color = 'red';
        walter.style.backgroundImage = `url(assets/${character}attacked.png)`;
        document.querySelector('.tuco').style.backgroundImage = `url(assets/${boss}punch.png)`;
        setTimeout(
            function() {
                scoreHeader.style.color = scoreColor;
                walter.style.backgroundImage = `url(assets/${character}fight.png)`;
                document.querySelector('.tuco').style.backgroundImage = `url(assets/${boss}fight.png)`;
            }, 100);
        if(score + totalScore < 1) {
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