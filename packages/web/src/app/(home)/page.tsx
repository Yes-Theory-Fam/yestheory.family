import {type Metadata} from 'next';
import {type FC} from 'react';
import {Container} from 'ui';
import {Features} from './components/features';
import {Intro} from './components/intro';
import {Parallax} from './components/parallax';

export const metadata: Metadata = {
  description:
    'Welcome to the Yes Fam! The community around well-known YouTube channel Yes Theory.',
};

const Page: FC = () => {
  return (
    <>
      <Parallax />
      <div className='bg-white pt-8'>
        <Container className='sm:py-8'>
          <div className='flex flex-col gap-10 px-4'>
            <Intro />
            <Features />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Page;
