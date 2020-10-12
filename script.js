// DOM Elements Part I
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');

// DOM Elements Part II
const countdownElement = document.getElementById('countdown');
const countdownElementTitle = document.getElementById('countdown-title');
const resetButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

// DOM Elements Part III
const completeElement = document.getElementById('complete');
const completeElementInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');

// Global Variables
let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountDown = {};

//Helper Variables
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Minimum
const today = new Date().toISOString().split('T')[0];
dateElement.setAttribute('min', today);

const updateDOM = () => {
  inputContainer.hidden = true;
  countdownElement.hidden = false;

  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    const time = [days, hours, minutes, seconds];

    if (distance < 0) {
      countdownElement.hidden = true;
      clearInterval(countdownActive);
      completeElementInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeElement.hidden = false;
    } else {
      countdownElementTitle.textContent = `${countdownTitle}`;
      timeElements.forEach((item, index) => {
        timeElements[index].textContent = time[index];
      });
      completeElement.hidden = true;
      countdownElement.hidden = false;
    }
  }, second);
};

const updateCountDown = (event) => {
  event.preventDefault();

  countdownTitle = countdownForm.elements[0].value;
  countdownDate = countdownForm.elements[1].value;

  savedCountDown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountDown));

  if (countdownDate === '') {
    alert('Please  select a date for the countdown');
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

const resetCountDown = () => {
  console.log('hello');
  countdownElement.hidden = true;
  completeElement.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
};

const restoreCountdown = () => {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountDown.title;
    countdownDate = savedCountDown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// Event Listeners
countdownForm.addEventListener('submit', updateCountDown);
resetButton.addEventListener('click', resetCountDown);
completeElement.addEventListener('click', resetCountDown);

restoreCountdown();
