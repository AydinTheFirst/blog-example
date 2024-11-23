import { ForbiddenException, Injectable } from "@nestjs/common";

import { PrismaService, User } from "@/prisma";

import { CreatePostDto, UpdatePostDto } from "./posts.dto";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto, userId: string) {
    const slug = this.createSlug(createPostDto.title);

    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId: userId,
        slug,
      },
    });

    return post;
  }

  createSlug(title: string) {
    const slug =
      title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") +
      "-" +
      Date.now();

    return slug;
  }

  async findAll(page?: number, limit?: number) {
    if (!page) page = 1;
    if (!limit) limit = 10;

    const posts = await this.prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { isPublished: true },
    });

    return {
      data: posts,
      meta: {
        isNextPageAvailable: posts.length === limit,
        limit,
        page,
      },
    };
  }

  async findAllFeatured() {
    const posts = await this.prisma.post.findMany({
      where: { isFeatured: true },
    });

    return posts;
  }

  async findAllProtected(user: User) {
    if (user.roles.includes("ADMIN")) {
      const posts = await this.prisma.post.findMany();
      return posts;
    }

    const posts = await this.prisma.post.findMany({
      where: { authorId: user.id },
    });

    return posts;
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    return post;
  }

  async isAllowed(id: string, user: User) {
    if (user.roles.includes("ADMIN")) return true;

    const post = await this.findOne(id);

    if (post.authorId !== user.id) {
      throw new ForbiddenException(
        "You are not allowed to perform this action"
      );
    }

    return true;
  }

  async remove(id: string, user: User) {
    this.isAllowed(id, user);

    await this.prisma.post.delete({
      where: { id },
    });

    return true;
  }

  async update(id: string, updatePostDto: UpdatePostDto, user: User) {
    await this.isAllowed(id, user);

    const post = await this.prisma.post.update({
      data: updatePostDto,
      where: { id },
    });

    return post;
  }
}
