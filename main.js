(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/cohort-magistr-2",headers:{authorization:"2e44d00a-c81e-4708-9c82-da3ddf58a6bb","Content-Type":"application/json"}};function t(e,t){return fetch(e,t).then(n)}function n(e){return e.ok?e.json():(console.log("Есть проблема. Код ".concat(e.status,".")),Promise.reject("Ошибка: ".concat(e.status)))}function r(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),1),document.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}var a=document.querySelector("#card-template").content,i=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""};function u(e,t){e.disabled="disabled",e.classList.add(t.inactiveButtonClass)}var l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):u(t,n)};function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t),n.forEach((function(n){return i(e,n,t)}))}var d=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n};function f(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var r=t.submitter,o=r.textContent;d(!0,r,o,n),e().then((function(){t.target.reset()})).catch((function(e){return console.log(e)})).finally((function(){d(!1,r,o)}))}var p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v=null,_=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),h=document.querySelector(".profile__image"),b=document.querySelector(".places__list"),S=document.forms["edit-profile"],g=S.querySelector(".popup__input_type_name"),k=S.querySelector(".popup__input_type_description"),E=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__add-button"),C=document.querySelector(".popup_type_edit"),L=document.querySelector(".popup_type_new-card"),x=document.querySelector(".popup_type_avatar"),A=document.querySelector(".popup_type_image"),T=document.querySelector(".profile__image-container"),U=A.querySelector(".popup__caption"),P=A.querySelector(".popup__image");Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("click",(function(t){return function(e,t){e.target.classList.contains("popup_is-opened")&&o(t)}(t,e)})),e.querySelector(".popup__close").addEventListener("click",(function(){return o(e)}))})),S.addEventListener("submit",(function(n){return function(n){f((function(){return(n={name:g.value,about:k.value},t("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(n)})).then((function(e){_.textContent=e.name,y.textContent=e.about,o(C)}));var n}),n)}(n)})),E.addEventListener("click",(function(){g.value=_.textContent,k.value=y.textContent,s(C,p),r(C)})),q.addEventListener("click",(function(){s(L,p),r(L)}));var w=document.forms["edit-avatar"];w.addEventListener("submit",(function(n){f((function(){return(n={avatar:w.elements.link.value},t("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(n)})).then((function(e){h.style.backgroundImage="url('".concat(e.avatar,"')"),o(x)}));var n}),n)})),T.addEventListener("click",(function(){s(x,p),r(x)}));var j=document.forms["new-place"];j.addEventListener("submit",(function(n){f((function(){return(n={name:j.elements["place-name"].value,link:j.elements.link.value},t("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(n)})).then((function(e){I(e,"prepend"),o(L)}));var n}),n,"Создание...")}));var O={removePlace:function(n){var r;(r=n.id,t("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers})).then((function(){return n.remove()})).catch((function(e){return console.log(e)}))},likePlace:function(n,r,o){var c;n.target.classList.contains("card__like-button_is-active")?(c=r.id,t("".concat(e.baseUrl,"/cards/likes/").concat(c),{method:"DELETE",headers:e.headers})).then((function(e){n.target.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length,console.log(e.likes.length)})).catch((function(e){return console.log(e)})):function(n){return t("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers})}(r.id).then((function(e){n.target.classList.add("card__like-button_is-active"),o.textContent=e.likes.length,console.log(e.likes.length)})).catch((function(e){return console.log(e)}))},handleImageClick:function(e){U.textContent=e.name,P.src=e.link,P.alt=e.name,r(A)}};function I(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"append",n=function(e,t,n){var r=a.querySelector(".card").cloneNode(!0),o=r.querySelector(".card__image"),c=r.querySelector(".card__title"),i=r.querySelector(".card__delete-button"),u=r.querySelector(".card__like-button"),l=r.querySelector(".card__like-number");return r.id=e._id,o.src=e.link,o.alt=e.name,c.textContent=e.name,l.textContent=e.likes.length,e.owner._id!==t&&(i.style.visibility="hidden"),i.addEventListener("click",(function(){return n.removePlace(r)})),u.addEventListener("click",(function(e){return n.likePlace(e,r,l)})),e.likes.find((function(e){return e._id===t}))&&u.classList.toggle("card__like-button_is-active"),o.addEventListener("click",(function(){n.handleImageClick(e)})),r}(e,v,O);b[t](n)}Promise.all([t("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}),t("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers})]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];v=o._id,_.textContent=o.name,y.textContent=o.about,h.style.backgroundImage="url(".concat(o.avatar,")"),c.forEach((function(e){I(e)}))})).catch((function(e){console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);e.addEventListener("reset",(function(){u(r,t)})),l(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))}))}(t,e)}))}(p)})();