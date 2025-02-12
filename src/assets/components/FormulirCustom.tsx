import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateMultipleDocx } from "../../helper1";
import { MdOutlineAssignment } from "react-icons/md";

interface FormData {
  namaPembuat: string;
  tempatLahirPembuat: string;
  ttlPembuat: Date;
  noKtpPembuat: string;
  alamatPembuat: string;
  jalan: string;
  rt: string;
  rw: string;
  desa: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  nib: string;
  luas: number | string;
  statusTanah: string;
  penggunaan: string;
  batasUtara: string;
  batasTimur: string;
  batasSelatan: string;
  batasBarat: string;
  tahunDok: number;
  proses: string;
  saksi1: string;
  alamatSaksi1: string;
  saksi2: string;
  alamatSaksi2: string;
  saksi3: string;
  saksi4: string;
  tanggalPembuatan: Date;
  kades: string;
  nipKades: string;
  camat: string;
  nipCamat: string;
  tandaBatas: string;
  keadaanTanah: string;
  penunjukBatas: string;
  nop: string;
  persil: string;
  klas: string;
  pemilikTanah: string;
  panjangTanah: number;
  lebarTanah: number;
  dusun: string;
  alamatTanah: string;
  lokasi: string;
  namaPejabat: string;
  jabatan: string;
  ptSatu: string;
  ptDua: string;
  nomorDok: string;
  tglDok: Date;
  nameSite: string;
  siteId: string;
  namaPemilik: string;
  alamatPemilik: string;
  noKTPPemilik: string;
  noBAK: string;
  namaRt: string;
  namaRw: string;
  pekerjaanPembuat: string;
  nomorTanah: string;
  tglTtdPemilik: Date;
  tglTtdKades: Date;
  tglTtdCamat: Date;
  hariPertemuan: string;
  tanggalPertemuan: string;
  namaPejabatBPN: string;
  jabatanPejabatBPN: string;
}

interface SuratConfig {
  field: Record<string, unknown>;
  templatePath: string;
  fileNamePrefix: string;
}

const defaultValues: FormData = {
  namaPembuat: "",
  tempatLahirPembuat: "",
  ttlPembuat: new Date(),
  noKtpPembuat: "",
  alamatPembuat: "",
  jalan: "",
  rt: "",
  rw: "",
  desa: "",
  kecamatan: "",
  kota: "",
  provinsi: "",
  nib: "",
  luas: 0,
  statusTanah: "",
  penggunaan: "",
  batasUtara: "",
  batasTimur: "",
  batasSelatan: "",
  batasBarat: "",
  tahunDok: 0,
  proses: "",
  saksi1: "",
  alamatSaksi1: "",
  saksi2: "",
  alamatSaksi2: "",
  saksi3: "",
  saksi4: "",
  tanggalPembuatan: new Date(),
  kades: "",
  nipKades: "",
  camat: "",
  nipCamat: "",
  tandaBatas: "",
  keadaanTanah: "",
  penunjukBatas: "",
  nop: "",
  persil: "",
  klas: "",
  pemilikTanah: "",
  panjangTanah: 0,
  lebarTanah: 0,
  dusun: "",
  alamatTanah: "",
  lokasi: "",
  namaPejabat: "",
  jabatan: "",
  ptSatu: "",
  ptDua: "",
  nomorDok: "",
  tglDok: new Date(),
  nameSite: "",
  siteId: "",
  namaPemilik: "",
  alamatPemilik: "",
  noKTPPemilik: "",
  noBAK: "",
  namaRt: "",
  namaRw: "",
  pekerjaanPembuat: "",
  nomorTanah: "",
  tglTtdPemilik: new Date(),
  tglTtdKades: new Date(),
  tglTtdCamat: new Date(),
  hariPertemuan: "",
  tanggalPertemuan: "",
  namaPejabatBPN: "",
  jabatanPejabatBPN: "",
};

const suratSitacs = {
  suketBPNSuratPernyataanTanahBelumBersertipikatStandardTBIG: {
    label: "SuketBPN-SuratPernyataanTanahBelumBersertipikat-StandardTBIG",
    fields: [
      "tanggalPembuatan",
      "namaPejabat",
      "jabatan",
      "ptSatu",
      "ptDua",
      "nomorDok",
      "tglDok",
      "nameSite",
      "siteId",
      "alamatTanah",
      "batasUtara",
      "batasTimur",
      "batasSelatan",
      "batasBarat",
      "persil",
      "namaPemilik",
      "namaPejabatBPN",
      "jabatanPejabatBPN",
      "hariPertemuan",
      "tanggalPertemuan",
    ],
    templatePath:
      "/public/doc-lahan/SuketBPN-SuratPernyataanTanahBelumBersertipikat-StandardTBIG.docx",
  },
  suratKeteranganBebasBanjir: {
    label: "SuratKeteranganBebasBanjir",
    fields: [
      "namaPemilik",
      "alamatPemilik",
      "noKTPPemilik",
      "noBAK",
      "tanggalPembuatan",
      "namaRt",
      "namaRw",
    ],
    templatePath: "/doc-lahan/SuratKeteranganBebasBanjir.docx",
  },
  suratKeteranganKepemilikanTanah: {
    label: "SuratKeteranganKepemilikanTanah",
    fields: [
      "desa",
      "kecamatan",
      "kota",
      "provinsi",
      "penggunaan",
      "nop",
      "persil",
      "klas",
      "pemilikTanah",
      "panjangTanah",
      "lebarTanah",
      "namaPembuat",
      "dusun",
      "batasUtara",
      "batasTimur",
      "batasSelatan",
      "batasBarat",
      "alamatTanah",
      "saksi1",
      "saksi2",
      "saksi3",
      "saksi4",
      "tanggalPembuatan",
      "kades",
      "nipKades",
      "camat",
      "nipCamat",
    ],
    templatePath: "/doc-lahan/SuratKeteranganKepemilikanTanah.docx",
  },
  suratKeteranganRiwayatTanahRev62: {
    label: "SuratKeteranganRiwayatTanah-Rev.6.2",
    fields: [
      "desa",
      "kecamatan",
      "kota",
      "provinsi",
      "penggunaan",
      "nop",
      "persil",
      "klas",
      "pemilikTanah",
      "nama",
      "alamat",
      "lokasi",
      "tanggalPembuatan",
      "saksi1",
      "saksi2",
      "saksi3",
      "saksi4",
      "kades",
      "nipKades",
      "camat",
      "nipCamat",
    ],
    templatePath: "/doc-lahan/SuratKeteranganRiwayatTanah-Rev.6.2.docx",
  },
  suratKeteranganTanah: {
    label: "SuratKeteranganTanah",
    fields: [
      "desa",
      "kecamatan",
      "kota",
      "provinsi",
      "penggunaan",
      "nop",
      "persil",
      "klas",
      "pemilikTanah",
      "nama",
      "alamat",
      "lokasi",
      "tanggalPembuatan",
      "saksi1",
      "saksi2",
      "saksi3",
      "saksi4",
      "kades",
      "nipKades",
      "camat",
      "nipCamat",
    ],
    templatePath: "/doc-lahan/SuratKeteranganTanah.docx",
  },
  suratPernyataanPenguasaanFisikTanah: {
    label: "SuratPernyataanPenguasaanFisikTanah",
    fields: [
      "namaPembuat",
      "tempatLahir",
      "ttl",
      "noKtp",
      "alamatPembuat",
      "jalan",
      "rt",
      "rw",
      "desa",
      "kecamatan",
      "kota",
      "nib",
      "luas",
      "statusTanah",
      "penggunaan",
      "batasUtara",
      "batasTimur",
      "batasSelatan",
      "batasBarat",
      "tahunDok",
      "proses",
      "saksi1",
      "alamatSaksi1",
      "saksi2",
      "alamatSaksi2",
      "tanggalPembuatan",
      "kades",
      "nipKades",
      "camat",
      "nipCamat",
      "tandaBatas",
      "keadaanTanah",
      "penunjukBatas",
    ],
    templatePath: "/doc-lahan/SuratPernyataanPenguasaanFisikTanah.docx",
  },
  suratPernyataanTidakSengketadanDalamJaminanRev10: {
    label: "SuratPernyataanTidakSengketadanDalamJaminan-Rev.1.0",
    fields: [
      "namaPembuat",
      "noKtp",
      "tempatLahir",
      "ttl",
      "alamatPembuat",
      "pekerjaanPembuat",
      "alamatTanah",
      "luas",
      "statusTanah",
      "nomorTanah",
      "batasUtara",
      "batasTimur",
      "batasSelatan",
      "batasBarat",
      "tglTtdPemilik",
      "kades",
      "nipKades",
      "tglTtdKades",
      "camat",
      "nipCamat",
      "tglTtdCamat",
    ],
    templatePath:
      "/doc-lahan/SuratPernyataanTidakSengketadanDalamJaminan-Rev.1.0.docx",
  },
  suratPernyataanTidakSengketadanTidakDalamJaminanRev10NEWL1: {
    label: "SuratPernyataanTidakSengketadanTidakDalamJaminan-Rev.1.0-NEW L1",
    fields: [
      "namaPembuat",
      "noKtp",
      "tempatLahir",
      "ttl",
      "alamatPembuat",
      "pekerjaanPembuat",
      "alamatTanah",
      "luas",
      "statusTanah",
      "nomorTanah",
      "batasUtara",
      "batasTimur",
      "batasSelatan",
      "batasBarat",
      "tglTtdPemilik",
      "kades",
      "nipKades",
      "tglTtdKades",
      "camat",
      "nipCamat",
      "tglTtdCamat",
    ],
    templatePath:
      "/doc-lahan/SuratPernyataanTidakSengketadanTidakDalamJaminan-Rev.1.0-NEW L1.docx",
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
    templatePath:
      "/public/Dok Pemilik Lahan/waris/SuratPersetujuandanKuasaAhliWaris.docx",
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

      const configsToGenerate2: SuratConfig[] = selectedSurat
        .map((surat) => {
          const config = pemilikLahan[surat as keyof typeof pemilikLahan];
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
      console.log(configsToGenerate2);

      const configsToGenerate3: SuratConfig[] = selectedSurat
        .map((surat) => {
          const config = suratSitacs[surat as keyof typeof suratSitacs];
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
      console.log(configsToGenerate3);

      const configsToGenerate4: SuratConfig[] = selectedSurat
        .map((surat) => {
          const config = draftPks[surat as keyof typeof draftPks];
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

      await generateMultipleDocx(
        configsToGenerate,
        configsToGenerate2,
        configsToGenerate3,
        configsToGenerate4
      );
      alert("Surat berhasil di-generate!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const displayedFields = Array.from(
    new Set(
      selectedSurat.flatMap(
        (surat) =>
          suratConfigs[surat as keyof typeof suratConfigs]?.fields ||
          suratSitacs[surat as keyof typeof suratSitacs]?.fields ||
          pemilikLahan[surat as keyof typeof pemilikLahan]?.fields ||
          draftPks[surat as keyof typeof draftPks]?.fields
      )
    )
  );

  return (
    <div className="md:px-8 md:py-6 items-center sm:px-6 sm:py-4">
      <div className="justify-between grid sm:grid-cols-1 md:grid-cols-2 gap-1 mb-4">
        <div className="md:px-4 md:py-4 sm:px-2 sm:py-2 bg-white rounded-lg flex flex-col border-2 border-gray-200">
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
            <div className="grid md:grid-cols-4 gap-4 sm:grid-cols-2">
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
                    className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border-gray-300"
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
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="text-white bg-orange-500 py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
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
