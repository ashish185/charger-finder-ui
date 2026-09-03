import UserRepository from "@/repositories/userRepository";

export class UserService {
  static getUserByPhone = async (phone, token) => {
    return UserRepository.findByPhone(phone, token);
  };

  static registerUser = async ({ phone, name, email }) => {
    return UserRepository.create({ phone, name, email });
  };

  static getProfile = async () => {
    return UserRepository.getProfile();
  };

  static completeProfile = async ({ fullName, email, password, agreedToTerms }) => {
    return UserRepository.completeProfile({ fullName, email, password, agreedToTerms });
  };

  static setRole = async (role) => {
    return UserRepository.setRole(role);
  };

  static logout = async () => {
    return UserRepository.logout();
  };
}
