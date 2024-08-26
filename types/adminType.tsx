interface AuthResponse {
  result: {
    accessToken: string;
    refreshToken: string;
    fullName: string;
    expiration: string;
    roles: string[];
  };
  errorMessages: string[];
  isOK: boolean;
  statusCode: number;
}
