import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";

import { motion } from "framer-motion";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { RiSpaceShipFill } from "react-icons/ri";

import styles from "../styles/Header.module.scss";

const Header: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const router = useRouter();

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const pages = ["characters", "about"];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.mobileMenuIcons}>
          {isOpen ? (
            <AiOutlineClose
              size={30}
              className={styles.headerIcon}
              onClick={handleMenuClick}
            />
          ) : (
            <AiOutlineMenu
              size={30}
              className={styles.headerIcon}
              onClick={handleMenuClick}
            />
          )}
        </div>
        {isOpen && (
          <nav className={styles.mobileNav}>
            <motion.ul
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {pages.map((el) => {
                return (
                  <motion.li key={el} whileHover={{ scale: 1.1 }}>
                    <a href={`/${el}`}>{el}</a>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>
        )}
        <div className={styles.logoContainer} onClick={() => router.push("/")}>
          <RiSpaceShipFill fill="#21c056" size={30} />
          <h1 className={styles.h1}>RM Universe</h1>
        </div>
        <nav className={styles.webNav}>
          <ul>
            {pages.map((el) => {
              return (
                <li key={el}>
                  <a href={`/${el}`}>{el}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
