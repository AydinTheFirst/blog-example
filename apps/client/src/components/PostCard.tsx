import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  User as UserComponent,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import { Post, User } from "@/types";
import { getFileUrl } from "@/utils";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate();

  const { data: author } = useSWR<User>(`/authors/${post.authorId}`);

  const handlePress = () => {
    navigate(`/posts/${post.slug}`);
  };

  return (
    <Card isHoverable isPressable onPress={handlePress}>
      <CardHeader className="justify-center bg-content2">
        <Image
          alt={post.title}
          className="h-48 w-full object-cover"
          src={getFileUrl(post.images[0])}
        />
      </CardHeader>
      <CardBody className="grid gap-3">
        <h3 className="text-lg font-bold">{post.title}</h3>
      </CardBody>
      <CardFooter className="items-end justify-between">
        {author && (
          <UserComponent
            description={author.aka || "Blogger"}
            name={author.displayName}
          />
        )}
        <p className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </CardFooter>
    </Card>
  );
};
