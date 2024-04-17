import './styles/index.css';
import { 
  getInitialCards, 
  getProfileInfo, 
  addNewPlace, 
  updateProfileInfo, 
  updateAvatar 
} from './scripts/api';
import { openModal, closeModal, closeByClickOnOverlay } from './scripts/modal';
import { createCard, likePlace, removePlace } from './scripts/card';
import { enableValidation, clearValidation } from './scripts/validation';
import { renderLoading, handleSubmit } from './scripts/utils';
import { validationConfig } from './utils/constants';

// Профиль
let userId = null;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');

document.querySelector('.profile__image-container').addEventListener('click', () => openModal(avatarPopup));

const cardsContainer = document.querySelector('.places__list');
const formProfileElement = document.forms['edit-profile'];
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar');
const imagePopup = document.querySelector('.popup_type_image');

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach(popup => {
  popup.addEventListener('click', evt => closeByClickOnOverlay(evt, popup));
  popup.querySelector('.popup__close').addEventListener('click', () => closeModal(popup));
})

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return updateProfileInfo({name: nameInput.value, about: jobInput.value}).then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editPopup)
    })
  }
  handleSubmit(makeRequest, evt);
}

formProfileElement.addEventListener('submit', evt => handleProfileFormSubmit(evt));

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editPopup, validationConfig);
  openModal(editPopup)
});

addButton.addEventListener('click', () => {
  clearValidation(addPopup, validationConfig);
  openModal(addPopup);
});

//Форма изменения аватара
const updateAvatarForm = document.forms['edit-avatar'];
updateAvatarForm.addEventListener('submit', handleAvatarSubmit);

function handleAvatarSubmit(evt) {
  function makeRequest() {
    return updateAvatar({ avatar: updateAvatarForm.elements.link.value })
      .then(data => {
        avatar.style.backgroundImage = `url('${data.avatar}')`;
        closeModal(avatarPopup);
      })
  }
  handleSubmit(makeRequest, evt);
}

//Форма добавления карточки
const addCardForm = document.forms['new-place'];

addCardForm.addEventListener('submit', handleCardSubmit);

function handleCardSubmit(evt) {
  function makeRequest() {
    return addNewPlace({ name: addCardForm.elements['place-name'].value, link: addCardForm.elements.link.value })
      .then(card => {
        renderCard(card, 'prepend');
        closeModal(addPopup);
      })
  }
  handleSubmit(makeRequest, evt, 'Создание...');
}

function handleImageClick (card) {
  imagePopup.querySelector('.popup__caption').textContent = card.name;
  imagePopup.querySelector('.popup__image').src = card.link;
  imagePopup.querySelector('.popup__image').alt = card.name;
  openModal(imagePopup);
};

const cardCallbacks = {
  removePlace,
  likePlace,
  handleImageClick
}

function renderCard (item, method = 'append') {
  const cardElement = createCard(item, userId, cardCallbacks);
  cardsContainer[method](cardElement);
}

function initialize() {
  Promise.all([getProfileInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      avatar.style.backgroundImage = `url(${userData.avatar})`;
      cards.forEach(card => {
        renderCard(card)
      });
    })
    .catch(err => {
      console.log(err);
    });
}

initialize();

enableValidation(validationConfig);

