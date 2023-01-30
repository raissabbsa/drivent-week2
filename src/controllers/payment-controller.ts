import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import { Payment } from "@/protocols";
import paymentService from "@/services/payment-service";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
    const { ticketId } = req.query;
    const { userId } = req;

    if(!ticketId) return res.sendStatus(400);

    try{
        const data = await paymentService.sendPayment(Number(ticketId), userId);
        if(data === 404) return res.sendStatus(404);
        if(data === 401) return res.sendStatus(401);

        res.status(httpStatus.OK).send(data);
    }catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
    const payment: Payment = req.body;
    const { userId } = req;

    if(!payment.cardData || !payment.ticketId) return res.sendStatus(400);

    try{
        const data = await paymentService.postPayment(payment, userId);

        if(data === 404) return res.sendStatus(404);
        if(data === 401) return res.sendStatus(401);

        res.status(200).send(data);

    }catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }

}