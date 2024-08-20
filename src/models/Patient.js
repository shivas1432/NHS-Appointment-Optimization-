// NHS Patient Data Model
class Patient {
  constructor(nhsNumber, name, dateOfBirth, address) {
    this.nhsNumber = nhsNumber;
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    this.appointments = [];
    this.medicalHistory = [];
  }

  addAppointment(appointment) {
    this.appointments.push(appointment);
  }

  getUpcomingAppointments() {
    const now = new Date();
    return this.appointments.filter(apt => new Date(apt.dateTime) > now);
  }
}

module.exports = Patient;
