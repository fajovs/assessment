import { supabase } from "@/supabaseClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



interface User {
    email?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  session: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  session: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.session = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.session = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.session = false;
      }).addCase(signIn.pending, (state) =>{
        state.loading = true;
        state.error = null;
        state.session = false;
      }).addCase(signIn.fulfilled, (state, action) =>{
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      }).addCase(signIn.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const signUp = createAsyncThunk<User | null, {email: string, password: string}, {rejectValue: string}>(
  "auth/signUp",
  async ({ email, password }: { email: string; password: string } ,{rejectWithValue}) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return rejectWithValue(error.message);
    return data.user;
  },
);

export const signIn = createAsyncThunk<User | null, {email: string, password: string}, {rejectValue: string}>(
    "auth/signIn",
    async({email, password }: {email: string, password: string}, {rejectWithValue}) =>{
        const {data, error} = await supabase.auth.signInWithPassword({email, password});
        if( error) return rejectWithValue(error.message);
        return data.user;
    }
)

export default authSlice.reducer;
