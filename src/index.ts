import "../index.css";

interface IAudioSources {
  rain: string;
  forest: string;
  winter: string;
}

interface IBackroundImages {
  rain: string;
  forest: string;
  winter: string;
}

type ButtonType = "rain" | "forest" | "winter";

const audioSources: IAudioSources = {
  rain: "../public/assets/sounds/rain.mp3",
  forest: "../public/assets/sounds/summer.mp3",
  winter: "../public/assets/sounds/winter.mp3",
};

const buttons = {
  rain: document.getElementById("rain-btn") as HTMLButtonElement,
  forest: document.getElementById("forest-btn") as HTMLButtonElement,
  winter: document.getElementById("winter-btn") as HTMLButtonElement,
};
const backgroundImages: IBackroundImages = {
  rain: 'url("../public/assets/rainy-bg.jpg")',
  forest: 'url("../public/assets/summer-bg.jpg")',
  winter: 'url("../public/assets/winter-bg.jpg")',
};

let currentAudio: HTMLAudioElement;
let currentButton: HTMLButtonElement;
const volumeControl = document.getElementById("volume") as HTMLInputElement;

volumeControl.addEventListener("input", (e: Event) => {
  if (currentAudio) {
    currentAudio.volume = Number((e.target as HTMLInputElement).value);
  }
});

function handleButtonClick(type: ButtonType): void {
  if (currentButton === buttons[type]) {
    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
    return;
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  Object.values(buttons).forEach((btn) => btn.classList.remove("active"));

  currentAudio = new Audio(audioSources[type]);
  currentAudio.volume = Number(volumeControl.value);
  currentAudio.play();

  document.body.style.backgroundImage = backgroundImages[type];

  currentButton = buttons[type];
  currentButton.classList.add("active");
}

buttons.rain.addEventListener("click", () => handleButtonClick("rain"));
buttons.forest.addEventListener("click", () => handleButtonClick("forest"));
buttons.winter.addEventListener("click", () => handleButtonClick("winter"));
