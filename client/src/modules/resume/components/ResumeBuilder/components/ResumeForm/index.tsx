"use client";
import { useState } from "react";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "../../lib/redux/hooks.js";
import { ShowForm, selectFormsOrder } from "../../lib/redux/settingsSlice.js";
import { ProfileForm } from "../../components/ResumeForm/ProfileForm.js";
import { WorkExperiencesForm } from "../../components/ResumeForm/WorkExperiencesForm.js";
import { EducationsForm } from "../../components/ResumeForm/EducationsForm.js";
import { ProjectsForm } from "../../components/ResumeForm/ProjectsForm.js";
import { SkillsForm } from "../../components/ResumeForm/SkillsForm.js";
import { ThemeForm } from "../../components/ResumeForm/ThemeForm/index.js";
import { CustomForm } from "../../components/ResumeForm/CustomForm.js";
import { FlexboxSpacer } from "../../components/FlexboxSpacer.js";
import { cx } from "../../lib/cx.js";

const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const ResumeForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const formsOrder = useAppSelector(selectFormsOrder);
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={cx(
        "flex justify-center scrollbar-thin scrollbar-track-gray-100 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end md:overflow-y-scroll",
        isHover ? "scrollbar-thumb-gray-200" : "scrollbar-thumb-gray-100"
      )}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <section className="flex max-w-2xl flex-col gap-8 p-[var(--resume-padding)]">
        <ProfileForm />
        {formsOrder.map((form) => {
          const Component = formTypeToComponent[form];
          return <Component key={form} />;
        })}
        <ThemeForm />
        <br />
      </section>
      <FlexboxSpacer maxWidth={50} className="hidden md:block" />
    </div>
  );
};
