import { message } from "antd";
import React, { useState } from "react";
import { kyp } from "../utils/kyp";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [userID, setuserID] = useState('');

  const fetchContext = async () => {
    try {
      const res = await kyp.get('auth').json();
      setuserID(res.userID || '');
      return true;
    } catch (e) {}
    return false;
  }

  const clearContext = async () => {
    try {
      await kyp.delete("auth");
      setuserID('');
      message.info("ออกจากระบบสำเร็จ")
      return true;
    } catch (e) {
      message.error("ไม่สามารถออกจากระบบได้ กรุณาลองใหม่อีกครั้ง");
    }
    return false;
  }

  return (
    <AuthContext.Provider value={{userID, setuserID, fetchContext, clearContext}}>
      {children}
    </AuthContext.Provider>
  );
}
