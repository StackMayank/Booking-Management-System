import dayjs from 'dayjs';
import { z } from 'zod';

const searchFormSchema = z.object({
  city: z.string().nonempty(),
  bookingDates: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .superRefine((val, ctx) => {
      const fromOk = val.from != null && dayjs(val.from).isValid();
      const toOk = val.to != null && dayjs(val.to).isValid();
      if (!fromOk || !toOk) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please add your travel dates',
          path: ['from'],
        });
      }
    }),
  roomsCount: z.number().min(1).max(10),
});

export { searchFormSchema };
