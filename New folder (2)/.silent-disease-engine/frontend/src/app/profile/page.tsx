"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EditProfileForm from '@/components/profile/EditProfileForm';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/dashboard/patient" 
            className="inline-flex items-center text-blue-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-blue-200 mt-2">Update your personal health details for better risk prediction.</p>
        </div>
        
        <EditProfileForm />
      </div>
    </div>
  );
}
