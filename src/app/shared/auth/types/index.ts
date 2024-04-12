export interface Auth {
  id: number | null;
  isAuthenticated: boolean;
  authorization: Authorization | null;
}
export interface Authorization {
  accessToken: {
    name: string;
    abilities: Array<string>;
    expires_at: string;
    tokenable_id: number;
    tokenable_type: string;
    updated_at: Date;
    created_at: Date;
    id: number;
  };
  plainTextToken: any;
}
