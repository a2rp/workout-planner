import styled from "styled-components";

const Wrapper = styled.section`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;

    margin-bottom: 24px;

    @media (max-width: 760px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 400px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled.div`
    position: relative;

    overflow: hidden;

    min-height: 118px;

    padding: 20px;

    background: #0c0c0c;

    border: 1px solid #222222;
    border-radius: 17px;

    transition:
        background 180ms ease,
        border-color 180ms ease,
        transform 180ms ease;

    &::after {
        content: "";

        position: absolute;
        right: -20px;
        bottom: -35px;

        width: 90px;
        height: 90px;

        border: 1px solid #252525;
        border-radius: 50%;
    }

    &:hover {
        background: #101010;
        border-color: #353535;
        transform: translateY(-3px);
    }
`;

const Value = styled.div`
    position: relative;
    z-index: 1;

    color: #ffffff;

    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
`;

const Label = styled.div`
    position: relative;
    z-index: 1;

    margin-top: 13px;

    color: #707070;

    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1.4;
    text-transform: uppercase;
`;

export const Styled = {
    Wrapper,
    Card,
    Value,
    Label,
};
