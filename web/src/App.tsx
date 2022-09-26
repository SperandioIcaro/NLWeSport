import './styles/main.css'
import * as Dialog from '@radix-ui/react-dialog'

import logoSVG from './assets/logo.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { SetStateAction, useEffect, useState } from 'react'
import { CreateAdModal } from './components/Form/CreateAdModal'
import axios from 'axios'

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  }
}

function App() {
  const[games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3030/games').then((response) => 
        setGames(response.data))      
  }, [])

  return (
    <div className='flex flex-col mx-w-[1344px] mx-auto items-center my-20'>
      <img src={logoSVG} alt="logo NLW eSports" />

      <h1 className='text-6xl text-white font-black mt-20 uppercase'>
        seu <span className=' text-transparent bg-linear-grad bg-clip-text'>duo</span> esta aqui
      </h1>

      <div className='grid grid-cols-7 gap-7 mt-16'>
        {games.map(game => {
          return (
            <GameBanner 
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      
      <Dialog.Root>
        
        <CreateAdBanner />
        
        <CreateAdModal />

      </Dialog.Root>
        
    </div>
  )
}

export default App
