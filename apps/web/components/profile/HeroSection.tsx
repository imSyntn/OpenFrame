"use client";

import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import React, { useEffect } from "react";
import {
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Globe,
  Youtube,
  Facebook,
  Twitch,
  Dribbble,
  Figma,
  Mail,
  LinkIcon,
  MessageCircle,
  Send,
  Phone,
  Camera,
  Video,
  MapPin,
  LucideIcon,
  SettingsIcon,
  BadgeCheck,
} from "lucide-react";
import { useProfileStore, useUserStore } from "@/store";
import { ProfileType } from "@/@types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { cn } from "@workspace/ui/lib/utils";
import { notFound } from "next/navigation";
import { useUserDetails } from "@/hooks";
import { toast } from "sonner";
import { SettingsModal } from "./settings/SettingsModal";
import { VerifyEmail } from "./VerifyEmail";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

export const linkIconMap: Record<string, { icon: LucideIcon; color: string }> =
  {
    twitter: { icon: Twitter, color: "text-sky-500" },
    x: { icon: Twitter, color: "text-black dark:text-white" },
    instagram: { icon: Instagram, color: "text-pink-500" },
    github: { icon: Github, color: "text-gray-900 dark:text-white" },
    linkedin: { icon: Linkedin, color: "text-blue-600" },
    youtube: { icon: Youtube, color: "text-red-600" },
    facebook: { icon: Facebook, color: "text-blue-500" },
    twitch: { icon: Twitch, color: "text-purple-500" },
    dribbble: { icon: Dribbble, color: "text-pink-500" },
    figma: { icon: Figma, color: "text-orange-500" },
    email: { icon: Mail, color: "text-gray-500" },
    contact: { icon: Phone, color: "text-green-500" },
    telegram: { icon: Send, color: "text-sky-500" },
    whatsapp: { icon: MessageCircle, color: "text-green-500" },
    behance: { icon: Camera, color: "text-blue-700" },
    tiktok: { icon: Video, color: "text-pink-400" },
    portfolio: { icon: Globe, color: "text-indigo-500" },
    website: { icon: Globe, color: "text-indigo-500" },
    site: { icon: Globe, color: "text-indigo-500" },
    blog: { icon: Globe, color: "text-indigo-500" },
  };

export function HeroSection({ id }: { id: string }) {
  const loggedInUserID = useUserStore((state) => state.id);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const {
    // isLoading,
    setData,
    avatar,
    name,
    location,
    bio,
    links,
    email,
    is_verified,
    metrics,
  } = useProfileStore();
  const { data, isLoading, error, isError } = useUserDetails(id);

  const isOwner = loggedInUserID === id;

  useEffect(() => {
    if (!isLoading && !isError) {
      setData({
        ...data,
        isLoading: false,
      });
    }
  }, [isLoading, isError]);

  if (error) {
    if ((error as any)?.response?.status === 404) {
      notFound();
    }
    toast.error("Unexpected error occurred");
  }

  return (
    <div className="w-full max-w-8xl mx-auto px-6 md:px-8 my-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          {isLoading ? (
            <Skeleton className="size-28 md:size-36 rounded-full" />
          ) : (
            <Avatar className="w-28 h-28 md:w-36 md:h-36">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="flex flex-col flex-1 gap-3 text-center md:text-left">
          {isLoading ? (
            <div className="flex flex-col gap-3 items-center md:items-start">
              <Skeleton className="h-7 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>

                {is_verified && (
                  <BadgeCheck className="h-6 w-6 text-emerald-500 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                )}

                {isOwner && (
                  <SettingsModal>
                    <SettingsIcon size={18} />
                  </SettingsModal>
                )}
              </div>

              {location && (
                <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
                  <MapPin size={14} />
                  {location}
                </p>
              )}

              {bio && (
                <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto md:mx-0">
                  {bio}
                </p>
              )}
            </>
          )}

          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm text-muted-foreground mt-2">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[100px]" />
              </>
            ) : (
              <>
                {/* <span>
                  <strong className="text-foreground">
                    {metrics?.follower ?? 0}
                  </strong>{" "}
                  Followers
                </span>

                <span>
                  <strong className="text-foreground">
                    {metrics?.following ?? 0}
                  </strong>{" "}
                  Following
                </span> */}

                <span>
                  <strong className="text-foreground">
                    {metrics?.total_downloads ?? 0}
                  </strong>{" "}
                  Downloads
                </span>

                {isOwner && !is_verified && <VerifyEmail />}
              </>
            )}
          </div>
        </div>

        <div className="w-full md:w-40 flex flex-col items-center md:items-start gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-full md:w-[144px]" />
              <ul className="flex gap-3">
                <Skeleton className="size-6" />
                <Skeleton className="size-6" />
                <Skeleton className="size-6" />
              </ul>
            </>
          ) : (
            <>
              {/* <Button
                className="w-full md:w-auto px-6"
                disabled={isOwner || !isLoggedIn}
              >
                Follow
              </Button> */}

              <ul className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Tooltip>
                  <TooltipTrigger>
                    <li>
                      <a href={email}>
                        <Mail />
                      </a>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent className="border">
                    <p>{email}</p>
                  </TooltipContent>
                </Tooltip>

                {links?.map((item) => {
                  const obj = linkIconMap[item.name.toLowerCase()];
                  const Icon = obj?.icon ?? LinkIcon;

                  return (
                    <Tooltip key={item.name}>
                      <TooltipTrigger>
                        <li>
                          <a href={item.url} target="_blank">
                            <Icon className={cn(obj?.color)} />
                          </a>
                        </li>
                      </TooltipTrigger>
                      <TooltipContent className="border">
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
