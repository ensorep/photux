import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import Head from 'next/head'
import Link from "next/link";

// 3rd party libraries 
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';

//local resources
import Header from "@/components/header";
import Tile from "@/components/tile";
import Modal from "@/components/modal";
import { fetchFn } from "..";
import styles from '@/styles/Album.module.scss'

let numOfPhotos = 15;


export const Album = () => {
  const regex = /\d/g
  const currentPath:any = useRouter().asPath
  const albumID = parseInt(currentPath.match(regex))
  const { data, error, isLoading } = useSWR(`https://jsonplaceholder.typicode.com/albums/${albumID}/photos`, fetchFn)
  const photoSample = (data ? data.slice(0, numOfPhotos) : []);
  

  const [albums, setAlbums] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false)
  const [photoID, setPhotoID] = useState(0)

  const selectedTile = photoSample.find((photo:{id:number}) => photo.id === photoID)
  const close = () => setModalOpen(false)

  const open = (id:string) => {
    setPhotoID(parseInt(id))
    setModalOpen(true)
  }

  //persist data on refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageData = JSON.parse((window.localStorage.getItem('albums') || '{}'))
      setAlbums(localStorageData);
    }
  }, []);

  const getAlbumTitle = () => {
    if(!!albums && !!albumID) {
      //@ts-ignore
      return albums[albumID-1]['title']
    }
  }


   


  const generatePhotoTiles = () => {
    return photoSample.map((photo: { id: number; title: string, thumbnailUrl: string, url: string}, i:number) => (
      <div
        className={styles.photoTileLink}
        key={i}
      >
        <Tile
          className={styles.photoTile}
          modalOpen = {modalOpen}
          setModalOpen = {setModalOpen}
          open = {open}
          close = {close}
          // key = {i}
          isPhotoTile = {true}
          title = {photo.title}
          url = {photo.url}
          thumbnail = {photo.thumbnailUrl}
          id = {photo.id}
        />
      </div>
    ))
  }

  return (
    <>
      <Head>
        <title>Photux | {!!albums && albums[albumID-1]?.title} </title>
        <meta name="description" content="Photo App for Mobelux by Texhale" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header/>
        <motion.div 
          className={styles.title}
          initial = {{ scale: 0 }}
          animate = {{ scale: 1 }}
          transition = {{ duration: 0.9 }}
        >
          <div className={styles.breadcrumbs}>
            <Link  className={styles.back} href="/">
              Photo <br/> Albums
            </Link>
            <span className={styles.albumTitle}>
                {getAlbumTitle()}
            </span>
          </div>
        </motion.div>

        <div className={styles.wrapper}>
          {generatePhotoTiles()}
        </div>
        <AnimatePresence
          initial={false}
          mode = "wait"
        >
          { !!modalOpen &&
            <Modal 
              handleClose={close} 
              url={ selectedTile.url } 
              title={ selectedTile.title }
            /> }
        </AnimatePresence>
      </main>
    </>     
  )
}

export default Album