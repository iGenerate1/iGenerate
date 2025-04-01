document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username") || "TRAINER"; // Default username
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

        //Create cart button
        const cartButton = document.createElement("button");
        cartButton.classList.add("cart-btn");
        cartButton.innerHTML = `
            <a href="/pages/cart_page.html" class="nav-link" title="Cart">
                <i class="fas fa-shopping-cart cart-icon"></i>
            </a>
        `;

        //Clear the user-buttons container and add new buttons
        userButtonsContainer.innerHTML = ""; 
        userButtonsContainer.appendChild(cartButton);
        userButtonsContainer.appendChild(profileButton);
    }
});

// Active links for the current page
document.addEventListener("DOMContentLoaded", () => {
    // Get the current URL path without parameters
    let currentPath = window.location.pathname.split("/").pop() || "";

    // Define page links with corresponding IDs
    let pages = {
        "/index.html": "homeLink",
        "/pages/store_page.html": "storeLink",
        "/pages/redeem_page.html": "redeemLink",
        "https://tickets.nianticlabs.com/events/#/eventlisting?appId=pgo": "eventLink",
        "/pages/transaction_history.html": "transactionLink",
        "/pages/cart_page.html": "cartLink",
    };

    // Set active class for the matching link
    if (pages[currentPath]) {
        document.getElementById(pages[currentPath]).classList.add("active");
    }
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

    //Event listeners for add to cart
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-btn")) {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) {
            document.getElementById("customAlert").style.display = "flex";
        } else {
            window.location.href = "registration_page_sign_in.html";
        }
    }
});

//Close the custom alert
document.getElementById("closeAlert").addEventListener("click", () => {
    document.getElementById("customAlert").style.display = "none";
});

    // Function to filter and display bundles based on category
    window.filterCategory = function(category) {
        document.querySelectorAll(".tab-btn").forEach(tab => tab.classList.remove("active"));
        document.querySelector(`.tab-btn.${category}`).classList.add("active");
        displayBundles(category);
    };

    // Initial display with all items or a default category
    displayBundles('items');
});