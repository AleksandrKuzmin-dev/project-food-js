document.addEventListener('DOMContentLoaded', function() {

  
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

    function showModal(modal = modalBlock){ 
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(timerShowModal);
        window.removeEventListener('scroll', showModalToScroll);
    };

    function closeModal(modal = modalBlock){ 
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }


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


    /* Отправка форм */

    const forms = document.querySelectorAll('form');

    const message = {
        loading: './icons/spinner.svg',
        succes: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form){
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

            const object = {};

            formData.forEach((key, value) => {
                object[key] = value;
            })

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
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

        showModal();

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
        
    };
});












