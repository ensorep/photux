import React from "react";
import styles from '../styles/Tile.module.scss'
import { motion } from "framer-motion"

interface TileProps {
  isPhotoTile: boolean,
  title: string,
  id?: number,
  url?: string,
  thumbnail?: string,
  onClick?: any,
  className?: string,
  modalOpen?: any,
  setModalOpen?: any,
  close?: any,
  open?: any
}

export const Tile:React.FunctionComponent<TileProps> = (props) => {  

  return (
    <motion.div
      layout
      data-album-id={props.id}
      whileHover={{scale:1.05}}
      onClick={() => { 
        if(!!props.open){
          props.modalOpen ? props.close() : props.open(props.id) 
        }
        
      }}
      className={props.isPhotoTile? styles.photoTile : styles.albumTile}
      animate={{
        rotate: 360,
        rotateX: 0,
        scale: 1,
        y: 0
      }}
      transition = {{duration: 0.65}}
      initial = {{
        scale: 0,
        y: "100vh"
      }}
    >
    {!!props.isPhotoTile && (
      <img src={props.thumbnail} className={styles.thumbnail} alt={`great picture #${props.id}`}/>
    )}
    <div className={styles.tile_bottom}>
    <p data-photo-title className={props.isPhotoTile ? styles.photoTitle : styles.title}>{props.title}</p>
    </div>
  </motion.div>
  )
}

export default Tile