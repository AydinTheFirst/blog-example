/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./routes/auth/auth.dto"), { "LoginDto": { password: { required: true, type: () => String }, username: { required: true, type: () => String } }, "RegisterDto": { displayName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./routes/authors/authors.dto"), { "CreateAuthorDto": {}, "UpdateAuthorDto": {} }], [import("./routes/posts/posts.dto"), { "CreatePostDto": { content: { required: true, type: () => String }, contentType: { required: true, type: () => Object }, title: { required: true, type: () => String } }, "UpdatePostDto": { isFeatured: { required: true, type: () => Boolean }, isPublished: { required: true, type: () => Boolean }, keywords: { required: true, type: () => [String] } } }], [import("./routes/users/users.dto"), { "CreateUserDto": { displayName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, roles: { required: true, type: () => [Object] }, username: { required: true, type: () => String } }, "UpdateUserDto": {} }]], "controllers": [[import("./routes/auth/auth.controller"), { "AuthController": { "getMe": {}, "login": {}, "register": {} } }], [import("./routes/authors/authors.controller"), { "AuthorsController": { "create": { type: String }, "findAll": {}, "findOne": {}, "remove": { type: String }, "update": { type: String } } }], [import("./routes/posts/posts.controller"), { "PostsController": { "create": {}, "findAll": {}, "findAllFeatured": {}, "findAllProtected": {}, "findOne": {}, "remove": { type: Boolean }, "update": {} } }], [import("./routes/users/users.controller"), { "UsersController": { "create": {}, "findAll": {}, "findOne": {}, "remove": {}, "update": {} } }], [import("./app/app.controller"), { "AppController": { "index": {} } }], [import("./routes/posts/images/images.controller"), { "ImagesController": { "create": { type: [String] }, "update": { type: [String] } } }]] } };
};