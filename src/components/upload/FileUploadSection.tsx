import React, { useState, useCallback } from 'react';
import { Upload as UploadIcon, FileSpreadsheet } from 'lucide-react';
import { MessageType } from '../../types';
import { uploadTradesFromCSV } from '../../lib/trades';
import { useAuth } from '../../contexts/AuthContext';

interface FileUploadSectionProps {
  loading: boolean;
  onFileSelect: (file: File) => void;
  setMessage: (message: MessageType | null) => void;
}

export default function FileUploadSection({ loading, onFileSelect, setMessage }: FileUploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'text/csv') {
      setFile(droppedFile);
      onFileSelect(droppedFile);
    } else {
      setMessage({ type: 'error', text: 'Please upload a CSV file' });
    }
  }, [onFileSelect, setMessage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setUploading(true);
    try {
      const tradesCount = await uploadTradesFromCSV(user.id, file);
      setMessage({ 
        type: 'success', 
        text: `Successfully uploaded ${tradesCount} trades` 
      });
      setFile(null);
      // Reset the file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to upload trades. Please check your CSV format.' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Upload a CSV File</h2>
      <p className="text-gray-600 mb-4">
        Upload your trading data in CSV format. Ensure the file contains columns for Date, Asset, Entry Price, Exit Price, and Profit/Loss.
      </p>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
      >
        <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-4">
          Drag and drop your file here or click to select a file
        </p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
        >
          Choose File
        </label>
        {file && (
          <p className="mt-4 text-sm text-gray-600">
            Selected file: {file.name}
          </p>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || loading || uploading}
        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <UploadIcon className="h-5 w-5 mr-2" />
        {uploading ? 'Uploading...' : 'Upload Data'}
      </button>
    </div>
  );
}