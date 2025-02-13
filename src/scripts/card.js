
export function createCard(element, userId,{ deleteCard, likeCard, handleImageClick, setLike, removeLike }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button')
    const likeCount = cardElement.querySelector('.card__like-counter')

    cardImage.src = element.link;
    cardImage.alt = element.name; 
    element.likes = element.likes || [];
    likeCount.textContent = element.likes.length;
    if (element.likes.some(like => like._id === userId)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }
    cardElement.querySelector('.card__title').textContent = element.name;
    cardImage.addEventListener('click',() =>handleImageClick(element));
    cardLikeButton.addEventListener('click',() => likeCard(element._id, cardLikeButton, likeCount,setLike, removeLike));
    if(element.owner._id !== userId) {
        deleteButton.style.display = 'none'
    } else {
        deleteButton.addEventListener('click', () => deleteCard(cardElement, element._id))
    }
    return cardElement;
}

export function likeCard(cardId, cardLikeButton, likeCount, setLike, removeLike) {
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
    if (isLiked) {
        removeLike(cardId)
            .then(updatedCard => {
                cardLikeButton.classList.remove('card__like-button_is-active');
                likeCount.textContent = updatedCard.likes.length;
            })
            .catch(err => console.error('Ошибка при снятии лайка:', err));
    } else {
        setLike(cardId)
            .then(updatedCard => {
                cardLikeButton.classList.add('card__like-button_is-active');
                likeCount.textContent = updatedCard.likes.length;
            })
            .catch(err => console.error('Ошибка при установке лайка:', err));
    }
}

export function deleteCard(cardElement, cardId, removeCardFromServer) {
    removeCardFromServer(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(err => console.error(err));
}