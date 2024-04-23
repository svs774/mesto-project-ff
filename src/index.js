import "./pages/index.css";
import { initialCards } from "./cards";
import { addCard, deleteCard, toggleLikeActive } from "./components/card";
import { openPopup, closePopup } from "./components/modal";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const openProfileBtn = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const buttonOpenEditProfileForm = document.querySelector(".popup__button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const openProfileAddBtn = document.querySelector(".profile__add-button");
const placeName = document.querySelector(".popup__input_type_card-name");
const link = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");
const cardImage = document.querySelector(".card__image");
const closeButtons = document.querySelectorAll(".popup__close");
const cardForm = document.querySelector("#new-place");

openProfileBtn.addEventListener("click", function () {
  openPopup(popupProfile);
});

openProfileAddBtn.addEventListener("click", function () {
  openPopup(popupNewCard);
});

// @todo: Вывести карточки на страницу

initialCards.forEach(function (data) {
  const card = addCard(data, { deleteCard, toggleLikeActive, openImagePopup });
  placesList.appendChild(card);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Функция обработчик события для формы редактирования профиля

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;
}

formElement.addEventListener("submit", submitEditProfileForm);
buttonOpenEditProfileForm.addEventListener("click", function () {
  closePopup(popupProfile);
});

// Функция добавления карточки с помощью формы

popupNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeName.value,
    link: link.value,
  };
  const newCard = addCard(newCardData, {
    deleteCard,
    toggleLikeActive,
    openImagePopup,
  });

  placesList.prepend(newCard);

  cardForm.reset();

  closePopup(popupNewCard);
});

// Функция открытия изображения
export function openImagePopup(name, image) {
  popupCaption.textContent = name;
  popupImage.src = image;
  popupImage.alt = name;
  openPopup(popupTypeImage);
}

// Функция плавного открытия и закрытия popup
document.querySelectorAll(".popup").forEach((item) => {
  item.classList.add("popup_is-animated");
});

// Закрытие всех popup

closeButtons.forEach((item) => {
  const closestPopup = item.closest(".popup");
  item.addEventListener("click", () => closePopup(closestPopup));
});
