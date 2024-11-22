import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useSWR from "swr";

import { CheckInput } from "@/components/CheckInput";
import Loading from "@/components/Loading";
import http from "@/http";
import { Post } from "@/types";

const ViewPost = () => {
  const navigate = useNavigate();

  const { postId } = useParams<{ postId: string }>();
  const isNew = postId === "new";
  const { data: post, isLoading } = useSWR<Post>(
    isNew ? null : `/posts/${postId}`,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(
      formData.entries(),
    );

    data.keywords = (data.keywords as string).split(",").map((k) => k.trim());
    data.isPublished = data.isPublished === "true";
    data.isFeatured = data.isFeatured === "true";

    try {
      await (isNew
        ? http.post("/posts", data)
        : http.patch(`/posts/${postId}`, data));

      toast.success(
        isNew ? "Post created successfully!" : "Post updated successfully!",
      );
      navigate("/dashboard/posts");
    } catch (error) {
      http.handleError(error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await http.delete(`/posts/${postId}`);
      toast.success("Post deleted successfully!");
      navigate("/dashboard/posts");
    } catch (error) {
      http.handleError(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section className="grid gap-5">
      <Card>
        <CardHeader>
          <h3 className="text-2xl font-semibold">
            {!post ? "Crate New Post" : `Edit Post: ${post.title}`}
          </h3>
        </CardHeader>
        <CardBody>
          <form className="grid grid-cols-12 gap-3" onSubmit={handleSubmit}>
            <Input
              className="col-span-12"
              defaultValue={post ? post.title : ""}
              isRequired
              label="Title"
              name="title"
            />

            <Textarea
              className="col-span-12"
              defaultValue={post ? post.content : ""}
              isRequired
              label="Content"
              name="content"
            />

            <Select
              className="col-span-12"
              defaultSelectedKeys={[post ? post.contentType : "TEXT"]}
              isRequired
              label="Content Type"
              name="contentType"
            >
              <SelectItem key={"HTML"}>HTML</SelectItem>
              <SelectItem key={"MARKDOWN"}>Markdown</SelectItem>
              <SelectItem key={"TEXT"}>Plain Text</SelectItem>
            </Select>

            {!isNew && (
              <Input
                className="col-span-12"
                defaultValue={post ? post.keywords.join(", ") : ""}
                description="Separate keywords with commas"
                label="Keywords"
                name="keywords"
              />
            )}

            {!isNew && (
              <CheckInput
                className="col-span-12"
                defaultSelected={post ? post.isPublished : false}
                name="isPublished"
              >
                Published
              </CheckInput>
            )}

            {!isNew && (
              <CheckInput
                className="col-span-12"
                defaultSelected={post ? post.isFeatured : false}
                name="isFeatured"
              >
                Featured
              </CheckInput>
            )}

            <Button
              className="col-span-12"
              color="primary"
              fullWidth
              type="submit"
            >
              {isNew ? "Create Post" : "Update Post"}
            </Button>
          </form>
          {!isNew && (
            <div className="mt-3 flex justify-end">
              <Button color="danger" onClick={handleDelete}>
                Delete Post
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </section>
  );
};

export default ViewPost;
