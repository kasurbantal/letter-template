import { Formulir } from "./Formulir";
import { SideBar } from "./SideBar";

export default function SuratPernyataan() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <Formulir />
    </div>
  );
}
