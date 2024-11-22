// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from "@generouted/react-router/client";

export type Path =
  | `/`
  | `/about`
  | `/contact`
  | `/dashboard`
  | `/dashboard/editor`
  | `/dashboard/posts`
  | `/dashboard/posts/:postId`
  | `/dashboard/users`
  | `/dashboard/users/:userId`
  | `/login`
  | `/posts`
  | `/posts/:postId`
  | `/privacy`
  | `/register`
  | `/terms`;

export type Params = {
  "/dashboard/posts/:postId": { postId: string };
  "/dashboard/users/:userId": { userId: string };
  "/posts/:postId": { postId: string };
};

export type ModalPath = never;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<
  Path,
  Params,
  ModalPath
>();
export const { redirect } = utils<Path, Params>();
