'use strict'

// TODO:削除 デバッグ用
const img = 'data:image/gif;base64,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';

let postComponent = Vue.extend({
  props: {
    index: Number,
    userID: String,
    text: String,
    image: String,
    comments: Array,
    created_at: String
  },
  data: function () {
    return {
      newComment: ''
    }
  },
  template: '\
    <li class="post">\
      <strong>{{ userID }} </strong>\
      {{ created_at }}<br>\
      <img class="image" :src="image"><br>\
      <p class="accept-line">{{ text }}</p>\
      <div class="like">♡</div>\
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
    // TODO:初期値を設定
    posts: [{
      userID: 'Tokuse',
      text: 'Vue.js入門書の決定版! 初歩から実践までわかる!\n\nvue.jsを初歩から実践まで徹底的に解説。\n使いやすくかつ、プロダクションでも活躍するVue.jsをVue.jsコントリビューターの著者らが解説する\n一番わかりやすい入門書です。\n小規模な適用例やjQueryからの移行サンプルに加え、大規模開発を想定したアプリケーション開発も体験できます。\nVue.jsはGitHubで2017年最も人気のあったJavaScriptフレームワークに選ばれるなど大注目の技術です。',
      image: img,
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
      created_at: '2019/01/16 15:19:20'
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
        userID: this.userID,
        text: this.newPost,
        image: this.newImage,
        comments: [],
        created_at: getNowDateString()
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
      };
      reader.readAsDataURL(files[0]);
    },
    addCommentToPost: function (index, comment) {
      comment.userID = this.userID;
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