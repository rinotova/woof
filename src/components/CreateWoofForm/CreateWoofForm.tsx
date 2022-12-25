import type { FormEvent } from "react";
import { useState } from "react";
import { object, string } from "zod";
import { trpc } from "../../utils/trpc";

export const WoofSchema = object({
  text: string({
    required_error: "Woof text must be at lest 3 characters long",
  })
    .min(10)
    .max(280),
});

function CreateWoofForm() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync } = trpc.woof.create.useMutation();

  const createWoof = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await WoofSchema.parse({ text });
    } catch (e: any) {
      setError(e.message);
      return;
    }

    mutateAsync({ text });
  };
  return (
    <>
      <form
        className="rounded-lg bg-pink-600 py-4 px-6 shadow-xl"
        onSubmit={createWoof}
      >
        <textarea
          className="block h-48 w-full rounded-lg bg-pink-400 p-2 text-xl font-bold text-white"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="mt-4 rounded-full bg-pink-500 p-2 font-bold text-white hover:bg-pink-400"
          type="submit"
        >
          Woof
        </button>
      </form>
      {error && <p>{JSON.stringify(error)}</p>}
    </>
  );
}

export default CreateWoofForm;
