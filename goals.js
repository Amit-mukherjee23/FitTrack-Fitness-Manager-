// =========================
// FITTRACK - GOALS
// =========================

const WEEKLY_GOAL = 6;
const CALORIE_GOAL = 1500;


// =========================
// GET WORKOUT HISTORY
// =========================

function getWorkoutHistory() {

    return JSON.parse(
        localStorage.getItem("workoutHistory")
    ) || [];

}


// =========================
// GET THIS WEEK'S WORKOUTS
// =========================

// =========================
// GET THIS WEEK'S WORKOUTS
// =========================

function getThisWeekWorkouts(history) {

    const today = new Date();

    const startOfWeek = new Date(today);

    startOfWeek.setDate(
        today.getDate() - today.getDay()
    );

    startOfWeek.setHours(0, 0, 0, 0);


    const endOfWeek = new Date(startOfWeek);

    endOfWeek.setDate(
        startOfWeek.getDate() + 7
    );


    return history.filter(function (workout) {

        if (!workout.date) {
            return false;
        }

        let workoutDate;


        // ISO format
        // Example: 2026-09-21T10:30:00
        if (workout.date.includes("T")) {

            workoutDate =
                new Date(workout.date);

        }


        // DD/MM/YYYY format
        // Example: 21/09/2026
        else if (workout.date.includes("/")) {

            const parts =
                workout.date.split("/");

            workoutDate = new Date(
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


// =========================
// UPDATE WEEKLY GOAL
// =========================

function updateWeeklyGoal(weeklyWorkouts) {

    const count =
        weeklyWorkouts.length;


    const percentage =
        Math.min(
            Math.round(
                (count / WEEKLY_GOAL) * 100
            ),
            100
        );


    const text =
        document.getElementById(
            "weeklyGoalText"
        );

    const percent =
        document.getElementById(
            "weeklyGoalPercentage"
        );

    const bar =
        document.getElementById(
            "weeklyGoalBar"
        );

    const status =
        document.getElementById(
            "weeklyGoalStatus"
        );


    if (text) {
        text.textContent =
            `${count} / ${WEEKLY_GOAL} workouts`;
    }


    if (percent) {
        percent.textContent =
            `${percentage}%`;
    }


    if (bar) {
        bar.style.width =
            `${percentage}%`;
    }


    if (status) {

        if (count === 0) {

            status.textContent =
                "Start your first workout!";

        }

        else if (count < WEEKLY_GOAL) {

            status.textContent =
                `${WEEKLY_GOAL - count} more workout(s) to reach your weekly goal.`;

        }

        else {

            status.textContent =
                "Weekly workout goal completed! 🎉";

        }

    }

}


// =========================
// UPDATE CALORIE GOAL
// =========================

function updateCalorieGoal(weeklyWorkouts) {

    let calories = 0;


    weeklyWorkouts.forEach(function (workout) {

        calories +=
            Number(workout.calories) || 0;

    });


    const percentage =
        Math.min(
            Math.round(
                (calories / CALORIE_GOAL) * 100
            ),
            100
        );


    const text =
        document.getElementById(
            "calorieGoalText"
        );

    const percent =
        document.getElementById(
            "calorieGoalPercentage"
        );

    const bar =
        document.getElementById(
            "calorieGoalBar"
        );

    const status =
        document.getElementById(
            "calorieGoalStatus"
        );


    if (text) {

        text.textContent =
            `${calories} / ${CALORIE_GOAL} calories`;

    }


    if (percent) {

        percent.textContent =
            `${percentage}%`;

    }


    if (bar) {

        bar.style.width =
            `${percentage}%`;

    }


    if (status) {

        if (calories === 0) {

            status.textContent =
                "Complete a workout to start tracking.";

        }

        else if (calories < CALORIE_GOAL) {

            status.textContent =
                "Keep building healthy workout consistency.";

        }

        else {

            status.textContent =
                "Weekly calorie goal reached! 🎉";

        }

    }

}


// =========================
// UPDATE CONSISTENCY GOAL
// =========================

function updateConsistencyGoal(weeklyWorkouts) {

    const count =
        weeklyWorkouts.length;


    const percentage =
        Math.min(
            Math.round(
                (count / WEEKLY_GOAL) * 100
            ),
            100
        );


    const text =
        document.getElementById(
            "consistencyGoalText"
        );

    const percent =
        document.getElementById(
            "consistencyGoalPercentage"
        );

    const bar =
        document.getElementById(
            "consistencyGoalBar"
        );

    const status =
        document.getElementById(
            "consistencyGoalStatus"
        );


    if (text) {

        text.textContent =
            `${count} workout day${count === 1 ? "" : "s"}`;

    }


    if (percent) {

        percent.textContent =
            `${percentage}%`;

    }


    if (bar) {

        bar.style.width =
            `${percentage}%`;

    }


    if (status) {

        if (count === 0) {

            status.textContent =
                "Complete workouts regularly to build consistency.";

        }

        else if (count < WEEKLY_GOAL) {

            status.textContent =
                "Keep going and build a regular workout habit.";

        }

        else {

            status.textContent =
                "Great consistency this week! 🎉";

        }

    }

}


// =========================
// LOAD GOALS
// =========================

function loadGoals() {

    const history =
        getWorkoutHistory();


    const weeklyWorkouts =
        getThisWeekWorkouts(history);


    updateWeeklyGoal(
        weeklyWorkouts
    );


    updateCalorieGoal(
        weeklyWorkouts
    );


    updateConsistencyGoal(
        weeklyWorkouts
    );

}


// =========================
// PAGE LOAD
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadGoals();

    }
);
