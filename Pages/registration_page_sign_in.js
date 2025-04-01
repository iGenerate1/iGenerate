document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signin-form");
    const popup = document.getElementById("signin-popup");
    const popupMessage = document.getElementById("signin-popup-message");
    const closeBtn = document.getElementById("signin-close-popup");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh

        const email = form.elements[0].value;
        const password = form.elements[1].value;

        console.log("Form submitted: ", email, password); // Debugging log

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const storedUser = users.find(user => user.email === email && user.password === password);

        if (storedUser) {
            console.log("User authenticated.");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(storedUser));

            popupMessage.textContent = "Sign-in successful! Redirecting...";
            popup.style.display = "flex";

            setTimeout(() => {
                window.location.href = "homepage.html";
            }, 2000);
        } else {
            console.log("Invalid login attempt.");
            popupMessage.textContent = "Invalid email or password.";
            popup.style.display = "flex";
        }
    });

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });
});