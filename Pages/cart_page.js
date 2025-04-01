document.addEventListener("DOMContentLoaded", function () {
    const checkoutBtn = document.querySelector(".checkout-btn");
    const body = document.querySelector("body");

    // Create the overlay (if needed for future use, you can remove it if you prefer)
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.style.display = "none";
    body.appendChild(overlay);

    // Create the popup container (replacing the pop-up with direct billing integration)
    const popup = document.createElement("div");
    popup.classList.add("popup-container");
    popup.innerHTML = `
        <div class="popup-header">
            <h2>Order Summary</h2>
            <button class="close-popup">&times;</button>
        </div>
        <div class="popup-content">
            <div class="cart-item" data-price="259">
                <img src="/assets/images/cart item 1.png" alt="Deep Depths Ultra Ticket Box" class="item-img">
                <div class="item-info">
                    <p class="item-name">Deep Depths Ultra Ticket Box</p>
                    <p class="quantity">x1</p>
                </div>
                <p class="price">₱259.00</p>
            </div>
            <div class="cart-item" data-price="305">
                <img src="/assets/images/cart item 2.png" alt="Mega Absol Raid Day Ultra Ticket Box" class="item-img">
                <div class="item-info">
                    <p class="item-name">Mega Absol Raid Day Ultra Ticket Box</p>
                    <p class="quantity">x1</p>
                </div>
                <p class="price">₱305.00</p>
            </div>
            <div class="cart-item" data-price="190">
                <img src="/assets/images/cart item 3'.webp" alt="1,300 PokéCoins" class="item-img">
                <div class="item-info">
                    <p class="item-name">1,300 PokéCoins</p>
                    <p class="quantity">x1</p>
                </div>
                <p class="price">₱190.00</p>
            </div>
            <p class="total-price">Total: ₱754.00</p>
            <div class="payment-methods">
                <button class="method">UnionPay</button>
                <button class="method">Gcash</button>
                <button class="method active">Card</button>
                <button class="method">PayPal</button>
            </div>
            <h2 class="payment-h2">Payment via credit card or debit card</h2>        
            <div class="input-group card-section">
                <input type="text" placeholder="Card Number" class="card-input" />
                <div class="card-details">
                    <input type="text" placeholder="MM/YY" class="expiry-input" />
                    <input type="text" placeholder="CVV2/CVV2" class="cvv-input" />
                </div>
            <div class="billing"> 
                <p>Billing information <br>
                <input type="email" placeholder="(Email)" class="email-input"/>
            </div>
            <div class="confirmation-section">
                <button class="confirm-payment">Confirm Payment</button>
                <input type="checkbox" id="save-card-check" />
                <label for="save-card-check">Save this card for future payments</label>                 
            </div>
            <p class="terms">By proceeding, you confirm you’re an adult according to your country laws and agree to be bound by <a href="https://xsolla.com/eula">Xsolla’s EULA</a> .<br>
            Xsolla independently collects essential cookies on this page and further while processing the purchase which is covered by Xsolla’s <a href="https://xsolla.com/cookie"> Cookie Policy. </a><br>
            Please note that for this purchase, Xsolla is the authorized merchant of record and controller of the data you submit on this page.<br>
            If you have any questions, please reach out to <a href="https://help.xsolla.com/">Xsolla Gamer Support</a>. <br>
            Legal|Refund Policy</p>
        </div>
    `;
    popup.style.display = "none";
    body.appendChild(popup);

    function showPopup() {
        popup.style.display = "block";
    }

    function hidePopup() {
        popup.style.display = "none";
    }

    // Handle payment method selection
    const paymentMethods = document.querySelectorAll(".payment-methods .method");
    paymentMethods.forEach(function (method) {
        method.addEventListener("click", function () {
            // Remove 'active' class from all buttons
            paymentMethods.forEach(function (btn) {
                btn.classList.remove("active");
            });

            // Add 'active' class to the clicked button
            method.classList.add("active");

            // Change the content based on selected payment method
            const selectedMethod = method.textContent;

            const paymentContent = document.querySelector(".popup-content");

            if (selectedMethod === "UnionPay") {
                paymentContent.querySelector(".payment-h2").innerHTML = `
                    <h2>To proceed with payment, please go to <a href="https://cert.unionpay.com/cert-company-en/#/login?redirect=%2Fdashboard" target="_blank">UnionPay</a></h2>
                `;  
                document.querySelector(".card-section").style.display = "none"; // Hide card section
            } else if (selectedMethod === "Gcash") {
                paymentContent.querySelector(".payment-h2").innerHTML = `
                    <h2>To proceed with payment, please go to <a href="https://new.gcash.com/" target="_blank">Gcash</a></h2>
                `;
                document.querySelector(".card-section").style.display = "none"; // Hide card section
            } else if (selectedMethod === "PayPal") {
                paymentContent.querySelector(".payment-h2").innerHTML = `
                    <h2>To proceed with payment, please go to <a href="https://www.paypal.com/signin" target="_blank">PayPal</a></h2>
                `;
                document.querySelector(".card-section").style.display = "none"; // Hide card section
            } else {
                // Show the card payment form when "Card" is selected
                paymentContent.querySelector(".payment-h2").innerHTML = "Payment via credit card or debit card";
                document.querySelector(".card-section").style.display = "block"; // Show card section
                resetCardSectionLayout(); // Reset the card section layout
            }
        });
    });

    checkoutBtn.addEventListener("click", showPopup);
    popup.querySelector(".close-popup").addEventListener("click", hidePopup);

    function resetCardSectionLayout() {
        const cardSection = document.querySelector(".card-section");
        cardSection.style.display = "block"; // Make sure it's visible
        cardSection.querySelector(".card-input").style.marginBottom = "10px"; // Add spacing between inputs
        cardSection.querySelector(".card-details").style.display = "flex"; // Ensure card details are visible in a row
        cardSection.querySelector(".expiry-input").style.marginRight = "10px"; // Add space between expiry and CVV
        cardSection.querySelector(".cvv-input").style.marginLeft = "10px"; // Add space between expiry and CVV
        cardSection.querySelector(".billing p").style.marginTop = "10px"; // Add space before billing
        cardSection.querySelector(".email-input").style.marginBottom = "5px"; // Space for email input
    }

    // Add validation for card payment
    document.querySelector(".confirm-payment").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission
    
        const cardNumber = document.querySelector(".card-input").value;
        const expiryDate = document.querySelector(".expiry-input").value;
        const cvv = document.querySelector(".cvv-input").value;
        const email = document.querySelector(".email-input").value;
    
        const cardNumberPattern = /^[0-9]{16}$/;
        const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvPattern = /^[0-9]{3}$/;
    
        if (!cardNumber.match(cardNumberPattern)) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }
    
        if (!expiryDate.match(expiryDatePattern)) {
            alert("Please enter a valid expiry date (MM/YY).");
            return;
        }
    
        if (!cvv.match(cvvPattern)) {
            alert("Please enter a valid 3-digit CVV.");
            return;
        }
    
        if (!email) {
            alert("Please enter your email address.");
            return;
        }
    
        // If validation is successful, show success message
        const successPopup = document.createElement("div");
        successPopup.classList.add("popup-container");
        successPopup.innerHTML = `
            <div class="popup-header">
                <h2>Payment Successful</h2>
            </div>
            <div class="popup-content">
                <p>Your payment has been successfully processed.</p>
                <button class="close-success">OK</button>
            </div>
        `;
        body.appendChild(successPopup);
    
        document.querySelector(".close-success").addEventListener("click", function () {
            successPopup.remove();
            window.location.href = "homepage.html";
        });
    });
    
    
    const style = document.createElement("style");
    style.innerHTML = `
        body {
            font-family: 'Lato', sans-serif;
            margin: 0px;
            padding: 0;
            background-color: #e5f3efd5;
        }
        .popup-header h2 {
            color: #007cc5;
            font-weight: 600 !important;
            font-size: 25px
        }
        .close-popup {
            width: 30px; /* Set width and height for a circular button */
            height: 30px;
            background: #39c29c; /* Background color */
            color: white;
            font-size: 18px; /* Slightly smaller font */
            border: none;
            border-radius: 50%; /* Makes it circular */
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute; /* Positions it inside the popup */
            top: 10px; /* Adjust distance from the top */
            right: 10px; /* Adjust distance from the right */
        }
        .close-popup:hover {
            background: #ffce26;
        }
        .popup-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #e6f3ef;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 90vw;
            max-height: 90vh;
            width: 600px;
            overflow-y: auto;
            z-index: 1000;
        }
        .payment-methods {
            display: flex;
            justify-content: center; /* Center buttons */
            gap: 12px; /* Space between buttons */
            margin-bottom: 15px;
        }

        .payment-methods .method {
            width: 130px; /* Adjust width */
            height: 80px; /* Adjust height */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1.5px solid #00a19a; /* Light green border */
            border-radius: 10px; /* Rounded corners */
            font-size: 16px;
            font-weight: bold;
            color: #0073e6; /* Blue text */
            background-color: white;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
        }

        .payment-methods .method:hover {
            border-color: #0073e6; /* Highlight border on hover */
        }

        .payment-methods .method.active {
            border: 3px solid #0073e6; /* Thicker blue border for selected item */
            padding: 5px;
        }
        .method {
            padding: 8px 12px;
            border: 1px solid #ccc;
            background: white;
            cursor: pointer;
            border-radius: 5px;
        }
        .method.active {
            border-color: blue;
        }
        .input-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .payment-h2 {
            color: #007cc5;
            font-weight: 600 !important;
            font-size: 20px
        }
        .card-input, .expiry-input, .cvv-input, .email-input {
            padding: 10px;
            border: 1px solid #ccc;
            width: 100%;
            border-radius: 15px;
        }
        .card-details {
            display: flex;
            justify-content: space-between;
        }
        .expiry-input, .cvv-input {
            width: 48%;
        }

        .billing p{
            color: #007cc5;
            font-weight: 700 !important;
            font-size: 15px
        }

        .terms {
            color: #007cc5;
            font-size: 12px;
        }

        .terms a {
            color: #39c29c;
            font-size: 12px;
        }

        .cart-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            background: #fff;
            margin-bottom: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .item-image {
            width: 50px;
            height: 50px;
            object-fit: contain;
        }
        .item-info {
            display: flex;
            flex-direction: column;
        }
        .confirm-payment {
            width: 100%;
            background: #39c29c;
            color: white;
            font-size: 20px;
            border: none;
            padding: 12px;
            border-radius: 15px;
            cursor: pointer;
            font-weight: bolder;
            margin-top: -15px;
            margin-bottom: 10px;
        }
        .confirm-payment:hover {
            background: #ffce26;
        }
        #save-card-check + label {
            color: #007cc5;
            font-weight: bold;
            font-size: 14px;
        }
        .close-success {
            width: 100% !important;
            background: #39c29c !important;
            color: white !important;
            font-size: 16px !important;
            border: none !important;
            padding: 12px !important;
            border-radius: 5px !important;
            cursor: pointer !important;
            margin-top: 15px !important;
            text-align: center !important;
            display: block !important;
        }

        .close-success:hover {
            background: #ffce26 !important;
        }

    `;
    document.head.appendChild(style);
});
