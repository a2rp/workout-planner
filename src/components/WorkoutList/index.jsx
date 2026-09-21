import EmptyState from "../EmptyState";
import WorkoutCard from "../WorkoutCard";
import WorkoutForm from "../WorkoutForm";
import { Styled } from "./styled";

const WorkoutList = ({
    workouts = [],
    allWorkoutsCount = 0,
    editingId,
    categories = [],
    onToggleStatus,
    onDuplicate,
    onEdit,
    onDelete,
    onSaveEdit,
    onCancelEdit,
    onCreate,
    onClearFilters,
}) => {
    if (workouts.length === 0) {
        const hasExistingWorkouts = allWorkoutsCount > 0;

        return (
            <EmptyState
                title={
                    hasExistingWorkouts
                        ? "No matching workouts"
                        : "No workouts yet"
                }
                message={
                    hasExistingWorkouts
                        ? "No workouts match the current search or filter settings."
                        : "Create your first workout and start building your training plan."
                }
                actionLabel={
                    hasExistingWorkouts ? "Clear Filters" : "Create Workout"
                }
                onAction={hasExistingWorkouts ? onClearFilters : onCreate}
                showAction
            />
        );
    }

    return (
        <Styled.Wrapper>
            {workouts.map((workout) => {
                if (editingId === workout.id) {
                    return (
                        <Styled.Editor key={workout.id}>
                            <WorkoutForm
                                mode="edit"
                                initialValues={workout}
                                categories={categories}
                                onSubmit={(values) =>
                                    onSaveEdit(workout.id, values)
                                }
                                onCancel={onCancelEdit}
                            />
                        </Styled.Editor>
                    );
                }

                return (
                    <WorkoutCard
                        key={workout.id}
                        workout={workout}
                        onToggleStatus={onToggleStatus}
                        onDuplicate={onDuplicate}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                );
            })}
        </Styled.Wrapper>
    );
};

export default WorkoutList;
