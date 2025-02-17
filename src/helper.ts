import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

interface SuratConfig {
  field: Record<string, any>;
  templatePath: string;
  fileNamePrefix: string;
}

export const generateMultipleDocx = async (
  suratConfigs: SuratConfig[],
  pemilikLahan: SuratConfig[],
  draftPks: SuratConfig[],
  suratLahan: SuratConfig[]
) => {
  const allConfigs = [
    ...suratConfigs,
    ...pemilikLahan,
    ...draftPks,
    ...suratLahan,
  ];
  for (const { field, templatePath, fileNamePrefix } of allConfigs) {
    try {
      const response = await fetch(templatePath);
      if (!response.ok) {
        throw new Error(`Failed to load template at ${templatePath}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip);

      doc.render(field);
      const output = doc.getZip().generate({ type: "blob" });

      const currentDate = new Date().toISOString().split("T")[0];
      const outputFileName = `${fileNamePrefix}-${currentDate}.docx`;

      saveAs(output, outputFileName);
    } catch (error) {
      console.error(`Error generating document "${fileNamePrefix}":`, error);
    }
  }
};
