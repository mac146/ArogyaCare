import { z } from "zod";

enum UserRole {
  Doctor = "doctor",
  Chemist = "chemist"
}

export const signupSchema = z.object({
  role: z.nativeEnum(UserRole),   // no errorMap here
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  govId: z.string().nonempty("Government ID is required")
});
