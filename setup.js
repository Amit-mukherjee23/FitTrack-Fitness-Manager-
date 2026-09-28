

document.addEventListener("DOMContentLoaded", function () {

    const setupForm = document.getElementById("setupForm");

    setupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("setupName").value.trim();


        const goal =
            document.getElementById("setupGoal").value;

        const weight =
            document.getElementById("setupWeight").value.trim();


    

        if (!name) {

            alert("Please enter your name.");

            return;
        }

    
localStorage.removeItem("userWeight");
localStorage.removeItem("weightHistory");
localStorage.removeItem("workoutHistory");


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

        const profile = {

            name: name,

        

            goal: goal,

            weight: weight

        };


  

        localStorage.setItem(
            "fitTrackProfile",
            JSON.stringify(profile)
        );


    

        window.location.href = "index.html";

    });

});
