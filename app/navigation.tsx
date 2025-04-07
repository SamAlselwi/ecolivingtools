"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AppIcon } from "@/common/components";
import { Moon, Sun, Search } from "lucide-react";
import { Items } from "@/common/interfaces/navigation";

const items = Items;

function Navigation() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full flex items-center gap-4 border-b bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-transparent" aria-label="Open menu">
                <AppIcon name="menu-18x14" size="20" classes="fill-white" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-primary">
              <nav className="container grid gap-6 text-lg font-medium p-4">
                {items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <Link
                      key={`mobile-link-item-${item.url}`}
                      href={item.url}
                      className={cn(
                        "text-gray-300 transition-colors hover:text-white",
                        isActive && "text-white"
                      )}
                      onClick={() => setOpen(false)}
                      aria-label={item.label}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </DrawerContent>
          </Drawer>
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-lg lg:gap-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base" aria-label="Homepage">
              <Image src={logo} alt={`${process.env.NEXT_PUBLIC_APP_NAME} logo`} className="w-full h-auto max-h-12" />
            </Link>
            {items.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Link
                  key={`desktop-link-item-${item.url}`}
                  href={item.url}
                  className={cn(
                    "text-gray-300 transition-colors hover:text-white",
                    isActive && "text-white"
                  )}
                  aria-label={item.label}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          {/* Render a single logo for mobile if needed */}
          <div className="md:hidden mx-auto">
            <Image src={logo} alt={`${process.env.NEXT_PUBLIC_APP_NAME} logo`} className="w-auto h-auto max-h-10" />
          </div>
          <div className="flex items-center gap-2 justify-end md:flex-1">
            <nav className="flex items-center gap-1">
              <Button variant="ghost" className="hover:bg-transparent" aria-label="Search">
                <Link href="/search" aria-label="Search">
                  <Search className="h-[1.2rem] w-[1.2rem] text-white" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-transparent"
              aria-label={theme === "dark" ? "Activate light mode" : "Activate dark mode"}>
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 text-white" />
                <Sun className="absolute h-[1.2rem] w-[1.2rem] -rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Navigation);
