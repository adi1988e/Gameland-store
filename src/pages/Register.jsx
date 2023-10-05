import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-hot-toast";
import { registerUser } from "../features/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      store.dispatch(registerUser(data));
      toast.success("account created successfully");
      return redirect("/login");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="name" name="name" />
        <FormInput type="email" label="email" name="email" />

        <FormInput type="number" label="phone" name="phone" />

        <FormInput type="text" label="city" name="city" />
        <FormInput type="text" label="street" name="street" />
        <FormInput type="text" label="building" name="building" />
        <FormInput type="text" label="appartment" name="appartment" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
