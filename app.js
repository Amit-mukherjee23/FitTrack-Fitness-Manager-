console.log("FitTrack app.js loaded");

// FITTRACK - DASHBOARD

function startWorkout() {
    window.location.href = "workout.html";
}



// LOAD DASHBOARD DATA


function loadDashboardData() {

    const history =
        JSON.parse(localStorage.getItem("workoutHistory")) || [];


    // Total Workouts
    const totalWorkouts =
        document.getElementById("totalWorkouts");

    if (totalWorkouts) {
        totalWorkouts.textContent =
            history.length;
    }


    // Total Calories
    let totalCalories = 0;

    history.forEach(function (workout) {

        totalCalories +=
            Number(workout.calories) || 0;

    });


    const caloriesElement =
        document.getElementById("totalCalories");

    if (caloriesElement) {

        caloriesElement.textContent =
            totalCalories;

    }


    // Weekly Progress
    const weeklyWorkouts =
        getThisWeekWorkouts(history);

    const weeklyCount =
        weeklyWorkouts.length;

    const weeklyGoal = 6;

    const percentage =
        Math.min(
            Math.round(
                (weeklyCount / weeklyGoal) * 100
            ),
            100
        );


    const goalProgress =
        document.getElementById("goalProgress");

    if (goalProgress) {

        goalProgress.textContent =
            percentage + "%";

    }


    updateWeeklyProgress(
        weeklyCount,
        percentage
    );
}



// THIS WEEK WORKOUTS


function getThisWeekWorkouts(history) {

    const today = new Date();

    const startOfWeek =
        new Date(today);

    startOfWeek.setDate(
        today.getDate() - today.getDay()
    );

    startOfWeek.setHours(
        0, 0, 0, 0
    );


    const endOfWeek =
        new Date(startOfWeek);

    endOfWeek.setDate(
        startOfWeek.getDate() + 7
    );


    return history.filter(function (workout) {

        if (!workout.date) {
            return false;
        }


        let workoutDate;


        if (workout.date.includes("T")) {

            workoutDate =
                new Date(workout.date);

        }

        else if (workout.date.includes("/")) {

            const parts =
                workout.date.split("/");

            workoutDate =
                new Date(
                    Number(parts[2]),
                    Number(parts[1]) - 1,
                    Number(parts[0])
                );

        }

        else {

            return false;

        }


        return (
            workoutDate >= startOfWeek &&
            workoutDate < endOfWeek
        );

    });
}



// WEEKLY PROGRESS


function updateWeeklyProgress(count, percentage) {

    const workoutCount =
        document.getElementById("weeklyWorkoutCount");

    const workoutPercentage =
        document.getElementById("weeklyProgressPercentage");

    const progressFill =
        document.getElementById("weeklyProgressFill");


    if (workoutCount) {
        workoutCount.textContent =
            `${count} / 6`;
    }


    if (workoutPercentage) {
        workoutPercentage.textContent =
            `${percentage}%`;
    }


    if (progressFill) {
        progressFill.style.width =
            `${percentage}%`;
    }
}



// TODAY'S WORKOUT


const weeklyWorkout = {

    Sunday: {
        title: "Rest Day",
        name: "Recovery Day",
        description: "Take a rest day and allow your body to recover.",
        label: "REST DAY",
        exercises: []
    },

    Monday: {
        title: "Chest + Triceps",
        name: "Chest + Triceps",
        description: "Chest and triceps strength training.",
        label: "STRENGTH TRAINING",
        exercises: [
            ["Bench Press", "Chest • 3 × 10"],
            ["Incline Dumbbell Press", "Chest • 3 × 10"],
            ["Push Ups", "Chest • 3 × 15"],
            ["Triceps Extension", "Triceps • 3 × 12"],
            ["Triceps Pushdown", "Triceps • 3 × 12"]
        ]
    },

    Tuesday: {
        title: "Back + Biceps",
        name: "Back + Biceps",
        description: "Back and biceps strength training.",
        label: "STRENGTH TRAINING",
        exercises: [
            ["Lat Pulldown", "Back • 3 × 10"],
            ["Seated Cable Row", "Back • 3 × 10"],
            ["Dumbbell Row", "Back • 3 × 10"],
            ["Dumbbell Curl", "Biceps • 3 × 12"],
            ["Hammer Curl", "Biceps • 3 × 12"]
        ]
    },

    Wednesday: {
        title: "Legs",
        name: "Leg Day",
        description: "Lower body strength training.",
        label: "STRENGTH TRAINING",
        exercises: [
            ["Squats", "Legs • 3 × 10"],
            ["Leg Press", "Legs • 3 × 10"],
            ["Leg Extension", "Quads • 3 × 12"],
            ["Leg Curl", "Hamstrings • 3 × 12"],
            ["Calf Raises", "Calves • 3 × 15"]
        ]
    },

    Thursday: {
        title: "Shoulders + Abs",
        name: "Shoulders + Abs",
        description: "Shoulder and core training.",
        label: "STRENGTH + CORE",
        exercises: [
            ["Shoulder Press", "Shoulders • 3 × 10"],
            ["Lateral Raises", "Shoulders • 3 × 12"],
            ["Front Raises", "Shoulders • 3 × 12"],
            ["Plank", "Core • 3 × 30 sec"],
            ["Crunches", "Abs • 3 × 15"]
        ]
    },

    Friday: {
        title: "Full Body",
        name: "Full Body Workout",
        description: "A balanced full-body workout.",
        label: "FULL BODY",
        exercises: [
            ["Bodyweight Squats", "Legs • 3 × 15"],
            ["Push Ups", "Chest • 3 × 15"],
            ["Dumbbell Row", "Back • 3 × 10"],
            ["Shoulder Press", "Shoulders • 3 × 10"],
            ["Plank", "Core • 3 × 30 sec"]
        ]
    },

    Saturday: {
        title: "Cardio + Core",
        name: "Cardio + Core",
        description: "Cardio and core-focused training.",
        label: "CARDIO + CORE",
        exercises: [
            ["Brisk Walking", "Cardio • 20 min"],
            ["Cycling", "Cardio • 15 min"],
            ["Jumping Jacks", "Cardio • 3 × 20"],
            ["Plank", "Core • 3 × 30 sec"],
            ["Mountain Climbers", "Core • 3 × 20"]
        ]
    }

};



// SHOW TODAY'S WORKOUT


function loadTodayWorkout() {

    const today =
        new Date().toLocaleDateString(
            "en-US",
            { weekday: "long" }
        );


    const workout =
        weeklyWorkout[today];


    if (!workout) {
        return;
    }


    const title =
        document.getElementById(
            "todayWorkoutTitle"
        );

    const name =
        document.getElementById(
            "todayWorkoutName"
        );

    const description =
        document.getElementById(
            "todayWorkoutDescription"
        );

    const label =
        document.getElementById(
            "todayWorkoutLabel"
        );

    const exerciseList =
        document.getElementById(
            "todayExerciseList"
        );


    if (title) {
        title.textContent =
            workout.title;
    }


    if (name) {
        name.textContent =
            workout.name;
    }


    if (description) {
        description.textContent =
            workout.description;
    }


    if (label) {
        label.textContent =
            workout.label;
    }


    if (!exerciseList) {
        return;
    }


    // Rest Day
    if (workout.exercises.length === 0) {

        exerciseList.innerHTML = `
            <div class="exercise-item">

                <div class="exercise-number">
                    💤
                </div>

                <div>
                    <h3>Rest & Recovery</h3>

                    <p>
                        No workout scheduled today
                    </p>
                </div>

            </div>
        `;

        return;
    }


    // Exercises
    exerciseList.innerHTML = "";


    workout.exercises.forEach(
        function (exercise, index) {

            exerciseList.innerHTML += `

                <div class="exercise-item">

                    <div class="exercise-number">
                        ${String(index + 1).padStart(2, "0")}
                    </div>

                    <div>

                        <h3>
                            ${exercise[0]}
                        </h3>

                        <p>
                            ${exercise[1]}
                        </p>

                    </div>

                </div>

            `;

        }
    );

}



// PAGE LOAD

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboardData();

        loadTodayWorkout();

        loadHomeProfileName();
        
        loadHomeFitnessGoal();

        loadHomeGoalProgress();
    }
);
function loadHomeGoalProgress() {

    console.log("loadHomeGoalProgress is running")

    const history =
        JSON.parse(
            localStorage.getItem("workoutHistory")
        ) || [];

    const weeklyWorkouts =
        getThisWeekWorkouts(history);

    const percentage =
        Math.min(
            Math.round(
                (weeklyWorkouts.length / 6) * 100
            ),
            100
        );
            console.log("Weekly Workouts:", weeklyWorkouts);
console.log("Progress Percentage:", percentage);
      
// FITNESS JOURNEY GOAL

const fitnessBar =
    document.getElementById(
        "homeFitnessProgressBar"
    );

const fitnessText =
    document.getElementById(
        "homeFitnessProgressText"
    );

if (fitnessBar) {
    fitnessBar.style.width =
        percentage + "%";
}

if (fitnessText) {
    fitnessText.textContent =
        percentage + "% completed";
}

    const progressBar =
        document.getElementById(
            "homeGoalProgressBar"
        );

        const progressText =
        document.getElementById(
            "homeGoalProgressText"
        );

    if (progressBar) {
        progressBar.style.width =
            percentage + "%";
    }

    if (progressText) {
        progressText.textContent =
            percentage + "% completed";
    }

   const consistencyBar =
        document.getElementById(
            "homeConsistencyProgressBar"
        );

    const consistencyText =
        document.getElementById(
            "homeConsistencyProgressText"
        );

    if (consistencyBar) {
        consistencyBar.style.width =
            percentage + "%";
    }

    if (consistencyText) {
        consistencyText.textContent =
            percentage + "% completed";
    }

}





// LOAD PROFILE NAME ON HOME

function loadHomeProfileName() {

    const profile =
        JSON.parse(
            localStorage.getItem("fitTrackProfile")
        ) || {};

    const homeUserName =
        document.getElementById("homeUserName");

    if (homeUserName && profile.name) {
        homeUserName.textContent =
            profile.name;
    }
}


// LOAD FITNESS GOAL ON HOME

function loadHomeFitnessGoal() {

    const profile =
        JSON.parse(
            localStorage.getItem("fitTrackProfile")
        ) || {};

    const homeFitnessGoal =
        document.getElementById("homeFitnessGoal");

    if (homeFitnessGoal && profile.goal) {
        homeFitnessGoal.textContent =
            profile.goal;
    }
}
