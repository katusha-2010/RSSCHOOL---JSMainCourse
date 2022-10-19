import petsArr from '../pets/pets.js';

const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');
const navList = document.querySelector('.nav-list');
const logo = document.querySelector('.header__logo');
const back = document.querySelector('.back-burger');
const switchers = document.querySelectorAll('.switch');
const switchBack = document.querySelector('.switch__back');
const switchNext = document.querySelector('.switch__next');
const CAROUSEL = document.querySelector('.carousel');
const cardsLeft = document.querySelector('#cards-left');
const cardsActive = document.querySelector('#cards-active');
const cardsRight = document.querySelector('#cards-right');
const petsCards = document.querySelectorAll('.pets__cards');
const cardImages = document.querySelectorAll('.card__image');
const cardNames = document.querySelectorAll('.card__name');
const namePets = ['katrine', 'jennifer', 'woody', 'sophia', 'timmy', 'charly', 'scarlett', 'freddie'];
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');
const popupBack = document.querySelector('.popup__back');
const popupButton = document.querySelector('.popup__btn');
const popupImage = document.querySelector('.popup__img');
const popupTitle = document.querySelector('.popup__title');
const popupSubTitle = document.querySelector('.popup__subtitle');
const popupText = document.querySelector('.popup__text');
const popupAge = document.querySelector('.list-item .age');
const popupInoculations = document.querySelector('.list-item .inoculations');
const popupDiseases = document.querySelector('.list-item .diseases');
const popupParasites = document.querySelector('.list-item .parasites');

console.log(popupParasites)

/*-----------------------------------------Burger----------------------------------------------------------------------------------*/
function toggleMenu() {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
    logo.classList.toggle('open');
    back.classList.toggle('open');
    document.querySelector('html').classList.toggle('lock');    
}

burger.addEventListener('click', toggleMenu);
back.addEventListener('click', toggleMenu);
navList.addEventListener('click', toggleMenu);

/*-----------------------------------------Carousel----------------------------------------------------------------------------------*/
function moveLeft() {
  if(window.innerWidth < 1280 && window.innerWidth >= 768 && cardsActive.children[2] && cardsLeft.children[2]){cardsActive.removeChild(cardsActive.children[2]);cardsLeft.removeChild(cardsLeft.children[2]) };
  if(window.innerWidth < 768 && cardsActive.children[1] && cardsLeft.children[1] && cardsActive.children[2] && cardsLeft.children[2]){cardsActive.removeChild(cardsActive.children[2]);cardsLeft.removeChild(cardsLeft.children[2]);cardsActive.removeChild(cardsActive.children[1]);cardsLeft.removeChild(cardsLeft.children[1])}; 
  CAROUSEL.classList.add('transition-left'); 
}

function moveRight() {
  if(window.innerWidth < 1280 && window.innerWidth >= 768 && cardsActive.children[2] && cardsRight.children[2]){cardsActive.removeChild(cardsActive.children[2]); cardsRight.removeChild(cardsRight.children[2]) };
  if(window.innerWidth < 768 && cardsActive.children[1] && cardsRight.children[1] && cardsActive.children[2] && cardsRight.children[2]){cardsActive.removeChild(cardsActive.children[2]);cardsRight.removeChild(cardsRight.children[2]);cardsActive.removeChild(cardsActive.children[1]);cardsRight.removeChild(cardsRight.children[1])};   
  CAROUSEL.classList.add('transition-right');
}

switchBack.addEventListener('click', moveLeft);
switchNext.addEventListener('click', moveRight);
// window.addEventListener('resize', doReload);
CAROUSEL.addEventListener('animationend', changeCards)
CAROUSEL.addEventListener('animationstart', doCards)

function countCards () {
  return window.innerWidth >= 1280? 3 : window.innerWidth < 1280 && window.innerWidth >= 768? 2 : window.innerWidth < 768? 1 : 0
}

function findRandomIndex () {
  return Math.floor(Math.random()*(8 - countCards()));  
}

let arrRandom;

function getRandomArr() {
  arrRandom = [];  
  for(let i = 0; i < countCards (); i++) {
    let index = findRandomIndex ();
    if(arrRandom.length === 0) {        
      arrRandom.push(index);        
    } else {
      function findUniqueIndex(numb) {
        if(!arrRandom.includes(numb)) {
          index = numb;
          return index
        } else {findUniqueIndex(findRandomIndex ())}
      }

      findUniqueIndex(index);
      arrRandom.push(findUniqueIndex(index));               
    }      
  }
  return arrRandom 
}

function doCards (e) {
  let changedGroup;
  if(e.animationName === 'move-left') {    
    changedGroup = cardsLeft;   
    
    let arrNameActive = [];  
    for(let i = 0; i < countCards (); i++) {
      arrNameActive.push(cardsActive.children[i].children[1].innerText.toLowerCase());
    }

    let arrNameNew = namePets.map((el) => el);
    arrNameNew = arrNameNew.filter((el) => !arrNameActive.includes(el))

    arrRandom  = getRandomArr()
     changedGroup.innerHTML = "";
     let nameNew;
     for(let i = 0; i < countCards (); i++) {
       let card = createCard();
       nameNew = arrNameNew[arrRandom[i]];
       card.children[1].innerText = nameNew[0].toUpperCase() + nameNew.slice(1);
       card.children[0].src = `../../assets/images/pets/pets-${nameNew}.png`;
       changedGroup.appendChild(card);
      }     
  } else {    
    changedGroup = cardsRight;     
    
    let arrNameActive = [];
    for(let i = 0; i < countCards (); i++) {
      arrNameActive.push(cardsActive.children[i].children[1].innerText.toLowerCase());
    }

    let arrNameNew = namePets.map((el) => el);
    arrNameNew = arrNameNew.filter((el) => !arrNameActive.includes(el))

    arrRandom  = getRandomArr()
  
     changedGroup.innerHTML = "";
     let nameNew;
     for(let i = 0; i < countCards (); i++) {
       let card = createCard();
      nameNew = arrNameNew[arrRandom[i]];
      card.children[1].innerText = nameNew[0].toUpperCase() + nameNew.slice(1);
      card.children[0].src = `../../assets/images/pets/pets-${nameNew}.png`;
      changedGroup.appendChild(card);
     }    
  }
}

function changeCards (e) {  
  if(e.animationName === 'move-left') {
    CAROUSEL.classList.remove('transition-left');
    cardsActive.innerHTML = cardsLeft.innerHTML;
   
  } else {
    CAROUSEL.classList.remove('transition-right');
    cardsActive.innerHTML = cardsRight.innerHTML;  
}
}

function createCard () {
  const card  = document.createElement("div");
  card.classList.add("pets__card");
  const img = card.appendChild(document.createElement("img"));
  img.classList.add("card__image");  
  const name = card.appendChild(document.createElement("h4"));
  name.classList.add("card__name");  
  const button = card.appendChild(document.createElement("button"));
  button.classList.add("btn", "card__btn");
  button.innerText = 'Learn more';
  return card;
}

function doReload () {
  window.location.reload()
}
/*-----------------------------------------Popup----------------------------------------------------------------------------------*/

function addActiveClass () {  
  popup.classList.add('active');
  document.querySelector('html').classList.add('lock');
  popupButton.style.background = 'none';
}

function removeActiveClass () {
  popup.classList.remove('active');
  document.querySelector('html').classList.remove('lock');
  popupButton.style.background = 'none';
}

function getPopup (event) {
  if(event.target.parentNode.classList.contains('pets__card')) { 
    console.log(event.target.parentNode.children)   
    let cardName = event.target.parentNode.children[1].textContent;    
    let necessaryObj = petsArr.find(obj => obj.name === cardName);
    popupImage.src = `../../assets/images/pets/pets-${necessaryObj.name.toLowerCase()}.png`;
    popupTitle.textContent = necessaryObj.name;
    popupSubTitle.textContent = necessaryObj.type + ` - ` + necessaryObj.breed;
    popupText.textContent = necessaryObj.description;
    popupAge.textContent = necessaryObj.age;
    popupInoculations.textContent = necessaryObj.inoculations;
    popupDiseases.textContent = necessaryObj.diseases;
    popupParasites.textContent = necessaryObj.parasites;
  }
}

cardsActive.addEventListener('click', addActiveClass);
cardsActive.addEventListener('click', getPopup);
popupButton.addEventListener('click', removeActiveClass);
popupBack.addEventListener('click', removeActiveClass);
popupButton.addEventListener('mouseover', () => {popupButton.style.background = '#FDDCC4'});
popupContent.addEventListener('mouseover', () => {popupButton.style.background = 'none'});
popupContent.addEventListener('mouseout', () => {popupButton.style.background = '#FDDCC4'})