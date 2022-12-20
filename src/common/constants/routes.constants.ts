import { RequestMethod } from '@nestjs/common';

export const API_V1 = 'api/v1';

export const ROUTES = '/*';
export const EXCLUDED = [
  { path: `api/v1/banners/public`, method: RequestMethod.GET },
  { path: `api/v1/banners/public/:id`, method: RequestMethod.GET },

  { path: `api/v1/brands/public`, method: RequestMethod.GET },
  { path: `api/v1/brands/public/:id`, method: RequestMethod.GET },

  { path: `api/v1/categories/public`, method: RequestMethod.GET },
  { path: `api/v1/categories/public/:id`, method: RequestMethod.GET },

  { path: `api/v1/products/public`, method: RequestMethod.GET },
  { path: `api/v1/products/public/:id`, method: RequestMethod.GET },

  { path: `api/v1/sections/public`, method: RequestMethod.GET },
  { path: `api/v1/sections/public/:id`, method: RequestMethod.GET },

  {
    path: `api/v1/sub-categories/public`,
    method: RequestMethod.GET,
  },
  {
    path: `api/v1/sub-categories/public/:id`,
    method: RequestMethod.GET,
  },

  { path: `api/v1/variants/public`, method: RequestMethod.GET },
  { path: `api/v1/variants/public/:id`, method: RequestMethod.GET },

  { path: `api/v1/authentication`, method: RequestMethod.ALL },
];
