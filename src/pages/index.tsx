import { type NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import type { Woof } from "../components/WoofList/WoofList";
import WoofList from "../components/WoofList/WoofList";

const Home: NextPage = () => {
  const wooves: Woof[] = [
    {
      id: 1,
      username: "rinotova",
      woofText: "first Woof",
    },
    {
      id: 2,
      username: "rinotova",
      woofText: "first Woof",
    },
    {
      id: 3,
      username: "rinotova",
      woofText: "first Woof",
    },
  ];
  const signInHandler = () => {
    void signIn("google", { callbackUrl: "http://localhost:3000" });
  };
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Head>
        <title>Woof</title>
        <meta name="description" content="As seen in The Office" />
      </Head>
      <div>npm </div>
      <button onClick={signInHandler}>Sign In</button>
      <WoofList wooves={wooves} />
    </>
  );
};

export default Home;
