import petsArr from '../pets/pets.js';

const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');
const navList = document.querySelector('.nav-list');
const logo = document.querySelector('.logo-link');
const back = document.querySelector('.back-burger');
const firstNavItem = document.querySelector('.nav-item_underlined');
const headerWrapper = document.querySelector('.header__wrapper');
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
const namePets = ['katrine', 'jennifer', 'woody', 'sophia', 'timmy', 'charly', 'scarlett', 'freddie'];
let random = Math.floor(Math.random()* 8);
const namePetsStart = (namePets.concat(namePets)).slice(random, random + 8);
// const namePetsLast = ['freddie', 'katrine', 'jennifer', 'woody', 'sophia', 'timmy', 'charly', 'scarlett'];
const namePetsLast = (namePetsStart.slice(-1)).concat(namePetsStart.slice(0,7));
const namePetsLast768 = (namePetsStart.slice(-3)).concat(namePetsStart.slice(0,5));
const namePetsLast320 = (namePetsStart.slice(-3)).concat(namePetsStart.slice(0,5));
// const namePetsLast768 = ['charly', 'scarlett', 'freddie', 'katrine', 'jennifer', 'woody', 'sophia', 'timmy'];
// const namePetsLast320 = ['charly', 'scarlett', 'freddie', 'katrine', 'jennifer', 'woody', 'sophia', 'timmy'];
const switchLeft = document.querySelector('.switch-left');
const switchPrevious = document.querySelector('.switch-previous');
const switchNow = document.querySelector('.switch-now');
const switchNext = document.querySelector('.switch-next');
const switchRight = document.querySelector('.switch-rigth');
const switches = document.querySelectorAll('.switch');
const friendsCards = document.querySelectorAll('.friends__card');
const widthWindow = document.documentElement.clientWidth;
let arr = [];

function toggleMenu() {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
    logo.classList.toggle('open');
    back.classList.toggle('open');    
    headerWrapper.classList.toggle('open');
    document.querySelector('html').classList.toggle('lock');
}

burger.addEventListener('click', toggleMenu);
back.addEventListener('click', toggleMenu);
navList.addEventListener('click', toggleMenu);
/*---------------------------------------------Popup----------------------------------------------------------------------------*/
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
    if(event.target.parentNode.classList.contains('friends__card')) {    
      let cardName = event.target.parentNode.childNodes[3].textContent;    
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
  
  friendsCards.forEach((el) => el.addEventListener('click', addActiveClass));
  friendsCards.forEach((el) => el.addEventListener('click', getPopup));
  popupButton.addEventListener('click', removeActiveClass);
  popupBack.addEventListener('click', removeActiveClass);  
  popupButton.addEventListener('mouseover', () => {popupButton.style.background = '#FDDCC4'});
  popupContent.addEventListener('mouseover', () => {popupButton.style.background = 'none'});
  popupContent.addEventListener('mouseout', () => {popupButton.style.background = '#FDDCC4'}); 

/*-------------------------------------------------------------------------------------------------------------------------*/

function getNextPage (event) { 
    if(event.target.classList.contains('switch-next') && (widthWindow >= 1280? +switchNow.textContent < 6 : ((widthWindow < 1280 && widthWindow >= 768)? +switchNow.textContent < 8 : (widthWindow < 768 ? +switchNow.textContent < 16 : +switchNow.textContent < 16)))) {
        friendsCards.forEach((el) => {
            let indexNew = namePetsStart.indexOf(el.childNodes[3].textContent.toLowerCase()) + 3;
            if(indexNew > namePetsStart.length-1) {indexNew = indexNew - 8};
            let nameNew  = namePetsStart[indexNew];
            el.childNodes[3].textContent = nameNew[0].toUpperCase() + nameNew.slice(1);
            el.childNodes[1].src = `../../assets/images/pets/pets-${nameNew}.png`;
            arr.push(nameNew);             
        })
        switchNow.textContent = +switchNow.textContent + 1;
        if(+switchNow.textContent > 1) {
            removeClassDisabledFirst()
        } else {
            addClassDisabledFirst()
        }              
        console.log(widthWindow >= 1280 && +switchNow.textContent === 6)
        if(widthWindow >= 1280 && +switchNow.textContent === 6){addClassDisabledLast()};
        if(widthWindow < 1280 && widthWindow >= 768 && +switchNow.textContent === 8){addClassDisabledLast()};
        if(widthWindow < 768 && +switchNow.textContent === 16){addClassDisabledLast()};  
    } 
}

function getPreviousPage (event) {
    if(event.target.classList.contains('switch-previous') && !event.target.classList.contains('disabled')) {
        removeClassDisabledLast()               
        friendsCards.forEach((el) => {
            let indexNew = namePetsStart.indexOf(el.childNodes[3].textContent.toLowerCase()) - 3;
            if(indexNew < 0) {indexNew = indexNew + 8};
            let nameNew  = namePetsStart[indexNew];
            el.childNodes[3].textContent = nameNew[0].toUpperCase() + nameNew.slice(1);
            el.childNodes[1].src = `../../assets/images/pets/pets-${nameNew}.png`;
            arr.pop();
        })
        if(+switchNow.textContent > 1) {
            switchNow.textContent = +switchNow.textContent - 1;
            if(+switchNow.textContent < 2) {addClassDisabledFirst()}
        }else {
            addClassDisabledFirst()
        }        
    }
}

function getFirstPage (event) {
    if(event.target.classList.contains('switch-left') && !event.target.classList.contains('disabled')) {
        let i = 0;
        friendsCards.forEach((el) => {
            let nameNew  = namePetsStart[i];
            el.childNodes[3].textContent = nameNew[0].toUpperCase() + nameNew.slice(1);
            el.childNodes[1].src = `../../assets/images/pets/pets-${nameNew}.png`; 
            i++;
        })
        switchNow.textContent = 1;
        addClassDisabledFirst();
        removeClassDisabledLast()
    }
}

function doReload () {
    window.location.reload();
}

function getLastPage (event) {    
    console.log(widthWindow)
    if(event.target.classList.contains('switch-rigth') && !event.target.classList.contains('disabled')) {
        let namePetsArr;
        if(window.innerWidth >= 1280){namePetsArr = namePetsLast.map(el => el)};
        if(window.innerWidth < 1280 && window.innerWidth >= 768){namePetsArr = namePetsLast768.map(el => el)};
        if(window.innerWidth < 768){namePetsArr = namePetsLast320.map(el => el)}; 

        let i = 0;
        friendsCards.forEach((el) => {
            let nameNew  = namePetsArr[i];
            el.childNodes[3].textContent = nameNew[0].toUpperCase() + nameNew.slice(1);
            el.childNodes[1].src = `../../assets/images/pets/pets-${nameNew}.png`; 
            i++;
        })
        if(window.innerWidth >= 1280){switchNow.textContent = 6};
        if(window.innerWidth < 1280 && window.innerWidth >= 768){switchNow.textContent = 8};
        if(window.innerWidth < 768){switchNow.textContent = 16};        
        addClassDisabledLast()
        removeClassDisabledFirst()
    }
}

function addClassDisabledFirst() {
    switchLeft.classList.add('disabled');
    switchPrevious.classList.add('disabled');
}

function removeClassDisabledFirst() {
    switchLeft.classList.remove('disabled');
    switchPrevious.classList.remove('disabled');
}

function addClassDisabledLast() {
    switchNext.classList.add('disabled');
    switchRight.classList.add('disabled');
}

function removeClassDisabledLast() {
    switchNext.classList.remove('disabled');
    switchRight.classList.remove('disabled');
}

function addClassTransform() {
    friendsCards.forEach((el) => el.classList.add('transform-fade'))
}

function removeClassTransform() {
    friendsCards.forEach((el) => el.classList.remove('transform-fade'))
}

friendsCards.forEach((el) => el.addEventListener('animationend', removeClassTransform))
// switches.forEach((el) => el.addEventListener('click', addClassTransform))
// switches.addEventListener('click', addClassTransform);
switchNext.addEventListener('click', getNextPage);
switchPrevious.addEventListener('click', getPreviousPage);
switchLeft.addEventListener('click', getFirstPage);
switchRight.addEventListener('click', getLastPage);
// window.addEventListener('resize', doReload)
switches.forEach((el) => (!el.classList.contains('disabled') || !el.classList.contains('switch-now'))? el.addEventListener('click', addClassTransform) : null)

window.addEventListener('load',() => {    
    let i = 0;
    friendsCards.forEach((el) => {
        let nameNew  = namePetsStart[i];
        el.childNodes[3].textContent = nameNew[0].toUpperCase() + nameNew.slice(1);
        el.childNodes[1].src = `../../assets/images/pets/pets-${nameNew}.png`; 
        i++;
    })})

