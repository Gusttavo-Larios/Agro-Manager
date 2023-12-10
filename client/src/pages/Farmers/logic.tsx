import { useEffect, useState } from "react";

import { router } from "@/router";
import {
  FarmerEndpoint,
  FarmerGetAllReturnType,
} from "@/service/farmer.endpoint";

export function useLogic() {
  const [farmes, setFarmer] = useState<FarmerGetAllReturnType | null>(null);
  //   const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAll();
  }, []);

  async function getAll(page?: number) {
    try {
      const farmers = await FarmerEndpoint.getAll(page);
      setFarmer(farmers);
    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    sessionStorage.clear();
    router.navigate("/");
  }

  return {
    signOut,
    getAll,
    farmes,
    // currentPage,
  };
}
