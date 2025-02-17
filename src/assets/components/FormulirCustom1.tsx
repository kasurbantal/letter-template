import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateDocx } from "../../helper/helper";

interface FormData {
  nama: string;
  tempatLahir: string;
  ttl: string;
  alamat: string;
}

const defaultValues: FormData = {
  nama: "",
  tempatLahir: "",
  ttl: "",
  alamat: "",
};

const inputFields: Record<string, { label: string; type: string }> = {
  nama: { label: "Nama", type: "text" },
  tempatLahir: { label: "Tempat Lahir", type: "text" },
  ttl: { label: "Tanggal Lahir", type: "date" },
  alamat: { label: "Alamat", type: "text" },
};

const suratFields: Record<string, (keyof FormData)[]> = {
  suratA: ["nama", "tempatLahir", "ttl"],
  suratB: ["nama", "tempatLahir", "ttl", "alamat"],
};

const FormulirCustom1 = () => {
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });
  const [selectedSurat, setSelectedSurat] = useState<string[]>([]);

  const onSuratChange = (surat: string) => {
    setSelectedSurat((prev) =>
      prev.includes(surat) ? prev.filter((s) => s !== surat) : [...prev, surat]
    );
    reset(defaultValues); // Reset form fields when surat selection changes
  };

  const onSubmit = async (data: FormData) => {
    try {
      for (const surat of selectedSurat) {
        await generateDocx(data, `/${surat}.docx`);
      }
      alert("Surat berhasil di-generate!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Get unique fields based on selected surat types
  const displayedFields = Array.from(
    new Set(selectedSurat.flatMap((surat) => suratFields[surat] || []))
  );

  return (
    <div className="px-8 py-6 items-center">
      <div className="px-4 py-4 bg-white rounded-lg flex flex-col w-1/2 border-2 border-gray-200">
        <h2 className="mb-2 text-lg font-bold text-md text-orange-400">
          Dok Lahan:
        </h2>
        <div className="space-x-4">
          {Object.keys(suratFields).map((surat) => (
            <label key={surat} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                value={surat}
                checked={selectedSurat.includes(surat)}
                onChange={() => onSuratChange(surat)}
              />
              <span>{surat}</span>
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
                  {inputFields[field].label}:
                </label>
                <input
                  type={inputFields[field].type}
                  {...register(field as keyof FormData, {
                    required: `${inputFields[field].label} harus diisi`,
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[field] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[field]?.message}
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

export default FormulirCustom1;
