import {notFound} from 'next/navigation';
import {type NavLinkDefinition} from '../../ui';
import {type FeaturesQuery, graphqlWithHeaders} from '../graphql/client';

type Defined<T> = Exclude<T, null | undefined>;
type Features = Defined<Defined<FeaturesQuery['Features']>['docs']>;
type Feature = Defined<Features[number]>;

const getFeatures = async (): Promise<Feature[]> => {
  const data = await graphqlWithHeaders((sdk) => sdk.Features());

  return (data.Features?.docs ?? []).filter((f): f is Feature => !!f);
};

const isNavEnabled = async (path: string): Promise<boolean> => {
  const features = await getFeatures();
  const feature = features.find((f) => path.startsWith(f.pathPrefix));

  // If not defined otherwise, we consider a page accessible (think legal stuff that isn't setup in payload)
  return feature?.enabled ?? true;
};

export const getNavRoutes = async (): Promise<NavLinkDefinition[]> => {
  const features = await getFeatures();

  return features
    .filter((f) => f.enabled)
    .map((f) => ({text: f.name, href: f.navPath ?? '#'}));
};

export const ensureNavEnabled = async (path: string) => {
  const enabled = await isNavEnabled(path);

  if (!enabled) {
    notFound();
  }
};
