import "./pages/index.css";
import {
  addCard,
  deleteCard,
  toggleLikeActive,
  submitNewCardForm,
} from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getCards,
  getUzerData,
  patchEditProfile,
  changeAvatarUzer,
} from "./components/api";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const openProfileBtn = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const formEditProfile = document.querySelector("#edit-profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupNewCard = document.querySelector(".popup_type_new-card");
const openProfileAddBtn = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");
const closeButtons = document.querySelectorAll(".popup__close");
const avatarElement = document.querySelector(".profile__image");
const openChangeAvatarBtn = document.querySelector(
  ".profile__change-avatar-btn"
);
const popupChangeAvatar = document.querySelector(".popup_change_avatar");
const linkAvatar = document.querySelector(".popup__input_avatar_type_url");
const formAvatar = document.querySelector("#new-avatar");

let userId = null;

openProfileBtn.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  const form = popupProfile.querySelector(validationConfig.formSelector);
  clearValidation(form, validationConfig);
  openPopup(popupProfile);
});

openProfileAddBtn.addEventListener("click", function () {
  const form = popupNewCard.querySelector(validationConfig.formSelector);
  clearValidation(form, validationConfig);
  openPopup(popupNewCard);
});

openChangeAvatarBtn.addEventListener("click", function () {
  const form = popupChangeAvatar.querySelector(validationConfig.formSelector);
  clearValidation(form, validationConfig);
  openPopup(popupChangeAvatar);
});

// Функция обработчик события для формы редактирования профиля

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  const popupBtn = document.querySelectorAll(".popup__button");
  const origTextBtn = popupBtn[0].textContent;
  popupBtn.forEach((popupBtn) => {
    popupBtn.textContent = "Сохранение...";
  });

  patchEditProfile(name, job)
    .then((res) => {
      const name = res.name;
      const about = res.about;

      nameInput.textContent = name;
      jobInput.textContent = about;
    })
    .catch(console.error);

  popupBtn.forEach((popupBtn) => {
    popupBtn.textContent = origTextBtn;
  });

  closePopup(popupProfile);
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

popupNewCard.addEventListener("submit", submitNewCardForm);

popupChangeAvatar.addEventListener("submit", submitChangeAvatarForm);

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
  item.addEventListener("click", () => {
    closePopup(closestPopup);
  });
});

// Вызовем функцию

enableValidation();

Promise.all([getCards(), getUzerData()])
  .then(([cards, user]) => {
    const name = user.name;
    const about = user.about;
    const avatar = user.avatar;
    userId = user._id;

    profileTitle.textContent = name;
    profileDescription.textContent = about;
    avatarElement.src = avatar;

    cards.forEach(function (data) {
      const card = addCard(data, userId, {
        deleteCard,
        toggleLikeActive,
        openImagePopup,
      });

      placesList.appendChild(card);
    });
  })
  .catch(console.error);

// Функция для изменения аватара пользователя

function submitChangeAvatarForm(evt) {
  evt.preventDefault();

  const popupBtn = document.querySelectorAll(".popup__button");
  const origTextBtn = popupBtn[0].textContent;
  popupBtn.forEach((popupBtn) => {
    popupBtn.textContent = "Сохранение...";
  });

  changeAvatarUzer(linkAvatar.value)
    .then((res) => {
      const link = res.avatar;
      avatarElement.src = link;
    })
    .catch(console.error);

  popupBtn.forEach((popupBtn) => {
    popupBtn.textContent = origTextBtn;
  });

  formAvatar.reset();

  closePopup(popupChangeAvatar);
}
