'use client';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    emailjs
      .sendForm('service_coderclub', 'template_7jdmmf1', form.current, {
        publicKey: 'jY5XldcjhcRQhGr8f',
      })
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        (error) => {
          setError(true);
          console.log('FAILED...', error.text);
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="mb-6">Contact Us</h1>
              <p className="text-xl text-gray-600">
                Get in touch with us for any questions or inquiries
              </p>
            </div>
          </div>
        </section>
  
        {/* Contact Form Section */}
        <section className="section p-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-gray-600">coderclub@uit.edu.mm</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Location</h3>
                    <p className="text-gray-600">
                      Parami Road, Hlaing Campus, Yangon, Myanmar
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Nearest Bus Stop</h3>
                    <p className="text-gray-600">
                      AD, Pyay Road
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Social Media</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-primary hover:text-primary-dark">
                        Facebook
                      </a>
                      <a href="#" className="text-primary hover:text-primary-dark">
                        Instagram
                      </a>
                      <a href="#" className="text-primary hover:text-primary-dark">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Contact Form */}
              <div>
                <h2 className="mb-8">Send us a Message</h2>
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Message subject"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your message"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                  {success && <p className="text-green-600 font-semibold">Your message has been sent successfully!</p>}
                  {error && <p className="text-red-600 font-semibold">Something went wrong. Please try again.</p>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } 