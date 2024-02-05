// @todo: Темплейт карточки

// @todo: DOM узлы
const listOfPlaces = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, removePlace) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {removePlace(deleteButton)}
  )

  // отображаем на странице
  listOfPlaces.append(cardElement); 
}

// @todo: Функция удаления карточки
function removePlace(removeButton) {
  const listItem = removeButton.closest('.places__item');
  listItem.remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach(card => createCard(card, removePlace));


