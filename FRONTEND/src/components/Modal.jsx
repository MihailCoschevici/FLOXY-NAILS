import React, { useEffect } from 'react';
import './Modal.css';

function Modal({ show, onClose, children }) {
    useEffect(() => {
        document.body.style.overflow = show ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [show]);

    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="modal-close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
