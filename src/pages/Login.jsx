import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
export const action =
  (store) =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      await store.dispatch(loginUser(data));
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((store) => store.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [user, navigate, isAuthenticated]);

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
