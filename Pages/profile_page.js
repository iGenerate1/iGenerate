document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed.");
    
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Handle Sign-In Button Replacement with Profile Button
    const signInButton = document.querySelector(".sign-in-btn");
    if (signInButton && isLoggedIn) {
        console.log("User is logged in, replacing sign-in button with profile button.");

        const profileButton = document.createElement("button");
        profileButton.classList.add("profile-btn");
        profileButton.innerHTML = `<a href="profile_page.html" id="profileLink"><i class="fas fa-user"></i></a>`;

        signInButton.replaceWith(profileButton);
    }

    // Populate Profile Page if User is Logged In
    if (userData) {
        console.log("Populating profile page with user data.");

        document.querySelector(".user-name").textContent = userData.ign;
        document.querySelector(".poke-coins").textContent = userData.pokeCoins;
        document.querySelector(".email").textContent = userData.email;
        document.querySelector(".id-number").textContent = userData.playerID;
        document.querySelector(".ign").textContent = userData.ign;
        document.querySelector(".level-value").textContent = userData.level;
        document.querySelector(".profile-pic").src = userData.profileImage;

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
            localStorage.removeItem("user");
            localStorage.removeItem("isLoggedIn");

            // Redirect after logging out
            setTimeout(() => {
                window.location.href = "registration_page_sign_in.html";
            }, 300);
        });
    } else {
        console.error("Sign-out button not found in the DOM.");
    }

    // Active Page Highlighting
    let currentPath = window.location.pathname.split("/").pop() || "";
    let pages = {
        "homepage.html": "homeLink",
        "store_page.html": "storeLink",
        "redeem_page.html": "redeemLink",
        "https://tickets.nianticlabs.com/events/#/eventlisting?appId=pgo": "eventLink"
    };

    if (pages[currentPath]) {
        const activeLink = document.getElementById(pages[currentPath]);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }
});



/* //The sign in button will be replaced with profile button when the user is logged in
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

 document.addEventListener("DOMContentLoaded", function () {
    const userData = {
        username: "MAKIMAKI",
        pokeCoins: "10 PokéCoins",
        email: "makirei30@gmail.com",
        idNumber: "7854 8965 1130",
        ign: "MAKIMAKI",
        level: 2,
        profileImage: "/assets/images/profile-placeholder.png",
    };

    document.querySelector(".user-name").textContent = userData.username;
    document.querySelector(".poke-coins").textContent = userData.pokeCoins;
    document.querySelector(".email").textContent = userData.email;
    document.querySelector(".id-number").textContent = userData.idNumber;
    document.querySelector(".ign").textContent = userData.ign;
    document.querySelector(".level-value").textContent = userData.level;
    document.querySelector(".profile-pic").src = userData.profileImage;

    const levelProgress = document.querySelector(".level-progress");
    levelProgress.style.width = `${(userData.level / 50) * 100}%`;

    document.querySelector(".sign-out").addEventListener("click", function () {
        alert("Signing out...");
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
}); */