'use strict'

let postComponent = Vue.extend({
  props: {
    index: Number,
    text: String,
    image: String,
    comments: Array
  },
  data: function () {
    return {
      newComment: ''
    }
  },
  template: '\
    <li>\
      <img :src="image">\
      <p class="accept-line">{{ text }}</p>\
      <div class="comments">\
        <ul>\
          <li v-for="comment in comments">\
              <p class="accept-line">{{ comment.text }}</p>\
          </li>\
        </ul>\
        <form @submit.prevent="addComment">\
          <textarea v-model="newComment"></textarea>\
          <input type="submit" value="投稿"><br>\
        </form>\
      </div>\
    </li>\
  ',
  methods: {
    addComment: function () {
      if (this.newComment == '') {
        return
      }
      let commentItem = {
        text: this.newComment
      };
      this.$emit('add-comment', this.index, commentItem);

      // 投稿フォームのクリア
      this.newComment = '';
    }
  }
});

let app = new Vue({
  el: '#app',
  data: {
    isLogged: false,
    userID: '',
    newPost: '',
    newImage: '',
    posts: [{
      text: 'iizo!',
      image: '',
      comments: [{
        text: 'コメント１'
      },
      {
        text: 'コメント２'
      }]
    }]
  },
  components: {
    'post-component': postComponent
  },
  methods: {
    login: function () {
      this.isLogged = true;
    },
    addPost: function () {
      if (this.newPost == '') {
        return
      }
      let postItem = {
        text: this.newPost,
        image: this.newImage,
        comments: []
      };
      this.posts.unshift(postItem);

      // 投稿フォームのクリア
      this.newPost = '';
      this.newImage = '';
    },
    // 画像をData URI Schemeに変換
    onFileChange: function (e) {
      let files = e.target.files || e.dataTransfer.files;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.newImage = e.target.result;
        // console.log(this.newImage)
      };
      reader.readAsDataURL(files[0]);
    },
    addCommentToPost: function (index, comment) {
      this.posts[index].comments.push(comment);
    }
  }
});