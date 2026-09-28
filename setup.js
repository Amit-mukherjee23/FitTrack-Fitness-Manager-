// =========================
// FITTRACK - PROFILE SETUP
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const setupForm = document.getElementById("setupForm");

    setupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get user information

        const name =
            document.getElementById("setupName").value.trim();


        const goal =
            document.getElementById("setupGoal").value;

        const weight =
            document.getElementById("setupWeight").value.trim();


        // Name is required

        if (!name) {

            alert("Please enter your name.");

            return;
        }

        // Clear old user's data
localStorage.removeItem("userWeight");
localStorage.removeItem("weightHistory");
localStorage.removeItem("workoutHistory");


// Save initial weight
if (weight) {

    localStorage.setItem(
        "userWeight",
        weight
    );

    const weightHistory = [
        {
            date: new Date().toISOString(),
            weight: Number(weight)
        }
    ];

    localStorage.setItem(
        "weightHistory",
        JSON.stringify(weightHistory)
    );
}


        // Create profile object

        const profile = {

            name: name,

        

            goal: goal,

            weight: weight

        };


        // Save profile

        localStorage.setItem(
            "fitTrackProfile",
            JSON.stringify(profile)
        );


        // Go to Home page

        window.location.href = "index.html";

    });

});
