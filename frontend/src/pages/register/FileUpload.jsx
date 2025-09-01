import React, { useState } from "react";
import "./signup.css";

// Reusable FileUpload component
function FileUpload({ label, file, onChange, accept = "*/*", required = false }) {
  const [dragOver, setDragOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onChange(e.dataTransfer.files[0]);
    }
  }

  return (
    <div
      className={`file-upload ${dragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label>{label}</label>
      <div className="upload-box">
        {file ? (
          <p>{file.name}</p>
        ) : (
          <>
            <i className="fas fa-folder"></i>
            <p>Click to browse or drag and drop</p>
            <small>PDF, DOC, DOCX, Images up to 10MB</small>
          </>
        )}
        <input
          type="file"
          accept={accept}
          required={required}
          onChange={(e) => onChange(e.target.files[0])}
        />
      </div>
    </div>
  );
}

export default FileUpload;
