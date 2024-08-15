import React from 'react';
import { Clock, MapPin, User, Calendar as CalendarIcon } from 'lucide-react';
import { Appointment } from '../../types';
import { format } from 'date-fns';

interface AppointmentCardProps {
  appointment: Appointment;
  onBook?: (appointment: Appointment) => void;
  onReschedule?: (appointment: Appointment) => void;
  showActions?: boolean;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  onBook, 
  onReschedule,
  showActions = true 
}) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'routine': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'EEEE, dd MMMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{appointment.specialty}</h3>
          <p className="text-sm text-gray-600">{appointment.trustName}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(appointment.urgency)}`}>
          {appointment.urgency.charAt(0).toUpperCase() + appointment.urgency.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>{formatDate(appointment.date)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          <span>{appointment.time} ({appointment.duration} minutes)</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          <span>{appointment.consultantName}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <span>{appointment.location}</span>
          {appointment.estimatedTravelTime && (
            <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
              {appointment.estimatedTravelTime} min travel
            </span>
          )}
        </div>
      </div>

      {showActions && appointment.status === 'available' && (
        <div className="flex space-x-3">
          <button
            onClick={() => onBook?.(appointment)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Book Appointment
          </button>
          <button
            onClick={() => onReschedule?.(appointment)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Add to Waitlist
          </button>
        </div>
      )}

      {appointment.status === 'booked' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-800 font-medium">Appointment Confirmed</p>
          <p className="text-xs text-green-600">Reminder will be sent 24 hours before</p>
        </div>
      )}
    </div>
  );
};