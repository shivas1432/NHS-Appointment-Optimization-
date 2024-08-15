import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Appointment, NHSTrust, Patient, Analytics, WaitlistEntry } from '../types';
import { mockTrusts, mockAppointments, mockPatients, mockAnalytics } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
const fetchTrusts = async (): Promise<NHSTrust[]> => {
  await delay(500);
  return mockTrusts;
};

const fetchAppointments = async (filters?: any): Promise<Appointment[]> => {
  await delay(800);
  let appointments = [...mockAppointments];
  
  // Generate more mock appointments
  const additionalAppointments: Appointment[] = [];
  const specialties = ['Cardiology', 'Oncology', 'Neurology', 'Surgery', 'Dermatology'];
  
  for (let i = 0; i < 50; i++) {
    const trust = mockTrusts[Math.floor(Math.random() * mockTrusts.length)];
    const specialty = specialties[Math.floor(Math.random() * specialties.length)];
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));
    
    additionalAppointments.push({
      id: `apt-${String(i + 100).padStart(3, '0')}`,
      trustId: trust.id,
      trustName: trust.name,
      specialty,
      consultantName: `Dr. ${['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson'][Math.floor(Math.random() * 5)]}`,
      date: date.toISOString().split('T')[0],
      time: `${String(9 + Math.floor(Math.random() * 8)).padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'}`,
      duration: [15, 30, 45, 60][Math.floor(Math.random() * 4)],
      type: Math.random() > 0.5 ? 'initial' : 'follow-up',
      urgency: ['routine', 'urgent'][Math.floor(Math.random() * 2)] as 'routine' | 'urgent',
      status: 'available',
      location: `${specialty} Department`,
      estimatedTravelTime: Math.floor(Math.random() * 45) + 10
    });
  }
  
  appointments = [...appointments, ...additionalAppointments];
  
  if (filters?.specialty && filters.specialty !== 'all') {
    appointments = appointments.filter(apt => apt.specialty === filters.specialty);
  }
  
  if (filters?.urgency && filters.urgency !== 'any') {
    appointments = appointments.filter(apt => apt.urgency === filters.urgency);
  }
  
  return appointments;
};

const fetchPatients = async (): Promise<Patient[]> => {
  await delay(600);
  return mockPatients;
};

const fetchAnalytics = async (): Promise<Analytics> => {
  await delay(400);
  return mockAnalytics;
};

const bookAppointmentAPI = async ({ appointmentId, patientId }: { appointmentId: string; patientId: string }) => {
  await delay(1000);
  return { success: true, appointmentId, patientId };
};

// Custom hooks
export const useTrusts = () => {
  return useQuery({
    queryKey: ['trusts'],
    queryFn: fetchTrusts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAppointments = (filters?: any) => {
  return useQuery({
    queryKey: ['appointments', filters],
    queryFn: () => fetchAppointments(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bookAppointmentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};