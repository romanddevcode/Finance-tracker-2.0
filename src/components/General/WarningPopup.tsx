import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WarningPopupProps {
  warningMessage?: string;
}

const WarningPopup = ({ warningMessage }: WarningPopupProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (warningMessage) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [warningMessage]);

  if (!warningMessage) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.p
          key={warningMessage}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-sm z-50 fixed top-3 left-1/2 transform -translate-x-1/2 rounded-lg bg-yellow-200 text-white shadow-lg p-4"
        >
          {warningMessage}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default WarningPopup;
