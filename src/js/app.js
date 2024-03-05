


const drugs = JSON.parse(localStorage.getItem("drugs")) || [];
const saveData = (data) => { 
  localStorage.setItem("drugs", JSON.stringify(data));
};

const pharmaForm = document.querySelector(".form-pharmaForm");
const productName = document.querySelector(".product-name");
const manufacturer = document.querySelector(".manufacturer");
const dateInput = document.querySelector(".date-input");
const quantity = document.querySelector(".quantity");
const submitButton = document.querySelector(".submit-button");
const drugsHeader = document.querySelector(".drugs-header");
const drugsUl = document.querySelector(".drugs-list");
const showAllButton = document.querySelector(".showAll-button");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");




const nameError = document.querySelector(".name-error");
const manufacturerError = document.querySelector(".manufacturer-error");
const dateError = document.querySelector(".date-error");
const quantityError = document.querySelector(".quantity-error");


const validateDrugForm = (productNameInput, manufacturerInput, dateInput, quantityInput) => {
  let errors = {
      errorStatus: false,
      nameError: "",
      manufacturerError: "",
      dateError: "",
      quantityError: "",
  };
     


  if (!productNameInput.trim()) {
      errors.errorStatus = true;
      errors.nameError = "Product name is required ⚠️";
      nameError.textContent = errors.nameError;
      nameError.style.visibility = "visible";
  } else {
      nameError.style.visibility = "hidden";
  }

  if (!manufacturerInput.trim()) {
      errors.errorStatus = true;
      errors.manufacturerError = "Manufacturer is required ⚠️";
      manufacturerError.textContent = errors.manufacturerError;
      manufacturerError.style.visibility = "visible";
  } else {
      manufacturerError.style.visibility = "hidden";
  }

  if (!dateInput.trim()) {
      errors.errorStatus = true;
      errors.dateError = "Date is required ⚠️";
      dateError.textContent = errors.dateError;
      dateError.style.visibility = "visible";
  } else {
      dateError.style.visibility = "hidden";
  }

  if (!quantityInput.trim()) {
      errors.errorStatus = true;
      errors.quantityError = "Quantity is required ⚠️";
      quantityError.textContent = errors.quantityError;
      quantityError.style.visibility = "visible";
  } else {
      quantityError.style.visibility = "hidden";
  }

  return errors.errorStatus;
};




//------------------------------------------------------------


class Drug {
  constructor(productName, manufacturer, dateInput, quantity) {
    this.productName = productName;
    this.manufacturer = manufacturer;
    this.dateInput = dateInput;
    this.quantity = parseInt(quantity, 10); 

    this.productId = productName  + manufacturer; 
    this.ID = Date.now().toString();
  }

  static addDrug(newDrug) {
    const existingDrugIndex = drugs.findIndex(drug => 
      drug.productName === newDrug.productName && 
      drug.manufacturer === newDrug.manufacturer);

    if (existingDrugIndex !== -1) {
     
      drugs[existingDrugIndex].quantity += newDrug.quantity;
    } else {
      drugs.push(newDrug);
    }

    saveData(drugs);
    UI.renderDrugs(drugs);
  }

  static deleteDrug(id) {
    const index = drugs.findIndex(drug => drug.ID === id);
    if (index !== -1) {
      drugs.splice(index, 1);
      saveData(drugs);
      UI.renderDrugs(drugs);
    }      
  }
}




class UI {
  static renderDrugs(drugsToDisplay) {
    drugsUl.innerText = "";
    drugsToDisplay.forEach((drug) => {
      const li = document.createElement("li");
      const renderProductName = document.createElement("span");
      const renderManufacturer = document.createElement("span");
      const renderQuantity = document.createElement("span");
      const renderDate = document.createElement("span");
      const renderID = document.createElement("span");
      const deleteButton = document.createElement("button");
      const editButton = document.createElement("button");
      
      renderProductName.textContent = `${drug.productName}`;
      renderManufacturer.textContent = `${drug.manufacturer}`;
      renderDate.textContent = `${drug.dateInput}`;
      renderQuantity.textContent = `${drug.quantity}`;
      renderID.textContent =  `${drug.ID}`;
      deleteButton.textContent = "Delete";
      editButton.textContent = "Edit";
      
      li.appendChild(renderProductName);
      li.appendChild(renderManufacturer);
   
      li.appendChild(renderQuantity);
      li.appendChild(renderDate);
      li.appendChild(renderID);
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      drugsUl.appendChild(li);

      renderProductName.classList.add ("render-product-name");
      renderManufacturer.classList.add( "render-manufacturer");
      renderDate.classList.add("render-data");
      renderID.classList.add ("render-id");
      deleteButton.classList.add("delete-button");
      editButton.classList.add("edit-button");

      deleteButton.addEventListener("click", () => Drug.deleteDrug(drug.ID));
      // editButton.addEventListener("click", () => Drug.editDrug(drug.ID));
    });
  }
}


//--------------------------------------------------------------


pharmaForm.addEventListener("submit", function(e) {
  e.preventDefault();


  if (!validateDrugForm(productName.value, manufacturer.value, dateInput.value, quantity.value)) {
      const newDrug = new Drug(productName.value, manufacturer.value, dateInput.value, quantity.value);
     
      Drug.addDrug(newDrug);
      UI.renderDrugs(drugs);
     
      pharmaForm.reset();
  }
});





searchButton.addEventListener("click", () => {
  const search = searchInput.value.toLowerCase();
  const filteredDrugs = drugs.filter(drug => 
    drug.productName.toLowerCase().includes(search) ||
    drug.manufacturer.toLowerCase().includes(search)
  );
  UI.renderDrugs(filteredDrugs);     
});

showAllButton.addEventListener("click", () => {
  UI.renderDrugs(drugs);
});


UI.renderDrugs(drugs);





