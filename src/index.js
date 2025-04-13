import '../index.css'

const audioSources = {
  rain: '../public/assets/sounds/rain.mp3',
  forest: '../public/assets/sounds/summer.mp3',
  winter: '../public/assets/sounds/winter.mp3'
};

let currentAudio = null;
let currentButton = null;
const volumeControl = document.getElementById('volume');
const buttons = {
  rain: document.getElementById('rain-btn'),
  forest: document.getElementById('forest-btn'),
  winter: document.getElementById('winter-btn')
};
const backgroundImages = {
  rain: 'url("../public/assets/rainy-bg.jpg")',
  forest: 'url("../public/assets/summer-bg.jpg")',
  winter: 'url("../public/assets/winter-bg.jpg")'
};

volumeControl.addEventListener('input', (e) => {
  if(currentAudio) {
    currentAudio.volume = e.target.value;
  }
});

function handleButtonClick(type) {
  if(currentButton === buttons[type]) {
    if(currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
    return;
  }

  if(currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  Object.values(buttons).forEach(btn => btn.classList.remove('active'));

  currentAudio = new Audio(audioSources[type]);
  currentAudio.volume = volumeControl.value;
  currentAudio.play();

  document.body.style.backgroundImage = backgroundImages[type];
  
  currentButton = buttons[type];
  currentButton.classList.add('active');
}

buttons.rain.addEventListener('click', () => handleButtonClick('rain'));
buttons.forest.addEventListener('click', () => handleButtonClick('forest'));
buttons.winter.addEventListener('click', () => handleButtonClick('winter'));