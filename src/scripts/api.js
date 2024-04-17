export const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '2e44d00a-c81e-4708-9c82-da3ddf58a6bb',
    'Content-Type': 'application/json'
  }
};

function request(url, options) {
  return fetch(url, options).then(checkStatus)
}

function checkStatus(res) {
  if (!res.ok) {
    console.log(`Есть проблема. Код ${res.status}.`);
    return Promise.reject(`Ошибка: ${res.status}`);
  } else {
    return res.json();
  }
}

// Получаем карточки
export function getInitialCards() {
  return request(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
}

// Получаем данные профиля
export function getProfileInfo() {
  return request(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
}

// Изменяем информацию в профиле
export function updateProfileInfo(profileObject) {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(profileObject)
  })
}

// Добавляем новое место
export function addNewPlace(placeObject) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(placeObject) 
  })
}

export function deleteCard(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export function updateAvatar(link) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(link)
  })
}

export function likeCard(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
}

export function removeLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}