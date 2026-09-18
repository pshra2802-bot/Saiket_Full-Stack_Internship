document.getElementById("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // Clear old errors
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    // Check name
    if (name === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
    }

    // Check email
    if (email === "") {
        emailError.textContent = "Please enter your email.";
        isValid = false;
    } 
    else if (!email.includes("@") || !email.includes(".")) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Check message
    if (message === "") {
        messageError.textContent = "Please enter your message.";
        isValid = false;
    }

    // If everything is valid
    if (isValid) {
        alert("Thank you! Your message has been submitted successfully.");
        document.getElementById("contactForm").reset();
    }

});