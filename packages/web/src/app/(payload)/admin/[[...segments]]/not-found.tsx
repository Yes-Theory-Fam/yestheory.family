import {NotFoundPage} from '@payloadcms/next/views';
import config from '@payload-config';
import {importMap} from '../importMap';

type Args = {
  params: {
    segments: string[];
  };
  searchParams: {
    [key: string]: string | string[];
  };
};

const NotFound = ({params, searchParams}: Args) =>
  NotFoundPage({config, importMap, params, searchParams});

export default NotFound;
