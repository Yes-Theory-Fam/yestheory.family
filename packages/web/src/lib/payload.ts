import {getPayloadHMR} from '@payloadcms/next/utilities';
import config from '@payload-config';

export const payload = await getPayloadHMR({config});
