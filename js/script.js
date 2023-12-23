document.addEventListener('DOMContentLoaded', function() {

  
    // TABS
    let tabContent = document.querySelectorAll('.tabcontent'),
    tabsParrent = document.querySelector('.tabheader__items'),
    tabs = tabsParrent.querySelectorAll('.tabheader__item');

    console.log(tabsParrent);
    console.log(tabs);
    console.log(tabContent);

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



    // TIMER
    const deadline = new Date(2023,11,14, 17, 56);

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

    const getZeroInTime = function(number){
        if (number >= 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
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



    // MODAL WINDOW

    const modalBlock = document.querySelector('[data-modal-block]')
    const modalShowBtn = document.querySelectorAll('[data-modal-btn]')
    const modalClose = document.querySelectorAll('[data-modal-close]')

    function showModal(modal){ 
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(timerShowModal);
        window.removeEventListener('scroll', showModalToScroll);
    };

    function closeModal(modal){ 
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }


    modalShowBtn.forEach(btn => { 
        btn.addEventListener('click', ()=> {
            showModal(modalBlock);
        })
    })

    modalClose.forEach(btn => { 
        btn.addEventListener('click', () => {
            closeModal(modalBlock);
        })
    })

    modalBlock.addEventListener('click', (event) => { 
        if (event.target == modalBlock) {
            closeModal(modalBlock);
        }
    })

    document.addEventListener('keydown', (event) => { 
        if (event.code = 'Escape' && modalBlock.style.display == 'block'){
            closeModal(modalBlock);
        }
    })

   /*  const timerShowModal = setTimeout(showModal, 5000, modalBlock); */

    function showModalToScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalBlock);
         }
    }

    window.addEventListener('scroll', showModalToScroll);
    

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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        ).render();

        


});








