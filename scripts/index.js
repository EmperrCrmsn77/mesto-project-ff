// @todo: Темплейт карточки
function addCard(element) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    deleteButton.addEventListener('click', () => removeCard(cardElement));
    return cardElement;

}

// @todo: DOM узлы
const placeList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function renderCard(cards) {
    cards.forEach((card) => {
        const cardElement = addCard(card,  removeCard);
        placeList.appendChild(cardElement);
    })
}
// @todo: Функция удаления карточки
function removeCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
renderCard(initialCards)
