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

export default timer;
export {getZeroInTime};