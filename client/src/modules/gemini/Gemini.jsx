import Main from "@/components/gemini/main/Main";
import Sidebar from "@/components/gemini/sidebar/Sidebar";

function Gemini() {
  return (
    <div className="flex">
      <Sidebar />
      <Main />
    </div>
  );
}

export default Gemini;
