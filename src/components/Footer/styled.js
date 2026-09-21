import styled from "styled-components";

const Wrapper = styled.footer`
    width: 100%;

    margin-top: 80px;
    padding: 64px 24px 26px;

    background: #050505;
    color: #ffffff;

    border-top: 1px solid #1e1e1e;

    @media (max-width: 768px) {
        margin-top: 60px;
        padding: 50px 18px 24px;
    }

    @media (max-width: 480px) {
        padding-inline: 14px;
    }
`;

const Container = styled.div`
    width: min(1100px, 100%);
    margin: 0 auto;
`;

const Top = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 80px;

    padding-bottom: 48px;

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        gap: 42px;
    }
`;

const BrandSection = styled.div`
    max-width: 480px;
`;

const Brand = styled.a`
    display: inline-block;

    color: #ffffff;

    font-size: 1.45rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.2;

    text-decoration: none;

    transition: opacity 160ms ease;

    &:hover {
        opacity: 0.72;
    }

    &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 5px;
        border-radius: 3px;
    }
`;

const Description = styled.p`
    max-width: 450px;

    margin: 16px 0 0;

    color: #777777;

    font-size: 0.9rem;
    line-height: 1.75;
`;

const LinkSection = styled.div`
    display: flex;
    gap: 80px;

    @media (max-width: 500px) {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 28px;
    }
`;

const LinkGroup = styled.div`
    min-width: 120px;
`;

const LinkTitle = styled.h3`
    margin: 0 0 17px;

    color: #6f6f6f;

    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    line-height: 1.4;
    text-transform: uppercase;
`;

const Links = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 11px;

    margin: 0;
    padding: 0;

    list-style: none;

    li {
        margin: 0;
        padding: 0;
    }

    a {
        display: inline-flex;
        align-items: center;
        gap: 7px;

        color: #a5a5a5;

        font-size: 0.86rem;
        line-height: 1.5;

        text-decoration: none;

        transition:
            color 150ms ease,
            transform 150ms ease;

        span {
            color: #4f4f4f;

            font-size: 0.75rem;

            transition:
                color 150ms ease,
                transform 150ms ease;
        }

        &:hover {
            color: #ffffff;
            transform: translateX(2px);

            span {
                color: #ffffff;
                transform: translate(2px, -2px);
            }
        }

        &:focus-visible {
            outline: 2px solid #ffffff;
            outline-offset: 3px;
            border-radius: 2px;
        }
    }
`;

const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    padding-top: 24px;

    border-top: 1px solid #1b1b1b;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
`;

const Copyright = styled.p`
    margin: 0;

    color: #626262;

    font-size: 0.78rem;
    line-height: 1.6;

    a {
        color: #909090;
        text-decoration: none;

        transition: color 150ms ease;

        &:hover {
            color: #ffffff;
        }

        &:focus-visible {
            outline: 2px solid #ffffff;
            outline-offset: 3px;
        }
    }
`;

const Note = styled.p`
    margin: 0;

    color: #505050;

    font-size: 0.75rem;
    line-height: 1.5;
`;

export const Styled = {
    Wrapper,
    Container,
    Top,
    BrandSection,
    Brand,
    Description,
    LinkSection,
    LinkGroup,
    LinkTitle,
    Links,
    Bottom,
    Copyright,
    Note,
};
