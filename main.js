import { getCompanies, getRoles } from "./modules/salaryData.js";
import {
  getAverageSalaryByRole,
  getSalaryAtCompany,
  getIndustryAverageSalary,
  getAverageSalaryByCompany,
} from "./modules/workAroundModule.js";
import formatNumbers from './modules/utilities.js';

// Query DOM elements once
const mainElement = document.querySelector("main");
const salarySelectedElement = document.getElementById("salarySelected");
const salaryAverageByRoleElement = document.getElementById("salaryAverageByRole");
const salaryAverageByCompanyElement = document.getElementById("salaryAverageByCompany");
const salaryAverageIndustryElement = document.getElementById("salaryAverageIndustry");

// Initialize input buttons
const companies = getCompanies();
const roles = getRoles();
renderInputButtons(companies, "company");
renderInputButtons(roles, "role");

// Event delegation for input buttons
mainElement.addEventListener("click", function(event) {
  if (event.target.matches("input[type='radio']")) {
    updateResults();
  }
});

function renderInputButtons(labels, groupName) {
  const container = document.createElement("section");
  container.id = `${groupName}Inputs`;

  const header = document.createElement("h3");
  header.innerText = `Select a ${groupName}`;
  container.appendChild(header);

  labels.forEach(label => {
    const divElement = document.createElement("div");
    divElement.classList.add("option");

    const inputElement = document.createElement("input");
    inputElement.type = "radio";
    inputElement.name = groupName;
    inputElement.value = label;
    divElement.appendChild(inputElement);

    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", label);
    labelElement.innerText = label;
    divElement.appendChild(labelElement);

    container.appendChild(divElement);
  });

  mainElement.prepend(container);
}

function updateResults() {
  const company = document.querySelector("input[name='company']:checked")?.value;
  const role = document.querySelector("input[name='role']:checked")?.value;

  if (!company || !role) {
    return;
  }

  const averageSalaryByRole = formatNumbers(getAverageSalaryByRole(role));
  const averageSalaryByCompany = formatNumbers(getAverageSalaryByCompany(company));
  const salary = formatNumbers(getSalaryAtCompany(role, company));
  const industryAverageSalary = formatNumbers(getIndustryAverageSalary());

  salarySelectedElement.innerText = `The salary for ${role}s at ${company} is \$${salary}`;
  salaryAverageByRoleElement.innerText = `The industry average salary for ${role} positions is \$${averageSalaryByRole}`;
  salaryAverageByCompanyElement.innerText = `The average salary at ${company} is \$${averageSalaryByCompany}`;
  salaryAverageIndustryElement.innerText = `The average salary in the Tech industry is \$${industryAverageSalary}`;
}
