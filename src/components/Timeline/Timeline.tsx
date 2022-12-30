import { useQueryClient } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { trpc } from "../../utils/trpc";
import CreateWoofForm from "../CreateWoofForm/CreateWoofForm";
import Woof from "../Woof/Woof";

const Timeline = () => {
  const { data, hasNextPage, fetchNextPage } = trpc.woof.list.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const wooves = data?.pages?.flatMap((page) => page.wooves) ?? [];
  console.log(wooves);
  return (
    <>
      <CreateWoofForm />

      <InfiniteScroll
        dataLength={wooves.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        <div className="mx-auto max-w-4xl p-4">
          {wooves.map((woof) => {
            return <Woof key={woof.id} woof={woof} />;
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Timeline;
