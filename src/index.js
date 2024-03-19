import './styles/index.css';
import {openModal, closeModal} from './scripts/modal';

import {initialCards} from './scripts/cards';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Попап редактирования
const editPopup = document.querySelector('.popup_type_edit');

// Попап добавления карточки
const addPopup = document.querySelector('.popup_type_new-card');

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
  closeModal(editPopup);
}

formElement.addEventListener('submit', handleSubmit);

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => openModal(editPopup));

const closeEditButton = editPopup.querySelector('.popup__close');
closeEditButton.addEventListener('click', () => closeModal(editPopup));

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => openModal(addPopup));

const closeAddButton = addPopup.querySelector('.popup__close');
closeAddButton.addEventListener('click', () => closeModal(addPopup));



document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup_is-opened')) {
    closeModal(e.target)
  }
})

// Закрытие попапов кнопкой Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(editPopup)
    closeModal(addPopup)
  }
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
  const card = createCard(cardObj, removePlace);
  cardsContainer.prepend(card);
  closeModal(addPopup);
  addCardForm.elements['place-name'].value = '';
  addCardForm.elements.link.value = '';
}

// @todo: Функция создания карточки
function createCard(card, removePlace) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  // вешаем обработчик события на кнопку удаления
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => removePlace(cardElement));

  // возвращаем карточку
  return cardElement;
}

// @todo: Функция удаления карточки
function removePlace(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
  const card = createCard(item, removePlace);
  cardsContainer.prepend(card); 
});