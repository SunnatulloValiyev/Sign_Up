import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { getDatabase, ref, set, onDisconnect, onValue, serverTimestamp } from 'firebase/database';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    
    const handleUserConnection = (firebaseUser) => {
      if (firebaseUser) {
        const userStatusRef = ref(database, `status/${firebaseUser.uid}`);
        const userDataRef = ref(database, `users/${firebaseUser.uid}`);
        
        const isOfflineForDatabase = {
          state: 'offline',
          last_changed: serverTimestamp(),
        };

        const isOnlineForDatabase = {
          state: 'online',
          last_changed: serverTimestamp(),
        };

        set(userDataRef, {
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL || "/default-avatar.jpg",
          email: firebaseUser.email,
          uid: firebaseUser.uid
        });

        set(userStatusRef, isOnlineForDatabase)
          .then(() => {
            onDisconnect(userStatusRef).set(isOfflineForDatabase);
          });

        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || "/default-avatar.jpg"
        });

        const onlineUsersRef = ref(database, 'status');
        onValue(onlineUsersRef, (snapshot) => {
          const statusData = snapshot.val();
          const onlineUsersList = [];
          
          onlineUsersList.push({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL || "/default-avatar.jpg"
          });

          for (const uid in statusData) {
            if (statusData[uid].state === 'online' && uid !== firebaseUser.uid) {
              const userRef = ref(database, `users/${uid}`);
              onValue(userRef, (userSnapshot) => {
                const userData = userSnapshot.val();
                if (userData && !onlineUsersList.some(u => u.uid === userData.uid)) {
                  onlineUsersList.push(userData);
                  setOnlineUsers([...onlineUsersList]);
                }
              });
            }
          }
          setOnlineUsers(onlineUsersList);
        });
      } else {
        setUser(null);
        setOnlineUsers([]);
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, handleUserConnection);

    return () => {
      unsubscribe();
    };
  }, []);

  const register = async ({ email, password, name }) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: "/default-avatar.jpg"
      });

      return userCredential.user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error,
      onlineUsers,
      register, 
      login,
      googleLogin,
      logout,
      clearError: () => setError(null)
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}