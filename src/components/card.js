import { openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Функция создания карточки
export function addCard(data, { deleteCard, toggleLikeActive }) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteBtn = card.querySelector(".card__delete-button");
  const cardLikeBtn = card.querySelector(".card__like-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  deleteBtn.addEventListener("click", function (evt) {
    deleteCard(evt);
  });
  cardLikeBtn.addEventListener("click", toggleLikeActive);

  cardImage.addEventListener("click", function () {
    OpenImagePopup(data.name, data.link);
  });

  return card;
}

// @todo: Функция удаления карточки

export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

// Функция открытия изображения
export function OpenImagePopup(name, image) {
  popupCaption.textContent = name;
  popupImage.src = image;
  openPopup(popupTypeImage);
}

// Обработчик лайка
export function toggleLikeActive(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
