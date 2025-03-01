export type UserType = {
  id: string;
  username?: string;
  password?: string;
  email?: string;
  googleId?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  dateOfBirth: Date;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterFormType = Omit<
  UserType,
  "id" | "avatar" | "role" | "createdAt" | "updatedAt"
>;

export type LoginFormType = Pick<UserType, "username" | "password">;
