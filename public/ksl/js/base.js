var isLog = getCookie("m_uid");
if (isLog != null && isLog != "null") {
    isLog = true;
} else {
    isLog = false;
}
var name = getCookie("member_username");
var READVAR = {
    isLogin: isLog,
    userName: name,
}
// å…¬ç”¨js
// æ·»åŠ åˆ°ä¹¦æž¶
$(".add-sub, .topbar-login").click(function () {
    var cls = $(this).attr('class');
    console.log(READVAR.isLogin);
    if (READVAR.isLogin) {
        if (cls == 'add-sub') {//æ·»åŠ ä¹¦æž¶
            $.post("/post.php", { action: "addbookcase", bookId: BOOKINFO.bookId }, function (data) {
                var data = JSON.parse(data);
                var content = "";
                switch (data.info) {
                    case "æ‚¨è¿˜æ²¡æœ‰ç™»å½•ï¼Œè¯·ç™»å½•åŽå†åŠ å…¥ä¹¦æž¶ï¼":
                        content = "Please log in and operate again";
                        break;
                    case "åŠ å…¥ä¹¦æž¶å¤±è´¥":
                        content = "Failed to add bookshelf";
                        break;
                    case "å·²ç»åœ¨ä¹¦æž¶ä¸­äº†":
                        content = "It's already on the shelf";
                        break;
                    case "åŠ å…¥ä¹¦æž¶æˆåŠŸ":
                        content = "Add bookshelf successfully";
                        break;
                    default:
                        content = "A maximum of 100 books can be collected";
                        break;
                }
                MessageTotast(content);
            })
        } else if (cls == 'topbar-subscribe') {
            //window.location.href = "/user/1.html";
        } else if (cls == 'topbar-login') {

        } else if (cls == 'add-sub mark') {//æ·»åŠ ä¹¦ç­¾
            $.post("/post.php", { action: "addbookmark", bookId: CHAPTER.bookIds, chapterId: CHAPTER.chapterId, chapterName: CHAPTER.chapterName },
                function (data) {
                    var data = JSON.parse(data);
                    var content = "";
                    switch (data.info) {
                        case "æ‚¨è¿˜æ²¡æœ‰ç™»å½•ï¼Œè¯·ç™»å½•åŽå†åŠ å…¥ä¹¦ç­¾ï¼":
                            content = "Please log in and bookmark!";
                            break;
                        case "ç¼ºå°‘å¿…è¦å‚æ•°":
                            content = "Missing necessary parameters";
                            break;
                        case "åŠ å…¥ä¹¦ç­¾å¤±è´¥":
                            content = "Bookmarking failed";
                            break;
                        case "å·²ç»æ”¶è—è¿‡è¯¥ç« èŠ‚äº†":
                            content = "I've already collected this chapter";
                            break;
                        default:
                            content = "Bookmarked successfully";
                            break;
                    }
                    MessageTotast(content);
                })
        }
    } else {
        $('.login_dim').addClass('fadeIn');
    }
});
$('.login_tab_hd li').click(function(){
  var idx = $(this).index();
  $(this).addClass('active').siblings().removeClass('active');
  $('.login_tab_bd .login_tab_item').hide().eq(idx).show();
})
$(".login_wrap .close_btn").click(function () {
  $('.login_dim').removeClass('fadeIn');
})
//èŽ·å–ç« èŠ‚é•¿åº¦
var chapterLength = $(".chapter-list").children("a").length;
$('#cLength').html(chapterLength + " Chapters");

//å†…å®¹é¡µå³ä¸Šè§’æŽ§åˆ¶
if (READVAR.isLogin) {
    $('.t-header-rig').removeClass('unline');
    $('.t-header-rig').addClass('line');
    if (READVAR.userName != "xsw") {
        $('._overallName').html(READVAR.userName);
    }
} else {
    $('.t-header-rig').addClass('unline');
    $('.t-header-rig').removeClass('line');
    $('._overallName').html("");
}
//åˆ é™¤ç”¨æˆ·ä¹¦æž¶
function delBookCase() {
    var str = "";
    $('.all-item-box').each(function () {
        if ($(this).hasClass("selected")) {
            str += $(this).attr('bid') + ",";
        }
    })
    if (str.length == 0) {
        return;
    }
    var bookIds = str.length > 0 ? str.substring(0, str.length - 1) : str;
    $.post("/post.php", { action: "removeallcase", bookIds: bookIds }, function (data) {
        var data = JSON.parse(data);
        var content = "";
        switch (data.info) {
            case "æ‚¨è¿˜æ²¡æœ‰ç™»å½•ï¼Œè¯·ç™»å½•åŽåˆ é™¤ï¼":
                content = "Please log in and delete!";
                break;
            case "ä¹¦æž¶ä¸­ä¸å­˜åœ¨è¯¥ä¹¦ç±":
                content = "The book does not exist on the shelf";
                break;
            default:
                content = "Delete the success";
                break;
        }
        MessageTotast(content);

        setTimeout(function () {
            if (data.status == -1) {
                location.href = "/"
            } else {
                location.reload();
            }
        }, 1000);

    })
}

//æœç´¢
$('._searchBtn').click(function () {
    var keyWord = $("#keyWord").val();
    if (keyWord.trim() != "" && keyWord != null) {
        window.location.href = "/search/" + keyWord + "/1";
    }
})
//é€€å‡ºç™»å½•
$(".logout").click(function () {
    $.post("/MemberAction.php", { action: "logout", }, function (result) {
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    })
})

//ç™»å½•
$("#submit").click(function () {
    var username = $("#username").val();
    var password = $("#password").val();
    if (username == null || username == '' || username.length < 5) {
        MessageTotast("Please enter a valid user name");
        return;
    }
    if (password == null || password == '' || password.length < 5) {
        MessageTotast("Please enter a valid password");
        return;
    }

    $.post("/MemberAction.php", { action: "login", username: username, password: password, usecookie: $("#usecookie").val() },
        function (result) {
            if (result != []) {
                if (result.status == 1) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    MessageTotast("Logon failure");
                }
            }
        })
})

//æ³¨å†Œ
$("#regsubmit").click(function () {
    var username = $("#regusername").val();
    var password = $("#regpassword").val();
    var email = $("#regemail").val();

    if (username == null || username == '' || username.length < 5) {
        MessageTotast("Please enter a valid user name");
        return;
    }

    if (password == null || password == '' || password.length < 6) {
        MessageTotast("Please enter a valid password");
        return;
    }

    $.post("/MemberAction.php", { action: "register", username: username, password: password, email: email },
        function (result) {
            if (result != []) {
                if (result.status == 1) {
                    MessageTotast("Registered successfully");
                    //$('.w-form')[1].reset();
                    $('.login_tab_hd li').eq(0).click();
                } else {
                    MessageTotast("Registration failed");
                }
            }
        })
})

function MessageTotast(text) {
    swal({
        title: "Tip",
        text: text,
        timer: 1000,
    })
}

/*if (isMobile) {
    var dltip_ls = localStorage.getItem('dltip')
    if (!dltip_ls || Date.now() - dltip_ls > 24 * 60 * 60 * 1000) {
        $('.app-download').addClass('fadeIn');
    }
}*/
$('.app-download .btn-cancal').click(function () {
    $('.app-download').removeClass('fadeIn');
    localStorage.setItem('dltip', Date.now())
})

function searchKey(e) {
    window.location.href = "/search/" + e + "/1";
}

function turnDetail(e) {
    window.location.href = e;
}