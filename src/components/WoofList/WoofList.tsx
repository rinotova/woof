import Woof from "../Woof/Woof";

export interface Woof {
  id: number;
  username: string;
  woofText: string;
}

interface WoofListProps {
  wooves: Woof[];
}

const WoofList: React.FC<WoofListProps> = ({ wooves }) => {
  return (
    <div className="mx-auto max-w-4xl p-4">
      {wooves.map((woof) => {
        return <Woof key={woof.id} {...woof} />;
      })}
    </div>
  );
};

export default WoofList;
