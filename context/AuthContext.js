'use client'
import React from "react"
import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { sendEmailVerification } from "firebase/auth";
import { useState, useEffect, useContext } from "react"

const AuthContext = React.createContext()
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ userDataObj, setUserDataObj ] = useState(null);
    const [ loading, setLoading ] = useState(true); // Initialize true for initial auth check

    // Auth Handlers
    async function signup(email, password) {
        // ... (your existing signup logic, no changes needed here)
        const requiredDomain = "@uit.edu.mm";
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        let errorMessage = "";

        if (!email.endsWith(requiredDomain)) {
            errorMessage = "Email must end with uit.edu.mm";
            console.error("Signup Error:", errorMessage);
            return { success: false, message: errorMessage };
        }
        if (!passwordRegex.test(password)) {
            errorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one symbol.";
            console.error("Signup Error:", errorMessage);
            return { success: false, message: errorMessage };
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            console.log("Signup successful. Verification email sent.");

            // Create initial user document in Firestore on signup
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: new Date(),
                name: '',
                studentId: '',
                major: '',
                enrolledEvent: '',
                status: '',
                role: '' 
            }, { merge: true });

            return {
                success: true,
                message: "Verification email sent. Please check your inbox and verify before logging in.",
            };
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "This email address is already registered. Please use a different email or log in.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "The email address is not valid. Please check the format.";
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = "Email/password accounts are not enabled. Please contact support.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "The password is too weak. Please choose a stronger password.";
                    break;
                default:
                    console.error("Firebase Auth Error:", error.code, error.message);
                    errorMessage = "Signup failed. Please try again later.";
            }
            console.error("Signup Error:", errorMessage);
            return { success: false, message: errorMessage };
        }
    }

    async function login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                await sendEmailVerification(user);
            
                return {
                    success: false,
                    message: "Please verify your email address to continue. A new verification email has been sent.",
                };
            }

            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();

                if (!userData.role || userData.role.trim() === "") {
                    console.warn("Role is empty or missing. Redirecting to setup.");
                    // Redirect to the desired page if role is empty
                    window.location.href = "/setup";
                } else {
                    // Role is set; redirect to dashboard
                    window.location.href = "/dashboard";
                    return { success: true };
                }
            } else {
                throw new Error("User data not found in Firestore.");
            }
        } catch (error) {
            let errorMessage = "An unknown error occurred. Please try again.";
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email. Please check your email or register.";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Incorrect password. Please try again.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Invalid email format. Please enter a valid email address.";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Too many failed login attempts. Please try again later.";
                    break;
                default:
                    console.error("Firebase Auth Error:", error.code, error.message);
                    errorMessage = "Login failed. Please check your credentials and try again.";
            }
            console.error("Login Error:", errorMessage);
            return { success: false, message: errorMessage };
        }
    }

    function logout(){
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true); // Start loading
            if (user) {
                try {
                    await user.reload();
                    if (!user.emailVerified) {
                        console.warn("Email not verified.");
                        setCurrentUser(null);
                        setUserDataObj(null);
                    } else {
                        setCurrentUser(user);
                        const docRef = doc(db, 'users', user.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            setUserDataObj(docSnap.data());
                        } else {
                            const defaultData = { email: user.email, createdAt: new Date() };
                            await setDoc(docRef, defaultData, { merge: true });
                            setUserDataObj(defaultData);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setCurrentUser(null);
                    setUserDataObj(null);
                }
            } else {
                setCurrentUser(null);
                setUserDataObj(null);
            }
            setLoading(false); // Stop loading after all async operations
        });

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        logout,
        login,
        loading 
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}