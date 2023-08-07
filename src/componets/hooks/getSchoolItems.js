import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
export default function getSchoolItems(user, number) {
  const getItems = async ({ pageParam = 0 }) => {
    const res = await (
      await fetch(
        `https://kqo7qnhj0l.execute-api.us-east-1.amazonaws.com/prod/api/schoolitems?page=${pageParam}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token} `,
          },
        }
      )
    ).json();

    return {
      data: res,
      nextPage: pageParam + 1,
    };
  };
  //lastPage.data.count
  return useInfiniteQuery(["schoolitems"], getItems, {
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length * 20 <= lastPage.data.count) {
        return lastPage.nextPage;
      }
    },
    keepPreviousData: true,
  });
}
