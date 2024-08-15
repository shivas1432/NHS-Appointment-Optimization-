import React, { useState } from 'react';
import { Clock, AlertCircle, CheckCircle, User, Calendar } from 'lucide-react';
import { WaitlistEntry } from '../../types';
import { format } from 'date-fns';

interface WaitlistManagerProps {
  entries?: WaitlistEntry[];
  onRemove?: (entryId: string) => void;
  onMatch?: (entryId: string) => void;
}

// Mock waitlist data
const mockWaitlistEntries: WaitlistEntry[] = [
  {
    id: 'wait-001',
    patientId: 'pat-001',
    specialty: 'Cardiology',
    urgency: 'urgent',
    preferredTrusts: ['guy-thomas', 'uclh'],
    maxTravelTime: 30,
    preferredTimes: ['morning', 'afternoon'],
    dateAdded: '2025-01-15',
    estimatedWaitTime: 14
  },
  {
    id: 'wait-002',
    patientId: 'pat-002',
    specialty: 'Oncology',
    urgency: 'routine',
    preferredTrusts: ['uclh', 'imperial'],
    maxTravelTime: 45,
    preferredTimes: ['afternoon'],
    dateAdded: '2025-01-10',
    estimatedWaitTime: 28
  },
  {
    id: 'wait-003',
    patientId: 'pat-003',
    specialty: 'Surgery',
    urgency: 'urgent',
    preferredTrusts: ['royal-london'],
    maxTravelTime: 60,
    preferredTimes: ['morning'],
    dateAdded: '2025-01-20',
    estimatedWaitTime: 7
  }
];

export const WaitlistManager: React.FC<WaitlistManagerProps> = ({ 
  entries = mockWaitlistEntries,
  onRemove,
  onMatch
}) => {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'routine': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWaitTimeStatus = (days: number) => {
    if (days <= 7) return { color: 'text-green-600', icon: CheckCircle };
    if (days <= 21) return { color: 'text-orange-600', icon: Clock };
    return { color: 'text-red-600', icon: AlertCircle };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Waitlist Management</h2>
          <p className="text-gray-600">Smart matching for optimal appointment allocation</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900">Active Entries</p>
          <p className="text-2xl font-bold text-blue-700">{entries.length}</p>
        </div>
      </div>

      {/* Smart Matching Alert */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="text-sm font-medium text-green-800">
              3 automatic matches found in the last hour
            </p>
            <p className="text-xs text-green-600">
              Patients have been notified and appointments confirmed
            </p>
          </div>
        </div>
      </div>

      {/* Waitlist Entries */}
      <div className="space-y-4">
        {entries.map((entry) => {
          const waitTimeStatus = getWaitTimeStatus(entry.estimatedWaitTime);
          const StatusIcon = waitTimeStatus.icon;
          
          return (
            <div
              key={entry.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{entry.specialty}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(entry.urgency)}`}>
                      {entry.urgency.charAt(0).toUpperCase() + entry.urgency.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Patient ID: {entry.patientId}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end mb-1">
                    <StatusIcon className={`h-4 w-4 mr-1 ${waitTimeStatus.color}`} />
                    <span className={`text-sm font-medium ${waitTimeStatus.color}`}>
                      {entry.estimatedWaitTime} days
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Estimated wait</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Preferred Trusts</p>
                  <div className="space-y-1">
                    {entry.preferredTrusts.slice(0, 2).map((trustId, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1">
                        {trustId}
                      </span>
                    ))}
                    {entry.preferredTrusts.length > 2 && (
                      <span className="text-xs text-gray-500">+{entry.preferredTrusts.length - 2} more</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Constraints</p>
                  <div className="text-xs text-gray-600">
                    <p>Max travel: {entry.maxTravelTime} minutes</p>
                    <p>Times: {entry.preferredTimes.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Added: {format(new Date(entry.dateAdded), 'dd MMM yyyy')}</span>
                <span>Position in queue: #{Math.floor(Math.random() * 20) + 1}</span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => onMatch?.(entry.id)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Find Match
                </button>
                <button
                  onClick={() => setSelectedEntry(selectedEntry === entry.id ? null : entry.id)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  {selectedEntry === entry.id ? 'Hide Details' : 'View Details'}
                </button>
                <button
                  onClick={() => onRemove?.(entry.id)}
                  className="px-4 py-2 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Remove
                </button>
              </div>

              {selectedEntry === entry.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Matching Algorithm Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Specialty match:</span>
                        <span className="text-green-600 font-medium">✓ Available</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Urgency priority:</span>
                        <span className="text-green-600 font-medium">✓ High</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Geographic preference:</span>
                        <span className="text-orange-600 font-medium">~ Partial</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Time slot availability:</span>
                        <span className="text-green-600 font-medium">✓ Multiple options</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {entries.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No waitlist entries</h3>
          <p className="text-gray-600">All patients have been matched with suitable appointments</p>
        </div>
      )}
    </div>
  );
};