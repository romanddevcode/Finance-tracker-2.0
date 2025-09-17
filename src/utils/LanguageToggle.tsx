import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import useLanguageStore from "@/services/store/languageStore";

const languages = ["en", "de", "ua"];

interface LangugaeToggleProps {
  isSidebarOpen: boolean;
}

const LangugaeToggle: React.FC<LangugaeToggleProps> = ({ isSidebarOpen }) => {
  const { selectedLanguage, setLanguage } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ top: rect.top, left: rect.right + 8 });
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      setOpen(false);
    }
  }, [isSidebarOpen]);

  return (
    <>
      <Button
        variant="outline"
        disabled={!isSidebarOpen}
        className={` bg-secondary text-textBase shadow-md w-10 h-9`}
        onClick={handleClick}
      >
        {selectedLanguage.toUpperCase()}
      </Button>

      {createPortal(
        <AnimatePresence>
          {open && coords && isSidebarOpen && (
            <motion.ul
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.1 }}
              style={{
                position: "fixed",
                top: coords.top,
                left: coords.left,
              }}
              onMouseLeave={() => setOpen(false)}
              className="bg-secondary flex itens-center self-center text-textBase rounded-md shadow-lg  z-100"
            >
              {languages.map((l) => (
                <li
                  key={l}
                  onClick={() => {
                    setLanguage(l);
                    setOpen(false);
                  }}
                  className={`cursor-pointer  m-1 px-2 py-1  rounded transition ${
                    selectedLanguage === l
                      ? "bg-primary text-textBaseHoverSidebar"
                      : "hover:bg-primary"
                  }`}
                >
                  {l.toUpperCase()}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
export default LangugaeToggle;
