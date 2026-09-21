import styled from "styled-components";

const Page = styled.main`
    min-height: 100dvh;

    background:
        radial-gradient(
            circle at 50% -180px,
            rgba(255, 255, 255, 0.055),
            transparent 420px
        ),
        #000000;
`;

const Container = styled.div`
    width: min(1120px, calc(100% - 36px));

    margin: 0 auto;
    padding: 0 0 60px;

    @media (max-width: 500px) {
        width: min(100% - 26px, 1120px);
    }
`;

const FormSection = styled.section`
    margin-bottom: 42px;

    scroll-margin-top: 24px;
`;

const Toolbar = styled.section`
    margin-bottom: 15px;
`;

const ToolbarTop = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;

    margin-bottom: 15px;

    @media (max-width: 540px) {
        align-items: flex-start;
        flex-direction: column;
        gap: 10px;
    }
`;

const SectionLabel = styled.p`
    margin: 0 0 5px;

    color: #555555;

    font-size: 0.67rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    line-height: 1.4;
    text-transform: uppercase;
`;

const SectionTitle = styled.h2`
    margin: 0;

    color: #ffffff;

    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.2;
`;

const ResultCount = styled.div`
    flex-shrink: 0;

    color: #595959;

    font-size: 0.7rem;
    font-weight: 600;
`;

const Controls = styled.div`
    display: grid;
    grid-template-columns:
        minmax(230px, 2fr)
        minmax(135px, 0.7fr)
        minmax(150px, 0.9fr)
        minmax(125px, 0.7fr)
        auto;

    gap: 8px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`;

const controlStyles = `
    width: 100%;
    min-height: 42px;

    padding: 9px 11px;

    background: #090909;
    color: #bcbcbc;

    border: 1px solid #242424;
    border-radius: 10px;

    font: inherit;
    font-size: 0.75rem;

    outline: none;

    transition:
        background 150ms ease,
        border-color 150ms ease,
        box-shadow 150ms ease;

    &:hover {
        border-color: #343434;
    }

    &:focus {
        background: #0d0d0d;
        border-color: #555555;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.04);
    }
`;

const SearchInput = styled.input`
    ${controlStyles}

    &::placeholder {
        color: #484848;
    }

    &::-webkit-search-cancel-button {
        filter: invert(1);
        opacity: 0.5;
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

const ClearButton = styled.button`
    min-height: 42px;

    padding: 9px 14px;

    background: transparent;
    color: #737373;

    border: 1px solid #292929;
    border-radius: 10px;

    font: inherit;
    font-size: 0.72rem;
    font-weight: 700;

    cursor: pointer;

    transition:
        background 150ms ease,
        color 150ms ease,
        border-color 150ms ease;

    &:hover {
        background: #ffffff;
        color: #000000;
        border-color: #ffffff;
    }

    &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 3px;
    }
`;

const StorageNote = styled.p`
    margin: 20px 0 0;

    padding: 14px;

    color: ${({ $error }) => ($error ? "#d0d0d0" : "#484848")};

    background: ${({ $error }) => ($error ? "#141414" : "transparent")};

    border: ${({ $error }) =>
        $error ? "1px solid #393939" : "1px solid transparent"};

    border-radius: 10px;

    text-align: center;

    font-size: 0.68rem;
    line-height: 1.6;
`;

export const Styled = {
    Page,
    Container,
    FormSection,
    Toolbar,
    ToolbarTop,
    SectionLabel,
    SectionTitle,
    ResultCount,
    Controls,
    SearchInput,
    Select,
    ClearButton,
    StorageNote,
};
