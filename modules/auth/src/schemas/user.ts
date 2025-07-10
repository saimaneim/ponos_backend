import { compare, hash } from "bcryptjs";
import { model, models, Schema } from "mongoose";
import type {
	IUserDocument,
	IUserMethods,
	IUserModel,
	IUserStatics,
} from "@/types/user";

const UserSchema = new Schema<
	IUserDocument,
	IUserModel,
	IUserMethods,
	IUserStatics
>({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	company: [
		{
			type: Schema.Types.ObjectId,
			ref: "Company",
			role: {
				type: Schema.Types.ObjectId,
				ref: "Role",
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	companyOnMyOwnership: [
		{
			type: Schema.Types.ObjectId,
			ref: "Company",
		},
	],
	isActive: {
		type: Boolean,
		default: false,
	},
});

UserSchema.methods.comparePassword = async function (
	password: string,
): Promise<boolean> {
	return await compare(password, this.password);
};

UserSchema.methods.hashPassword = async function (): Promise<void> {
	this.password = await hash(this.password, 10);
};

UserSchema.statics.findEmail = async function (
	email: string,
	select: Record<string, number> = {},
): Promise<IUserDocument | null> {
	if (Object.keys(select).length > 0) {
		return await this.findOne({ email }).select(select).exec();
	}
	return await this.findOne({ email }).exec();
};

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	try {
		this.password = await hash(this.password, 10);
		next();
	} catch (error) {
		next(error as Error);
	}
});

const UserModel =
	(models.User as IUserModel) ||
	model<IUserDocument, IUserModel>("User", UserSchema);
export { UserModel };
