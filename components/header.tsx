import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.scss"

export const Header = () => (
  <div className={styles.wrapper}>

    <Link href="/" className={styles.title}>Photux</Link> 
    <Image
      className={styles.logo}
      src={'/Mobelux-logo.png'} 
      width="96" 
      height="89" 
      alt="mobelux logo"
    />  

  </div>
)
export default Header