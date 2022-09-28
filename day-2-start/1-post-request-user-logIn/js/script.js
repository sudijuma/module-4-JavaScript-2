import '../style.css'
import { LOGIN_USER_URL_ENDPOINT } from './settings/api';
import { saveToken, saveUser } from './utils/storage';
import createHeader from "./components/createHeader";

const logInForm = document.querySelector("#login-form");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailErrorNotValid = document.querySelector("#emailErrorNotValid");


const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

const generalErrorMessage = document.querySelector("#general-error-message");

createHeader();
if(logInForm){
    logInForm.addEventListener("submit", function (event) {
        event.preventDefault();
    
        let isEmail = false;
        if (email.value.trim().length > 0) {
            emailError.classList.add("hidden");
            isEmail = true;
        } else {
            emailError.classList.remove("hidden");
        }
    
        let isValidEmail = false;
        if (email.value.trim().length && validateEmail(email.value) === true) {
            emailErrorNotValid.classList.add("hidden");
            isValidEmail = true;
        } else if (email.value.trim().length && validateEmail(email.value) !== true) {
            emailErrorNotValid.classList.remove("hidden");
        }
    
        let isPassword = false;
    
        if (password.value.trim().length >= 8) {
            passwordError.classList.add("hidden");
            isPassword = true;
        } else {
            passwordError.classList.remove("hidden");
        }
    
        let isFormValid = isEmail && isValidEmail && isPassword;
    
        if (isFormValid) {
            console.log("Validation SUCCEEDED!!  🥳");
            const userData = {
                "email": email.value,
                "password": password.value
            }
            console.log(userData);
            // API Call
            console.log(LOGIN_USER_URL_ENDPOINT);
            (async function loginUser() {
                const response = await fetch(LOGIN_USER_URL_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                console.log("response", response);
    
                //TODO handle error from api call
    
                if (response.ok) {
                    console.log("Post request SUCCEEDED!! 🥳")
                    const data = await response.json();
                    console.log("Success data", data);
                    console.log(data.accessToken);
                    saveToken(data.accessToken)
                    const userToSave = {
                        name: data.name,
                        email: data.email
                    }
                    saveUser(userToSave);
                    location.href = "/welcome.html";
                } else {
                    console.log("Validation FAILED!! 💩");
                    const err = await response.json();
                    console.log(err);
                    throw new Error(err.message);
                }
            })().catch(error => {
                console.log(error);
                generalErrorMessage.innerHTML = "Error: " + error.message
            });
        } else {
            console.log("Validation FAILED!! 💩");
        }
    });
    
}

function validateEmail(email) {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    return email.match(regEx) ? true : false;
}
