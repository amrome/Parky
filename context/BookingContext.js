import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parkingSlots as initialParkingSlots } from "../utils/parkingData";

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [parkingSlots, setParkingSlots] = useState(initialParkingSlots);
  const [loading, setLoading] = useState(true);

  // Load bookings from AsyncStorage on mount
  useEffect(() => {
    loadBookings();
  }, []);

  // Save bookings to AsyncStorage whenever they change
  useEffect(() => {
    if (!loading) {
      saveBookings();
      updateParkingSlotsStatus();
    }
  }, [bookings, loading]);

  const updateParkingSlotsStatus = () => {
    // Get all active bookings
    const activeBookings = bookings.filter((b) => b.status === "active");
    const bookedSlotIds = new Set(activeBookings.map((b) => b.slotId));

    // Update parking slots status based on active bookings
    setParkingSlots((prevSlots) =>
      prevSlots.map((slot) => ({
        ...slot,
        status: bookedSlotIds.has(slot.id) ? "occupied" : "available",
      }))
    );
  };

  const loadBookings = async () => {
    try {
      const savedBookings = await AsyncStorage.getItem("@bookings");
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveBookings = async () => {
    try {
      await AsyncStorage.setItem("@bookings", JSON.stringify(bookings));
    } catch (error) {
      console.error("Error saving bookings:", error);
    }
  };

  const createBooking = (bookingData) => {
    const newBooking = {
      id: `BK-${Date.now()}`,
      bookingNumber: `#${Math.floor(100000 + Math.random() * 900000)}`,
      status: "active",
      createdAt: new Date().toISOString(),
      ...bookingData,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Immediately update the slot status to occupied
    setParkingSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === bookingData.slotId ? { ...slot, status: "occupied" } : slot
      )
    );

    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    // Find the booking to get the slot ID
    const booking = bookings.find((b) => b.id === bookingId);

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
      )
    );

    // Free up the slot when booking is cancelled
    if (booking) {
      setParkingSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.id === booking.slotId ? { ...slot, status: "available" } : slot
        )
      );
    }
  };

  const extendBooking = (bookingId, additionalHours) => {
    setBookings((prev) =>
      prev.map((booking) => {
        if (booking.id === bookingId) {
          const newDuration = booking.duration + additionalHours;
          const additionalCost = additionalHours * booking.hourlyRate;
          return {
            ...booking,
            duration: newDuration,
            totalCost: booking.totalCost + additionalCost,
          };
        }
        return booking;
      })
    );
  };

  const getActiveBookings = () => {
    return bookings.filter((booking) => booking.status === "active");
  };

  const getPastBookings = () => {
    return bookings.filter((booking) => booking.status !== "active");
  };

  const getSlotById = (slotId) => {
    return parkingSlots.find((slot) => slot.id === slotId);
  };

  const getAvailableSlots = () => {
    return parkingSlots.filter((slot) => slot.status === "available");
  };

  const getOccupiedSlots = () => {
    return parkingSlots.filter((slot) => slot.status === "occupied");
  };

  const getAvailabilityStats = () => {
    const total = parkingSlots.length;
    const activeBookings = bookings.filter((b) => b.status === "active");

    // Calculate slots with active reservations
    const reservedSlotIds = new Set(activeBookings.map((b) => b.slotId));

    // Count fully booked slots (red)
    let occupied = 0;
    // Count slots with some bookings but not fully booked (orange)
    let reserved = 0;

    reservedSlotIds.forEach((slotId) => {
      if (isSlotFullyBooked(slotId)) {
        occupied++;
      } else {
        reserved++;
      }
    });

    const available = total - reserved - occupied;

    return {
      total,
      available,
      reserved,
      occupied,
      availabilityPercentage: ((available / total) * 100).toFixed(1),
    };
  };

  const getSlotBooking = (slotId) => {
    // Find the CURRENT active booking for this slot (happening right now)
    const now = new Date();
    return bookings.find(
      (booking) =>
        booking.slotId === slotId &&
        booking.status === "active" &&
        new Date(booking.startTime) <= now &&
        new Date(booking.endTime) > now
    );
  };

  const getSlotBookings = (slotId) => {
    // Get ALL active bookings for this slot (past, present, and future)
    return bookings.filter(
      (booking) => booking.slotId === slotId && booking.status === "active"
    );
  };

  const checkTimeConflict = (slotId, startTime, endTime) => {
    // Check if the new booking time conflicts with existing bookings
    const slotBookings = getSlotBookings(slotId);
    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);

    for (const booking of slotBookings) {
      const existingStart = new Date(booking.startTime);
      const existingEnd = new Date(booking.endTime);

      // Check if times overlap
      if (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      ) {
        return true; // Conflict found
      }
    }
    return false; // No conflict
  };

  const isSlotFullyBooked = (slotId) => {
    // Simplified logic: Check if slot has 3 or more active bookings within next 24 hours
    // This indicates the slot is heavily booked and should show as red
    const slotBookings = getSlotBookings(slotId);
    if (slotBookings.length === 0) return false;

    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Filter bookings that are within the next 24 hours
    const upcomingBookings = slotBookings.filter((booking) => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);

      // Include booking if it overlaps with the next 24 hours
      return bookingEnd > now && bookingStart < next24Hours;
    });

    console.log(
      `[isSlotFullyBooked] ${slotId} has ${upcomingBookings.length} upcoming bookings in next 24h`
    );

    // If 3 or more bookings in next 24 hours, consider it fully booked (RED)
    const isFullyBooked = upcomingBookings.length >= 3;

    if (isFullyBooked) {
      console.log(
        `[isSlotFullyBooked] ${slotId} is FULLY BOOKED (RED) - ${upcomingBookings.length} bookings`
      );
    }

    return isFullyBooked;
  };

  const value = {
    bookings,
    parkingSlots,
    loading,
    createBooking,
    cancelBooking,
    extendBooking,
    getActiveBookings,
    getPastBookings,
    getSlotById,
    getAvailableSlots,
    getOccupiedSlots,
    getAvailabilityStats,
    getSlotBooking,
    getSlotBookings,
    checkTimeConflict,
    isSlotFullyBooked,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
