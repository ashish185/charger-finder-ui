import { redirectionPath } from "@/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_V1_URL } from "./constants";

const Home = async () => {
  console.log("******************* root layout called")
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const response = await fetch(`${SERVER_V1_URL}/user/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    redirect("/login");
  }

  const profile = await response.json();
  const { role = [] } = profile?.data ?? {};
  const path = redirectionPath(role);
  if (path) {
    redirect(path);
  }
}

export default Home;
