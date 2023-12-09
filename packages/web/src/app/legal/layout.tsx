import {type FC, type PropsWithChildren} from 'react';

const LegalLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='mx-4 mt-16 flex flex-col items-start text-left md:mx-8 md:mt-24 xl:mx-auto'>
      {children}
    </div>
  );
};

export default LegalLayout;
