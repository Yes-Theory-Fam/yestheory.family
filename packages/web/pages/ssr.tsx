import { FunctionalComponent } from "preact";

interface SSRProps {
  framework: string;
}

const SSR: FunctionalComponent<SSRProps> = ({ framework }) => (
  <div>{framework} ssr example</div>
);
export default SSR;

export const getServerSideProps = (): { props: SSRProps } => ({
  props: { framework: "preact" },
});
