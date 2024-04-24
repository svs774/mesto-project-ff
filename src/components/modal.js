// Функция открытия и закрытия popup

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("click", closePopupOut);
  document.addEventListener("keydown", closePopupByEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("click", closePopupOut);
  document.removeEventListener("keydown", closePopupByEsc);
}

// Функция для закрытия модального окна по клику вне его
export function closePopupOut(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}

// Функция для закрытия модальных окон по нажатию на кнопку Esc
function closePopupByEsc(evt) {
  const popups = document.querySelector(".popup.popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(popups);
  }
}
