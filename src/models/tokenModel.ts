import { model, Schema } from 'mongoose';

const tokenSchema = new Schema({
    uuid: String,
    access_token: String,
    refresh_token: String,
    expires_in: Number,
    expires_at: Date,
});

const Token = model('Token', tokenSchema);

export const saveToken = async (
    uuid: string,
    access_token: string,
    refresh_token: string,
    expires_in: number,
    expires_at: Date
) => {
    const token = new Token({
        uuid,
        access_token,
        refresh_token,
        expires_in,
        expires_at,
    });
    await token.save();
};

export default Token;
