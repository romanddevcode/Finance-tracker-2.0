import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { useMediaQuery } from "react-responsive";

import archery from "../../assets/archery.svg?react";
import histogram from "../../assets/chart-histogram.svg?react";
import coins from "../../assets/coins.svg?react";
import dashboard from "../../assets/dashboard-panel.svg?react";
import receipt from "../../assets/receipt.svg?react";
import CurrencyToggle from "./CurrencyToggle";
import ThemeToggle from "./ThemeToggle";
import LangugaeToggle from "./LanguageToggle";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation("dashboard");
  const location = useLocation();

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      {isDesktop ? (
        // ---------- DESKTOP ----------
        <motion.aside
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{ width: isHovered ? 256 : 64 }}
          className="fixed z-80 bg-sidebar text-textBase h-screen shadow-lg p-4"
        >
          {isHovered && (
            <h2 className="text-lg font-bold mb-4">
              {t("sidebar_main_title")}
            </h2>
          )}
          <nav className="flex flex-col space-y-2">
            <SidebarLink
              to="/"
              icon={dashboard}
              label={t("sidebar_panel_1")}
              isOpen={isHovered}
              active={location.pathname === "/"}
            />
            <SidebarLink
              to="/transactions"
              icon={receipt}
              label={t("sidebar_panel_2")}
              isOpen={isHovered}
              active={location.pathname === "/transactions"}
            />
            <SidebarLink
              to="/budget"
              icon={coins}
              label={t("sidebar_panel_3")}
              isOpen={isHovered}
              active={location.pathname === "/budget"}
            />
            <SidebarLink
              to="/analytics"
              icon={histogram}
              label={t("sidebar_panel_4")}
              isOpen={isHovered}
              active={location.pathname === "/analytics"}
            />
            <SidebarLink
              to="/goals"
              icon={archery}
              label={t("sidebar_panel_5")}
              isOpen={isHovered}
              active={location.pathname === "/goals"}
            />
          </nav>
          <div className="flex flex-col self-center py-4 gap-5">
            <CurrencyToggle isSidebarOpen={isHovered} />
            <LangugaeToggle isSidebarOpen={isHovered} />
            <ThemeToggle isSidebarOpen={isHovered} />
          </div>
        </motion.aside>
      ) : (
        // ---------- MOBILE ----------
        <div>
          {!isOpen && (
            <Button
              variant="outline"
              className="absolute top-4 left-4 z-80 bg-primary"
              onClick={toggleSidebar}
            >
              <Menu />
            </Button>
          )}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key={"off_zone"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bg-black  inset-0 z-80"
                onClick={toggleSidebar}
              />
            )}
            {isOpen && (
              // ---------- SIDEBAR ----------
              <motion.aside
                key={"sidebar"}
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3 }}
                className="w-64 bg-sidebar text-textBase h-screen fixed z-80 top-0 left-0 p-4 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Navigation</h2>
                  <Button variant="outline" onClick={toggleSidebar}>
                    <X />
                  </Button>
                </div>

                <nav className="flex flex-col space-y-2">
                  <SidebarLink
                    to="/"
                    icon={dashboard}
                    label={t("sidebar_panel_1")}
                    isOpen={true}
                    active={location.pathname === "/"}
                  />
                  <SidebarLink
                    to="/transactions"
                    icon={receipt}
                    label={t("sidebar_panel_2")}
                    isOpen={true}
                    active={location.pathname === "/transactions"}
                  />
                  <SidebarLink
                    to="/budget"
                    icon={coins}
                    label={t("sidebar_panel_3")}
                    isOpen={true}
                    active={location.pathname === "/budget"}
                  />
                  <SidebarLink
                    to="/analytics"
                    icon={histogram}
                    label={t("sidebar_panel_4")}
                    isOpen={true}
                    active={location.pathname === "/analytics"}
                  />
                  <SidebarLink
                    to="/goals"
                    icon={archery}
                    label={t("sidebar_panel_5")}
                    isOpen={true}
                    active={location.pathname === "/goals"}
                  />
                </nav>
                <div className="flex flex-col self-center py-4 gap-5">
                  <CurrencyToggle isSidebarOpen={isOpen} />
                  <LangugaeToggle isSidebarOpen={isOpen} />
                  <ThemeToggle isSidebarOpen={isOpen} />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

// --------- Link ----------
interface SidebarLinkProps {
  to: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  isOpen: boolean;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon: Icon,
  label,
  isOpen,
  active,
}) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 p-2 rounded transition ${
      active
        ? "bg-primary text-textBaseHoverSidebar"
        : "text-textBase hover:bg-primary hover:text-textBaseHoverSidebar"
    }`}
  >
    <Icon className={`w-6 h-6 ${active ? "text-white" : "text-black"}`} />
    {isOpen && <span className="text-sm font-medium">{label}</span>}
  </Link>
);

export default Sidebar;
