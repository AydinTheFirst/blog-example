import { Injectable } from "@nestjs/common";

import { S3Service } from "@/modules";

@Injectable()
export class FilesService {
  constructor(private s3: S3Service) {}

  async uploadFiles(files: Express.Multer.File[]) {
    const promises = files.map((file) => {
      return this.s3.uploadFile(file);
    });

    const uploadedFiles = await Promise.all(promises);

    return uploadedFiles;
  }
}
