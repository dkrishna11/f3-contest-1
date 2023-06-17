let employees = [];
    let employeeId = 1;
    
    const form = document.getElementById('employeeForm');
    const nameInput = document.getElementById('name');
    const professionInput = document.getElementById('profession');
    const ageInput = document.getElementById('age');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const addedEmployees = document.getElementById('addedEmployees');
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const name = nameInput.value;
      const profession = professionInput.value;
      const age = parseInt(ageInput.value);
      
      if (!name || !profession || !age) {
        errorMessage.textContent = 'Error : Please Make sure All the fields are filled before adding in an employee !';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        successMessage.style.paddingTop ="10px"
       
        return;
      }
      
      const employee = { id: employeeId++, name, profession, age };
      employees.push(employee);
      
      errorMessage.style.display = 'none';
      successMessage.textContent = 'Success : Employee Added!';
      successMessage.style.display = 'block';
      
      renderEmployees();
      
      nameInput.value = '';
      professionInput.value = '';
      ageInput.value = '';
    });
    
    function renderEmployees() {
      addedEmployees.innerHTML = '';
      
      employees.forEach(function(employee) {
        const employeeDiv = document.createElement('div');
        employeeDiv.innerHTML = `
        <p><span>${employee.id}</span> <span>Name :${employee.name}</span><span> Profession:  ${employee.profession}</span> <span>Age: ${employee.age}</span></p>
          <button class="deleteButton" data-id="${employee.id}">Delete User</button>
        `;
        employeeDiv.className="employee-details"
        addedEmployees.appendChild(employeeDiv);
      });
      
      const deleteButtons = document.getElementsByClassName('deleteButton');
      Array.from(deleteButtons).forEach(function(button) {
        button.addEventListener('click', function() {
          const id = parseInt(button.getAttribute('data-id'));
          employees = employees.filter(function(employee) {
            return employee.id !== id;
          });
          
          renderEmployees();
        });
      });
    }