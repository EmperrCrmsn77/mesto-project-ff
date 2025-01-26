import './index.css';
import { initialCards } from '../scripts/cards.js';
import {addCard, likeCard, removeCard} from "../scripts/card.js";
import {handlePopupClick} from "../scripts/modal.js";


export const placeList = document.querySelector('.places__list');
export const newCardPopup = document.querySelector('.popup_type_new-card');
export const profilePopup = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');


function renderCards(cards) {
    cards.forEach((card) => {
        const cardElement = addCard(card,  removeCard);
        placeList.appendChild(cardElement);
    })
}


renderCards(initialCards)


profileButton.addEventListener('click', handlePopupClick);
newCardButton.addEventListener('click', handlePopupClick);


