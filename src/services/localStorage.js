import { v4 as uuidv4 } from 'uuid';

export const getProductsList = () => {
    if (!localStorage["@products"]) {
      localStorage["@products"] = "[]";
    }


    let products = localStorage["@products"];
    products = JSON.parse(products);
    return products;
  };

  export const getUsersList = () => {
    if (!localStorage["@users"]) {
      localStorage["@users"] = "[]";
    }
    let users = localStorage["@users"];
    users = JSON.parse(users);
    return users;
  };
  
  export const addProduct = (product) => {
    const products = getProductsList();
    products.push({ id: uuidv4(), ...product});
    localStorage["@products"] = JSON.stringify(products);
  
  };

  export const addUser = (user) => {
    const users = getUsersList();
    users.push({ id: uuidv4(), ...user});
    localStorage["@users"] = JSON.stringify(users);
  
  };
  
  export const deleteProduct = (id) => {
    let products = getProductsList();
    products = products.filter((product) => product.id !== id);
    localStorage["@products"] = JSON.stringify(products);
  };
  
  export const getProductById = (id) => {
    const products = getProductsList();
    const product = products.find((product) => product.id === id);
    return product;
  };

  export const getUserByEmail = (email) => {
    const users = getUsersList();
    const user = users.find((user) => user.email === email);
    return user;
  };
  
  export const editProduct = (id, newProduct) => {
    let products = getProductsList();
    products = products.filter((product) => product.id !== id);
    products.push(newProduct);
    localStorage["@products"] = JSON.stringify(products);
  };
 