import React from "react";
import useSWR from 'swr';
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from 'framer-motion';


import Header from "@/components/header";
import Tile from "@/components/tile";
import { fetchFn } from ".";

import styles from '@/styles/Album.module.scss'

let numOfPhotos = 15;


export const Album = (props:any) => {
  const currentPath = useRouter().asPath
  const regex = /\d/g
  const indexOfAlbumID = currentPath.search(regex)
  const albumID = parseInt(currentPath.slice(indexOfAlbumID, indexOfAlbumID+1))
  console.log(albumID)
  const albumTitle = currentPath.slice(indexOfAlbumID+1).replaceAll('-', ' ')
  const { data, error, isLoading } = useSWR(`https://jsonplaceholder.typicode.com/albums/${albumID}/photos`, fetchFn)
  const photoSample = (data ? data.slice(0, numOfPhotos) : []);


  const generatePhotoTiles = () => {
    console.log(photoSample)
    return photoSample.map((photo: { id: number; title: string, thumbnailUrl: string, url: string}) => (
      <Link 
        className={styles.photoTileLink}
        key={photo.id}
        href={photo.url}
      >
        <Tile 
        // tileClick={props.tileClick} 
        isPhotoTile = {true}
        key={photo.id}
        title={photo.title}
        thumbnail = {photo.thumbnailUrl}
        className={styles.photoTile}
        />
      </Link>
    ))
  }


  return (
    <>
    <main className={styles.main}>
      <Header/>
      {/* add loading animation */}
      <motion.h1 

      initial={{
        opacity: 0,
        scale: 0
      }}

      animate= {{
        opacity: 1,
        scale: 1
      }}

      transition= {{
        duration: 0.9,
      }}
      
      className={styles.title}>{albumTitle.includes('album') ? '' : albumTitle }</motion.h1>
      <div className={styles.wrapper}>
        {generatePhotoTiles()}

      </div>
    </main>
    </>     
    )
}
 

export default Album