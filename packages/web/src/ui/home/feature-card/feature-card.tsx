import {type FC} from 'react';
import {twMerge} from 'tailwind-merge';
import {Link} from 'ui';
import type {HomepageFeaturesQuery} from '../../../__generated__/graphql';
import {Button} from '../../common/button/button';
import {Heading} from '../../common/heading/heading';
import {Image} from '../../common/image/image';

type Exists<T> = Exclude<T, undefined | null>;
export type Feature = Exists<
  Exists<Exists<HomepageFeaturesQuery['Features']>['docs']>[number]
>;

export type FeatureCardProps = {
  feature: Feature;
  inverted: boolean;
};

export const FeatureCard: FC<FeatureCardProps> = ({feature, inverted}) => (
  <div
    className={twMerge(
      'flex flex-col gap-6 sm:min-h-96 sm:gap-14',
      inverted ? 'sm:flex-row-reverse' : 'sm:flex-row',
    )}
  >
    <div className='relative flex flex-1 items-center justify-center'>
      <Link href={feature.navPath!} hideUnderline>
        <Image
          src={feature.teaserImage.url!}
          height={feature.teaserImage.height!}
          width={feature.teaserImage.width!}
          shadow={inverted ? 'left' : 'right'}
          alt=''
          className='object-contain'
        />
      </Link>
    </div>
    <div className='flex flex-1 flex-col justify-center gap-3'>
      <Heading size='h3' frontText={feature.name} />
      <p>{feature.description}</p>
      <Link
        href={feature.navPath!}
        hideUnderline
        className='self-center md:self-auto'
      >
        <Button variant='outlined'>Take me there</Button>
      </Link>
    </div>
  </div>
);
