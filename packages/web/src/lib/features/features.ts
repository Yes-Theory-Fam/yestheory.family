import {notFound} from 'next/navigation';
import {type Feature} from '../../payload-types';
import {type NavLinkDefinition} from '../../ui';
import {getPayload} from '../payload';

const getFeatures = async (): Promise<Feature[]> => {
  const payload = await getPayload();
  const featuresResult = await payload.find({collection: 'feature'});

  return featuresResult?.docs ?? [];
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
