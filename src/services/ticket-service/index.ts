import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, requestError } from "@/errors";
import { Ticket, TicketType } from "@/protocols";

async function sendTicketType() {
    const result: TicketType[] = await ticketRepository.findTicketTypes();

    return result;
}

async function sendTicket( id: number ) {
    const enrollment = await ticketRepository.findTicket( id );
    if(!enrollment) return 404;
    const ticket = await ticketRepository.findTicketEnrollment( enrollment.id );
    if (!ticket ) return 404;


    const ticketVerification = await ticketRepository.findTicketTypeId(ticket.ticketTypeId);
    const enrollmentVerification = await ticketRepository.findEnrollmentId(ticket.enrollmentId);

    if ( !enrollmentVerification) return 404;

    const newResult = {
        id: ticket.id,
        status: ticket.status,
        ticketTypeId: ticket.ticketTypeId,
        enrollmentId: ticket.enrollmentId,
        TicketType: ticketVerification,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
    };
    return newResult;
}

async function postTicket(ticketTypeId: number, userId: number) {
    const enrollment = await ticketRepository.findEnrollmentUserId(userId);
    if(!enrollment) return 404;

    const ticket = await ticketRepository.insertTicket(ticketTypeId, enrollment.id);
    const ticketType = await ticketRepository.findTicketTypeId(ticketTypeId);
    const result = {
        id: ticket.id,
        status: ticket.status,
        ticketTypeId: ticket.ticketTypeId,
        enrollmentId: ticket.enrollmentId,
        TicketType: ticketType,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
    };
    return result;
}

const ticketsService = {
    sendTicketType,
    sendTicket,
    postTicket
  };
  
  export default ticketsService;