import { Document, Model, Types } from "mongoose";

export interface IUserCompany {
	_id: Types.ObjectId;
	role: Types.ObjectId;
}

export interface IUserMethods {
	comparePassword(password: string): Promise<boolean>;
	hashPassword(): Promise<void>;
}

export interface IUserStatics {
	findEmail(email: string, select: string): Promise<IUserDocument | null>;
}

export interface IUserDocument extends Document, IUserMethods {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	company: Types.Array<IUserCompany>;
	createdAt: Date;
	updatedAt: Date;
	companyOnMyOwnership: Types.Array<Types.ObjectId>;
	isActive: boolean;
}

export interface IUserModel
	extends Model<IUserDocument, IUserMethods>,
		IUserStatics {}
