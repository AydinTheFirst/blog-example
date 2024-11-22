import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { CreateAuthorDto, UpdateAuthorDto } from "./authors.dto";
import { AuthorsService } from "./authors.service";

@Controller("authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authorsService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authorsService.remove(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }
}
