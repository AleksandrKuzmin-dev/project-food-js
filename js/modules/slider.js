import {getZeroInTime} from './timer';

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

        sliderCurrentValue.textContent = getZeroInTime(currentSlide);
        sliderTotalValue.textContent = getZeroInTime(sliderLength); 

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
        sliderCurrentValue.textContent = getZeroInTime(currentSlide);
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

export default slider;