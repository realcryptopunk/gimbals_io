"use client";
import React from "react";
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
            <Dropdown placement="bottom-end">
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
                  <p className="font-semibold">{session?.user?.email ?? "Default Email"}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="logout" color="danger">
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