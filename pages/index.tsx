type Album = {
  id: number;
  title: string;
};

import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.scss'
import Profile from '@/components/profile'
import Link from 'next/link'
import useSWR from 'swr'
import Tile from '@/components/tile'
import Header from '@/components/header'
import Footer from '@/components/footer'
 

let numOfAlbums = 12;

export let albumSample: [];

export const fetchFn = async (args:any) => {
  try {
  const res = await fetch(args)
  const data = await res.json()
  return data
  }
  catch (err) {
    console.error(err)
  }
}

export default function Home() {
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/albums', fetchFn)
  // const [albumTitle, setAlbumTitle] = useState([])



  albumSample = (data ? data.slice(0, numOfAlbums) : []);

  useEffect(() => {
    try{
      window.localStorage.setItem('albums', JSON.stringify(data));
    } catch (err) {
      console.warn(err)
    }
  },[data]);


  const handleModal = () => {}

  const leftTiles = () => {
    const oddArr = albumSample.filter(( i: Album ) => (i.id % 2))
    return generateAlbumTiles(oddArr)
  }

  const rightTiles = () => {
    const evenArr = albumSample.filter(( i: Album ) => !(i.id % 2))
    return generateAlbumTiles(evenArr)
  }

  const generateAlbumTiles = (arr: { id: number; title: string }[]) => {
      return arr.map((item: { id: number; title: string}) => (
        <Link 
          key={item.id}
          href={`album/${item.id}`}
        >
          <Tile 
          key={item.id} 
          isPhotoTile = {false}
          title={item.title}
          id={item.id} 
          />
        </Link>
      )
    )
  }
  
  return (
    <>
      <Head>
        <title>Photux</title>
        <meta name="description" content="Photo App for Mobelux by Texhale" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <Header/>
       {/* {Profile() ? Profile() : ''} */}
       <h2 data-is-title className={styles.title}>Photo Albums</h2>
       <div className={styles.wrapper}>
       
          <div className={styles.tileWrapperA}>
              {leftTiles()}
          </div>

          <div className={styles.tileWrapperB}>
            {rightTiles()}
          </div>
       </div>
       <Footer/>
      </main>
    </>
  )
}
