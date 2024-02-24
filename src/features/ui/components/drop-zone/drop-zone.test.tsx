import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DropZone from "./drop-zone.component";

describe("DropZone", () => {
  const dictionary = {
    dragAndDrop: "Drag and drop an image here",
    selectFile: "Select an image",
  };

  it("should render a region to drop files", () => {
    render(<DropZone dictionary={dictionary} onFileChange={() => undefined} />);

    screen.getByRole("region");
  });

  it("should render an input type file and a button to submit a new file", () => {
    render(<DropZone dictionary={dictionary} onFileChange={() => undefined} />);

    screen.getByTestId("file-input");
    screen.getByRole("button", { name: dictionary.selectFile });
  });

  it("should render a message to drag and drop an image", () => {
    render(<DropZone dictionary={dictionary} onFileChange={() => undefined} />);

    screen.getByText(dictionary.dragAndDrop);
  });

  it("should accept an 'accept' prop to filter the files that can be dropped", () => {
    render(
      <DropZone
        accept="image/*"
        dictionary={dictionary}
        onFileChange={() => undefined}
      />,
    );

    const input = screen.getByTestId("file-input") as HTMLInputElement;

    expect(input.accept).toBe("image/*");
  });

  it("should call the onFileChange callback when a file is selected", () => {
    const onFileChange = vi.fn();
    render(<DropZone dictionary={dictionary} onFileChange={onFileChange} />);

    const file = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });

    const input = screen.getByTestId("file-input") as HTMLInputElement;

    act(() => fireEvent.change(input, { target: { files: [file] } }));

    expect(onFileChange).toHaveBeenCalledWith(file);
  });

  it("should call the onFileChange callback when a file is dropped", () => {
    const onFileChange = vi.fn();
    render(<DropZone dictionary={dictionary} onFileChange={onFileChange} />);

    const file = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });

    const dropZone = screen.getByRole("region");

    act(() => {
      fireEvent.drop(dropZone, {
        dataTransfer: {
          files: [file],
        },
      });
    });

    expect(onFileChange).toHaveBeenCalledWith(file);
  });

  it("should accept a checkFile callback to validate the file before calling onFileChange", () => {
    const checkFile = vi.fn(() => ({ success: true }));
    const onFileChange = vi.fn();
    render(
      <DropZone
        dictionary={dictionary}
        onFileChange={onFileChange}
        checkFile={checkFile}
      />,
    );

    const file = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });

    const input = screen.getByTestId("file-input") as HTMLInputElement;

    act(() => fireEvent.change(input, { target: { files: [file] } }));

    expect(checkFile).toHaveBeenCalledWith(file);
    expect(onFileChange).toHaveBeenCalledWith(file);
  });

  it("should show an error message when the file is not valid", () => {
    const checkFile = vi.fn(() => ({ success: false, error: "Invalid file" }));
    render(
      <DropZone
        dictionary={dictionary}
        onFileChange={() => undefined}
        checkFile={checkFile}
      />,
    );

    const file = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });

    const input = screen.getByTestId("file-input") as HTMLInputElement;

    act(() => fireEvent.change(input, { target: { files: [file] } }));

    screen.getByText("Invalid file");
  });
});
