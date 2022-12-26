import Image from "next/image";
import type { RouterOutputs } from "../../utils/trpc";

const Woof = ({
  woof,
}: {
  woof: RouterOutputs["woof"]["list"]["wooves"][number];
}) => {
  return (
    <div className="shadow-solid relative mt-4 rounded-lg bg-gray-800 p-6 text-white shadow-lg">
      <div className="mb-4 flex items-center">
        {woof.author.image && (
          <Image
            src={woof.author.image}
            alt="avatar"
            className="mr-4 h-12 w-12 rounded-full"
            width={120}
            height={120}
          />
        )}

        <div className="text-lg font-bold">{woof.author.name}</div>
      </div>
      <div className="text-gray-300">{woof.text}</div>
      <div className="mt-4 flex justify-between">
        <div className="text-xs text-gray-500">
          <span className="font-bold text-green-500">15</span> retweets
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-bold text-pink-500">25</span> likes
        </div>
      </div>
      <div className="mt-4">
        <button className="rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-400">
          Retweet
        </button>
        <button className="ml-4 rounded-full bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-400">
          Like
        </button>
      </div>
    </div>
  );
};

export default Woof;
