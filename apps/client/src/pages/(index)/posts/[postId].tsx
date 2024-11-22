import { User as UserComponent } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import Loading from "@/components/Loading";
import { Post, User } from "@/types";

const ViewPost = () => {
  const { postId } = useParams<{ postId: string }>();

  const { data: post } = useSWR<Post>(`/posts/${postId}`);
  const { data: author } = useSWR<User>(
    post ? `/authors/${post.authorId}` : null,
  );

  if (!post) return <Loading />;

  return (
    <div className="mx-auto grid max-w-3xl gap-10">
      <div className="grid gap-3">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-end gap-10">
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
      <p
        className="text-lg"
        style={{
          whiteSpace: "pre-wrap",
        }}
      >
        {post.content}
      </p>
    </div>
  );
};

export default ViewPost;
