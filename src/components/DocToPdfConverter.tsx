import React from 'react';

interface DocToPdfConverterProps {
  onFileSelect: (files: File[]) => void;
}

const DocToPdfConverter: React.FC<DocToPdfConverterProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFileSelect(Array.from(files));
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="doc-upload" className="form-label">
        Select DOC files to convert
      </label>
      <input
        id="doc-upload"
        type="file"
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        multiple
        onChange={handleFileChange}
        className="form-control"
      />
    </div>
  );
};

export default DocToPdfConverter;
