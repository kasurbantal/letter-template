import { Formulir } from "../assets/components/Formulir";
import { SideBar } from "../assets/components/SideBar";

export default function SuratPernyataan() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <Formulir />
    </div>
  );
}
