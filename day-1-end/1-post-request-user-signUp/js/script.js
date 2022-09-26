import '../style.css'

const contactForm = document.querySelector("#contact-form");

const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

const confirmPassword = document.querySelector("#confirm_password");
const confirmPasswordErrorNotMatching = document.querySelector("#confirmPasswordErrorNotMatching");
const confirmPasswordError = document.querySelector("#confirmPasswordError");


const emailErrorNotValid = document.querySelector("#emailErrorNotValid");
const emailError = document.querySelector("#emailError");
const email = document.querySelector("#email");


contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isFirstName = false;
    let isEmail = false;
    let isValidEmail = false;
    let isPassword = false;
    let isConfirmPassword = false;
    let isValidPasswordMatch = false
    if (firstName.value.trim().length > 0) {
        firstNameError.classList.add("hidden");
        isFirstName = true;
    } else {
        firstNameError.classList.remove("hidden");
    }


    if (email.value.trim().length && validateEmail(email.value) === true) {
        emailErrorNotValid.classList.add("hidden");
        isValidEmail = true;
    } else if (email.value.trim().length && validateEmail(email.value) !== true) {
        emailErrorNotValid.classList.remove("hidden");
    }
    console.log("isValid email: ", isValidEmail)

    if (email.value.trim().length > 0) {
        emailError.classList.add("hidden");
        isEmail = true;
    } else {
        emailError.classList.remove("hidden");
    }

    if (password.value.trim().length > 3) {
        passwordError.classList.add("hidden");
        isPassword = true;
    } else {
        passwordError.classList.remove("hidden");
    }

    if (confirmPassword.value.trim().length > 3) {
        confirmPasswordError.classList.add("hidden");
        isConfirmPassword = true;
    } else {
        confirmPasswordError.classList.remove("hidden");
    }

    isValidPasswordMatch = validatePassword();

    if (
        isFirstName &&
        isValidEmail &&
        isPassword &&
        isConfirmPassword &&
        isValidPasswordMatch
    ) {
        let isFirstName = false;
        let isEmail = false;
        let isValidEmail = false;
        let isPassword = false;
        let isConfirmPassword = false;
        let isValidPasswordMatch = false

        console.log("isFirstName: ", isFirstName)
        console.log("isEmail: ", isEmail)
        console.log("isValidEmail: ", isValidEmail)
        console.log("isPassword: ", isPassword)
        console.log("isConfirmPassword:", isConfirmPassword)
        console.log("isValidPasswordMatch: ", isValidPasswordMatch)

        console.log("Validation SUCCEEDED!!  🥳");
        // POST REQ :: Create User

        // User Object

        const userData = {
            "name": firstName.value,         // Required
            "email": email.value,           // Required
            "password": password.value,    // Required
        }
        console.log("userData: ", userData);

        // Post Req Create User
        const REGISTER_USER_URL = "https://nf-api.onrender.com/api/v1/social/auth/register";
        // const signUpUser = async () => {
        (async function signUpUser() {
            try {
                const response = await fetch(REGISTER_USER_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                console.log(data);
                console.log("POST REQUEST SUCCEEDED!!  🥳 🤗🤗");

            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                console.log(error);
                console.log("POST REQUEST FAILED!!  😥😥");
            }
        })();
    } else {
        console.log("isFirstName: ", isFirstName)
        console.log("isEmail: ", isEmail)
        console.log("isValidEmail: ", isValidEmail)
        console.log("isPassword: ", isPassword)
        console.log("isConfirmPassword:", isConfirmPassword)
        console.log("isValidPasswordMatch: ", isValidPasswordMatch)

        console.log("Validation FAILED!! 💩");
    }
})

function validateEmail(email) {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    if (email.match(regEx)) {
        return true;
    } else {
        return false
    }
}

function validatePassword() {
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;
    console.log(passwordValue)
    if (!passwordValue) {
        return false;
    }
    if (!confirmPasswordValue) {
        return false;
    }
    if (passwordValue !== confirmPasswordValue) {
        confirmPasswordErrorNotMatching.classList.remove("hidden");
        return false;
    } else {
        confirmPasswordErrorNotMatching.classList.add("hidden");
        return true;
    }
}
