import { FC } from "react";
import { useRouter } from "next/router";

import { motion } from "framer-motion";

import styles from "../styles/Button.module.scss";

interface Props {
  children?: string;
  href: string;
}

const MyButton: FC<Props> = ({ children, href }: Props) => {
  const router = useRouter();

  return (
    <motion.button
      className={styles.button}
      onClick={() => router.push(href)}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
};

export default MyButton;
