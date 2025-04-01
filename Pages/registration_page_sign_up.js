document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const popup = document.getElementById("signup-popup");
    const popupMessage = document.getElementById("signup-popup-message");
    const closeBtn = document.getElementById("signup-close-popup");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = form.elements["email"].value; // Accessing by name instead of index
        const password = form.elements["password"].value;
        const confirmPassword = form.elements["confirmPassword"].value;
        const ign = form.elements["ign"].value;
        const playerID = form.elements["playerID"].value;

        if (password !== confirmPassword) {
            popupMessage.textContent = "Passwords do not match.";
            popup.style.display = "flex";
            return;
        }

        const newUser = {
            email: email,
            password: password,
            ign: ign,
            playerID: playerID,
            pokeCoins: "10 PokéCoins",
            level: 1,
            profileImage: "/assets/images/profile-page-avatar.png" // Corrected path
        };

        let users = JSON.parse(localStorage.getItem("users")) || []; // Retrieve or initialize array
        users.push(newUser); // Add new user to the array
        localStorage.setItem("users", JSON.stringify(users)); // Save array back to localStorage

        popupMessage.textContent = "Sign-up successful! Redirecting...";
        popup.style.display = "flex";

        setTimeout(() => {
            window.location.href = "registration_page_sign_in.html";
        }, 2000);
    });

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });
});