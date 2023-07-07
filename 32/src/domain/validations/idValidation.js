import z from 'zod';

export const cidValidation = z.string().length(24).regex(/^[a-fA-F0-9]+$/)
export const pidValidation = z.string().length(24).regex(/^[a-fA-F0-9]+$/)

