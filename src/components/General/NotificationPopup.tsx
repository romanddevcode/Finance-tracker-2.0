import { useEffect } from "react";
import { useNotificationStore } from "../../services/store/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const typeStyles = {
  error: "bg-red-500",
  success: "bg-green-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500 text-black",
};

const NotificationPopup = () => {
  const { notifications, removeNotification } = useNotificationStore();

  useEffect(() => {
    if (notifications.length > 0) {
      const timers = notifications.map((n) =>
        setTimeout(() => removeNotification(n.id), 3000)
      );

      return () => timers.forEach((t) => clearTimeout(t));
    }
  }, [notifications, removeNotification]);

  return (
    <div className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={clsx(
              "text-sm rounded-lg shadow-lg p-4 text-white",
              typeStyles[n.type]
            )}
          >
            {n.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPopup;
