import { useState } from "react";
import { FiActivity, FiCalendar, FiCheck, FiClock, FiCopy, FiEdit3, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import ConfirmDialog from "../confirmDialog";
import styles from "./styles.module.css";

const storageKey = "repbook-workouts-v2";
const categories = ["Strength", "Cardio", "Mobility", "Recovery", "Other"];
const emptyExercise = () => ({ name: "", sets: "3", reps: "10", weight: "", minutes: "0" });
const todayKey = () => { const date = new Date(); return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-"); };
const makeId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
const boundedNumber = (value, fallback, minimum, maximum, integer = true) => {
    if (value === null || value === undefined || (typeof value === "string" && !value.trim())) return fallback;
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    const normalized = integer ? Math.floor(number) : number;
    return Math.min(maximum, Math.max(minimum, normalized));
};
const isDateKey = (value) => {
    const match = typeof value === "string" && /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return false;
    const [, year, month, day] = match.map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

const normalizeWorkouts = (value) => {
    if (!Array.isArray(value)) return [];
    const usedIds = new Set();

    return value.flatMap((workout, index) => {
        if (!workout || typeof workout !== "object" || Array.isArray(workout)) return [];
        const title = typeof workout.title === "string" ? workout.title.trim().slice(0, 72) : "";
        if (!title) return [];

        let id = typeof workout.id === "string" && workout.id.trim() ? workout.id.trim().slice(0, 120) : makeId();
        while (usedIds.has(id)) id = makeId();
        usedIds.add(id);

        const exerciseIds = new Set();
        const exercises = Array.isArray(workout.exercises)
            ? workout.exercises.flatMap((exercise) => {
                if (!exercise || typeof exercise !== "object" || typeof exercise.name !== "string" || !exercise.name.trim()) return [];
                let exerciseId = typeof exercise.id === "string" && exercise.id.trim() ? exercise.id.trim().slice(0, 120) : makeId();
                while (exerciseIds.has(exerciseId)) exerciseId = makeId();
                exerciseIds.add(exerciseId);
                return [{
                    id: exerciseId,
                    name: exercise.name.trim().slice(0, 60),
                    sets: boundedNumber(exercise.sets, 3, 1, 30),
                    reps: boundedNumber(exercise.reps, 0, 0, 500),
                    weight: boundedNumber(exercise.weight, 0, 0, 1000, false),
                    minutes: boundedNumber(exercise.minutes ?? exercise.time, 0, 0, 600),
                }];
            })
            : [];

        return [{
            id,
            title,
            date: isDateKey(workout.date) ? workout.date : todayKey(),
            category: categories.includes(workout.category) ? workout.category : "Other",
            duration: boundedNumber(workout.duration, 45, 1, 600),
            status: workout.status === "Done" || workout.status === "Completed" ? "Completed" : "Planned",
            notes: typeof workout.notes === "string" ? workout.notes.slice(0, 400) : "",
            exercises,
            createdAt: Number.isFinite(Number(workout.createdAt)) && Number(workout.createdAt) > 0 ? Number(workout.createdAt) : Date.now() - index,
        }];
    });
};

const readWorkouts = () => {
    try {
        const current = localStorage.getItem(storageKey);
        if (current !== null) return normalizeWorkouts(JSON.parse(current));
        const previous = localStorage.getItem("workout-planner.v1");
        if (!previous) return [];
        const migrated = normalizeWorkouts(JSON.parse(previous));
        try { localStorage.setItem(storageKey, JSON.stringify(migrated)); } catch { /* Keep migrated workouts available for this session. */ }
        return migrated;
    } catch { return []; }
};
const formatDate = (value) => new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(new Date(value + "T12:00:00"));

const WorkoutPlanner = () => {
    const [workouts, setWorkouts] = useState(readWorkouts);
    const [storageError, setStorageError] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All statuses");
    const [categoryFilter, setCategoryFilter] = useState("All categories");
    const [sort, setSort] = useState("Newest first");
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [exerciseDraft, setExerciseDraft] = useState(emptyExercise);
    const [draftExercises, setDraftExercises] = useState([]);
    const [pendingDelete, setPendingDelete] = useState(null);

    const persistWorkouts = (nextWorkouts) => {
        setWorkouts(nextWorkouts);
        try {
            localStorage.setItem(storageKey, JSON.stringify(nextWorkouts));
            setStorageError(false);
        } catch {
            setStorageError(true);
        }
    };

    const completed = workouts.filter((workout) => workout.status === "Completed").length;
    const planned = workouts.length - completed;
    const completion = workouts.length ? Math.round(completed / workouts.length * 100) : 0;
    const visible = workouts.filter((workout) => (statusFilter === "All statuses" || workout.status === statusFilter) && (categoryFilter === "All categories" || workout.category === categoryFilter) && `${workout.title} ${workout.category} ${(workout.exercises ?? []).map((item) => item.name).join(" ")}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
        if (sort === "Oldest first") return a.date.localeCompare(b.date) || a.createdAt - b.createdAt;
        if (sort === "Title A to Z") return a.title.localeCompare(b.title);
        if (sort === "Most exercises") return (b.exercises?.length ?? 0) - (a.exercises?.length ?? 0);
        return b.date.localeCompare(a.date) || b.createdAt - a.createdAt;
    });

    const openNew = () => { setEditing(null); setDraftExercises([]); setExerciseDraft(emptyExercise()); setIsOpen(true); };
    const openEdit = (workout) => { setEditing(workout); setDraftExercises(workout.exercises ?? []); setExerciseDraft(emptyExercise()); setIsOpen(true); };
    const addExercise = () => {
        const name = exerciseDraft.name.trim().slice(0, 60);
        if (!name) return;
        setDraftExercises((items) => [...items, {
            id: makeId(),
            name,
            sets: boundedNumber(exerciseDraft.sets, 3, 1, 30),
            reps: boundedNumber(exerciseDraft.reps, 0, 0, 500),
            weight: boundedNumber(exerciseDraft.weight, 0, 0, 1000, false),
            minutes: boundedNumber(exerciseDraft.minutes, 0, 0, 600),
        }]);
        setExerciseDraft(emptyExercise());
    };
    const saveWorkout = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = String(data.get("title")).trim().slice(0, 72);
        if (!title) return;
        const workout = {
            id: editing?.id ?? makeId(), title, date: String(data.get("date")),
            category: categories.includes(data.get("category")) ? String(data.get("category")) : "Other",
            duration: boundedNumber(data.get("duration"), 45, 1, 600),
            status: data.get("status") === "Completed" ? "Completed" : "Planned",
            notes: String(data.get("notes")).trim().slice(0, 400), exercises: draftExercises,
            createdAt: editing?.createdAt ?? Date.now(),
        };
        persistWorkouts(editing ? workouts.map((item) => item.id === editing.id ? workout : item) : [workout, ...workouts]);
        setIsOpen(false); setEditing(null);
    };
    const toggleStatus = (id) => persistWorkouts(workouts.map((workout) => workout.id === id ? { ...workout, status: workout.status === "Completed" ? "Planned" : "Completed" } : workout));
    const duplicateWorkout = (workout) => persistWorkouts([{ ...workout, id: makeId(), title: `${workout.title} copy`.slice(0, 72), date: todayKey(), status: "Planned", createdAt: Date.now(), exercises: (workout.exercises ?? []).map((exercise) => ({ ...exercise, id: makeId() })) }, ...workouts]);
    const removeWorkout = () => { if (pendingDelete) persistWorkouts(workouts.filter((workout) => workout.id !== pendingDelete.id)); setPendingDelete(null); };
    return <div className={styles.workoutPlanner}>
        {storageError && <p className={styles.storageWarning} role="alert">This browser could not save your latest changes. They may be lost when you reload this page.</p>}
        <section className={styles.hero} id="overview"><div><span className={styles.kicker}><FiActivity aria-hidden="true" /> TRAIN WITH INTENTION</span><h1>Make a plan.<br /><span>Show up for it.</span></h1><p>A little structure for the work you want to put in, with room to shape every session your way.</p></div><div className={styles.heroStamp}><span>ONE<br />REP AT<br />A TIME</span><i /><i /><i /></div></section>

        <section className={styles.statsGrid} aria-label="Workout statistics"><article><span className={styles.statIcon}><FiActivity aria-hidden="true" /></span><div><strong>{workouts.length}</strong><small>WORKOUTS</small></div></article><article><span className={styles.statIcon}><FiCalendar aria-hidden="true" /></span><div><strong>{planned}</strong><small>PLANNED</small></div></article><article><span className={styles.statIcon}><FiCheck aria-hidden="true" /></span><div><strong>{completed}</strong><small>COMPLETED</small></div></article><article><span className={styles.statIcon}><FiActivity aria-hidden="true" /></span><div><strong>{completion}<small>%</small></strong><small>COMPLETION</small></div></article></section>

        <section className={styles.library} id="plans" aria-labelledby="plans-title"><div className={styles.libraryHeading}><div><span className={styles.eyebrow}>YOUR TRAINING, YOUR CALL</span><h2 id="plans-title">Workout plans</h2></div><button className={styles.addButton} id="builder" type="button" onClick={openNew}><FiPlus aria-hidden="true" /> Build a workout</button></div>
            <div className={styles.filters}><label className={styles.searchBox}><FiSearch aria-hidden="true" /><span>Search workouts</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search plans or exercises" /></label><label><span>Status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>{["All statuses", "Planned", "Completed"].map((value) => <option key={value}>{value}</option>)}</select></label><label><span>Category</span><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>{["All categories", ...categories].map((value) => <option key={value}>{value}</option>)}</select></label><label><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}>{["Newest first", "Oldest first", "Title A to Z", "Most exercises"].map((value) => <option key={value}>{value}</option>)}</select></label></div>
            <div className={styles.workoutGrid}>{visible.map((workout) => <article className={styles.workoutCard} key={workout.id}><div className={styles.cardTop}><span className={`${styles.categoryMark} ${styles[`category${workout.category}`] ?? ""}`}>{workout.category.slice(0,1)}</span><span className={`${styles.status} ${workout.status === "Completed" ? styles.completed : ""}`}><i />{workout.status}</span></div><div className={styles.cardTitle}><div><span className={styles.categoryLabel}>{workout.category.toUpperCase()}</span><h3>{workout.title}</h3></div><button className={styles.editButton} type="button" aria-label={`Edit ${workout.title}`} onClick={() => openEdit(workout)}><FiEdit3 aria-hidden="true" /></button></div><div className={styles.cardMeta}><span><FiCalendar aria-hidden="true" /> {formatDate(workout.date)}</span><span><FiClock aria-hidden="true" /> {workout.duration} min</span><span><FiActivity aria-hidden="true" /> {(workout.exercises ?? []).length} exercises</span></div>{workout.notes && <p className={styles.workoutNotes}>{workout.notes}</p>}<div className={styles.exerciseList}>{(workout.exercises ?? []).length ? (workout.exercises ?? []).slice(0,3).map((exercise) => <div className={styles.exerciseRow} key={exercise.id}><span>{exercise.name}</span><small>{exercise.sets} × {exercise.reps}{exercise.weight ? ` · ${exercise.weight} kg` : ""}{exercise.minutes ? ` · ${exercise.minutes} min` : ""}</small></div>) : <p className={styles.noExercises}>No exercises in this session yet.</p>}{(workout.exercises ?? []).length > 3 && <small className={styles.moreExercises}>+ {(workout.exercises ?? []).length - 3} more</small>}</div><div className={styles.cardActions}><button type="button" className={workout.status === "Completed" ? styles.undoButton : styles.completeButton} onClick={() => toggleStatus(workout.id)}>{workout.status === "Completed" ? "Mark planned" : <><FiCheck aria-hidden="true" /> Mark done</>}</button><button type="button" aria-label={`Duplicate ${workout.title}`} onClick={() => duplicateWorkout(workout)}><FiCopy aria-hidden="true" /></button><button type="button" aria-label={`Delete ${workout.title}`} onClick={() => setPendingDelete(workout)}><FiTrash2 aria-hidden="true" /></button></div></article>)}{visible.length === 0 && <div className={styles.emptyState}><span><FiActivity aria-hidden="true" /></span><h3>{workouts.length ? "No plans match those filters." : "Your next session starts here."}</h3><p>{workouts.length ? "Try another search, category, or status." : "Build a workout, add exercises, and make a plan that fits your week."}</p>{!workouts.length && <button type="button" onClick={openNew}><FiPlus aria-hidden="true" /> Create your first workout</button>}</div>}</div>
        </section>

        {isOpen && <div className={styles.modalOverlay} onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}><section className={styles.workoutModal} role="dialog" aria-modal="true" aria-labelledby="workout-modal-title"><div className={styles.modalHeading}><div><span className={styles.eyebrow}>{editing ? "UPDATE YOUR SESSION" : "BUILD YOUR SESSION"}</span><h2 id="workout-modal-title">{editing ? "Edit workout" : "Create a workout"}</h2></div><button type="button" aria-label="Close" onClick={() => setIsOpen(false)}><FiX aria-hidden="true" /></button></div><form key={editing?.id ?? "new-workout"} onSubmit={saveWorkout}><div className={styles.formGrid}><label className={styles.wideField}>Workout title<input name="title" maxLength="72" defaultValue={editing?.title ?? ""} placeholder="e.g. Upper body strength" required autoFocus /></label><label>Training date<input name="date" type="date" defaultValue={editing?.date ?? todayKey()} required /></label><label>Category<select name="category" defaultValue={editing?.category ?? "Strength"}>{categories.map((value) => <option key={value}>{value}</option>)}</select></label><label>Duration in minutes<input name="duration" type="number" min="1" max="600" defaultValue={editing?.duration ?? 45} required /></label><label>Status<select name="status" defaultValue={editing?.status ?? "Planned"}><option>Planned</option><option>Completed</option></select></label></div><div className={styles.exerciseBuilder}><div className={styles.exerciseHeading}><div><h3>Exercises</h3><p>Add the details you want to remember.</p></div><span>{draftExercises.length} added</span></div><div className={styles.exerciseForm}><label className={styles.exerciseName}>Exercise<input maxLength="60" value={exerciseDraft.name} onChange={(event) => setExerciseDraft((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Goblet squat" /></label><label>Sets<input type="number" min="1" max="30" value={exerciseDraft.sets} onChange={(event) => setExerciseDraft((current) => ({ ...current, sets: event.target.value }))} /></label><label>Reps<input type="number" min="0" max="500" value={exerciseDraft.reps} onChange={(event) => setExerciseDraft((current) => ({ ...current, reps: event.target.value }))} /></label><label>Weight kg<input type="number" min="0" max="1000" step="0.5" value={exerciseDraft.weight} onChange={(event) => setExerciseDraft((current) => ({ ...current, weight: event.target.value }))} /></label><label>Time min<input type="number" min="0" max="600" value={exerciseDraft.minutes} onChange={(event) => setExerciseDraft((current) => ({ ...current, minutes: event.target.value }))} /></label><button type="button" onClick={addExercise} disabled={!exerciseDraft.name.trim()}><FiPlus aria-hidden="true" /> Add</button></div><ul className={styles.draftList}>{draftExercises.map((exercise) => <li key={exercise.id}><span>{exercise.name}</span><small>{exercise.sets} sets × {exercise.reps} reps{exercise.weight ? ` · ${exercise.weight} kg` : ""}{exercise.minutes ? ` · ${exercise.minutes} min` : ""}</small><button type="button" aria-label={`Remove ${exercise.name}`} onClick={() => setDraftExercises((items) => items.filter((item) => item.id !== exercise.id))}><FiX aria-hidden="true" /></button></li>)}{draftExercises.length === 0 && <li className={styles.draftEmpty}>Add one or more exercises, or save the workout as a plan for later.</li>}</ul></div><label className={styles.notesField}>Workout notes <small>Optional</small><textarea name="notes" maxLength="400" defaultValue={editing?.notes ?? ""} placeholder="A reminder for next time, or a detail worth keeping." /></label><div className={styles.modalActions}><button type="button" onClick={() => setIsOpen(false)}>Cancel</button><button type="submit"><FiCheck aria-hidden="true" /> {editing ? "Save changes" : "Save workout"}</button></div></form></section></div>}
        {pendingDelete && <ConfirmDialog title="Delete this workout?" description={`${pendingDelete.title} and its exercise details will be removed from this device.`} confirmLabel="Delete workout" onCancel={() => setPendingDelete(null)} onConfirm={removeWorkout} />}
    </div>;
};

export default WorkoutPlanner;
