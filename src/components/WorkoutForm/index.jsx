import { useEffect, useId, useState } from "react";
import { Styled } from "./styled";

const createId = () =>
    `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const createEmptyForm = () => ({
    title: "",
    date: getToday(),
    category: "",
    status: "Planned",
    duration: "",
    notes: "",
    exercises: [],
});

const normalizeValues = (values) => ({
    ...createEmptyForm(),
    ...values,
    exercises: Array.isArray(values?.exercises) ? values.exercises : [],
});

const WorkoutForm = ({
    mode = "create",
    initialValues,
    categories = [],
    onSubmit,
    onCancel,
}) => {
    const datalistId = useId();

    const [form, setForm] = useState(() => normalizeValues(initialValues));

    const [exercise, setExercise] = useState({
        name: "",
        sets: "",
        reps: "",
        weight: "",
        time: "",
    });

    useEffect(() => {
        setForm(normalizeValues(initialValues));
    }, [initialValues]);

    const updateField = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const updateExerciseField = (field, value) => {
        setExercise((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const addExercise = () => {
        const name = exercise.name.trim();

        if (!name) {
            return;
        }

        const newExercise = {
            id: createId(),
            name,
            sets: exercise.sets.trim(),
            reps: exercise.reps.trim(),
            weight: exercise.weight.trim(),
            time: exercise.time.trim(),
        };

        setForm((current) => ({
            ...current,
            exercises: [...current.exercises, newExercise],
        }));

        setExercise({
            name: "",
            sets: "",
            reps: "",
            weight: "",
            time: "",
        });
    };

    const removeExercise = (exerciseId) => {
        setForm((current) => ({
            ...current,
            exercises: current.exercises.filter(
                (item) => item.id !== exerciseId,
            ),
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const title = form.title.trim();

        if (!title) {
            return;
        }

        const values = {
            ...form,
            title,
            category: form.category.trim(),
            duration: form.duration.trim(),
            notes: form.notes.trim(),
        };

        const success = onSubmit?.(values);

        if (mode === "create" && success !== false) {
            setForm(createEmptyForm());

            setExercise({
                name: "",
                sets: "",
                reps: "",
                weight: "",
                time: "",
            });
        }
    };

    return (
        <Styled.Wrapper onSubmit={handleSubmit}>
            <Styled.FormHeader>
                <div>
                    <Styled.FormLabel>
                        {mode === "edit" ? "Edit Workout" : "New Workout"}
                    </Styled.FormLabel>

                    <Styled.FormTitle>
                        {mode === "edit" ? "Update workout" : "Create workout"}
                    </Styled.FormTitle>
                </div>

                {mode === "edit" && (
                    <Styled.CancelTopButton type="button" onClick={onCancel}>
                        Close
                    </Styled.CancelTopButton>
                )}
            </Styled.FormHeader>

            <Styled.Grid>
                <Styled.Field $wide>
                    <Styled.Label htmlFor={`${datalistId}-title`}>
                        Workout title
                    </Styled.Label>

                    <Styled.Input
                        id={`${datalistId}-title`}
                        type="text"
                        placeholder="Push day, Leg day..."
                        value={form.title}
                        onChange={(event) =>
                            updateField("title", event.target.value)
                        }
                        autoComplete="off"
                        required
                    />
                </Styled.Field>

                <Styled.Field>
                    <Styled.Label htmlFor={`${datalistId}-date`}>
                        Date
                    </Styled.Label>

                    <Styled.Input
                        id={`${datalistId}-date`}
                        type="date"
                        value={form.date}
                        onChange={(event) =>
                            updateField("date", event.target.value)
                        }
                    />
                </Styled.Field>

                <Styled.Field>
                    <Styled.Label htmlFor={`${datalistId}-category`}>
                        Category
                    </Styled.Label>

                    <Styled.Input
                        id={`${datalistId}-category`}
                        type="text"
                        placeholder="Strength"
                        value={form.category}
                        list={`${datalistId}-categories`}
                        onChange={(event) =>
                            updateField("category", event.target.value)
                        }
                        autoComplete="off"
                    />

                    <datalist id={`${datalistId}-categories`}>
                        {categories.map((category) => (
                            <option key={category} value={category} />
                        ))}
                    </datalist>
                </Styled.Field>

                <Styled.Field>
                    <Styled.Label htmlFor={`${datalistId}-duration`}>
                        Duration
                    </Styled.Label>

                    <Styled.Input
                        id={`${datalistId}-duration`}
                        type="number"
                        min="0"
                        step="1"
                        placeholder="60"
                        value={form.duration}
                        onChange={(event) =>
                            updateField("duration", event.target.value)
                        }
                    />

                    <Styled.Hint>Minutes</Styled.Hint>
                </Styled.Field>

                <Styled.Field>
                    <Styled.Label htmlFor={`${datalistId}-status`}>
                        Status
                    </Styled.Label>

                    <Styled.Select
                        id={`${datalistId}-status`}
                        value={form.status}
                        onChange={(event) =>
                            updateField("status", event.target.value)
                        }
                    >
                        <option value="Planned">Planned</option>

                        <option value="Done">Done</option>
                    </Styled.Select>
                </Styled.Field>
            </Styled.Grid>

            <Styled.Divider />

            <Styled.ExerciseArea>
                <Styled.SectionHeader>
                    <div>
                        <Styled.SectionLabel>Exercises</Styled.SectionLabel>

                        <Styled.SectionText>
                            Add exercises to this workout.
                        </Styled.SectionText>
                    </div>

                    <Styled.ExerciseCount>
                        {form.exercises.length}
                    </Styled.ExerciseCount>
                </Styled.SectionHeader>

                <Styled.ExerciseGrid>
                    <Styled.Field $exerciseName>
                        <Styled.Label>Exercise</Styled.Label>

                        <Styled.Input
                            type="text"
                            placeholder="Squats"
                            value={exercise.name}
                            onChange={(event) =>
                                updateExerciseField("name", event.target.value)
                            }
                        />
                    </Styled.Field>

                    <Styled.Field>
                        <Styled.Label>Sets</Styled.Label>

                        <Styled.Input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="4"
                            value={exercise.sets}
                            onChange={(event) =>
                                updateExerciseField("sets", event.target.value)
                            }
                        />
                    </Styled.Field>

                    <Styled.Field>
                        <Styled.Label>Reps</Styled.Label>

                        <Styled.Input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="10"
                            value={exercise.reps}
                            onChange={(event) =>
                                updateExerciseField("reps", event.target.value)
                            }
                        />
                    </Styled.Field>

                    <Styled.Field>
                        <Styled.Label>Weight</Styled.Label>

                        <Styled.Input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="40"
                            value={exercise.weight}
                            onChange={(event) =>
                                updateExerciseField(
                                    "weight",
                                    event.target.value,
                                )
                            }
                        />
                    </Styled.Field>

                    <Styled.Field>
                        <Styled.Label>Time</Styled.Label>

                        <Styled.Input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="10"
                            value={exercise.time}
                            onChange={(event) =>
                                updateExerciseField("time", event.target.value)
                            }
                        />
                    </Styled.Field>

                    <Styled.AddExerciseButton
                        type="button"
                        onClick={addExercise}
                        disabled={!exercise.name.trim()}
                    >
                        Add
                    </Styled.AddExerciseButton>
                </Styled.ExerciseGrid>

                {form.exercises.length === 0 ? (
                    <Styled.NoExercises>
                        No exercises added yet.
                    </Styled.NoExercises>
                ) : (
                    <Styled.AddedExercises>
                        {form.exercises.map((item, index) => (
                            <Styled.AddedExercise
                                key={item.id || `${item.name}-${index}`}
                            >
                                <Styled.ExerciseNumber>
                                    {String(index + 1).padStart(2, "0")}
                                </Styled.ExerciseNumber>

                                <Styled.ExerciseInfo>
                                    <strong>{item.name}</strong>

                                    <span>
                                        {[
                                            item.sets && `${item.sets} sets`,
                                            item.reps && `${item.reps} reps`,
                                            item.weight && `${item.weight} kg`,
                                            item.time && `${item.time} min`,
                                        ]
                                            .filter(Boolean)
                                            .join(" · ") ||
                                            "No additional details"}
                                    </span>
                                </Styled.ExerciseInfo>

                                <Styled.RemoveButton
                                    type="button"
                                    onClick={() => removeExercise(item.id)}
                                    aria-label={`Remove ${item.name}`}
                                >
                                    Remove
                                </Styled.RemoveButton>
                            </Styled.AddedExercise>
                        ))}
                    </Styled.AddedExercises>
                )}
            </Styled.ExerciseArea>

            <Styled.Field>
                <Styled.Label htmlFor={`${datalistId}-notes`}>
                    Notes
                </Styled.Label>

                <Styled.TextArea
                    id={`${datalistId}-notes`}
                    placeholder="Add optional workout notes..."
                    value={form.notes}
                    onChange={(event) =>
                        updateField("notes", event.target.value)
                    }
                />
            </Styled.Field>

            <Styled.Actions>
                {mode === "edit" && (
                    <Styled.SecondaryButton type="button" onClick={onCancel}>
                        Cancel
                    </Styled.SecondaryButton>
                )}

                <Styled.SubmitButton
                    type="submit"
                    disabled={!form.title.trim()}
                >
                    {mode === "edit" ? "Save Changes" : "Add Workout"}
                </Styled.SubmitButton>
            </Styled.Actions>
        </Styled.Wrapper>
    );
};

export default WorkoutForm;
