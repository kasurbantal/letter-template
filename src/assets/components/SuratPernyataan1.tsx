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

function SuratPernyataan1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
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
    },
  });

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

  const onSubmit = (data: FormData) => {
    generateDocx(data);
  };

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
        Generate Surat Pernyataan
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama:
          </label>
          <input
            type="text"
            placeholder="Masukkan nama"
            {...register("nama", { required: "Nama harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nama && (
            <p className="text-sm text-red-500 mt-1">{errors.nama.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tempat, Tanggal Lahir:
          </label>
          <input
            type="date"
            {...register("ttl", { required: "TTL harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.ttl && (
            <p className="text-sm text-red-500 mt-1">{errors.ttl.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            No. KTP:
          </label>
          <input
            type="text"
            {...register("noKtp", { required: "No. KTP harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.noKtp && (
            <p className="text-sm text-red-500 mt-1">{errors.noKtp.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Alamat:
          </label>
          <input
            type="text"
            {...register("alamat", { required: "Alamat harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.alamat && (
            <p className="text-sm text-red-500 mt-1">{errors.alamat.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Jalan:
          </label>
          <input
            type="text"
            {...register("jalan", { required: "Jalan harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.jalan && (
            <p className="text-sm text-red-500 mt-1">{errors.jalan.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">RT:</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.rt && (
            <p className="text-sm text-red-500 mt-1">{errors.rt.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">RW:</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.rw && (
            <p className="text-sm text-red-500 mt-1">{errors.rw.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Desa:
          </label>
          <input
            type="text"
            {...register("desa", { required: "Desa harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.desa && (
            <p className="text-sm text-red-500 mt-1">{errors.desa.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kecamatan:
          </label>
          <input
            type="text"
            {...register("kecamatan", { required: "Kecamatan harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.kecamatan && (
            <p className="text-sm text-red-500 mt-1">
              {errors.kecamatan.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kabupaten:
          </label>
          <input
            type="text"
            {...register("kabupaten", {
              required: "Kabupaten/ Kota harus diisi",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.kabupaten && (
            <p className="text-sm text-red-500 mt-1">
              {errors.kabupaten.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            NIB:
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nib && (
            <p className="text-sm text-red-500 mt-1">{errors.nib.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Luas:
          </label>
          <input
            type="number"
            {...register("luas", { required: "Luas harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.luas && (
            <p className="text-sm text-red-500 mt-1">{errors.luas.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status Tanah:
          </label>
          <input
            type="text"
            {...register("statusTanah", {
              required: "Status tanah harus diisi",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.statusTanah && (
            <p className="text-sm text-red-500 mt-1">
              {errors.statusTanah.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Penggunaan:
          </label>
          <input
            type="text"
            {...register("penggunaan", { required: "Penggunaan harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.penggunaan && (
            <p className="text-sm text-red-500 mt-1">
              {errors.penggunaan.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sebelah Utara:
          </label>
          <input
            type="text"
            {...register("batasUtara", { required: "Batas utara harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.batasUtara && (
            <p className="text-sm text-red-500 mt-1">
              {errors.batasUtara.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sebelah Timur:
          </label>
          <input
            type="text"
            {...register("batasTimur", { required: "Batas timur harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.batasTimur && (
            <p className="text-sm text-red-500 mt-1">
              {errors.batasTimur.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sebelah Selatan:
          </label>
          <input
            type="text"
            {...register("batasSelatan", {
              required: "Batas Selatam harus diisi",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.batasSelatan && (
            <p className="text-sm text-red-500 mt-1">
              {errors.batasSelatan.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sebelah Barat:
          </label>
          <input
            type="text"
            {...register("batasBarat", { required: "Batas barat harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.batasBarat && (
            <p className="text-sm text-red-500 mt-1">
              {errors.batasBarat.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Proses:
          </label>
          <select
            {...register("proses", { required: "Proses harus dipilih" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Proses</option>
            <option value="Jual Beli">Jual Beli</option>
            <option value="Hibah">Hibah</option>
            <option value="Wakaf">Wakaf</option>
          </select>
          {errors.proses && (
            <p className="text-sm text-red-500 mt-1">{errors.proses.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Saksi 1:
          </label>
          <input
            type="text"
            {...register("saksi1", { required: "Saksi 1 harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.saksi1 && (
            <p className="text-sm text-red-500 mt-1">{errors.saksi1.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Alamat Saksi 1:
          </label>
          <input
            type="text"
            {...register("alamatSaksi1", {
              required: "Alamat saksi 1 harus diisi",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.alamatSaksi1 && (
            <p className="text-sm text-red-500 mt-1">
              {errors.alamatSaksi1.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Saksi 2:
          </label>
          <input
            type="text"
            {...register("saksi2", { required: "Saksi 2 harus diisi" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.saksi2 && (
            <p className="text-sm text-red-500 mt-1">{errors.saksi2.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Alamat Saksi 2:
          </label>
          <input
            type="text"
            {...register("alamatSaksi2", {
              required: "Alamat saksi 2 harus diisi",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.alamatSaksi2 && (
            <p className="text-sm text-red-500 mt-1">
              {errors.alamatSaksi2.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tanggal Pembuatan:
          </label>
          <input
            type="date"
            {...register("tanggal", {
              required: "Tanggal pembuatan harus diisi",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.tanggal && (
            <p className="text-sm text-red-500 mt-1">
              {errors.tanggal.message}
            </p>
          )}
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Buat Docx
          </button>
        </div>
      </form>
    </div>
  );
}

export default SuratPernyataan1;
