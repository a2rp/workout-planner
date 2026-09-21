import { useEffect, useState } from "react";
import styled from "styled-components";

const ScrollToTopButton = ({ threshold = 250 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > threshold);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [threshold]);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Styled.Wrapper
            type="button"
            $visible={visible}
            onClick={handleClick}
            aria-label="Scroll to top"
            title="Scroll to top"
        >
            <Styled.Arrow aria-hidden="true" />
        </Styled.Wrapper>
    );
};

export default ScrollToTopButton;

const Styled = {
    Wrapper: styled.button`
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 900;

        display: grid;
        place-items: center;

        width: 46px;
        height: 46px;

        padding: 0;

        background: #ffffff;
        color: #000000;

        border: 1px solid #ffffff;
        border-radius: 14px;

        cursor: pointer;

        opacity: ${({ $visible }) => ($visible ? 1 : 0)};
        visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};

        transform: ${({ $visible }) =>
            $visible
                ? "translateY(0) scale(1)"
                : "translateY(10px) scale(0.94)"};

        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35);

        transition:
            opacity 180ms ease,
            visibility 180ms ease,
            transform 180ms ease,
            background 180ms ease;

        &:hover {
            background: #dcdcdc;
            transform: translateY(-3px);
        }

        &:active {
            transform: scale(0.94);
        }

        &:focus-visible {
            outline: 2px solid #ffffff;
            outline-offset: 4px;
        }

        @media (max-width: 600px) {
            right: 16px;
            bottom: 16px;

            width: 44px;
            height: 44px;
        }

        @media (prefers-reduced-motion: reduce) {
            transition: none;
        }
    `,

    Arrow: styled.span`
        position: relative;

        width: 14px;
        height: 16px;

        &::before {
            content: "";

            position: absolute;
            top: 2px;
            left: 50%;

            width: 8px;
            height: 8px;

            border-top: 2px solid currentColor;
            border-left: 2px solid currentColor;

            transform: translateX(-50%) rotate(45deg);
        }

        &::after {
            content: "";

            position: absolute;
            top: 4px;
            left: 50%;

            width: 2px;
            height: 12px;

            background: currentColor;

            transform: translateX(-50%);
        }
    `,
};
