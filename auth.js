/* =========================================
   CIVICAI AUTHENTICATION JAVASCRIPT
========================================= */


/* PASSWORD SHOW / HIDE */

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (!input) return;

    if (input.type === "password") {

        input.type = "text";

        button.innerHTML =
            '<i data-lucide="eye-off"></i>';

    } else {

        input.type = "password";

        button.innerHTML =
            '<i data-lucide="eye"></i>';
    }

    lucide.createIcons();
}


/* =========================================
   SIGNUP
========================================= */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim().toLowerCase();

        const phone =
            document.getElementById("signupPhone").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const terms =
            document.getElementById("terms").checked;

        const message =
            document.getElementById("signupMessage");


        /* VALIDATION */

        if (!name || !email || !phone || !password || !confirmPassword) {

            showMessage(
                message,
                "Please fill all required fields.",
                "error"
            );

            return;
        }


        if (password.length < 6) {

            showMessage(
                message,
                "Password must be at least 6 characters.",
                "error"
            );

            return;
        }


        if (password !== confirmPassword) {

            showMessage(
                message,
                "Passwords do not match.",
                "error"
            );

            return;
        }


        if (!terms) {

            showMessage(
                message,
                "Please accept the Terms and Privacy Policy.",
                "error"
            );

            return;
        }


        /* CHECK EXISTING USER */

        const existingUser =
            JSON.parse(localStorage.getItem("civicAIUser"));


        if (
            existingUser &&
            existingUser.email === email
        ) {

            showMessage(
                message,
                "An account with this email already exists.",
                "error"
            );

            return;
        }


        /* SAVE USER */

        const user = {

            name: name,
            email: email,
            phone: phone,
            password: password

        };


        localStorage.setItem(
            "civicAIUser",
            JSON.stringify(user)
        );


        showMessage(
            message,
            "Account created successfully! Redirecting to login...",
            "success"
        );


        signupForm.reset();


        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });

}


/* =========================================
   LOGIN
========================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim().toLowerCase();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        const user =
            JSON.parse(localStorage.getItem("civicAIUser"));


        if (!user) {

            showMessage(
                message,
                "No account found. Please create an account first.",
                "error"
            );

            return;
        }


        if (
            user.email === email &&
            user.password === password
        ) {

            localStorage.setItem(
                "civicAILoggedIn",
                "true"
            );


            localStorage.setItem(
                "civicAIActiveUser",
                user.name
            );


            showMessage(
                message,
                "Login successful! Welcome to CivicAI.",
                "success"
            );


            setTimeout(function () {

                window.location.href = "index.html";

            }, 1200);


        } else {

            showMessage(
                message,
                "Invalid email or password.",
                "error"
            );

        }

    });

}


/* =========================================
   FORGOT PASSWORD
========================================= */

function forgotPassword() {

    const user =
        JSON.parse(localStorage.getItem("civicAIUser"));


    if (!user) {

        alert(
            "No registered account found. Please create an account first."
        );

        return;
    }


    alert(
        "Demo Prototype: Password reset functionality requires backend/email integration."
    );

}


/* =========================================
   SHOW MESSAGE
========================================= */

function showMessage(element, text, type) {

    if (!element) return;

    element.textContent = text;

    element.className =
        "message " + type;

}