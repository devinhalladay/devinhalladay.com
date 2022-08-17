import Swish from '../components/Swish'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import About from '../components/About'

const Home: NextPage = () => {
  return (
    <>
      <div className="p-5 bg-black text-white grid grid-cols-5">
        <Head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Devin Halladay — Software Designer + Engineer</title>
        </Head>
        <About />
      </div>
    </>
  )
}

export default Home
