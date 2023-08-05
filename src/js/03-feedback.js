import throttle from 'lodash.throttle';

const STORAGE = document.querySelector('.feedback-form-state');

const formList = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

formList.form.addEventListener('submit', onFormSubmit);
formList.form.addEventListener('input', throttle(onFormInput, 500));

let dataForm = {};

function onFormInput(evt) {
    const { name, value } = evt.target;
    dataForm[name] = value;
    localStorage.setItem(STORAGE, JSON.stringify(dataForm))
};

function onFormSubmit(evt) {
    evt.preventDefault();
    if (formList.input.value.trim() === '' || formList.textarea.value.trim() === '') {
     return alert('Заповни поле');
    }
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE);
    console.log(dataForm);
    dataForm = {};
};
refillFields(); 
function refillFields() {
    const savedData = JSON.parse(localStorage.getItem(STORAGE));

    if (savedData) {
        const { email, message } = savedData;
        if (email) {
            formList.input.value = email;
            dataForm.email = email;
        };
        if (message) {
            formList.textarea.value = message;
            dataForm.message = message
        };
    };
}
