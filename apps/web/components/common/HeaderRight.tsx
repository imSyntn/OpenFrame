"use client";

import { useUserStore } from "@/store";
import { Button } from "@workspace/ui/components/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@workspace/ui/components/avatar";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ThemeToggle from "../ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { toast } from "sonner";
import { userLogout } from "@/lib/apis";

export function HeaderRight() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const avatar = useUserStore((state) => state.avatar);
  const name = useUserStore((state) => state.name);
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();
  const params = useSearchParams();

  const idParam = params.get("id");
  const nameParam = params.get("name");
  const emailParam = params.get("email");
  const avatarParam = params.get("avatar");

  useEffect(() => {
    if (!isLoggedIn && idParam && emailParam && nameParam) {
      console.log(idParam, nameParam, emailParam);
      setUser({
        id: idParam,
        name: nameParam,
        email: emailParam,
        avatar: avatarParam || avatar,
        isLoggedIn: true,
      });
      const newParams = new URLSearchParams(params.toString());
      ["id", "name", "email", "avatar"].forEach((key) => newParams.delete(key));
      router.replace(`?${newParams.toString()}`);
    }
  }, [idParam, nameParam, emailParam, avatarParam]);

  const logoutHandler = async () => {
    try {
      const response = await userLogout();
      if (response.status == 200) {
        setUser({
          id: "",
          name: "",
          email: "",
          avatar: "",
          isLoggedIn: false,
        });
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  if (isLoggedIn) {
    return (
      <>
        <Button className="bg-chart-2">Submit Photo</Button>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive" onClick={logoutHandler}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
  return (
    <>
      <Button variant="ghost" onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button variant="secondary" onClick={() => router.push("/signup")}>
        Signup
      </Button>
      <ThemeToggle />
    </>
  );
}
