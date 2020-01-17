'use strict'

// TODO:削除 デバッグ用
const img = 'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0919/9784297100919.jpg';

// 通知用
const NOTICE_ACTION_TO_POST = 0;
const NOTICE_ACTION_TO_COMMENT = 1;
const NOTICE_BY_COMMENT = 0;
const NOTICE_BY_LIKE = 1;

let postComponent = Vue.extend({
  props: {
    index: Number,
    userID: String,
    text: String,
    image: String,
    comments: Array,
    likes: Number,
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
      <div><span class="like" @click="countupLike">♡</span>{{ likes }}</div>\
      <div class="comments">\
        <ul>\
          <li v-for="(comment, indexComment) in comments">\
            <strong>{{ comment.userID }} </strong>\
            {{ comment.created_at }}<br>\
            <p class="accept-line">{{ comment.text }}</p>\
            <div><span class="like" @click="countupCommentLike(indexComment)">♡</span>{{ comment.likes }}</div>\
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
        return;
      }
      let commentItem = {
        text: this.newComment,
        likes: 0,
        created_at: getNowDateString()
      };
      this.$emit('add-comment', this.index, commentItem);

      // 投稿フォームのクリア
      this.newComment = '';
    },
    countupLike: function () {
      this.$emit('countup-like', this.index);
    },
    countupCommentLike: function (indexComment) {
      this.$emit('countup-comment-like', this.index, indexComment);
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
      userID: 'Tanaka',
      text: 'Vue.js入門書の決定版! 初歩から実践までわかる!\n\nvue.jsを初歩から実践まで徹底的に解説。\n使いやすくかつ、プロダクションでも活躍するVue.jsをVue.jsコントリビューターの著者らが解説する\n一番わかりやすい入門書です。\n小規模な適用例やjQueryからの移行サンプルに加え、大規模開発を想定したアプリケーション開発も体験できます。\nVue.jsはGitHubで2017年最も人気のあったJavaScriptフレームワークに選ばれるなど大注目の技術です。',
      image: img,
      comments: [{
        userID: 'Masato',
        text: '読んでみたいです！',
        likes: 4,
        created_at: '2019/01/16 16:19:20'
      },
      {
        userID: 'Suzuki',
        text: '○○が分かりやすいですよね',
        likes: 3,
        created_at: '2019/01/16 17:19:20'
      }],
      likes: 5,
      created_at: '2019/01/16 15:19:20'
    }],
    notices: [{
      toUserID: 'Tanaka',
      fromUserID: 'Masato',
      toWhat: NOTICE_ACTION_TO_POST,
      how: NOTICE_BY_LIKE,
      target: 'Vue.js入門書の決定版! 初歩から実践...',
      isRead: false,
      created_at: '2019/01/17 20:19:20'
    }, {
      toUserID: 'Tanaka',
      fromUserID: 'Suzuki',
      toWhat: NOTICE_ACTION_TO_POST,
      how: NOTICE_BY_COMMENT,
      target: 'Vue.js入門書の決定版! 初歩から実践...',
      isRead: false,
      created_at: '2019/01/18 15:19:20'
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
        return;
      }
      let postItem = {
        userID: this.userID,
        text: this.newPost,
        image: this.newImage,
        comments: [],
        likes: 0,
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
    },
    countupLike: function (index) {
      this.posts[index].likes++;
    },
    countupCommentLike: function (postIndex, commentIndex) {
      this.posts[postIndex].comments[commentIndex].likes++;
    },
    notice: function () {
      this.noticeIsNotRead.forEach(notice => {
        // 通知メッセージを作成する
        let message = notice.fromUserID + 'さんから';
        switch (notice.how) {
          case NOTICE_BY_COMMENT:
            message += 'コメントされました';
            break;
          case NOTICE_BY_LIKE:
            message += 'いいねされました';
            break;
          default:
            return;
        }
        // 画面右部に通知する
        this.$notify({
          title: message,
          text: notice.target + "\n" + notice.created_at,
          duration: -1,
          group: 'top-right',
          type: 'success'
        });
        // 既読にする
        notice.isRead = true;
      });
    }
  },
  computed: {
    // ログインしているユーザーへの通知かつ未読の通知を取得する
    noticeIsNotRead: function () {
      return this.notices.filter(notice => {
        return this.userID == notice.toUserID && !notice.isRead
      })
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
