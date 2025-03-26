//Clicking of the Button and Carousel Event
document.addEventListener("DOMContentLoaded", () => {
    const pokeButton = document.getElementById("pokeButton");
    const carouselElement = document.getElementById("heroCarousel");
    const carousel = new bootstrap.Carousel(carouselElement, { interval: false });
    const borderCircle = document.querySelector("#borderSVG circle");

    let clickCount = 0;
    const stepSize = 104; //Each step fills 1/3 of the border

    pokeButton.addEventListener("click", () => {
        carousel.next(); // Move to the next image

        if (clickCount < 1000) {
            clickCount++;
            borderCircle.style.strokeDashoffset = `${209 - (clickCount * stepSize)}`;
        }
    });
});

//Active links for the current page
document.addEventListener("DOMContentLoaded", function () {
        //Get the current URL path without query parameters
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



