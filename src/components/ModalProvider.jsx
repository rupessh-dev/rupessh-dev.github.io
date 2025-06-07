import { useState, useCallback, useEffect } from 'react';
import { setShowModal } from './modalService';
import alertAudio from '../assets/audio/alert.mp3';
import { ModalContext } from '../context/ModalContext';

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({ open: false, message: '', type: 'info', force: false });

  const showModal = useCallback((message, type = 'info', force = false) => {
    setModal({ open: true, message, type, force });
    const audio = new Audio(alertAudio);
    audio.volume = 1;
    audio.currentTime = 3;
    audio.play().catch(() => {});
  }, []);

  const hideModal = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
  }, []);

  useEffect(() => {
    setShowModal(showModal);
  }, [showModal]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal open={modal.open} message={modal.message} type={modal.type} onClose={hideModal} force={modal.force} />
    </ModalContext.Provider>
  );
}

function Modal({ open, message, type, onClose, force }) {
  if (!open) return null;

  // Icon and color based on type
  let icon;
  if (type === 'success') {
    icon = (
      <svg className="w-12 h-12 mb-2" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#22c55e"/><path d="M15 25l6 6 12-14" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
    );
  } else if (type === 'error') {
    icon = (
      <svg className="w-12 h-12 mb-2" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#ef4444"/><path d="M30 18L18 30M18 18l12 12" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    );
  } else if (type === 'warning') {
    icon = (
      <svg className="w-12 h-12 mb-2" viewBox="0 0 48 48" fill="none"><path d="M24 6l20 36H4L24 6z" fill="#facc15"/><path d="M24 18v8" stroke="#fff" strokeWidth="3" strokeLinecap="round"/><circle cx="24" cy="34" r="2" fill="#fff"/></svg>
    );
  } else {
    icon = (
      <svg className="w-12 h-12 mb-2" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#3b82f6"/><path d="M24 16v12" stroke="#fff" strokeWidth="3" strokeLinecap="round"/><circle cx="24" cy="34" r="2" fill="#fff"/></svg>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-black/90 rounded-3xl shadow-[0_8px_40px_8px_rgba(80,120,255,0.15)] border border-white/10 px-8 py-8 w-[90vw] max-w-md mx-auto animate-menuOpen flex flex-col items-center">
        {icon}
        <div className="text-white text-lg font-semibold text-center mb-2">{message}</div>
        {!force && (
          <button
            className="mt-6 px-6 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
} 