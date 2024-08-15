export interface NHSTrust {
  id: string;
  name: string;
  code: string;
  address: string;
  postcode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  specialties: string[];
  rating: number;
  distance?: number;
}

export interface Appointment {
  id: string;
  trustId: string;
  trustName: string;
  specialty: string;
  consultantName: string;
  date: string;
  time: string;
  duration: number;
  type: 'initial' | 'follow-up' | 'procedure';
  urgency: 'routine' | 'urgent' | 'emergency';
  status: 'available' | 'booked' | 'cancelled' | 'completed';
  patientId?: string;
  location: string;
  estimatedTravelTime?: number;
}

export interface Patient {
  id: string;
  nhsNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  postcode: string;
  email: string;
  phone: string;
  preferredContactMethod: 'email' | 'sms' | 'phone' | 'post';
  accessibility: {
    mobility: boolean;
    hearing: boolean;
    visual: boolean;
    language: string;
  };
  appointments: Appointment[];
  missedAppointments: number;
  riskScore: number;
}

export interface WaitlistEntry {
  id: string;
  patientId: string;
  specialty: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  preferredTrusts: string[];
  maxTravelTime: number;
  preferredTimes: string[];
  dateAdded: string;
  estimatedWaitTime: number;
}

export interface AppointmentReminder {
  id: string;
  appointmentId: string;
  patientId: string;
  type: 'sms' | 'email' | 'push' | 'call';
  scheduledFor: string;
  sent: boolean;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
}

export interface Analytics {
  totalAppointments: number;
  missedAppointments: number;
  costSavings: number;
  efficiency: number;
  patientSatisfaction: number;
  averageWaitTime: number;
  cancellatonRate: number;
  reschedulingRate: number;
  monthlyTrends: {
    month: string;
    appointments: number;
    missed: number;
    efficiency: number;
  }[];
  trustPerformance: {
    trustId: string;
    trustName: string;
    appointments: number;
    missed: number;
    efficiency: number;
  }[];
}

export interface SearchFilters {
  specialty: string;
  urgency: 'routine' | 'urgent' | 'emergency' | 'any';
  maxTravelTime: number;
  preferredDates: string[];
  timeSlots: string[];
  accessibility: string[];
}