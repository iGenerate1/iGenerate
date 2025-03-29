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
