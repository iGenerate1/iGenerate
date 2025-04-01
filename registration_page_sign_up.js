document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#signup-form");
    const popup = document.getElementById("signup-popup");
    const popupMessage = document.getElementById("signup-popup-message");
    const closeBtn = document.getElementById("signup-close-popup");

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
        event.preventDefault(); // Prevent form from submitting the old way

        const email = form.elements["email"];
        const password = form.elements["password"];
        const confirmPassword = form.elements["confirmPassword"];
        const ign = form.elements["ign"];

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

        // Confirm Password Validation
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Passwords do not match.");
            return;
        }

        // Generate Player ID
        const generatedPlayerID = generatePlayerID(); // Generate Player ID
        
        // Store user data
        const newUser = {
            email: email.value,
            password: password.value,
            ign: ign.value,
            playerID: generatedPlayerID,  // Store the generated Player ID
            pokeCoins: "0 PokéCoins",
            level: 2,
            profileImage: "assets/images/profile-page-avatar.png"
        };

        // Store the user data in localStorage
        localStorage.setItem("lastUser", JSON.stringify(newUser));

        // Show the success popup
        popupMessage.textContent = "Sign-up successful! Redirecting...";
        popup.style.display = "flex";

        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = "registration_page_sign_in.html";
        }, 1500);
    });

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Function to generate random Player ID in the format #### #### ####
    function generatePlayerID() {
        const randomID = `${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
        return randomID;
    }

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