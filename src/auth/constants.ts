import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'GENERIC STRING AS SECRET JUST FOR TEST',
  expireTime: '1h',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
