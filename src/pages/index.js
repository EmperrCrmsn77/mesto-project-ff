import './index.css';
import { setLike, removeLike, updateAvatar, getUserData, 
        getUsersCards, updateUserData, addNewCard, 
        removeCardFromServer } from '../scripts/api.js';
import {createCard, likeCard, deleteCard} from "../scripts/card.js";
import {openPopup, closePopup, closeByOvelayClick} from "../scripts/modal.js";
import { enableValidation, clearValidation } from '../scripts/validation.js';
import {setButtonsState} from '../scripts/utils.js'


const placeList = document.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_edit');
const avatarPopup = document.querySelector('.popup_type_avatar')
const profileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__image-button')
const popupImage = document.querySelector('.popup_type_image')
const popups = document.querySelectorAll('.popup');
const imageName = popupImage.querySelector('.popup__image');
const imageCaption = popupImage.querySelector('.popup__caption');

const profileForm = document.querySelector('[name = "edit-profile"]');
const inputProfileName = profileForm.querySelector('[name = "name"]');
const inputProfileDesc = profileForm.querySelector('[name = "description"]');
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image')

const userCardFormElement = document.querySelector('[name ="new-place"]');
const inputPlaceTitle = userCardFormElement.querySelector('[name = "place-name"]');
const inputPlaceLink = userCardFormElement.querySelector('[name = "link"]');

const avatarForm = document.querySelector('.popup_type_avatar');
const inputAvatar = avatarForm.querySelector('[name = "avatar"]')
const popupButtons = document.querySelectorAll('.popup__button');

function renderCards(cards, userId) {
    cards.forEach((card) => {
        const cardElement = createCard(card, userId,{
            deleteCard: (cardElement, cardId) => deleteCard(cardElement, cardId, removeCardFromServer), 
            likeCard,
            handleImageClick,
            setLike,
            removeLike
            });
        placeList.appendChild(cardElement);
    })
}

function setProfileSettings(popup) {
    function handleFormProfileSubmit(evt) {
        evt.preventDefault();
        profileName.textContent = inputProfileName.value;
        profileDesc.textContent = inputProfileDesc.value;
        updateUserData(inputProfileName.value, inputProfileDesc.value)

        closePopup(popup)
    }
    profileForm.addEventListener('submit',handleFormProfileSubmit); 
}


function openProfilePopup() {
    inputProfileName.value = profileName.textContent;
    inputProfileDesc.value = profileDesc.textContent;
    openPopup(profilePopup);
    resetButtonText()
}

function openCardPopup() {
    openPopup(newCardPopup);

    resetButtonText()
}

function openAvatarPopup() {
    openPopup(avatarPopup);
    clearValidation(avatarPopup,{errorClass: 'popup__error_visible'})
    resetButtonText()
}

function setCardFormHandler(userId) {
    function handleFormEditSubmit(evt) {
        evt.preventDefault();
        setButtonsState(popupButtons, true);

        const name = inputPlaceTitle.value;
        const link = inputPlaceLink.value;

        addNewCard(name, link)
            .then(res => {
                const cardElement = createCard(res, userId, {  
                    deleteCard: (cardElement, cardId) => deleteCard(cardElement, cardId, removeCardFromServer), 
                    likeCard,
                    setLike,
                    removeLike, 
                    handleImageClick
                });
                placeList.prepend(cardElement);
                closePopup(newCardPopup); 
                clearValidation(newCardPopup, {errorClass: 'popup__error_visible'})
                userCardFormElement.reset();
            })
            .catch(err => console.error("Ошибка при создании карточки:", err));  
    }

    userCardFormElement.addEventListener('submit', handleFormEditSubmit);
}

function changeAvatar(evt) {
    evt.preventDefault();
    const newAvatarUrl = inputAvatar.value;
    setButtonsState(popupButtons, true);
    updateAvatar(newAvatarUrl)
        .then(data => {
            profileImage.style.backgroundImage = `url(${data.avatar})`;
            closePopup(avatarForm.closest(".popup"));
            avatarForm.reset()
        })
        .catch(err => console.log(err))

}

function handleImageClick(data){
    imageName.src = data.link;
    imageName.alt = data.name;
    imageCaption.textContent = data.name;
    openPopup(popupImage);
}

function handleSaveProfile(evt) {
    evt.preventDefault();  
    
    setButtonsState(popupButtons, true);

    const formData = new FormData(profileForm);
    const profileData = {
        name: formData.get('name'),
        about: formData.get('about')
    };

}


function resetButtonText() {
    popupButtons.forEach(button => {
    button.textContent = 'Сохранить'; 
    })
}

popups.forEach((popupElement) => { 
    popupElement.addEventListener('click', closeByOvelayClick); 
    
    const closeButton = popupElement.querySelector('.popup__close'); 
    if (closeButton) { 
        closeButton.addEventListener('click', () => closePopup(popupElement)); 
    } 
});

setProfileSettings(profilePopup);
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

profileButton.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', handleSaveProfile);
newCardButton.addEventListener('click', openCardPopup);
avatarButton.addEventListener('click', openAvatarPopup);
avatarForm.addEventListener('submit', changeAvatar);



// ------------------------------------------------API---------------------

Promise.all([getUserData(), getUsersCards()])
    .then(([userData, cards]) => {
        profileName.textContent = userData.name;
        profileDesc.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;

        renderCards(cards, userData._id);
        setCardFormHandler(userData._id);

    })
    .catch(error => {
        console.error(error); 
    });

