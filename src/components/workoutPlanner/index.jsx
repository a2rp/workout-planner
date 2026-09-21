import { useEffect, useMemo, useRef, useState } from "react";

import ConfirmModal from "../ConfirmModal";
import Header from "../Header";
import Stats from "../Stats";
import WorkoutForm from "../WorkoutForm";
import WorkoutList from "../WorkoutList";

import { Styled } from "./styled";

const STORAGE_KEY = "workout-planner.v1";

const createId = () =>
    `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const loadWorkouts = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return [];
        }

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter(
            (workout) =>
                workout &&
                typeof workout === "object" &&
                typeof workout.id !== "undefined" &&
                typeof workout.title === "string",
        );
    } catch {
        return [];
    }
};

const WorkoutPlanner = () => {
    const formSectionRef = useRef(null);

    const [workouts, setWorkouts] = useState(loadWorkouts);

    const [query, setQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterCategory, setFilterCategory] = useState("All");
    const [sortBy, setSortBy] = useState("created");

    const [editingId, setEditingId] = useState(null);

    const [deleteWorkout, setDeleteWorkout] = useState(null);

    const [storageError, setStorageError] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));

            setStorageError(false);
        } catch {
            setStorageError(true);
        }
    }, [workouts]);

    const categories = useMemo(() => {
        return Array.from(
            new Set(
                workouts
                    .map((workout) => workout.category?.trim())
                    .filter(Boolean),
            ),
        ).sort((a, b) => a.localeCompare(b));
    }, [workouts]);

    const stats = useMemo(() => {
        return {
            total: workouts.length,

            planned: workouts.filter((workout) => workout.status === "Planned")
                .length,

            done: workouts.filter((workout) => workout.status === "Done")
                .length,
        };
    }, [workouts]);

    const filteredWorkouts = useMemo(() => {
        let result = [...workouts];

        if (filterStatus !== "All") {
            result = result.filter(
                (workout) => workout.status === filterStatus,
            );
        }

        if (filterCategory !== "All") {
            result = result.filter(
                (workout) => workout.category === filterCategory,
            );
        }

        const normalizedQuery = query.trim().toLowerCase();

        if (normalizedQuery) {
            result = result.filter((workout) => {
                const title = (workout.title || "").toLowerCase();

                const category = (workout.category || "").toLowerCase();

                const notes = (workout.notes || "").toLowerCase();

                const exerciseMatch = Array.isArray(workout.exercises)
                    ? workout.exercises.some((exercise) =>
                          (exercise.name || "")
                              .toLowerCase()
                              .includes(normalizedQuery),
                      )
                    : false;

                return (
                    title.includes(normalizedQuery) ||
                    category.includes(normalizedQuery) ||
                    notes.includes(normalizedQuery) ||
                    exerciseMatch
                );
            });
        }

        switch (sortBy) {
            case "date":
                result.sort(
                    (a, b) =>
                        new Date(`${a.date || "9999-12-31"}T00:00:00`) -
                        new Date(`${b.date || "9999-12-31"}T00:00:00`),
                );
                break;

            case "title":
                result.sort((a, b) =>
                    (a.title || "").localeCompare(b.title || ""),
                );
                break;

            case "duration":
                result.sort(
                    (a, b) =>
                        (Number(b.duration) || 0) - (Number(a.duration) || 0),
                );
                break;

            case "status": {
                const statusOrder = {
                    Planned: 0,
                    Done: 1,
                };

                result.sort((a, b) => {
                    const statusDifference =
                        (statusOrder[a.status] ?? 99) -
                        (statusOrder[b.status] ?? 99);

                    if (statusDifference !== 0) {
                        return statusDifference;
                    }

                    return (a.title || "").localeCompare(b.title || "");
                });

                break;
            }

            default:
                result.sort(
                    (a, b) =>
                        (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0),
                );
        }

        return result;
    }, [workouts, query, filterStatus, filterCategory, sortBy]);

    const addWorkout = (values) => {
        const now = Date.now();

        const workout = {
            id: createId(),

            ...values,

            status: values.status === "Done" ? "Done" : "Planned",

            exercises: Array.isArray(values.exercises) ? values.exercises : [],

            createdAt: now,
            updatedAt: now,

            completedAt: values.status === "Done" ? getToday() : "",
        };

        setWorkouts((current) => [workout, ...current]);

        return true;
    };

    const saveWorkout = (id, values) => {
        setWorkouts((current) =>
            current.map((workout) => {
                if (workout.id !== id) {
                    return workout;
                }

                const completedAt =
                    values.status === "Done"
                        ? workout.completedAt || getToday()
                        : "";

                return {
                    ...workout,
                    ...values,

                    exercises: Array.isArray(values.exercises)
                        ? values.exercises
                        : [],

                    completedAt,
                    updatedAt: Date.now(),
                };
            }),
        );

        setEditingId(null);

        return true;
    };

    const toggleStatus = (id, status) => {
        setWorkouts((current) =>
            current.map((workout) =>
                workout.id === id
                    ? {
                          ...workout,

                          status,

                          completedAt:
                              status === "Done"
                                  ? workout.completedAt || getToday()
                                  : "",

                          updatedAt: Date.now(),
                      }
                    : workout,
            ),
        );
    };

    const duplicateWorkout = (id) => {
        const source = workouts.find((workout) => workout.id === id);

        if (!source) {
            return;
        }

        const now = Date.now();

        const duplicate = {
            ...source,

            id: createId(),

            title: `${source.title} (copy)`,

            status: "Planned",
            completedAt: "",

            exercises: Array.isArray(source.exercises)
                ? source.exercises.map((exercise) => ({
                      ...exercise,
                      id: createId(),
                  }))
                : [],

            createdAt: now,
            updatedAt: now,
        };

        setWorkouts((current) => [duplicate, ...current]);
    };

    const requestDelete = (id) => {
        const workout = workouts.find((item) => item.id === id);

        if (!workout) {
            return;
        }

        setDeleteWorkout(workout);
    };

    const confirmDelete = () => {
        if (!deleteWorkout) {
            return;
        }

        setWorkouts((current) =>
            current.filter((workout) => workout.id !== deleteWorkout.id),
        );

        if (editingId === deleteWorkout.id) {
            setEditingId(null);
        }

        setDeleteWorkout(null);
    };

    const clearFilters = () => {
        setQuery("");
        setFilterStatus("All");
        setFilterCategory("All");
        setSortBy("created");
    };

    const scrollToForm = () => {
        formSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const hasActiveFilters =
        Boolean(query.trim()) ||
        filterStatus !== "All" ||
        filterCategory !== "All";

    return (
        <Styled.Page>
            <Styled.Container>
                <Header />

                <Stats
                    total={stats.total}
                    planned={stats.planned}
                    done={stats.done}
                />

                <Styled.FormSection ref={formSectionRef}>
                    <WorkoutForm
                        categories={categories}
                        onSubmit={addWorkout}
                    />
                </Styled.FormSection>

                <Styled.Toolbar>
                    <Styled.ToolbarTop>
                        <div>
                            <Styled.SectionLabel>
                                Your Workouts
                            </Styled.SectionLabel>

                            <Styled.SectionTitle>
                                Workout library
                            </Styled.SectionTitle>
                        </div>

                        <Styled.ResultCount>
                            {filteredWorkouts.length}{" "}
                            {filteredWorkouts.length === 1
                                ? "workout"
                                : "workouts"}
                        </Styled.ResultCount>
                    </Styled.ToolbarTop>

                    <Styled.Controls>
                        <Styled.SearchInput
                            type="search"
                            placeholder="Search workouts..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            aria-label="Search workouts"
                        />

                        <Styled.Select
                            value={filterStatus}
                            onChange={(event) =>
                                setFilterStatus(event.target.value)
                            }
                            aria-label="Filter by status"
                        >
                            <option value="All">All statuses</option>

                            <option value="Planned">Planned</option>

                            <option value="Done">Done</option>
                        </Styled.Select>

                        <Styled.Select
                            value={filterCategory}
                            onChange={(event) =>
                                setFilterCategory(event.target.value)
                            }
                            aria-label="Filter by category"
                        >
                            <option value="All">All categories</option>

                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Styled.Select>

                        <Styled.Select
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value)}
                            aria-label="Sort workouts"
                        >
                            <option value="created">Newest</option>

                            <option value="date">Date</option>

                            <option value="title">Title A-Z</option>

                            <option value="duration">Duration</option>

                            <option value="status">Status</option>
                        </Styled.Select>

                        {hasActiveFilters && (
                            <Styled.ClearButton
                                type="button"
                                onClick={clearFilters}
                            >
                                Clear
                            </Styled.ClearButton>
                        )}
                    </Styled.Controls>
                </Styled.Toolbar>

                <WorkoutList
                    workouts={filteredWorkouts}
                    allWorkoutsCount={workouts.length}
                    editingId={editingId}
                    categories={categories}
                    onToggleStatus={toggleStatus}
                    onDuplicate={duplicateWorkout}
                    onEdit={setEditingId}
                    onDelete={requestDelete}
                    onSaveEdit={saveWorkout}
                    onCancelEdit={() => setEditingId(null)}
                    onCreate={scrollToForm}
                    onClearFilters={clearFilters}
                />

                <Styled.StorageNote $error={storageError}>
                    {storageError
                        ? "Browser storage could not be updated. Your latest changes may not persist after refresh."
                        : "Your workout data is stored locally in this browser."}
                </Styled.StorageNote>

                <ConfirmModal
                    isOpen={Boolean(deleteWorkout)}
                    title="Delete workout?"
                    message={
                        deleteWorkout
                            ? `"${deleteWorkout.title}" and all of its exercises will be permanently removed from this browser.`
                            : ""
                    }
                    confirmLabel="Delete"
                    cancelLabel="Cancel"
                    danger
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteWorkout(null)}
                />
            </Styled.Container>
        </Styled.Page>
    );
};

export default WorkoutPlanner;
