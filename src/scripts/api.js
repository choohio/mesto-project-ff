export const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '2e44d00a-c81e-4708-9c82-da3ddf58a6bb',
    'Content-Type': 'application/json'
  }
};

function checkStatus(res) {
  if (res.status !== 200) {
    console.log(`Есть проблема. Код ${res.status}.`);
    return;
  } else {
    return res.json();
  }
}

// Получаем карточки
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => checkStatus(res));
}

// Получаем данные профиля
export function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => checkStatus(res));
}

// Изменяем информацию в профиле
export function updateProfileInfo(profileObject) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(profileObject)
  })
}

// Добавляем новое место
export function addNewPlace(placeObject) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(placeObject) 
  })
    .then(res => checkStatus(res));
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => checkStatus(res));
}