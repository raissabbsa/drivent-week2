import { prisma } from "@/config";
import { SendPayment } from "@/protocols";

async function findPaymentId( ticketId: number ) {
    return prisma.payment.findFirst({
        where: { ticketId }
    });
}
async function insertPayment( payment: SendPayment ) {
    return prisma.payment.create({
        data: payment
    })
}

async function setPaid( id: number ) {
    return prisma.ticket.update({
        where: { id },
        data: {
            status: "PAID"
        }
    });
}
const paymentRepository = {
    findPaymentId,
    insertPayment,
    setPaid
  };
  
export default paymentRepository;