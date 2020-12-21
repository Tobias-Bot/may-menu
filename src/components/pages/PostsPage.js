import React from "react";

import Post from "../Post";

import bridge from "@vkontakte/vk-bridge";

import colors from "../data/post_colors";

import "../../styles/PostsPage.css";

class PostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      savedPosts: [],
      colors: [],

      postCards: true,
      postsLoad: true,
    };

    this.offset = 20;
    this.currOffset = 0;

    this.getRandom = this.getRandom.bind(this);
    this.getBestPhoto = this.getBestPhoto.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.updateDB = this.updateDB.bind(this);
    this.savePost = this.savePost.bind(this);
    this.getPostsFromStorage = this.getPostsFromStorage.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.getPhotosId = this.getPhotosId.bind(this);
  }

  componentDidMount() {
    this.loadPosts();
  }

  // componentDidUpdate() {
  //   if (this.props.load) {
  //     this.loadPosts();
  //     this.props.stopLoad();
  //   }
  // }

  loadPosts() {
    let obj = {
      store: "may-app",
      key: "bookmarks",
    };

    this.getPostsFromStorage(obj);

    let posts = this.state.posts;
    let newPosts = [];

    bridge
      .send("VKWebAppGetAuthToken", {
        app_id: 7646928,
        scope: "wall, groups",
      })
      .then((data) => {
        let token = data.access_token;

        bridge
          .send("VKWebAppCallAPIMethod", {
            method: "wall.get",
            request_id: this.currOffset,
            params: {
              owner_id: "-160404048",
              count: this.offset,
              offset: this.currOffset,
              filter: "owner",
              v: "5.73",
              access_token: token,
            },
          })
          .then((r) => {
            if (r.response && r.response.items[0]) {
              r.response.items.map((post) => {
                if (!post.copy_history && !post.marked_as_ads) {
                  let i = this.getRandom(0, colors.length - 1);
                  let color = colors[i];
                  let photos = this.getBestPhoto(post);

                  let data = {
                    title: post.text,
                    postColor: color,
                    id: `${post.id}`,
                    source: `https://vk.com/wall${post.owner_id}_${post.id}`,
                    photos,
                    views: post.views.count,
                    likes: post.likes.count,
                    comms: post.comments.count,
                    reps: post.reposts.count,
                  };

                  newPosts.push(data);

                  this.setState({
                    posts: [...posts, ...newPosts],
                    postsLoad: false,
                  });
                }

                return 1;
              });
            }
          });
      });

    this.currOffset += this.offset;
  }

  getPhotosId(photos) {
    let len = photos.length;
    let ids = [];

    for (let i = 0; i < len; i++) {
      if (photos[i] && photos[i].photo) {
        ids.push(photos[i].photo.id);
      }
    }

    return ids;
  }

  getBestPhoto(item) {
    let best = "";
    let res = { best: "", ids: [] };
    let nums = [];

    if (item.attachments) {
      res.ids = this.getPhotosId(item.attachments);

      if (item.attachments[0] && item.attachments[0].photo) {
        for (let key in item.attachments[0].photo) {
          if (~key.indexOf("photo_")) {
            let str = key.substring(6);
            nums.push(str);
          }
        }

        best = "photo_" + Math.max.apply(null, nums);
        res.best = item.attachments[0].photo[best];
      }

      nums = [];
    }

    return res;
  }

  getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
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
    let posts = this.state.posts;
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

    let isShow = this.state.postsLoad;

    return (
      <div>
        <div className="Loading" hidden={!isShow}>
          <div className="spinner-border" role="status"></div>{" "}
          <span className="LoadingText">секундочку...</span>
        </div>
        <div className="postsWrapper">
          <div className="row" hidden={isShow}>
            <div className="col">{posts1}</div>
            <div className="col">{posts2}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostsPage;
