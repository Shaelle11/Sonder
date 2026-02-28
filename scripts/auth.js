(function () {
    // Email regex
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Full name validation: at least two words, letters only
    function isValidFullName(name) {
        return /^[a-zA-Z]+ [a-zA-Z]+( [a-zA-Z]+)*$/.test(name.trim());
    }

    function validateForm(fields, errors, isSignup = false) {
        let hasError = false;
        Object.values(errors).forEach(err => err.textContent = "");

        // Name field (signup only)
        if (isSignup && fields.name) {
            if (!fields.name.value.trim()) {
                errors.name.textContent = "Full name is required.";
                hasError = true;
            } else if (!isValidFullName(fields.name.value)) {
                errors.name.textContent = "Enter your full name (first and last).";
                hasError = true;
            }
        }

        // Email
        if (!fields.email.value.trim()) {
            errors.email.textContent = "Email is required.";
            hasError = true;
        } else if (!isValidEmail(fields.email.value)) {
            errors.email.textContent = "Please enter a valid email address.";
            hasError = true;
        }

        // Password
        if (!fields.password.value) {
            errors.password.textContent = "Password is required.";
            hasError = true;
        } else if (fields.password.value.length < 6) {
            errors.password.textContent = "Password must be at least 6 characters.";
            hasError = true;
        }

        return !hasError;
    }

    function handleSignup() {
        const form = document.getElementById("signupForm");
        if (!form) return;

        const fields = {
            name: document.getElementById("su-name"),
            email: document.getElementById("su-email"),
            password: document.getElementById("su-password")
        };

        const errors = {
            name: document.getElementById("su-name-error"),
            email: document.getElementById("su-email-error"),
            password: document.getElementById("su-password-error")
        };

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (validateForm(fields, errors, true)) {
                window.location.href = "../timeCapsule.html";
            }
        });
    }

    function handleSignin() {
        const form = document.getElementById("signinForm");
        if (!form) return;

        const fields = {
            email: document.getElementById("si-email"),
            password: document.getElementById("si-password")
        };

        const errors = {
            email: document.getElementById("si-email-error"),
            password: document.getElementById("si-password-error")
        };

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (validateForm(fields, errors, false)) {
                window.location.href = "../timeCapsule.html";
            }
        });
    }

    handleSignup();
    handleSignin();
})();