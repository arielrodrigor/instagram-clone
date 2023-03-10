import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from "@/components/Header";
import Feed from "@/components/Feed";
import Modal from "@/components/Modal";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={'bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Instagram 2.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={''}>
          {/*Header*/}
          <Header/>

          {/*Feed*/}
          <Feed/>

          {/*Modal*/}
           <Modal />

      </main>
    </div>
  )
}
