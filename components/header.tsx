import React from "react";
import Link from "next/link";
import styles from "../styles/Header.module.scss"

export const Header = () => (
  <div>
    <p className={styles.title}>Photux</p>
    <Link href="/api/auth/login">Login</Link>
      <br/>
    <Link href="/api/auth/logout">Logout</Link>
  </div> 
)

export default Header