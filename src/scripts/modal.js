export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeByEscape);
}

export function closeModal() {
  let activePopup = document.querySelector('.popup_is-opened');
  activePopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

export function closeByClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) { 
    closeModal() 
  } 
}