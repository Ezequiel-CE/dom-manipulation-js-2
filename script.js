'use strict';

// seleccionando los elementos
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// declarando las variables de state de la app
let scores, currentscore, activePlayer, playing;

//metodo

const changePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // cambia de jugador
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

const init = function () {
  //iniciando las variables de estado
  playing = true;
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  //reinica los valores visibles
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

//condiciones de inicio
init();

// tirar dado

btnRoll.addEventListener('click', function () {
  if (playing) {
    //genera dandom dice
    const roll = Math.trunc(Math.random() * 6) + 1;
    //muestra dice
    diceElement.classList.remove('hidden');
    diceElement.src = `./assets/dice-${roll}.png`;
    //si toca 1
    if (roll !== 1) {
      //actualiza el current score
      currentscore += roll;
      //cambia el current score del player activo
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentscore;
    } else {
      changePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //agrega score al player
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //si el player tiene >= 100
    if (scores[activePlayer] >= 100) {
      //termina el juego
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      //cambia de jugador
      changePlayer();
    }
  }
});

//reinicia
btnNew.addEventListener('click', init);
