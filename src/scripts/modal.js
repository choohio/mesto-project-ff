import { clearValidation } from "./validation";

export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeByEscape);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
  clearValidation(modal);
}

export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export function closeByClickOnOverlay(evt, modal) {
  if (evt.target.classList.contains('popup_is-opened')) { 
    closeModal(modal); 
  } 
}