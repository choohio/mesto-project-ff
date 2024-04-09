import './styles/index.css';
import { getInitialCards, config } from './scripts/api';
import { openModal, closeModal, closeByClickOnOverlay } from './scripts/modal';
import { createCard, likePlace, removePlace } from './scripts/card';
import { enableValidation } from './scripts/validation';

getProfileInfo();

let initialCards = [];

getInitialCards().then(initialCards => {
  initialCards.forEach(item => {
    const card = createCard(item, removePlace, likePlace, handleImageClick);
    cardsContainer.append(card); 
});
});






function changeInfo (profileInformation) {
  fetch('https://nomoreparties.co/v1/cohort-magistr-2/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '2e44d00a-c81e-4708-9c82-da3ddf58a6bb',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: profileInformation.name,
    about: profileInformation.about
  })
  
})
.then(i => i.json())
.then(res => console.log(res)).then(() => getProfileInfo());
}

// Фетчим данные профиля
function getProfileInfo() {
  fetch('https://nomoreparties.co/v1/cohort-magistr-2/users/me', {
  method: 'GET',
  headers: {
    authorization: '2e44d00a-c81e-4708-9c82-da3ddf58a6bb'
  }
})
.then(res => {
  if (res.status !== 200) {
    console.log(`Есть проблема. Код ${res.status}.`);
    return;
  } else {
    return res.json();
  }
} 
)
.then(res => {
  profileName.textContent = res.name;
  profileDescription.textContent = res.about;
  avatar.style.backgroundImage = `url('${res.avatar}')`;
  console.log(res.avatar);
});
}

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');


const popups = document.querySelectorAll('.popup');
popups.forEach(popup => popup.addEventListener('click', evt => closeByClickOnOverlay(evt, popup)));
popups.forEach(popup => popup.querySelector('.popup__close').addEventListener('click', () => closeModal(popup)));

// Попап редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');

// Попап добавления карточки
const addPopup = document.querySelector('.popup_type_new-card');

// Попап с картинкой
const imagePopup = document.querySelector('.popup_type_image');

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// Форма редактирования профиля
const formProfileElement = document.forms['edit-profile'];
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  changeInfo({name: nameInput.value, about: jobInput.value});
  getProfileInfo();
  closeModal(editPopup);
}

formProfileElement.addEventListener('submit', handleProfileFormSubmit);

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(editPopup)
});

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => openModal(addPopup));

//Форма добавления карточки

const addCardForm = document.forms['new-place'];

addCardForm.addEventListener('submit', handleCardSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();

  fetch('https://nomoreparties.co/v1/cohort-magistr-2/cards', {
    method: 'POST',
    headers: {
      authorization: '2e44d00a-c81e-4708-9c82-da3ddf58a6bb',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        name: addCardForm.elements['place-name'].value,
        link: addCardForm.elements.link.value
      }
    ) 
  })
  .then(res => res.json())
  .then(card => {
    const newCard = createCard(card, removePlace, likePlace, handleImageClick);
    cardsContainer.prepend(newCard);
    closeModal(addPopup);
    addCardForm.elements['place-name'].value = '';
    addCardForm.elements.link.value = '';
  })

}

function handleImageClick (card) {
  imagePopup.querySelector('.popup__caption').textContent = card.name;
  imagePopup.querySelector('.popup__image').src = card.link;
  imagePopup.querySelector('.popup__image').alt = card.name;
  openModal(imagePopup);
}



enableValidation();