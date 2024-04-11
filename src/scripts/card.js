import { deleteCard, likeCard, removeLike } from "./api";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export function likePlace(cardElement, heartButton, isLiked, likesNumber) {
  if (isLiked) {
    removeLike(cardElement.id)
      .then(res => {
        isLiked = false;
        heartButton.classList.remove('card__like-button_is-active');
        likesNumber.textContent = res.likes.length;
        heartButton.addEventListener('click', () => likePlace(cardElement, heartButton, isLiked, likesNumber));
      })
    } else {
    likeCard(cardElement.id)
      .then(res => {
        isLiked = true;
        heartButton.classList.add('card__like-button_is-active');
        likesNumber.textContent = res.likes.length;
        heartButton.addEventListener('click', () => likePlace(cardElement, heartButton, isLiked, likesNumber));
      })
  }
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
  cardElement.querySelector('.card__like-number').textContent = card.likes.length;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  // Скрываем кнопку удаления
  if (card.owner._id !== '9fbeb9cdff7316ad6494308d') {
    deleteButton.style.visibility = 'hidden';
  }
  // вешаем обработчик события на кнопку удаления
  deleteButton.addEventListener('click', () => removePlace(cardElement));
  
  //Кнопка лайка
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesNumber = cardElement.querySelector('.card__like-number');
  likeButton.addEventListener('click', () => likePlace(cardElement, likeButton, isLiked, likesNumber));

  let isLiked = card.likes.find(item => item._id === '9fbeb9cdff7316ad6494308d');
  if (isLiked) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
  
  const image = cardElement.querySelector('.card__image');
  
  image.addEventListener('click', () => {
      imageClick(card);
    });
  
    // возвращаем карточку
    return cardElement;
  }