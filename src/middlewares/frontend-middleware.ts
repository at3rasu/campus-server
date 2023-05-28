import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import path from 'path';

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    res.sendFile('index.html', { root: 'build' });
  }
}