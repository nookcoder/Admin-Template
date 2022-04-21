import React from "react";
import GlobalNavigationBar from "../common/GlobalNavigationBar";
import styles from "../styles/Layout.module.scss";

interface AppLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <GlobalNavigationBar />
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;
