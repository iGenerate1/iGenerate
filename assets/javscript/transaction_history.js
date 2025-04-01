document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log("User logged in:", isLoggedIn); // Debugging

    const userButtonsContainer = document.querySelector(".user-buttons"); 
    const signInButton = document.querySelector(".sign-in-btn");

    if (isLoggedIn && userButtonsContainer) {
        // Create profile button
        const profileButton = document.createElement("button");
        profileButton.classList.add("profile-btn");
        profileButton.innerHTML = `<i class="fas fa-user"></i>`;

        profileButton.addEventListener("click", () => {
            window.location.href = "/pages/profile_page.html"; 
        });

        //Clear the user-buttons container and add new buttons
        userButtonsContainer.innerHTML = ""; 
        userButtonsContainer.appendChild(profileButton);
    }
});

//Active links for the current page
document.addEventListener("DOMContentLoaded", () => {
    //Get the current URL path without parameters
    let currentPath = window.location.pathname.split("/").pop() || "";

    //Define page links with corresponding IDs
    let pages = {
        "/index.html": "homeLink",
        "/pages/store_page.html": "storeLink",
        "/pages/redeem_page.html": "redeemLink",
        "https://tickets.nianticlabs.com/events/#/eventlisting?appId=pgo": "eventLink",
        "/pages/transaction_history.html": "transactionLink",
    };

    //Set active class for the matching link
    if (pages[currentPath]) {
        document.getElementById(pages[currentPath]).classList.add("active");
}
});

