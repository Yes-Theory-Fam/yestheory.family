import { FunctionalComponent } from "preact";
import { useAuthPocQuery } from "../../components/auth/authPoc.generated";
import { Box } from "@chakra-ui/react";

const E = () => {
  const [{ data, fetching, error }] = useAuthPocQuery();
  if (fetching) return <p>Fetching...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  return <p>{JSON.stringify(data)}</p>;
};

const AuthPoc: FunctionalComponent = () => {
  return (
    <Box my={56}>
      <E />
    </Box>
  );
};

export default AuthPoc;
