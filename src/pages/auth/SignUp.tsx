import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { signUp } from "@/store/slice/authSlice";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type RegisterFormFields = z.infer<typeof registerSchema>;

const Register = () => {
  const { loading, error } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = ({ email, password }) => {
    dispatch(signUp({ email, password }));
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <form className="min-w-xs sm:min-w-md" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Sign-up</FieldLegend>
            <FieldDescription>
              Register to create your account and start using the website.
            </FieldDescription>
            <FieldGroup>
              {error && (
                <FieldDescription className="text-red-500">
                  {error}
                </FieldDescription>
              )}
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="example@email.com"
                  type="text"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <FieldDescription className="text-red-500">
                    {errors.email?.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...register("password")}
                  id="password"
                  placeholder="**********"
                  type="password"
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <FieldDescription className="text-red-500">
                    {errors.password?.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
            <Field>
              <p>
                Already have an account?{" "}
                <Link to="/sign-in" className="font-bold">
                  Sign-in
                </Link>
              </p>
            </Field>
            <Button disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
           
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

export default Register;
