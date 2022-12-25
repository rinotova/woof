import CreateWoofForm from "../CreateWoofForm/CreateWoofForm";
import type { Woof } from "../WoofList/WoofList";
import WoofList from "../WoofList/WoofList";

const wooves: Woof[] = [
  {
    id: 1,
    username: "rinotova",
    woofText: "first Woof",
  },
  {
    id: 2,
    username: "rinotova",
    woofText: "second Woof",
  },
  {
    id: 3,
    username: "rinotova",
    woofText: "third Woof",
  },
];

const Timeline = () => {
  return (
    <div>
      <CreateWoofForm />
      <WoofList wooves={wooves} />
    </div>
  );
};

export default Timeline;
