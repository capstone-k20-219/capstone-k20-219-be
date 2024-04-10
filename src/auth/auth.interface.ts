import { UserRoleEnum } from 'src/users/enums/user-role.enum';

export interface JwtPayload {
  _id: string;
  email?: string;
  name?: string;
  roles?: UserRoleEnum[];
}
