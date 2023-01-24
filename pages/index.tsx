type Album = {
  id: number;
  title: string;
};

import Head from 'next/head'
import React, { useEffect } from 'react'
import Link from 'next/link'

//3rd party libraries
import useSWR from 'swr'
import { useUser } from '@auth0/nextjs-auth0/client';

//local resources
import Tile from '@/components/tile'
import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from '@/styles/Home.module.scss'
import Router from 'next/router';


let numOfAlbums = 12;
let albumSample: [];

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
  const { user, error, isLoading } = useUser();
  const { data } = useSWR('https://jsonplaceholder.typicode.com/albums', fetchFn)
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
          key={item.id * 820} 
          isPhotoTile = {false}
          title={item.title}
          id={item.id} 
          />
        </Link>
      )
    )
  }

  if (isLoading) {
    return ( <div>Loading...</div>) 
  }

  if (error) {
    return ( <div>{error.message}</div> )
  }

  if(user && !error && !isLoading) {
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
  } else {
    Router.push('/api/auth/login')
  }
}
