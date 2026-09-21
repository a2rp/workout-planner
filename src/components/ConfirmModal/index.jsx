import { useEffect } from "react";
import { Styled } from "./styled";

const ConfirmModal = ({
    isOpen,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    danger = true,
}) => {
    useEffect(() => {
        if (!isOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onCancel?.();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onCancel]);

    if (!isOpen) {
        return null;
    }

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onCancel?.();
        }
    };

    return (
        <Styled.Backdrop onMouseDown={handleBackdropClick} role="presentation">
            <Styled.Modal
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                aria-describedby="confirm-modal-description"
            >
                <Styled.Icon aria-hidden="true">!</Styled.Icon>

                <Styled.Content>
                    <Styled.Title id="confirm-modal-title">
                        {title}
                    </Styled.Title>

                    <Styled.Message id="confirm-modal-description">
                        {message}
                    </Styled.Message>
                </Styled.Content>

                <Styled.Actions>
                    <Styled.CancelButton type="button" onClick={onCancel}>
                        {cancelLabel}
                    </Styled.CancelButton>

                    <Styled.ConfirmButton
                        type="button"
                        $danger={danger}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Styled.ConfirmButton>
                </Styled.Actions>
            </Styled.Modal>
        </Styled.Backdrop>
    );
};

export default ConfirmModal;
