//Adding cart button to the navbar when the user is logged in
document.addEventListener("DOMContentLoaded", () =>{
    const isLoggedIn = false; //false to test without login and true if logged in

        if (isLoggedIn) {
            const navLinks = document.getElementById('nav-links');
            const cartItem = document.createElement('li');

            cartItem.innerHTML = `
                <a href="cart.html" class="nav-link" title="Cart">
                    <i class="fas fa-shopping-cart cart-icon"></i>
                </a>
            `;

            navLinks.appendChild(cartItem);
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





