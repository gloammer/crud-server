import nanoid from 'nanoid';
import { promises as fs } from 'fs';

export const saveFileBase64ToDisk = async (fileBase64: string, saveDirectory = "uploads") => {
    const customFilePath = `${saveDirectory}/${nanoid.nanoid()}.${base64MimeType(fileBase64)}`
    const base64Data = fileBase64.replace(/^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,/, "");
    await fs.appendFile(customFilePath, base64Data, 'base64');

    return customFilePath;
}

const base64MimeType = (base64String: string) => {
    let result = null;

    if (typeof base64String !== 'string') {
        return result;
    }

    const mime = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
        result = mime[1];
    }

    return result.split('/').pop();
}