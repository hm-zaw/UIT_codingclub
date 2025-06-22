'use client';
import React, { useState, useEffect } from 'react'
import Loading from '@/components/Loading';
import { Montserrat, Fugaz_One } from 'next/font/google';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FaGraduationCap, FaCode, FaUsers } from 'react-icons/fa';
import Hero from '@/components/Hero';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { getAllEvents } from '@/firebase/utils';

const monstserrat = Montserrat({ subsets: ['latin'], weight: ['500'] });

export default function Dashboard() {
  const { currentUser, userDataObj, loading } = useAuth();
  const [data, setData] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  {/** Demo info */}
  const userStats = {
    eventsAttended: 5,
    projectsCompleted: 3,
    skillsLearned: 8,
    contributions: 12
  };

  const upcomingActivities = [
    {
      id: 1,
      title: 'Web Development Workshop',
      date: 'March 15, 2024',
      type: 'Workshop',
      status: 'Registered'
    },
    {
      id: 2,
      title: 'Hackathon Preparation',
      date: 'March 22, 2024',
      type: 'Workshop',
      status: 'Pending'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'Personal Portfolio',
      progress: 80,
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      name: 'E-commerce Website',
      progress: 45,
      lastUpdated: '1 week ago'
    }
  ];

  const latestAnnouncements = [
    {
      id: 1,
      title: 'Hackathon Registration Open',
      description: 'Join our annual hackathon and showcase your coding skills!',
      date: 'March 10, 2024',
      type: 'Event',
      image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'New Workshop Series',
      description: 'Learn advanced web development techniques in our new workshop series.',
      date: 'March 8, 2024',
      type: 'Workshop',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Club Meeting Schedule',
      description: 'Updated meeting schedule for the upcoming month.',
      date: 'March 5, 2024',
      type: 'General',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop'
    }
  ];

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setEventsLoading(true);
        const allEvents = await getAllEvents();
        
        // Filter for upcoming events (events with dates >= today)
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

        const filteredEvents = allEvents.filter(event => {
          const eventDate = event.date instanceof Date ? event.date : new Date(event.date);
          eventDate.setHours(0, 0, 0, 0); // Normalize event date to start of day
          return eventDate >= now;
        }).sort((a, b) => {
          const dateA = a.date instanceof Date ? a.date : new Date(a.date);
          const dateB = b.date instanceof Date ? b.date : new Date(b.date);
          return dateA - dateB;
        }); // Sort by date

        setUpcomingEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
        setUpcomingEvents([]);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
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

        // If role is not student, redirect to appropriate dashboard
        if (['teacher', 'mentor', 'admin'].includes(userData.role)) {
          router.push('/adm-dashboard');
          return;
        } else if (userData.role !== 'student') {
          router.push('/setup');
          return;
        }

        // If we get here, user is authorized
        setShowLoading(false);

      } catch (error) {
        console.error('Error checking user access:', error);
        router.push('/login');
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userDataObj && JSON.stringify(userDataObj) !== JSON.stringify(data)) {
      setData(userDataObj);
    }
  }, [userDataObj]);
  
  // Handle redirect after loading is complete
  useEffect(() => {
    if (!showLoading && !currentUser) {
      router.push('/Login'); // Use router.push for client-side navigation
    }
  }, [showLoading, currentUser, router]);

  if (showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  console.log('Current user in dashboard:', currentUser);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <BackgroundBeamsWithCollision className="min-h-screen">
          <div className="container">
            <div className="w-full relative z-10">
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl">
                Welcome to <span className="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-[#387d8a] to-[#2c5f6a] bg-clip-text text-transparent">UIT Coder Club</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Empowering students through code, collaboration, and innovation
              </p>
              <button className="btn btn-primary">
                Check Events
              </button>
            </div>
          </div>
        </BackgroundBeamsWithCollision>
      </section>

      {/* Latest Announcements Section */}
      <section className="section bg-white py-5 my-24">
        <div className="container px-2 sm:px-4 md:px-0">
          <div className="relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#387d8a]/5 to-transparent rounded-3xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#387d8a]/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#387d8a]/10 rounded-full blur-2xl"></div>

            {/* Content */}
            <div className="relative">
              <div className="text-center py-16 sm:py-12 mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                  Latest Announcements
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  Stay updated with our latest news and events
                </p>
              </div>

              <div className="px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {latestAnnouncements.map((announcement) => (
                  <CardContainer key={announcement.id} className="w-full" containerClassName="py-0">
                    <CardBody className="w-full h-auto md:h-[240px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] flex flex-col bg-white">
                      {/* Window Frame Header */}
                      <CardItem translateZ="20" className="flex flex-row p-1.5 bg-gray-100 border-b-2 border-[#333333]">
                        <div className="rounded-full w-2.5 h-2.5 mx-1 bg-[#ff605c]"></div>
                        <div className="rounded-full w-2.5 h-2.5 mx-1 bg-[#ffbd44]"></div>
                        <div className="rounded-full w-2.5 h-2.5 mx-1 bg-[#00ca4e]"></div>
                      </CardItem>

                      {/* Card Content */}
                      <div className="bg-white flex-1 flex flex-col sm:flex-row">
                        {/* Image */}
                        <CardItem translateZ="50" className="relative w-full sm:w-2/5 h-32 sm:h-auto">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#387d8a]/20 to-transparent"></div>
                          <img
                            src={announcement.image}
                            alt={announcement.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Type Badge */}
                          <div className="absolute top-2 left-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/90 text-[#387d8a]">
                              {announcement.type}
                            </span>
                          </div>
                        </CardItem>

                        {/* Content */}
                        <div className="w-2/5 sm:w-3/5 p-3 flex flex-col">
                          {/* Title and Date */}
                          <CardItem translateZ="60" className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 line-clamp-1">
                            {announcement.title}
                          </CardItem>
                          <CardItem translateZ="40" className="text-xs text-gray-500 mb-1">
                            {announcement.date}
                          </CardItem>

                          {/* Description */}
                          <CardItem translateZ="30" className="text-xs text-gray-600 mb-2 line-clamp-2 flex-1">
                            {announcement.description}
                          </CardItem>

                          {/* Read More Button */}
                          <CardItem translateZ="80" as="button" className="inline-flex items-center text-[#387d8a] hover:text-[#2c5f6a] font-medium transition-colors duration-200 mt-auto text-xs">
                            Read More
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </CardItem>
                        </div>
                      </div>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Hero Section */}
      <section className="section bg-gradient-to-br from-[#f8faf8] to-[#e8f0f0] py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
            {/* Left side - Illustration */}
            <div className="relative flex justify-center items-center h-full mb-8 md:mb-0">
              <img
                src="/event-side-img.png" 
                alt="Events Illustration"
                className="max-w-[80vw] sm:max-w-xs md:max-w-full h-auto object-contain"
              />
            </div>
            
            {/* Right side - Content */}
            <div className="relative px-2 md:pl-8 lg:pl-24 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#6a809b] mb-2 mt-6">
                Wondering
              </h2>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#387d8a] mb-4 md:mb-6 leading-tight">
                What's up?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 font-medium">
                There's always something <span className="text-[#387d8a]">new</span> to look forward to. Keep an eye out for the latest Computing Club <span className="text-[#387d8a]">events</span>!
              </p>
              <a href="/events" className="inline-flex items-center px-4 py-2 mb-4 sm:px-6 sm:py-3 rounded-lg bg-[#387d8a] text-white font-medium hover:bg-[#2c5f6a] transition-colors duration-200">
                View Events
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section bg-white py-2 my-24">
        <div className="container">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventsLoading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#387d8a] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading upcoming events...</p>
              </div>
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.slice(0, 2).map(event => {
                const eventDate = event.date instanceof Date ? event.date : new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
                
                return (
                  <div key={event.id} className="card">
                    <div className="text-[#387d8a] text-sm mb-1">
                      📅 {formattedDate} | ⏰ {event.time || 'TBD'}
                    </div>
                    <h3 className="text-lg font-bold mb-3">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.shortDescription || event.description || 'No description available'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        📍 {event.location || 'Location TBD'}
                      </span>
                      <a href="/events" className="btn btn-primary text-sm px-4 py-2">
                        Learn More
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-base text-gray-500 col-span-full">No upcoming events at the moment. Check back soon!</p>
            )}
          </div>
        </div>
      </section>

      {/* Study Plans Section */}
      <section className="section bg-gradient-to-br from-[#e8f0f0] to-[#f8faf8] py-2 my-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
            {/* Left side - Content */}
            <div className="relative md:pr-8 lg:pr-24 py-32">
              <h2 className="text-3xl md:text-4xl font-medium text-[#6a809b] mb-2"> Stressed about </h2>
              <h2 className="text-6xl md:text-7xl font-black text-[#387d8a] mb-6 leading-tight"> Study plans? </h2>
              <p className="text-xl text-gray-600 mb-8 font-medium">
                Set yourself up for <span className="text-[#387d8a]">academic success</span> with our <span className="text-[#387d8a]">study planner</span>!
              </p>
              <a href="/resources" className="inline-flex items-center px-6 py-3 rounded-lg bg-[#387d8a] text-white font-medium hover:bg-[#2c5f6a] transition-colors duration-200">
                Resources
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            
            {/* Right side - Illustration */}
            <div className="relative flex justify-center items-center h-full">
              <img src="/planner.png" alt="Study Planner Illustration" width={550} height={550} className="max-w-full h-auto object-contain"/>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-gray-50 py-12 my-24">
        <div className="container">
          <h2 className="text-center mb-16 my-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#387d8a]/10 to-[#2c5f6a]/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:from-[#387d8a] group-hover:to-[#2c5f6a]">
                <FaGraduationCap className="text-[#387d8a] text-4xl transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#387d8a] transition-colors duration-300">Learn & Grow</h3>
              <p className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Access to workshops, tutorials, and mentorship programs to enhance your coding skills.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#387d8a]/10 to-[#2c5f6a]/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:from-[#387d8a] group-hover:to-[#2c5f6a]">
                <FaCode className="text-[#387d8a] text-4xl transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#387d8a] transition-colors duration-300">Build Projects</h3>
              <p className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Work on real-world projects and build your portfolio with hands-on experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#387d8a]/10 to-[#2c5f6a]/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:from-[#387d8a] group-hover:to-[#2c5f6a]">
                <FaUsers className="text-[#387d8a] text-4xl transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#387d8a] transition-colors duration-300">Network</h3>
              <p className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Connect with like-minded developers and industry professionals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}