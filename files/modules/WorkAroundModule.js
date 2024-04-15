import { getDataByRole, getDataByCompany } from "./salaryData.js";
import salaryData from "./salaryData.js";

const getAverageSalaryByRole = (role) => {
  const roleData = getDataByRole(role);
  const salariesOfRole = roleData.map((obj) => obj.salary);
  return calculateAverage(salariesOfRole);
};

const getAverageSalaryByCompany = (company) => {
  const companyData = getDataByCompany(company);
  const salariesAtCompany = companyData.map((obj) => obj.salary);
  return calculateAverage(salariesAtCompany);
};

const getSalaryAtCompany = (role, company) => {
  const companyData = getDataByCompany(company);
  const roleAtCompany = companyData.find((obj) => obj.role === role);
  return roleAtCompany.salary;
};

const getIndustryAverageSalary = () => {
  const allSalaries = salaryData.map((obj) => obj.salary);
  return calculateAverage(allSalaries);
};

function calculateAverage(arrayOfNumbers) {
  let total = 0;
  arrayOfNumbers.forEach((number) => (total += number));
  return (total / arrayOfNumbers.length).toFixed(2);
}

export {
  getAverageSalaryByRole,
  getSalaryAtCompany,
  getIndustryAverageSalary,
  getAverageSalaryByCompany,
};