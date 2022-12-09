const walter = document.getElementById('waltericon');
const jesse = document.getElementById('jesseicon');
const jr = document.getElementById('jricon');
const imageCharacter = document.getElementById('character');
const startButton = document.querySelector('.start-button');
const infiniteInput = document.getElementById('infiniteSlider');
const infiniteLabel = document.getElementById('infiniteLabel')
const nameOf = (f) => (f).toString().replace(/[ |\(\)=>]/g,'');
const border = 'border';
let current = walter;
let statusButton = 'story'

current.classList.add(border);

function addBorder(character, name) {
    let characterWithBorder = Array.from([...document.querySelectorAll('.character-select-icon')]).filter(item => item.classList.contains(border))[0]
    characterWithBorder.classList.remove(border)
    character.classList.add('border');
    current = character;
    imageCharacter.classList.add('fade2')
    setTimeout(
        function() {
            imageCharacter.src = `assets/${name}.png`;
        }, 250);
    setTimeout(
        function() {
            imageCharacter.classList.remove('fade2')
        }, 500);
}

jesse.onclick = function(){
    addBorder(jesse, 'jesse')
}

walter.onclick = function(){
    addBorder(walter, 'walter')
}

jr.onclick = function(){
    addBorder(jr, 'jr')
}

/*infiniteInput.onclick = function(){
    if(statusButton === 'story') {
        infiniteLabel.innerText = 'INFINITE';
        statusButton = 'infinite';
    } else {
        infiniteLabel.innerText = 'STORY';
        statusButton = 'story'
    }
    //detect the color and switch mode accordingly
}*/

document.addEventListener('keyup', e => {
    if (e.key === "ArrowLeft") {
        if (current === walter) {
            addBorder(jr, 'jr')
        } else if (current === jr) {
            addBorder(jesse, 'jesse')
        } else if (current === jesse) {
            addBorder(walter, 'walter')
        }
    } else if (e.key === "ArrowRight") {
        if (current === walter) {
            addBorder(jesse, 'jesse')
        } else if (current === jesse) {
            addBorder(jr, 'jr')
        } else if (current === jr) {
            addBorder(walter, 'walter')
        }
    }
})

startButton.onclick = function(){
    let url = new URL("https://whereswalter.netlify.app/game.html?");
    const soundInput = document.getElementById('soundSlider');
    let sound;
    let guy;

    if(soundInput.style.backgroundColor === '#ccc') {
        sound = false;
    } else {
        sound = true;
    }

    if (current === walter) {
        guy = 'walter'
    } else if (current === jesse) {
        guy = 'jesse'
    } else if (current === jr) {
        guy = 'jr'
    }

    url.searchParams.append('sound', sound);
    url.searchParams.append('mode', statusButton);
    url.searchParams.append('character', guy);
    window.location.href = url;
} 