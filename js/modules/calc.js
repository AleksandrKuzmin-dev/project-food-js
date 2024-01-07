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

export default calc;