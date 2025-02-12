import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-white shadow-lg p-4 transition-all duration-300 flex flex-col`}
      >
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-end mb-4 focus:outline-none"
        >
          {isOpen ? (
            <ChevronLeft className="text-gray-600" />
          ) : (
            <ChevronRight className="text-gray-600" />
          )}
        </button>

        {isOpen && (
          <>
            <h2 className="text-xl font-bold mb-4">Surat Pernyataan</h2>
            <ul className="space-y-2">
              <li className="text-gray-600 font-medium cursor-pointer">
                Surat Pernyataan
              </li>
              <li className="text-gray-600 font-medium cursor-pointer">
                Surat Pernyataan Lainnya
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
