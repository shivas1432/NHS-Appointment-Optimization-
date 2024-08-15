import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Appointment, Patient, NHSTrust, WaitlistEntry, Analytics } from '../types';

interface AppointmentState {
  // Data
  appointments: Appointment[];
  patients: Patient[];
  trusts: NHSTrust[];
  waitlist: WaitlistEntry[];
  analytics: Analytics | null;
  currentPatient: Patient | null;
  selectedTrust: NHSTrust | null;
  
  // UI State
  isLoading: boolean;
  searchQuery: string;
  selectedSpecialty: string;
  selectedUrgency: string;
  
  // Actions
  setAppointments: (appointments: Appointment[]) => void;
  setPatients: (patients: Patient[]) => void;
  setTrusts: (trusts: NHSTrust[]) => void;
  setCurrentPatient: (patient: Patient | null) => void;
  setSelectedTrust: (trust: NHSTrust | null) => void;
  setAnalytics: (analytics: Analytics) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedSpecialty: (specialty: string) => void;
  setSelectedUrgency: (urgency: string) => void;
  
  // Business Logic
  bookAppointment: (appointmentId: string, patientId: string) => void;
  cancelAppointment: (appointmentId: string) => void;
  rescheduleAppointment: (appointmentId: string, newDateTime: string) => void;
  addToWaitlist: (entry: WaitlistEntry) => void;
  removeFromWaitlist: (entryId: string) => void;
  updatePatientRiskScore: (patientId: string, score: number) => void;
}

export const useAppointmentStore = create<AppointmentState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        appointments: [],
        patients: [],
        trusts: [],
        waitlist: [],
        analytics: null,
        currentPatient: null,
        selectedTrust: null,
        isLoading: false,
        searchQuery: '',
        selectedSpecialty: 'all',
        selectedUrgency: 'any',

        // Setters
        setAppointments: (appointments) => set({ appointments }),
        setPatients: (patients) => set({ patients }),
        setTrusts: (trusts) => set({ trusts }),
        setCurrentPatient: (currentPatient) => set({ currentPatient }),
        setSelectedTrust: (selectedTrust) => set({ selectedTrust }),
        setAnalytics: (analytics) => set({ analytics }),
        setLoading: (isLoading) => set({ isLoading }),
        setSearchQuery: (searchQuery) => set({ searchQuery }),
        setSelectedSpecialty: (selectedSpecialty) => set({ selectedSpecialty }),
        setSelectedUrgency: (selectedUrgency) => set({ selectedUrgency }),

        // Business Logic
        bookAppointment: (appointmentId, patientId) => {
          const { appointments, patients } = get();
          const updatedAppointments = appointments.map(apt =>
            apt.id === appointmentId 
              ? { ...apt, status: 'booked' as const, patientId }
              : apt
          );
          
          const updatedPatients = patients.map(patient =>
            patient.id === patientId
              ? {
                  ...patient,
                  appointments: [
                    ...patient.appointments,
                    updatedAppointments.find(apt => apt.id === appointmentId)!
                  ]
                }
              : patient
          );

          set({ appointments: updatedAppointments, patients: updatedPatients });
        },

        cancelAppointment: (appointmentId) => {
          const { appointments } = get();
          const updatedAppointments = appointments.map(apt =>
            apt.id === appointmentId 
              ? { ...apt, status: 'available' as const, patientId: undefined }
              : apt
          );
          set({ appointments: updatedAppointments });
        },

        rescheduleAppointment: (appointmentId, newDateTime) => {
          const { appointments } = get();
          const [newDate, newTime] = newDateTime.split('T');
          const updatedAppointments = appointments.map(apt =>
            apt.id === appointmentId 
              ? { ...apt, date: newDate, time: newTime }
              : apt
          );
          set({ appointments: updatedAppointments });
        },

        addToWaitlist: (entry) => {
          const { waitlist } = get();
          set({ waitlist: [...waitlist, entry] });
        },

        removeFromWaitlist: (entryId) => {
          const { waitlist } = get();
          set({ waitlist: waitlist.filter(entry => entry.id !== entryId) });
        },

        updatePatientRiskScore: (patientId, score) => {
          const { patients } = get();
          const updatedPatients = patients.map(patient =>
            patient.id === patientId ? { ...patient, riskScore: score } : patient
          );
          set({ patients: updatedPatients });
        },
      }),
      {
        name: 'nhs-appointment-store',
        partialize: (state) => ({
          currentPatient: state.currentPatient,
          searchQuery: state.searchQuery,
          selectedSpecialty: state.selectedSpecialty,
          selectedUrgency: state.selectedUrgency,
        }),
      }
    ),
    { name: 'NHS Appointment Store' }
  )
);