import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isUserAdmin, setIsUserAdmin] = useState("");
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://doctor-service-server-tau.vercel.app/users/admin/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsUserAdmin(data.isAdmin);
          setAdminLoading(false);
        });
    }
  }, [email]);
  return [isUserAdmin, adminLoading];
};
export default useAdmin;
