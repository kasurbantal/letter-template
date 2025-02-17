import { useForm } from "react-hook-form";
import { generateDocx } from "../../helper/helper";

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

const inputObject: Record<
  string,
  { label: string; type: string; options?: string[] }
> = {
  nama: { label: "Nama", type: "text" },
  tempatLahir: { label: "Tempat Lahir", type: "text" },
  ttl: { label: "Tanggal Lahir", type: "date" },
  noKtp: { label: "No. KTP", type: "text" },
  alamat: { label: "Alamat", type: "text" },
  jalan: { label: "Jalan", type: "text" },
  rt: { label: "RT", type: "text" },
  rw: { label: "RW", type: "text" },
  desa: { label: "Desa / Kelurahan", type: "text" },
  kecamatan: { label: "Kecamatan", type: "text" },
  kabupaten: { label: "Kabupaten", type: "text" },
  nib: { label: "NIB", type: "text" },
  luas: { label: "Luas", type: "number" },
  statusTanah: { label: "Status Tanah", type: "text" },
  penggunaan: { label: "Dipergunakan Untuk", type: "text" },
  batasUtara: { label: "Batas Utara", type: "text" },
  batasTimur: { label: "Batas Timur", type: "text" },
  batasSelatan: { label: "Batas Selatan", type: "text" },
  batasBarat: { label: "Batas Barat", type: "text" },
  tahun: { label: "Tahun Dokumen", type: "year" },
  proses: {
    label: "Proses",
    type: "select",
    options: ["", "Jual Beli", "Hibah", "Wakaf"],
  },
  saksi1: { label: "Saksi 1", type: "text" },
  alamatSaksi1: { label: "Alamat Saksi 1", type: "text" },
  saksi2: { label: "Saksi 2", type: "text" },
  alamatSaksi2: { label: "Alamat Saksi 2", type: "text" },
  tanggal: { label: "Tanggal Pembuatan", type: "date" },
};

export const Formulir = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  const onSubmit = async (data: FormData) => {
    try {
      await generateDocx(data, "/SuratPernyataan.docx");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex-1 p-8 bg-white rounded-lg shadow-md">
        <h1 className="font-semibold text-center mb-8">
          Surat Pernyataan Penguasaan Fisik Tanah
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {Object.entries(inputObject).map(([name, field]) => (
              <div
                key={name}
                className={`${
                  name === "nama" ||
                  name === "alamat" ||
                  name === "alamatSaksi1" ||
                  name === "alamatSaksi2"
                    ? "col-span-2"
                    : "w-full"
                }`}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}:
                </label>
                {field.type === "select" ? (
                  <select
                    {...register(name as keyof FormData, {
                      required: `${field.label} harus diisi`,
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option || "Pilih Proses"}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    {...register(name as keyof FormData, {
                      required: `${field.label} harus diisi`,
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {errors[name as keyof FormData] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[name as keyof FormData]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Generate Docx
          </button>
        </form>
      </div>
    </>
  );
};
