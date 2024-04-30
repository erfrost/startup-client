import { useState } from "react";

interface UseModalReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
}

export const useModal = (initialState: boolean): UseModalReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const toggle = () => setIsOpen((prevState: boolean) => !prevState);

  return { isOpen, onOpen, onClose, toggle };
};

export default useModal;
