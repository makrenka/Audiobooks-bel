import { Loader } from "@/components/Loader/Loader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function GoogleToken() {
  const router = useRouter();

  useEffect(() => {
    Cookies.set("access_token", router.query.token as string);
    router.push("/");
  }, [router.query.token]);

  return <Loader />;
}
