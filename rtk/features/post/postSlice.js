const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
    loading: false,
    error: "",
    post: {}
};

// create async thunk functions
const fetchPost = createAsyncThunk("post/fetchPost", async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/6");
    const post = response.json();
    return post;
});

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.post = action.payload;
        });

        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.post = {};
        });
    }
});

module.exports = postSlice.reducer;
module.exports.fetchPost = fetchPost;