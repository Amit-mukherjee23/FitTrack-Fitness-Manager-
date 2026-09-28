// =========================
// PROGRESS PAGE
// =========================

document.addEventListener("DOMContentLoaded", function () {
    loadProgress();
    loadWeight();
    displayHistory();
    displayWeeklyPlan();
    displayWeightHistory();
});


// =========================
// LOAD PROGRESS
// =========================

function loadProgress() {
    const history = JSON.parse(localStorage.getItem("workoutHistory")) || [];

    // Total workouts
    document.getElementById("totalWorkouts").textContent = history.length;

    // Weekly workouts
    const weeklyWorkouts = getThisWeekWorkouts(history);
    document.getElementById("weeklyWorkouts").textContent =
        weeklyWorkouts.length;

    // Goal progress
    // Goal = 6 workouts per week
    let goal = Math.min(
        Math.round((weeklyWorkouts.length / 6) * 100),
        100
    );

    document.getElementById("goalProgress").textContent = goal;
    const progressFill =
    document.querySelector(".progress-fill");

if (progressFill) {
    progressFill.style.width = goal + "%";
}

    // Calories
    let totalCalories = 0;

    history.forEach(function (workout) {
        totalCalories += Number(workout.calories) || 0;
    });

    document.getElementById("totalCalories").textContent =
        totalCalories;
}


// =========================
// THIS WEEK WORKOUTS
// =========================

function getThisWeekWorkouts(history) {
    const today = new Date();

    // Get Sunday of current week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return history.filter(function (workout) {

        let workoutDate;

        // New ISO date format
        if (workout.date && workout.date.includes("T")) {
            workoutDate = new Date(workout.date);
        } 
        // Old Indian date format: DD/MM/YYYY
        else if (workout.date && workout.date.includes("/")) {
            const parts = workout.date.split("/");

            workoutDate = new Date(
                Number(parts[2]),
                Number(parts[1]) - 1,
                Number(parts[0])
            );
        } 
        else {
            return false;
        }

        return workoutDate >= startOfWeek &&
               workoutDate < endOfWeek;
    });
}



// =========================
// DISPLAY WORKOUT HISTORY
// =========================

function displayHistory() {

    const history =
        JSON.parse(
            localStorage.getItem("workoutHistory")
        ) || [];

    const container =
        document.getElementById(
            "workoutHistoryList"
        );

    if (!container) {
        return;
    }

    // No workout history
    if (history.length === 0) {

        container.innerHTML = `
            <div class="history-row">
                <span colspan="4">
                    No workouts completed yet.
                </span>
            </div>
        `;

        return;
    }

    container.innerHTML = "";

    // Latest workout first
    const reversedHistory =
        [...history].reverse();

    reversedHistory.forEach(function (workout) {

        let calories =
            Number(workout.calories) || 0;

        let dateText =
            workout.date || "-";

        // Convert ISO date
        if (
            workout.date &&
            workout.date.includes("T")
        ) {

            dateText =
                new Date(
                    workout.date
                ).toLocaleDateString();

        }

        const workoutName =
            workout.title ||
            workout.workout ||
            workout.name ||
            "Workout";

        const row =
            document.createElement("div");

        row.className =
            "history-row";

        row.innerHTML = `
            <span>
                ${dateText}
            </span>

            <span>
                ${workoutName}
            </span>

            <span>
                🔥 ${calories} kcal
            </span>

            <span>
                <span class="status-completed">
                    Completed
                </span>
            </span>
        `;

        container.appendChild(row);

    });
}


// =========================
// SAVE WEIGHT
// =========================

function saveWeight() {
  const weightInput =
        document.getElementById("weightInput");

    const weight =
        weightInput.value.trim();

    if (!weight) {
        alert("Please enter your weight.");
        return;
    }

    // Get existing weight history
    const weightHistory =
        JSON.parse(
            localStorage.getItem("weightHistory")
        ) || [];

    // Create new weight entry
    const newWeight = {
        date: new Date().toISOString(),
        weight: Number(weight)
    };

    // Add new entry
    weightHistory.push(newWeight);

    // Save complete history
    localStorage.setItem(
        "weightHistory",
        JSON.stringify(weightHistory)
    );

    // Show latest weight
    document.getElementById(
        "savedWeight"
    ).textContent =
        `Current weight: ${weight} kg`;

    // Clear input
    weightInput.value = "";

    // Refresh weight history
    displayWeightHistory();
}


// =========================
// LOAD WEIGHT
// =========================

function loadWeight() {

    const savedWeight = localStorage.getItem("userWeight");

    if (savedWeight) {
        document.getElementById("savedWeight").textContent =
            `Current weight: ${savedWeight} kg`;
    }
}


// =========================
// WEEKLY WORKOUT PLAN
// =========================

function displayWeeklyPlan() {

    const container = document.getElementById("weeklyPlan");

    const weeklyPlan = [
        {
            day: "Sunday",
            title: "Rest Day",
            icon: "😴",
            exercises: []
        },
        {
            day: "Monday",
            title: "Chest + Triceps",
            icon: "🏋️",
            exercises: [
                "Bench Press — 3 × 10",
                "Incline Dumbbell Press — 3 × 10",
                "Push Ups — 3 × 12",
                "Triceps Extension — 3 × 10",
                "Triceps Pushdown — 3 × 12"
            ]
        },
        {
            day: "Tuesday",
            title: "Back + Biceps",
            icon: "💪",
            exercises: [
                "Lat Pulldown — 3 × 10",
                "Seated Cable Row — 3 × 10",
                "Dumbbell Row — 3 × 10",
                "Dumbbell Curl — 3 × 12",
                "Hammer Curl — 3 × 12"
            ]
        },
        {
            day: "Wednesday",
            title: "Leg Day",
            icon: "🦵",
            exercises: [
                "Squats — 3 × 10",
                "Leg Press — 3 × 10",
                "Leg Extension — 3 × 12",
                "Leg Curl — 3 × 12",
                "Calf Raises — 3 × 15"
            ]
        },
        {
            day: "Thursday",
            title: "Shoulders + Abs",
            icon: "🔥",
            exercises: [
                "Shoulder Press — 3 × 10",
                "Lateral Raises — 3 × 12",
                "Front Raises — 3 × 12",
                "Plank — 3 × 30 sec",
                "Crunches — 3 × 15"
            ]
        },
        {
            day: "Friday",
            title: "Full Body",
            icon: "⚡",
            exercises: [
                "Bodyweight Squats — 3 × 12",
                "Push Ups — 3 × 12",
                "Dumbbell Row — 3 × 10",
                "Shoulder Press — 3 × 10",
                "Plank — 3 × 30 sec"
            ]
        },
        {
            day: "Saturday",
            title: "Cardio + Core",
            icon: "🏃",
            exercises: [
                "Brisk Walking — 15 min",
                "Cycling — 15 min",
                "Jumping Jacks — 3 × 20",
                "Plank — 3 × 30 sec",
                "Mountain Climbers — 3 × 15"
            ]
        }
    ];

    container.innerHTML = "";

    weeklyPlan.forEach(function (workout) {

        const card = document.createElement("div");

        card.className = "weekly-day-card";

        let exerciseHTML = "";

        if (workout.exercises.length === 0) {

            exerciseHTML = `
                <p class="rest-day">
                    Take a proper rest and recover.
                </p>
            `;

        } else {

            exerciseHTML = `
                <ul>
                    ${workout.exercises
                        .map(exercise => `<li>${exercise}</li>`)
                        .join("")}
                </ul>
            `;
        }

        card.innerHTML = `
            <div class="weekly-day-header">
                <strong>${workout.day}</strong>
                <span>${workout.icon}</span>
            </div>

            <h3>${workout.title}</h3>

            ${exerciseHTML}
        `;

        container.appendChild(card);
    });
}

function displayWeightHistory() {

    const container =
        document.getElementById("weightHistoryList");

    if (!container) {
        return;
    }

    const weightHistory =
        JSON.parse(
            localStorage.getItem("weightHistory")
        ) || [];

    if (weightHistory.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                No weight records yet.
            </p>
        `;

        return;
    }

    container.innerHTML = "";

    // Latest entry first
    const reversedHistory =
        [...weightHistory].reverse();

    reversedHistory.forEach(function (entry, index) {

        const date =
            new Date(entry.date)
                .toLocaleDateString("en-IN");

        let changeText = "—";

        // Compare with previous recorded weight
        if (index < reversedHistory.length - 1) {

            const previousWeight =
                Number(
                    reversedHistory[index + 1].weight
                );

            const currentWeight =
                Number(entry.weight);

            const difference =
                currentWeight - previousWeight;

            if (difference > 0) {
                changeText =
                    `+${difference.toFixed(1)} kg`;
            }

            else if (difference < 0) {
                changeText =
                    `${difference.toFixed(1)} kg`;
            }

            else {
                changeText = "0 kg";
            }
        }

        const row =
            document.createElement("div");

        row.className = "history-row";

        row.innerHTML = `
            <span>
                ${date}
            </span>

            <span>
                ${entry.weight} kg
            </span>

            <span>
                ${changeText}
            </span>
        `;

        container.appendChild(row);
    });
}
