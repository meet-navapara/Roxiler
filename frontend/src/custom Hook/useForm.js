
import { useState } from 'react';

let useForm = (initialState) => {
  let [formData, setFormData] = useState(initialState);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return {
    formData,
    handleChange,
  
  };
};

export default useForm;