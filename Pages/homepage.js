
//The sign in button will be replaced with profile button when the user is logged in
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "false";
    const username = localStorage.getItem("username") || "TRAINER"; // Default username
    console.log("User logged in:", isLoggedIn); // Debugging

    const signInButton = document.querySelector(".sign-in-btn");
    if (signInButton && isLoggedIn) {
        const profileButton = document.createElement("button");
        profileButton.classList.add("profile-btn");
        profileButton.innerHTML = `
            <a href="profile_page.html" id="profileLink">
                <i class="fas fa-user"></i>
            </a>
        `;
        signInButton.replaceWith(profileButton);
    }
});

//Once the user is signed in, they will be greeted
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "false"; //false to test without login and true if logged in
    const username = "TRAINER"; 

    if (isLoggedIn) {
        const carouselHeading = document.querySelector(".carousel-caption h1");

        // "WELCOME BACK TRAINER!"
        carouselHeading.textContent = `WELCOME BACK, ${username}!`;
    }
});

//Once the user is logged in, the bundle section will be displayed
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "false"; 

    const bundlesContainer = document.querySelector(".bundle-content");
    const title = document.getElementById("bundles-title");

    if (isLoggedIn) {
        // Change title
        title.innerText = "Daily Bundles";

        // Clear existing content
        bundlesContainer.innerHTML = "";

        // Define new bundle items
        const newBundles = [
            { name: "Boost Box", price: 99, img: "/assets/images/boost-box.png" },
            { name: "Great Raid Box", price: 250, img: "/assets/images/great-raid-box.png" },
            { name: "Voyager Box", price: 1120, img: "/assets/images/voyager-box.png" }
        ];

        // Loop through and create the new bundle elements
        newBundles.forEach(bundle => {
            const bundleDiv = document.createElement("div");
            bundleDiv.classList.add("bundle-card");

            bundleDiv.innerHTML = `
                <img src="${bundle.img}" alt="${bundle.name}">
                <div class="content">
                    <h4>${bundle.name}</h4>
                    <p>Exclusive Bundle</p>
                    <button class="buy-button"> ${bundle.price}</button>
                </div>
            `;

            bundlesContainer.appendChild(bundleDiv);
        });
    }
});


//Clicking of the Button and Carousel Event
//DOMContentLoaded event is fired when the browser has loaded the HTML, excluding stylesheets, images, and other resources.
document.addEventListener("DOMContentLoaded", () => {
    const pokeButton = document.getElementById("pokeButton");
    const carouselElement = document.getElementById("heroCarousel");
    const carousel = new bootstrap.Carousel(carouselElement, { interval: false });
    const borderCircle = document.querySelector("#borderSVG circle");

    let clickCount = 1;
    const stepSize = 104; //Each step fills 1/3 of the border

    pokeButton.addEventListener("click", () => {
        carousel.next(); //Move to the next image

        if (clickCount > 0) {
            clickCount++;
            //Update the stroke offset to fill the border
            borderCircle.style.strokeDashoffset = `${201 - (clickCount * stepSize)}`;
        }
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





