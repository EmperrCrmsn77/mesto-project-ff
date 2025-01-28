
export function createCard(element, { deleteCard, likeCard, handleImageClick }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button')

    cardImage.src = element.link;
    cardImage.alt = element.name;
    
    cardElement.querySelector('.card__title').textContent = element.name;
    cardLikeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    cardImage.addEventListener('click',() =>handleImageClick(element));
    return cardElement;
}

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(cardElement) {
    cardElement.remove();
}