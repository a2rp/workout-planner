import { Styled } from "./styled";

const EmptyState = ({
    title = "No workouts yet",
    message = "Create your first workout and start building your training plan.",
    actionLabel = "Create Workout",
    onAction,
    showAction = true,
}) => {
    return (
        <Styled.Wrapper>
            <Styled.Icon aria-hidden="true">
                <span />
                <span />
                <span />
            </Styled.Icon>

            <Styled.Title>{title}</Styled.Title>

            <Styled.Text>{message}</Styled.Text>

            {showAction && onAction && (
                <Styled.Button type="button" onClick={onAction}>
                    {actionLabel}
                </Styled.Button>
            )}
        </Styled.Wrapper>
    );
};

export default EmptyState;
