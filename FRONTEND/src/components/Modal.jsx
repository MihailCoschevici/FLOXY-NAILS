import React from 'react';
import './Modal.css';

function Modal({ show, onClose, children }) {
    if (!show) {
        return null;
    }
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