import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import Profile from '@/components/profile'
import Link from 'next/link'
import useSWR from 'swr'
import Tile from '@/components/tile'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })
let numOfItems = 12;

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
  const dataSample = (data ? data.slice(0, numOfItems) : []);

  const leftTiles = () => {
    const oddArr = dataSample.filter(i => (i.id % 2))
    return tileGenerator(oddArr)
  }

  const rightTiles = () => {
    const evenArr = dataSample.filter(i => !(i.id % 2))
    return tileGenerator(evenArr)
  }

  const tileGenerator = (arr: { id: number; title: string }[]) => {
      return arr.map((item: { id: number; title: string}) => <Tile key={item.id} title={item.title}/>)
    }
  

  return (
    <>
      <Head>
        <title>Photux</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <Header/>
       {/* {Profile() ? Profile() : ''} */}
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
