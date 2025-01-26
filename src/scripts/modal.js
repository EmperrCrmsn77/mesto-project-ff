import { addUserCard } from "./card";
import {newCardPopup, profilePopup} from "../pages/index.js";

export function openPopup(popup) {
    popup.classList.add('popup_is-animated')
    setTimeout(() => {
        popup.classList.remove('popup_is-animated');
        popup.classList.add('popup_is-opened');
    }, 10)
    popupListener(popup);
}

export function popupListener(popup) {
    const popupCloseButton = popup.querySelector('.popup__close');
    
    popupCloseButton.addEventListener('click', () => closePopup(popup));
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            closePopup(popup);
        }
    })
    function keyHandler(event) {
        if (event.key === 'Escape') {
            closePopup(popup);
            document.removeEventListener('keydown', keyHandler);
        }
    };
    document.addEventListener('keydown', keyHandler);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened')
    popup.classList.add('popup_is-animated')
    // popupCloseButton.removeEventListener('click', () => closePopup(popup));
}

function profileSettings(popup) {
    const formElement = document.querySelector('[name = "edit-profile"]');
    const inputName = formElement.querySelector('[name = "name"]');
    const inputDesc = formElement.querySelector('[name = "description"]');
    const profileName = document.querySelector('.profile__title');
    const profileDesc = document.querySelector('.profile__description');

    inputName.value = profileName.textContent;
    inputDesc.value = profileDesc.textContent;
    //сохранение изменений
    function handleFormProfileSubmit(evt) {
        evt.preventDefault();
        profileDesc.textContent = inputDesc.value;
        profileName.textContent = inputName.value;
        closePopup(popup)
    }
    formElement.addEventListener('submit',handleFormProfileSubmit); 
}

export function handlePopupClick(event) {
    if (event.target.classList.contains('profile__edit-button')) {
        openPopup(profilePopup);
        profileSettings(profilePopup);
    } else if (event.target.classList.contains('profile__add-button')) {
        openPopup(newCardPopup);
        addUserCard();
    }
}

// export function addUserCard() {
//     console.log('функция AddUserCard вызвана');
//     const formElement = document.querySelector('[name ="new-place"]');
//     const inputTitle = formElement.querySelector('[name = "place-name"]');
//     const inputLink = formElement.querySelector('[name = "link"]');

//     function handleFormEditSubmit(evt) {
//         evt.preventDefault();
//         const newCard = {
//             name: inputTitle.value,
//             link: inputLink.value
//         };
//         console.log(newCard)
//         const cardElement = addCard(newCard);
//         placeList.prepend(cardElement);
//         closePopup(newCardPopup); 
//         formElement.reset();
//     }
//     formElement.addEventListener('submit', handleFormEditSubmit);
// }