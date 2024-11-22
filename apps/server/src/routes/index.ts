import { AuthModule } from "./auth";
import { AuthorsModule } from "./authors/authors.module";
import { FilesModule } from "./files";
import { PostsModule } from "./posts/posts.module";
import { UsersModule } from "./users";

export const AppRoutes = [
  AuthModule,
  AuthorsModule,
  FilesModule,
  PostsModule,
  UsersModule,
];
