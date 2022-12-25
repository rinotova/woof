import Head from "next/head";
import NavBar from "../Navbar/Navbar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-yellow-200">
      <Head>
        <title>Woof</title>
        <meta name="description" content="As seen in The Office" />
      </Head>
      <NavBar />
      <main className="mx-auto max-w-screen-md">{children}</main>
    </div>
  );
};

export default PageLayout;
