import React from "react"
import "./ConfirmationModal.css"
import Button from "../../Button/Button"
import { useTranslation } from "react-i18next"

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    const { t } = useTranslation()

    if (!isOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="medium-heading">{t("userPageConfirmDelete")}</h2>
                <p>{t("userPageConfirmDeleteText")}</p>
                <div className="modal-actions">
                    <Button variant="ordinary" onClick={onConfirm}>
                        {t("userPageDeleteAccountConfirmButton")}
                    </Button>
                    <Button variant="ordinary" onClick={onClose}>
                        {t("userPageDeleteAccountCancelButton")}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
