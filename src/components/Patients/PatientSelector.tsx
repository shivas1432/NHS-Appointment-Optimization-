import React from 'react';
import { User, Check } from 'lucide-react';
import { Patient } from '../../types';
import { useAppointmentStore } from '../../stores/useAppointmentStore';
import { mockPatients } from '../../data/mockData';

export const PatientSelector: React.FC = () => {
  const { currentPatient, setCurrentPatient } = useAppointmentStore();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Patient Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => setCurrentPatient(patient)}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
              currentPatient?.id === patient.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {currentPatient?.id === patient.id && (
              <div className="absolute top-2 right-2">
                <Check className="h-5 w-5 text-blue-600" />
              </div>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {patient.firstName} {patient.lastName}
                </p>
                <p className="text-sm text-gray-600">NHS: {patient.nhsNumber}</p>
                <p className="text-xs text-gray-500">{patient.postcode}</p>
              </div>
            </div>
            
            <div className="mt-3 flex justify-between items-center text-xs">
              <span className={`px-2 py-1 rounded-full ${
                patient.riskScore < 0.2 ? 'bg-green-100 text-green-800' :
                patient.riskScore < 0.4 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {patient.riskScore < 0.2 ? 'Low Risk' :
                 patient.riskScore < 0.4 ? 'Medium Risk' : 'High Risk'}
              </span>
              <span className="text-gray-500">
                {patient.missedAppointments} missed
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {!currentPatient && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          Select a patient profile to access booking features
        </p>
      )}
    </div>
  );
};