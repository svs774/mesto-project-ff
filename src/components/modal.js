const closeButtons = document.querySelectorAll(".popup__close");

// Функция открытия и закрытия popup

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

// Закрытие всех popup

closeButtons.forEach((item) => {
  const closestPopup = item.closest(".popup");
  item.addEventListener("click", () => closePopup(closestPopup));
});

// Функция для закрытия модального окна по клику вне его
export function closePopupOut(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}

// Функция для закрытия модальных окон по нажатию на кнопку Esc
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const popups = document.querySelectorAll(".popup.popup_is-opened");
    popups.forEach(function (popup) {
      popup.classList.remove("popup_is-opened");
    });
  }
});

// Функция плавного открытия и закрытия popup
document.querySelectorAll(".popup").forEach((item) => {
  item.classList.add("popup_is-animated");
});
