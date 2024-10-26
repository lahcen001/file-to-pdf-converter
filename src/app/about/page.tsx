'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';

export default function About() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mt-5 pt-5">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title text-center mb-4">About Our PDF Converter</h1>
            <p>
              Our PDF Converter is a powerful, easy-to-use tool designed to simplify your document conversion needs. 
              Whether you're looking to convert images, documents, or text to PDF format, our application has you covered.
            </p>
            <h2 className="mt-4 mb-3">Our Mission</h2>
            <p>
              We strive to provide a seamless, efficient, and secure conversion experience for all users. 
              Our goal is to make document conversion accessible to everyone, regardless of technical expertise.
            </p>
            <h2 className="mt-4 mb-3">Key Features</h2>
            <ul>
              <li>Convert images to PDF</li>
              <li>Convert DOC files to PDF</li>
              <li>Convert plain text to PDF</li>
              <li>Secure, browser-based conversion</li>
              <li>No file size limits</li>
              <li>Fast and efficient processing</li>
            </ul>
            <h2 className="mt-4 mb-3">Privacy and Security</h2>
            <p>
              We take your privacy seriously. All file conversions are performed locally in your browser, 
              ensuring that your documents never leave your device. We do not store or have access to any of your files.
            </p>
            <h2 className="mt-4 mb-3">About the Creator</h2>
            <div className="row">
              <div className="col-md-8">
                <p>
                  PDF Converter was created by Lahcen El Hanchir, a passionate developer dedicated to creating useful web applications.
                  Lahcen has years of experience in web development and is committed to providing high-quality, user-friendly tools for everyday tasks.
                </p>
                <p>
                  Lahcen's goal with PDF Converter is to offer a simple yet powerful solution for document conversion needs, 
                  making it easier for people to work with different file formats in their daily lives.
                </p>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Lahcen El Hanchir</h3>
                    <p>Web Developer & Creator of PDF Converter</p>
                    <p>Website: <a href="https://lahcen.click" target="_blank" rel="noopener noreferrer">lahcen.click</a></p>
                    <p>Email: lahcenelhanchir1@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
