//The sign in button will be replaced with profile button when the user is logged in
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = true; //false to test without login and true if logged in

    const signInButton = document.querySelector(".sign-in-btn");

    if (isLoggedIn) {
        const profileButton = document.createElement("button");
        profileButton.classList.add("profile-btn");//Add the profile button class and will be used for CSS

        profileButton.innerHTML = `
            <a href = "profile_page.html" id  = "profileLink">
                <i class = "fas fa-user"></i>
            </a>
        `;
        
        signInButton.replaceWith(profileButton);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const redeemBtn = document.querySelector(".redeem-btn");
    const overlay = document.getElementById("overlay");
    const closeOverlay = document.getElementById("closeOverlay");

    // Set button text based on login status
    redeemBtn.textContent = isLoggedIn ? "Apply" : "Sign in to Redeem";

    // Handle button click
    redeemBtn.addEventListener("click", () => {
        if (!isLoggedIn) {
            window.location.href = "registration_page_sign_in.html"; // Redirect to sign-in
        } else {
            overlay.style.display = "flex"; // Show overlay
        }
    });

    // Close overlay when clicking the button
    closeOverlay.addEventListener("click", () => {
        overlay.style.display = "none"; // Hide overlay
    });
});

//Active links for the current page
document.addEventListener("DOMContentLoaded", () => {
    //Get the current URL path without parameters
    let currentPath = window.location.pathname.split("/").pop() || "";

    //Define page links with corresponding IDs
    let pages = {
        "homepage.html": "homeLink",
        "store_page.html": "storeLink",
        "redeem_page.html": "redeemLink",
        "https://tickets.nianticlabs.com/events/#/eventlisting?appId=pgo": "eventLink"
    };

    //Set active class for the matching link
    if (pages[currentPath]) {
        document.getElementById(pages[currentPath]).classList.add("active");
}
});