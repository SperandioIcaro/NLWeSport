import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
    return(
        <div className='pt-1 mt-8 bg-linear-grad w-11/12 rounded-lg overflow-hidden'>
        <div className='flex flex-row justify-between items-center bg-[#2A2634] px-8 py-6 '>
          <div>
            <strong className='text-2xl text-white font-black block'>
              Não encontrou seu duo?
            </strong>
            <span className='text-zinc-400 block'>
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          <Dialog.Trigger className='px-6 py-4 bg-violet-500 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus />
            Publicar um anúncio
          </Dialog.Trigger>
        </div>
      </div>
    )
}