import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

import { Roles } from "@/common/decorators";
import { AuthGuard } from "@/common/guards";

import { ImagesService } from "./images.service";

@Controller("posts/:postId/images")
@UseGuards(AuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @Roles(["ADMIN"])
  @UseInterceptors(FilesInterceptor("images"))
  create(
    @Param("postId") postId: string,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.imagesService.create(postId, files);
  }

  @Patch()
  @Roles(["ADMIN"])
  update(@Param("postId") postId: string, @Body("images") images: string[]) {
    return this.imagesService.update(postId, images);
  }
}
