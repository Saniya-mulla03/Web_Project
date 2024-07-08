const {z} = require("zod");

const loginSchema = z.object({
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(3, {message: "Email must be at least of 3 characters"})
    .max(255, {message: "Email must not be more than 255 characters"}),

    password: z
    .string({required_error: "Password is required"})
    .min(7, {message: "Password must be at least of 6 characters"})
    .max(1024, "Password can't be greater than 1024 characters"),
});

//creating an object schema
const signupSchema = loginSchema.extend({
    prn: z
    .string({required_error: "PRN is required"})
    .trim()
    .min(8, {message: "PRN should be of 8 characters"})
    .max(8, {message: "PRN should be of 8 characters"}),

    studentName: z
    .string({required_error: "Name is required"})
    .trim()
    .min(3, {message: "Name must be at least of 3 characters"})
    .max(255, {message: "Name must not be more than 255 characters"}),

    phone: z
    .string({required_error: "Phone is required"})
    .trim()
    .min(2, {message: "Caste must be at least of 10 characters"})
    .max(15, {message: "Caste must not be more than 20 characters"}),

});

module.exports = {signupSchema, loginSchema};