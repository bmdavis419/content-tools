import { displaySvgD3 } from "$lib/svg/displaySvgD3";

export class SvgBgState {
  bgColorHex = $state<string>("#000000");
  borderRadius = $state<number>(100);
  imageWidth = $state<number>(75);
  svgElement = $state<SVGElement | null>(null);

  constructor() {}

  handleFileUpload(file: File) {
    if (file.type !== "image/svg+xml") {
      // TODO: better error handling (toast probably)
      throw new Error("File is not an SVG");
    }

    file.text().then((text) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "image/svg+xml");
      this.svgElement = doc.documentElement as unknown as SVGElement;
    });
  }
}
