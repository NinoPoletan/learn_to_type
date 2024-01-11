import { useState, useCallback } from 'react';

export const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginModal, setAboutModal] = useState(false);

  const openModal = useCallback((type: string) => {
    if (type === 'result') setModalIsOpen(true);
    else setAboutModal(true);
  }, []);

  const closeModal = useCallback((type: string) => {
    if (type === 'result') setModalIsOpen(false);
    else setAboutModal(false);
  }, []);

  return { modalIsOpen, loginModal, openModal, closeModal };
};
