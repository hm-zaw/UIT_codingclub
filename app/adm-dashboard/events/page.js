'use client';
import React, { useState, useEffect } from 'react';
import Loading from '@/components/Loading';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DashboardNav } from '@/components/ui/dashboard-nav';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Edit, Trash2, Users, MapPin, Clock, CalendarDays } from 'lucide-react';
import Image from "next/image";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"], weight: ['500'] });

export default function EventsPage() {
  const { currentUser, userDataObj, loading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    imageUrl: '',
    category: 'workshop'
  });
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  // Check admin access
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

        if (userData.role === 'student') {
          router.push('/user-dashboard');
          return;
        } else if (!['teacher', 'mentor', 'admin'].includes(userData.role)) {
          router.push('/setup');
          return;
        }

        setShowLoading(false);
      } catch (error) {
        console.error('Error checking admin access:', error);
        router.push('/user-dashboard');
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch events
  useEffect(() => {
    if (!showLoading) {
      fetchEvents();
    }
  }, [showLoading]);

  const fetchEvents = async () => {
    try {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const eventsList = [];
      querySnapshot.forEach(doc => {
        eventsList.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsList);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        ...formData,
        maxParticipants: parseInt(formData.maxParticipants),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (editingEvent) {
        await updateDoc(doc(db, 'events', editingEvent.id), {
          ...eventData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'events'), eventData);
      }

      setIsModalOpen(false);
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        maxParticipants: '',
        imageUrl: '',
        category: 'workshop'
      });
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      maxParticipants: event.maxParticipants.toString(),
      imageUrl: event.imageUrl || '',
      category: event.category || 'workshop'
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteDoc(doc(db, 'events', eventId));
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const openModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxParticipants: '',
      imageUrl: '',
      category: 'workshop'
    });
    setIsModalOpen(true);
  };

  if (showLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Loading />
      </div>
    );
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'workshop': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'competition': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'seminar': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'hackathon': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-blue-900 dark:to-slate-900">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 flex-col fixed inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200/50 dark:border-gray-700/50 space-x-2">
            <div className="bg-white/20 dark:bg-transparent p-1 rounded-lg">
              <Image src={'/uit_logo.png'} width={40} height={40} alt={'uit_logo'} />
            </div>
            <div>
              <h1 className={`${montserrat.className} my-auto text-lg font-semibold text-slate-950 dark:text-white mt-1`}>UIT Coding Club</h1>
            </div>
          </div>
          <DashboardNav />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <DashboardHeader />
        
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl my-auto font-bold text-gray-900 dark:text-white">Events Management</h1>
            </div>
            <Button onClick={openModal} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </CardTitle>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(event)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      Max: {event.maxParticipants} participants
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {events.length === 0 && (
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No events yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first event to get started</p>
                <Button onClick={openModal} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 w-full max-w-2xl max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {editingEvent ? 'Update the event details below' : 'Fill in the event information'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Event Title *
                  </label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="w-full h-11 text-base"
                    placeholder="Enter event title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your event..."
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                      className="w-full h-11 text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Time *
                    </label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                      className="w-full h-11 text-base"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <Input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                    className="w-full h-11 text-base"
                    placeholder="Enter event location"
                  />
                </div>

                {/* Max Participants and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Max Participants *
                    </label>
                    <Input
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                      required
                      min="1"
                      className="w-full h-11 text-base"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full h-11 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="workshop">Workshop</option>
                      <option value="competition">Competition</option>
                      <option value="seminar">Seminar</option>
                      <option value="hackathon">Hackathon</option>
                    </select>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Event Image URL
                  </label>
                  <Input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full h-11 text-base"
                    placeholder="https://example.com/event-image.jpg"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Optional: Add a URL to an event image
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <Button
                    type="submit"
                    className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base"
                  >
                    {editingEvent ? (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Update Event
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Event
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 h-11 font-medium text-base"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 