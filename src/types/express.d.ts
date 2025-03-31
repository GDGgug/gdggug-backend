import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

declare global {
  namespace Express {
    interface Request extends ExpressRequest {}
    interface Response extends ExpressResponse {}
  }
}

declare module 'express' {
  import * as express from 'express';
  export = express;
  export interface Request {
    params: any;
    body: any;
    query: any;
  }
  export interface Response {
    json: (body: any) => Response;
    status: (code: number) => Response;
  }
}
