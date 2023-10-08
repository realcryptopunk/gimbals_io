"use client";
import {
  Navbar,
  Button,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { SearchIcon } from "./SearchIcon";
import { ThemeSwitch } from "./ThemeSwitcher";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/router";



function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <Button variant="shadow" color="danger" onClick={() => void signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button variant="shadow" color="danger" onClick={() => void signIn()}>
        Sign in
      </Button>
    </>
  );
}

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session } = useSession();

  const menuItems = [
    "Explore",
    "Find Talent",
    "Find Jobs",
    "Log Out",
    "Newsletter",
  ];

  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    try {
      await router.push({
        pathname: "/SearchPage",
        query: { q: searchInput },
      });
    } catch (error) {
      console.error("Error navigating to search page:", error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void handleSearch();
    }
  };
  



  return (
    <Navbar
      isBordered
      maxWidth="full"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        {isMenuOpen ? (
          <NavbarMenuToggle aria-label="Close menu" />
        ) : (
          <NavbarMenuToggle aria-label="Open menu" />
        )}
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <Link color="foreground" href="/">
            Redacted
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <Link color="foreground" href="/">
            Redacted
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Button href="/explore" as={Link} color="default" variant="light">
            Explore
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button href="/talent" as={Link} color="default" variant="light">
            Hire Talent
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button href="/jobs" as={Link} color="default" variant="light">
            Jobs
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
              onClick={item === "Log Out" ? () => signOut() : undefined}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarContent className="hidden sm:flex" justify="start">
        <Input
          classNames={{
            base: "w-200 h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
      </NavbarContent>

      <NavbarContent justify="end">
        {session ? (
          <>
            <Button
              className="hidden sm:flex "
              color="danger"
              variant="shadow"
              radius="md"
            >
              Share Your Work
            </Button>
            <Dropdown backdrop="blur" placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="danger"
                  name={session?.user?.name ?? "Default Name"}
                  size="sm"
                  src={
                    session?.user?.image ??
                    "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">
                    {session?.user?.name ?? "Default Email"}
                  </p>
                </DropdownItem>
                <DropdownItem key="settings">
                  <Link href="/settings">
                    <a>Settings</a>
                  </Link>
                </DropdownItem>
                <DropdownItem  key="profile">
                  <Link  href="/profile">
                    <a>Profile</a>
                  </Link>
                </DropdownItem>
                <DropdownItem  key="feedback">
                  <Link  href="mailto:gimbalsbiz@gmail.com">
                    <a>Feedback</a>
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={() => {
                    void signOut();
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <ThemeSwitch />
          </>
        ) : (
          <AuthButton />
        )}
      </NavbarContent>
    </Navbar>
  );
}
