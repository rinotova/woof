import { signIn, useSession } from "next-auth/react";
import React from "react";

function NavBar() {
  const signInHandler = () => {
    void signIn("google", { callbackUrl: "http://localhost:3000" });
  };
  const { data: session } = useSession();
  return (
    <nav className="mb-6 bg-pink-600 py-4 px-6 text-xl font-bold text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-black">Woof</h1>
        {!session && (
          <button className="ml-auto block" onClick={signInHandler}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
