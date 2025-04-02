import React from 'react';
import { User } from 'lucide-react';

export default function TestAccounts() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Test Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { email: 'test1@example.com', password: 'test123' },
            { email: 'test2@example.com', password: 'test123' }
          ].map((account, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Test Account {index + 1}</h3>
              <p className="text-sm text-gray-400 mb-1">Email: {account.email}</p>
              <p className="text-sm text-gray-400">Password: {account.password}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-400 mt-6 text-sm">
          These accounts are for demonstration purposes only.
        </p>
      </div>
    </section>
  );
}