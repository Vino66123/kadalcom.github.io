$(".tab-item").click(function() {
    $(this).addClass("active").siblings().removeClass("active"),
    $(this).hasClass("tab-content") ? $("body").addClass("tab-box-chapter") : $("body").removeClass("tab-box-chapter")
  });
  
  $(".sort-icon").click(function () {
      var t = $(".chapter-list").find(".chapter-item"), e = $.makeArray(t);
      $(this).toggleClass("reverse"), e.reverse(), $(e).appendTo($(".chapter-list"));
  })
  
  //评分
  var vote = 8, vote_wid = $('.score-box').width();
  
  $('.score-box').mousemove(function (e) {
      var x = e.originalEvent.layerX;
      var per = parseInt(x / vote_wid * 10);
  
      if (per >= 9) {
          per = 10;
      } else if (per >= 8 && per < 9) {
          per = 9;
      } else if (per >= 7 && per < 8) {
          per = 8;
      } else if (per >= 6 && per < 7) {
          per = 7;
      } else if (per >= 5 && per < 6) {
          per = 6;
      } else if (per >= 4 && per < 5) {
          per = 5;
      } else if (per >= 3 && per < 4) {
          per = 4;
      } else if (per >= 2 && per < 3) {
          per = 3;
      } else if (per >= 1 && per < 2) {
          per = 2;
      } else if (per >= 0 && per < 1) {
          per = 1;
      }
      vote = per;
      $('.score-box .top').width(per * 10 + '%');
      $('.score-box .score').html(vote.toFixed(1))
  }).mouseleave(function () {
      var def = $('.score-box .top').attr('score')
      $('.score-box .top').width(def * 10 + '%');
  }).click(function () {
      //调用评分接口
      if (READVAR.isLogin) {
          $.post("/MemberAction.aspx", { action: "addvote", bookId: BOOKINFO.bookId, score: vote }, function (data) {
              swal({
                  title: "Tip",
                  text: data.info,
                  timer: 2000,
              });
          })
      } else {
          swal({
              title: "Tip",
              text: 'You are not logged in!'
          },
              function () {
              $(".add-sub, .topbar-login").click()
          });
      }
  })