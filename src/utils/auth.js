import { ROLE } from "@/app/constants";

// Central place to decide where an authenticated user should land based on
// how complete their profile is (role selection, full name).
export function getPostAuthRoute(user) {
  if (!user) return "/login";
  const roles = Array.isArray(user.role) ? user.role : user.role ? [user.role] : [];
  if (roles.length === 0) {
    return "/select-role";
  }
  if (!user.fullName) {
    if (roles.includes(ROLE.CUSTOMER)) return "/signup";
    if (roles.includes(ROLE.OPERATOR)) return "/operator-signup";
  }
  return "/dashboard";
}
