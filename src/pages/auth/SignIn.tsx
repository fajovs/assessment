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
import { signIn } from "@/store/slice/authSlice";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInFormFields = z.infer<typeof registerSchema>;

const SignIn = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<SignInFormFields> = ({ email, password }) => {
    dispatch(signIn({ email, password }));
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <form className="min-w-xs sm:min-w-md" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Sign-in</FieldLegend>
            <FieldDescription>
              Sign in to your account to access your account.
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
                Don't have an account?{" "}
                <Link to="/sign-up" className="font-bold">
                  Sign-up
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

export default SignIn;
