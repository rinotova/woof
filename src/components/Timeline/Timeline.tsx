import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { RouterInputs} from "../../utils/trpc";
import { trpc } from "../../utils/trpc";
import CreateWoofForm from "../CreateWoofForm/CreateWoofForm";
import Woof from "../Woof/Woof";

const Timeline = ({ where = {} }: { where: RouterInputs['woof']['list']['where'] }) => {
  const { data, hasNextPage, fetchNextPage } = trpc.woof.list.useInfiniteQuery(
    {
      where,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const wooves = data?.pages?.flatMap((page) => page.wooves) ?? [];
  const {data: session} = useSession();

  return (
    <>
      {session && <CreateWoofForm />}

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
