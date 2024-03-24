// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function addCard(data, { deleteCard }) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteBtn = card.querySelector(".card__delete-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  deleteBtn.addEventListener("click", function (evt) {
    deleteCard(evt);
  });

  return card;
}

function deleteCard(evt) {
    evt.target.closest(".places__item").remove();
}

initialCards.forEach(function (data) {
  const card = addCard(data, { deleteCard});
  placesList.appendChild(card);
});
