

let text = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("message");
let infoMessage = document.getElementById('informationMessage');
let errorMessage = document.getElementById('messageError');
let nameError = document.getElementById('nameError');
let emailError = document.getElementById('emailError');
let submit = document.getElementById('form-submit');
let form_errors = [];
let form = document.getElementById('form');


function updateCharacterCount() {
  let maxCharacters = 400;
  let warningThreshold = 30; // Adjust this threshold as needed
  let errorThreshold = 10; // Adjust this threshold as needed
  let remainingCharacters = maxCharacters - message.value.length;
  infoMessage.textContent = `Characters remaining: ${remainingCharacters}`;

  // Adjust styling based on character count
  if (remainingCharacters <= errorThreshold) {
    infoMessage.style.color = 'red';
    message.style.borderColor = 'red';
  } else if (remainingCharacters <= warningThreshold) {
    infoMessage.style.color = 'orange';
    message.style.borderColor = 'orange';
  } else {
    // Reset styles if within acceptable range
    infoMessage.style.color = '';
    message.style.borderColor = '';
  }
}
function pushError(field, message) {
  let errorObject = {
    field: field,
    errorMessage: message
  };

  
  form_errors.push(errorObject);
}

function handleBeforeInput(event, inputElement, errorMessageElement, regex) {
  let ALLOWED_CHARS_REGEXP = regex;

  if (!ALLOWED_CHARS_REGEXP.test(event.data)) {
    pushError(inputElement.id, `Error: ${event.data} is an invalid character`)

    errorMessageElement.style.color = 'red';
    errorMessageElement.style.opacity = '1';
    errorMessageElement.textContent = `Error: ${event.data} is an invalid character`;
    errorMessageElement.style.display = 'block';

    // Store original color for later use
    let origColor = inputElement.style.color;
    inputElement.style.backgroundColor = 'red';

    event.preventDefault();

    errorMessageElement.classList.remove("error-ms");
    void errorMessageElement.offsetWidth;
    errorMessageElement.classList.add("error-ms");

    setTimeout(function() {
      // Restore original color after a delay
      inputElement.style.backgroundColor = origColor;
    }, 300);
  } else {
    errorMessageElement.style.color = '';
    inputElement.style.backgroundColor = '';
    errorMessageElement.textContent = '';
  }
}

function submitFormErrorsToServer() {
  // Convert the form_errors array to a JSON-encoded string
  let formErrorsJSON = JSON.stringify(form_errors);

  // Add a hidden input field to the form with the name "form-errors"
  let formErrorsInput = document.createElement('input');
  formErrorsInput.type = 'hidden';
  formErrorsInput.name = 'form-errors';
  formErrorsInput.value = formErrorsJSON;

  // Append the hidden input field to the form
  document.getElementById('form').appendChild(formErrorsInput);

  // Reset the form_errors array for the next submission
  form_errors = [];
}



let most_characters = /^[a-zA-Z0-9!@#$&()-`.+,/\"]*$/; //fix 
let letters = /[a-zA-Z\s]+/;

text.addEventListener("oninput", (event) => {
  if (text.checkValidity() == false) {
    text.setCustomValidity("Please input a valid email.");
    pushError(text, "Invalid email");
  } else {
    text.setCustomValidity('');
  }

});

email.addEventListener("oninput", (event) => {
  if (email.checkValidity() == false) {
    email.setCustomValidity("Please input a valid email.");
    pushError(text, "Invalid email");
  } else {
    email.setCustomValidity('');
  }

});

message.addEventListener("oninput", (event) => {
  if (message.checkValidity() == false) {
    message.setCustomValidity("Please input a valid email.");
    pushError(text, "Invalid email");
  } else {
    message.setCustomValidity('');
  }

});

message.addEventListener("beforeinput", (event) => {
  handleBeforeInput(event, message, errorMessage, most_characters);
});

email.addEventListener("beforeinput", (event) => {
  handleBeforeInput(event, email, emailError, most_characters);
});

text.addEventListener("beforeinput", (event) => {
  handleBeforeInput(event, text, nameError, letters);
});

submit.addEventListener("click", (event) => {
  submitFormErrorsToServer()
  

});

