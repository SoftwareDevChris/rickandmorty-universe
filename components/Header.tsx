import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";

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
        <div className={styles.mobile_menu_container}>
          {isOpen ? (
            <AiOutlineClose
              size={30}
              className={styles.header_icons}
              onClick={handleMenuClick}
            />
          ) : (
            <AiOutlineMenu
              size={30}
              className={styles.header_icons}
              onClick={handleMenuClick}
            />
          )}
        </div>
        {isOpen && (
          <nav className={styles.mobile_nav}>
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
        )}
        <div className={styles.logo_container} onClick={() => router.push("/")}>
          <RiSpaceShipFill fill="#21c056" size={30} />
          <h1 className={styles.h1}>RM Universe</h1>
        </div>
        <nav className={styles.web_nav}>
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
