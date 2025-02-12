// // catatan dari Indra
// const inputObject = {
//   nama: {
//     label: "Nama",
//     type: "text",
//     placeholder: "Masukkan nama",
//   },
// };

// //Catatan dari Indra
// const labelWithObject = inputObject["nama"]; // O(1)
// const labelWithArray = inputFields.find((item) => item.name === "nama"); // Worst case O(n), best case O(1)

import { useForm } from "react-hook-form";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

interface FormData {
  nama: string;
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

const defaultValues: FormData = {
  nama: "",
  ttl: "",
  noKtp: "",
  alamat: "",
  jalan: "",
  rt: "",
  rw: "",
  desa: "",
  kecamatan: "",
  kabupaten: "",
  nib: "",
  luas: 0,
  statusTanah: "",
  penggunaan: "",
  batasUtara: "",
  batasTimur: "",
  batasSelatan: "",
  batasBarat: "",
  tahun: 0,
  proses: "",
  saksi1: "",
  alamatSaksi1: "",
  saksi2: "",
  alamatSaksi2: "",
  tanggal: "",
};

interface InputField {
  name: keyof FormData;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
}

const inputFields: InputField[] = [
  { name: "nama", label: "Nama", type: "text", placeholder: "Masukkan nama" },
  { name: "ttl", label: "Tempat, Tanggal Lahir", type: "date" },
  { name: "noKtp", label: "No. KTP", type: "text" },
  { name: "alamat", label: "Alamat", type: "text" },
  { name: "jalan", label: "Jalan", type: "text" },
  { name: "rt", label: "RT", type: "number" },
  { name: "rw", label: "RW", type: "number" },
  { name: "desa", label: "Desa", type: "text" },
  { name: "kecamatan", label: "Kecamatan", type: "text" },
  { name: "kabupaten", label: "Kabupaten", type: "text" },
  { name: "nib", label: "NIB", type: "text" },
  { name: "luas", label: "Luas", type: "number" },
  { name: "statusTanah", label: "Status Tanah", type: "text" },
  { name: "penggunaan", label: "Penggunaan", type: "text" },
  { name: "batasUtara", label: "Sebelah Utara", type: "text" },
  { name: "batasTimur", label: "Sebelah Timur", type: "text" },
  { name: "batasSelatan", label: "Sebelah Selatan", type: "text" },
  { name: "batasBarat", label: "Sebelah Barat", type: "text" },
  {
    name: "proses",
    label: "Proses",
    type: "select",
    options: ["", "Jual Beli", "Hibah", "Wakaf"],
  },
  { name: "saksi1", label: "Saksi 1", type: "text" },
  { name: "alamatSaksi1", label: "Alamat Saksi 1", type: "text" },
  { name: "saksi2", label: "Saksi 2", type: "text" },
  { name: "alamatSaksi2", label: "Alamat Saksi 2", type: "text" },
  { name: "tanggal", label: "Tanggal Pembuatan", type: "date" },
];

export default function SuratPernyataan() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  const generateDocx = async (data: FormData) => {
    try {
      const response = await fetch("/SuratPernyataan.docx");
      const arrayBuffer = await response.arrayBuffer();

      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip);
      doc.render(data);

      const output = doc.getZip().generate({ type: "blob" });
      saveAs(output, "Surat-Pernyataan.docx");
    } catch (error) {
      console.error("Error generating document:", error);
    }
  };

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="font-base text-center mb-8 text-blue-600 ">
        Generate Surat Pernyataan
      </h1>
      <form onSubmit={handleSubmit(generateDocx)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {inputFields.map(({ name, label, type, placeholder, options }) => (
            <div
              key={name}
              className={`${
                name === "proses" ||
                name === "nama" ||
                name === "alamat" ||
                name === "alamatSaksi1" ||
                name === "alamatSaksi2"
                  ? "col-span-2"
                  : "w-full"
              }`}
            >
              <label className="block text-sm font-medium text-gray-700">
                {label}:
              </label>
              {type === "select" ? (
                <select
                  {...register(name, { required: `${label} harus diisi` })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {options?.map((option) => (
                    <option key={option} value={option}>
                      {option || "Pilih Proses"}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  placeholder={placeholder}
                  {...register(name, {
                    required:
                      name !== "rt" &&
                      name !== "rw" &&
                      name !== "nib" &&
                      name !== "jalan"
                        ? `${label} harus diisi`
                        : false,
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {errors[name] && (
                <p className="text-sm text-red-500 mt-1">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Generate Docx
        </button>
      </form>
    </div>
  );
}
