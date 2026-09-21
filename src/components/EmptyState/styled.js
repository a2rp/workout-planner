import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 340px;

    padding: 56px 24px;

    text-align: center;

    background: #0d0d0d;

    border: 1px dashed #303030;
    border-radius: 20px;

    transition:
        background 180ms ease,
        border-color 180ms ease;

    &:hover {
        background: #101010;
        border-color: #404040;
    }

    @media (max-width: 600px) {
        min-height: 290px;
        padding: 44px 20px;
    }
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    width: 68px;
    height: 68px;

    margin-bottom: 24px;

    background: #161616;

    border: 1px solid #292929;
    border-radius: 20px;

    span {
        display: block;

        width: 6px;

        background: #ffffff;
        border-radius: 20px;

        transition: height 180ms ease;
    }

    span:nth-child(1) {
        height: 18px;
    }

    span:nth-child(2) {
        height: 32px;
    }

    span:nth-child(3) {
        height: 23px;
    }

    ${Wrapper}:hover & {
        span:nth-child(1) {
            height: 26px;
        }

        span:nth-child(2) {
            height: 20px;
        }

        span:nth-child(3) {
            height: 34px;
        }
    }
`;

const Title = styled.h3`
    margin: 0;

    color: #ffffff;

    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.3;
`;

const Text = styled.p`
    max-width: 470px;

    margin: 12px 0 0;

    color: #858585;

    font-size: 0.94rem;
    line-height: 1.7;
`;

const Button = styled.button`
    min-height: 44px;

    margin-top: 25px;
    padding: 10px 20px;

    background: #ffffff;
    color: #000000;

    border: 1px solid #ffffff;
    border-radius: 11px;

    font: inherit;
    font-size: 0.88rem;
    font-weight: 700;

    cursor: pointer;

    transition:
        background 160ms ease,
        color 160ms ease,
        transform 160ms ease;

    &:hover {
        background: #dcdcdc;
        border-color: #dcdcdc;
        transform: translateY(-2px);
    }

    &:active {
        transform: scale(0.97);
    }

    &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 4px;
    }
`;

export const Styled = {
    Wrapper,
    Icon,
    Title,
    Text,
    Button,
};
