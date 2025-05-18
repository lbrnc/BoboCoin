// Predefined users with their names, codes, and balances
const userBalances = {
    "1234": { name: "Korja.Obermann", balance: 476 },
    "5678": { name: "Leo.Branca", balance: 1224 },
    "0000": { name: "Janine.Branca", balance: 0 }
};

// Store userBalances in localStorage if not already stored
if (!localStorage.getItem("userBalances")) {
    console.log("Initializing userBalances in localStorage"); // Debugging log
    localStorage.setItem("userBalances", JSON.stringify(userBalances));
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const messageElement = document.getElementById("message");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        console.log("Login form submitted"); // Debugging log

        const code = document.getElementById("codeInput").value;
        const name = document.getElementById("nameInput").value;
        console.log("Code entered:", code); // Debugging log
        console.log("Name entered:", name); // Debugging log

        const userBalances = JSON.parse(localStorage.getItem("userBalances"));
        console.log("User balances:", userBalances); // Debugging log

        // Check if the code exists in userBalances
        if (userBalances && userBalances.hasOwnProperty(code)) {
            const user = userBalances[code];
            console.log("User found:", user); // Debugging log

            // Validate name
            if (user && user.name && user.name.toLowerCase() === name.trim().toLowerCase()) {
                const balance = user.balance;
                console.log("Login successful. Balance:", balance); // Debugging log

                // Store user details in localStorage for use on the dashboard
                localStorage.setItem("boboBalance", balance);
                localStorage.setItem("currentUser", code);
                localStorage.setItem("currentUserName", user.name); // Store the normalized name

                // Redirect to the dashboard
                window.location.href = "dashboard.html";
            } else {
                console.log("Login failed. Invalid name."); // Debugging log
                messageElement.style.color = "#d32f2f"; // Error message color
                messageElement.textContent = "Ungültiger Name oder Code. Bitte versuchen Sie es erneut.";
            }
        } else {
            console.log("Login failed. Invalid code."); // Debugging log
            messageElement.style.color = "#d32f2f"; // Error message color
            messageElement.textContent = "Ungültiger Name oder Code. Bitte versuchen Sie es erneut.";
        }
    });
});