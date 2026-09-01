/* =====================================
   CIVICAI MAIN JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    checkLoginStatus();

    setupLoginForm();

    setupSignupForm();

    setupComplaintForm();

    autoFillUserDetails();

    setupLanguage();

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

});


/* =====================================
   LOGIN STATUS
===================================== */

function checkLoginStatus() {

    const loggedIn =
        localStorage.getItem("civicLoggedIn");

    const userName =
        localStorage.getItem("civicUserName");

    const guestActions =
        document.getElementById("guestActions");

    const userActions =
        document.getElementById("userActions");

    const navUserName =
        document.getElementById("navUserName");


    if (loggedIn === "true") {

        if (guestActions) {
            guestActions.style.display = "none";
        }

        if (userActions) {
            userActions.style.display = "flex";
        }

        if (navUserName) {
            navUserName.textContent =
                userName || "User";
        }

    } else {

        if (guestActions) {
            guestActions.style.display = "flex";
        }

        if (userActions) {
            userActions.style.display = "none";
        }

    }

}


/* =====================================
   SIGNUP
===================================== */

function setupSignupForm() {

    const signupForm =
        document.getElementById("signupForm");

    if (!signupForm) return;


    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim().toLowerCase();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("signupMessage");


        if (password.length < 6) {

            message.textContent =
                "Password must contain at least 6 characters.";

            message.style.color = "#ff7070";

            return;

        }


        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            message.style.color = "#ff7070";

            return;

        }


        /* Check Existing Account */

        const existingEmail =
            localStorage.getItem("registeredEmail");


        if (existingEmail === email) {

            message.textContent =
                "Account already exists. Please login.";

            message.style.color = "#ff7070";

            return;

        }


        /* Save Account */

        localStorage.setItem(
            "registeredName",
            name
        );

        localStorage.setItem(
            "registeredEmail",
            email
        );

        localStorage.setItem(
            "registeredPassword",
            password
        );


        message.textContent =
            "Account created successfully! Redirecting to login...";

        message.style.color = "#2ec27e";


        setTimeout(function () {

            window.location.href =
                "login.html";

        }, 1200);

    });

}


/* =====================================
   LOGIN
===================================== */

function setupLoginForm() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) return;


    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim().toLowerCase();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        const registeredEmail =
            localStorage.getItem("registeredEmail");

        const registeredPassword =
            localStorage.getItem("registeredPassword");

        const registeredName =
            localStorage.getItem("registeredName");


        /* No Account */

        if (!registeredEmail) {

            message.textContent =
                "No account found. Please create an account first.";

            message.style.color = "#ff7070";

            return;

        }


        /* Wrong Email */

        if (email !== registeredEmail) {

            message.textContent =
                "Email address not found.";

            message.style.color = "#ff7070";

            return;

        }


        /* Wrong Password */

        if (password !== registeredPassword) {

            message.textContent =
                "Incorrect password.";

            message.style.color = "#ff7070";

            return;

        }


        /* Successful Login */

        localStorage.setItem(
            "civicLoggedIn",
            "true"
        );

        localStorage.setItem(
            "civicUserName",
            registeredName
        );

        localStorage.setItem(
            "civicUserEmail",
            registeredEmail
        );


        message.textContent =
            "Login successful! Redirecting to CivicAI...";

        message.style.color = "#2ec27e";


        setTimeout(function () {

            window.location.href =
                "index.html";

        }, 800);

    });

}


/* =====================================
   LOGOUT
===================================== */

function logoutUser() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");


    if (!confirmLogout) return;


    localStorage.removeItem(
        "civicLoggedIn"
    );

    localStorage.removeItem(
        "civicUserName"
    );

    localStorage.removeItem(
        "civicUserEmail"
    );


    window.location.href =
        "index.html";

}


/* =====================================
   COMPLAINT BUTTON
===================================== */

function handleComplaintButton() {

    const loggedIn =
        localStorage.getItem("civicLoggedIn");


    if (loggedIn !== "true") {

        const loginModal =
            document.getElementById(
                "loginRequiredModal"
            );

        if (loginModal) {

            loginModal.classList.add("active");

            document.body.style.overflow = "hidden";

        }

        return;

    }


    openComplaintForm();

}


/* =====================================
   OPEN COMPLAINT FORM
===================================== */

function openComplaintForm() {

    const modal =
        document.getElementById("complaintModal");


    if (modal) {

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

        autoFillUserDetails();

    }

}


/* =====================================
   CLOSE COMPLAINT FORM
===================================== */

function closeComplaintForm() {

    const modal =
        document.getElementById("complaintModal");


    if (modal) {

        modal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

}


/* =====================================
   CLOSE LOGIN REQUIRED MODAL
===================================== */

function closeLoginRequired() {

    const modal =
        document.getElementById(
            "loginRequiredModal"
        );


    if (modal) {

        modal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

}


/* =====================================
   AUTO FILL USER DETAILS
===================================== */

function autoFillUserDetails() {

    const loggedIn =
        localStorage.getItem("civicLoggedIn");


    if (loggedIn === "true") {

        const name =
            localStorage.getItem("civicUserName");

        const email =
            localStorage.getItem("civicUserEmail");


        const fullName =
            document.getElementById("fullName");

        const emailInput =
            document.getElementById("email");


        if (fullName && name) {
            fullName.value = name;
        }


        if (emailInput && email) {
            emailInput.value = email;
        }

    }

}


/* =====================================
   COMPLAINT FORM
===================================== */

function setupComplaintForm() {

    const complaintForm =
        document.getElementById("complaintForm");

    if (!complaintForm) return;


    complaintForm.addEventListener(
        "submit",
        analyzeComplaint
    );

}


function analyzeComplaint(event) {

    event.preventDefault();


    const category =
        document.getElementById("category").value;

    const urgency =
        document.getElementById("urgency").value;

    const complaintText =
        document.getElementById("complaintText").value;


    if (!category) {

        alert("Please select a category.");

        return;

    }


    if (complaintText.trim().length < 10) {

        alert(
            "Please describe your complaint in more detail."
        );

        return;

    }


    const button =
        document.querySelector(".analyze-btn");


    if (button) {

        button.innerHTML =
            "AI is analyzing...";

        button.disabled = true;

    }


    setTimeout(function () {

        let department;


        switch (category) {

            case "Water Supply":

                department =
                    "Water Supply Department";

                break;


            case "Roads & Infrastructure":

                department =
                    "Public Works Department";

                break;


            case "Waste Management":

                department =
                    "Waste Management Department";

                break;


            case "Electricity":

                department =
                    "Electricity Department";

                break;


            case "Drainage & Sanitation":

                department =
                    "Sanitation Department";

                break;


            case "Public Health":

                department =
                    "Public Health Department";

                break;


            default:

                department =
                    "Municipal Administration";

        }


        let priority =
            urgency;


        const text =
            complaintText.toLowerCase();


        if (
            text.includes("emergency") ||
            text.includes("danger") ||
            text.includes("accident") ||
            text.includes("fire")
        ) {

            priority = "Critical";

        }


        document.getElementById(
            "resultCategory"
        ).textContent = category;


        document.getElementById(
            "resultPriority"
        ).textContent = priority;


        document.getElementById(
            "resultDepartment"
        ).textContent = department;


        document.getElementById(
            "aiResult"
        ).classList.add("show");


        if (button) {

            button.innerHTML =
                "AI Analysis Complete ✓";

            button.disabled = false;

        }


        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    }, 1200);

}


/* =====================================
   SUBMIT COMPLAINT
===================================== */

function submitComplaint() {

    const loggedIn =
        localStorage.getItem("civicLoggedIn");


    if (loggedIn !== "true") {

        closeComplaintForm();

        document.getElementById(
            "loginRequiredModal"
        ).classList.add("active");

        return;

    }


    const complaintId =
        "CIVIC-" +
        Math.floor(
            100000 + Math.random() * 900000
        );


    const complaintData = {

        id: complaintId,

        name:
            document.getElementById("fullName").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        location:
            document.getElementById("location").value,

        category:
            document.getElementById("category").value,

        complaint:
            document.getElementById("complaintText").value,

        status: "Submitted",

        date:
            new Date().toLocaleString()

    };


    localStorage.setItem(

        "latestComplaint",

        JSON.stringify(complaintData)

    );


    alert(

        "Complaint Submitted Successfully! 🎉\n\n" +

        "Complaint ID: " +

        complaintId +

        "\n\nYour complaint has been sent for processing."

    );


    document.getElementById(
        "complaintForm"
    ).reset();


    document.getElementById(
        "aiResult"
    ).classList.remove("show");


    closeComplaintForm();

}


/* =====================================
   LANGUAGE
===================================== */

function setupLanguage() {

    const languageSelect =
        document.getElementById(
            "languageSelect"
        );


    if (!languageSelect) return;


    const savedLanguage =
        localStorage.getItem(
            "civicLanguage"
        );


    if (savedLanguage) {

        languageSelect.value =
            savedLanguage;

    }


    languageSelect.addEventListener(
        "change",
        function () {

            localStorage.setItem(
                "civicLanguage",
                this.value
            );

        }
    );

}


/* =====================================
   CLOSE MODALS
===================================== */

window.addEventListener(
    "click",
    function (event) {

        const complaintModal =
            document.getElementById(
                "complaintModal"
            );

        const loginModal =
            document.getElementById(
                "loginRequiredModal"
            );


        if (
            event.target === complaintModal
        ) {

            closeComplaintForm();

        }


        if (
            event.target === loginModal
        ) {

            closeLoginRequired();

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeComplaintForm();

            closeLoginRequired();

        }

    }
);