import React from "react"
import Swish from "./Swish"

const About = () => (
  <div
    className="flex flex-col space-y-3 col-span-5 fade transition-all ease-in-out"
  >
    <div className="flex space-x-3 mb-1 items-center overflow-scroll text-[14px]">
      <p className="font-mono font-normal uppercase tracking-wide">
        Devin Halladay
      </p>
      <a
        href="https://twitter.com/theflowingsky"
        target="_blank"
        rel="noopener noreferrer"
        className="custom hover:bg-yellow/30 hover:border-b-yellow hover:text-yellow font-serif"
      >@theflowingsky</a
      >
      <a
        href="https://are.na/devin"
        target="_blank"
        rel="noopener noreferrer"
        className="custom hover:bg-arena/30 hover:border-b-arena hover:text-arena-light font-serif"
      >Are.na</a
      >
      <a
        href="https://github.com/devinhalladay"
        target="_blank"
        rel="noopener noreferrer"
        className="custom hover:bg-github/30 hover:border-b-github hover:text-github font-serif"
      >Github</a
      >
    </div>
    <hr className="border-white/20" />
    <div className="sm:col-span-4 md:col-span-3 max-w-3xl space-y-3 pt-2">
      <h1>
        Multi-disciplinary senior designer based in NYC, specializing in
        software design and engineering.
      </h1>
      <p>
        Currently, I am a designer + engineer at{' '}
        <a
          href="https://replit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="custom hover:bg-replit/30 hover:border-b-replit hover:text-replit-light"
        >Replit</a
        >. Before that, I co-founded{' '}
        <a
          href="https://hydraulics.nyc/"
          target="_blank"
          rel="noopener noreferrer"
          className="custom hover:bg-hydro/30 hover:border-b-hydro hover:text-hydro"
        >Manhattan Hydraulics</a
        >, a product studio within{' '}
        <a
          href="https://www.garden3d.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="custom hover:bg-garden3d/30 hover:border-b-garden3d hover:text-garden3d"
        >Garden3D</a
        >
        {' '}and a partner to{' '}
        <a
          href="https://www.sanctuary.computer/"
          target="_blank"
          rel="noopener noreferrer"
          className="custom hover:bg-sanctu/50 hover:border-b-sanctu hover:text-sanctu-light"
        >Sanctuary Computer</a
        >
        {' '}and{' '}
        <a
          href="https://www.xxix.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="custom hover:bg-xxix/40 hover:border-b-xxix hover:text-xxix"
        >XXIX</a
        >. I was also Head of Product at
        <a
          href="https://index-space.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="custom hover:bg-index/40 hover:border-b-index hover:text-index-light"
        >Index</a
        >, and a product designer at{' '}
        <a
          href="https://palantir.com"
          target="_blank"
          rel="noopener noreferrer"
          className="custom hover:bg-palantir/40 hover:border-b-palantir hover:text-palantir"
        >Palantir</a
        >,{' '}
        <a
          href="https://quora.com"
          target="_blank"
          rel="noopener noreferrer"
          className="custom hover:bg-quora/40 hover:border-b-quora hover:text-quora-light"
        >Quora</a
        >,{' '}
        <a
          href="https://friendsoftheweb.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="custom hover:bg-fotw/30 hover:border-b-fotw hover:text-fotw"
        >Friends of the Web</a
        >, and{' '}
        <a
          href="https://www.64robots.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="custom hover:bg-robots/40 hover:border-b-robots hover:text-robots-light"
        >64 Robots</a
        >.
      </p>
      <p className="font-mono text-white/50">
        I also run{' '}
        <a
          href="https://pilgrim.tools"
          target="_blank"
          rel="noopener noreferrer"
          className="pt-0 pb-1"
        >Pilgrim</a
        >, an ambient research practice focused on next-generation creative tools. My thesis is that interoperable, ergonomic tools for knowledge work will accelerate the re-distribution of capital and democratize specialized skills.
      </p>
    </div>
    <div className="!pt-12">
      <Swish />
    </div>
  </div>
)

export default About