export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.classList.add('popup_is-animated');
  document.addEventListener('keydown', (evt) => closeByEscape(evt, modal));
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

export function closeByEscape(evt, modal) {
  if (evt.key === 'Escape') {
    closeModal(modal);
  }
}

export function closeByClickOnOverlay(evt, modal) {
  if (evt.target.classList.contains('popup_is-opened')) { 
    closeModal(modal); 
  } 
}