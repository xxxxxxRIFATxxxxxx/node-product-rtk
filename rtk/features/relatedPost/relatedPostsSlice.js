const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
    loading: false,
    error: "",
    posts: []
};

// create async thunk functions
const fetchRelatedPosts = createAsyncThunk("relatedPosts/fetchPost", async(postState) => {
    const keyWords = postState.post.title;
    console.log(keyWords);
    console.log("Hello");

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = response.json();
    return posts;
});

const relatedPostsSlice = createSlice({
    name: "relatedPosts",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRelatedPosts.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchRelatedPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.posts = action.payload;
        });

        builder.addCase(fetchRelatedPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.posts = [];
        });
    }
});

module.exports = relatedPostsSlice.reducer;
module.exports.fetchRelatedPosts = fetchRelatedPosts;