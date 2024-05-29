import {FeatureCard} from 'ui/home';
import {payload} from '../../../../lib/payload';

export const Features = async () => {
  const features = await payload.find({
    collection: 'feature',
    depth: 2,
  });

  const enabledFeatures = features?.docs?.filter((d) => !!d) ?? [];

  return (
    <>
      {enabledFeatures.map((f, i) => (
        <FeatureCard key={f.id} feature={f} inverted={i % 2 == 1} />
      ))}
    </>
  );
};
