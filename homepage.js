document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("currentUser")); // FIXED KEY
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("currentUser") || "TRAINER"; // Default username

    console.log("User logged in:", isLoggedIn);

    // Handle Sign In / Profile Button Swap
    const signInButton = document.querySelector(".sign-in-btn");
    if (signInButton) {
        if (isLoggedIn) {
            const profileButton = document.createElement("button");
            profileButton.classList.add("profile-btn");
            profileButton.innerHTML = `<i class="fas fa-user"></i>`;
            
            // Redirect to profile page when clicked
            profileButton.addEventListener("click", () => {
                window.location.href = "profile_page.html";
            });

            signInButton.replaceWith(profileButton);
        }
    }

        //Transaction Link for signed up
        const transactionLink = document.querySelector("a[href='transaction_history.html']");
        if (transactionLink) {
            if (!isLoggedIn) {
                transactionLink.parentElement.style.display = "none"; // Hide if not logged in
            }
        }

    // Update Greeting in Carousel if Logged In
    const carouselHeading = document.querySelector(".carousel-caption h1");
    if (carouselHeading && isLoggedIn) {
        carouselHeading.textContent = `WELCOME BACK, ${userData.ign.toUpperCase()}!`;
    }

    // Show Bundles if Logged In
    const bundlesContainer = document.querySelector(".bundle-content");
    const title = document.getElementById("bundles-title");

    if (isLoggedIn && bundlesContainer && title) {
        title.innerText = "Exclusive Bundles";

        // Define new bundle items
        const newBundles = [
            { name: "Boost Box", price: "Add to Cart", img: "assets/images/boost-box.png" },
            { name: "Great Raid Box", price: "Add to Cart", img: "assets/images/great-raid-box.png" },
            { name: "Voyager Box", price: "Add to Cart", img: "assets/images/voyager-box.png" }
        ];

        // Populate the bundle section
        bundlesContainer.innerHTML = newBundles.map(bundle => `
            <div class="bundle-card">
                <img src="${bundle.img}" alt="${bundle.name}">
                <div class="content">
                    <h4>${bundle.name}</h4>
                    <p>Updates Every Midnight</p>
                    <button class="buy-button"><i class="fas fa-shopping-cart cart-icon"></i> ${bundle.price}</button>
                </div>
            </div>
        `).join("");

        // Add event listeners to buy buttons
        document.querySelectorAll(".buy-button").forEach(button => {
            button.addEventListener("click", () => {
                document.getElementById("customAlert").style.display = "flex";
            });
        });

        // Close alert functionality
        const closeAlert = document.getElementById("closeAlert");
        if (closeAlert) {
            closeAlert.addEventListener("click", () => {
                document.getElementById("customAlert").style.display = "none";
            });
        }
    }

    // Handle Poke Button Click Event for Carousel
    const pokeButton = document.getElementById("pokeButton");
    const carouselElement = document.getElementById("heroCarousel");
    if (pokeButton && carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, { interval: false });
        const borderCircle = document.querySelector("#borderSVG circle");

        let clickCount = 1;
        const stepSize = 104;

        pokeButton.addEventListener("click", () => {
            carousel.next(); // Move to the next image
            if (clickCount > 0) {
                clickCount++;
                borderCircle.style.strokeDashoffset = `${201 - (clickCount * stepSize)}`;
            }
        });
    }

    // Highlight Active Navigation Links
    const currentPath = window.location.pathname.split("/").pop() || "";
    const pages = {
        "index.html": "homeLink",
        "store_page.html": "storeLink",
        "redeem_page.html": "redeemLink",
        "https://tickets.nianticlabs.com/events/#/eventlisting?appId=pgo": "eventLink"
    };

    if (pages[currentPath]) {
        const activeLink = document.getElementById(pages[currentPath]);
        if (activeLink) activeLink.classList.add("active");
    }
})