import { Styled } from "./styled";

const Stats = ({ total = 0, planned = 0, done = 0 }) => {
    const completion = total > 0 ? Math.round((done / total) * 100) : 0;

    const items = [
        {
            label: "Total Workouts",
            value: total,
        },
        {
            label: "Planned",
            value: planned,
        },
        {
            label: "Completed",
            value: done,
        },
        {
            label: "Completion",
            value: `${completion}%`,
        },
    ];

    return (
        <Styled.Wrapper>
            {items.map((item) => (
                <Styled.Card key={item.label}>
                    <Styled.Value>{item.value}</Styled.Value>

                    <Styled.Label>{item.label}</Styled.Label>
                </Styled.Card>
            ))}
        </Styled.Wrapper>
    );
};

export default Stats;
