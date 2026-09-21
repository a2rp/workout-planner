import styled from "styled-components";

const Wrapper = styled.article`
    overflow: hidden;

    background: #0c0c0c;

    border: 1px solid #222222;
    border-radius: 20px;

    transition:
        background 180ms ease,
        border-color 180ms ease,
        transform 180ms ease;

    &:hover {
        background: #0f0f0f;
        border-color: #333333;
        transform: translateY(-2px);
    }
`;

const Main = styled.div`
    padding: 22px;

    @media (max-width: 600px) {
        padding: 18px;
    }
`;

const Top = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 22px;

    @media (max-width: 560px) {
        flex-direction: column;
        gap: 14px;
    }
`;

const TitleSection = styled.div`
    min-width: 0;
`;

const Title = styled.h3`
    margin: 0;

    color: #ffffff;

    font-size: 1.45rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.25;

    overflow-wrap: anywhere;
`;

const Meta = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    margin-top: 10px;
`;

const MetaItem = styled.span`
    color: #777777;

    font-size: 0.78rem;
    line-height: 1.5;
`;

const Dot = styled.span`
    display: block;

    width: 3px;
    height: 3px;

    background: #474747;

    border-radius: 50%;
`;

const Status = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;

    flex-shrink: 0;

    padding: 7px 10px;

    color: ${({ $done }) => ($done ? "#ffffff" : "#929292")};
    background: ${({ $done }) => ($done ? "#1a1a1a" : "#111111")};

    border: 1px solid ${({ $done }) => ($done ? "#3c3c3c" : "#282828")};

    border-radius: 999px;

    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    span {
        width: 6px;
        height: 6px;

        background: ${({ $done }) => ($done ? "#ffffff" : "#5b5b5b")};

        border-radius: 50%;
    }
`;

const SectionTitle = styled.h4`
    margin: 0;

    color: #646464;

    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    line-height: 1.4;
    text-transform: uppercase;
`;

const ExerciseSection = styled.div`
    margin-top: 24px;
`;

const ExerciseList = styled.div`
    display: grid;
    gap: 7px;

    margin-top: 12px;
`;

const Exercise = styled.div`
    display: flex;
    gap: 13px;
    align-items: center;

    padding: 11px 12px;

    background: #111111;

    border: 1px solid #1e1e1e;
    border-radius: 11px;

    transition:
        border-color 160ms ease,
        background 160ms ease;

    &:hover {
        background: #141414;
        border-color: #2e2e2e;
    }
`;

const ExerciseNumber = styled.span`
    flex-shrink: 0;

    color: #494949;

    font-size: 0.68rem;
    font-weight: 700;
`;

const ExerciseContent = styled.div`
    min-width: 0;
`;

const ExerciseName = styled.div`
    color: #d8d8d8;

    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.4;

    overflow-wrap: anywhere;
`;

const ExerciseMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px 12px;

    margin-top: 4px;

    span {
        color: #656565;

        font-size: 0.7rem;
        line-height: 1.5;
    }
`;

const Notes = styled.div`
    margin-top: 22px;

    p {
        margin: 10px 0 0;

        color: #7e7e7e;

        font-size: 0.82rem;
        line-height: 1.7;

        white-space: pre-wrap;
        overflow-wrap: anywhere;
    }
`;

const Completed = styled.div`
    margin-top: 20px;

    color: #656565;

    font-size: 0.72rem;
    line-height: 1.5;
`;

const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    padding: 13px 22px;

    background: #090909;

    border-top: 1px solid #1d1d1d;

    @media (max-width: 600px) {
        padding: 13px 18px;
    }
`;

const ActionButton = styled.button`
    min-height: 35px;

    padding: 7px 12px;

    background: transparent;
    color: #858585;

    border: 1px solid #292929;
    border-radius: 9px;

    font: inherit;
    font-size: 0.72rem;
    font-weight: 600;

    cursor: pointer;

    transition:
        color 150ms ease,
        background 150ms ease,
        border-color 150ms ease,
        transform 150ms ease;

    &:hover {
        background: #171717;
        color: #ffffff;
        border-color: #444444;
    }

    &:active {
        transform: scale(0.96);
    }

    &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 3px;
    }
`;

const DeleteButton = styled(ActionButton)`
    margin-left: auto;

    &:hover {
        background: #ffffff;
        color: #000000;
        border-color: #ffffff;
    }

    @media (max-width: 460px) {
        margin-left: 0;
    }
`;

export const Styled = {
    Wrapper,
    Main,
    Top,
    TitleSection,
    Title,
    Meta,
    MetaItem,
    Dot,
    Status,
    SectionTitle,
    ExerciseSection,
    ExerciseList,
    Exercise,
    ExerciseNumber,
    ExerciseContent,
    ExerciseName,
    ExerciseMeta,
    Notes,
    Completed,
    Actions,
    ActionButton,
    DeleteButton,
};
