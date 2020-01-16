'use strict'

let postComponent = Vue.extend({
  props: {
    index: Number,
    userID: String,
    text: String,
    image: String,
    comments: Array,
    posted_at: String
  },
  data: function () {
    return {
      newComment: ''
    }
  },
  template: '\
    <li class="post">\
      <strong>投稿者 : {{ userID }} </strong>\
      {{ posted_at }}<br>\
      <img class="image" :src="image"><br>\
      <p class="accept-line">{{ text }}</p>\
      <div class="comments">\
        <ul>\
          <li v-for="comment in comments">\
            <strong>{{ comment.userID }} </strong>\
            {{ comment.created_at }}<br>\
            <p class="accept-line">{{ comment.text }}</p>\
          </li>\
        </ul>\
        <form @submit.prevent="addComment">\
          <textarea v-model="newComment"></textarea>\
          <input type="submit" value="返信"><br>\
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
        text: this.newComment,
        created_at: getNowDateString()
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
      userID: 'Tokuse',
      text: 'iizo!',
      image: '',
      comments: [{
        userID: 'cat',
        text: 'コメント１',
        created_at: '2019/01/16 16:19:20'
      },
      {
        userID: 'dog',
        text: 'コメント２',
        created_at: '2019/01/16 17:19:20'
      }],
      posted_at: '2019/01/16 15:19:20'
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
      let posted_at = getNowDateString();
      let postItem = {
        userID: this.userID,
        text: this.newPost,
        image: this.newImage,
        comments: [],
        posted_at: posted_at
      };
      // 新着順に表示するため、配列の先頭に追加する
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
      comment.userID = this.userID;
      console.log(comment.userID);
      this.posts[index].comments.push(comment);
    }
  }
});

//日付から文字列に変換する関数
function getNowDateString() {

  let date = new Date();
  let year_str = date.getFullYear();
  //月だけ+1すること
  let month_str = 1 + date.getMonth();
  let day_str = date.getDate();
  let hour_str = date.getHours();
  let minute_str = date.getMinutes();
  let second_str = date.getSeconds();

  month_str = ('0' + month_str).slice(-2);
  day_str = ('0' + day_str).slice(-2);
  hour_str = ('0' + hour_str).slice(-2);
  minute_str = ('0' + minute_str).slice(-2);
  second_str = ('0' + second_str).slice(-2);

  let format_str = 'YYYY-MM-DD hh:mm:ss';
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  format_str = format_str.replace(/hh/g, hour_str);
  format_str = format_str.replace(/mm/g, minute_str);
  format_str = format_str.replace(/ss/g, second_str);

  return format_str;
};