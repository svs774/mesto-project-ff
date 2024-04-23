// Функция открытия и закрытия popup

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  const closePopupEsc = document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
    document.removeEventListener("keydown", closePopupEsc);
  });
  document.addEventListener("click", closePopupOut);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("click", closePopupOut);
}

// Функция для закрытия модального окна по клику вне его
export function closePopupOut(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}
