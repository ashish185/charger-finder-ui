import ChargeFinderHeader from "@/components/navigation/ProtectedChrome";
import { AuthProvider } from "../auth/provider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_V1_URL } from "../constants";

const GeneralLayout = ({ children }) => {
  return (
    <AuthProvider>
      <ChargeFinderHeader>{children}</ChargeFinderHeader>
    </AuthProvider>

  )
}

const ProtectedLayout = async ({ children }) => {
  console.log("*************protected layout is called");

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/login")
  }

  const response = await fetch(`${SERVER_V1_URL}/user/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });
  if (response.ok) {
    return <GeneralLayout>{children}</GeneralLayout>;
  }

  return (
    <GeneralLayout>{children}</GeneralLayout>
  );
}

export default ProtectedLayout;
