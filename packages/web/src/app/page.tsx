import {type Metadata} from 'next';
import {Wip} from 'ui/misc';

export const metadata: Metadata = {
  description:
    'Welcome to the Yes Fam! The community around well-known YouTube channel Yes Theory.',
};

// We re-export the 404 component here to avoid 404 error codes on the index page which isn't good for SEO
export default Wip;
