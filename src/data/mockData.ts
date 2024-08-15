import { NHSTrust, Appointment, Patient, Analytics } from '../types';

export const mockTrusts: NHSTrust[] = [
  {
    id: 'guy-thomas',
    name: "Guy's and St Thomas' NHS Foundation Trust",
    code: 'RJ1',
    address: 'Westminster Bridge Road, London',
    postcode: 'SE1 7EH',
    coordinates: { lat: 51.5007, lng: -0.1174 },
    specialties: ['Cardiology', 'Oncology', 'Emergency Medicine', 'Surgery'],
    rating: 4.3
  },
  {
    id: 'royal-london',
    name: 'Barts Health NHS Trust',
    code: 'RNJ',
    address: 'Whitechapel Road, London',
    postcode: 'E1 1BB',
    coordinates: { lat: 51.5175, lng: -0.0634 },
    specialties: ['Emergency Medicine', 'Trauma Surgery', 'Cardiology'],
    rating: 4.1
  },
  {
    id: 'uclh',
    name: 'University College London Hospitals NHS Foundation Trust',
    code: 'RRV',
    address: 'Euston Road, London',
    postcode: 'NW1 2BU',
    coordinates: { lat: 51.5246, lng: -0.1340 },
    specialties: ['Neurology', 'Oncology', 'Cardiology', 'Surgery'],
    rating: 4.5
  },
  {
    id: 'imperial',
    name: 'Imperial College Healthcare NHS Trust',
    code: 'RYJ',
    address: 'Du Cane Road, London',
    postcode: 'W12 0HS',
    coordinates: { lat: 51.5174, lng: -0.2469 },
    specialties: ['Emergency Medicine', 'Surgery', 'Obstetrics'],
    rating: 4.2
  },
  {
    id: 'kings',
    name: "King's College Hospital NHS Foundation Trust",
    code: 'RJZ',
    address: 'Denmark Hill, London',
    postcode: 'SE5 9RS',
    coordinates: { lat: 51.4681, lng: -0.0921 },
    specialties: ['Emergency Medicine', 'Liver Surgery', 'Neurosciences'],
    rating: 4.0
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-001',
    trustId: 'guy-thomas',
    trustName: "Guy's and St Thomas' NHS Foundation Trust",
    specialty: 'Cardiology',
    consultantName: 'Dr. Sarah Johnson',
    date: '2025-02-15',
    time: '09:30',
    duration: 30,
    type: 'initial',
    urgency: 'routine',
    status: 'available',
    location: 'Cardiology Unit, Level 3',
    estimatedTravelTime: 25
  },
  {
    id: 'apt-002',
    trustId: 'uclh',
    trustName: 'University College London Hospitals NHS Foundation Trust',
    specialty: 'Oncology',
    consultantName: 'Prof. Michael Chen',
    date: '2025-02-16',
    time: '14:00',
    duration: 45,
    type: 'follow-up',
    urgency: 'urgent',
    status: 'available',
    location: 'Macmillan Cancer Centre',
    estimatedTravelTime: 18
  },
  {
    id: 'apt-003',
    trustId: 'royal-london',
    trustName: 'Barts Health NHS Trust',
    specialty: 'Emergency Medicine',
    consultantName: 'Dr. Emma Williams',
    date: '2025-02-14',
    time: '11:15',
    duration: 20,
    type: 'initial',
    urgency: 'emergency',
    status: 'available',
    location: 'Emergency Department',
    estimatedTravelTime: 32
  }
];

export const mockPatients: Patient[] = [
  {
    id: 'pat-001',
    nhsNumber: '485 777 3456',
    firstName: 'James',
    lastName: 'Thompson',
    dateOfBirth: '1978-03-15',
    postcode: 'SE1 2AA',
    email: 'james.thompson@example.com',
    phone: '+44 7700 900123',
    preferredContactMethod: 'email',
    accessibility: {
      mobility: false,
      hearing: false,
      visual: false,
      language: 'English'
    },
    appointments: [],
    missedAppointments: 2,
    riskScore: 0.3
  },
  {
    id: 'pat-002',
    nhsNumber: '485 777 3457',
    firstName: 'Maria',
    lastName: 'Rodriguez',
    dateOfBirth: '1985-07-22',
    postcode: 'E1 6AN',
    email: 'maria.rodriguez@example.com',
    phone: '+44 7700 900124',
    preferredContactMethod: 'sms',
    accessibility: {
      mobility: true,
      hearing: false,
      visual: false,
      language: 'Spanish'
    },
    appointments: [],
    missedAppointments: 0,
    riskScore: 0.1
  }
];

export const mockAnalytics: Analytics = {
  totalAppointments: 125847,
  missedAppointments: 12584,
  costSavings: 2847291,
  efficiency: 87.3,
  patientSatisfaction: 4.2,
  averageWaitTime: 18.5,
  cancellatonRate: 8.2,
  reschedulingRate: 15.7,
  monthlyTrends: [
    { month: 'Jan 2025', appointments: 10245, missed: 1024, efficiency: 85.1 },
    { month: 'Feb 2025', appointments: 11256, missed: 951, efficiency: 87.8 },
    { month: 'Mar 2025', appointments: 10987, missed: 879, efficiency: 89.2 },
    { month: 'Apr 2025', appointments: 12145, missed: 972, efficiency: 88.4 },
    { month: 'May 2025', appointments: 11789, missed: 825, efficiency: 90.1 },
    { month: 'Jun 2025', appointments: 12456, missed: 746, efficiency: 91.5 }
  ],
  trustPerformance: [
    {
      trustId: 'guy-thomas',
      trustName: "Guy's and St Thomas'",
      appointments: 25847,
      missed: 2058,
      efficiency: 92.0
    },
    {
      trustId: 'uclh',
      trustName: 'UCLH',
      appointments: 31245,
      missed: 2187,
      efficiency: 93.0
    },
    {
      trustId: 'royal-london',
      trustName: 'Barts Health',
      appointments: 28456,
      missed: 3125,
      efficiency: 89.0
    }
  ]
};

export const specialties = [
  'Cardiology',
  'Oncology',
  'Emergency Medicine',
  'Surgery',
  'Neurology',
  'Dermatology',
  'Orthopedics',
  'Gynecology',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
  'Ophthalmology',
  'ENT',
  'Urology',
  'Gastroenterology'
];

export const urgencyLevels = [
  { value: 'routine', label: 'Routine (within 18 weeks)', color: 'green' },
  { value: 'urgent', label: 'Urgent (within 2 weeks)', color: 'orange' },
  { value: 'emergency', label: 'Emergency (within 24 hours)', color: 'red' }
];