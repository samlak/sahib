import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    name : {
		type: String,
		required: true,
		trim: true
	},
    firstName : {
		type: String,
		required: false,
		trim: true
	},
    lastName : {
		type: String,
		required: false,
		trim: true
	},
    email: {
		type: String,
		unique: true, 
		required: true,
		lowercase: true,
	},
    password: {
		type: String,
		required: false,
		trim: true
	}
}, {
	timestamps: true
});

const Users = models.user || model('user', userSchema);

export default Users;