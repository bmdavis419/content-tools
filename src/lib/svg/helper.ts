import { readFile, readTextFile } from "@tauri-apps/plugin-fs";
import { toast } from "svelte-sonner";

const parseSvgContent = (svgContent: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, "image/svg+xml");
  return doc.documentElement as unknown as SVGElement;
};

export const getSvgFromFileUpload = async (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];
  if (!file) return null;

  const text = await file.text();
  return parseSvgContent(text);
};

export const getSvgFromPaths = async (paths: string[]) => {
  let svgString = "";
  for (const path of paths) {
    if (!path.endsWith(".svg")) continue;

    const file = await readTextFile(path);

    svgString = file;

    break;
  }

  if (!svgString) return null;

  return parseSvgContent(svgString);
};

export const getSvgFromClipboard = async (event: ClipboardEvent) => {
  const clipboardData = event.clipboardData;
  if (!clipboardData) return null;

  // First try to get SVG directly
  if (clipboardData.types.includes("image/svg+xml")) {
    try {
      const svgData = clipboardData.getData("image/svg+xml");
      if (svgData) {
        return parseSvgContent(svgData);
      }
    } catch (error) {
      console.error("Error getting SVG data:", error);
    }
  }

  // Try to get SVG from clipboard items
  const items = clipboardData.items;

  let svgElement: SVGElement | null = null;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Check for SVG file or image
    if (item.type === "image/svg+xml") {
      const blob = item.getAsFile();
      if (blob) {
        // Parse SVG content
        const text = await blob.text();
        svgElement = parseSvgContent(text);
      }
    }
  }

  if (svgElement) {
    return svgElement;
  }

  // Check for SVG text content
  const text = clipboardData.getData("text/plain");
  if (text) {
    const trimmedText = text.trim();

    if (trimmedText.startsWith("<svg") && trimmedText.includes("</svg>")) {
      svgElement = parseSvgContent(text);
      return svgElement;
    }

    // Check if the text is a URL to an SVG file
    if (trimmedText.match(/^https?:\/\/.*\.svg$/i)) {
      try {
        const response = await fetch(trimmedText);
        if (response.ok) {
          const svgText = await response.text();
          if (svgText.trim().startsWith("<svg")) {
            svgElement = parseSvgContent(svgText);
            return svgElement;
          }
        }
      } catch (error) {
        console.error("Error fetching SVG from URL:", error);
      }
    }
  }

  return null;
};
