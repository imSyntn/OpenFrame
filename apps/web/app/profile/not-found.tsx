import { NotFound } from "@/components/common";
import { UserX } from "lucide-react";

export default function NotFoundPage() {
  return (
    <NotFound
      Icon={UserX}
      title="Profile not found"
      description="The photographer you're looking for doesn't exist or the link may be incorrect."
    />
  );
}
