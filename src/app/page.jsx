import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import { ROLE } from "./constants";

const Home = async () => {
  console.log("******************* root layout called")
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const response = await apiFetch("/user/me", {
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

  if (role.includes(ROLE.OPERATOR)) {
    redirect("/cpo/stations");
  }
  redirect("/dashboard");
}

export default Home;
