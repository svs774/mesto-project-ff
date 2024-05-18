import { validationConfig } from "../index";


  // Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {

  if (inputElement.validity.patternMismatch) {
    
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
   
    hideInputError(formElement, inputElement);
  }
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement,) => {
  
  if (hasInvalidInput(inputList)) {
  
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
   
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};


function hasInvalidInput(inputList) {
  
  return inputList.some((inputElement) => {
   
    return !inputElement.validity.valid;
  });
}

export function clearValidation(profileForm, validationConfig) {
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );

  inputList.forEach((inputElement) => {
    hideInputError(profileForm, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig,);
}

