'use client';

import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, setAuthToken, clearAuthToken } from '@/lib/api';

// Auth state interface
export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
  isLoading: boolean;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register data
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

/**
 * Hook to manage authentication state
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });
  
  const queryClient = useQueryClient();
  

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('kes_admin_token');
      
      if (!token) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
        return;
      }
      
      try {
        setAuthToken(token);
        const data = await authApi.me();
        
        setAuthState({
          isAuthenticated: true,
          user: data.user,
          isLoading: false,
        });
      } catch (error) {
        // Token invalid or expired
        clearAuthToken();
        localStorage.removeItem('kes_admin_token');
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    };
    
    checkAuth();
  }, []);
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('kes_admin_token', data.token);
      setAuthToken(data.token);
      setAuthState({
        isAuthenticated: true,
        user: data.user,
        isLoading: false,
      });
    },
  });
  
  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (data) => {
      localStorage.setItem('kes_admin_token', data.token);
      setAuthToken(data.token);
      setAuthState({
        isAuthenticated: true,
        user: data.user,
        isLoading: false,
      });
    },
  });
  
  // Logout function
  const logout = useCallback(() => {
    clearAuthToken();
    localStorage.removeItem('kes_admin_token');
    queryClient.clear(); // Clear all cached queries
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  }, [queryClient]);
  
  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<RegisterData>) => authApi.updateProfile(data),
    onSuccess: (data) => {
      setAuthState(prev => ({
        ...prev,
        user: data.user,
      }));
    },
  });
  
  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => 
      authApi.changePassword(currentPassword, newPassword),
  });
  
  return {
    ...authState,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    
    logout,
    
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    
    changePassword: changePasswordMutation.mutate,
    isChangingPassword: changePasswordMutation.isPending,
    changePasswordError: changePasswordMutation.error,
  };
}

/**
 * Hook to check if user has specific role
 */
export function useRequireRole(requiredRole: string) {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  return {
    isAuthorized: isAuthenticated && user?.role === requiredRole,
    isLoading,
    user,
  };
}

/**
 * Hook to check if user is admin
 */
export function useRequireAdmin() {
  return useRequireRole('admin');
}
