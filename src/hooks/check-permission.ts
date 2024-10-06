import { useState } from "react";

export function useCheckPermission() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const prom = new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 100)
  );

  prom.then((res) => {
    setIsAuth(res as boolean);
  });
  return isAuth;
}
