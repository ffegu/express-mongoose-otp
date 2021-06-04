/*
 * Project: express-mongoose-otp
 * File Created: Friday, 4th June 2021 8:34:19 pm
 * Author: Pran Pegu (pranpegu997@gmail.com)
 */

export interface IOtp {
    otp: number;
    identifier: any;
    expires_in: Date;
    status: 'used' | 'unuse';
}
