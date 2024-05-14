(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{q:()=>V});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-13",headers:{authorization:"5462a409-0983-43df-b0cb-befc1739c614","Content-Type":"application/json"}};function n(e){e.classList.add("popup_is-opened"),document.addEventListener("click",r),document.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("click",r),document.removeEventListener("keydown",c),document.querySelectorAll(".popup__form").forEach((function(e){e.reset()}))}function r(e){e.target.classList.contains("popup")&&o(e.target)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}var a=document.querySelector("#card-template").content,u=document.querySelector(".popup__input_type_card-name"),i=document.querySelector(".popup__input_type_url"),l=document.querySelector("#new-place"),s=document.querySelector(".places__list"),p=document.querySelector(".popup_type_new-card");function d(e,n,o){var r=o.deleteCard,c=o.toggleLikeActive,u=o.openImagePopup,i=a.cloneNode(!0),l=i.querySelector(".card__image"),s=i.querySelector(".card__title"),p=i.querySelector(".card__delete-button"),d=i.querySelector(".card__like-button"),f=i.querySelector(".card__like-counter");return f.textContent=e.likes.length,f.setAttribute("id",e._id),n!==e.owner._id?p.remove():p.addEventListener("click",(function(n){var o;(o=e._id,fetch("".concat(t.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){console.log(e._id),r(n)})).catch(console.error)})),s.textContent=e.name,l.src=e.link,l.alt=e.name,d.addEventListener("click",(function(t){c(t,e)})),l.addEventListener("click",(function(){u(e.name,e.link)})),i}function f(e){e.target.closest(".places__item").remove()}function _(e,n){var o,r=document.getElementById("".concat(n._id)),c=e.target;c.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n._id).then((function(e){c.classList.remove("card__like-button_is-active"),r.textContent=e.likes.length})).catch(console.error):(o=n._id,fetch("".concat(t.baseUrl,"/cards/likes/").concat(o),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){c.classList.add("card__like-button_is-active"),r.textContent=e.likes.length})).catch(console.error)}var m="popup__submit_inactive",y="popup__input_type_error",v="popup__error_visible",h=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(y),n.classList.remove(v),n.textContent=""},S=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(m)):(t.disabled=!0,t.classList.add(m))};function b(e,t){var n=e.querySelector(t.submitButtonSelector),o=Array.from(e.querySelectorAll(t.inputSelector));o.forEach((function(t){h(e,t)})),S(o,n)}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var E={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},C=document.querySelector(".places__list"),k=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup_type_edit"),L=document.querySelector("#edit-profile"),x=document.querySelector(".popup__input_type_name"),j=document.querySelector(".popup__input_type_description"),A=document.querySelector(".profile__title"),P=document.querySelector(".profile__description"),w=document.querySelector(".popup_type_new-card"),O=document.querySelector(".profile__add-button"),U=document.querySelector(".popup__image"),T=document.querySelector(".popup__caption"),I=document.querySelector(".popup_type_image"),D=document.querySelectorAll(".popup__close"),B=document.querySelector(".profile__image"),N=document.querySelector(".profile__change-avatar-btn"),J=document.querySelector(".popup_change_avatar"),z=document.querySelector(".popup__input_avatar_type_url"),H=document.querySelector("#new-avatar"),M=null;function V(e,t){T.textContent=e,U.src=t,U.alt=e,n(I)}k.addEventListener("click",(function(){x.value=A.textContent,j.value=P.textContent,b(g.querySelector(E.formSelector),E),n(g)})),O.addEventListener("click",(function(){b(w.querySelector(E.formSelector),E),n(w)})),N.addEventListener("click",(function(){b(J.querySelector(E.formSelector),E),n(J)})),L.addEventListener("submit",(function(e){e.preventDefault();var n=x.value,r=j.value;A.textContent=n,P.textContent=r;var c=document.querySelectorAll(".popup__button"),a=c[0].textContent;c.forEach((function(e){e.textContent="Сохранение..."})),function(e,n){return fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:e,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n,r).then((function(e){var t=e.name,n=e.about;x.textContent=t,j.textContent=n})).catch(console.error),c.forEach((function(e){e.textContent=a})),o(g)})),w.addEventListener("submit",(function(e,n){e.preventDefault();var r,c,a=document.querySelectorAll(".popup__button"),m=a[0].textContent;a.forEach((function(e){e.textContent="Сохранение..."})),(r=u.value,c=i.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:r,link:c})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t=d(e,n,{deleteCard:f,toggleLikeActive:_,openImagePopup:V}).catch(console.error);s.prepend(t)})),a.forEach((function(e){e.textContent=m})),l.reset(),o(p)})),J.addEventListener("submit",(function(e){e.preventDefault();var n,r=document.querySelectorAll(".popup__button"),c=r[0].textContent;r.forEach((function(e){e.textContent="Сохранение..."})),(n=z.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t=e.avatar;B.src=t})).catch(console.error),r.forEach((function(e){e.textContent=c})),H.reset(),o(J)})),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")})),D.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){o(t)}))})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){!function(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");S(t,n),t.forEach((function(o){o.addEventListener("input",(function(){(function(e,t){/^[а-яёa-z -]*$/i.test(t.value)||"text"!==t.type?t.setCustomValidity(""):t.setCustomValidity(t.dataset.error),t.validity.valid?h(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(y),o.textContent=n,o.classList.add(v)}(e,t,t.validationMessage)})(e,o),S(t,n)}))}))}(e)})),Promise.all([fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1],a=c.name,u=c.about,i=c.avatar;M=c._id,A.textContent=a,P.textContent=u,B.src=i,r.forEach((function(e){var t=d(e,M,{deleteCard:f,toggleLikeActive:_,openImagePopup:V});C.appendChild(t)}))})).catch(console.error)})();