import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Progress,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { AxiosProgressEvent } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

import { CheckInput } from "@/components/CheckInput";
import Loading from "@/components/Loading";
import http from "@/http";
import { Post } from "@/types";
import { getFileUrl } from "@/utils";
import { LucideArrowLeft, LucideArrowRight, LucideTrash } from "lucide-react";

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

      {!isNew && post && <EditImages post={post} />}
    </section>
  );
};

export default ViewPost;

const EditImages = ({ post }: { post: Post }) => {
  const [uploadProgress, setUploadProgress] = useState<AxiosProgressEvent>();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(post.images);
  }, [post.images]);

  const handleSave = async () => {
    try {
      await http.patch(`/posts/${post.id}/images`, { images });
      toast.success("Images updated successfully!");
    } catch (error) {
      http.handleError(error);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      await http.post(`/posts/${post.id}/images`, formData, {
        onUploadProgress: setUploadProgress,
      });
      toast.success("Images uploaded successfully!");
      mutate(`/posts/${post.id}`);
    } catch (error) {
      http.handleError(error);
    }

    setUploadProgress(undefined);
  };

  const orderImages = (direction: "left" | "right") => {
    const newImages = [...images];
    if (direction === "left") {
      const lastImage = newImages.pop();
      newImages.unshift(lastImage!);
    } else {
      const firstImage = newImages.shift();
      newImages.push(firstImage!);
    }
    setImages(newImages);
  };

  const deleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  if (uploadProgress) {
    const percent = Math.round(
      (uploadProgress.loaded / uploadProgress.total!) * 100,
    );
    return (
      <Card>
        <CardBody>
          <Progress color="primary" value={percent} />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-2xl font-semibold">Edit Images</h3>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-12 gap-5">
          {images.map((image, i) => (
            <div className="relative col-span-4" key={i}>
              <button
                className="absolute end-0 top-0 z-50"
                onClick={() => deleteImage(i)}
              >
                <LucideTrash />
              </button>
              <img
                alt={`Product Image ${i + 1}`}
                className="h-48 w-full rounded-lg object-cover"
                src={getFileUrl(image)}
              />
              <div className="flex justify-between gap-3 p-3">
                <button onClick={() => orderImages("left")}>
                  <LucideArrowLeft />
                </button>
                <button onClick={() => orderImages("right")}>
                  <LucideArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
        <br />
        <Button className="ml-3" color="success" onClick={handleSave}>
          <strong>Save Images</strong>
        </Button>
      </CardBody>
      <CardBody>
        <form className="grid gap-3" onSubmit={handleUpload}>
          <Input
            accept="image/*"
            isRequired
            multiple
            name="images"
            type="file"
          />
          <div>
            <Button color="primary" type="submit">
              <strong>Upload Images</strong>
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
