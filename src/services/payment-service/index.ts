import { Payment } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function sendPayment(ticketId: number, userId: number) {

    const ticketExist = await ticketRepository.findTicketId(Number(ticketId));
    if(!ticketExist) return 404;

    const enrollmentExist = await ticketRepository.findEnrollmentId(ticketExist.enrollmentId);
    if(enrollmentExist.userId !== userId) return 401;

    const payment = await paymentRepository.findPaymentId(Number(ticketId));

    return payment;
}

async function postPayment(payment: Payment, userId: number) {
    const ticketExist = await ticketRepository.findTicketId(Number(payment.ticketId));
    if(!ticketExist) return 404;

    const enrollmentExist = await ticketRepository.findEnrollmentId(ticketExist.enrollmentId);
    if(enrollmentExist.userId !== userId) return 401;

    const ticketType = await ticketRepository.findTicketTypeId(ticketExist.ticketTypeId);
    const cardLastDigits = payment.cardData.number.toString().slice(-4);

    const paymentToBeSend = {
        ticketId: payment.ticketId,
        value: ticketType.price,
        cardIssuer: payment.cardData.issuer,
        cardLastDigits: cardLastDigits,
    }
    await paymentRepository.insertPayment(paymentToBeSend);
    await paymentRepository.setPaid(payment.ticketId);

    const getPayment = await paymentRepository.findPaymentId(Number(payment.ticketId));
    return getPayment;
}

const paymentService = {
    sendPayment,
    postPayment
};
  
  export default paymentService;