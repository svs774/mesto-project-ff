import { deleteCardFromServer, putLike, deleteLike } from "./api";


// Функция создания карточки

export function addCard(
  data,
  userId,
  { deleteCard, toggleLikeActive, openImagePopup, }
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);
  const likeCountElement = card.querySelector(".card__like-counter");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteBtn = card.querySelector(".card__delete-button");
  const cardLikeBtn = card.querySelector(".card__like-button");

  likesСounter(data, likeCountElement, cardLikeBtn, userId);

  if (userId !== data.owner._id) {
    deleteBtn.remove();
  } else {
    deleteBtn.addEventListener("click", function (evt) {
      deleteCardFromServer(data._id)
        .then(() => {
          
          deleteCard(evt);
        })
        .catch(console.error);
    });
  }

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardLikeBtn.addEventListener("click", function (evt) {
    toggleLikeActive(evt, data, likeCountElement);
  });

  cardImage.addEventListener("click", function () {
    openImagePopup(data.name, data.link);
  });

  return card;
}

//  Функция удаления карточки

export function deleteCard(evt) {

  evt.target.closest(".places__item").remove();
}

// Функция счетчик лайков

 function likesСounter(data, count, btn , userId) {
  const userIds = data.likes.map((user) => {
    return user._id;
  });
  if (userIds.includes(userId)) {
    btn.classList.add("card__like-button_is-active");
  }
  count.textContent = data.likes.length;
}

// Функция постановки и снятия лайка

export function toggleLikeActive(evt, data, likeCountElement) {
  const likeBtn = evt.target;

  if (!likeBtn.classList.contains("card__like-button_is-active")) {
    putLike(data._id)
      .then((res) => {
        likeBtn.classList.add("card__like-button_is-active");
        likesСounter(res, likeCountElement, likeBtn);
      })
      .catch(console.error);
  } else {
    deleteLike(data._id)
      .then((res) => {
        likeBtn.classList.remove("card__like-button_is-active");
        likesСounter(res, likeCountElement, likeBtn);
      })
      .catch(console.error);
  }
}
