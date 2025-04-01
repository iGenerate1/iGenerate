document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed.");

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("currentUser")); // FIXED KEY
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Handle Sign-In Button Replacement with Profile Button
    const signInButton = document.querySelector(".sign-in-btn");
    if (signInButton && isLoggedIn) {
        console.log("User is logged in, replacing sign-in button with profile button.");

        const profileButton = document.createElement("button");
        profileButton.classList.add("profile-btn");
        profileButton.innerHTML = `<a href="pages/profile_page.html" id="profileLink"><i class="fas fa-user"></i></a>`;

        signInButton.replaceWith(profileButton);
    }

    // Populate Profile Page if User is Logged In
    if (userData) {
        console.log("Populating profile page with user data.");

        document.querySelector(".user-name").textContent = userData.ign;
        document.querySelector(".poke-coins").innerHTML = `<img src="assets/images/Pokecoins.png" class="coin-image"> ${userData.pokeCoins}`;
        document.querySelector(".email").textContent = userData.email;
        document.querySelector(".id-number").textContent = userData.playerID;
        document.querySelector(".ign").textContent = userData.ign;
        document.querySelector(".level-value").textContent = userData.level;

        // Ensure profile image updates correctly
        const profilePic = document.querySelector(".profile-pic");
        profilePic.src = userData.profileImage ? userData.profileImage : "assets/images/profile-page-avatar.png";

        // Update level progress bar
        const levelProgress = document.querySelector(".level-progress");
        levelProgress.style.width = `${(userData.level / 50) * 100}%`;
    }

    // Handle Sign-Out Button
    const signOutButton = document.querySelector(".sign-out");
    if (signOutButton) {
        console.log("Sign-out button found, adding event listener.");
        
        signOutButton.addEventListener("click", () => {
            console.log("Sign-out button clicked! Logging out...");

            // Remove user data from localStorage
            localStorage.removeItem("currentUser"); // FIXED KEY
            localStorage.removeItem("isLoggedIn");

            // Redirect after logging out
            setTimeout(() => {
                window.location.href = "pages/registration_page_sign_in.html";
            }, 300);
        });
    } else {
        console.error("Sign-out button not found in the DOM.");
    }

    // Active Page Highlighting
    let currentPath = window.location.pathname.split("/").pop() || "";
    let pages = {
        "/index.html": "homeLink",
        "pages/store_page.html": "storeLink",
        "pages/redeem_page.html": "redeemLink",
        "https://tickets.nianticlabs.com/events/#/eventlisting?appId=pgo": "eventLink"
    };

    if (pages[currentPath]) {
        const activeLink = document.getElementById(pages[currentPath]);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }
});