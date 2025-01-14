import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const FundContext = createContext(null);

export const FundProvider = ({ children }) => {
  const [fund, setFund] = useState(0);
  const [userId, setUserId] = useState(0);
  const [depositFlag, setdepositFlag] = useState(false);
  const [autobetFlag, setAutobetFlag] = useState(false);

  const getUserInfo = async () => {
    const newUserId = new Date().getTime()
    setUserId(newUserId)
    if (newUserId) {
      let userInfo = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/game/get-userInfo`,
        {
          userId: newUserId,
        }
      );
      if (userInfo.data.balance == 0) {
        setdepositFlag(true);
      }

      setFund(userInfo.data.balance);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <FundContext.Provider
      value={{
        fund,
        setFund,
        userId,
        setUserId,
        depositFlag,
        setAutobetFlag,
        autobetFlag,
      }}
    >
      {children}
    </FundContext.Provider>
  );
};

export default FundContext;
