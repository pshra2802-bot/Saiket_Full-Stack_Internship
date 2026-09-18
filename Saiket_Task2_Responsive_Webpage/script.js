// Product Learn More buttons
const learnButtons = document.querySelectorAll(".learn-btn");

learnButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productName = button.getAttribute("data-product");

        alert(
            "You selected " +
            productName +
            ". More information will be available soon!"
        );

    });

});


// Get Started button
document.getElementById("ctaButton").addEventListener("click", function() {

    alert("Welcome to TechNova! Let's get started.");

});


// Contact button
document.getElementById("contactButton").addEventListener("click", function() {

    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });

});