import { Injectable, Logger } from "@nestjs/common";

import { PrismaService, User } from "@/prisma";

import { CreateAuthorDto, UpdateAuthorDto } from "./authors.dto";

@Injectable()
export class AuthorsService {
  cache = new Map<string, User>();
  constructor(private prisma: PrismaService) {
    const interval = setInterval(
      () => {
        this.clearCache();
      },
      1000 * 60 * 60
    ); // 1 hour

    interval.unref();
  }

  clearCache() {
    Logger.debug("Clearing cache", "AuthorsService");
    this.cache.clear();
  }

  create(createAuthorDto: CreateAuthorDto) {
    console.log(createAuthorDto);
    return "This action adds a new author";
  }

  async findAll() {
    const authors = await this.prisma.user.findMany();
    authors.forEach((author) => this.cache.set(author.id, author));
    return authors.map(this.mutate);
  }

  async findOne(id: string) {
    if (this.cache.has(id)) {
      return this.mutate(this.cache.get(id));
    }

    const author = await this.prisma.user.findUnique({
      where: { id },
    });

    return this.mutate(author);
  }

  mutate(author: User) {
    return {
      createdAt: author.createdAt,
      displayName: author.displayName,
      id: author.id,
      username: author.username,
    };
  }

  remove(id: string) {
    return `This action removes a #${id} author`;
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto) {
    console.log(updateAuthorDto);
    return `This action updates a #${id} author`;
  }
}
