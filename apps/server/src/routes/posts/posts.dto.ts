import { PartialType } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(ContentType)
  contentType: ContentType;

  @IsString()
  @IsNotEmpty()
  title: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsBoolean()
  isFeatured: boolean;

  @IsBoolean()
  isPublished: boolean;

  @IsString({ each: true })
  keywords: string[];
}
