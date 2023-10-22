import { model, Schema } from 'mongoose';

const tokenSchema = new Schema({
    uuid: String,
    access_token: String,
});

const Token = model('Token', tokenSchema);

export const saveToken = async (uuid: string, access_token: string) => {
    const token = new Token({ uuid, access_token });
    await token.save();
};

export default Token;
