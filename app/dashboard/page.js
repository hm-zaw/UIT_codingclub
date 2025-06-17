'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import Main from "@/components/Main";

export default function DashboardPage() {
    const { currentUser, userDataObj, loading } = useAuth();
    const router = useRouter();
    const db = getFirestore();

    useEffect(() => {
        const checkUserRole = async () => {
            try {
                const user = currentUser;
                if (!user) {
                    router.push('/Login');
                    return;
                }

                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    router.push('/setup');
                    return;
                }

                const userData = userSnap.data();

                // Check if setup is completed
                if (!userData.role) {
                    router.push('/setup');
                    return;
                }

                // Redirect based on role
                switch(userData.role) {
                    case 'student':
                        router.push('/user-dashboard');
                        break;
                    case 'teacher':
                    case 'mentor':
                        router.push('/adm-dashboard');
                        break;
                    default:
                        router.push('/setup');
                }
            } catch (error) {
                console.error('Error checking user role:', error);
                // Handle error appropriately
            }
        };

        checkUserRole();
    }, []); // Run once on component mount

    // Return loading state since we'll redirect anyway
    return (
        <Main>
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        </Main>
    );
}