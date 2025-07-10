import { Document, Types } from "mongoose";

interface ISocialMedia {
	facebook?: string;
	twitter?: string;
	instagram?: string;
	linkedin?: string;
	youtube?: string;
}

interface IMetadata {
	description?: string;
	category?: string;
	logo?: string;
	website?: string;
	location?: string;
	email?: string;
	phone?: string;
	social?: ISocialMedia;
	tags?: string[];
	keywords?: string[];
	revenue?: string;
	employees?: string;
	founded?: string;
}

interface IEmployee {
	_id: Types.ObjectId;
	role: Types.ObjectId;
}

interface ICompany extends Document {
	tenantId: string;
	name?: string;
	owner?: Types.ObjectId;
	metadata?: IMetadata;
	createdAt: Date;
	updatedAt: Date;
	isActive: boolean;
	isDeleted: boolean;
	deletedAt?: Date | null;
	employees: Types.Array<IEmployee>;
}

export default ICompany;
