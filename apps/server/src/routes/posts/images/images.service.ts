import { Injectable, NotFoundException } from "@nestjs/common";

import { S3Service } from "@/modules";
import { PrismaService } from "@/prisma";

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private s3: S3Service
  ) {}

  async create(postId: string, files: Express.Multer.File[]) {
    const images = await this.s3.uploadFiles(files);

    const post = await this.findOnePost(postId);

    await this.prisma.post.update({
      data: {
        images: {
          push: images,
        },
      },
      where: { id: post.id },
    });

    return images;
  }

  async findOnePost(id: string) {
    const post = await this.prisma.post.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!post) throw new NotFoundException("Post not found");

    return post;
  }

  async update(postId: string, images: string[]) {
    const post = await this.findOnePost(postId);

    const imagesToDelete = post.images.filter(
      (image) => !images.includes(image)
    );

    await this.s3.deleteFiles(imagesToDelete);

    await this.prisma.post.update({
      data: {
        images: {
          set: images,
        },
      },
      where: { id: post.id },
    });

    return images;
  }
}
