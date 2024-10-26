import React from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface TextToPdfConverterProps {
  text: string;
  onTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextToPdfConverter: React.FC<TextToPdfConverterProps> = ({ text, onTextChange }) => {
  const convertToPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    let page = pdfDoc.addPage();
    let { width, height } = page.getSize();
    const fontSize = 12;
    const margin = 50;
    const lineHeight = fontSize * 1.2;

    const words = text.split(' ');
    let line = '';
    let yPosition = height - margin;

    for (const word of words) {
      const testLine = line + word + ' ';
      const lineWidth = timesRomanFont.widthOfTextAtSize(testLine, fontSize);

      if (lineWidth > width - 2 * margin && line !== '') {
        page.drawText(line, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        line = word + ' ';
        yPosition -= lineHeight;

        if (yPosition < margin) {
          page = pdfDoc.addPage();
          ({ width, height } = page.getSize());
          yPosition = height - margin;
        }
      } else {
        line = testLine;
      }
    }

    if (line !== '') {
      page.drawText(line, {
        x: margin,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted_text.pdf';
    link.click();
  };

  return (
    <div className="mb-3">
      <label htmlFor="text-input" className="form-label">
        Enter text to convert to PDF
      </label>
      <textarea
        id="text-input"
        className="form-control"
        rows={5}
        value={text}
        onChange={onTextChange}
        placeholder="Type or paste your text here..."
      ></textarea>
      <button 
        className="btn btn-primary mt-3" 
        onClick={convertToPdf}
        disabled={!text.trim()}
      >
        Convert to PDF
      </button>
    </div>
  );
};

export default TextToPdfConverter;
