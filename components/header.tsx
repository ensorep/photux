import React from "react";
import Link from "next/link";
import styles from "../styles/Header.module.scss"

export const Header = () => (
    <Link href="/" className={styles.title}>Photux</Link>
)
export default Header