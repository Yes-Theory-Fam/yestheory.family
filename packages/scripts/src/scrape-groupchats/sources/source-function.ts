import {type Groupchat} from '../groupchat.js';

export type GroupchatSourceFunction = () => Promise<Groupchat[]>;
