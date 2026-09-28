

document.addEventListener("DOMContentLoaded", function () {

    loadProfile();

    const form =
        document.getElementById("profileForm");

    if (form) {
        form.addEventListener(
            "submit",
            saveProfile
        );
    }


    const resetButton =
        document.getElementById("resetProfileBtn");

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetProfile
        );

    }

});

function loadProfile() {

    const profile =
        JSON.parse(
            localStorage.getItem("fitTrackProfile")
        ) || {};


    const nameInput =
        document.getElementById("profileName");

    const goalInput =
        document.getElementById("fitnessGoal");

    const weightInput =
        document.getElementById(
            "profileWeightInput"
        );


    if (nameInput) {

        nameInput.value =
            profile.name || "";

    }


    if (goalInput && profile.goal) {

        goalInput.value =
            profile.goal;

    }


    if (weightInput) {

        weightInput.value =
            profile.weight || "";

    }


    updateProfileDisplay(profile);

    loadProfileStats(profile);
}




function updateProfileDisplay(profile) {

    const name =
        document.getElementById(
            "profileDisplayName"
        );

    const goal =
        document.getElementById(
            "profileDisplayGoal"
        );


    if (name) {

        name.textContent =
            profile.name || "Your Name";

    }


    if (goal) {

        goal.textContent =
            profile.goal || "Fitness Journey";

    }

}




function loadProfileStats(profile) {

    // Get workout history

    const history =
        JSON.parse(
            localStorage.getItem(
                "workoutHistory"
            )
        ) || [];




    const totalWorkouts =
        document.getElementById(
            "profileTotalWorkouts"
        );


    if (totalWorkouts) {

        totalWorkouts.textContent =
            history.length;

    }


    let totalCalories = 0;


    history.forEach(function (workout) {

        totalCalories +=
            Number(workout.calories) || 0;

    });


    const calories =
        document.getElementById(
            "profileTotalCalories"
        );


    if (calories) {

        calories.textContent =
            totalCalories;

    }


    const weight =
        document.getElementById(
            "profileWeight"
        );


    if (weight) {

        if (profile.weight) {

            weight.textContent =
                profile.weight + " kg";

        } else {

            weight.textContent =
                "--";

        }

    }

}



function saveProfile(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "profileName"
        ).value.trim();


    const goal =
        document.getElementById(
            "fitnessGoal"
        ).value;


    const weight =
        document.getElementById(
            "profileWeightInput"
        ).value.trim();


    if (!name) {

        alert("Please enter your name.");

        return;

    }



    const oldProfile =
        JSON.parse(
            localStorage.getItem(
                "fitTrackProfile"
            )
        ) || {};


    const oldWeight =
        oldProfile.weight || "";


    

    const profile = {

        name: name,

        email:
            oldProfile.email || "",

        goal: goal,

        weight: weight

    };


    localStorage.setItem(
        "fitTrackProfile",
        JSON.stringify(profile)
    );

    if (weight) {

        localStorage.setItem(
            "userWeight",
            weight
        );

        if (
            String(oldWeight) !==
            String(weight)
        ) {

            const weightHistory =
                JSON.parse(
                    localStorage.getItem(
                        "weightHistory"
                    )
                ) || [];


            weightHistory.push({

                date:
                    new Date().toISOString(),

                weight:
                    Number(weight)

            });


            localStorage.setItem(
                "weightHistory",
                JSON.stringify(
                    weightHistory
                )
            );

        }

    }



    updateProfileDisplay(profile);

    loadProfileStats(profile);


    const message =
        document.getElementById(
            "profileMessage"
        );


    if (message) {

        message.textContent =
            "Profile saved successfully! ✓";


        setTimeout(function () {

            message.textContent = "";

        }, 3000);

    }

}



function resetProfile() {

    const confirmReset =
        confirm(
            "Are you sure you want to reset your profile?\n\n" +
            "Your profile, weight history and workout history will be deleted."
        );


    if (!confirmReset) {

        return;

    }

    localStorage.removeItem(
        "fitTrackProfile"
    );


    localStorage.removeItem(
        "userWeight"
    );


    localStorage.removeItem(
        "weightHistory"
    );


    localStorage.removeItem(
        "workoutHistory"
    );


    window.location.href =
        "setup.html";

}
