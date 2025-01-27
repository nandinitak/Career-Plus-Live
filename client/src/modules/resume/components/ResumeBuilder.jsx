"use client";
import { Provider } from "react-redux";
import { store } from "./ResumeBuilder/lib/redux/store";
import { ResumeForm } from "./ResumeBuilder/components/ResumeForm";
import { Resume } from "./ResumeBuilder/components/Resume";

export default function Create() {
  return (
    <Provider store={store}>
      <main className="h-full w-full bg-gray-50">
        <div className="grid md:grid-cols-6">
          <div className="col-span-3">
            <ResumeForm />
          </div>
          <div className="col-span-3">
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
  );
}
