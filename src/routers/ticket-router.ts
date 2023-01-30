import { Router } from "express";
import { getTickets, getTicketsTypes, postTickets } from "@/controllers/ticket-controller";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/types", getTicketsTypes)
    .get("/", getTickets)
    .post("/", postTickets);

export { ticketsRouter };