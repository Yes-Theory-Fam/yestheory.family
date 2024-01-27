import {type Feature, FeatureCard} from 'ui/home';
import {graphqlWithHeaders} from '../../../lib/graphql/client';

export const Features = async () => {
  const featuresQuery = await graphqlWithHeaders((sdk) =>
    sdk.HomepageFeatures(),
  );

  const enabledFeatures =
    featuresQuery.Features?.docs?.filter((d): d is Feature => !!d) ?? [];

  return (
    <>
      {enabledFeatures.map((f, i) => (
        <FeatureCard key={f.id} feature={f} inverted={i % 2 == 1} />
      ))}
    </>
  );
};
