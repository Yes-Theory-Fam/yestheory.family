/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import {generatePageMetadata, RootPage} from '@payloadcms/next/views';
import {type Metadata} from 'next';
import config from '@payload-config';
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

type Args = {
  params: {
    segments: string[];
  };
  searchParams: {
    [key: string]: string | string[];
  };
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({config, params, searchParams});

const Page = ({params, searchParams}: Args) =>
  RootPage({config, params, searchParams});

export default Page;
