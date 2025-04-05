import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر وارد کنید."),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
