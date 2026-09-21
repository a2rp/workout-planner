import { Styled } from "./styled";

const formatDate = (date) => {
    if (!date) {
        return "No date";
    }

    const parsed = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return parsed.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const WorkoutCard = ({
    workout,
    onToggleStatus,
    onDuplicate,
    onEdit,
    onDelete,
}) => {
    const exercises = Array.isArray(workout.exercises) ? workout.exercises : [];

    return (
        <Styled.Wrapper>
            <Styled.Main>
                <Styled.Top>
                    <Styled.TitleSection>
                        <Styled.Title>{workout.title}</Styled.Title>

                        <Styled.Meta>
                            <Styled.MetaItem>
                                {formatDate(workout.date)}
                            </Styled.MetaItem>

                            <Styled.Dot />

                            <Styled.MetaItem>
                                {workout.category || "No category"}
                            </Styled.MetaItem>

                            {workout.duration && (
                                <>
                                    <Styled.Dot />

                                    <Styled.MetaItem>
                                        {workout.duration} min
                                    </Styled.MetaItem>
                                </>
                            )}
                        </Styled.Meta>
                    </Styled.TitleSection>

                    <Styled.Status $done={workout.status === "Done"}>
                        <span />

                        {workout.status}
                    </Styled.Status>
                </Styled.Top>

                {exercises.length > 0 && (
                    <Styled.ExerciseSection>
                        <Styled.SectionTitle>Exercises</Styled.SectionTitle>

                        <Styled.ExerciseList>
                            {exercises.map((exercise, index) => (
                                <Styled.Exercise
                                    key={
                                        exercise.id ||
                                        `${exercise.name}-${index}`
                                    }
                                >
                                    <Styled.ExerciseNumber>
                                        {String(index + 1).padStart(2, "0")}
                                    </Styled.ExerciseNumber>

                                    <Styled.ExerciseContent>
                                        <Styled.ExerciseName>
                                            {exercise.name}
                                        </Styled.ExerciseName>

                                        <Styled.ExerciseMeta>
                                            {exercise.sets && (
                                                <span>
                                                    {exercise.sets} sets
                                                </span>
                                            )}

                                            {exercise.reps && (
                                                <span>
                                                    {exercise.reps} reps
                                                </span>
                                            )}

                                            {exercise.weight && (
                                                <span>
                                                    {exercise.weight} kg
                                                </span>
                                            )}

                                            {exercise.time && (
                                                <span>{exercise.time} min</span>
                                            )}
                                        </Styled.ExerciseMeta>
                                    </Styled.ExerciseContent>
                                </Styled.Exercise>
                            ))}
                        </Styled.ExerciseList>
                    </Styled.ExerciseSection>
                )}

                {workout.notes && (
                    <Styled.Notes>
                        <Styled.SectionTitle>Notes</Styled.SectionTitle>

                        <p>{workout.notes}</p>
                    </Styled.Notes>
                )}

                {workout.completedAt && workout.status === "Done" && (
                    <Styled.Completed>
                        Completed on {formatDate(workout.completedAt)}
                    </Styled.Completed>
                )}
            </Styled.Main>

            <Styled.Actions>
                <Styled.ActionButton
                    type="button"
                    onClick={() =>
                        onToggleStatus(
                            workout.id,
                            workout.status === "Done" ? "Planned" : "Done",
                        )
                    }
                >
                    {workout.status === "Done" ? "Mark Planned" : "Mark Done"}
                </Styled.ActionButton>

                <Styled.ActionButton
                    type="button"
                    onClick={() => onDuplicate(workout.id)}
                >
                    Duplicate
                </Styled.ActionButton>

                <Styled.ActionButton
                    type="button"
                    onClick={() => onEdit(workout.id)}
                >
                    Edit
                </Styled.ActionButton>

                <Styled.DeleteButton
                    type="button"
                    onClick={() => onDelete(workout.id)}
                >
                    Delete
                </Styled.DeleteButton>
            </Styled.Actions>
        </Styled.Wrapper>
    );
};

export default WorkoutCard;
