document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signin-form");
    const popup = document.getElementById("signin-popup");
    const popupMessage = document.getElementById("signin-popup-message");
    const closeBtn = document.getElementById("signin-close-popup");

    // Inject CSS styles for shake animation and error messages
    const style = document.createElement("style");
    style.textContent = `
        .shake {
            animation: shake 0.15s ease-in-out 5;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        .error-message {
            color: red;
            font-size: 0.9rem;
            margin-top: 5px;
            display: block;
        }
    `;
    document.head.appendChild(style);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh

        const email = form.elements[0];
        const password = form.elements[1];

        // Clear previous errors
        document.querySelectorAll(".error-message").forEach(el => el.remove());

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            showError(email, "Invalid email format.");
            return;
        }

        // Password Validation (At least 6 characters, includes number & letter)
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordPattern.test(password.value)) {
            showError(password, "Password must be at least 6 characters and include a number.");
            return;
        }

        console.log("Form submitted: ", email.value, password.value);

        const storedUser = JSON.parse(localStorage.getItem("lastUser")); // Get last registered user

        if (storedUser && storedUser.email === email.value && storedUser.password === password.value) {
            console.log("User authenticated.");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(storedUser));

            popupMessage.textContent = "Sign-in successful! Redirecting...";
            popup.style.display = "flex";

            setTimeout(() => {
                localStorage.removeItem("lastUser"); // Delete last registered user
                window.location.href = "index.html";
            }, 2000);
        } else {
            console.log("Invalid login attempt.");
            showError(email, "Invalid email or password.");
            showError(password, "Invalid email or password.");
        }
    });

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Function to show error message and shake effect
    function showError(inputElement, message) {
        const errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message");
        errorSpan.textContent = message;
        inputElement.parentElement.appendChild(errorSpan);
        
        // Add shake effect
        inputElement.classList.add("shake");
        
        // Remove error after 1.5s
        setTimeout(() => {
            errorSpan.remove();
            inputElement.classList.remove("shake");
        }, 1500);
    }
});