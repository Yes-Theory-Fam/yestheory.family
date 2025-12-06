import {getPayload as getPayloadOriginal} from 'payload';
import config from '@payload-config';

export const getPayload = () => getPayloadOriginal({config});
