// In-memory mock database for bookings
// WARNING: This is only for UI demonstration purposes.

export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'DRIVER_ARRIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface MockBooking {
  id: number;
  status: BookingStatus;
  service_type_code: string;
  pickup_address: string;
  dropoff_address: string;
  payment_method: string;
  created_at: string;
  last_updated: number;
  driver: any | null;
  rating?: any;
}

declare global {
  var mockBooking: MockBooking | null;
}

if (!global.mockBooking) {
  global.mockBooking = null;
}

export const getMockBooking = () => {
  if (!global.mockBooking) return null;
  
  // Auto-advance status for demonstration
  const now = Date.now();
  const timeElapsed = now - global.mockBooking.last_updated;
  
  // Advance every 10 seconds for demo purposes
  const advanceInterval = 10000;

  if (timeElapsed > advanceInterval) {
    if (global.mockBooking.status === 'PENDING') {
      global.mockBooking.status = 'ACCEPTED';
      global.mockBooking.driver = {
        first_name: "Ahmet",
        rating: 4.9,
        vehicle: { plate: "34 AKA 034", make: "Toyota", model: "Corolla" }
      };
      global.mockBooking.last_updated = now;
    } else if (global.mockBooking.status === 'ACCEPTED') {
      global.mockBooking.status = 'DRIVER_ARRIVED';
      global.mockBooking.last_updated = now;
    } else if (global.mockBooking.status === 'DRIVER_ARRIVED') {
      global.mockBooking.status = 'IN_PROGRESS';
      global.mockBooking.last_updated = now;
    } else if (global.mockBooking.status === 'IN_PROGRESS') {
      global.mockBooking.status = 'COMPLETED';
      global.mockBooking.last_updated = now;
    }
  }

  return global.mockBooking;
};

export const createMockBooking = (data: any) => {
  global.mockBooking = {
    id: Math.floor(Math.random() * 90000) + 10000,
    status: 'PENDING',
    service_type_code: data.service_type_code || 'TAKSI_STANDARD',
    pickup_address: data.pickup_address,
    dropoff_address: data.dropoff_address,
    payment_method: data.payment_method || 'CASH',
    created_at: new Date().toISOString(),
    last_updated: Date.now(),
    driver: null
  };
  return global.mockBooking;
};

export const cancelMockBooking = () => {
  if (global.mockBooking) {
    global.mockBooking.status = 'CANCELLED';
    global.mockBooking.last_updated = Date.now();
  }
  return global.mockBooking;
};

export const rateMockBooking = (ratingData: any) => {
  if (global.mockBooking) {
    global.mockBooking.rating = ratingData;
    global.mockBooking.last_updated = Date.now();
  }
  return global.mockBooking;
};

export const clearMockBooking = () => {
  global.mockBooking = null;
};
