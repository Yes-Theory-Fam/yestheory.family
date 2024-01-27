import Image from 'next/image';
import type {FC} from 'react';
import {ScrollToActionContainer} from 'ui/client';
import CloudBig from '../../../../assets/cloudBig.webp';
import CloudBot from '../../../../assets/cloudBot.webp';
import MountainDude from '../../../../assets/dude-on-mountain.webp';

export const Parallax: FC = () => {
  return (
    <div className='relative h-screen overflow-hidden'>
      <div className='fixed inset-0 -z-50 flex items-center justify-center'>
        <div
          role='presentation'
          className='inset-0 flex items-center justify-center text-[42vw] font-black uppercase text-brand-800'
        >
          Yes
        </div>
      </div>

      <div className='absolute -inset-x-3/4 bottom-0 top-1/3 -z-40'>
        <Image priority fill src={CloudBig} alt='' className='object-contain' />
        <Image priority fill src={CloudBig} alt='' className='object-contain' />
      </div>

      <div className='fixed inset-0 bottom-[-30%] -z-30 flex items-center justify-center'>
        <div className='relative h-1/2 w-full'>
          <Image
            priority
            fill
            src={MountainDude}
            sizes='(max-width: 480px) 480px, (max-width: 768px) 768px, 100vw'
            alt=''
            className='absolute inset-x-0 object-cover'
          />
        </div>
      </div>

      <div className='absolute inset-x-0 bottom-0 -z-20 h-14 bg-gradient-to-t from-white' />

      <div className='absolute inset-0 -z-10'>
        <Image priority fill src={CloudBot} alt='' className='object-cover' />
        <Image
          priority
          fill
          src={CloudBot}
          alt=''
          className='object-contain object-bottom 2xl:object-cover'
        />
      </div>

      <ScrollToActionContainer text='Dive in' />
    </div>
  );
};
