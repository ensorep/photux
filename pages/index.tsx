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
import Footer from '@/components/footer'


const inter = Inter({ subsets: ['latin'] })
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
  albumSample = (data ? data.slice(0, numOfAlbums) : []);

  const handleModal = () => {}

  const tileClick = async (e:any) => {
      const $tile = e.currentTarget
      const $title = document.querySelector('[data-is-title]')
      const albumId = $tile.dataset.albumId

      const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      const data = await res.json()
  }

  const leftTiles = () => {
    const oddArr = albumSample.filter((i:any) => (i.id % 2))
    return generateAlbumTiles(oddArr)
  }

  const rightTiles = () => {
    const evenArr = albumSample.filter((i:any) => !(i.id % 2))
    return generateAlbumTiles(evenArr)
  }

  const generateAlbumTiles = (arr: { id: number; title: string }[]) => {
      return arr.map((item: { id: number; title: string}) => (
        <Link 
          key={item.id}
          href={`album/${item.id}-${item.title.replaceAll(' ','-')}`}
        >
          <Tile 
          tileClick={tileClick} 
          key={item.id} 
          id={item.id} 
          title={item.title}
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
