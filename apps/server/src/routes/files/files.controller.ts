import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Response } from "express";

import { Roles } from "@/common/decorators";
import { AuthGuard } from "@/common/guards";
import { S3Service } from "@/modules";

import { FilesService } from "./files.service";

@Controller("files")
export class FilesController {
  constructor(
    private filesService: FilesService,
    private s3: S3Service
  ) {}

  @Get(":key")
  async findOne(@Param("key") key: string, @Res() res: Response) {
    const file = await this.s3.getFile(key);

    if (!file) {
      throw new NotFoundException("File not found");
    }

    if (!file.Body) {
      throw new NotFoundException("File not found");
    }

    res.set({
      "Content-Length": file.ContentLength,
      "Content-Type": file.ContentType,
      //"Content-Disposition": `attachment; filename="${key}"`, // Makes the browser download the file
    });

    const fileStream = file.Body as NodeJS.ReadableStream;
    fileStream.pipe(res);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(["ADMIN"])
  @UseInterceptors(FilesInterceptor("files"))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.filesService.uploadFiles(files);
  }
}
