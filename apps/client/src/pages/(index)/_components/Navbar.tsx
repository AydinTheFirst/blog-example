import {
  Button,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextNavbar,
} from "@nextui-org/react";
import {
  LucideChartPie,
  LucideFile,
  LucideHome,
  LucideInfo,
  LucidePhone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";

import { Logo, ThemeToggler } from "@/components";
import { UserDisplay } from "@/components/UserDisplay";
import { User } from "@/types";

const menuItems = [
  {
    href: "/",
    icon: LucideHome,
    isAdmin: false,
    isAuth: false,
    label: "Home",
  },
  {
    href: "/posts",
    icon: LucideFile,
    isAdmin: false,
    isAuth: false,
    label: "Posts",
  },
  {
    href: "/about",
    icon: LucideInfo,
    isAdmin: false,
    isAuth: false,
    label: "About",
  },
  {
    href: "/contact",
    icon: LucidePhone,
    isAdmin: false,
    isAuth: false,
    label: "Contact",
  },

  {
    href: "/dashboard",
    icon: LucideChartPie,
    isAdmin: true,
    isAuth: true,
    label: "Dashboard",
  },
];

export default function Navbar() {
  const { data: me } = useSWR<User>("/auth/@me", {
    onError: () => {},
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isLoggedIn = !!me;
  const isAdmin = me && me.roles.includes("ADMIN");

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.isAuth && !isLoggedIn) return false;
    if (item.isAdmin && !isAdmin) return false;
    return true;
  });

  return (
    <NextNavbar
      isMenuOpen={isMenuOpen}
      maxWidth="2xl"
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={Link} className="text-foreground" href={"/"}>
          <Logo className="h-14" />
          <strong className="mx-1 text-xl">AydinTheFirst</strong>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {filteredMenuItems.map((item, index) => (
          <NavbarItem isActive={pathname === item.href} key={index}>
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggler />
        </NavbarItem>
        <NavbarItem className="flex gap-1">
          <UserDisplay />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {filteredMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Button
              as={Link}
              className="justify-start"
              fullWidth
              href={item.href}
              startContent={<item.icon />}
              variant="light"
            >
              <strong>{item.label}</strong>
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextNavbar>
  );
}
