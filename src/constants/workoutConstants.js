export const STORAGE_KEY = "workout-planner.v1";

export const WORKOUT_STATUS = {
    PLANNED: "Planned",
    DONE: "Done",
};

export const WORKOUT_STATUSES = [WORKOUT_STATUS.PLANNED, WORKOUT_STATUS.DONE];

export const FILTER_ALL = "All";

export const SORT_OPTIONS = {
    CREATED: "created",
    DATE: "date",
    TITLE: "title",
    DURATION: "duration",
    STATUS: "status",
};

export const DEFAULT_WORKOUT = {
    title: "",
    date: "",
    category: "",
    status: WORKOUT_STATUS.PLANNED,
    duration: "",
    notes: "",
    exercises: [],
    completedAt: "",
};

export const DEFAULT_EXERCISE = {
    name: "",
    sets: "",
    reps: "",
    weight: "",
    time: "",
};
