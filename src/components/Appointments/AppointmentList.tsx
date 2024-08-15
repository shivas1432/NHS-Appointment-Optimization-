import React, { useState } from 'react';
import { AppointmentCard } from './AppointmentCard';
import { AppointmentSearch } from './AppointmentSearch';
import { useAppointments, useBookAppointment } from '../../hooks/useNHSData';
import { Appointment } from '../../types';
import { useAppointmentStore } from '../../stores/useAppointmentStore';

export const AppointmentList: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState({});
  const { data: appointments, isLoading: isLoadingAppointments } = useAppointments(searchFilters);
  const { mutate: bookAppointment, isPending: isBooking } = useBookAppointment();
  const { currentPatient } = useAppointmentStore();

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
  };

  const handleBookAppointment = (appointment: Appointment) => {
    if (!currentPatient) {
      alert('Please select a patient profile to book appointments');
      return;
    }
    
    bookAppointment(
      { appointmentId: appointment.id, patientId: currentPatient.id },
      {
        onSuccess: () => {
          alert('Appointment booked successfully! Confirmation sent via SMS and email.');
        },
        onError: () => {
          alert('Failed to book appointment. Please try again.');
        }
      }
    );
  };

  const handleAddToWaitlist = (appointment: Appointment) => {
    if (!currentPatient) {
      alert('Please select a patient profile to add to waitlist');
      return;
    }
    
    // This would typically open a waitlist form
    alert(`Added to waitlist for ${appointment.specialty} appointments. You'll be notified when a suitable slot becomes available.`);
  };

  const availableAppointments = appointments?.filter(apt => apt.status === 'available') || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Find Appointments</h2>
          <p className="text-gray-600">Search and book available NHS appointments</p>
        </div>
        
        {!currentPatient && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> Select a patient profile to book appointments
            </p>
          </div>
        )}
      </div>

      <AppointmentSearch onSearch={handleSearch} isLoading={isLoadingAppointments} />

      {isLoadingAppointments ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="mt-4 h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {availableAppointments.length} available appointments
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>Live availability</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onBook={handleBookAppointment}
                onReschedule={handleAddToWaitlist}
                showActions={true}
              />
            ))}
          </div>

          {availableAppointments.length === 0 && !isLoadingAppointments && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or add yourself to the waitlist</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                Join Waitlist
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};