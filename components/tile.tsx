import React, { use, useState } from "react";
import styles from '../styles/Tile.module.scss'
import { motion } from "framer-motion"

export const Tile = (props:any) => {
  // const [selected, setSelected] = useState(false)
  const [transform, setTransform] = useState(false)
  
  return (
    <motion.div
    layout
    data-album-id={props.id}
    // whileHover={{scale:1.05}}
    // whileTap={{scale:0.9}}
    className={props.isPhotoTile? styles.photoTile : styles.tile}
    onClick= {(e) => {
      if(props.isPhotoTile){
        const $currentTile = e.currentTarget;
        const $photoTitle = $currentTile.querySelector('[data-photo-title]');
    
        $currentTile.querySelector('p')?.classList.toggle('hide');
        $currentTile.classList.toggle('modal');
        // $photoTitle?.classList.toggle('hide');
        setTransform(!transform)
      }
      // props.tileClick(e)
    }}
    animate={{
      rotate: 360,
      rotateX: transform ? 360 : 0,
      scale: transform ? 1.25 : 1,
      y: 0
    }}
    transition = {{
      duration: 0.65 
    }}
    initial = {{
      scale: 0,
      y: "100vh"
    }}
  >
    {props.isPhotoTile && (
      // Modal shit
      <img src={transform ? props.url : props.thumbnail} className={styles.thumbnail}/>
    )}
    <div className={styles.tile_bottom}>
    <p data-photo-title className={props.isPhotoTile ? styles.photoTitle : styles.title}>{props.title}</p>
    </div>
  </motion.div>
  )
}

export default Tile