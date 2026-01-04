"use client";

import Sidebar from "@/components/common/Sidebar";
import { FileText, Download, Share2, Calendar } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { id: 1, title: "Monthly Health Summary", date: "Oct 01, 2023", type: "PDF", size: "2.4 MB" },
    { id: 2, title: "Cardiac Risk Analysis", date: "Sep 15, 2023", type: "PDF", size: "1.1 MB" },
    { id: 3, title: "Sleep Pattern Report", date: "Sep 01, 2023", type: "PDF", size: "0.8 MB" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Health Reports
            </h1>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              <FileText className="mr-2 h-4 w-4" />
              Generate New Report
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {reports.map((report) => (
                <li key={report.id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-blue-600 truncate">{report.title}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <p>{report.date}</p>
                            <span className="mx-2">•</span>
                            <p>{report.type}</p>
                            <span className="mx-2">•</span>
                            <p>{report.size}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                          <Share2 className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
