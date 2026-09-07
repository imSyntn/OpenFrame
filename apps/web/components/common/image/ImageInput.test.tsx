import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageInput } from "./ImageInput";
import { toast } from "sonner";
import { MAX_PICTURE_SIZE } from "@workspace/constants";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("ImageInput", () => {
  const setImageFileMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders drag and drop text and choose image button", () => {
    render(
      <ImageInput
        MAX_SIZE={MAX_PICTURE_SIZE}
        setImageFile={setImageFileMock}
      />,
    );

    expect(screen.getByText("Drag & drop an image here")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Choose Image" }),
    ).toBeInTheDocument();
  });

  it("calls setImageFile when a valid image file is selected", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ImageInput
        MAX_SIZE={MAX_PICTURE_SIZE}
        setImageFile={setImageFileMock}
      />,
    );

    const file = new File(["dummy content"], "photo.png", {
      type: "image/png",
    });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, file);

    expect(setImageFileMock).toHaveBeenCalledWith(file);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("shows toast error when selected file exceeds max size", () => {
    const { container } = render(
      <ImageInput MAX_SIZE={1024} setImageFile={setImageFileMock} />,
    );

    const largeFile = new File(["a".repeat(2048)], "large.jpg", {
      type: "image/jpeg",
    });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [largeFile] } });

    expect(toast.error).toHaveBeenCalled();
    expect(setImageFileMock).not.toHaveBeenCalled();
  });
});
