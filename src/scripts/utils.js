export function setButtonsState(popupButtons, isSaving) {
    popupButtons.forEach(button => {
        if (isSaving) {
            button.textContent = 'Сохранение...';
            button.disabled = true;  
        } else {
            button.textContent = 'Сохранить';
            button.disabled = false;  
        }
    });
}
