'use client';
import React, { useState } from 'react';

export default function Page() {
  const [studentId, setStudentId] = useState('');
  const [enrolledYear, setEnrolledYear] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [role, setRole] = useState('');
  const [major, setMajor] = useState('');
  const [status, setStatus] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');

  return (
    <> 
        <div class="bg-teal-500/20 max-w-[950px] rounded-lg px-6 py-5 mx-12 flex items-center">
            <div class="rounded-full bg-white text-mediumGreen flex items-center justify-center w-7 h-7">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5 text-green-700">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <p class="ml-3 text-white/75 text-lg">Your email is now verified!</p>
        </div>
        <div className="flex h-screen text-white">
            
            {/* Left Form Section */}
            <div className="flex-1 flex flex-col px-16 py-12">
                <div className="max-w-[750px] w-full space-y-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Nice to meet you! Let’s get acquainted.</h1>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Name <span className="text-red-500">*</span></label>
                            <input type="text" id="name" required
                                placeholder="First and Last Name"
                                className="w-full px-5 py-3 rounded-md bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Additional Form Fields */}
                        <label htmlFor="studentId" className="block text-sm font-medium mb-2">Student Id <span className="text-red-500">*</span></label>
                        <input type="text" id="studentId" value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="w-full px-5 py-3 rounded-md bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label htmlFor="major" className="block text-sm font-medium mb-2">Major <span className="text-red-500">*</span></label>
                        <select id="major" value={major} onChange={(e) => setMajor(e.target.value)}
                            className="w-full px-5 py-3 rounded-md bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a major</option>
                            {['SE', 'KE', 'HPC', 'Csec', 'ES', 'CN', 'CS', 'CT'].map((option) => (
                            <option key={option} value={option}>{option}</option>
                            ))}
                        </select>

                        <label htmlFor="role" className="block text-sm font-medium mb-2">Roles <span className="text-red-500">*</span></label>
                        <div className='flex space-x-5'>
                            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                <span class="relative px-8 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                    Student
                                </span>
                            </button>
                            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                <span class="relative px-8 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                    Mentor
                                </span>
                            </button>
                            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                <span class="relative px-8 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                    Teacher
                                </span>
                            </button>
                        </div>

                        {/* Enrolled Year and Graduation Year */}
                        <div className="flex space-x-6">
                            <div className="flex-1">
                            <label htmlFor="enrolledYear" className="block text-sm font-medium mb-2">
                                Enrolled Year <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="enrolledYear"
                                value={enrolledYear}
                                onChange={(e) => setEnrolledYear(e.target.value)}
                                className="w-full px-5 py-3 rounded-md bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            </div>
                            <div className="flex-1">
                            <label htmlFor="graduationYear" className="block text-sm font-medium mb-2">
                                Graduation Year <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="graduationYear"
                                value={graduationYear}
                                onChange={(e) => setGraduationYear(e.target.value)}
                                className="w-full px-5 py-3 rounded-md bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            </div>
                        </div>

                        {/* Attendance Status Dropdown */}
                        <label htmlFor="attendanceStatus" className="block text-sm font-medium mb-2">
                            Attendance Status <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="attendanceStatus"
                            value={attendanceStatus}
                            onChange={(e) => setAttendanceStatus(e.target.value)}
                            className="w-full px-5 py-3 rounded-md bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select status</option>
                            <option value="attending">Attending</option>
                            <option value="withdraw">Withdraw</option>
                            <option value="onLeave">On Leave</option>
                            <option value="graduated">Graduated</option>
                        </select>
                    </form>
                </div>
            </div>

            {/* Right Preview Section */}
            <div className="flex-1 p-8 rounded-l-lg flex flex-col justify-center items-center">
                <div className="w-full max-w-[350px] bg-gray-900 p-6 rounded-xl space-y-4">
                <p className="text-sm text-gray-400">Student ID</p>
                <h2 className="text-lg font-bold">{studentId || 'TNT-8888'}</h2>
                <p className="text-sm text-gray-400">Major</p>
                <h2 className="text-lg font-bold">{major || 'N/A'}</h2>
                </div>
            </div>
        </div>
    </>
  );
}
