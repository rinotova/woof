import { trpc } from "../../utils/trpc";
import CreateWoofForm from "../CreateWoofForm/CreateWoofForm";
import Woof from "../Woof/Woof";

const Timeline = () => {
  const { data, isLoading, isError, isFetching, isStale } =
    trpc.woof.list.useQuery({});

  return (
    <>
      <CreateWoofForm />
      {"Is Loading=" + isLoading}
      {"Is Fetching=" + isFetching}
      {"Is Stale=" + isStale}
      {"Data=" + JSON.stringify(data)}
      {!isLoading && !isError && (
        <div className="mx-auto max-w-4xl p-4">
          {data.wooves.map((woof) => {
            return <Woof key={woof.id} woof={woof} />;
          })}
        </div>
      )}
    </>
  );
};

export default Timeline;
