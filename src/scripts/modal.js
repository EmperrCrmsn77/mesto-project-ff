
export function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
        popup.classList.remove('popup_is-animated');
        popup.classList.add('popup_is-opened');
    }, 10);
    document.addEventListener('keydown', handleEscape); 

}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened')
    popup.classList.add('popup_is-animated')
    document.removeEventListener('keydown', handleEscape); 
}

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}
