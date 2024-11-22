import {
  getKeyValue,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { LucideSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import { Post } from "@/types";

const ViewPosts = () => {
  const navigate = useNavigate();

  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const { data: posts } = useSWR<Post[]>("/posts/protected");

  useEffect(() => {
    if (!posts) return;
    setFilteredPosts(posts);
  }, [posts]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!posts) return;

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value),
    );

    setFilteredPosts(filtered);
  };

  const handleRowAction = (key: React.Key) => {
    navigate(`/dashboard/posts/${key}`);
  };

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "updatedAt",
      label: "Updated At",
    },
  ];

  const rows = filteredPosts.map((post) => ({
    key: post.id,
    title: post.title,
    updatedAt: new Date(post.updatedAt).toLocaleString(),
  }));

  return (
    <section className="grid gap-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex items-end justify-start gap-3">
          <h2 className="text-2xl font-bold">Posts</h2>
          <span className="text-sm text-gray-500">
            ({filteredPosts.length}/{posts?.length})
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Input
            className="max-w-xs"
            endContent={<LucideSearch />}
            onChange={handleFilter}
            placeholder="Search..."
            variant="faded"
          />
        </div>
      </div>

      <Table
        aria-label="Example table with dynamic content"
        isStriped
        onRowAction={handleRowAction}
        selectionMode="single"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default ViewPosts;
