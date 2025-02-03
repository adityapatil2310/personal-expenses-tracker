import { createContext, useContext,useState } from "react";

const TrueContext=createContext();
export function TruecntextProvider({children}){
const [istrue,setIstrue]=useState(false)
    return <TrueContext.Provider value={{istrue,setIstrue}}>
        {children}
    </TrueContext.Provider>
}

export default TrueContext