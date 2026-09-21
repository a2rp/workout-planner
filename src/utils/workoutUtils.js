import {
    FILTER_ALL,
    SORT_OPTIONS,
    WORKOUT_STATUS,
} from "../constants/workoutConstants";

export const createId = () => {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
};

export const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const formatWorkoutDate = (value) => {
    if (!value) {
        return "No date";
    }

    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export const normalizeExercise = (exercise = {}) => ({
    id: exercise.id || createId(),

    name: typeof exercise.name === "string" ? exercise.name : "",

    sets:
        exercise.sets !== undefined && exercise.sets !== null
            ? String(exercise.sets)
            : "",

    reps:
        exercise.reps !== undefined && exercise.reps !== null
            ? String(exercise.reps)
            : "",

    weight:
        exercise.weight !== undefined && exercise.weight !== null
            ? String(exercise.weight)
            : "",

    time:
        exercise.time !== undefined && exercise.time !== null
            ? String(exercise.time)
            : "",
});

export const normalizeWorkout = (workout = {}) => ({
    ...workout,

    id: workout.id || createId(),

    title: typeof workout.title === "string" ? workout.title : "",

    date: typeof workout.date === "string" ? workout.date : "",

    category: typeof workout.category === "string" ? workout.category : "",

    status:
        workout.status === WORKOUT_STATUS.DONE
            ? WORKOUT_STATUS.DONE
            : WORKOUT_STATUS.PLANNED,

    duration:
        workout.duration !== undefined && workout.duration !== null
            ? String(workout.duration)
            : "",

    notes: typeof workout.notes === "string" ? workout.notes : "",

    exercises: Array.isArray(workout.exercises)
        ? workout.exercises.map(normalizeExercise)
        : [],

    completedAt:
        typeof workout.completedAt === "string" ? workout.completedAt : "",

    createdAt: Number(workout.createdAt) || Date.now(),

    updatedAt: Number(workout.updatedAt) || Date.now(),
});

export const validateStoredWorkouts = (value) => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .filter(
            (workout) =>
                workout &&
                typeof workout === "object" &&
                typeof workout.title === "string",
        )
        .map(normalizeWorkout);
};

export const getWorkoutCategories = (workouts = []) => {
    return Array.from(
        new Set(
            workouts.map((workout) => workout.category?.trim()).filter(Boolean),
        ),
    ).sort((a, b) => a.localeCompare(b));
};

export const getWorkoutStats = (workouts = []) => {
    const total = workouts.length;

    const planned = workouts.filter(
        (workout) => workout.status === WORKOUT_STATUS.PLANNED,
    ).length;

    const done = workouts.filter(
        (workout) => workout.status === WORKOUT_STATUS.DONE,
    ).length;

    const completion = total > 0 ? Math.round((done / total) * 100) : 0;

    return {
        total,
        planned,
        done,
        completion,
    };
};

export const filterWorkouts = ({
    workouts = [],
    query = "",
    status = FILTER_ALL,
    category = FILTER_ALL,
}) => {
    const normalizedQuery = query.trim().toLowerCase();

    return workouts.filter((workout) => {
        if (status !== FILTER_ALL && workout.status !== status) {
            return false;
        }

        if (category !== FILTER_ALL && workout.category !== category) {
            return false;
        }

        if (!normalizedQuery) {
            return true;
        }

        const searchableText = [workout.title, workout.category, workout.notes]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const exerciseMatch = Array.isArray(workout.exercises)
            ? workout.exercises.some((exercise) =>
                  (exercise.name || "").toLowerCase().includes(normalizedQuery),
              )
            : false;

        return searchableText.includes(normalizedQuery) || exerciseMatch;
    });
};

export const sortWorkouts = (workouts = [], sortBy = SORT_OPTIONS.CREATED) => {
    const sorted = [...workouts];

    switch (sortBy) {
        case SORT_OPTIONS.DATE:
            return sorted.sort((a, b) => {
                const aDate = a.date
                    ? new Date(`${a.date}T00:00:00`).getTime()
                    : Number.MAX_SAFE_INTEGER;

                const bDate = b.date
                    ? new Date(`${b.date}T00:00:00`).getTime()
                    : Number.MAX_SAFE_INTEGER;

                return aDate - bDate;
            });

        case SORT_OPTIONS.TITLE:
            return sorted.sort((a, b) =>
                (a.title || "").localeCompare(b.title || ""),
            );

        case SORT_OPTIONS.DURATION:
            return sorted.sort(
                (a, b) => (Number(b.duration) || 0) - (Number(a.duration) || 0),
            );

        case SORT_OPTIONS.STATUS:
            return sorted.sort((a, b) => {
                const order = {
                    [WORKOUT_STATUS.PLANNED]: 0,
                    [WORKOUT_STATUS.DONE]: 1,
                };

                const difference =
                    (order[a.status] ?? 99) - (order[b.status] ?? 99);

                if (difference !== 0) {
                    return difference;
                }

                return (a.title || "").localeCompare(b.title || "");
            });

        case SORT_OPTIONS.CREATED:
        default:
            return sorted.sort(
                (a, b) =>
                    (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0),
            );
    }
};

export const createWorkout = (values) => {
    const now = Date.now();

    const status =
        values.status === WORKOUT_STATUS.DONE
            ? WORKOUT_STATUS.DONE
            : WORKOUT_STATUS.PLANNED;

    return normalizeWorkout({
        ...values,

        id: createId(),

        title: values.title?.trim() || "",

        category: values.category?.trim() || "",

        notes: values.notes?.trim() || "",

        status,

        completedAt: status === WORKOUT_STATUS.DONE ? getToday() : "",

        createdAt: now,
        updatedAt: now,
    });
};

export const updateWorkout = (workout, values) => {
    const status =
        values.status === WORKOUT_STATUS.DONE
            ? WORKOUT_STATUS.DONE
            : WORKOUT_STATUS.PLANNED;

    return normalizeWorkout({
        ...workout,
        ...values,

        title: values.title?.trim() || "",

        category: values.category?.trim() || "",

        notes: values.notes?.trim() || "",

        status,

        completedAt:
            status === WORKOUT_STATUS.DONE
                ? workout.completedAt || getToday()
                : "",

        updatedAt: Date.now(),
    });
};

export const duplicateWorkout = (workout) => {
    const now = Date.now();

    return normalizeWorkout({
        ...workout,

        id: createId(),

        title: `${workout.title} (copy)`,

        status: WORKOUT_STATUS.PLANNED,

        completedAt: "",

        exercises: Array.isArray(workout.exercises)
            ? workout.exercises.map((exercise) => ({
                  ...exercise,
                  id: createId(),
              }))
            : [],

        createdAt: now,
        updatedAt: now,
    });
};
