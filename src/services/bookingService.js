import BookingRepository from "@/repositories/bookingRepository";

export class BookingService {
  static async createBooking(chargerId, slotId) {
    return BookingRepository.createBooking(chargerId, slotId);
  }

  static async listMyBookings(pagination) {
    return BookingRepository.listMyBookings(pagination);
  }
}
