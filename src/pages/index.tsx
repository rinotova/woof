import { type NextPage } from "next";
import type { GetSessionParams} from "next-auth/react";
import { getSession } from "next-auth/react";
import Timeline from "../components/Timeline/Timeline";

const Home: NextPage = () => {
  return <Timeline where={{}} />;
};

export default Home;

export const getServerSideProps = async (context: GetSessionParams | undefined) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};