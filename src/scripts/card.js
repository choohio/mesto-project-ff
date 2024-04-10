import { deleteCard } from "./api";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export function likePlace(heart) {
  heart.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
export function removePlace(card) {
  deleteCard(card.id)
    .then(() => card.remove());
}

// Функция создания карточки
export function createCard(card, removePlace, likePlace, imageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // наполняем содержимым
  cardElement.id = card._id;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  
  // вешаем обработчик события на кнопку удаления
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (card.owner._id !== '9fbeb9cdff7316ad6494308d') {
    deleteButton.style.visibility = 'hidden';
  }
  deleteButton.addEventListener('click', () => removePlace(cardElement));
  
  //Кнопка лайка
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likePlace(likeButton));
  
  const image = cardElement.querySelector('.card__image');
  
  image.addEventListener('click', () => {
      imageClick(card);
    });
  
    // возвращаем карточку
    return cardElement;
  }