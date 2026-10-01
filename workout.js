 
// FITTRACK - WORKOUT PAGE

const weeklyWorkouts = {

    Sunday: {
        title: "Rest Day",
        description: "Take a proper rest and allow your body to recover.",
        calories: 0,
        exercises: []
    },

    Monday: {
        title: "Chest + Triceps",
        description: "Build strength in your chest and triceps.",
        calories: 250,
        exercises: [
            { name: "Bench Press", sets: 3, reps: 10 },
            { name: "Incline Dumbbell Press", sets: 3, reps: 10 },
            { name: "Push Ups", sets: 3, reps: 12 },
            { name: "Triceps Extension", sets: 3, reps: 10 },
            { name: "Triceps Pushdown", sets: 3, reps: 12 }
        ]
    },

    Tuesday: {
        title: "Back + Biceps",
        description: "Train your back and biceps with controlled movements.",
        calories: 250,
        exercises: [
            { name: "Lat Pulldown", sets: 3, reps: 10 },
            { name: "Seated Cable Row", sets: 3, reps: 10 },
            { name: "Dumbbell Row", sets: 3, reps: 10 },
            { name: "Dumbbell Curl", sets: 3, reps: 12 },
            { name: "Hammer Curl", sets: 3, reps: 12 }
        ]
    },

    Wednesday: {
        title: "Leg Day",
        description: "Train your lower body with strength exercises.",
        calories: 300,
        exercises: [
            { name: "Squats", sets: 3, reps: 10 },
            { name: "Leg Press", sets: 3, reps: 10 },
            { name: "Leg Extension", sets: 3, reps: 12 },
            { name: "Leg Curl", sets: 3, reps: 12 },
            { name: "Calf Raises", sets: 3, reps: 15 }
        ]
    },

    Thursday: {
        title: "Shoulders + Abs",
        description: "Train your shoulders and core.",
        calories: 220,
        exercises: [
            { name: "Shoulder Press", sets: 3, reps: 10 },
            { name: "Lateral Raises", sets: 3, reps: 12 },
            { name: "Front Raises", sets: 3, reps: 12 },
            { name: "Plank", sets: 3, reps: "30 sec" },
            { name: "Crunches", sets: 3, reps: 15 }
        ]
    },

    Friday: {
        title: "Full Body",
        description: "A balanced full-body workout.",
        calories: 280,
        exercises: [
            { name: "Bodyweight Squats", sets: 3, reps: 12 },
            { name: "Push Ups", sets: 3, reps: 12 },
            { name: "Dumbbell Row", sets: 3, reps: 10 },
            { name: "Shoulder Press", sets: 3, reps: 10 },
            { name: "Plank", sets: 3, reps: "30 sec" }
        ]
    },

    Saturday: {
        title: "Cardio + Core",
        description: "Improve cardiovascular fitness and core strength.",
        calories: 250,
        exercises: [
            { name: "Brisk Walking", sets: 1, reps: "15 min" },
            { name: "Cycling", sets: 1, reps: "15 min" },
            { name: "Jumping Jacks", sets: 3, reps: 20 },
            { name: "Plank", sets: 3, reps: "30 sec" },
            { name: "Mountain Climbers", sets: 3, reps: 15 }
        ]
    }
};


// =========================
// GET TODAY
// =========================

function getToday() {

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return days[new Date().getDay()];
}


// =========================
// LOAD TODAY'S WORKOUT
// =========================

function loadTodayWorkout() {

    const today = getToday();
    const workout = weeklyWorkouts[today];

    document.getElementById("workoutTitle").textContent =
        workout.title;

    document.getElementById("workoutDescription").textContent =
        workout.description;

    const container =
        document.getElementById("exerciseContainer");

    container.innerHTML = "";

    // Rest day
    if (workout.exercises.length === 0) {

        container.innerHTML = `
            <div class="rest-day-card">
                <div class="rest-icon">😴</div>
                <h2>Rest & Recovery</h2>
                <p>
                    Today is your rest day. Give your body time to recover.
                </p>
            </div>
        `;

        updateWorkoutProgress();
        return;
    }


    // Create exercises
    workout.exercises.forEach(function (exercise, index) {

        const exerciseCard =
            document.createElement("div");

        exerciseCard.className =
            "workout-exercise";


        exerciseCard.innerHTML = `

            <label class="exercise-check">

                <input
                    type="checkbox"
                    class="exercise-checkbox"
                    onchange="updateWorkoutProgress()"
                >

                <span class="checkmark"></span>

                <div class="exercise-info">

                    <strong>
                        ${index + 1}. ${exercise.name}
                    </strong>

                    <p>
                        ${exercise.sets} × ${exercise.reps}
                    </p>

                </div>

            </label>

        `;


        container.appendChild(exerciseCard);
    });


    updateWorkoutProgress();
}


// =========================
// UPDATE EXERCISE PROGRESS
// =========================

function updateWorkoutProgress() {

    const checkboxes =
        document.querySelectorAll(".exercise-checkbox");

    const total =
        checkboxes.length;

    const completed =
        document.querySelectorAll(
            ".exercise-checkbox:checked"
        ).length;


    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);


    // Text
    const progressText =
        document.getElementById("exerciseProgress");

    if (progressText) {

        progressText.textContent =
            `${completed} of ${total} exercises completed`;
    }


    // Percentage
    const progressPercentage =
        document.getElementById("progressPercentage");

    if (progressPercentage) {

        progressPercentage.textContent =
            `${percentage}%`;
    }


    // Progress bar
    const progressBar =
        document.getElementById("workoutProgress");

    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;
    }
}


// =========================
// COMPLETE WORKOUT
// =========================

function completeWorkout() {

    const today =
        getToday();

    const workout =
        weeklyWorkouts[today];


    // Rest day
    if (workout.exercises.length === 0) {

        alert(
            "Today is a rest day. No workout needs to be completed."
        );

        return;
    }


    // Check exercises
    const checkboxes =
        document.querySelectorAll(
            ".exercise-checkbox"
        );


    const completed =
        document.querySelectorAll(
            ".exercise-checkbox:checked"
        ).length;


    const total =
        checkboxes.length;


    // Not all exercises completed
    if (completed < total) {

        alert(
            `Please complete all exercises first.\n\n` +
            `${completed} of ${total} exercises completed.`
        );

        return;
    }


    // Get history
    let history =
        JSON.parse(
            localStorage.getItem("workoutHistory")
        ) || [];


    // Today's date
    const todayKey =
        new Date().toISOString().split("T")[0];


    // Check duplicate
    const alreadyCompleted =
        history.some(function (item) {

            if (!item.date) {
                return false;
            }

            const savedDate =
                item.date.includes("T")
                    ? item.date.split("T")[0]
                    : item.date;

            return savedDate === todayKey;
        });


    if (alreadyCompleted) {

        alert(
            "Today's workout is already completed! ✅"
        );

        return;
    }


    // Save workout
    history.push({

        title: workout.title,

        day: today,

        date: new Date().toISOString(),

        calories: workout.calories

    });


    localStorage.setItem(
        "workoutHistory",
        JSON.stringify(history)
    );


    alert(
        `Workout completed successfully! 💪\n\n` +
        `Calories: approximately ${workout.calories} kcal`
    );


    // Disable checkboxes after completion
    checkboxes.forEach(function (checkbox) {

        checkbox.disabled = true;

    });
}

// REST TIMER


let timerInterval;

let remainingSeconds = 60;


function startTimer() {

    clearInterval(timerInterval);

    timerInterval =
        setInterval(function () {

            remainingSeconds--;

            updateTimer();


            if (remainingSeconds <= 0) {

                clearInterval(timerInterval);

                alert(
                    "Rest time finished! You can continue your workout."
                );
            }

        }, 1000);
}


function resetTimer() {

    clearInterval(timerInterval);

    remainingSeconds = 60;

    updateTimer();
}


function updateTimer() {

    const timer =
        document.getElementById("timer");

    if (!timer) {
        return;
    }


    const minutes =
        Math.floor(
            remainingSeconds / 60
        );


    const seconds =
        remainingSeconds % 60;


    timer.textContent =
        `${minutes.toString().padStart(2, "0")}:` +
        `${seconds.toString().padStart(2, "0")}`;
}



// WEEKLY PLAN


function displayWeeklyPlan() {

    const container =
        document.getElementById(
            "weeklyWorkoutPlan"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    Object.keys(weeklyWorkouts).forEach(
        function (day) {

            const workout =
                weeklyWorkouts[day];


            const card =
                document.createElement("div");


            card.className =
                "weekly-day-card";


            let exercisesHTML = "";


            if (
                workout.exercises.length === 0
            ) {

                exercisesHTML = `
                    <p class="rest-day">
                        Rest and recovery day 😴
                    </p>
                `;

            } else {

                exercisesHTML = `
                    <ul>

                        ${workout.exercises
                            .map(function (exercise) {

                                return `
                                    <li>
                                        ${exercise.name}
                                        —
                                        ${exercise.sets}
                                        ×
                                        ${exercise.reps}
                                    </li>
                                `;

                            })
                            .join("")}

                    </ul>
                `;
            }


            card.innerHTML = `

                <div class="weekly-day-header">

                    <strong>
                        ${day}
                    </strong>

                    <span>
                        🏋️
                    </span>

                </div>

                <h3>
                    ${workout.title}
                </h3>

                ${exercisesHTML}

            `;


            container.appendChild(card);

        }
    );
}



// PAGE LOAD


document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTodayWorkout();

        displayWeeklyPlan();

        updateTimer();

    }
);



// WORKOUT COUNTDOWN TIMER


let workoutTimerInterval = null;
let workoutTimeLeft = 0;


// Start Workout Timer

function startWorkoutTimer() {

    // Prevent multiple timers
    if (workoutTimerInterval !== null) {
        return;
    }

    const minutesInput =
        document.getElementById("workoutMinutes");

    const secondsInput =
        document.getElementById("workoutSeconds");

    const timerDisplay =
        document.getElementById("workoutTimer");


    const minutes =
        Number(minutesInput.value) || 0;

    const seconds =
        Number(secondsInput.value) || 0;


    // Validate seconds

    if (seconds > 59) {

        alert("Seconds must be between 0 and 59.");

        return;
    }


    // Convert everything into seconds

    workoutTimeLeft =
        (minutes * 60) + seconds;


    if (workoutTimeLeft <= 0) {

        alert("Please enter a workout time.");

        return;
    }


    // Disable inputs while timer is running

    minutesInput.disabled = true;
    secondsInput.disabled = true;


    // 3 second countdown

    let countdown = 3;


    timerDisplay.textContent =
        countdown;


    const countdownInterval =
        setInterval(function () {

            countdown--;

            if (countdown > 0) {

                timerDisplay.textContent =
                    countdown;

            } else {

                clearInterval(countdownInterval);

                runWorkoutCountdown();

            }

        }, 1000);
}



// RUN TIMER


function runWorkoutCountdown() {

    const timerDisplay =
        document.getElementById("workoutTimer");


    updateWorkoutTimerDisplay();


    workoutTimerInterval =
        setInterval(function () {

            workoutTimeLeft--;

            updateWorkoutTimerDisplay();


            // Timer finished

            if (workoutTimeLeft <= 0) {

                clearInterval(
                    workoutTimerInterval
                );

                workoutTimerInterval = null;

                timerDisplay.textContent =
                    "00:00";


                alert(
                    "⏰ Workout time finished!"
                );


                enableWorkoutTimerInputs();

            }

        }, 1000);
}



// DISPLAY TIME


function updateWorkoutTimerDisplay() {

    const timerDisplay =
        document.getElementById("workoutTimer");


    const minutes =
        Math.floor(
            workoutTimeLeft / 60
        );


    const seconds =
        workoutTimeLeft % 60;


    timerDisplay.textContent =

        String(minutes).padStart(2, "0")
        + ":" +
        String(seconds).padStart(2, "0");
}



// RESET TIMER


function resetWorkoutTimer() {

    if (workoutTimerInterval !== null) {

        clearInterval(
            workoutTimerInterval
        );

        workoutTimerInterval = null;

    }


    workoutTimeLeft = 0;


    const minutesInput =
        document.getElementById(
            "workoutMinutes"
        );

    const secondsInput =
        document.getElementById(
            "workoutSeconds"
        );

    const timerDisplay =
        document.getElementById(
            "workoutTimer"
        );


    minutesInput.disabled = false;
    secondsInput.disabled = false;


    timerDisplay.textContent =
        "00:00";
}



// ENABLE INPUTS


function enableWorkoutTimerInputs() {

    const minutesInput =
        document.getElementById(
            "workoutMinutes"
        );

    const secondsInput =
        document.getElementById(
            "workoutSeconds"
        );


    minutesInput.disabled = false;
    secondsInput.disabled = false;
}
