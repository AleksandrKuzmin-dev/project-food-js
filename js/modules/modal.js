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

export default modal;
export {showModal};
export {closeModal};