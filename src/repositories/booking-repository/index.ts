import { prisma } from "@/config";

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },    
    select: {
      id: true,
      userId: false,
      Room: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function findBookingCountByRoomId(roomId: number) {
  return prisma.booking.groupBy({
    by: ["roomId"],
    _count: {
      roomId: true,
    },
    where: {
      roomId,
    }
  });
}

async function createBooking(roomId: number, userId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,      
    }
  });
}

const bookingRepository = {
  findBookingByUserId,
  findBookingCountByRoomId,
  createBooking
};

export default bookingRepository;
