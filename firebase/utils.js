import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

// Update user profile in Firestore
export const updateUserProfile = async (userId, updateData) => {
    try {
        const userRef = doc(db, 'users', userId);
        
        // Check if document exists
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
            // Update existing document
            await updateDoc(userRef, updateData);
        } else {
            // Create new document
            await setDoc(userRef, {
                ...updateData,
                createdAt: new Date().toISOString()
            });
        }
        
        return true;
    } catch (error) {
        console.error('Error updating user profile:', error);
        return false;
    }
};

// Get user profile from Firestore
export const getUserProfile = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
            return docSnap.data();
        }
        
        return null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        return null;
    }
}; 