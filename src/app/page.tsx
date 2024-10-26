'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ImageUploader from '@/components/ImageUploader';
import PdfConverter from '@/components/PdfConverter';
import DocToPdfConverter from '@/components/DocToPdfConverter';
import TextToPdfConverter from '@/components/TextToPdfConverter';

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
  const [text, setText] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-bs-theme', 'dark');
    } else {
      document.body.removeAttribute('data-bs-theme');
    }
  }, [isDarkMode]);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleDocSelect = (files: File[]) => {
    setSelectedDocs(files);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mt-5 pt-5">
        <button onClick={toggleDarkMode} className="btn btn-secondary mb-3">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div className="card mb-5">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <div className="shadow-lg rounded-lg overflow-hidden">
                  <Image src="/download.jpeg" alt="Convert Image" width={300} height={300} className="object-cover" />
                </div>
              </div>
              <div className="col-md-6">
                <h1 className="card-title text-center">PDF Converter</h1>
                <p className="text-center mb-4">
                  Convert your images, documents, and text to PDF with ease.
                </p>
                <ul className="nav nav-tabs" id="converterTabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="image-tab" data-bs-toggle="tab" data-bs-target="#image" type="button" role="tab" aria-controls="image" aria-selected="true">Image to PDF</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="doc-tab" data-bs-toggle="tab" data-bs-target="#doc" type="button" role="tab" aria-controls="doc" aria-selected="false">DOC to PDF</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="text-tab" data-bs-toggle="tab" data-bs-target="#text" type="button" role="tab" aria-controls="text" aria-selected="false">Text to PDF</button>
                  </li>
                </ul>
                <div className="tab-content mt-3" id="converterTabsContent">
                  <div className="tab-pane fade show active" id="image" role="tabpanel" aria-labelledby="image-tab">
                    <ImageUploader onFileSelect={handleFileSelect} />
                    {selectedFiles.length > 0 && (
                      <div className="mt-4">
                        <p className="text-muted small mb-2">
                          {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
                        </p>
                        <PdfConverter files={selectedFiles} />
                      </div>
                    )}
                  </div>
                  <div className="tab-pane fade" id="doc" role="tabpanel" aria-labelledby="doc-tab">
                    <DocToPdfConverter onFileSelect={handleDocSelect} />
                    {selectedDocs.length > 0 && (
                      <div className="mt-4">
                        <p className="text-muted small mb-2">
                          {selectedDocs.length} {selectedDocs.length === 1 ? 'file' : 'files'} selected
                        </p>
                        <PdfConverter files={selectedDocs} />
                      </div>
                    )}
                  </div>
                  <div className="tab-pane fade" id="text" role="tabpanel" aria-labelledby="text-tab">
                    <TextToPdfConverter text={text} onTextChange={handleTextChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Why Use Our Converter?</h3>
                <ul className="list-unstyled">
                  <li>✅ Fast and efficient conversion</li>
                  <li>✅ Supports multiple image formats</li>
                  <li>✅ Secure and private</li>
                  <li>✅ No registration required</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">How It Works</h3>
                <ol>
                  <li>Select your image files</li>
                  <li>Click the "Convert to PDF" button</li>
                  <li>Wait for the conversion to complete</li>
                  <li>Download your PDF file</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Supported Formats</h3>
                <p>Our converter supports a wide range of image formats, including:</p>
                <p>JPG, JPEG, PNG, GIF, BMP, TIFF, and more!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-5">
          <div className="card-body">
            <h2 className="card-title text-center">Frequently Asked Questions</h2>
            <div className="accordion" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    Is this service free?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Yes, our Image to PDF converter is completely free to use.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    Is there a limit to the number of images I can convert?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    There is no strict limit, but we recommend converting up to 20 images at a time for optimal performance.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    Are my images stored on your servers?
                  </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    No, all conversion is done in your browser. We do not store or have access to your images.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center mt-5 pb-4">
        <p>&copy; 2023 PDF Converter. All rights reserved.</p>
        <p>
          Created by <a href="https://lahcen.click" target="_blank" rel="noopener noreferrer" className="text-primary">Lahcen El Hanchir</a>
        </p>
        <p>
          <a href="#" className="text-primary me-3">Privacy Policy</a>
          <a href="#" className="text-primary me-3">Terms of Service</a>
          <a href="/contact" className="text-primary">Contact Us</a>
        </p>
      </footer>
    </div>
  );
}
