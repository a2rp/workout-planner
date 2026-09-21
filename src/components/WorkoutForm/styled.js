import styled from "styled-components";

const Wrapper = styled.form`
    padding: 22px;

    background: #0c0c0c;

    border: 1px solid #222222;
    border-radius: 20px;

    @media (max-width: 600px) {
        padding: 18px;
    }
`;

const FormHeader = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: flex-start;

    margin-bottom: 22px;
`;

const FormLabel = styled.p`
    margin: 0 0 5px;

    color: #626262;

    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    line-height: 1.4;
    text-transform: uppercase;
`;

const FormTitle = styled.h2`
    margin: 0;

    color: #ffffff;

    font-size: 1.55rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.2;
`;

const CancelTopButton = styled.button`
    padding: 7px 11px;

    background: transparent;
    color: #777777;

    border: 1px solid #292929;
    border-radius: 9px;

    font: inherit;
    font-size: 0.72rem;
    font-weight: 600;

    cursor: pointer;

    transition:
        color 150ms ease,
        border-color 150ms ease,
        background 150ms ease;

    &:hover {
        color: #ffffff;
        background: #171717;
        border-color: #414141;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 2fr repeat(4, minmax(110px, 1fr));
    gap: 12px;

    @media (max-width: 960px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 560px) {
        grid-template-columns: 1fr;
    }
`;

const Field = styled.div`
    position: relative;

    min-width: 0;

    ${({ $wide }) =>
        $wide &&
        `
            @media (max-width: 960px) {
                grid-column: 1 / -1;
            }
        `}

    ${({ $exerciseName }) =>
        $exerciseName &&
        `
            min-width: 180px;
        `}
`;

const Label = styled.label`
    display: block;

    margin-bottom: 7px;

    color: #686868;

    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.4;
`;

const controlStyles = `
    width: 100%;
    min-height: 43px;

    padding: 10px 12px;

    background: #090909;
    color: #dddddd;

    border: 1px solid #272727;
    border-radius: 10px;

    font: inherit;
    font-size: 0.8rem;

    outline: none;

    transition:
        border-color 150ms ease,
        background 150ms ease,
        box-shadow 150ms ease;

    &:hover {
        border-color: #353535;
    }

    &:focus {
        background: #0d0d0d;
        border-color: #555555;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
    }

    &::placeholder {
        color: #484848;
    }
`;

const Input = styled.input`
    ${controlStyles}

    &[type="date"] {
        color-scheme: dark;
    }

    &[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
        opacity: 0.7;
        cursor: pointer;
    }

    &[type="number"] {
        appearance: textfield;
    }

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        appearance: none;
        margin: 0;
    }
`;

const Select = styled.select`
    ${controlStyles}

    cursor: pointer;

    option {
        background: #111111;
        color: #ffffff;
    }
`;

const TextArea = styled.textarea`
    ${controlStyles}

    min-height: 105px;

    margin-top: 0;

    resize: vertical;

    line-height: 1.6;
`;

const Hint = styled.span`
    position: absolute;
    right: 10px;
    bottom: -17px;

    color: #454545;

    font-size: 0.62rem;
`;

const Divider = styled.div`
    height: 1px;

    margin: 28px 0;

    background: #1e1e1e;
`;

const ExerciseArea = styled.div`
    margin-bottom: 26px;
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    margin-bottom: 15px;
`;

const SectionLabel = styled.h3`
    margin: 0;

    color: #dadada;

    font-size: 0.88rem;
    font-weight: 700;
`;

const SectionText = styled.p`
    margin: 4px 0 0;

    color: #565656;

    font-size: 0.7rem;
    line-height: 1.5;
`;

const ExerciseCount = styled.span`
    display: grid;
    place-items: center;

    min-width: 30px;
    height: 30px;

    padding: 0 8px;

    color: #777777;
    background: #111111;

    border: 1px solid #292929;
    border-radius: 9px;

    font-size: 0.7rem;
    font-weight: 700;
`;

const ExerciseGrid = styled.div`
    display: grid;
    grid-template-columns:
        minmax(190px, 2fr)
        repeat(4, minmax(75px, 0.65fr))
        auto;
    gap: 9px;
    align-items: end;

    @media (max-width: 900px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 580px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 390px) {
        grid-template-columns: 1fr;
    }
`;

const AddExerciseButton = styled.button`
    min-height: 43px;

    padding: 10px 15px;

    background: #ffffff;
    color: #000000;

    border: 1px solid #ffffff;
    border-radius: 10px;

    font: inherit;
    font-size: 0.76rem;
    font-weight: 700;

    cursor: pointer;

    transition:
        background 150ms ease,
        transform 150ms ease,
        opacity 150ms ease;

    &:hover:not(:disabled) {
        background: #dcdcdc;
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    @media (max-width: 900px) {
        min-width: 100px;
    }
`;

const NoExercises = styled.div`
    margin-top: 12px;
    padding: 15px;

    color: #4f4f4f;

    background: #090909;

    border: 1px dashed #242424;
    border-radius: 10px;

    font-size: 0.72rem;
`;

const AddedExercises = styled.div`
    display: grid;
    gap: 7px;

    margin-top: 12px;
`;

const AddedExercise = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 10px 11px;

    background: #101010;

    border: 1px solid #202020;
    border-radius: 10px;

    @media (max-width: 500px) {
        align-items: flex-start;
    }
`;

const ExerciseNumber = styled.span`
    flex-shrink: 0;

    color: #444444;

    font-size: 0.66rem;
    font-weight: 700;
`;

const ExerciseInfo = styled.div`
    flex: 1;
    min-width: 0;

    strong {
        display: block;

        color: #cfcfcf;

        font-size: 0.78rem;
        font-weight: 600;

        overflow-wrap: anywhere;
    }

    span {
        display: block;

        margin-top: 3px;

        color: #565656;

        font-size: 0.67rem;
        line-height: 1.5;
    }
`;

const RemoveButton = styled.button`
    flex-shrink: 0;

    padding: 6px 9px;

    background: transparent;
    color: #5f5f5f;

    border: 1px solid #272727;
    border-radius: 7px;

    font: inherit;
    font-size: 0.64rem;
    font-weight: 600;

    cursor: pointer;

    transition:
        color 150ms ease,
        background 150ms ease,
        border-color 150ms ease;

    &:hover {
        background: #ffffff;
        color: #000000;
        border-color: #ffffff;
    }
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 9px;

    margin-top: 22px;
`;

const SecondaryButton = styled.button`
    min-height: 42px;

    padding: 9px 17px;

    background: transparent;
    color: #858585;

    border: 1px solid #303030;
    border-radius: 10px;

    font: inherit;
    font-size: 0.76rem;
    font-weight: 700;

    cursor: pointer;

    transition:
        color 150ms ease,
        background 150ms ease,
        border-color 150ms ease;

    &:hover {
        background: #151515;
        color: #ffffff;
        border-color: #444444;
    }
`;

const SubmitButton = styled.button`
    min-height: 42px;

    padding: 9px 18px;

    background: #ffffff;
    color: #000000;

    border: 1px solid #ffffff;
    border-radius: 10px;

    font: inherit;
    font-size: 0.76rem;
    font-weight: 700;

    cursor: pointer;

    transition:
        background 150ms ease,
        transform 150ms ease,
        opacity 150ms ease;

    &:hover:not(:disabled) {
        background: #dcdcdc;
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 3px;
    }
`;

export const Styled = {
    Wrapper,
    FormHeader,
    FormLabel,
    FormTitle,
    CancelTopButton,
    Grid,
    Field,
    Label,
    Input,
    Select,
    TextArea,
    Hint,
    Divider,
    ExerciseArea,
    SectionHeader,
    SectionLabel,
    SectionText,
    ExerciseCount,
    ExerciseGrid,
    AddExerciseButton,
    NoExercises,
    AddedExercises,
    AddedExercise,
    ExerciseNumber,
    ExerciseInfo,
    RemoveButton,
    Actions,
    SecondaryButton,
    SubmitButton,
};
