import React, { useState } from "react";
import styles from '../styles/Tile.module.scss'
import { motion } from "framer-motion"

export const Tile = (props:any) => {
  const [selected, setSelected] = useState(false)
  
  return (
    <motion.div
    layout
    data-album-id={props.id}
    // whileHover={{scale:1.05}}
    // whileTap={{scale:0.9}}
    className={styles.tile}
    onClick= {(e) => {
      setSelected(!selected)
      props.tileClick(e)
    }}
    animate={{
      // rotateX: selected ? 360: 0,
      rotate: 360,
      scale: 1,
      y: 0
    }}
    transition = {{
      duration: 0.7 
    }}
    initial = {{
      scale: 0,
      y: "100vh"
    }}
  >
    <img data-is-img className={styles.thumbnail}/>
    <p className={styles.title}>{props.title}</p>
  </motion.div>
  )
}

export default Tile