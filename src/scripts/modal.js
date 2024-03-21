export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.classList.add('popup_is-animated');
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}