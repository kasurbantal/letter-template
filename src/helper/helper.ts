import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export const generateDocx = async (
  field: Record<string, any>,
  template: string,
  outputFileName: string = "Surat-Pernyataan.docx"
) => {
  try {
    const response = await fetch(template);
    const arrayBuffer = await response.arrayBuffer();

    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip);
    doc.render(field);
    const output = doc.getZip().generate({ type: "blob" });

    saveAs(output, outputFileName);
  } catch (error) {
    console.error("Error generating document:", error);
    throw error;
  }
};
