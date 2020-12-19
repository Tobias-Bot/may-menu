import React from "react";

// import * as firebase from "firebase/app";
// import "firebase/database";
// import { NavLink } from "react-router-dom";

import Post from "./Post";

class BookmarksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };

    this.getPostsFromStorage = this.getPostsFromStorage.bind(this);
    this.setPosts = this.setPosts.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.savePost = this.savePost.bind(this);
    this.updateDB = this.updateDB.bind(this);
  }

  componentDidMount() {
    let obj = {
      store: "may-app",
      key: "bookmarks",
    };

    this.getPostsFromStorage(obj);
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
          this.setState({ posts: posts.result });
        }
      };
    };
  }

  savePost(post) {
    let posts = this.state.posts;

    posts.push(post);

    this.setState({ savedPosts: posts }, () => {
      let data = this.state.posts;

      let StoreData = {
        store: "may-app",
        key: "bookmarks",
        data,
      };

      this.updateDB(StoreData);
    });
  }

  deletePost(id) {
    let posts = this.state.posts;
    let index;

    if (posts) {
      index = posts.findIndex((post) => id === post.id);

      if (~index) {
        posts.splice(index, 1);

        this.setState({ savedPosts: posts }, () => {
          let data = this.state.posts;

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

  setPosts() {
    let posts = this.state.posts;
    let response = [];

    response = posts.map((post, i) => {
      return (
        <Post
          key={post.title + i}
          content={post}
          savedPosts={posts}
          onPostSave={this.savePost}
          onPostDelete={this.deletePost}
        ></Post>
      );
    });

    return response;
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

  render() {
    let posts = this.setPosts();
    let list = posts.length ? (
      posts
    ) : (
      <div className="pageHint">
        Список закладок пуст
        <br/>
        <div style={{ fontSize: '50px' }}><i className="fas fa-bookmark"></i></div>
      </div>
    );

    return <div>{list}</div>;
  }
}

export default BookmarksPage;
