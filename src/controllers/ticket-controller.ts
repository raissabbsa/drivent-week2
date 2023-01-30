import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/ticket-service";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
    try{
        const data = await ticketsService.sendTicketType();
        if(!data) return res.status(200).send([]);
        return res.status(httpStatus.OK).send(data);

    } catch (error) {
      return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try{
        const data = await ticketsService.sendTicket(Number(userId));

        if(!data || data === 404) return res.sendStatus(404);
        res.status(200).send(data);

    } catch (error) {
      return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
    const id: number = req.body.ticketTypeId;
    const { userId } = req;
    if(!id) return res.sendStatus(400);

    try{
        const data = await ticketsService.postTicket( id, userId );
        if(!data || data === 404) return res.sendStatus(404);

        return res.status(201).send(data);

    } catch (error) {
      return res.sendStatus(httpStatus.NO_CONTENT);
  }
}