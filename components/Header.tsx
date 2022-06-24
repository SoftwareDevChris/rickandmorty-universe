import { FunctionComponent } from "react";
import Link from "next/link";

import styles from "../styles/Header.module.css";

const NavItems: string[] = ["characters"];

const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <ul>
        <li>
          <Link href="/">
            <a>home</a>
          </Link>
        </li>
        {NavItems.map((item, i) => (
          <li key={i}>
            <Link href={"/" + item}>
              <a>{item}</a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
