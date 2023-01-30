import { prisma } from "@/config";
import { Ticket } from "@/protocols";

async function findTicketTypes() {
    return prisma.ticketType.findMany();
    
}

async function findTicket( id: number ) {
    return prisma.enrollment.findFirst({
        where: { 
            userId: id
         }
    });
}

async function findTicketEnrollment( id: number ) {
    return prisma.ticket.findFirst({
        where: { 
            enrollmentId: id
         }
    });
}

async function findTicketTypeId( id: number ) {
    return prisma.ticketType.findUnique({
        where: { id }
    }
    );
}

async function findTicketId( id: number ) {
    return prisma.ticket.findUnique({
        where: { id }
    }
    );
}

async function findEnrollmentId( id: number ) {
    return prisma.enrollment.findUnique({
        where: { id }
    }
    );
}

async function insertTicket( ticketTypeId: number, enrollmentId: number ) {
    return prisma.ticket.create({
        data: {
            ticketTypeId,
            enrollmentId,
            status: "RESERVED"
        }
    });
}

async function findEnrollmentUserId( id: number ) {
    return prisma.enrollment.findFirst({
        where: {
            userId: id
        }
    });
}


const ticketRepository = {
    findTicketTypes,
    findTicket,
    findTicketTypeId,
    findEnrollmentId,
    findTicketId,
    insertTicket,
    findTicketEnrollment,
    findEnrollmentUserId
  };
  
  export default ticketRepository;