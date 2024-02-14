import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");

  const createUser = async (email, password) => {
    const docRef = doc(db, "users", currentUser.uid);
    await setDoc(docRef, {
      role: "student"
    });
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser != null) {
        const docRef = doc(db, "users", currentUser.uid);
        getDoc(docRef)
          .then(docSnap => {
            setUser(currentUser);
            setRole(docSnap.data().role);
          })
          .catch(err => console.log(err.message));
      }
      else {
        setUser(currentUser);
        setRole(null);
      }

    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, role, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};