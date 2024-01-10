import { createContext, useState } from "react";

export let context = createContext(0)

function ContextProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);
    const [name, setname] = useState("");
    const [showPass, setShowPass] = useState(true);
    const [navigateHome, setNavigateHome] = useState(false);
    const [errorList, setErrorList] = useState([]);

    return (
        <context.Provider value={{
            products,
            setProducts,
            users,
            setUsers,
            errorMessage,
            setErrorMessage,
            name,
            setname,
            showPass,
            setShowPass,
            navigateHome,
            setNavigateHome,
            errorList,
            setErrorList
        }}>{children}</context.Provider>
    );
}

export default ContextProvider;