import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";

import { GetUser, Roles } from "@/common/decorators";
import { AuthGuard } from "@/common/guards";

import { CreatePostDto, UpdatePostDto } from "./posts.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(["ADMIN", "WRITER"])
  create(@Body() createPostDto: CreatePostDto, @GetUser("id") userId: string) {
    return this.postsService.create(createPostDto, userId);
  }

  // paginate
  @Get()
  findAll(@Query("page") page: number, @Query("limit") limit: number) {
    return this.postsService.findAll(page, limit);
  }

  @Get("featured")
  findAllFeatured() {
    return this.postsService.findAllFeatured();
  }

  @Get("protected")
  @UseGuards(AuthGuard)
  @Roles(["ADMIN", "WRITER"])
  findAllProtected(@GetUser() user: User) {
    return this.postsService.findAllProtected(user);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(id);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @Roles(["ADMIN", "WRITER"])
  remove(@Param("id") id: string, @GetUser() user: User) {
    return this.postsService.remove(id, user);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  @Roles(["ADMIN", "WRITER"])
  update(
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User
  ) {
    return this.postsService.update(id, updatePostDto, user);
  }
}
