import bcrypt from 'bcrypt';
import { Document, Model, model, Schema } from 'mongoose';
import Role from '../helpers/role';
export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    role: string;
    createdDate: Date;
    // hasSamePassword(candidatePassword: string): Promise<boolean>;
    hasSamePassword(candidatePassword: string): boolean;
};

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        required: 'Password is required'
    },
    role: {
        type: String,
        enum: Object.values(Role)
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
  
userSchema.methods.hasSamePassword = function(requestedPassword) {
    return bcrypt.compareSync(requestedPassword, this.password);
}

// userSchema.methods.hasSamePassword = function(requestedPassword: string): Promise<boolean> {
//     let password = this.password;
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(requestedPassword, password, (err, success) => {
//             if (err) return reject(err);
//             return resolve(success);
//         });
//     });
// }
  
userSchema.pre<IUser>('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

const User: Model<IUser> = model("User", userSchema);
export default User;