import { z } from "zod";

type ResponseType = {
  error: string;
  message: string;
  statusCode: string;
};

export const apiErrorResponse = z.object({
  response: z.object({
    error: z.string(),
    message: z.string(),
    statusCode: z.number(),
  }),
  errorType: z.string(),
  explanation: z.string(),
  status: z.number(),
  statusText: z.string(),
});

export type ApiErrorResponseType = z.infer<typeof apiErrorResponse>;
