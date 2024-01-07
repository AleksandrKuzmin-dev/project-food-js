/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
     // Calculator

     const calorieNorm = document.querySelector('.calculating__result span')

     let sex = 'female',
         height, weight, age,
         ratio = 1.375;
 
 
     const startCalc = () => {
         getStaticInfo('#gender');
         getStaticInfo('#calcRatio');
         getDynamicInfo();
         calcNeedCalorie();
     }
 
     const calcNeedCalorie = () => {
 
         if(!sex || !height || !weight || !age || !ratio){
             calorieNorm.textContent = "____";
             return;
         }
 
         if (sex == 'female'){
             calorieNorm.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
         } else if (sex == 'male') {
             calorieNorm.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
         }
 
        
     }
 
     const getStaticInfo = (parentSelector, itemSelector = 'calculating__choose-item', activeSelector = 'calculating__choose-item_active') => {
 
         const parent = document.querySelector(parentSelector),
               items = document.querySelectorAll(`${parentSelector} .${itemSelector}`);
 
         parent.addEventListener('click', (event) => {
             if(event.target.classList.contains(itemSelector)) {
 
                 items.forEach((elem) => {
                     elem.classList.remove(activeSelector);
                 })
 
                 if (event.target.getAttribute('data-sex')) {
                     sex = event.target.getAttribute('data-sex');
                 } else if (event.target.getAttribute('data-ratio')) {
                     ratio = +event.target.getAttribute('data-ratio');
                 }
 
                 event.target.classList.add(activeSelector);
                 calcNeedCalorie();
             };
         });
     }
 
     const getDynamicInfo = () => {
         
         const parent = document.querySelector('#bodyConstitution');
 
         parent.addEventListener('input', (event) => {
 
             if(event.target.value.match(/\D/ig)){
                event.target.style.border = "1px solid red";
             } else {
                 event.target.style.border = "none";
             }
 
             switch(event.target.getAttribute('id')){
                 case 'height':
                     height = +event.target.value;
                     break;
                 case 'weight':
                     weight = +event.target.value;
                     break;
                 case 'age':
                     age = +event.target.value;
                     break;
             };
 
             calcNeedCalorie();
         });
     };
     startCalc();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(){
      //Используем классы для карточек

      class MenuCard {

        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.classes = classes;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = `
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
            `;
            this.parent.append(element)
        }
    };

    const getResource = async (url) => {
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");



function forms(){
    /* Отправка форм */

    const forms = document.querySelectorAll('form');

    const message = {
        loading: './icons/spinner.svg',
        succes: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
       
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then((data) => {
                console.log(data);
                showThanksModal(message.succes);
                
            }).catch(() => {
                showThanksModal(message.failure);
                
            }).finally(() => {
                form.reset();
                statusMessage.remove();
                
            });

        })
    };

    function showThanksModal(message) {
        const modalBlock = document.querySelector('[data-modal-block]')
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
        <div class="modal__content"> 
            <div class="modal__close" data-modal-close="">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal)

        ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(modalBlock);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalBlock);
        }, 4000);
        
    };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   showModal: () => (/* binding */ showModal)
/* harmony export */ });
function showModal(modal = modalBlock){ 
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
 /*    clearInterval(timerShowModal);
    window.removeEventListener('scroll', showModalToScroll); */
};

function closeModal(modal = modalBlock){ 
    const modalBlock = document.querySelector('[data-modal-block]')
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function modal(){
     // MODAL WINDOW

     const modalBlock = document.querySelector('[data-modal-block]')
     const modalShowBtn = document.querySelectorAll('[data-modal-btn]')

     modalShowBtn.forEach(btn => { 
         btn.addEventListener('click', ()=> {
             showModal(modalBlock);
         })
     })
 
 
     modalBlock.addEventListener('click', (event) => { 
         if (event.target == modalBlock || event.target.hasAttribute('data-modal-close')) {
             closeModal(modalBlock);
         }
     })
 
     document.addEventListener('keydown', (event) => { 
         if (event.code == 'Escape' && modalBlock.style.display == 'block'){
             closeModal(modalBlock);
         }
     })
 
     const timerShowModal = setTimeout(showModal, 3000000, modalBlock);
 
     function showModalToScroll(){
         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
             showModal(modalBlock);
          }
     }
 
     window.addEventListener('scroll', showModalToScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider(){
    /* SLIDER */


    const sliderItems = document.querySelectorAll('.offer__slide'),
        sliderBtnrPrev = document.querySelector('.offer__slider-prev'),
        sliderBtnrNext = document.querySelector('.offer__slider-next'),
        sliderCurrentValue = document.querySelector('#current'),
        sliderTotalValue = document.querySelector('#total'),
        sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(sliderWrapper).width;

    let sliderLength;
    let currentSlide = 0;

    function startSlider(){
        
        sliderLength = sliderItems.length;

        sliderCurrentValue.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZeroInTime)(currentSlide);
        sliderTotalValue.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZeroInTime)(sliderLength); 

        sliderBtnrPrev.addEventListener('click', () => changeSlide('left'))
        sliderBtnrNext.addEventListener('click', () => changeSlide('right'))
        

        sliderWrapper.style.overflow = 'hidden';
        sliderField.style.width = 100 * sliderLength + "%";
        sliderField.style.display = 'flex';
        sliderField.style.transition = "0.5s all";
        sliderItems.forEach(slide => slide.style.width = width)
        

        addSliderNavigation();
        changeSlide('right');
   
    }

    function addSliderNavigation(){
        const indicators = document.createElement('div');
        indicators.classList.add('carousel-indicators');
        sliderWrapper.style.position = 'relative';
        sliderWrapper.append(indicators);

        for (let i=0; i < sliderItems.length; i++){
            const dot = document.createElement('div');
            dot.classList.add('dot');
            indicators.append(dot);

            dot.addEventListener('click', () => {
                currentSlide = i;
                changeSlide('right');
            });
        };
    };


    function changeSlide(direction){
        if (direction == 'right') {
                if (currentSlide < sliderLength) {
                    currentSlide++;
                } else {
                    currentSlide = 1;
                }
        } else if (direction == 'left'){
                if (currentSlide > 1) {
                    currentSlide--;
                } else {
                    currentSlide =  sliderLength;
                }
        } else {
                return;
        }

        changeActiveDot(currentSlide);
        sliderField.style.transform = `translateX(-${width.replace(/\D/g, '') * (currentSlide - 1)}px)`;
        sliderCurrentValue.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZeroInTime)(currentSlide);
    }

    function changeActiveDot(id){
        document.querySelectorAll('.dot').forEach((dot, index) => {
            console.log(id);
            dot.classList.remove('dot_active');
            if(index == id - 1) dot.classList.add('dot_active');
        })
    }

    startSlider();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){
     // TABS
    let tabContent = document.querySelectorAll('.tabcontent'),
    tabsParrent = document.querySelector('.tabheader__items'),
    tabs = tabsParrent.querySelectorAll('.tabheader__item');
    function hideTabContent(){

        tabContent.forEach(element => {
            element.style.display = 'none';
        })

        tabs.forEach(element => {
            element.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0){

        tabContent[i].style.display = 'block';

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParrent.addEventListener('click', function (event) {

        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((element, index) => {
                if (target == element) {
                    hideTabContent();
                    showTabContent(index);
                }
            })
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getZeroInTime: () => (/* binding */ getZeroInTime)
/* harmony export */ });
function getZeroInTime(number){
    if (number >= 0 && number < 10) {
        return `0${number}`;
    } else {
        return number;
    };
};

function timer(){
    // TIMER
    const deadline = new Date(2024,2,11, 17, 56);

    const getTimeRemaining = function(endTime){

        const totalRemaining = Date.parse(deadline) - Date.parse(new Date());

        if(totalRemaining <= 0) {
            return {
                totalRemaining: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
            }
        

        const days = Math.floor(totalRemaining / 1000 / 60 / 60 / 24),
            hours = Math.floor(((totalRemaining / 1000 / 60 / 60) % 24)),
            minutes = Math.floor((totalRemaining / 1000 / 60) % 60),
            seconds = Math.floor((totalRemaining / 1000) % 60);

            return {
                totalRemaining,
                days,
                hours,
                minutes,
                seconds
            };
    };
    const setClock = function(selector, endTime){

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
            updateClock();

        function updateClock(){

            const totalRemaining = getTimeRemaining(endTime);

            if (totalRemaining.totalRemaining <= 0) {
                clearInterval(timeInterval);
            };

            days.textContent = `${getZeroInTime(totalRemaining.days)}`;
            hours.textContent = `${getZeroInTime(totalRemaining.hours)}`;
            minutes.textContent = `${getZeroInTime(totalRemaining.minutes)}`;
            seconds.textContent = `${getZeroInTime(totalRemaining.seconds)}`;
        };
    };

    setClock('.timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








document.addEventListener('DOMContentLoaded', function() {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map