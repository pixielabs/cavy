const baseURL = 'https://employee-directory-services.herokuapp.com/employees';

export let findAll = () => fetch(baseURL)
  .then((response) => response.json());

export let findByName = (name) => fetch(`${baseURL}?name=${name}`)
  .then((response) => response.json());

export let findById = (id) => fetch(`${baseURL}/${id}`)
  .then((response) => response.json());
