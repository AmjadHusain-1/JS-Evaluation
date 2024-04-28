
async function fetchEmployees() {
    try {

        const response = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees")
        if (!response.ok) {
            throw new Error('Failed to fetch employee data');
        }
        const data = await response.json();
        return data;


    } catch (error) {
        console.error("Error fetching employee data".error);
        return []
    }

}










function renderEmployees(data) {
    const tableBody = document.getElementById("employeeList");
    tableBody.innerHTML = " ";

    data.forEach((employee, index) => {
        const row = tableBody.innerHTML();
        row.innerHTML = `
        
        <td>${index + 1}</td>
        <td>${employee.name}</td>
        <td>${employee.gender}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        
        `;
    })

}


function filterByDepartment(data, department) {
    return department ? data.filter(employee => employee.department === department) : data;

}

function sortBySalary(data, criteria) {
    if (criteria === "asc") {
        return data.slice().sort((a, b) => a.salary - b.salary)
    } else {
        return data.slice().sort((a, b) => b.salary - a.salary)
    }

}


function paginateData(data, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return data.slice(startIndex, endIndex);

}

function renderPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = " ";


    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerHTML = i;
        if (i === currentPage) {
            button.disabled = true;
        }

        button.addEventListener("click", async () => {
            const employees = await fetchEmployees();
            const department = document.getElementById("departmentFilter").value;
            const gender = document.getElementById("genderFilter").value;
            const sortCriteria = document.getElementById("sortCriteria").value;

            let filteredData = filterByDepartment(employees, department);
            filteredData = filterByGender(filteredData, gender);

            const sortedData = sortBySalary(filteredData, sortCriteria);
            renderEmployees(paginateData(sortedData, i, 10));
            renderPagination(Math.ceil(sortedData.length / 10), i);

        });

        paginationContainer.appendChild(button);

    }

}




async function init() {
    const employees = await fetchEmployees();
    renderEmployees(paginateData(employees, 1, 10));
    renderPagination(Math.ceil(employees.length / 10), 1);

}

document.getElementById("departmentFilter").addEventListener("change", async () => {
    const employees = await fetchEmployees();
    const gender = document.getElementById("genderFilter").value;
    const sortCriteria = document.getElementById("sortCriteria").value;

    let filteredData = filterByDepartment(employees, document.getElementById("departmentFilter").value);
    filteredData = filterByGender(filteredData, gender);
    const sortedData = sortBySalary(filteredData, sortCriteria);
    renderEmployees(paginateData(sortedData, 1, 10));
    renderPagination(Math.ceil(sortedData.length / 10), 1);

});



document.getElementById("genderFilter").addEventListener("change", async () => {
    const employees = await fetchEmployees();
    const gender = document.getElementById("departmentFilter").value;
    const sortCriteria = document.getElementById("sortCriteria").value;

    let filteredData = filterByDepartment(employees, department);
    filteredData = filterByGender(filteredData, document.getElementById("genderFilter").value);
    const sortedData = sortBySalary(filteredData, sortCriteria);
    renderEmployees(paginateData(sortedData, 1, 10));
    renderPagination(Math.ceil(sortedData.length / 10), 1);

});



document.getElementById("sortCriteria").addEventListener("change", async () => {
    const employees = await fetchEmployees();
    const department = document.getElementById("departmentFilter").value
    const gender = document.getElementById("genderFilter").value;
    const sortCriteria = document.getElementById("sortCriteria").value

    let filteredData = filterByDepartment(employees, department);
    filteredData = filterByGender(filteredData, gender);
    const sortedData = sortBySalary(filteredData, sortCriteria);
    renderEmployees(paginateData(sortedData, 1, 10));
    renderPagination(Math.ceil(sortedData.length / 10), 1);

});


init()