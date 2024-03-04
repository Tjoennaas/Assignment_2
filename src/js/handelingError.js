
  

const validateDrugForm = (productNameInput, manufacturerInput, dateInput, quantityInput, nameError, manufacturerError, dateError, quantityError) => {
    let errors = {
      errorStatus: false,
      nameError: "",
      manufacturerError: "",
      dateError: "",
      quantityError: "",
    };


    if (!productNameInput) {
        errors.errorStatus = true;
        errors.nameError = "Product name is required ⚠️";
        nameError.style.visibility = "visible";
        nameError.textContent = errors.nameError;
      } else {
        nameError.style.visibility = "hidden";
        nameError.textContent = "";
      }
    
      if (!manufacturerInput) {
        errors.errorStatus = true;
        errors.manufacturerError = "Manufacturer is required ⚠️";
        manufacturerError.style.visibility = "visible";
        manufacturerError.textContent = errors.manufacturerError;
      } else {
        manufacturerError.style.visibility = "hidden";
        manufacturerError.textContent = "";
      }
  

      if (!dateInput) {
        errors.errorStatus = true;
        errors.dateError = "Manufacturer is required ⚠️";
        dateError.style.visibility = "visible";
        dateError.textContent = errors.dateError;
      } else {
        dateError.style.visibility = "hidden";
        dateError.textContent = "";
      }
    

      if (!quantityInput) {
        errors.errorStatus = true;
        errors.quantityError = "Manufacturer is required ⚠️";
        quantityError.style.visibility = "visible";
        quantityError.textContent = errors.quantityError;
      } else {
        quantityError.style.visibility = "hidden";
        quantityError.textContent = "";
      }
    

      const formErrorStatus = () => {
        return errors.errorStatus;
      };
      return { errors, formErrorStatus };
    };


  export { validateDrugForm }
  