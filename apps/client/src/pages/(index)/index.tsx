import { Button, Image, Link } from "@nextui-org/react";
import useSWR from "swr";

import Loading from "@/components/Loading";
import { PostCard } from "@/components/PostCard";
import { Post } from "@/types";

const Index = () => {
  return (
    <div className="grid gap-20">
      <Hero />
      <Featured />
    </div>
  );
};

export default Index;

const Hero = () => {
  return (
    <div className="grid place-items-center">
      <Image
        alt="Hero"
        className="h-[75vh] w-full object-contain"
        src="/hero.jpg"
      />
    </div>
  );
};

const Featured = () => {
  const { data: featured } = useSWR<Post[]>("/posts/featured");

  if (!featured) return <Loading />;

  return (
    <div className="grid gap-5">
      <div className="">
        <h2 className="text-2xl font-bold">Featured Posts</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button as={Link} href={"/posts"} variant="bordered">
          <strong>View All Posts</strong>
        </Button>
      </div>
    </div>
  );
};
