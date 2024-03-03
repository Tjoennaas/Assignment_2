
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

class Drug {
  constructor(productName, manufacturer, dateInput, quantity) {
    this.productName = productName;
    this.manufacturer = manufacturer;
    this.dateInput = dateInput;
    this.quantity = parseInt(quantity, 10); 
  
    this.productId = productName + "-" + manufacturer; 
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
      const renderProductId = document.createElement("span");
      const renderQuantity = document.createElement("span");
      const renderDate = document.createElement("span");
      const renderID = document.createElement("span");
      const deleteButton = document.createElement("button");
      const editButton = document.createElement("button");
      
      renderProductName.textContent = `Name: ${drug.productName}`;
      renderManufacturer.textContent = `Manufacturer: ${drug.manufacturer}`;
      renderProductId.textContent = `Product ID: ${drug.productId}`;
      renderDate.textContent = `Date: ${drug.dateInput}`;
      renderQuantity.textContent = `Quantity: ${drug.quantity}`;
      renderID.textContent = `ID: ${drug.ID}`;
      deleteButton.textContent = "Delete";
      editButton.textContent = "Edit";
      
      li.appendChild(renderProductName);
      li.appendChild(renderManufacturer);
      li.appendChild(renderProductId);
      li.appendChild(renderQuantity);
      li.appendChild(renderDate);
      li.appendChild(renderID);
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      drugsUl.appendChild(li);

      deleteButton.addEventListener("click", () => Drug.deleteDrug(drug.ID));
     
    });
  }
}

pharmaForm.addEventListener("submit", (e) => {   
  e.preventDefault();
  const newDrug = new Drug(
    productName.value,
    manufacturer.value,
    dateInput.value, 
    quantity.value
  );

  Drug.addDrug(newDrug);
  pharmaForm.reset();
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
