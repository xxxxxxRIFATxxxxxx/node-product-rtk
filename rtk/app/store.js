const { configureStore } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");
const postReducer = require("../features/post/postSlice");
const relatedPostsReducer = require("../features/relatedPost/relatedPostsSlice");

// redux logger middleware
const logger = createLogger();

const store = configureStore({
    reducer: {
        post: postReducer,
        relatedPosts: relatedPostsReducer
    },
    middleware: (getDefaultMiddlewares) => {
        return getDefaultMiddlewares().concat();
    }
});

module.exports = store;