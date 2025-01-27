import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Organization from "../../abis/OrganizationEndorser.json";
import Admin from "../../abis/Admin.json";
import { toast } from "react-toastify";
import OrgEndCard from "../../components/OrgEndCard";
import EmployeeCard from "../../components/EmployeeCard";
import "./GetOrg.css";
import LoadComp from "../../components/LoadComp";
import Web3 from "web3";
const GetOrg = () => {
  const [orgContractAddress, setOrgContractAddress] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loadComp, setLoadComp] = useState(false);
  const navigate = useNavigate();
  const { orgAddress } = useParams(); // Get orgAddress from the URL

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoadComp(true);
      await getEmployees();
      setLoadComp(false);
    };
    fetchEmployees();
  }, []); // Run only once when the component mounts

  const getEmployees = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = await window.ethereum.request({ method: "eth_chainId" });
    const AdminData = await Admin.networks[networkId];

    if (!orgAddress) {
      navigate("/");
      return;
    }

    if (AdminData) {
      const admin = new web3.eth.Contract(Admin.abi, AdminData.address);
      const orgContractAddress = await admin.methods
        .getOrganizationContractByAddress(orgAddress)
        .call();
      const orgContract = new web3.eth.Contract(
        Organization.abi,
        orgContractAddress
      );

      const employeeCount = await orgContract.methods.totalEmployees().call();

      const employees = await Promise.all(
        Array(parseInt(employeeCount))
          .fill()
          .map(async (_, index) => {
            const employee = await orgContract.methods
              .getEmployeeByIndex(index)
              .call();
            return admin.methods.getEmployeeContractByAddress(employee).call();
          })
      );

      setOrgContractAddress(orgContractAddress);
      setEmployees(employees);
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
  };

  return loadComp ? (
    <LoadComp />
  ) : (
    <div>
      {orgContractAddress && (
        <OrgEndCard OrgEndContractAddress={orgContractAddress} />
      )}
      <br />
      <div>
        <div style={{ width: "68%", marginLeft: "auto", marginRight: "auto" }}>
          <h2 className="org-card-heading">Employees in the organization</h2>
        </div>
        <br />
        {employees.map((employee, index) => (
          <EmployeeCard key={index} employeeContractAddress={employee} />
        ))}
      </div>
      <br />
    </div>
  );
};

export default GetOrg;
