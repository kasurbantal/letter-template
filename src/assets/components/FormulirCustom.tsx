import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateMultipleDocx } from "../../helper1";
import { MdOutlineAssignment } from "react-icons/md";

interface FormData {
  nama: string;
  nama2: string;
  tempatLahir: string;
  ttl: string;
  ttl2: string;
  noKtp: string;
  noKtp2: string;
  alamat: string;
  jalan: string;
  rt: string;
  rw: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
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
  ahliWaris: string;
  tanggalAkta: string;
  numberPenerbit: string;
  penerbit: string;
  buktiKepemilikan: string;
  namaKuasa: string;
  ttlKuasa: string;
  noKtpKuasa: string;
  alamatKuasa: string;
  lokasi: string;
  pemberiKuasa: string;
  penerimaKuasa: string;
}

interface SuratConfig {
  field: Record<string, unknown>;
  templatePath: string;
  fileNamePrefix: string;
}

const defaultValues: FormData = {
  nama: "",
  nama2: "",
  tempatLahir: "",
  ttl: "",
  ttl2: "",
  noKtp: "",
  noKtp2: "",
  alamat: "",
  jalan: "",
  rt: "",
  rw: "",
  desa: "",
  kecamatan: "",
  kabupaten: "",
  provinsi: "",
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
  ahliWaris: "",
  tanggalAkta: "",
  numberPenerbit: "",
  penerbit: "",
  buktiKepemilikan: "",
  namaKuasa: "",
  ttlKuasa: "",
  noKtpKuasa: "",
  alamatKuasa: "",
  lokasi: "",
  pemberiKuasa: "",
  penerimaKuasa: "",
};

const suratSitacs = {
  suratM: {
    label: "Surat Persetujuan Warga dalam Radius Tower-Rev.4.2-NEW L1",
    fields: ["nama", "tempatLahir", "ttl"],
    templatePath: "/SuratPernyataan.docx",
  },
  suratN: {
    label: "Sketsa Batas Lahan dan Persetujuan Akses Jalan-Rev.4.3-NEW L1",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratO: {
    label: "3. Berita Acara Negosiasi (BAN)-Rev.6.3",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratP: {
    label: "2. Berita Acara Kesepakatan (BAK) - 11 Tahun-Rev.5.2",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratQ: {
    label: "1. Berita Acara Kesepakatan (BAK) - 20 Tahun-Rev.5.3",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratR: {
    label: "BA Pengukuran Warga Radius Tower",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratS: {
    label: "19 Surat Persetujuan Lahan dan Jalan",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratT: {
    label: "5. Bukti Penerimaan Pemberitahuan Persetujuan Warga dalam Radius",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratU: {
    label:
      "14. Layout Denah Lokasi Penempatan Menara Tower Telekomunikasi dalam Radius Tower",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
};

const draftPks = {
  suratI: {
    label: "7. Draft Perjanjian Sewa Lahan (Standard) - 11 Tahun (4) -INDIVIDU",
    fields: ["nama", "tempatLahir", "ttl"],
    templatePath: "/SuratPernyataan.docx",
  },
  suratJ: {
    label: "7. Draft Perjanjian Sewa Lahan (Standard) - 20 Tahun (1)",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratK: {
    label:
      "7. Draft Perjanjian Sewa Lahan (Standard) - 11 Tahun (4) -INDIVIDU (kuasa)",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratL: {
    label: "7. Draft Perjanjian Sewa Lahan (Standard) - 11 Tahun - WARIS",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
};

const pemilikLahan = {
  suratV: {
    label: "Surat Persetujuan dan Kuasa Ahli Waris-Rev.5.3 L1",
    fields: [
      "nama",
      "noKtp",
      "ttl",
      "nama2",
      "noKtp2",
      "ttl2",
      "ahliWaris",
      "tanggalAkta",
      "number",
      "penerbit",
      "buktiKepemilikan",
      "alamat",
      "desa",
      "rt",
      "rw",
      "kecamatan",
      "kabupaten",
      "provinsi",
      "namaKuasa",
      "ttlKuasa",
      "noKtpKuasa",
      "alamatKuasa",
      "namaPerusahaan",
      "lokasi",
      "pemberiKuasa",
      "penerimaKuasa",
    ],
    templatePath: "/public/Dok Pemilik Lahan/waris/SuperRekeningAktif.docx",
  },
  suratW: {
    label: "Super Rekening Aktif",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratX: {
    label: "18. Surat Keterangan Ahli Waris-1",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratY: {
    label: "Surat Persetujuan Pasangan dan Keluarga-Rev.6.3-NEW L1",
    fields: ["nama", "tempatLahir", "ttl"],
    templatePath: "/SuratPernyataan.docx",
  },
  suratZ: {
    label: "Surat Kuasa",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
};

const suratConfigs = {
  suratA: {
    label: "Surat Pernyataan Tidak Sengketa dan Tidak Dalam Jaminan-Rev.1.0",
    fields: ["nama", "tempatLahir", "ttl"],
    templatePath: "/SuratPernyataan.docx",
  },
  suratB: {
    label: "Surat Pernyataan Tidak Sengketa dan Dalam Jaminan-Rev.1.0",
    fields: ["nama", "alamat", "desa", "nib"],
    templatePath: "/SuratPernyataan1.docx",
  },
  suratC: {
    label: "19. Surat Keterangan Riwayat Tanah-Rev.6.2",
    fields: ["nama", "tahun", "batasUtara", "batasBarat"],
    templatePath: "/SuratPernyataan2.docx",
  },
  suratD: {
    label: "16 Surat Keterangan Kepemilikan Tanah",
    fields: ["nama", "tahun", "batasUtara", "batasBarat"],
    templatePath: "/SuratPernyataan2.docx",
  },
  suratE: {
    label:
      "24. Suket BPN - Surat Pernyataan Tanah Belum Bersertipikat-Standard TBIG",
    fields: ["nama", "tahun", "batasUtara", "batasBarat"],
    templatePath: "/SuratPernyataan2.docx",
  },
  suratF: {
    label: "33. Surat Keterangan Bebas Banjir",
    fields: ["nama", "tahun", "batasUtara", "batasBarat"],
    templatePath: "/SuratPernyataan2.docx",
  },
  suratG: {
    label: "14. Surat Pernyataan Penguasaan Fisik Tanah",
    fields: ["nama", "tahun", "batasUtara", "batasBarat"],
    templatePath: "/SuratPernyataan2.docx",
  },
  suratH: {
    label: "15. Surat Keterangan Tanah",
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
            }, {} as Record<string, unknown>);

            return {
              field: filteredData,
              templatePath: config.templatePath,
              fileNamePrefix: config.label,
            };
          }
          return null;
        })
        .filter((item): item is SuratConfig => item !== null);

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
    <div className="px-8 py-6 items-center">
      <div className="justify-between grid grid-cols-2 gap-1 mb-4">
        <div className="px-4 py-4 bg-white rounded-lg flex flex-col border-2 border-gray-200">
          <div className="flex flex-direction-row">
            <MdOutlineAssignment size={24} className="text-orange-400 mr-2" />
            <h2 className="mb-2 text-lg font-bold text-md text-orange-400">
              Dok Lahan:
            </h2>
          </div>
          <div className="space-x-4">
            {Object.entries(suratConfigs).map(([key, config]) => (
              <label
                key={key}
                className="flex items-center text-black p-1 gap-2"
              >
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
        <div className="px-4 py-4 bg-white rounded-lg flex flex-col border-2 border-gray-200">
          <div className="flex flex-direction-row">
            <MdOutlineAssignment size={24} className="text-orange-400 mr-2" />
            <h2 className="mb-2 text-lg font-bold text-md text-orange-400">
              Dok SITAC:
            </h2>
          </div>
          <div className="space-x-4">
            {Object.entries(suratSitacs).map(([key, config]) => (
              <label
                key={key}
                className="flex items-center text-black p-1 gap-2"
              >
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
        <div className="px-4 py-4 bg-white rounded-lg flex flex-col border-2 border-gray-200">
          <div className="flex flex-direction-row">
            <MdOutlineAssignment size={24} className="text-orange-400 mr-2" />
            <h2 className="mb-2 text-lg font-bold text-md text-orange-400">
              Draft PKS:
            </h2>
          </div>
          <div className="space-x-4">
            {Object.entries(draftPks).map(([key, config]) => (
              <label
                key={key}
                className="flex items-center text-black p-1 gap-2"
              >
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
        <div className="px-4 py-4 bg-white rounded-lg flex flex-col border-2 border-gray-200">
          <div className="flex flex-direction-row">
            <MdOutlineAssignment size={24} className="text-orange-400 mr-2" />
            <h2 className="mb-2 text-lg font-bold text-md text-orange-400">
              Dok Pemilik lahan:
            </h2>
          </div>
          <div className="space-x-4">
            {Object.entries(pemilikLahan).map(([key, config]) => (
              <label
                key={key}
                className="flex items-center text-black p-1 gap-2"
              >
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
      </div>

      {selectedSurat.length > 0 && (
        <div className="px-4 py-4 bg-white rounded-lg flex flex-col border-2 border-gray-200 mt-2 ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div className="grid grid-cols-3 gap-4">
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                  {errors[field as keyof FormData] && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[field as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </form>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="text-white bg-orange-500 py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Generate Docx
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormulirCustom;
