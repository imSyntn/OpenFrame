import { NotFound } from "@/components/common";
import { CameraOff } from "lucide-react";

export default function NotFoundPage() {
  return (
    <NotFound
      Icon={CameraOff}
      title="Picture not found"
      description="The picture you're looking for doesn't exist or the link may be incorrect."
    />
  );
}
