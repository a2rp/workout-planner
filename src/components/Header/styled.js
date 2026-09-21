import styled from "styled-components";

const Wrapper = styled.header`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 30px;

    padding: 34px 0 28px;

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 18px;

        padding-top: 24px;
    }
`;

const Main = styled.div`
    max-width: 780px;
`;

const Brand = styled.a`
    display: flex;
    align-items: center;
    gap: 18px;

    color: inherit;
    text-decoration: none;

    &:hover h1 {
        text-shadow:
            0 0 12px rgba(255, 255, 255, 0.18),
            0 0 30px rgba(255, 255, 255, 0.08);
    }

    &:hover p {
        color: #a8a8a8;

        text-shadow: 0 0 10px rgba(255, 255, 255, 0.08);
    }

    &:hover > div:first-child {
        border-color: #5b5b5b;

        box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.04),
            0 0 24px rgba(255, 255, 255, 0.1);

        animation: logoGlow 700ms ease;
    }

    &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 6px;
        border-radius: 12px;
    }

    @keyframes logoGlow {
        0% {
            box-shadow:
                0 0 0 1px rgba(255, 255, 255, 0.02),
                0 0 0 rgba(255, 255, 255, 0);
        }

        50% {
            box-shadow:
                0 0 0 1px rgba(255, 255, 255, 0.08),
                0 0 32px rgba(255, 255, 255, 0.14);
        }

        100% {
            box-shadow:
                0 0 0 1px rgba(255, 255, 255, 0.04),
                0 0 24px rgba(255, 255, 255, 0.1);
        }
    }

    @media (max-width: 500px) {
        align-items: flex-start;
        gap: 14px;
    }
`;

const LogoBox = styled.div`
    display: grid;
    place-items: center;

    flex: 0 0 68px;

    width: 68px;
    height: 68px;

    overflow: hidden;

    background: #0b0b0b;

    border: 1px solid #292929;
    border-radius: 18px;

    box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.02),
        0 0 0 rgba(255, 255, 255, 0);

    transition:
        border-color 220ms ease,
        box-shadow 220ms ease;

    @media (max-width: 500px) {
        flex-basis: 56px;

        width: 56px;
        height: 56px;

        border-radius: 14px;
    }
`;

const Logo = styled.img`
    display: block;

    width: 100%;
    height: 100%;

    object-fit: contain;

    padding: 7px;

    user-select: none;
`;

const BrandContent = styled.div`
    min-width: 0;
`;

const Label = styled.p`
    margin: 0 0 9px;

    color: #707070;

    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    line-height: 1.4;
    text-transform: uppercase;

    transition:
        color 220ms ease,
        text-shadow 220ms ease;

    @media (max-width: 500px) {
        margin-bottom: 7px;

        font-size: 0.62rem;
    }
`;

const Title = styled.h1`
    margin: 0;

    color: #ffffff;

    font-size: clamp(2.3rem, 7vw, 4.6rem);
    font-weight: 700;
    letter-spacing: -0.045em;
    line-height: 0.95;

    text-shadow: 0 0 0 rgba(255, 255, 255, 0);

    transition: text-shadow 220ms ease;

    @media (max-width: 500px) {
        font-size: clamp(2rem, 11vw, 3rem);
    }
`;

const Text = styled.p`
    max-width: 620px;

    margin: 20px 0 0 86px;

    color: #858585;

    font-size: 0.94rem;
    line-height: 1.75;

    @media (max-width: 500px) {
        margin-top: 18px;
        margin-left: 0;
    }
`;

const Status = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;

    flex-shrink: 0;

    padding: 8px 12px;

    color: #858585;
    background: #0d0d0d;

    border: 1px solid #242424;
    border-radius: 999px;

    font-size: 0.72rem;
    font-weight: 600;

    box-shadow: 0 0 0 rgba(255, 255, 255, 0);

    transition:
        color 200ms ease,
        border-color 200ms ease,
        box-shadow 200ms ease,
        text-shadow 200ms ease;

    &:hover {
        color: #ffffff;

        border-color: #464646;

        box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.03),
            0 0 20px rgba(255, 255, 255, 0.06);

        text-shadow: 0 0 10px rgba(255, 255, 255, 0.16);
    }
`;

const StatusDot = styled.span`
    width: 7px;
    height: 7px;

    background: #ffffff;

    border-radius: 50%;

    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.08);

    animation: statusPulse 2.4s ease-in-out infinite;

    @keyframes statusPulse {
        0%,
        100% {
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.07);
        }

        50% {
            box-shadow: 0 0 0 7px rgba(255, 255, 255, 0.015);
        }
    }
`;

export const Styled = {
    Wrapper,
    Main,
    Brand,
    LogoBox,
    Logo,
    BrandContent,
    Label,
    Title,
    Text,
    Status,
    StatusDot,
};
