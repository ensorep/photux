import React from "react";
import Link from "next/link";
import styles from "../styles/Footer.module.scss"


export const Footer = () => (
  <div className={styles.footer}>
    <Link href="/api/auth/logout">Logout</Link>
  </div> 
)

export default Footer