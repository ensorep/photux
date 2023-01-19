import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import Profile from '@/components/profile'
import Link from 'next/link'
import useSWR from 'swr'
import Tile from '@/components/tile'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })
let numOfAlbums = 12;
let numOfPhotos = 15;

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
  const [tileState, setTileState] = useState('albums')
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/albums', fetchFn)
  const albumSample = (data ? data.slice(0, numOfAlbums) : []);

  const handleModal = () => {}

  const tileClick = async (e:any) => {
    if(tileState === 'albums'){
      const $tile = e.currentTarget
      const $title = document.querySelector('[data-is-title]')
      const albumId = $tile.dataset.albumId
      
      const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      const data = await res.json()
      const photoSample = (data.slice(0, numOfPhotos))
    
      $title.textContent = $tile.textContent

      convertTile(photoSample)
      setTileState('photos')
    } else {
      handleModal()
    }
    
  }

  const convertTile = (photoArr:[]) => {
    const $tiles = [...document.querySelectorAll('[data-album-id]')]
    console.log($tiles[0])
    return photoArr.map((photo:any,i) => {
      if($tiles[i]){
        $tiles[i].lastChild.textContent = photo.title
        $tiles[i].lastChild.classList.add('photo-title')
        $tiles[i].firstChild.style.display = 'block'
        $tiles[i].firstChild.src = photo.thumbnailUrl


      }
    })
  }

  const leftTiles = () => {
    const oddArr = albumSample.filter((i:any) => (i.id % 2))
    return tileGenerator(oddArr)
  }

  const rightTiles = () => {
    const evenArr = albumSample.filter((i:any) => !(i.id % 2))
    return tileGenerator(evenArr)
  }

  const tileGenerator = (arr: { id: number; title: string }[]) => {
      return arr.map((item: { id: number; title: string}) => (
      <Tile 
        tileClick={tileClick} 
        key={item.id} 
        id={item.id} 
        title={item.title}
      />)
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
      </main>
    </>
  )
}
