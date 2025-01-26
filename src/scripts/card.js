import { placeList, newCardPopup } from "../pages";
import {openPopup, closePopup} from "./modal";

export function addCard(element, likeCard, imageCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    deleteButton.addEventListener('click', () => removeCard(cardElement));

    cardTemplate.addEventListener('click', () => likeCard(cardLikeButton))
    cardImage.addEventListener('click', () => popupImage(element));
    return cardElement;

}
const imagePopup = document.querySelector('.popup_type_image')
const imageCard = document.querySelector('.card__image')
const cardLikeButton = document.querySelectorAll('.card__like-button')
cardLikeButton.forEach((button) => {
    button.addEventListener('click', likeCard);
});

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
}

export function removeCard(cardElement) {
    cardElement.remove();
}

export function popupImage(data){
    openPopup(imagePopup);
    const imageName = imagePopup.querySelector('.popup__image');
    const imageCaption = imagePopup.querySelector('.popup__caption');
    imageName.src = data.link;
    imageName.alt = data.name;
    imageCaption.textContent = data.name;

}

export function addUserCard() {
    const formElement = document.querySelector('[name ="new-place"]');
    const inputTitle = formElement.querySelector('[name = "place-name"]');
    const inputLink = formElement.querySelector('[name = "link"]');

    function handleFormEditSubmit(evt) {
        evt.preventDefault();
        const newCard = {
            name: inputTitle.value,
            link: inputLink.value
        };
        const cardElement = addCard(newCard);
        placeList.prepend(cardElement);
        closePopup(newCardPopup); 
        formElement.reset();
    }
    formElement.addEventListener('submit', handleFormEditSubmit);
}