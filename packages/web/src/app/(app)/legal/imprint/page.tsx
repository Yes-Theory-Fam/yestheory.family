'use client';

import {type FC} from 'react';
import {Heading, Link} from 'ui';

const Imprint: FC = () => (
  <>
    <Heading frontText='Site Notice' size='h2' />

    <Heading
      frontText='Information pursuant to Sect. 5 German Telemedia Act (TMG)'
      size='h3'
    />
    <p>
      Michel von Varendorff
      <br />
      Meitnerstraße 8
      <br />
      30627 Hanover
    </p>

    <Heading frontText='Contact' size='h3' />
    <p>E-mail: michelvonv@me.com</p>

    <Heading frontText='VAT ID' size='h3' />
    <p>
      Sales tax identification number according to Sect. 27 a of the Sales Tax
      Law:
      <br />
      DE353294170
    </p>

    <Heading frontText='Person responsible for editorial' size='h3' />
    <p>
      Michel von Varendorff
      <br />
      Meitnerstraße 8
      <br />
      30627 Hanover
    </p>

    <Heading frontText='EU dispute resolution' size='h3' />
    <p>
      The European Commission provides a platform for online dispute resolution
      (ODR):{' '}
      <Link
        href='https://ec.europa.eu/consumers/odr/'
        target='_blank'
        rel='noopener noreferrer'
      >
        https://ec.europa.eu/consumers/odr/
      </Link>
      .<br /> Our e-mail address can be found above in the site notice.
    </p>

    <Heading
      frontText='Dispute resolution proceedings in front of a consumer arbitration board'
      size='h3'
    />
    <p>
      We are not willing or obliged to participate in dispute resolution
      proceedings in front of a consumer arbitration board.
    </p>
  </>
);

export default Imprint;
