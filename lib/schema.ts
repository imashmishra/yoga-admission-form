import { z } from 'zod'

export const FormDataSchema = z.object({
  goals: z.array(z.string()).nonempty(),
  foodPlan: z.string().min(1, 'This is required field'),
  foodPlanEffective: z.string().min(1, 'This is required field'),
  weight: z.string().min(1, 'This is required field'),
  height: z.string().min(1, 'This is required field'),
  activityLevel: z.string().min(1, 'This is required field'),
  sleepHour: z.string().min(1, 'This is required field'),
  foodPreference: z.string().min(1, 'This is required field'),
})
