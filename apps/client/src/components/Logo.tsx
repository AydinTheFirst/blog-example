import { cn } from "@nextui-org/react";
import { useTheme } from "next-themes";

interface LogoProps {
  className?: string;
}
export const Logo = ({ className }: LogoProps) => {
  const { theme } = useTheme();
  const lightLogo = "/logo.png";
  const darkLogo = "/logo.png";

  return (
    <img
      alt="Blog Logo"
      className={cn(className)}
      src={theme === "dark" ? darkLogo : lightLogo}
    />
  );
};
