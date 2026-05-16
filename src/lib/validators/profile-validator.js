import { z } from 'zod';

function createDate(value) {
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);
  return `${year}-${month}-${day}`;
}

function isDobValid(value) {
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);
  if (Number(day) > 31 || Number(month) > 12) {
    return false;
  }
  const date = new Date(`${year}-${month}-${day}`);
  if (Number.isNaN(date.getTime()) || date > new Date()) {
    return false;
  }
  return true;
}

const editProfileSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  dateOfBirth: z
    .string()
    .optional()
    .refine((value) => !value || value.length === 0 || (value.length === 8 && isDobValid(value)), {
      message: 'Please enter a valid date of birth (DD/MM/YYYY).',
    })
    .transform((value) =>
      value && value.length === 8 ? createDate(value) : undefined
    ),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
});

export { editProfileSchema, createDate, isDobValid };
