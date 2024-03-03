

const drugs = JSON.parse(localStorage.getItem("drugs")) || [];
const saveData = (data) => { 
localStorage.setItems("drugs", JSON.stringify(data));
};

const pharmaForm = document.querySelector(".form-pharmaForm");
const productName = document.querySelector(".product-name");
const productId = document.querySelector(".product-id");
const manufacturer = document.querySelector(".manufacturer");
const dateInput = document.querySelector(".date-input");
const quantity  = document.querySelector(".quantity");
const submitButton = document.querySelector(".submit-button");
const drugsHeader = document.querySelector(".drugs-header");
const drugsUl = document.querySelector(".drugs-list");


class drug {
constructor(pharmaForm, productName, productId, manufacturer, dateInput, quantity) {
    this.pharmaForm = pharmaForm;
    this.productName = productName;
    this.productId = productId;
    this.manufacturer = manufacturer;
    this.dataInput = dateInput;
    this.quantity = quantity;

  }

  static addDrug (drug){
       drugs.push(drug);
       saveData(drugs);
       UI.renderDrugs(drugs);

  }

  static deletDrug (id){
     const index = drugs.findIndex(drug => drug.Id === id)
        if (index !== -1) {
           drugs.splice(index, 1);
           saveData (drugs);
           UI.renderDrugs(drugs);
         }      
     }
         
   static editDrug(id) {
      const drug = drugs.find(drug => drug.ID === id);
      if(drug){
        document.querySelector("editproductName").value = drug.ProductName;
        document.querySelector("editproductId").value = drug.ProductId;
        document.querySelector("editmanufacturer").value = drug.manufacturer; 
        document.querySelector("editDataInput").value = drug.dataInput;
        document.querySelector("editQantety").value = drug.quantity;
       

      }
   }   
}

//----------------------------------------------------------------------------


class UI {
    static renderDrugs (drugsToDisplay){
        drugsUl.innerText =" ";
        

        drugsToDisplay.forEach ((drug) => {
            const li  = document.createElement("li")
            const renderProductName = document.createElement("span");
            const renderManufacturer = document.createElement("span");
            const renderProductId = document.createElement ("span");
            const renderQantety = document.createElement("span");
            const renderDate = document.createElement ("span");
            const deleteButton = document.createElement ("button");
            const editButton = document.createElement("button");
            
            
            
            li.appendChild(renderProductName);
            li.appendChild(renderManufacturer);
            li.appendChild(renderProductId);
            li.appendChild(renderQantety);
            li.appendChild(renderDate);
            li.appendChild(deleteButton);
            li.appendChild(editButton);
            drugsUl.appendChild(li);




            renderProductName.textContent = drug.productName;
            renderManufacturer = drug.manufacturer;
            renderProductId = drug.productId;
            renderDate = drug.dataInput;
            renderQantety = drug.quantity;
            deleteButton =  "x" ;
            editButton = "info";
            

            deleteButton.addEventListener("click", () => drug.deleteButton(drug.Id));
            editButton.addEventListener("click", () => drug.editButton(drug.Id));
        });
    }
}


          
//----------------------------------------------------------------------------

