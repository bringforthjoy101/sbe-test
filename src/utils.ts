import { FnResponseDataType } from './types';

export const handleResponse = (res: any, statusCode: number, status: boolean, message: string, data?: any) => {
    return res.status(statusCode).json({
        status,
        message,
        data,
    });
};

export const successResponse = (res: any, message: string = 'Operation successful', data?: any) => {
    return res.status(200).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (res: any, message: string = 'An error occurred', data?: any) => {
    return res.status(400).json({
        success: false,
        message,
        data,
    });
};

export const fnResponse = ({ status, message, data }: FnResponseDataType) => {
    return { status, message, data };
};

export function GenerateID(prefix: string) {
    const randomDigits = Array(8)
        .fill(0)
        .map((e, i) => (e = (Math.random() * 10) | 0));
    return prefix + randomDigits.join('');
}

export const getRandom = (length: number) => Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
