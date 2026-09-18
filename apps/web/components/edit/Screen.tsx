import "@ascentsparksoftware/react-image-editor/styles.css";
import dynamic from "next/dynamic";
import { PhotoEditorSkeleton } from "./PhotoEditorSkeleton";
import { useTheme } from "next-themes";

const ImageEditor = dynamic(
  () =>
    import("@ascentsparksoftware/react-image-editor").then(
      (m) => m.ImageEditor,
    ),
  { ssr: false, loading: PhotoEditorSkeleton },
);

export function PhotoScreen({ image }: { image: string | null }) {
  const { resolvedTheme } = useTheme();
  return (
    <div className="h-fit sm:h-[calc(100vh-64px)] my-2">
      <ImageEditor
        src={image}
        mode="full"
        baseColor="#f4f6f9"
        accentColor="#02375e"
        themeMode={(resolvedTheme ?? "dark") as "light" | "dark" | undefined}
        backgroundRemovalLoader={async () => {
          return import("@imgly/background-removal");
        }}
        heicDecoderLoader={async () => {
          return import("heic2any");
        }}
        onError={(error) => {
          console.error("Image editor error:", error);
        }}
      />
    </div>
  );
}
