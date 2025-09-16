import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorPopupProps {
  errorMessage?: string;
}

const ErrorPopup = ({ errorMessage }: ErrorPopupProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  if (!errorMessage) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.p
          key={errorMessage} // ключ теперь сам текст ошибки
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-sm z-50 fixed top-3 left-1/2 transform -translate-x-1/2 rounded-lg bg-red-500 text-white shadow-lg p-4"
        >
          {errorMessage}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default ErrorPopup;
