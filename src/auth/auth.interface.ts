import { UserRoleEnum } from '../users/enums/user-role.enum';

export interface JwtPayload {
  id: string;
  email?: string;
  name?: string;
  roles?: UserRoleEnum[];
}
