import './index.css';
import { initialCards } from '../scripts/cards.js';
import {createCard, likeCard, deleteCard} from "../scripts/card.js";
import {openPopup, closePopup} from "../scripts/modal.js";


const placeList = document.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_image')
const imageName = popupImage.querySelector('.popup__image');
const imageCaption = popupImage.querySelector('.popup__caption');

const profileForm = document.querySelector('[name = "edit-profile"]');
const inputProfileName = profileForm.querySelector('[name = "name"]');
const inputProfileDesc = profileForm.querySelector('[name = "description"]');
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

const userCardFormElement = document.querySelector('[name ="new-place"]');
const inputPlaceTitle = userCardFormElement.querySelector('[name = "place-name"]');
const inputPlaceLink = userCardFormElement.querySelector('[name = "link"]');



function renderCards(cards) {
    cards.forEach((card) => {
        const cardElement = createCard(card, {
            deleteCard, 
            likeCard, 
            handleImageClick});
        placeList.appendChild(cardElement);
    })
}

function setPopupListener() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popupElement) => {
        popupElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup_is-opened')) {
                closePopup(popupElement)
            }
        })
        const closeButton = popupElement.querySelector('.popup__close');
        if (closeButton) {
            closeButton.addEventListener('click', () => closePopup(popupElement))
        }
    })
}

function setProfileSettings(popup) {
    function handleFormProfileSubmit(evt) {
        evt.preventDefault();
        profileDesc.textContent = inputProfileDesc.value;
        profileName.textContent = inputProfileName.value;
        closePopup(popup)
    }
    profileForm.addEventListener('submit',handleFormProfileSubmit); 
}


function openProfilePopup() {
    inputProfileName.value = profileName.textContent;
    inputProfileDesc.value = profileDesc.textContent;
    openPopup(profilePopup);
}

function openCardPopup() {
    openPopup(newCardPopup);
}

function setCardFormHandler() {
    function handleFormEditSubmit(evt) {
        evt.preventDefault();
        const newCard = {
            name: inputPlaceTitle.value,
            link: inputPlaceLink.value
        };
        const cardElement = createCard(newCard, {
            deleteCard, 
            likeCard, 
            handleImageClick});
        placeList.prepend(cardElement);
        closePopup(newCardPopup); 
        userCardFormElement.reset();
    }
    userCardFormElement.addEventListener('submit', handleFormEditSubmit);
}

function handleImageClick(data){
    imageName.src = data.link;
    imageName.alt = data.name;
    imageCaption.textContent = data.name;
    openPopup(popupImage);
}

renderCards(initialCards);
setPopupListener();
setProfileSettings(profilePopup);
setCardFormHandler();

profileButton.addEventListener('click', openProfilePopup);
newCardButton.addEventListener('click', openCardPopup);