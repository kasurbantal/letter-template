import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { generateMultipleDocx } from "../../helper/helper1";
import { MdOutlineAssignment } from "react-icons/md";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  defaultValues,
  SuratConfig,
  FormData,
  suratConfigs,
  pemilikLahan,
  suratLahan,
  draftPks,
  fieldLabels,
} from "../../constant/formInterface";

const FormulirCustom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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

      const configsToGenerate3: SuratConfig[] = selectedSurat
        .map((surat) => {
          const config = suratLahan[surat as keyof typeof suratLahan];
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
          suratLahan[surat as keyof typeof suratLahan]?.fields ||
          pemilikLahan[surat as keyof typeof pemilikLahan]?.fields ||
          draftPks[surat as keyof typeof draftPks]?.fields
      )
    )
  );

  const isDateField = (field: string) => {
    const dateFields = [
      "ttlPembuat",
      "tanggalPembuatan",
      "tanggalLahir",
      "tglSurat",
      "tanggalPertemuan",
      "tglDok",
    ];
    return dateFields.includes(field);
  };

  return (
    <div className="md:px-8 md:py-6 items-center sm:px-6 sm:py-4">
      <div className="justify-between grid sm:grid-cols-1 md:grid-cols-2 gap-1 mb-4">
        {/* <div className="md:px-4 md:py-4 sm:px-2 sm:py-2 bg-white rounded-lg flex flex-col border-2 border-gray-200">
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
        </div> */}
        <div className="px-4 py-4 bg-white rounded-lg flex flex-col border-2 border-gray-200">
          <div className="flex flex-direction-row">
            <MdOutlineAssignment size={24} className="text-orange-400 mr-2" />
            <h2 className="mb-2 text-lg font-bold text-md text-orange-400">
              Dok Lahan:
            </h2>
          </div>
          <div className="space-x-4">
            {Object.entries(suratLahan).map(([key, config]) => (
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
        {/* <div className="px-4 py-4 bg-white rounded-lg flex flex-col border-2 border-gray-200">
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
        </div> */}
        {/* <div className="px-4 py-4 bg-white rounded-lg flex flex-col border-2 border-gray-200">
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
        </div> */}
      </div>

      {selectedSurat.length > 0 && (
        <div className="px-4 py-4 bg-white rounded-lg flex flex-col border-2 border-gray-200 mt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4 sm:grid-cols-2">
              {displayedFields.map((field) => (
                <div key={field} className="w-full">
                  <label className="block text-sm font-medium text-black pb-2">
                    {fieldLabels[field] || field}
                  </label>
                  {isDateField(field) ? (
                    <Controller
                      name={field as keyof FormData}
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            value={value ? dayjs(value, "DD-MM-YYYY") : null}
                            onChange={(date) => {
                              if (date) {
                                onChange(dayjs(date).format("DD-MM-YYYY"));
                              }
                            }}
                            format="DD/MM/YYYY"
                            viewRenderers={{
                              hours: null,
                              minutes: null,
                              seconds: null,
                            }}
                            formatDensity="spacious"
                            slotProps={{
                              textField: {
                                variant: "outlined",
                                color: "warning",
                                size: "small",
                              },
                            }}
                            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border-gray-300"
                          />
                        </LocalizationProvider>
                      )}
                    />
                  ) : (
                    <input
                      type="text"
                      {...register(field as keyof FormData, {
                        required: `${fieldLabels[field] || field} harus diisi`,
                      })}
                      className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border-gray-300"
                    />
                  )}
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
