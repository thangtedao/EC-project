import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            max: 50,
        },
        role: { 
            type: String,
            enum: ['user', 'admin'],
            default: "user"
        },
        location: String
    },
    {timestamps: true}
)

// get user info without passwword
UserSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model("User", UserSchema);
export default User;