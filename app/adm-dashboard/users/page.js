'use client';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"], weight: ['500']});

export default function UsersPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [enrolledYear, setEnrolledYear] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [major, setMajor] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    fetchMentors();
    fetchStudentList();
  }, []);

  const fetchMentors = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('role', '==', 'mentor'));
      const querySnapshot = await getDocs(q);
      const mentorsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMentors(mentorsList);
    } catch (err) {
      setError('Failed to fetch mentors: ' + err.message);
    }
  };

  const fetchStudentList = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('role', '==', 'student'));
      const querySnapshot = await getDocs(q);
      const students = [];
      querySnapshot.forEach(doc => {
        students.push({ id: doc.id, ...doc.data() });
      });
      setStudentList(students);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };

  const handleAddMentor = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Form validation
    if (!name || !email || !studentId || !major || !enrolledYear || !graduationYear || !attendanceStatus) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Add new mentor to Firestore
      await addDoc(collection(db, 'users'), {
        name,
        email,
        studentId: `TNT-${studentId}`,
        major,
        role: 'mentor',
        yearLevel: enrolledYear,
        semester: graduationYear,
        attendanceStatus,
        setupCompleted: true,
        createdAt: new Date()
      });

      setSuccess('Mentor added successfully!');
      setShowAddForm(false);
      resetForm();
      fetchMentors(); // Refresh the list
    } catch (err) {
      setError('Failed to add mentor: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setStudentId('');
    setEnrolledYear('');
    setGraduationYear('');
    setMajor('');
    setAttendanceStatus('');
  };

  const getAvailableMajors = () => {
    const yearLevel = parseInt(enrolledYear);
    if (!yearLevel) return [];
    if (yearLevel === 1 || yearLevel === 2) return [];
    if (yearLevel === 3) return ['CS', 'CT'];
    if (yearLevel === 4 || yearLevel === 5) {
      return ['Software Engineering (SE)', 'Business Information Systems (BIS)', 'Knowledge Engineering (KE)', 'High Performance Computing (HPC)', 'Embedded Systems (ES)', 'Computer Networks (CN)', 'Cyber Security (CSec)'];
    }
    return [];
  };

  useEffect(() => {
    setMajor('');
  }, [enrolledYear]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-blue-900 dark:to-slate-900">
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className={`${montserrat.className} my-auto text-2xl font-bold text-gray-900 dark:text-white flex items-center`}>
                  <Users className="h-8 w-8 mr-3 text-primary" />
                  Users Management
                </h1>
              </div>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-[#047d8a] hover:bg-[#025963e9] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Mentor
            </Button>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="bg-green-500/20 text-green-200 p-4 rounded-md mb-6">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-500/20 text-red-200 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* Add Mentor Form */}
          {showAddForm && (
            <Card className="mb-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Add New Mentor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddMentor} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        id="name"
                        required
                        placeholder="First and Last Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        id="email"
                        required
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="studentId" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Student ID <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">TNT-</span>
                        <Input
                          type="text"
                          id="studentId"
                          value={studentId}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, '');
                            setStudentId(numericValue);
                          }}
                          className="w-full pl-12"
                          placeholder="Enter ID number"
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="yearLevel" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Year Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="yearLevel"
                        value={enrolledYear}
                        onChange={(e) => setEnrolledYear(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select year</option>
                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                        <option value="3">Third Year</option>
                        <option value="4">Fourth Year</option>
                        <option value="5">Fifth Year</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="semester" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Semester <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="semester"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select semester</option>
                        <option value="1">First Semester</option>
                        <option value="2">Second Semester</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="major" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Major <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!enrolledYear || parseInt(enrolledYear) <= 2}
                      >
                        <option value="">
                          {!enrolledYear ? 'Select a major' :
                            parseInt(enrolledYear) <= 2 ? 'Major selection not available for 1st and 2nd year' :
                              'Select a major'}
                        </option>
                        {getAvailableMajors().map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="attendanceStatus" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Attendance Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="attendanceStatus"
                        value={attendanceStatus}
                        onChange={(e) => setAttendanceStatus(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select status</option>
                        <option value="attending">Attending</option>
                        <option value="withdraw">Withdraw</option>
                        <option value="onLeave">On Leave</option>
                        <option value="graduated">Graduated</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {loading ? 'Adding...' : 'Add Mentor'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Mentors List */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Current Mentors ({mentors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mentors.length === 0 ? (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No mentors found. Add your first mentor using the button above.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student ID</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Major</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Year</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mentors.map((mentor, index) => (
                        <tr key={mentor.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                            {mentor.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {mentor.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-mono">
                            {mentor.studentId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {mentor.major}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                              Year {mentor.yearLevel}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              mentor.attendanceStatus === 'attending' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              mentor.attendanceStatus === 'withdraw' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              mentor.attendanceStatus === 'onLeave' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                            }`}>
                              {mentor.attendanceStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Student Details Table */}
          <div className="mt-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border-2 border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center my-auto">
                <Users className="h-5 w-5 mr-2 text-indigo-600" />
                Student Details ({studentList.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Major</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student ID</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {studentList.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        No students found in the system.
                      </td>
                    </tr>
                  ) : (
                    studentList.map((student, index) => (
                      <tr key={student.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {student.major}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Year {student.yearLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-mono">
                          {student.studentId}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 