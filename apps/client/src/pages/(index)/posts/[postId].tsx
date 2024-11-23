import { Image, User as UserComponent } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Carousel";
import Loading from "@/components/Loading";
import { Post, User } from "@/types";
import { getFileUrl } from "@/utils";

const ViewPost = () => {
  const { postId } = useParams<{ postId: string }>();

  const { data: post } = useSWR<Post>(`/posts/${postId}`);
  const { data: author } = useSWR<User>(
    post ? `/authors/${post.authorId}` : null,
  );

  if (!post) return <Loading />;

  const Content = () => {
    switch (post.contentType) {
      case "HTML":
        return (
          <div
            className="no-reset"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        );
      case "MARKDOWN":
        return <Markdown className="no-reset">{post.content}</Markdown>;
      default:
        return (
          <p
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            {post.content}
          </p>
        );
    }
  };

  return (
    <div className="mx-auto grid max-w-3xl gap-10">
      <div className="grid gap-10">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-end justify-between gap-10">
          <UserComponent
            description={author?.aka || "Blogger"}
            name={author?.displayName}
          />
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div>
        <Slides post={post} />
      </div>
      <div className="text-lg">
        <Content />
      </div>
    </div>
  );
};

export default ViewPost;

const Slides = ({ post }: { post: Post }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="grid gap-5">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {post.images.map((image, index) => (
            <CarouselItem className="flex justify-center" key={index}>
              <Image
                alt={post.title}
                className="h-96 w-full object-cover"
                src={getFileUrl(image)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        {Array.from({ length: count }).map((_, index) => (
          <span
            className={`mx-1 inline-block h-2 w-2 rounded-full ${
              current === index + 1 ? "bg-primary" : "bg-foreground"
            }`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
