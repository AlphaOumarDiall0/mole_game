"use strict";
//Recuperation des elements html
const holsEl = document.querySelectorAll(".hole");
const molsEl = document.querySelectorAll(".mole");
const scoreEl = document.getElementById("score");
const heigthScore = document.getElementById("highScore");
const startBtn = document.getElementById("start-btn");
const timeLeftDiplay = document.getElementById("time-left");
const finish = document.querySelector(".finish");

// Affichage du modal de guide
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal"); 
const btnsOpenModal = document.querySelector("#guide");

const closeModal = function () {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
};
const openModal = function () {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
btnsOpenModal.addEventListener("click", openModal);

document.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    if (modal.classList.contains("hidden")) {
      openModal();
    } else {
      closeModal();
    }
  }
});

let lastPosition;
let finishTime = false;
let score = 0;
let timeLeft = 30;
let higthScore = 0;
// Création des fichiers audios
const startSound = new Audio('audio/Message-notification.mp3')
const clickSound = new Audio('audio/Tongue-clicking-sound.mp3')
const congratulationSound = new Audio('audio/Congratulations-sound.mp3')
const endGameSound = new Audio('audio/Game-ending-sound-effect.mp3')
// Fonction pour choisir aléatoirement un trou
function randomHole(holes) {
  const indexHole = Math.trunc(Math.random() * holsEl.length);
  const hole = holsEl[indexHole];
  if (hole === lastPosition) {
    return randomHole(holes);
  }
  lastPosition = hole;
  return hole;
}

// Fonction pour affiche une taupe dans un trou choisi aléatoirement
const showMole = function () {
  const time = Math.random() * 1000 + 400;
  const hole = randomHole(holsEl);
  const mole = hole.querySelector(".mole");
  mole.classList.remove("hidden");

  setTimeout(() => {
    mole.classList.add("hidden");
    if (!finishTime) {
      showMole();
    }
  }, time);
};

// Fonction pour gerer le temps d'execution du jeu
const timer = function () {
  let delay = setInterval(() => {
    timeLeft--;
    timeLeftDiplay.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(delay);
      finishTime = true;
      finish.classList.remove("hidden");
      startBtn.textContent = "Relancer le jeu";
      startBtn.disabled = false;
      btnsOpenModal.disabled =  false
      if (score > higthScore) {
        higthScore = score;
        heigthScore.textContent = higthScore;
        congratulationSound.play()
      }
      endGameSound.play()
    }
  }, 1000);
};

// Fonctio pour demarrer le jeu
const startGame = function () {
  scoreEl.textContent = 0;
  score = 0;
  finishTime = false;
  timeLeft = 30;
  timeLeftDiplay.textContent = timeLeft;
  scoreEl.textContent = score;
  startSound.play()
  showMole();
  timer();

  finish.classList.add("hidden");
  startBtn.disabled = true;
  btnsOpenModal.disabled = true;
  //   startBtn.classList.add("hidden");
};

// Ajout d'un evenement de click sur chaque taupe
molsEl.forEach((mole) => {
  mole.addEventListener("click", function () {
    // Ajout du son sur chaque clic
    score++;
    mole.classList.add("hidden");
    scoreEl.textContent = score;
    clickSound.play()
  });
});

startBtn.addEventListener("click", startGame);
