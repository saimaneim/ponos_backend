import { type SignOptions, sign, verify } from "jsonwebtoken";
import type { IJWT, ISignJWT, IVerifyJWT } from "@/types/jwt";

export const signJWT = ({
	payload,
	secret,
	expiresIn = "1h",
}: ISignJWT): string => sign(payload, secret, { expiresIn } as SignOptions);

export const verifyJWT = ({
	token,
	secret,
}: IVerifyJWT): IJWT | null | undefined => {
	try {
		const decoded = verify(token, secret);
		if (!decoded) return null;
		return decoded as IJWT;
	} catch (error) {
		console.log(error);
		return null;
	}
};
