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
import { LogIn, Upload, UserPlus } from "lucide-react";
import { useRefreshToken } from "@/hooks";
import { Skeleton } from "@workspace/ui/components/skeleton";
import ThemeToggle from "@/components/ThemeToggle";

export function HeaderRight() {
  const { data, isLoading, isError } = useRefreshToken();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const id = useUserStore((state) => state.id);
  const avatar = useUserStore((state) => state.avatar);
  const name = useUserStore((state) => state.name);
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();
  const params = useSearchParams();

  const idParam = params.get("id");
  const nameParam = params.get("name");
  const emailParam = params.get("email");
  const avatarParam = params.get("avatar");
  const accessToken = params.get("accessToken");

  useEffect(() => {
    if (!isLoggedIn && idParam && emailParam && nameParam && accessToken) {
      console.log(idParam, nameParam, emailParam);
      setUser({
        id: idParam,
        name: nameParam,
        email: emailParam,
        avatar: avatarParam || avatar,
        isLoggedIn: true,
        accessToken,
      });
      const newParams = new URLSearchParams(params.toString());
      ["id", "name", "email", "avatar", "accessToken"].forEach((key) =>
        newParams.delete(key),
      );
      router.replace(`?${newParams.toString()}`);
    }
  }, [idParam, nameParam, emailParam, avatarParam, accessToken]);

  useEffect(() => {
    if (data && !isLoading && !isError && !isLoggedIn) {
      setUser({
        ...data,
        isLoggedIn: true,
      });
    }
  }, [data, isLoading, isError, isLoggedIn]);

  const logoutHandler = async () => {
    try {
      const response = await userLogout();
      if (response.status == 200) {
        setUser({
          id: "",
          name: "",
          email: "",
          avatar: "",
          accessToken: "",
          isLoggedIn: false,
        });
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 md:gap-3">
        <Skeleton className="w-16 h-10 rounded-md" />
        <Skeleton className="w-10 h-10 rounded-md" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2 md:gap-3">
        <Button
          size="icon"
          className="bg-chart-2 md:hidden"
          onClick={() => router.push("/submit")}
        >
          <Upload size={18} />
        </Button>

        <Button
          className="bg-chart-2 hidden md:inline-flex"
          onClick={() => router.push("/submit")}
        >
          Submit Photo
        </Button>

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
              <DropdownMenuItem onClick={() => router.push(`/profile/${id}`)}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/profile?settings=true`)}
              >
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
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => router.push("/login")}
      >
        <LogIn size={18} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => router.push("/signup")}
      >
        <UserPlus size={18} />
      </Button>

      <Button
        variant="ghost"
        className="hidden md:inline-flex"
        onClick={() => router.push("/login")}
      >
        Login
      </Button>

      <Button
        variant="secondary"
        className="hidden md:inline-flex"
        onClick={() => router.push("/signup")}
      >
        Signup
      </Button>

      <ThemeToggle />
    </div>
  );
}
