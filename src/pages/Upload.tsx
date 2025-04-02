import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { uploadTrade } from '../lib/trades';
import FileUploadSection from '../components/upload/FileUploadSection';
import TradeForm from '../components/upload/TradeForm';
import Message from '../components/common/Message';
import TradeAnalysis from '../components/ai/TradeAnalysis';
import { TradeFormData, MessageType } from '../types';

const initialFormData: TradeFormData = {
  date: '',
  asset: '',
  entryPrice: '',
  exitPrice: '',
  profitLoss: '',
};

export default function Upload() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageType | null>(null);
  const [formData, setFormData] = useState<TradeFormData>(initialFormData);
  const [lastTrade, setLastTrade] = useState<any>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage(null);

    try {
      const tradeData = {
        userId: user.id,
        date: formData.date,
        asset: formData.asset,
        entryPrice: parseFloat(formData.entryPrice),
        exitPrice: parseFloat(formData.exitPrice),
        profitLoss: parseFloat(formData.profitLoss),
      };

      await uploadTrade(tradeData);
      setMessage({ type: 'success', text: 'Trade saved successfully!' });
      setLastTrade(tradeData);
      setFormData(initialFormData);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to save trade' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: keyof TradeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (file: File) => {
    // File handling logic will be implemented here
    console.log('Selected file:', file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Your Trading Data</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FileUploadSection
          loading={loading}
          onFileSelect={handleFileSelect}
          setMessage={setMessage}
        />
        <TradeForm
          formData={formData}
          loading={loading}
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
        />
      </div>

      {message && <Message message={message} />}
      
      {lastTrade && (
        <div className="mt-8">
          <TradeAnalysis tradeData={lastTrade} />
        </div>
      )}
    </div>
  );
}