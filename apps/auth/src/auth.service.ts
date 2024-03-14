import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as admin from 'firebase-admin';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private readonly httpService: HttpService) { }

  async register(email: string, password: string): Promise<string> {
    try {
      console.log("register", email, password)
      const userRecord = await admin.auth().createUser({
        email,
        password
      });

      await admin.auth().generateEmailVerificationLink(email, {
        url: `http://localhost:3000/api/account/verify/${userRecord.uid}`,
        handleCodeInApp: true,
      });

      return userRecord.uid;
    } catch (error) {
      console.log("errorRegister", error)
      if (error.code === 'auth/email-already-exists') {
        throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: 'User already registered by this email.' });
      }
      throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: error.message });
    }
  }

  async login(email: string, password: string): Promise<any> {

    try {

      console.log("login", email, password)
      console.log("login", process.env.FIREBASE_API_KEY)
      const response = await lastValueFrom(
        this.httpService.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
          email,
          password,
          returnSecureToken: true
        })
      );

      return response.data;

    } catch (error) {
      console.log("errorLogin", error)
      throw new RpcException({ status: HttpStatus.UNAUTHORIZED, message: 'Unauthorized' });
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await admin.auth().deleteUser(id);
      return true;
    } catch (error) {
      throw new RpcException({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
  }
}
