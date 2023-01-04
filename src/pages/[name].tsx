import { type NextPage } from "next";
import type { GetSessionParams } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Timeline from "../components/Timeline/Timeline";

const UserTimeline: NextPage = () => {
  const router = useRouter();
  const name = router.query.name as string;
  const filter = {
    author: {
      name,
    },
  };
  return <Timeline where={filter} />;
};

export default UserTimeline;

export const getServerSideProps = async (
  context: GetSessionParams | undefined
) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
