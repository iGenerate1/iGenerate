document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const popup = document.getElementById("login-popup");
    const popupMessage = document.getElementById("popup-message");
    const closeBtn = document.getElementById("close-popup");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = form.elements[0].value;
        const password = form.elements[1].value;

        // Retrieve stored user data
        const storedUser = JSON.parse(localStorage.getItem("user"));

        // Check if user exists and credentials match
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            localStorage.setItem("isLoggedIn", "true");
            
            // Show custom pop-up
            popupMessage.textContent = "Sign-in successful! Redirecting...";
            popup.style.display = "flex";

            setTimeout(() => {
                window.location.href = "homepage.html"; // Redirect to homepage
            }, 2000);
        } else {
            popupMessage.textContent = "Invalid email or password.";
            popup.style.display = "flex";
        }
    });

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });
});