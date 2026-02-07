import { createContext, useState, useEffect } from 'react';
import '../styles/Toast.css';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ message: '', type: '', visible: false });

    const showToast = (message, type = 'info') => {
        setToast({ message, type, visible: true });

        setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }));
        }, 3000);
    };

    const hideToast = () => {
        setToast((prev) => ({ ...prev, visible: false }));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            
            {toast.visible && (
                <div className={`toast-container ${toast.type}`}>
                    <div className="toast-message">{toast.message}</div>
                    <button className="toast-close" onClick={hideToast}>✖</button>
                    <div className="toast-progress"></div>
                </div>
            )}
        </ToastContext.Provider>
    );
};