import styled from "styled-components";

const Wrapper = styled.section`
    width: 100%;
    margin-top: 80px;
    padding: 80px 24px;
    background: #0a0a0a;
    color: #ffffff;
    border-top: 1px solid #202020;

    @media (max-width: 768px) {
        margin-top: 60px;
        padding: 60px 18px;
    }

    @media (max-width: 480px) {
        padding: 50px 14px;
    }
`;

const Container = styled.div`
    width: min(1100px, 100%);
    margin: 0 auto;
`;

const Header = styled.div`
    max-width: 720px;
    margin-bottom: 48px;

    @media (max-width: 768px) {
        margin-bottom: 36px;
    }
`;

const Label = styled.p`
    margin: 0 0 10px;
    color: #888888;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    line-height: 1.4;
    text-transform: uppercase;
`;

const Heading = styled.h2`
    margin: 0;
    color: #ffffff;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
`;

const Description = styled.p`
    max-width: 680px;
    margin: 22px 0 0;
    color: #a5a5a5;
    font-size: 1rem;
    line-height: 1.8;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 48px;
    align-items: start;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
        gap: 32px;
    }
`;

const Profile = styled.div`
    position: sticky;
    top: 30px;
    display: flex;
    gap: 22px;
    padding: 28px;
    background: #111111;
    border: 1px solid #242424;
    border-radius: 20px;
    transition:
        border-color 180ms ease,
        transform 180ms ease,
        background 180ms ease;

    &:hover {
        background: #141414;
        border-color: #3a3a3a;
        transform: translateY(-3px);
    }

    @media (max-width: 860px) {
        position: static;
    }

    @media (max-width: 520px) {
        flex-direction: column;
        padding: 22px;
    }
`;

const Avatar = styled.div`
    display: grid;
    flex: 0 0 74px;
    width: 74px;
    height: 74px;
    place-items: center;
    background: #ffffff;
    color: #000000;
    border-radius: 18px;
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.04em;
`;

const ProfileInfo = styled.div`
    min-width: 0;
`;

const Name = styled.h3`
    margin: 0;
    color: #ffffff;
    font-size: 1.45rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.2;
`;

const Role = styled.p`
    margin: 7px 0 0;
    color: #c2c2c2;
    font-size: 0.9rem;
    line-height: 1.5;
`;

const ProfileText = styled.p`
    margin: 18px 0 0;
    color: #8f8f8f;
    font-size: 0.9rem;
    line-height: 1.75;
`;

const Details = styled.div`
    overflow: hidden;
    background: #111111;
    border: 1px solid #242424;
    border-radius: 20px;
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: minmax(110px, 0.45fr) minmax(0, 1fr);
    gap: 24px;
    align-items: center;
    min-height: 70px;
    padding: 16px 22px;
    border-bottom: 1px solid #222222;
    transition:
        background 160ms ease,
        padding-left 160ms ease;

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        padding-left: 27px;
        background: #171717;
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
        gap: 7px;
        min-height: auto;
        padding: 17px 18px;

        &:hover {
            padding-left: 18px;
        }
    }
`;

const Key = styled.div`
    color: #737373;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1.4;
    text-transform: uppercase;
`;

const Value = styled.div`
    min-width: 0;
    color: #d7d7d7;
    font-size: 0.94rem;
    line-height: 1.6;
    overflow-wrap: anywhere;

    a {
        display: inline-flex;
        max-width: 100%;
        gap: 8px;
        align-items: center;
        color: #d7d7d7;
        text-decoration: none;
        overflow-wrap: anywhere;
        transition: color 150ms ease;

        span {
            flex-shrink: 0;
            color: #707070;
            font-size: 0.9rem;
            transition:
                color 150ms ease,
                transform 150ms ease;
        }

        &:hover {
            color: #ffffff;

            span {
                color: #ffffff;
                transform: translate(2px, -2px);
            }
        }

        &:focus-visible {
            outline: 2px solid #ffffff;
            outline-offset: 4px;
            border-radius: 2px;
        }
    }
`;

export const Styled = {
    Wrapper,
    Container,
    Header,
    Label,
    Heading,
    Description,
    Content,
    Profile,
    Avatar,
    ProfileInfo,
    Name,
    Role,
    ProfileText,
    Details,
    Row,
    Key,
    Value,
};
