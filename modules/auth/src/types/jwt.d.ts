export interface IJWT {
	userId: string;
	email: string;
	role: string;
	iat: number;
	exp: number;
	companyId: string;
}

export interface ISignJWT {
	payload: string | object | Buffer;
	secret: string;
	expiresIn?: string;
}

export interface IVerifyJWT {
	token: string;
	secret: string;
}
