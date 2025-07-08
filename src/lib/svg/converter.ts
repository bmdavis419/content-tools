import { BaseDirectory, writeFile } from "@tauri-apps/plugin-fs";
import { toast } from "svelte-sonner";

export type Scale = "custom" | number;

export interface ImageMetadata {
  width: number;
  height: number;
  name: string;
}

export function scaleSvg(svgContent: string, scale: number): string {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  const width = parseInt(svgElement.getAttribute("width") ?? "300");
  const height = parseInt(svgElement.getAttribute("height") ?? "150");

  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  svgElement.setAttribute("width", scaledWidth.toString());
  svgElement.setAttribute("height", scaledHeight.toString());

  return new XMLSerializer().serializeToString(svgDoc);
}

export function extractSvgMetadata(
  svgContent: string,
  fileName?: string
): ImageMetadata {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  const width = parseInt(svgElement.getAttribute("width") ?? "300");
  const height = parseInt(svgElement.getAttribute("height") ?? "150");
  const name = fileName || "svg_file";

  return { width, height, name };
}

export async function convertSvgToPng(
  svgContent: string,
  scale: number,
  imageMetadata: ImageMetadata
): Promise<void> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    const scaledSvg = scaleSvg(svgContent, scale);
    const width = imageMetadata.width * scale;
    const height = imageMetadata.height * scale;

    canvas.width = width;
    canvas.height = height;

    const img = new Image();

    img.onload = async () => {
      ctx.drawImage(img, 0, 0);

      // Convert canvas to Blob (PNG)
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error("Failed to convert canvas to Blob"));
          return;
        }
        // Read blob as ArrayBuffer
        const arrayBuffer = await blob.arrayBuffer();
        const contents = new Uint8Array(arrayBuffer);

        const svgFileName = imageMetadata.name ?? "svg_converted";
        const fileName = `${svgFileName.replace(".svg", "")}-${scale}x.png`;

        await writeFile(fileName, contents, {
          baseDir: BaseDirectory.Download,
        });

        toast.success(`PNG saved as ${fileName}`);
        resolve();
      }, "image/png");
    };

    img.onerror = () => {
      reject(new Error("Failed to load SVG image"));
    };

    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(scaledSvg)}`;
  });
}
