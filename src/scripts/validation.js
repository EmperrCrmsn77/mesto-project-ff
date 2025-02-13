

export function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach((form) => {
        setEventListeners(form, settings);
    });
}

function setEventListeners(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputs, button, settings);

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            hasInvalidInput(input, settings);
            toggleButtonState(inputs, button, settings);
        });
    });
}

function hasInvalidInput(input, settings) {
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    const errorMessage = input.dataset.errorMessage; 
    const errorElement = document.querySelector(`#${input.name}-error`);
    
    if(input.type === 'url') {
        if(!input.validity.valid) {
            showInputError(input, errorElement, 'Введите ссылку', settings);
        } else {
            hideInputError(input, errorElement, settings);
        }
        return
    }

    if (!input.validity.valid) {
        showInputError(input, errorElement, input.validationMessage, settings);
    } else if(!regex.test(input.value)) {
        showInputError(input, errorElement, errorMessage, settings);
    } else {
        hideInputError(input, errorElement, settings);
    }
}   

function showInputError(input, errorElement, message, settings) {
    input.classList.add(settings.inputErrorClass);
    errorElement.textContent = message;
    errorElement.classList.add(settings.errorClass);
}

function hideInputError(input, errorElement, settings) {
    input.classList.remove(settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
}


function toggleButtonState(inputs, button, settings) {
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    const isFormInvalid = inputs.some(input => !input.validity.valid || input.value.trim() === "" || !regex.test(input.value));
    if (isFormInvalid) {
        button.classList.add(settings.inactiveButtonClass);
        button.setAttribute("disabled", "");
    } else {
        button.classList.remove(settings.inactiveButtonClass);
        button.removeAttribute("disabled");
    }
}

export function clearValidation(form, settings) {
    const errorElements = form.querySelectorAll(settings.errorClass);
    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
    })
}
