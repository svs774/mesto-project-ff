import { addNewCard, deleteCardFromServer, putLike, deleteLike } from "./api";
import { openImagePopup } from "../index";
import { closePopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const placeName = document.querySelector(".popup__input_type_card-name");
const linkCard = document.querySelector(".popup__input_type_url");
const cardForm = document.querySelector("#new-place");
const placesList = document.querySelector(".places__list");
const popupNewCard = document.querySelector(".popup_type_new-card");

// Функция создания карточки

export function addCard(
  data,
  userId,
  { deleteCard, toggleLikeActive, openImagePopup }
) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteBtn = card.querySelector(".card__delete-button");
  const cardLikeBtn = card.querySelector(".card__like-button");
  const likeCountElement = card.querySelector(".card__like-counter");

  likeCountElement.textContent = data.likes.length;

  likeCountElement.setAttribute("id", data._id);

  if (userId !== data.owner._id) {
    deleteBtn.remove();
  } else {
    deleteBtn.addEventListener("click", function (evt) {
      deleteCardFromServer(data._id)
        .then(() => {
          console.log(data._id);
          deleteCard(evt);
        })
        .catch(console.error);
    });
  }

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardLikeBtn.addEventListener("click", function (evt) {
    toggleLikeActive(evt, data);
  });

  cardImage.addEventListener("click", function () {
    openImagePopup(data.name, data.link);
  });

  return card;
}

// : Функция удаления карточки

export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

// Функция постановки и снятия лайка

export function toggleLikeActive(evt, data) {
  const likeCountElement = document.getElementById(`${data._id}`);
  const likeBtn = evt.target;

  if (!likeBtn.classList.contains("card__like-button_is-active")) {
    putLike(data._id)
      .then((res) => {
        likeBtn.classList.add("card__like-button_is-active");
        likeCountElement.textContent = res.likes.length;
      })
      .catch(console.error);
  } else {
    deleteLike(data._id)
      .then((res) => {
        likeBtn.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = res.likes.length;
      })
      .catch(console.error);
  }
}

// Функция добавления карточки с помощью формы

export function submitNewCardForm(evt, userId) {
  evt.preventDefault();

  const popupBtn = document.querySelectorAll(".popup__button");
  const origTextBtn = popupBtn[0].textContent;
  popupBtn.forEach((popupBtn) => {
    popupBtn.textContent = "Сохранение...";
  });

  addNewCard(placeName.value, linkCard.value).then((res) => {
    const newCard = addCard(res, userId, {
      deleteCard,
      toggleLikeActive,
      openImagePopup,
    }).catch(console.error);

    placesList.prepend(newCard);
  });

  popupBtn.forEach((popupBtn) => {
    popupBtn.textContent = origTextBtn;
  });
  cardForm.reset();

  closePopup(popupNewCard);
}
