document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = true; // Set to false to test without login and true if logged in

    const navLinks = document.getElementById('nav-links');
    const signInButton = document.querySelector(".sign-in-btn");
    const userButtonsContainer = document.querySelector(".user-buttons");

    if (isLoggedIn) {
        // Create the profile button
        const profileButton = document.createElement("button");
        profileButton.classList.add("profile-btn"); // Add the profile button class for CSS
        profileButton.innerHTML = `
            <a href="profile_page.html" id="profileLink">
                <i class="fas fa-user"></i>
            </a>
        `;

        // Replace the sign-in button with the profile button
        signInButton.replaceWith(profileButton);

        // Create the cart button
        const cartButton = document.createElement("button");
        cartButton.classList.add("cart-btn"); // Add the cart button class for CSS
        cartButton.innerHTML = `
            <a href="cart.html" class="nav-link" title="Cart">
                <i class="fas fa-shopping-cart cart-icon"></i>
            </a>
        `;

        // Insert the cart button before the profile button
        userButtonsContainer.insertBefore(cartButton, profileButton);
    }
});

// Active links for the current page
document.addEventListener("DOMContentLoaded", () => {
    // Get the current URL path without parameters
    let currentPath = window.location.pathname.split("/").pop() || "";

    // Define page links with corresponding IDs
    let pages = {
        "homepage.html": "homeLink",
        "store_page.html": "storeLink",
        "redeem_page.html": "redeemLink",
        "https://tickets.nianticlabs.com/events/#/eventlisting?appId=pgo": "eventLink"
    };

    // Set active class for the matching link
    if (pages[currentPath]) {
        document.getElementById(pages[currentPath]).classList.add("active");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let carousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
        interval: 3000,  // Auto-slide every 3 seconds
        wrap: true
    });
});

function setActiveTab(clickedTab) {
    // Remove 'active' from all tabs
    document.querySelectorAll(".tab-btn").forEach(tab => tab.classList.remove("active"));

    // Add 'active' to the clicked tab
    clickedTab.classList.add("active");
}

function showCategory(category) {
    document.querySelectorAll('.store-category').forEach(div => {
        div.classList.remove('active-category');
    });
    document.getElementById(category).classList.add('active-category');

    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const bundlesContainer = document.getElementById("bundle-container");

    // Bundle data with categories
    const bundles = [
        /* Items */
        { name: "Max Mushroom", price: 289, img: "/assets/images/max_mushroom.png", category: "items" },
        { name: "Super Incubator", price: 88, img: "/assets/images/super_incubator.png", category: "items" },
        { name: "Egg Incubator", price: 88, img: "/assets/images/egg_incubator.png", category: "items" },
        { name: "Max Revive", price: 59, img: "/assets/images/max_revive.png", category: "items" },
        { name: "Premium Battle Pass", price: 88, img: "/assets/images/premium_battle_pass.png", category: "items" },
        { name: "Max Particle Pack x6", price: 235, img: "/assets/images/max_particle.png", category: "items" },
        /* Item Boxes */
        { name: "Fuzzy Buddy Research Day Ultra Ticket Box", price: 59, description:"1 time purchase only.", img: "/assets/images/fuzzy_buddy.png", category: "item-boxes" },
        { name: "Bug Out Ultra Ticket Box", price: 59, description:"1 time purchase only.", img: "/assets/images/bug_out.png", category: "item-boxes" },
        { name: "Power Up Ticket Ultra Ticket Box", price: 289, description:"1 time purchase only.", img: "/assets/images/power_up.png", category: "item-boxes" },
        { name: "GO Rocket Box", price: 289, description:"1 time purchase only.", img: "/assets/images/go_rocket.png", category: "item-boxes" },
        { name: "Ultra Raid Box", price: 149, description:"3 time purchase only.", img: "/assets/images/ultra_raid.png", category: "item-boxes" },
        { name: "Might and Mastery", price: 289, description:"3 time purchase only.", img: "/assets/images/might_mastery.png", category: "item-boxes" },
        /* Pokécoins */
        { name: "110 PokéCoins", price: 29, description:"10 WebStore Bonus Coins", img: "/assets/images/110.png", category: "poke-coins" },
        { name: "600 PokéCoins", price: 149, description:"50 WebStore Bonus Coins", img: "/assets/images/600.png", category: "poke-coins" },
        { name: "1,300 PokéCoins", price: 289, description:"100 WebStore Bonus Coins", img: "/assets/images/1300.png", category: "poke-coins" },
        { name: "2,700 PokéCoins", price: 589, description:"200 WebStore Bonus Coins", img: "/assets/images/2700.png", category: "poke-coins" },
        { name: "5,600 PokéCoins", price: 1_170, description:"400 WebStore Bonus Coins", img: "/assets/images/5600.png", category: "poke-coins" },
        { name: "15,500 PokéCoins", price: 2_950, description:"1000 WebStore Bonus Coins", img: "/assets/images/15500.png", category: "poke-coins" },
        /* Daily Bundles */
        { name: "Veteran Box", price: 1025 , img: "/assets/images/veteran_box.png", category: "daily-bundles" },
        { name: "Expert Box", price: 550 , img: "/assets/images/expert_box.png", category: "daily-bundles" },
        { name: "Voyager Box", price: 2500 , img: "/assets/images/voyager_box.png", category: "daily-bundles" }
    ];

    // Function to create and display bundle cards
    function displayBundles(filterCategory) {
        bundlesContainer.innerHTML = ""; // Clear existing cards
        bundles.forEach(bundle => {
            if ((filterCategory === 'all' || bundle.category === filterCategory) && bundle.category !== 'ALL') {
                const bundleDiv = document.createElement("div");
                bundleDiv.classList.add("bundle-card");

                // Conditionally include the description
                const descriptionHTML = bundle.description ? `<p class="description">${bundle.description}</p>` : '';

                bundleDiv.innerHTML = `
                    <div class="bundle-header">
                        <img src="${bundle.img}" alt="${bundle.name}">
                    </div>
                    <div class="bundle-info">
                        <h4>${bundle.name}</h4>
                        <p class="price">₱${bundle.price}</p>
                        ${descriptionHTML} <!-- Include description if it exists -->
                        <button class="add-btn" onclick="handleAddToCart()"><span class="cart-icon">🛒</span> Add</button>
                    </div>
                `;

                bundlesContainer.appendChild(bundleDiv);
            }
        });
    }

    // Function to handle add to cart logic
    window.handleAddToCart = function() {
        if (isLoggedIn) {
            alert("Item added to cart!");
            // Add your logic to add the item to the cart here
        } else {
            window.location.href = "signin_page.html"; // Redirect to sign-in page
        }
    };

    // Function to filter and display bundles based on category
    window.filterCategory = function(category) {
        document.querySelectorAll(".tab-btn").forEach(tab => tab.classList.remove("active"));
        document.querySelector(`.tab-btn.${category}`).classList.add("active");
        displayBundles(category);
    };

    // Initial display with all items or a default category
    displayBundles('items');
});
