import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { LucideUser } from "lucide-react";
import useSWR from "swr";

import { useDeviceType } from "@/hooks";
import { User } from "@/types";

export const UserDisplay = () => {
  const { data: me } = useSWR<User>("/auth/@me", {
    onError: () => {},
  });

  const { isMobile } = useDeviceType();

  if (!me) {
    return (
      <>
        <Button as={Link} color="primary" href="/login">
          <strong>Login</strong>
        </Button>
        <Button
          as={Link}
          className="hidden md:flex"
          color="primary"
          href="/register"
          variant="bordered"
        >
          <strong>Register</strong>
        </Button>
      </>
    );
  }

  const logout = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly={isMobile}
          startContent={<LucideUser />}
          variant="faded"
        >
          <strong className="mt-1 hidden md:block">{me.displayName}</strong>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem href="/account" key="account">
          Account
        </DropdownItem>
        <DropdownItem
          className={me.roles.includes("ADMIN") ? "text-primary" : "hidden"}
          href="/dashbboard"
          key="dashboard"
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          className="text-danger"
          color="danger"
          key="delete"
          onClick={logout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
