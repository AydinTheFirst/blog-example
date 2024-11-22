import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { LucideSearch } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { PostCard } from "@/components/PostCard";
import { Post } from "@/types";

interface PaginatedPosts {
  data: Post[];
  meta: {
    isNextPageAvailable: boolean;
    limit: number;
    page: number;
  };
}

type OrderBy = "createdAt" | "title" | "updatedAt";

const ViewPosts = () => {
  const [paginate, setPaginate] = useState({ limit: 10, page: 1 });
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState<OrderBy>("createdAt");

  const { data } = useSWR<PaginatedPosts>(
    `/posts?page=${paginate.page}&limit=${paginate.limit}`,
  );

  useEffect(() => {
    if (!data) return;
    setPosts((prev) => [...prev, ...data.data]);
  }, [data]);

  const handlePaginate = () => {
    setPaginate({ ...paginate, page: paginate.page + 1 });
  };

  const filteredPosts = posts
    .sort((a, b) => {
      switch (orderBy) {
        case "createdAt":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "updatedAt":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        default:
          return 0;
      }
    })
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="grid gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex">
          <h2 className="text-2xl font-bold">
            All Posts
            <span className="mx-3 text-xs text-gray-500">
              ({filteredPosts.length}/{posts.length})
            </span>
          </h2>
        </div>
        <div className="flex justify-end gap-3">
          <Input
            className="max-w-xs"
            endContent={<LucideSearch />}
            onValueChange={setSearch}
            placeholder="Search posts"
            variant="faded"
          />
          <Select
            className="max-w-xs"
            onChange={(e) => setOrderBy(e.target.value as OrderBy)}
            placeholder="Order By"
            value={orderBy}
            variant="faded"
          >
            <SelectItem key={"createdAt"}>Created At</SelectItem>
            <SelectItem key={"title"}>Title</SelectItem>
            <SelectItem key={"updatedAt"}>Updated At</SelectItem>
          </Select>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-center">
        {data?.meta.isNextPageAvailable && (
          <Button onClick={handlePaginate} variant="bordered">
            <strong>Load More</strong>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ViewPosts;
