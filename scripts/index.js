// @todo: Темплейт карточки
function templateCard(element) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    deleteButton.addEventListener('click', () => removeCard(cardElement));
    console.log(cardElement);
    return cardElement;

}

// @todo: DOM узлы
const placeList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cards) {
    cards.forEach((card) => {
        const cardElement = templateCard(card,  removeCard);
        placeList.appendChild(cardElement);
    })
}
// @todo: Функция удаления карточки
function removeCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
addCard(initialCards)
