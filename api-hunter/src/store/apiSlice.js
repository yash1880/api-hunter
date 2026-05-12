import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET/POST with Fetch
export const fetchRequest = createAsyncThunk(
  "api/fetchRequest",
  async ({ url, method, body }) => {
    const options = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: method === "POST" ? JSON.stringify(body) : null,
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return { data, library: "Fetch" };
  },
);

// GET/POST with Axios
export const axiosRequest = createAsyncThunk(
  "api/axiosRequest",
  async ({ url, method, body }) => {
    const response = await axios({
      method: method,
      url: url,
      data: method === "POST" ? body : null,
    });
    return { data: response.data, library: "Axios" };
  },
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    loading: false,
    data: null,
    error: null,
    currentUrl: "",
    currentMethod: "",
  },
  reducers: {
    setRequest: (state, action) => {
      state.currentUrl = action.payload.url;
      state.currentMethod = action.payload.method;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* Fetch Request Cases */
      .addCase(fetchRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* AXIOS REQUEST CASES */
      .addCase(axiosRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(axiosRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(axiosRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setRequest } = apiSlice.actions;
export default apiSlice.reducer;
