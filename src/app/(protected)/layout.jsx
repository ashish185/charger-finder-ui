import ProtectedChrome from "@/components/navigation/ProtectedChrome";
import { AuthProvider } from "../auth/provider";

const ProtectedLayout = ({ children }) => {
  return (
    <AuthProvider>
      <ProtectedChrome>{children}</ProtectedChrome>
    </AuthProvider>
  );
}

export default ProtectedLayout;
