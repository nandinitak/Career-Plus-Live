import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";

import { useState } from "react";
import useSessionManager from "@/clientSession/SessionManager";
import { SettingsProvider } from "@/context/Setting";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUp from "@/modules/authentication/sign-up";
import Interview from "@/modules/interview/components/interview/Interview";
import InterviewFeedback from "@/modules/interview/components/FeedbackPage";
import NextBestSteps from "@/modules/insights/next-best-steps/NextBestStepWidget";
import Error from "@/components/Error";
import VizSearchEmbed from "@/components/Viz/SearchPage";
import VoiceWidget from "@/modules/jobin/VoiceWidget";
const SessionExpiryPopup = lazy(() => import("../components/PopUp"));
const CourseLayout = lazy(
  () => import("@/modules/pathways/course/CourseLayout")
);
const CreateCourseLayout = lazy(
  () => import("@/modules/pathways/course/CreateCourseLayout")
);
const CreateCourse = lazy(
  () => import("@/modules/pathways/course/CreateCourse")
);
const Course = lazy(() => import("@/modules/pathways/course/Course"));
const Learn = lazy(() => import("@/modules/pathways/course/learn/Learn"));
const MyProfile = lazy(() => import("@/modules/myProfile/MyProfile"));
const Community = lazy(() => import("@/modules/community/Community"));
const InterviewPage = lazy(() => import("@/modules/interview/InterviewPage"));
const Flow = lazy(() => import("../home/start/Flow"));
const NextBestStepWidget = lazy(
  () => import("@/modules/insights/next-best-steps/NextBestStepWidget")
);
const Resume = lazy(() => import("@/modules/resume/Resume"));
const JobsPageLayout = lazy(() => import("@/modules/jobs/JobPageLayout"));
const AnimateR = lazy(() => import("../routes/AnimatedRoute"));
const FlowLayout = lazy(() => import("../home/start/FlowLayout"));
const EditorPageLayout = lazy(
  () => import("@/modules/practice/components/EditorPageLayout")
);
const Mentor = lazy(() => import("@/modules/mentor/Mentor"));
const Playground = lazy(
  () => import("@/modules/judge/screens/Playground/Playground")
);
const LandingPage = lazy(() => import("../home/landing/LandingPage"));
const PracticeLayout = lazy(() => import("@/modules/practice/PracticeLayout"));
const TestSession = lazy(
  () => import("@/modules/jobs/Diagnostic/components/TestSession")
);
const Notebook = lazy(() => import("@/modules/workbench/Notebook"));
const VideoCall = lazy(() => import("@/modules/mentor/components/VideoCall"));
const JudgeHome = lazy(() => import("@/modules/judge/screens/Home/JudgeHome"));
const TransactionResultPage = lazy(
  () => import("../components/transaction/Transaction")
);
const DashboardLayout = lazy(() => import("@/modules/help/DashboardLayout"));
const TicketPage = lazy(() => import("@/modules/help/pages/TicketPage"));

const ProtectedRoute = lazy(() => import("../routes/ProtectedRoute"));
const Login = lazy(() => import("@/modules/authentication/log-in"));
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const Scenario = lazy(
  () => import("@/modules/interview/components/scenario/Scenario")
);
const InputOTPForm = lazy(() => import("@/modules/authentication/otp-input"));
const GetEmployee = lazy(
  () => import("@/modules/blockchain/pages/GetRoutes/GetEmployee")
);
const GetOrg = lazy(
  () => import("@/modules/blockchain/pages/GetRoutes/GetOrg")
);
const SkillTaxonomy = lazy(() => import("@/modules/skill/SkillTaxonomy"));
const Asset = lazy(() => import("@/modules/asset/Asset"));
const JobPage = lazy(() => import("@/modules/jobs/components/JobPage"));
const SkillAnalysis = lazy(() => import("@/modules/skill/SkillGapAnalysis"));
const HeroV2 = lazy(() => import("@/home/HeroV2"));
const RhinoWidget = lazy(() => import("../modules/jobin/RhinoWidget"));
// const SplashScreen = lazy(() => import("../components/splash-screen"));
import { SplashScreen } from "../components/splash-screen";
const WebinarPage = lazy(
  () =>
    import("../modules/community/components/webinars/components/WebinarPage")
);
const Dock = lazy(() => import("@/components/app-wide/Dock.jsx"));
import DockContext from "../context/DockContext";
import { FloatingChatSupport } from "@/components/chatbot/FloatingChatSupport";
// const FloatingChatSupport = lazy(
//   () => import("@/components/chatbot/FloatingChatSupport")
// );
const Certify = lazy(() => import("../modules/certify/Certify"));
const VerifyRecord = lazy(
  () => import("../modules/certify/pages/Verify/components/VerifyRecord")
);
const EmployeePage = lazy(
  () => import("@/modules/blockchain/pages/Employee/Employee")
);
const UpdateProfile = lazy(
  () => import("@/modules/blockchain/pages/Employee/UpdateProfile")
);
const NotificationsEmployee = lazy(
  () => import("@/modules/blockchain/pages/Employee/Notifications")
);
const NoRole = lazy(() => import("@/modules/blockchain/pages/NoRole/NoRole"));
const Notifications = lazy(
  () => import("@/modules/blockchain/pages/NoRole/Notifications")
);
const AllEmployees = lazy(
  () => import("@/modules/blockchain/pages/Admin/AllEmployees")
);
const AllOrganizationEndorser = lazy(
  () => import("@/modules/blockchain/pages/Admin/AllOrganizationEndorser")
);
const NotificationsAdmin = lazy(
  () => import("@/modules/blockchain/pages/Admin/Notifications")
);
const AdminPageCreate = lazy(
  () => import("@/modules/blockchain/pages/Admin/CreateUser")
);
const Organization = lazy(
  () => import("@/modules/blockchain/pages/OrganizationEndorser/Organization")
);
const EndorseSkill = lazy(
  () => import("@/modules/blockchain/pages/OrganizationEndorser/EndorseSkill")
);
const Endorse = lazy(
  () => import("@/modules/blockchain/pages/OrganizationEndorser/EndorseSection")
);
const NotificationsOrg = lazy(
  () => import("@/modules/blockchain/pages/OrganizationEndorser/Notifications")
);
const ExplorePathways = lazy(
  () => import("@/modules/pathways/course/ExplorePathways")
);
import Web3 from "web3";
import strings from "../i18n";
const Admin = lazy(() => import("@/modules/blockchain/abis/Admin.json"));
import { toast } from "react-toastify";
import { useEffect } from "react";
import SettingLayout from "../modules/settings/SettingLayout";
import Psychometric from "../modules/competency/Psychometric";
import Skills from "../modules/asset/pages/Skills";
import PathwayPage from "../modules/pathways/PathwayPage";
import ContributeLayout from "../modules/contribute/Layout";
import { useSDK } from "@metamask/sdk-react";
import React, { useCallback, useRef } from "react";
import { BuiltInKeyword } from "@picovoice/porcupine-web";
import { usePorcupine } from "@picovoice/porcupine-react";
import porcupineModel from "@/modules/jobin/lib/porcupineModel";
import porcupineKeywords from "@/modules/jobin/lib/porcupineKeywords";
import { Button } from "@/components/ui/button";
import GraphFlow from "@/modules/graphflow/GraphFlow";
const ACCESS_KEY = import.meta.env.VITE_PICOVOICE_ACCESS_KEY;

if (
  porcupineKeywords.length === 0 &&
  porcupineModel.publicPath.endsWith("porcupine_params_hi.pv")
) {
  for (const k in BuiltInKeyword) {
    // @ts-ignore
    porcupineKeywords.push({ builtin: k });
  }
}

const AppRoutes = () => {
  const { isSessionExpired, setIsSessionExpired } = useSessionManager();
  const [isMeta, setisMeta] = useState(false);
  const [isEmployee, setisEmployee] = useState(false);
  const [isOrganizationEndorser, setisOrganizationEndorser] = useState(false);
  const [isOwner, setisOwner] = useState(false);
  const [loadcomp, setloadcomp] = useState(false);
  const { dockContext } = useContext(DockContext);
  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [keywordDetections, setKeywordDetections] = useState([]);
  const [keyword, setKeyword] = useState(porcupineKeywords[0]);

  const accessKeyRef = useRef(ACCESS_KEY);

  const {
    keywordDetection,
    isLoaded,
    isListening,
    error,
    init,
    start,
    stop,
    release,
  } = usePorcupine();

  const initEngine = useCallback(async () => {
    if (accessKeyRef.current.length === 0) {
      return;
    }

    await init(accessKeyRef.current, [keyword], porcupineModel);
  }, [init, keyword]);

  const setSelectedKeyword = (e) => {
    const selected = e.target.value;
    for (const k of porcupineKeywords) {
      if (k.label === selected || k.builtin === selected) {
        setKeyword(k);
        return;
      }
    }
  };

  useEffect(() => {
    const changeKeyword = async () => {
      await release();
      await initEngine();
      await start();
    };

    changeKeyword();
  }, [initEngine, release]);

  useEffect(() => {
    if (keywordDetection !== null) {
      setKeywordDetections((oldVal) => [...oldVal, keywordDetection.label]);
      () => launchKaushal();
    }
  }, [keywordDetection]);

  const loadBlockChainData = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }

    const networkId = chainId;
    const AdminData = Admin.networks[networkId];
    if (AdminData) {
      const admin = new sdk.eth.Contract(Admin.abi, AdminData.address);
      const isEmployee = admin.methods.isEmployee(account[0]).call();
      const isOrganizationEndorser = admin.methods
        .isOrganizationEndorser(account[0])
        .call();
      const owner = admin.methods.owner().call();
      setisEmployee(isEmployee);
      setisOrganizationEndorser(isOrganizationEndorser);
      setisOwner(owner === account[0]);
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
  };

  useEffect(() => {
    const func = async () => {
      setisMeta(true);
      setloadcomp(true);
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new Web3(window.ethereum);
        await loadBlockChainData();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        await loadBlockChainData();
      } else {
        setisMeta(false);
      }
      setloadcomp(false);
    };
    func();
  }, []);

  const toggleLanguage = () => {
    strings.setLanguage(strings.getLanguage() === "en" ? "pa" : "en");
  };

  const launchKaushal = () => {
    return <FloatingChatSupport />;
  };

  return (
    <BrowserRouter>
      <SessionExpiryPopup
        show={isSessionExpired}
        onClose={() => setIsSessionExpired(false)}
        message={
          isSessionExpired
            ? "Please log in again to continue using the app."
            : "You do not have access to this resource."
        }
      />
      <SettingsProvider>
        <AnimateR>
          <Suspense fallback={<SplashScreen />}>
            {" "}
            <Routes>
              <Route path="/" element={<HeroV2 />} />
              <Route
                path="/log-in"
                element={
                  <GoogleOAuthProvider clientId={"SDS"}>
                    <Login />
                  </GoogleOAuthProvider>
                }
              />{" "}
              <Route
                path="/sign-up"
                element={
                  <GoogleOAuthProvider
                    clientId={
                      "18778878240-e4a51gclug69terlnlib92jddu5s84gg.apps.googleusercontent.com"
                    }
                  >
                    <SignUp />
                  </GoogleOAuthProvider>
                }
              />
              <Route path="/verify" element={<InputOTPForm />} />
              <Route
                path="/flow"
                element={
                  <FlowLayout>
                    <Flow />
                  </FlowLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/community" element={<Community />} />
              <Route
                path="/jobs/:jobId"
                element={
                  <ProtectedRoute>
                    <JobPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/interviews/track"
                element={<ProtectedRoute></ProtectedRoute>}
              />
              <Route
                path="/dashboard/next-step"
                element={
                  <ProtectedRoute>
                    <NextBestStepWidget />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mentor"
                element={
                  <ProtectedRoute>
                    <Mentor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/diagnostic"
                element={<ProtectedRoute></ProtectedRoute>}
              />
              {/* <Route path="/dash" element={<DashbaordSidebar />} /> */}
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<SplashScreen />}>
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/taxonomy"
                element={
                  <ProtectedRoute>
                    <SkillTaxonomy />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course/:id/learn/graph-flow"
                element={
                  <ProtectedRoute>
                    <GraphFlow />
                  </ProtectedRoute>
                }
              />
              <Route path="/skill-analysis" element={<SkillAnalysis />}></Route>
              <Route
                path="/mock"
                element={
                  <ProtectedRoute>
                    <InterviewPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/pathways" element={<PathwayPage />}></Route>
              <Route path="/event/:id" element={<WebinarPage />}></Route>
              {/* <Route
        path="/resume/build"
        element={<ResumeLatexBuilder />}
      /> */}
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/notebook" element={<Notebook />} />
              <Route path="/jobs" element={<JobsPageLayout />} />
              <Route
                path="/dashboard/cc"
                element={
                  <ProtectedRoute>
                    <CreateCourseLayout>
                      <CreateCourse />
                    </CreateCourseLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/cc/:courseId"
                element={
                  <ProtectedRoute>
                    <CourseLayout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <ExplorePathways />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/dashboard/cc/:courseId/:chapterId/:sectionId"
                element={
                  <ProtectedRoute>
                    <SectionLayout />
                  </ProtectedRoute>
                }
              /> */}
              <Route path="/chatsupport" element={<FloatingChatSupport />} />
              <Route path="/help" element={<DashboardLayout />} />
              <Route path="/asset" element={<Asset />} />
              <Route path="/help/ticket/:id" element={<TicketPage />} />
              <Route path="/judge/home" element={<JudgeHome />} />
              <Route
                path="/judge/playground/:folderId/:playgroundId"
                element={<Playground />}
              />
              <Route path="/mentor/connect" element={<VideoCall />} />
              {/* <Route path="/jobrec" element={<MentorProfile />} /> */}
              <Route
                path="/competency/:competencyId"
                element={<TestSession />}
              />
              {/* <Route path="/graph" element={<ChatApp />} /> */}
              <Route path="/practice" element={<PracticeLayout />} />
              <Route path="/embed" element={<VizSearchEmbed />} />
              {/* <Route path="/dasho" element={<HomePage />} /> */}
              <Route
                path="/practice/editor/:roomId"
                element={<EditorPageLayout />}
              />
              <Route
                path="/course/:courseId"
                element={
                  <ProtectedRoute>
                    <Course />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course/:courseId/learn"
                element={
                  <ProtectedRoute>
                    <Learn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scenario"
                element={
                  <ProtectedRoute>
                    <Scenario />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume"
                element={
                  <ProtectedRoute>
                    <Resume />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/graph/*" element={<GraphComponent />} /> */}
              <Route
                path="/interview"
                element={
                  <ProtectedRoute>
                    <Interview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/setting"
                element={
                  <ProtectedRoute>
                    <SettingLayout />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/dash" element={<Page />} /> */}
              <Route
                path="/interview/:interviewId/feedback"
                element={<InterviewFeedback />}
              />
              <Route path="/certify" element={<Certify />} />
              <Route path="/voice" element={<VoiceWidget />} />
              <Route path="/intent" element={<RhinoWidget />} />
              <Route path="/nextsteps" element={<NextBestSteps />} />
              <Route
                path="/cancel"
                element={<TransactionResultPage transactionSuccess={false} />}
              />
              {/* <Route path="/judge" element={<JudgeHome />} /> */}
              <Route path="/about" element={<LandingPage />} />
              <Route
                path="/judge/playground/:folderId/:playgroundId"
                element={<Playground />}
              />
              <Route path="/certify/:cid" element={<VerifyRecord />} />
              <Route
                path="/getemployee/:employee_address"
                element={<GetEmployee />}
              />
              <Route path="/getOrg/:orgAddress" element={<GetOrg />} />
              <Route path="/employee" element={<EmployeePage />} />
              <Route
                path="/employee/update-profile"
                element={<UpdateProfile />}
              />
              <Route
                path="/employee/notifications"
                element={<NotificationsEmployee />}
              />
              <Route path="/no-role" element={<NoRole />} />
              <Route
                path="/no-role/notifications"
                element={<Notifications />}
              />
              <Route path="/admin" element={<AllEmployees />} />
              <Route
                path="/admin/all-organization-endorser"
                element={<AllOrganizationEndorser />}
              />
              <Route path="/admin/create-user" element={<AdminPageCreate />} />
              <Route
                path="/admin/notifications"
                element={<NotificationsAdmin />}
              />
              <Route path="/organization" element={<Organization />} />
              <Route
                path="/organization/endorse-skill"
                element={<EndorseSkill />}
              />
              <Route
                path="/organization/endorse-section"
                element={<Endorse />}
              />
              <Route
                path="/organization/notifications"
                element={<NotificationsOrg />}
              />
              <Route path="/asset/skills" element={<Skills />} />
              <Route path="/psychometric/:id" element={<Psychometric />} />
              <Route path="/contribute" element={<ContributeLayout />} />
              <Route path="*" element={<Error />} />
            </Routes>
            {dockContext?.title === "nSteps" && <NextBestStepWidget />}
            {dockContext?.title === "Kaushal" && launchKaushal()}
            {dockContext?.title === "Language" && toggleLanguage()}
            <Dock />
          </Suspense>
        </AnimateR>
      </SettingsProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
