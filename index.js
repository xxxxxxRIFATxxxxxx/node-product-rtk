const store = require("./rtk/app/store");
const { fetchPost } = require("./rtk/features/post/postSlice");
const { fetchRelatedPosts } = require("./rtk/features/relatedPost/relatedPostsSlice");

store.subscribe(() => console.log(store.getState()))

store.dispatch(fetchPost());
store.dispatch(fetchRelatedPosts(store.getState().post));
