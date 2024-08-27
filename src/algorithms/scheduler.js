// NHS Appointment Scheduling Optimization
const optimizeAppointments = (availableSlots, requests) => {
  // Priority-based scheduling algorithm
  const prioritizedRequests = requests.sort((a, b) => {
    // Higher priority for urgent cases
    if (a.urgency !== b.urgency) {
      return b.urgency - a.urgency;
    }
    // Earlier requested dates get priority
    return new Date(a.requestedDate) - new Date(b.requestedDate);
  });

  const scheduledAppointments = [];
  
  prioritizedRequests.forEach(request => {
    const suitableSlot = findBestSlot(availableSlots, request);
    if (suitableSlot) {
      scheduledAppointments.push({
        patient: request.patient,
        slot: suitableSlot,
        practitioner: suitableSlot.practitioner
      });
    }
  });

  return scheduledAppointments;
};

const findBestSlot = (slots, request) => {
  return slots.find(slot => 
    slot.specialty === request.specialty &&
    slot.available === true &&
    new Date(slot.dateTime) >= new Date(request.earliestDate)
  );
};

module.exports = { optimizeAppointments, findBestSlot };
