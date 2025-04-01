//The sign in button will be replaced with profile button when the user is logged in
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username") || "TRAINER"; // Default username
    console.log("User logged in:", isLoggedIn); // Debugging

    const signInButton = document.querySelector(".sign-in-btn");
    if (signInButton && isLoggedIn) {
        const profileButton = document.createElement("button");
        profileButton.classList.add("profile-btn");
        profileButton.innerHTML = `
            <i class="fas fa-user"></i>
        `;

        // Append event listener to navigate to profile page
        profileButton.addEventListener("click", () => {
            window.location.href = "profile_page.html"; // Change this to your actual profile page URL
        });

        signInButton.replaceWith(profileButton);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const redeemBtn = document.querySelector(".redeem-btn");

    // Create input field dynamically
    const redeemInput = document.createElement("input");
    redeemInput.type = "text";
    redeemInput.placeholder = "Ex: ABCD-1234-EFGH";
    redeemInput.classList.add("redeem-input");

    // Insert input before button
    redeemBtn.parentNode.insertBefore(redeemInput, redeemBtn);

    // Create error message
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "Invalid code format! Use ABCD-1234-EFGH.";
    redeemBtn.parentNode.insertBefore(errorMessage, redeemBtn);

    if (redeemBtn) {
        redeemBtn.textContent = isLoggedIn ? "Apply" : "Sign in to Redeem";

        redeemBtn.addEventListener("click", () => {
            if (!isLoggedIn) {
                console.log("User not logged in. Redirecting to sign-in...");
                window.location.href = "registration_page_sign_in.html"; // Redirect if not logged in
                return;
            }

            const redeemCode = redeemInput.value.trim();
            const validCodePattern = /^[A-Z]{4}-\d{4}-[A-Z]{4}$/; // Example: ABCD-1234-EFGH

            if (redeemCode === "") {
                showError("Please enter a redemption code.");
                return;
            }

            if (!validCodePattern.test(redeemCode)) {
                showError("Invalid code format! Use ABCD-1234-EFGH.");
                return;
            }

            console.log("User logged in. Showing redemption confirmation...");

            // Create a pop-up for redemption success
            const successPopup = document.createElement("div");
            successPopup.classList.add("popup-container");
            successPopup.innerHTML = `
                <div class="popup-header">
                    <h2>Redemption Successful</h2>
                </div>
                <div class="popup-content">
                    <p>Your code <strong>${redeemCode}</strong> has been successfully applied.</p>
                    <button class="close-success">OK</button>
                </div>
            `;

            // Append to body
            document.body.appendChild(successPopup);

            // Close pop-up on clicking "OK"
            document.querySelector(".close-success").addEventListener("click", function () {
                successPopup.remove();
                window.location.href = "index.html"; // Redirect after closing
            });
        });
    } else {
        console.error("Redeem button not found in the DOM.");
    }

    // Function to show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.opacity = "1"; // Make error message visible
        redeemInput.classList.add("invalid");

        setTimeout(() => {
            errorMessage.style.opacity = "0"; // Fade out after 2s
            redeemInput.classList.remove("invalid");
        }, 2000);
    }

    // 🔹 Add styles dynamically
    const style = document.createElement("style");
    style.textContent = `  
        /* 🔹 Popup Styles */
        .popup-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            width: 320px;
            text-align: center;
            padding: 20px;
            z-index: 1000;
            animation: fadeIn 0.3s ease-in-out;
        }
        .popup-header {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .popup-content p {
            font-size: 16px;
            margin-bottom: 15px;
        }
        .close-success {
            padding: 10px 20px;
            border: none;
            background: #50c8b0;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .close-success:hover {
            background: #3ba390;
        }

        /* 🔹 Input Box Styles */
        .redeem-input {
            display: block;
            width: 100%;
            max-width: 300px;
            padding: 10px;
            margin: 10px auto;
            border: 2px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            text-align: center;
        }
        .redeem-input:focus {
            border-color: #50c8b0;
            outline: none;
        }

        /* 🔹 Invalid Input */
        .redeem-input.invalid {
            border-color: red;
            animation: shake 0.3s ease-in-out;
        }

        /* 🔹 Error Message */
        .error-message {
            color: red;
            font-size: 14px;
            margin-top: 5px;
            text-align: center;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }

        /* 🔹 Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -60%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
        }
    `;
    document.head.appendChild(style);
});



//Active links for the current page
document.addEventListener("DOMContentLoaded", () => {
    //Get the current URL path without parameters
    let currentPath = window.location.pathname.split("/").pop() || "";

    //Define page links with corresponding IDs
    let pages = {
        "index.html": "homeLink",
        "store_page.html": "storeLink",
        "redeem_page.html": "redeemLink",
        "https://tickets.nianticlabs.com/events/#/eventlisting?appId=pgo": "eventLink"
    };

    //Set active class for the matching link
    if (pages[currentPath]) {
        document.getElementById(pages[currentPath]).classList.add("active");
}
});