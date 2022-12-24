import Image from "next/image";
import { Woof } from "../WoofList/WoofList";

const Woof: React.FC<Woof> = ({ username, woofText }) => {
  return (
    <div className="shadow-solid relative rounded-lg bg-gray-800 p-6 text-white shadow-lg">
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <svg
          className="h-6 w-6 fill-current text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            fill="currentColor"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
      <div className="mb-4 flex items-center">
        <Image
          src="https://i.pravatar.cc/120"
          alt="avatar"
          className="mr-4 h-12 w-12 rounded-full"
          width={120}
          height={120}
        />
        <div className="text-lg font-bold">{username}</div>
      </div>
      <div className="text-gray-300">{woofText}</div>
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
