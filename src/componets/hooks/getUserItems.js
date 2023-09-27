import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useFilter } from "../../../store/FilterContext";
export default function getUserItems(user, type) {
  const { filter, setFilter } = useFilter();
  const getItems = async ({ pageParam = 0 }) => {
    const res = await (
      await fetch(`http://136.244.139.127:3000/api/useritems`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token} `,
        },
      })
    ).json();

    return {
      data: res,
      nextPage: pageParam + 1,
    };
  };
  //lastPage.data.count
  return useInfiniteQuery(["useritems"], getItems, {
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length * 20 <= lastPage.data.count) {
        return lastPage.nextPage;
      }
    },
    keepPreviousData: true,
  });
}
