(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/cohort-magistr-2",headers:{authorization:"2e44d00a-c81e-4708-9c82-da3ddf58a6bb","Content-Type":"application/json"}};function t(e){return e.ok?e.json():(console.log("Есть проблема. Код ".concat(e.status,".")),Promise.reject("Ошибка: ".concat(e.status)))}function n(){return fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then((function(e){return t(e)}))}function r(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated"),document.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}var a=document.querySelector("#card-template").content;function u(n,r,o,c){var a;o?(a=n.id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(a),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){o=!1,r.classList.remove("card__like-button_is-active"),c.textContent=e.likes.length,r.addEventListener("click",(function(){return u(n,r,o,c)}))})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(n.id).then((function(e){o=!0,r.classList.add("card__like-button_is-active"),c.textContent=e.likes.length,r.addEventListener("click",(function(){return u(n,r,o,c)}))}))}function i(n){var r;(r=n.id,fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(){return n.remove()}))}function l(e,t,n,r){var o=a.querySelector(".card").cloneNode(!0);o.id=e._id,o.querySelector(".card__image").src=e.link,o.querySelector(".card__image").alt=e.name,o.querySelector(".card__title").textContent=e.name,o.querySelector(".card__like-number").textContent=e.likes.length;var c=o.querySelector(".card__delete-button");"9fbeb9cdff7316ad6494308d"!==e.owner._id&&(c.style.visibility="hidden"),c.addEventListener("click",(function(){return t(o)}));var u=o.querySelector(".card__like-button"),i=o.querySelector(".card__like-number");u.addEventListener("click",(function(){return n(o,u,l,i)}));var l=e.likes.find((function(e){return"9fbeb9cdff7316ad6494308d"===e._id}));return l&&u.classList.toggle("card__like-button_is-active"),o.querySelector(".card__image").addEventListener("click",(function(){r(e)})),o}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""};function p(e,t){var n;(n=e.querySelectorAll(t.inputSelector),function(e){if(Array.isArray(e))return s(e)}(n)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).forEach((function(n){return d(e,n,t)}))}var f=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),_=document.querySelector(".profile__image");document.querySelector(".profile__image-container").addEventListener("click",(function(){return r(S)}));var v=document.querySelectorAll(".popup");v.forEach((function(e){return e.addEventListener("click",(function(t){return function(e,t){e.target.classList.contains("popup_is-opened")&&o(t)}(t,e)}))})),v.forEach((function(e){return e.querySelector(".popup__close").addEventListener("click",(function(){return o(e)}))}));var y=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_avatar"),b=document.querySelector(".popup_type_image"),q=document.querySelector(".places__list");fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then((function(e){return t(e)})).then((function(e){console.log(e),e.forEach((function(e){var t=l(e,i,u,x);q.append(t)}))})),n().then((function(e){f.textContent=e.name,m.textContent=e.about,_.style.backgroundImage="url('".concat(e.avatar,"')")}));var E=document.forms["edit-profile"],k=E.querySelector(".popup__input_type_name"),g=E.querySelector(".popup__input_type_description");E.addEventListener("submit",(function(t){var r;t.preventDefault(),document.querySelector(".profile__title").textContent=k.value,document.querySelector(".profile__description").textContent=g.value,(r={name:k.value,about:g.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)})).then((function(){return y.querySelector(".popup__button").textContent="Сохранение..."})),n().then((function(){return y.querySelector(".popup__button").textContent="Сохранить"})),o(y)})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){k.value=document.querySelector(".profile__title").textContent,g.value=document.querySelector(".profile__description").textContent,p(y,A),r(y)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){p(h,A),r(h)}));var C=document.forms["edit-avatar"];C.addEventListener("submit",(function(r){var c;r.preventDefault(),(c={avatar:C.elements.link.value},fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(c)}).then((function(e){return t(e)})).catch((function(e){return console.log(e)}))).then((function(){n().then((function(e){_.style.backgroundImage="url('".concat(e.avatar,"')"),o(S)}))}))}));var L=document.forms["new-place"];function x(e){b.querySelector(".popup__caption").textContent=e.name,b.querySelector(".popup__image").src=e.link,b.querySelector(".popup__image").alt=e.name,r(b)}L.addEventListener("submit",(function(n){var r;n.preventDefault(),(r={name:L.elements["place-name"].value,link:L.elements.link.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(r)}).then((function(e){return t(e)}))).then((function(e){h.querySelector(".popup__button").textContent="Создание...";var t=l(e,i,u,x);q.prepend(t),o(h),L.elements["place-name"].value="",L.elements.link.value=""})).then((function(){return h.querySelector(".popup__button").textContent="Создать"}))}));var A={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}(n,r,t)}))}))}(t,e)}))}(A)})();