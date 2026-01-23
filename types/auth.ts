export const AUTH_PROVIDERS = {
  GOOGLE: "google",
  GITHUB: "github",
} as const;

export type AuthProvider = (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS];

export type NextAuthError =
  | "CredentialsSignin"
  | "OAuthSignin"
  | "OAuthCallback"
  | "OAuthCreateAccountEx"
  | "EmailCreateAccountEx"
  | "Callback"
  | "OAuthAccountNotLinked"
  | "EmailSignin"
  | "default";
