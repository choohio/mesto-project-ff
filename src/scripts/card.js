import { deleteCard, likeCard, removeLike } from "./api";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export function likePlace(evt, cardElement, likesNumber) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    removeLike(cardElement.id)
      .then((updatedCard) => {
        evt.target.classList.remove("card__like-button_is-active");
        likesNumber.textContent = updatedCard.likes.length;
        console.log(updatedCard.likes.length)
      })
      .catch(err => console.log(err));
    } else {
        likeCard(cardElement.id)
          .then((updatedCard) => {
            evt.target.classList.add("card__like-button_is-active");
            likesNumber.textContent = updatedCard.likes.length;
            console.log(updatedCard.likes.length)
          })
          .catch(err => console.log(err));
      }
};
    
// Функция удаления карточки
export function removePlace(card) {
  deleteCard(card.id)
    .then(() => card.remove())
    .catch(err => console.log(err));
}

// Функция создания карточки
export function createCard(card, userId, callbacks) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likesButton = cardElement.querySelector(".card__like-button");
  const likesNumber = cardElement.querySelector(".card__like-number");
  
  // наполняем содержимым
  cardElement.id = card._id;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likesNumber.textContent = card.likes.length;
  
  // Скрываем кнопку удаления
  if (card.owner._id !== userId) {
    deleteButton.style.visibility = 'hidden';
  }
  // вешаем обработчик события на кнопку удаления
  deleteButton.addEventListener('click', () => callbacks.removePlace(cardElement));
  
  //Кнопка лайка
  likesButton.addEventListener('click', evt => callbacks.likePlace(evt, cardElement, likesNumber));

  const isLiked = card.likes.find(item => item._id === userId);
  if (isLiked) {
    likesButton.classList.toggle('card__like-button_is-active');
  }
    
  cardImage.addEventListener('click', () => {
      callbacks.handleImageClick(card);
    });
  
    // возвращаем карточку
    return cardElement;
  }