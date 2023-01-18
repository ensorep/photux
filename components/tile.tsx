import React from "react";
import styles from '../styles/Tile.module.scss'
import { motion } from "framer-motion";

export const Tile = (props:any) => {
  return (
    <div className={styles.tile}>
      <p className={styles.title}>{props.title}</p>
    </div>
  )
}

export default Tile