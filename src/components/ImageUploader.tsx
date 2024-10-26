import React from 'react';

interface ImageUploaderProps {
  onFileSelect: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFileSelect(Array.from(files));
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="file-upload" className="form-label">
        Select images to convert
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="form-control"
      />
    </div>
  );
};

export default ImageUploader;
