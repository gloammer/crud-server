"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = __importDefault(require("nanoid"));
const fs_1 = require("fs");
exports.saveFileBase64ToDisk = (fileBase64, saveDirectory = "uploads") => __awaiter(void 0, void 0, void 0, function* () {
    const customFilePath = `${saveDirectory}/${nanoid_1.default.nanoid()}.${base64MimeType(fileBase64)}`;
    const base64Data = fileBase64.replace(/^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,/, "");
    yield fs_1.promises.appendFile(customFilePath, base64Data, 'base64');
    return customFilePath;
});
const base64MimeType = (base64String) => {
    let result = null;
    if (typeof base64String !== 'string') {
        return result;
    }
    const mime = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
        result = mime[1];
    }
    return result.split('/').pop();
};
//# sourceMappingURL=index.js.map