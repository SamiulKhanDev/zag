import { Injectable } from "@nestjs/common";
import { createHmac } from "crypto";

@Injectable()

export class HashService
{
    generateHash(data)
    {
        const hmac = createHmac("sha256", "a secret");
        return hmac.update(data).digest("hex")
    }
}