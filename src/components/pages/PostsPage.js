import React from "react";

import Post from "../Post";

import articles from "../../components/data/articles";

class PostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      savedPosts: [],
    };

    this.getPosts = this.getPosts.bind(this);
    this.updateDB = this.updateDB.bind(this);
    this.savePost = this.savePost.bind(this);
    this.getPostsFromStorage = this.getPostsFromStorage.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts() {
    let obj = {
      store: "may-app",
      key: "bookmarks",
    };

    this.getPostsFromStorage(obj);
  }

  updateDB(obj) {
    let openRequest = indexedDB.open(obj.store, 1);

    openRequest.onupgradeneeded = () => {
      let DB = openRequest.result;
      if (!DB.objectStoreNames.contains(obj.store)) {
        DB.createObjectStore(obj.store);
      }
    };

    openRequest.onerror = function () {
      console.error("Can't create DB", openRequest.error);
    };

    openRequest.onsuccess = () => {
      let DB = openRequest.result;

      let tx = DB.transaction(obj.store, "readwrite");
      let store = tx.objectStore(obj.store);

      store.put(obj.data, obj.key);
    };
  }

  savePost(post) {
    let posts = this.state.savedPosts;

    posts.unshift(post);

    this.setState({ savedPosts: posts }, () => {
      let data = this.state.savedPosts;

      let StoreData = {
        store: "may-app",
        key: "bookmarks",
        data,
      };

      this.updateDB(StoreData);
    });
  }

  deletePost(id) {
    let posts = this.state.savedPosts;
    let index;

    if (posts) {
      index = posts.findIndex((post) => id === post.id);

      if (~index) {
        posts.splice(index, 1);

        this.setState({ savedPosts: posts }, () => {
          let data = this.state.savedPosts;

          let StoreData = {
            store: "may-app",
            key: "bookmarks",
            data,
          };

          this.updateDB(StoreData);
        });
      }
    }
  }

  getPostsFromStorage(obj) {
    let openRequest = indexedDB.open(obj.store, 1);

    openRequest.onupgradeneeded = () => {
      let DB = openRequest.result;
      if (!DB.objectStoreNames.contains(obj.store)) {
        DB.createObjectStore(obj.store);
      }
    };

    openRequest.onerror = function () {
      console.error("Can't create DB", openRequest.error);
    };

    openRequest.onsuccess = () => {
      let DB = openRequest.result;

      let tx = DB.transaction(obj.store, "readonly");
      let store = tx.objectStore(obj.store);

      let posts = store.get(obj.key);

      tx.oncomplete = () => {
        if (posts.result) {
          this.setState({ savedPosts: posts.result });
        }
      };
    };
  }

  getPosts() {
    let posts = articles;
    let savedPosts = this.state.savedPosts;
    let response = [];

    response = posts.map((post, i) => {
      return (
        <Post
          key={post.title + i}
          content={post}
          savedPosts={savedPosts}
          onPostSave={this.savePost}
          onPostDelete={this.deletePost}
        ></Post>
      );
    });

    return response;
  }

  render() {
    let posts = this.state.posts && this.getPosts();

    let posts1 = [];
    let posts2 = [];

    for (let i = 0; i < posts.length; i++) {
      if (i % 2 !== 0) posts1.push(posts[i]);
      else posts2.push(posts[i]);
    }

    return (
      <div>
        <div className="row">
          <div className="col">{posts1}</div>
          <div className="col">{posts2}</div>
        </div>
      </div>
    );
  }
}

export default PostsPage;
