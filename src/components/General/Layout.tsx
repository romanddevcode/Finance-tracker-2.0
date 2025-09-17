import React, { type ReactNode } from "react";
import Sidebar from "./Sidebar";
import AuthField from "./AuthField";
import ErrorPopup from "./NotificationPopup";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bgBase flex-col flex lg:flex-row relative transition">
      <Sidebar />
      <div className="absolute lg:fixed right-4 top-4 z-90">
        <AuthField />
      </div>
      <main className="flex-1 px-4 lg:px-30 py-6">{children}</main>

      <ErrorPopup />
    </div>
  );
};

export default Layout;
