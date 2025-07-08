import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './config';

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { 
      user: null, 
      error: error.code === 'auth/invalid-credential' 
        ? 'Credenciales incorrectas. Por favor verifica tu email y contraseña.' 
        : 'Error al iniciar sesión. Por favor intenta nuevamente.'
    };
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: 'Error al cerrar sesión.' };
  }
};

// Check if user is authenticated
export const checkAuth = () => {
  return new Promise<{ user: User | null }>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve({ user });
    });
  });
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};