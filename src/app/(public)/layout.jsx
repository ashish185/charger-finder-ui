import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROLE, SERVER_V1_URL } from "../constants";


const PublicLayout = async ({ children }) => {
    console.log("*****************public layout is called");
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
        return <>{children}</>;
    }

    const response = await fetch(`${SERVER_V1_URL}/user/me`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    });
    if (!response.ok) {
        return <>{children}</>;
    }

    const profile = await response.json();
    const { role = [] } = profile?.data ?? {};

    if (role.includes(ROLE.CUSTOMER)) {
        redirect("/dashboard")
    } else if (role.includes(ROLE.OPERATOR)) {
        redirect("/cpo/stations")
    }
    return (<>{children}</>)
}

export default PublicLayout;
