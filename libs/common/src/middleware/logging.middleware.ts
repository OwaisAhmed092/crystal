import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {

        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';
        const now = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            this.logger.log(
                `${statusCode} ${method} ${originalUrl} ${Date.now() - now}ms - ${userAgent} ${ip}`,
            );
        });

        next();
    }
}