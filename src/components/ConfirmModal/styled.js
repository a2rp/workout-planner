import styled from "styled-components";

const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;

    display: grid;
    place-items: center;

    padding: 20px;

    background: rgba(0, 0, 0, 0.78);
    backdrop-filter: blur(8px);

    animation: fadeIn 160ms ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
`;

const Modal = styled.div`
    width: min(460px, 100%);

    padding: 30px;

    background: #111111;

    border: 1px solid #2b2b2b;
    border-radius: 22px;

    box-shadow:
        0 24px 80px rgba(0, 0, 0, 0.55),
        0 0 0 1px rgba(255, 255, 255, 0.02);

    animation: modalIn 180ms ease;

    @keyframes modalIn {
        from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
        }

        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @media (max-width: 520px) {
        padding: 24px 20px;
        border-radius: 18px;
    }
`;

const Icon = styled.div`
    display: grid;
    place-items: center;

    width: 48px;
    height: 48px;

    margin-bottom: 22px;

    background: #1d1d1d;
    color: #ffffff;

    border: 1px solid #343434;
    border-radius: 14px;

    font-size: 1.2rem;
    font-weight: 800;
`;

const Content = styled.div``;

const Title = styled.h3`
    margin: 0;

    color: #ffffff;

    font-size: 1.45rem;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.03em;
`;

const Message = styled.p`
    margin: 12px 0 0;

    color: #929292;

    font-size: 0.95rem;
    line-height: 1.7;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    margin-top: 30px;

    @media (max-width: 420px) {
        flex-direction: column-reverse;
    }
`;

const Button = styled.button`
    min-height: 44px;

    padding: 10px 18px;

    border-radius: 11px;

    font: inherit;
    font-size: 0.88rem;
    font-weight: 700;

    cursor: pointer;

    transition:
        background 160ms ease,
        color 160ms ease,
        border-color 160ms ease,
        transform 160ms ease;

    &:active {
        transform: scale(0.97);
    }

    &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 3px;
    }

    @media (max-width: 420px) {
        width: 100%;
    }
`;

const CancelButton = styled(Button)`
    background: transparent;
    color: #b7b7b7;

    border: 1px solid #333333;

    &:hover {
        background: #1b1b1b;
        color: #ffffff;
        border-color: #484848;
    }
`;

const ConfirmButton = styled(Button)`
    background: ${({ $danger }) => ($danger ? "#ffffff" : "#ffffff")};

    color: #000000;

    border: 1px solid #ffffff;

    &:hover {
        background: ${({ $danger }) => ($danger ? "#dcdcdc" : "#dcdcdc")};

        border-color: #dcdcdc;
    }
`;

export const Styled = {
    Backdrop,
    Modal,
    Icon,
    Content,
    Title,
    Message,
    Actions,
    CancelButton,
    ConfirmButton,
};
