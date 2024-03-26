// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export function likePlace(heart) {
  heart.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
export function removePlace(card) {
  card.remove();
}

// @todo: Функция создания карточки
export function createCard(card, removePlace, likePlace, imageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // наполняем содержимым
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  
  // вешаем обработчик события на кнопку удаления
  const deleteButton = cardElement.querySelector('.card__delete-button');
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