import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import mammoth from 'mammoth';

interface PdfConverterProps {
  files: File[];
}

const PdfConverter: React.FC<PdfConverterProps> = ({ files }) => {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const convertToPdf = async () => {
    setIsConverting(true);
    setProgress(0);
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.includes('image')) {
        await handleImageFile(pdfDoc, file);
      } else if (file.type.includes('word') || file.name.endsWith('.docx')) {
        await handleDocxFile(pdfDoc, file, font);
      }
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted_files.pdf';
    link.click();
    setIsConverting(false);
  };

  const handleImageFile = async (pdfDoc: PDFDocument, file: File) => {
    const imageBytes = await file.arrayBuffer();
    const image = await pdfDoc.embedJpg(imageBytes);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    page.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height,
    });
  };

  const handleDocxFile = async (pdfDoc: PDFDocument, file: File, font: any) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;

    let page = pdfDoc.addPage();
    let { width, height } = page.getSize();
    const fontSize = 12;
    const margin = 50;
    const maxWidth = width - 2 * margin;
    let y = height - margin;

    const lines = text.split('\n');

    for (const line of lines) {
      const words = line.split(' ');
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const lineWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (lineWidth > maxWidth) {
          page.drawText(currentLine, { x: margin, y, font, size: fontSize });
          y -= fontSize * 1.2;
          currentLine = word;

          if (y < margin) {
            page = pdfDoc.addPage();
            ({ width, height } = page.getSize());
            y = height - margin;
          }
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        page.drawText(currentLine, { x: margin, y, font, size: fontSize });
        y -= fontSize * 1.2;
      }

      if (y < margin) {
        page = pdfDoc.addPage();
        ({ width, height } = page.getSize());
        y = height - margin;
      }
    }
  };

  return (
    <div>
      <button
        onClick={convertToPdf}
        disabled={isConverting}
        className="btn btn-primary w-100"
      >
        {isConverting ? 'Converting...' : 'Convert to PDF'}
      </button>
      {isConverting && (
        <div className="mt-3">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <p className="text-center mt-2 small">{progress}% complete</p>
        </div>
      )}
    </div>
  );
};

export default PdfConverter;
