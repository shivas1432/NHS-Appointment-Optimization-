// NHS Appointment Service
class AppointmentService {
  constructor() {
    this.apiBase = process.env.NHS_API_BASE || 'https://api.nhs.uk';
  }

  async bookSlot(patientId, slotId, practitionerId) {
    try {
      const response = await fetch(`${this.apiBase}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NHS_API_TOKEN}`
        },
        body: JSON.stringify({
          patientId,
          slotId,
          practitionerId,
          status: 'confirmed'
        })
      });

      return await response.json();
    } catch (error) {
      console.error('NHS appointment booking failed:', error);
      throw error;
    }
  }

  async getAvailableSlots(specialty, date) {
    const response = await fetch(`${this.apiBase}/slots?specialty=${specialty}&date=${date}`);
    return await response.json();
  }
}

module.exports = AppointmentService;
