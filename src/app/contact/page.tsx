'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';

export default function Contact() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mt-5 pt-5">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Contact Us</h1>
            <p className="text-center mb-4">
              Have questions or feedback? Get in touch with Lahcen El Hanchir, the creator of PDF Converter.
            </p>
            <div className="row mb-4">
              <div className="col-md-6">
                <h3>About the Owner</h3>
                <p>Lahcen El Hanchir is a passionate developer dedicated to creating useful web applications.</p>
                <p>Website: <a href="https://lahcen.click" target="_blank" rel="noopener noreferrer">lahcen.click</a></p>
                <p>Email: lahcenelhanchir1@gmail.com</p>
              </div>
              <div className="col-md-6">
                <h3>Send a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea 
                      className="form-control" 
                      id="message" 
                      rows={5} 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {status && <p className="mt-3 text-center">{status}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
