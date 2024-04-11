import './styles/index.css';
import { getInitialCards, getProfileInfo, addNewPlace, updateProfileInfo, updateAvatar } from './scripts/api';
import { openModal, closeModal, closeByClickOnOverlay } from './scripts/modal';
import { createCard, likePlace, removePlace } from './scripts/card';
import { enableValidation, clearValidation } from './scripts/validation';

// Профиль
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');

document.querySelector('.profile__image-container').addEventListener('click', () => openModal(avatarPopup));

// Коллекция попапов
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => popup.addEventListener('click', evt => closeByClickOnOverlay(evt, popup)));
popups.forEach(popup => popup.querySelector('.popup__close').addEventListener('click', () => closeModal(popup)));

// Попап редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');

// Попап добавления карточки
const addPopup = document.querySelector('.popup_type_new-card');

// Попап редактирования аватара
const avatarPopup = document.querySelector('.popup_type_avatar');

// Попап с картинкой
const imagePopup = document.querySelector('.popup_type_image');

// Контейнер с карточками
const cardsContainer = document.querySelector('.places__list');

// Отрисовываем карточки
getInitialCards()
  .then(initialCards => {
    console.log(initialCards)
    initialCards.forEach(place => {
      const card = createCard(place, removePlace, likePlace, handleImageClick);
      cardsContainer.append(card); 
    });
  });

// Отрисовываем данные профиля
getProfileInfo()
  .then(res => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    avatar.style.backgroundImage = `url('${res.avatar}')`;
  });

// Форма редактирования профиля
const formProfileElement = document.forms['edit-profile'];
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  updateProfileInfo({name: nameInput.value, about: jobInput.value})
    .then(() => editPopup.querySelector('.popup__button').textContent = 'Сохранение...');
  getProfileInfo().then(() => editPopup.querySelector('.popup__button').textContent = 'Сохранить');
  closeModal(editPopup);
}

formProfileElement.addEventListener('submit', handleProfileFormSubmit);

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  clearValidation(editPopup, validationConfig);
  openModal(editPopup)
});

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
  clearValidation(addPopup, validationConfig);
  openModal(addPopup);
});

//Форма изменения аватара
const updateAvatarForm = document.forms['edit-avatar'];
updateAvatarForm.addEventListener('submit', handleAvatarSubmit);

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  updateAvatar({ avatar: updateAvatarForm.elements.link.value })
    .then(() => {
      getProfileInfo()
        .then(res => {
          avatar.style.backgroundImage = `url('${res.avatar}')`;
          closeModal(avatarPopup);
        })
    })
}

//Форма добавления карточки
const addCardForm = document.forms['new-place'];

addCardForm.addEventListener('submit', handleCardSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();
  addNewPlace({ name: addCardForm.elements['place-name'].value, link: addCardForm.elements.link.value })
    .then(card => {
      addPopup.querySelector('.popup__button').textContent = 'Создание...';
      const newCard = createCard(card, removePlace, likePlace, handleImageClick);
      cardsContainer.prepend(newCard);
      closeModal(addPopup);
      addCardForm.elements['place-name'].value = '';
      addCardForm.elements.link.value = '';
    })
    .then(() => addPopup.querySelector('.popup__button').textContent = 'Создать');
}

function handleImageClick (card) {
  imagePopup.querySelector('.popup__caption').textContent = card.name;
  imagePopup.querySelector('.popup__image').src = card.link;
  imagePopup.querySelector('.popup__image').alt = card.name;
  openModal(imagePopup);
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

enableValidation(validationConfig);

