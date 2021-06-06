/*
 * Project: express-mongoose-otp
 * File Created: Friday, 4th June 2021 11:39:32 am
 * Author: Pran Pegu (pranpegu997@gmail.com)
 */

import { Schema, model } from 'mongoose';

const OtpSchema = new Schema({
  otp: 'number',
  identifier: 'string',
  expires_at: 'date',
  status: 'string' // used, unuse
});

const OtpModel = model('otps', OtpSchema);

export default OtpModel;
