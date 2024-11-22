import { Module } from "@nestjs/common";

import { ProductImagesModule } from "./images";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
  controllers: [PostsController],
  imports: [ProductImagesModule],
  providers: [PostsService],
})
export class PostsModule {}
