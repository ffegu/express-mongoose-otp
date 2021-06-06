/*
 * Project: express-mongoose-otp
 * File Created: Friday, 4th June 2021 11:44:58 am
 * Author: Pran Pegu (pranpegu997@gmail.com)
 */

import { CallbackError } from 'mongoose';
import { OtpModel } from './models';
import { IOtp } from './types';

const genOtp = (length: number = 6): number => {
  return Math.floor(Math.random() * (Math.pow(10, length - 1) * 9)) + Math.pow(10, length - 1);
};

export const generateOtp = (identifier: any, expiresIn?: number, length: number = 6): Promise<any> => {
  const otp = genOtp(length); // generate the otp
  const addTime = expiresIn ? Number(expiresIn) : 30; // 😛😛 i am stupid => o .. will make this batter
  const expiresAt = new Date().setMinutes(new Date().getMinutes() + addTime); // the otp only valid for 30 minutes if not input
  return new Promise((resolve, reject) => {
    OtpModel.create({
      identifier,
      otp,
      expiresAt,
      status: 'unuse'
    })
      .then((doc: any) => {
        resolve(doc);
      })
      .catch((error: Error) => reject(error));
  });
};

export const verifyOtp = (identifier: any, otp: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    OtpModel.findOne({ identifier, otp }, (error: CallbackError, doc: any) => {
      if (error || !doc) reject(error);
      else {
        // check if the otp already used
        if (doc.status === 'used') reject(new Error('otp already used'));
        else {
          // update the otp as used now
          doc.status = 'used';
          doc.save(); // we can also validate here for sure save
          resolve(doc);
        }
      }
    });
  });
};
