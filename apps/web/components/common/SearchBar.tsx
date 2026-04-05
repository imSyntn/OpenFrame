"use client";

import { Button } from "@workspace/ui/components/button";
import { Field } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  onClick,
}: {
  value: string;
  onChange: (value: string) => void;
  onClick?: () => void;
}) {
  return (
    <div className="mt-8 w-full max-w-xl">
      <Field
        orientation="horizontal"
        className="rounded-full bg-muted border-2 border-white/20 p-1 shadow-sm"
      >
        <Input
          type="search"
          placeholder="Search high-resolution photos..."
          className="border-none bg-transparent focus-visible:ring-0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button size="icon" className="rounded-full" onClick={onClick}>
          <Search />
        </Button>
      </Field>
    </div>
  );
}
