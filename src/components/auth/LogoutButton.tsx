import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
    >
      <LogOut size={20} />
      <span>Logout</span>
    </button>
  );
}