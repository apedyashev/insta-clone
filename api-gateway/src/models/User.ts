import { IsDefined } from 'class-validator';

export class User {
  @IsDefined()
  country: string;
  @IsDefined()
  city: string;
}