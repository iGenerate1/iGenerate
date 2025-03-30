document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const popup = document.getElementById("signup-popup");
    const popupMessage = document.getElementById("signup-popup-message");
    const closeBtn = document.getElementById("signup-close-popup");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = form.elements[0].value;
        const password = form.elements[1].value;
        const confirmPassword = form.elements[2].value;
        const ign = form.elements[3].value;
        const playerID = form.elements[4].value;

        if (password !== confirmPassword) {
            popupMessage.textContent = "Passwords do not match.";
            popup.style.display = "flex";
            return;
        }

        const userData = {
            email: email,
            password: password,
            ign: ign,
            playerID: playerID,
            pokeCoins: "10 PokéCoins",
            level: 1,
            profileImage: "/assets/images/profile-placeholder.png"
        };

        localStorage.setItem("user", JSON.stringify(userData));

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
