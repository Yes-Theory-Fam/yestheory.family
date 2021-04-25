import { FunctionalComponent } from "preact";

interface SSGProps {
  framework: string;
}

const SSG: FunctionalComponent<SSGProps> = ({ framework }) => (
  <div>{framework} ssg example</div>
);
export default SSG;

export const getStaticProps = (): { props: SSGProps } => ({
  props: { framework: "preact" },
});
