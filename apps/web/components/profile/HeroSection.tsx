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
  Settings,
  LucideIcon,
} from "lucide-react";
import { useProfileStore, useUserStore } from "@/store";
import { ProfileType } from "@/@types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { cn } from "@workspace/ui/lib/utils";

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

export const user: ProfileType = {
  id: "clx9a1b2c3d4e5f6g7h8i9j0",
  name: "Arjun Sen",
  email: "arjun.sen@example.com",
  joined_at: "2026-03-10T09:30:00.000Z",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  bio: "Travel and street photographer capturing everyday life.",
  is_verified: true,
  location: "Kolkata, India",
  _count: {
    pictures: 24,
  },
  metrics: {
    follower: 1245,
    following: 98,
    total_downloads: 54321,
    total_likes: 18234,
  },
  links: [
    {
      name: "instagram",
      url: "https://instagram.com/arjun_sen",
    },
    {
      name: "twitter",
      url: "https://twitter.com/arjun_sen",
    },
    {
      name: "portfolio",
      url: "https://arjunsen.photos",
    },
    {
      name: "instagram2",
      url: "https://instagram.com/arjun_sen",
    },
    {
      name: "twitter2",
      url: "https://twitter.com/arjun_sen",
    },
    {
      name: "portfolio2",
      url: "https://arjunsen.photos",
    },
  ],
  pictures: [
    {
      id: "pic_1",
      title: "Photo 1",
      alt: "Beautiful photo 1",
      description: "High quality photo 1 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_1",
        name: "Photographer 1",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe1/800/600",
          type: "JPG",
          width: 800,
          height: 600,
          size: 301000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe1/1600/1200",
          type: "JPG",
          size: 602000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_2",
      title: "Photo 2",
      alt: "Beautiful photo 2",
      description: "High quality photo 2 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_2",
        name: "Photographer 2",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe2/900/1200",
          type: "JPG",
          width: 900,
          height: 1200,
          size: 302000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe2/1800/2400",
          type: "JPG",
          size: 604000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_3",
      title: "Photo 3",
      alt: "Beautiful photo 3",
      description: "High quality photo 3 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_3",
        name: "Photographer 3",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe3/1000/700",
          type: "JPG",
          width: 1000,
          height: 700,
          size: 303000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe3/2000/1400",
          type: "JPG",
          size: 606000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_4",
      title: "Photo 4",
      alt: "Beautiful photo 4",
      description: "High quality photo 4 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_4",
        name: "Photographer 4",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe4/1200/900",
          type: "JPG",
          width: 1200,
          height: 900,
          size: 304000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe4/2400/1800",
          type: "JPG",
          size: 608000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_5",
      title: "Photo 5",
      alt: "Beautiful photo 5",
      description: "High quality photo 5 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_5",
        name: "Photographer 5",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe5/800/1100",
          type: "JPG",
          width: 800,
          height: 1100,
          size: 305000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe5/1600/2200",
          type: "JPG",
          size: 610000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_6",
      title: "Photo 6",
      alt: "Beautiful photo 6",
      description: "High quality photo 6 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_6",
        name: "Photographer 6",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe6/800/600",
          type: "JPG",
          width: 800,
          height: 600,
          size: 306000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe6/1600/1200",
          type: "JPG",
          size: 612000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_7",
      title: "Photo 7",
      alt: "Beautiful photo 7",
      description: "High quality photo 7 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_7",
        name: "Photographer 7",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe7/900/1200",
          type: "JPG",
          width: 900,
          height: 1200,
          size: 307000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe7/1800/2400",
          type: "JPG",
          size: 614000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_8",
      title: "Photo 8",
      alt: "Beautiful photo 8",
      description: "High quality photo 8 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_8",
        name: "Photographer 8",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe8/1000/700",
          type: "JPG",
          width: 1000,
          height: 700,
          size: 308000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe8/2000/1400",
          type: "JPG",
          size: 616000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_9",
      title: "Photo 9",
      alt: "Beautiful photo 9",
      description: "High quality photo 9 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_9",
        name: "Photographer 9",
        avatar: "https://i.pravatar.cc/150?img=10",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe9/1200/900",
          type: "JPG",
          width: 1200,
          height: 900,
          size: 309000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe9/2400/1800",
          type: "JPG",
          size: 618000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_10",
      title: "Photo 10",
      alt: "Beautiful photo 10",
      description: "High quality photo 10 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_10",
        name: "Photographer 10",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe10/800/1100",
          type: "JPG",
          width: 800,
          height: 1100,
          size: 310000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe10/1600/2200",
          type: "JPG",
          size: 620000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_11",
      title: "Photo 11",
      alt: "Beautiful photo 11",
      description: "High quality photo 11 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_11",
        name: "Photographer 11",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe11/800/600",
          type: "JPG",
          width: 800,
          height: 600,
          size: 311000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe11/1600/1200",
          type: "JPG",
          size: 622000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_12",
      title: "Photo 12",
      alt: "Beautiful photo 12",
      description: "High quality photo 12 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_12",
        name: "Photographer 12",
        avatar: "https://i.pravatar.cc/150?img=13",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe12/900/1200",
          type: "JPG",
          width: 900,
          height: 1200,
          size: 312000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe12/1800/2400",
          type: "JPG",
          size: 624000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_13",
      title: "Photo 13",
      alt: "Beautiful photo 13",
      description: "High quality photo 13 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_13",
        name: "Photographer 13",
        avatar: "https://i.pravatar.cc/150?img=14",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe13/1000/700",
          type: "JPG",
          width: 1000,
          height: 700,
          size: 313000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe13/2000/1400",
          type: "JPG",
          size: 626000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_14",
      title: "Photo 14",
      alt: "Beautiful photo 14",
      description: "High quality photo 14 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_14",
        name: "Photographer 14",
        avatar: "https://i.pravatar.cc/150?img=15",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe14/1200/900",
          type: "JPG",
          width: 1200,
          height: 900,
          size: 314000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe14/2400/1800",
          type: "JPG",
          size: 628000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_15",
      title: "Photo 15",
      alt: "Beautiful photo 15",
      description: "High quality photo 15 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_15",
        name: "Photographer 15",
        avatar: "https://i.pravatar.cc/150?img=16",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe15/800/1100",
          type: "JPG",
          width: 800,
          height: 1100,
          size: 315000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe15/1600/2200",
          type: "JPG",
          size: 630000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_16",
      title: "Photo 16",
      alt: "Beautiful photo 16",
      description: "High quality photo 16 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_16",
        name: "Photographer 16",
        avatar: "https://i.pravatar.cc/150?img=17",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe16/800/600",
          type: "JPG",
          width: 800,
          height: 600,
          size: 316000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe16/1600/1200",
          type: "JPG",
          size: 632000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_17",
      title: "Photo 17",
      alt: "Beautiful photo 17",
      description: "High quality photo 17 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_17",
        name: "Photographer 17",
        avatar: "https://i.pravatar.cc/150?img=18",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe17/900/1200",
          type: "JPG",
          width: 900,
          height: 1200,
          size: 317000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe17/1800/2400",
          type: "JPG",
          size: 634000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_18",
      title: "Photo 18",
      alt: "Beautiful photo 18",
      description: "High quality photo 18 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_18",
        name: "Photographer 18",
        avatar: "https://i.pravatar.cc/150?img=19",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe18/1000/700",
          type: "JPG",
          width: 1000,
          height: 700,
          size: 318000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe18/2000/1400",
          type: "JPG",
          size: 636000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_19",
      title: "Photo 19",
      alt: "Beautiful photo 19",
      description: "High quality photo 19 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_19",
        name: "Photographer 19",
        avatar: "https://i.pravatar.cc/150?img=20",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe19/1200/900",
          type: "JPG",
          width: 1200,
          height: 900,
          size: 319000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe19/2400/1800",
          type: "JPG",
          size: 638000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_20",
      title: "Photo 20",
      alt: "Beautiful photo 20",
      description: "High quality photo 20 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_20",
        name: "Photographer 20",
        avatar: "https://i.pravatar.cc/150?img=21",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe20/800/1100",
          type: "JPG",
          width: 800,
          height: 1100,
          size: 320000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe20/1600/2200",
          type: "JPG",
          size: 640000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_21",
      title: "Photo 21",
      alt: "Beautiful photo 21",
      description: "High quality photo 21 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_21",
        name: "Photographer 21",
        avatar: "https://i.pravatar.cc/150?img=22",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe21/800/600",
          type: "JPG",
          width: 800,
          height: 600,
          size: 321000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe21/1600/1200",
          type: "JPG",
          size: 642000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_22",
      title: "Photo 22",
      alt: "Beautiful photo 22",
      description: "High quality photo 22 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_22",
        name: "Photographer 22",
        avatar: "https://i.pravatar.cc/150?img=23",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe22/900/1200",
          type: "JPG",
          width: 900,
          height: 1200,
          size: 322000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe22/1800/2400",
          type: "JPG",
          size: 644000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_23",
      title: "Photo 23",
      alt: "Beautiful photo 23",
      description: "High quality photo 23 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_23",
        name: "Photographer 23",
        avatar: "https://i.pravatar.cc/150?img=24",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe23/1000/700",
          type: "JPG",
          width: 1000,
          height: 700,
          size: 323000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe23/2000/1400",
          type: "JPG",
          size: 646000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_24",
      title: "Photo 24",
      alt: "Beautiful photo 24",
      description: "High quality photo 24 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_24",
        name: "Photographer 24",
        avatar: "https://i.pravatar.cc/150?img=25",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe24/1200/900",
          type: "JPG",
          width: 1200,
          height: 900,
          size: 324000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe24/2400/1800",
          type: "JPG",
          size: 648000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_25",
      title: "Photo 25",
      alt: "Beautiful photo 25",
      description: "High quality photo 25 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_25",
        name: "Photographer 25",
        avatar: "https://i.pravatar.cc/150?img=26",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe25/800/1100",
          type: "JPG",
          width: 800,
          height: 1100,
          size: 325000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe25/1600/2200",
          type: "JPG",
          size: 650000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_26",
      title: "Photo 26",
      alt: "Beautiful photo 26",
      description: "High quality photo 26 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_26",
        name: "Photographer 26",
        avatar: "https://i.pravatar.cc/150?img=27",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe26/800/600",
          type: "JPG",
          width: 800,
          height: 600,
          size: 326000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe26/1600/1200",
          type: "JPG",
          size: 652000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_27",
      title: "Photo 27",
      alt: "Beautiful photo 27",
      description: "High quality photo 27 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_27",
        name: "Photographer 27",
        avatar: "https://i.pravatar.cc/150?img=28",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe27/900/1200",
          type: "JPG",
          width: 900,
          height: 1200,
          size: 327000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe27/1800/2400",
          type: "JPG",
          size: 654000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_28",
      title: "Photo 28",
      alt: "Beautiful photo 28",
      description: "High quality photo 28 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_28",
        name: "Photographer 28",
        avatar: "https://i.pravatar.cc/150?img=29",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe28/1000/700",
          type: "JPG",
          width: 1000,
          height: 700,
          size: 328000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe28/2000/1400",
          type: "JPG",
          size: 656000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_29",
      title: "Photo 29",
      alt: "Beautiful photo 29",
      description: "High quality photo 29 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_29",
        name: "Photographer 29",
        avatar: "https://i.pravatar.cc/150?img=30",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe29/1200/900",
          type: "JPG",
          width: 1200,
          height: 900,
          size: 329000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe29/2400/1800",
          type: "JPG",
          size: 658000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_30",
      title: "Photo 30",
      alt: "Beautiful photo 30",
      description: "High quality photo 30 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_30",
        name: "Photographer 30",
        avatar: "https://i.pravatar.cc/150?img=31",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe30/800/1100",
          type: "JPG",
          width: 800,
          height: 1100,
          size: 330000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe30/1600/2200",
          type: "JPG",
          size: 660000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_31",
      title: "Photo 31",
      alt: "Beautiful photo 31",
      description: "High quality photo 31 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_31",
        name: "Photographer 31",
        avatar: "https://i.pravatar.cc/150?img=32",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe31/800/600",
          type: "JPG",
          width: 800,
          height: 600,
          size: 331000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe31/1600/1200",
          type: "JPG",
          size: 662000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_32",
      title: "Photo 32",
      alt: "Beautiful photo 32",
      description: "High quality photo 32 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_32",
        name: "Photographer 32",
        avatar: "https://i.pravatar.cc/150?img=33",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe32/900/1200",
          type: "JPG",
          width: 900,
          height: 1200,
          size: 332000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe32/1800/2400",
          type: "JPG",
          size: 664000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_33",
      title: "Photo 33",
      alt: "Beautiful photo 33",
      description: "High quality photo 33 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_33",
        name: "Photographer 33",
        avatar: "https://i.pravatar.cc/150?img=34",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe33/1000/700",
          type: "JPG",
          width: 1000,
          height: 700,
          size: 333000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe33/2000/1400",
          type: "JPG",
          size: 666000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_34",
      title: "Photo 34",
      alt: "Beautiful photo 34",
      description: "High quality photo 34 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_34",
        name: "Photographer 34",
        avatar: "https://i.pravatar.cc/150?img=35",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe34/1200/900",
          type: "JPG",
          width: 1200,
          height: 900,
          size: 334000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe34/2400/1800",
          type: "JPG",
          size: 668000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_35",
      title: "Photo 35",
      alt: "Beautiful photo 35",
      description: "High quality photo 35 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_35",
        name: "Photographer 35",
        avatar: "https://i.pravatar.cc/150?img=36",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe35/800/1100",
          type: "JPG",
          width: 800,
          height: 1100,
          size: 335000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe35/1600/2200",
          type: "JPG",
          size: 670000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_36",
      title: "Photo 36",
      alt: "Beautiful photo 36",
      description: "High quality photo 36 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_36",
        name: "Photographer 36",
        avatar: "https://i.pravatar.cc/150?img=37",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe36/800/600",
          type: "JPG",
          width: 800,
          height: 600,
          size: 336000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe36/1600/1200",
          type: "JPG",
          size: 672000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_37",
      title: "Photo 37",
      alt: "Beautiful photo 37",
      description: "High quality photo 37 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_37",
        name: "Photographer 37",
        avatar: "https://i.pravatar.cc/150?img=38",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe37/900/1200",
          type: "JPG",
          width: 900,
          height: 1200,
          size: 337000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe37/1800/2400",
          type: "JPG",
          size: 674000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_38",
      title: "Photo 38",
      alt: "Beautiful photo 38",
      description: "High quality photo 38 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_38",
        name: "Photographer 38",
        avatar: "https://i.pravatar.cc/150?img=39",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe38/1000/700",
          type: "JPG",
          width: 1000,
          height: 700,
          size: 338000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe38/2000/1400",
          type: "JPG",
          size: 676000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_39",
      title: "Photo 39",
      alt: "Beautiful photo 39",
      description: "High quality photo 39 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_39",
        name: "Photographer 39",
        avatar: "https://i.pravatar.cc/150?img=40",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe39/1200/900",
          type: "JPG",
          width: 1200,
          height: 900,
          size: 339000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe39/2400/1800",
          type: "JPG",
          size: 678000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_40",
      title: "Photo 40",
      alt: "Beautiful photo 40",
      description: "High quality photo 40 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_40",
        name: "Photographer 40",
        avatar: "https://i.pravatar.cc/150?img=41",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe40/800/1100",
          type: "JPG",
          width: 800,
          height: 1100,
          size: 340000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe40/1600/2200",
          type: "JPG",
          size: 680000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_41",
      title: "Photo 41",
      alt: "Beautiful photo 41",
      description: "High quality photo 41 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_41",
        name: "Photographer 41",
        avatar: "https://i.pravatar.cc/150?img=42",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe41/800/600",
          type: "JPG",
          width: 800,
          height: 600,
          size: 341000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe41/1600/1200",
          type: "JPG",
          size: 682000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_42",
      title: "Photo 42",
      alt: "Beautiful photo 42",
      description: "High quality photo 42 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_42",
        name: "Photographer 42",
        avatar: "https://i.pravatar.cc/150?img=43",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe42/900/1200",
          type: "JPG",
          width: 900,
          height: 1200,
          size: 342000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe42/1800/2400",
          type: "JPG",
          size: 684000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_43",
      title: "Photo 43",
      alt: "Beautiful photo 43",
      description: "High quality photo 43 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_43",
        name: "Photographer 43",
        avatar: "https://i.pravatar.cc/150?img=44",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe43/1000/700",
          type: "JPG",
          width: 1000,
          height: 700,
          size: 343000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe43/2000/1400",
          type: "JPG",
          size: 686000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_44",
      title: "Photo 44",
      alt: "Beautiful photo 44",
      description: "High quality photo 44 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_44",
        name: "Photographer 44",
        avatar: "https://i.pravatar.cc/150?img=45",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe44/1200/900",
          type: "JPG",
          width: 1200,
          height: 900,
          size: 344000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe44/2400/1800",
          type: "JPG",
          size: 688000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_45",
      title: "Photo 45",
      alt: "Beautiful photo 45",
      description: "High quality photo 45 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_45",
        name: "Photographer 45",
        avatar: "https://i.pravatar.cc/150?img=46",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe45/800/1100",
          type: "JPG",
          width: 800,
          height: 1100,
          size: 345000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe45/1600/2200",
          type: "JPG",
          size: 690000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_46",
      title: "Photo 46",
      alt: "Beautiful photo 46",
      description: "High quality photo 46 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_46",
        name: "Photographer 46",
        avatar: "https://i.pravatar.cc/150?img=47",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe46/800/600",
          type: "JPG",
          width: 800,
          height: 600,
          size: 346000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe46/1600/1200",
          type: "JPG",
          size: 692000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_47",
      title: "Photo 47",
      alt: "Beautiful photo 47",
      description: "High quality photo 47 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_47",
        name: "Photographer 47",
        avatar: "https://i.pravatar.cc/150?img=48",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe47/900/1200",
          type: "JPG",
          width: 900,
          height: 1200,
          size: 347000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe47/1800/2400",
          type: "JPG",
          size: 694000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_48",
      title: "Photo 48",
      alt: "Beautiful photo 48",
      description: "High quality photo 48 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_48",
        name: "Photographer 48",
        avatar: "https://i.pravatar.cc/150?img=49",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe48/1000/700",
          type: "JPG",
          width: 1000,
          height: 700,
          size: 348000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe48/2000/1400",
          type: "JPG",
          size: 696000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_49",
      title: "Photo 49",
      alt: "Beautiful photo 49",
      description: "High quality photo 49 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_49",
        name: "Photographer 49",
        avatar: "https://i.pravatar.cc/150?img=50",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe49/1200/900",
          type: "JPG",
          width: 1200,
          height: 900,
          size: 349000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe49/2400/1800",
          type: "JPG",
          size: 698000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
    {
      id: "pic_50",
      title: "Photo 50",
      alt: "Beautiful photo 50",
      description: "High quality photo 50 for OpenFrame gallery.",
      created_at: "2026-03-11T12:00:31.314Z",
      user: {
        id: "user_50",
        name: "Photographer 50",
        avatar: "https://i.pravatar.cc/150?img=51",
      },
      src: [
        {
          resolution: "SMALL",
          url: "https://picsum.photos/seed/openframe50/800/1100",
          type: "JPG",
          width: 800,
          height: 1100,
          size: 350000,
        },
        {
          resolution: "MEDIUM",
          url: "https://picsum.photos/seed/openframe50/1600/2200",
          type: "JPG",
          size: 700000,
        },
      ],
      metadata: {
        blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
        camera: "Sony A7 IV",
        lens: "24-70mm",
        iso: "100",
        shutter: "1/200",
        aperture: "f/5.6",
        focal_length: "35mm",
      },
      tags: ["nature", "travel", "photography"],
    },
  ],
};

export function HeroSection({ id }: { id: string }) {
  const loggedInUserID = useUserStore((state) => state.id);
  const isLoading = useProfileStore((state) => state.isLoading);
  const setData = useProfileStore((state) => state.setData);
  const avatar = useProfileStore((state) => state.avatar);
  const name = useProfileStore((state) => state.name);
  const location = useProfileStore((state) => state.location);
  const bio = useProfileStore((state) => state.bio);
  const links = useProfileStore((state) => state.links);
  const email = useProfileStore((state) => state.email);
  const is_verified = useProfileStore((state) => state.is_verified);

  const isOwner = loggedInUserID === id;

  useEffect(() => {
    setTimeout(() => {
      setData({ ...user, isLoading: false });
    }, 2000);
  }, []);

  return (
    <div className="w-full max-w-8xl mx-auto px-6 md:px-8 my-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          {isLoading ? (
            <Skeleton className="size-28 md:size-36 rounded-full" />
          ) : (
            <img
              src={avatar}
              alt={name}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-lg"
            />
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

                {isOwner && (
                  <Button size="icon" variant="ghost">
                    <Settings size={18} />
                  </Button>
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
                <span>
                  <strong className="text-foreground">1.2k</strong> Followers
                </span>

                <span>
                  <strong className="text-foreground">98</strong> Following
                </span>

                <span>
                  <strong className="text-foreground">54k</strong> Downloads
                </span>

                {isOwner && !is_verified && (
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Verify your email
                  </Button>
                )}
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
              <Button className="w-full md:w-auto px-6">Follow</Button>

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
