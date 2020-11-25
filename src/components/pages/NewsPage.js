import React from "react";

import Post from "../Post";

import groups from "../../components/data/vk_groups";
import colors from "../../components/data/post_colors";

const VK = window.VK;

class NewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      savedPosts: [],
      colors: [],

      postCards: true,
      postsLoad: true,
    };

    this.offsetBegin = 1;
    this.offset = 2;

    this.getPosts = this.getPosts.bind(this);
    this.updateDB = this.updateDB.bind(this);
    this.savePost = this.savePost.bind(this);
    this.getPostsFromStorage = this.getPostsFromStorage.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.getBestPhoto = this.getBestPhoto.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.changePostsView = this.changePostsView.bind(this);
  }

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate() {
    if (this.props.load) {
      this.loadPosts();
      this.props.stopLoad();
    }
  }

  loadPosts() {
    let obj = {
      store: "may-app",
      key: "bookmarks",
    };

    this.getPostsFromStorage(obj);

    let posts = this.state.posts;
    let newPosts = [];

    for (let g = 0; g < groups.length; g++) {
      let offset = this.offsetBegin;

      VK.Api.call(
        "wall.get",
        {
          owner_id: `-${groups[g]}`,
          offset,
          count: this.offset,
          filter: "owner",
          v: "5.73",
        },
        (r) => {
          if (r.response && r.response.items[0]) {
            r.response.items.map((post) => {
              if (!post.copy_history && !post.marked_as_ads) {
                let i = this.getRandom(0, colors.length - 1);
                let color = colors[i];
                let photos = this.getBestPhoto(post);

                let data = {
                  title: post.text,
                  postColor: color,
                  textColor: "rgba(0, 0, 0, 0.8)",
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
        }
      );
    }

    this.offsetBegin += this.offset;
  }

  getBestPhoto(item) {
    let best = "";
    let res = [];
    let nums = [];

    if (item.attachments) {
      for (let i = 0; i < 2; i++) {
        if (item.attachments[i] && item.attachments[i].photo) {
          for (let key in item.attachments[i].photo) {
            if (~key.indexOf("photo_")) {
              let str = key.substring(6);
              nums.push(str);
            }
          }

          best = "photo_" + Math.max.apply(null, nums);
          res.push(item.attachments[i].photo[best]);
        }

        nums = [];
      }
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

  changePostsView() {
    let mode = this.state.postCards;
    this.setState({ postCards: !mode });
  }

  render() {
    let posts = this.state.posts && this.getPosts();

    let postLoading = this.state.postsLoad ? (
      <div className="spinner-border" role="status"></div>
    ) : (
      ""
    );

    let posts1 = [];
    let posts2 = [];

    for (let i = 0; i < posts.length; i++) {
      if (i % 2 !== 0) posts1.push(posts[i]);
      else posts2.push(posts[i]);
    }

    return (
      <div>
        <div className="pageBar">
          {!this.state.postCards ? (
            <div className="btnInfoRe" onClick={this.changePostsView}>
              <i className="fab fa-trello"></i>
            </div>
          ) : (
            <div className="btnInfoRe" onClick={this.changePostsView}>
              <i className="fas fa-bars"></i>
            </div>
          )}
        </div>
        {postLoading}
        {!this.state.postCards ? (
          posts
        ) : (
          <div className="row">
            <div className="col">{posts1}</div>
            <div className="col">{posts2}</div>
          </div>
        )}
      </div>
    );
  }
}

export default NewsPage;
