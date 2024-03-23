import './styles/index.css';
import { openModal, closeModal, closeByClickOnOverlay } from './scripts/modal';

import { initialCards } from './scripts/cards';
import { createCard, likePlace } from './scripts/card';

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => popup.addEventListener('click', closeByClickOnOverlay));

// Попап редактирования
const editPopup = document.querySelector('.popup_type_edit');

// Попап добавления карточки
const addPopup = document.querySelector('.popup_type_new-card');

// Попап с картинкой
const imagePopup = document.querySelector('.popup_type_image');

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// Форма
const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('.popup__input_type_name');
nameInput.value = document.querySelector('.profile__title').textContent;
const jobInput = formElement.querySelector('.popup__input_type_description');
jobInput.value = document.querySelector('.profile__description').textContent;

function handleSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closeModal();
}

formElement.addEventListener('submit', handleSubmit);

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => openModal(editPopup));

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => openModal(addPopup));

document.querySelectorAll('.popup__close').forEach(cross => {
  cross.addEventListener('click', closeModal);
})


//Форма добавления карточки

const addCardForm = document.forms['new-place'];

addCardForm.addEventListener('submit', handleCardSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();
  let cardObj = {
    name: addCardForm.elements['place-name'].value,
    link: addCardForm.elements.link.value
  }
  const card = createCard(cardObj, removePlace, likePlace, handleImageClick);
  cardsContainer.prepend(card);
  closeModal();
  addCardForm.elements['place-name'].value = '';
  addCardForm.elements.link.value = '';
}



function handleImageClick (card) {
  imagePopup.querySelector('.popup__caption').textContent = card.name;
  imagePopup.querySelector('.popup__image').src = card.link;
  imagePopup.querySelector('.popup__image').alt = card.name;
}

// @todo: Функция удаления карточки
function removePlace(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
  const card = createCard(item, removePlace, likePlace, handleImageClick);
  cardsContainer.prepend(card); 
});