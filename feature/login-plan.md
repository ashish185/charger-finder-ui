- I am using the clerk authentication


- How the components structure looks like

```js
import { authService } from '@/services/api/auth';
import { User, UserRole } from '@/services/api/types'; // ignore as we not using ts
import { create } from 'zustand';

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  error: null,

  hydrateFromSession: (token: string, user: User) => {
    set({ token, user, isLoading: false, error: null });
  },

  clearSession: () => {
    set({ token: null, user: null, isLoading: false });
  },

  completeRegistration: async (name: string, email: string, password: string) => {
    const state = useAuthStore.getState();
    if (!state.token) {
      throw new Error('No active session to complete registration');
    }

    set({ isLoading: true, error: null });
    try {
      const updatedUser = await authService.completeRegistration(
        state.token,
        name,
        email,
        password
      );
      set({ user: updatedUser, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to complete registration';
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authService.login(email, password);
      set({ token, user, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  logout: () => {
    set({ token: null, user: null, isLoading: false, error: null });
  },

  setRole: async (role: UserRole) => {
    const state = useAuthStore.getState();
    if (!state.token || !state.user) {
      throw new Error('No active session to set role');
    }

    set({ isLoading: true, error: null });
    try {
      const updatedUser = await authService.setRole(state.token, role);
      set({ user: { ...state.user, role: updatedUser.role }, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to set role';
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

```

- Example of service layer.
```js
import * as SecureStore from 'expo-secure-store';
import { AuthService, User } from './types';

const BACKEND_URL = 'http://localhost:5000/api'; // TODO: Move to env config

class AuthServiceImpl implements AuthService {
  async completeRegistration(
    _token: string,
    name: string,
    email: string,
    _password: string
  ): Promise<User> {
    // TODO: Replace with real endpoint when backend adds /auth/complete-registration
    console.log(`[MOCK] Completing registration for ${email}`);

    const updatedUser: User = {
      id: `user-${Date.now()}`,
      phone: '',
      name,
      email,
      isRegistrationComplete: true,
    };

    return updatedUser;
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        token: data.token,
        user: {
          id: data.user.id,
          email: data.user.email,
          phone: data.user.phone || '',
          name: data.user.name,
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('auth_token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getProfile(token: string): Promise<User> {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Get profile failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        id: data.id,
        email: data.email || '',
        phone: data.phone || '',
        name: data.name || '',
        role: data.role || null,
      };
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  async getProfileByPhone(phone: string, token: string): Promise<User | null> {
    try {
      const response = await fetch(`${BACKEND_URL}/user/${encodeURIComponent(phone)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        if (data?.error?.code === 'NOT_FOUND') {
          return null;
        }
        throw new Error(`Get profile by phone failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        id: data.id,
        email: data.email || '',
        phone: data.phone || phone,
        name: data.name || '',
        role: data.role || null,
        isRegistrationComplete: data.isRegistrationComplete ?? false,
      };
    } catch (error) {
      console.error('Get profile by phone error:', error);
      throw error;
    }
  }

  async setRole(_token: string, role: 'driver' | 'cpo' | null): Promise<User> {
    // TODO: Replace with real endpoint when backend adds /auth/set-role
    console.log(`[MOCK] Setting role to ${role}`);
    return { id: '', phone: '', name: '', email: '', role };
  }
}

export const authService = new AuthServiceImpl();

```
**Flow**
1. Once the user log in with phone number.
2. It will check the user detalis whether the user is present in backend
3. If user is not present then open the registration page.
4. Reistration page has two section one to save profile and other to save vechile.
5. if user is already registered then open page where chargers are listed: for now just render the text chargers list.

- Code snipltet for refrence
```js
import { useAuth, useUser } from '@clerk/expo';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function RegisterScreen() {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const phone = user?.primaryPhoneNumber?.phoneNumber;
      const token = await getToken();

      const res = await fetch('http://192.168.31.121:5000/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({phoneNumber: phone, fullName: fullName.trim() }),
      });
      console.log(res);
      if (!res.ok) {
        throw new Error('Registration failed');
      }

      router.replace('/homescreen');
    } catch (error: any) {
      setErrorMessage(error?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text>Full Name</Text>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="John Doe"
        autoCapitalize="words"
        style={{
          borderWidth: 1,
          padding: 12,
          marginVertical: 12,
        }}
      />

      {!!errorMessage && (
        <Text style={{ color: 'red', marginBottom: 12 }}>{errorMessage}</Text>
      )}

      <Button
        title={isSubmitting ? 'Saving...' : 'Continue'}
        onPress={handleRegister}
        disabled={isSubmitting}
      />
    </View>
  );
}
```

- HomeScreen
```js
export default function HomeScreen() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  console.log("user Id", userId, isSignedIn)
  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/homescreen" />;
  }

  return <Redirect href="/sign-up" />;
  
}
```