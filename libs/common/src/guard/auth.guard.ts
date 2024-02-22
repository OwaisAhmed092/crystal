import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const idToken = req.headers.authorization?.split('Bearer ')[1];

        if (!idToken) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        try {
            req.user = await admin.auth().verifyIdToken(idToken);
            return true;
        } catch (error) {
            if (error.code === 'auth/id-token-expired') {
                throw new HttpException('Token expired', HttpStatus.FORBIDDEN);
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        }
    }
}