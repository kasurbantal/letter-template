import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateMultipleDocx } from "../../helper1";

interface FormData {
  nama: string;
  tempatLahir: string;
  ttl: string;
  noKtp: string;
  alamat: string;
  jalan: string;
  rt: string;
  rw: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  nib: string;
  luas: number;
  statusTanah: string;
  penggunaan: string;
  batasUtara: string;
  batasTimur: string;
  batasSelatan: string;
  batasBarat: string;
  tahun: number;
  proses: string;
  saksi1: string;
  alamatSaksi1: string;
  saksi2: string;
  alamatSaksi2: string;
  tanggal: string;
}

interface SuratConfig {
  field: Record<string, any>;
  templatePath: string;
  fileNamePrefix: string;
}

const defaultValues: FormData = {
  nama: "",
  tempatLahir: "",
  ttl: "",
  noKtp: "",
  alamat: "",
  jalan: "-",
  rt: "-",
  rw: "-",
  desa: "",
  kecamatan: "",
  kabupaten: "",
  nib: "-",
  luas: 0,
  statusTanah: "",
  penggunaan: "",
  batasUtara: "",
  batasTimur: "",
  batasSelatan: "",
  batasBarat: "",
  tahun: 1945,
  proses: "",
  saksi1: "",
  alamatSaksi1: "",
  saksi2: "",
  alamatSaksi2: "",
  tanggal: "",
};

const suratConfigs = {
  suratA: {
    label: "Surat Pernyataan A",
    fields: ["nama", "tempatLahir", "ttl"],
    templatePath: "/SuratPernyataan.docx",
  },
  suratB: {
    label: "Surat Pernyataan B",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratC: {
    label: "Surat Pernyataan C",
    fields: ["nama", "tahun", "batasUtara", "batasBarat"],
    templatePath: "/SuratPernyataan2.docx",
  },
};

const FormulirCustom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });
  const [selectedSurat, setSelectedSurat] = useState<string[]>([]);

  const onSuratChange = (surat: string) => {
    setSelectedSurat((prev) =>
      prev.includes(surat) ? prev.filter((s) => s !== surat) : [...prev, surat]
    );
  };

  const onSubmit = async (data: FormData) => {
    try {
      const configsToGenerate: SuratConfig[] = selectedSurat
        .map((surat) => {
          const config = suratConfigs[surat as keyof typeof suratConfigs];
          if (config) {
            const filteredData = config.fields.reduce((acc, field) => {
              acc[field] = data[field as keyof FormData];
              return acc;
            }, {} as Record<string, any>);

            return {
              field: filteredData,
              templatePath: config.templatePath,
              fileNamePrefix: config.label,
            };
          }
          return null;
        })
        .filter((item): item is SuratConfig => item !== null); // Type guard

      await generateMultipleDocx(configsToGenerate);
      alert("Surat berhasil di-generate!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const displayedFields = Array.from(
    new Set(
      selectedSurat.flatMap(
        (surat) =>
          suratConfigs[surat as keyof typeof suratConfigs]?.fields || []
      )
    )
  );

  return (
    <div className="flex-1 p-8 bg-white rounded-lg shadow-md">
      <h1 className="font-semibold text-center mb-8">Formulir Surat Custom</h1>
      <div className="mb-4">
        <h2 className="mb-2 text-lg font-medium">Pilih Jenis Surat:</h2>
        <div className="space-x-4">
          {Object.entries(suratConfigs).map(([key, config]) => (
            <label key={key} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                value={key}
                checked={selectedSurat.includes(key)}
                onChange={() => onSuratChange(key)}
              />
              <span>{config.label}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedSurat.length > 0 && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {displayedFields.map((field) => (
              <div key={field} className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type="text"
                  {...register(field as keyof FormData, {
                    required: `${
                      field.charAt(0).toUpperCase() + field.slice(1)
                    } harus diisi`,
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[field as keyof FormData] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[field as keyof FormData]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-500 py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Generate Docx
          </button>
        </form>
      )}
    </div>
  );
};

export default FormulirCustom;
