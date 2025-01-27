import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { NetworkStatusProvider } from "./context/NetworkStatusContext";
import NetworkStatusHandler from "./helpers/NetworkStatusHandler";
import ModalProvider from "@/modules/judge/context/ModalContext";
import PlaygroundProvider from "@/modules/judge/context/PlaygroundContext";
import { LanguageProvider } from "@/components/language-provider";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { ThemeProvider } from "@/components/theme-provider";

import DockContext from "./context/DockContext";
import { Toaster } from "sonner";
import { SettingsProvider } from "./context/Setting";

import AppRoutes from "./routes/Routes";

// import { HomePage } from "./resume/src/pages/home/page";
// import JudgeHome from "./judge/screens/Home";

// function App() {
//   const [isMeta, setisMeta] = useState(false);
//   const [isEmployee, setisEmployee] = useState(false);
//   const [account, setaccount] = useState("");
//   const [isOrganizationEndorser, setisOrganizationEndorser] = useState(false);
//   const [isOwner, setisOwner] = useState(false);
//   const [loadcomp, setloadcomp] = useState(false);

//   const loadBlockChainData = async () => {
//     const web3 = new Web3(window.ethereum);;
//     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//     // console.log(accounts);
//     if (accounts) {
//       setaccount(accounts[0]);
//     }
//      const networkId = await window.ethereum.request({ method: "eth_chainId" });;
//     console.log(networkId);
//     const AdminData = await Admin.networks[networkId];
//     console.log(AdminData);
//     if (AdminData) {
//       const admin = new web3.eth.Contract(Admin.abi, AdminData.address);
//       const isEmployee = await admin.methods.isEmployee(accounts[0]).call();
//       const isOrganizationEndorser = await admin.methods
//         .isOrganizationEndorser(accounts[0])
//         .call();
//       const owner = await admin.methods.owner().call();
//       console.log(owner);
//       setisEmployee(isEmployee);
//       setisOrganizationEndorser(isOrganizationEndorser);
//       setisOwner(owner === accounts[0]);
//     } else {
//       toast.error("The Admin Contract does not exist on this network!");
//     }
//   };

//   useEffect(() => {
//     const func = async () => {
//       setisMeta(true);
//       setloadcomp(true);
//       if (window.ethereum) {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         window.web3 = new Web3(window.ethereum);
//         await loadBlockChainData();
//       } else if (window.web3) {
//         window.web3 = new Web3(window.web3.currentProvider);
//         await loadBlockChainData();
//       } else {
//         setisMeta(false);
//       }
//       setloadcomp(false);
//     };
//     func();
//   }, []);

//   const adminRoutes = () => (
//     <Routes>
//       <Route path="/" element={<AllEmployees />} />
//       <Route
//         path="/all-organization-endorser"
//         element={<AllOrganizationEndorser />}
//       />
//       <Route path="/create-user" element={<AdminPageCreate />} />
//       <Route path="/notifications" element={<NotificationsAdmin />} />
//     </Routes>
//   );

//   const employeeRoutes = () => (
//     <Routes>
//       <Route path="/" element={<EmployeePage />} />
//       <Route path="/update-profile" element={<UpdateProfile />} />
//       <Route path="/notifications" element={<NotificationsEmployee />} />
//     </Routes>
//   );

//   const isOrganizationEndorserRoutes = () => (
//     <Routes>
//       <Route path="/" element={<Organization />} />
//       <Route path="/endorse-skill" element={<EndorseSkill />} />
//       <Route path="/endorse-section" element={<Endorse />} />
//       <Route path="/notifications" element={<NotificationsOrg />} />
//     </Routes>
//   );

//   const noRoleRoutes = () => (
//     <Routes>
//       <Route path="/" element={<NoRole />} />
//       <Route path="/notifications" element={<Notifications />} />
//     </Routes>
//   );

//   const renderRoutes = () => {
//     if (isOwner) return adminRoutes();
//     else if (isEmployee) return employeeRoutes();
//     else if (isOrganizationEndorser) return isOrganizationEndorserRoutes();
//     else return noRoleRoutes();
//   };

//   return (
//     <div>
//       {loadcomp ? (
//         <LoadComp />
//       ) : isMeta && account !== "" ? (
//         <BrowserRouter>
//           <Navbar />
//           <Container>
//             <ToastContainer />
//             <Routes>
//               {/* Common Routes */}
//               <Route
//                 path="/getemployee/:employee_address"
//                 element={<GetEmployee />}
//               />
//               <Route path="/getOrg/:orgAddress" element={<GetOrg />} />
//               {/* Admin Routes */}
//               {isOwner && (
//                 <>
//                   <Route path="/" element={<AllEmployees />} />
//                   <Route
//                     path="/all-organization-endorser"
//                     element={<AllOrganizationEndorser />}
//                   />
//                   <Route path="/create-user" element={<AdminPageCreate />} />
//                   <Route
//                     path="/notifications"
//                     element={<NotificationsAdmin />}
//                   />
//                 </>
//               )}
//               {/* Employee Routes */}
//               {isEmployee && (
//                 <>
//                   <Route path="/" element={<EmployeePage />} />
//                   <Route path="/update-profile" element={<UpdateProfile />} />
//                   <Route
//                     path="/notifications"
//                     element={<NotificationsEmployee />}
//                   />
//                 </>
//               )}
//               {/* Organization Endorser Routes */}
//               {isOrganizationEndorser && (
//                 <>
//                   <Route path="/" element={<Organization />} />
//                   <Route path="/endorse-skill" element={<EndorseSkill />} />
//                   <Route path="/endorse-section" element={<Endorse />} />
//                   <Route path="/notifications" element={<NotificationsOrg />} />
//                 </>
//               )}
//               D{/* No Role Routes */}
//               {!isOwner && !isEmployee && !isOrganizationEndorser && (
//                 <>
//                   <Route path="/" element={<NoRole />} />
//                   <Route path="/notifications" element={<Notifications />} />
//                 </>
//               )}
//             </Routes>
//           </Container>
//         </BrowserRouter>
//       ) : (
//         <MetaMaskGuide />
//       )}
//     </div>
//   );
// }

function App() {
  const [dockContext, setDockContext] = useState();
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <LanguageProvider defaultLanguage="en" storageKey="vite-ui-language">
        <MetaMaskProvider
          sdkOptions={{
            dappMetadata: {
              name: "CareerPlus",
              url: window.location.href,
            },
            infuraAPIKey: import.meta.env.INFURA_API_KEY,
          }}
        >
          <NetworkStatusProvider>
            <Toaster position="top-right" richColors />
            <NetworkStatusHandler />
            <div className="App relative">
              <PlaygroundProvider>
                <ModalProvider>
                  <DockContext.Provider value={{ dockContext, setDockContext }}>
                    <SettingsProvider>
                      <AppRoutes />
                    </SettingsProvider>
                  </DockContext.Provider>
                </ModalProvider>
              </PlaygroundProvider>
            </div>
          </NetworkStatusProvider>
        </MetaMaskProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
