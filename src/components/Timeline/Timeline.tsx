import { trpc } from "../../utils/trpc";
import CreateWoofForm from "../CreateWoofForm/CreateWoofForm";
import Woof from "../Woof/Woof";

const Timeline = () => {
  const { data, isFetching, isError, hasNextPage, fetchNextPage } =
    trpc.woof.list.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const wooves = data?.pages.flatMap((page) => page.wooves) ?? [];

  return (
    <>
      <CreateWoofForm />

      <div className="mx-auto max-w-4xl p-4">
        {wooves.map((woof) => {
          return <Woof key={woof.id} woof={woof} />;
        })}
      </div>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        Load more...
      </button>
    </>
  );
};

export default Timeline;
