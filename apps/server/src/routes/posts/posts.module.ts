import { Module } from "@nestjs/common";

import { PostImagesModule } from "./images";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
  controllers: [PostsController],
  imports: [PostImagesModule],
  providers: [PostsService],
})
export class PostsModule {}
