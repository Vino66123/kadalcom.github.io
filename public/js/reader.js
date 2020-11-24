$(".open-chapter-btn").click(function () {
    var hasCls = $(this).hasClass('open');
    if (hasCls) {
        $(this).removeClass('open');
        $('body').removeClass('open-chapters')
    } else {
        $(this)
            .addClass('open')
            .siblings()
            .removeClass('open');
        $('body')
            .removeClass('open-comments')
            .addClass('open-chapters')
    }
});
$(".open-comment-btn").click(function () {
    var hasCls = $(this).hasClass('open');
    if (hasCls) {
        $(this).removeClass('open');
        $('body').removeClass('open-comments')
    } else {
        $(this)
            .addClass('open')
            .siblings()
            .removeClass('open');
        $('body')
            .removeClass('open-chapters')
            .addClass('open-comments')
    }
});
$("._closeNav").click(function () {
    $('body')
        .removeClass("open-chapters")
        .removeClass("open-comments"),
    $(".open-btn").removeClass("open")
})
// 2020-2-26 19: 17: 42
if (!localStorage.getItem('guide') && isMobile) {
    $('.guide-wrapper').show();

    $('.guide-btn').click(function () {
        $('.guide-wrapper').hide();
        localStorage.setItem('guide', '1')
    })
}
if (isMobile) {
    $('.entity').click(function () {
        $("body").toggleClass("show_bar"),
        $(".share-entrance,.font-tool").removeClass("fadeIn")
    })
}
$('.icon-chapter-list').click(function () {
    $(".chapter-tool").addClass("active");
})
$('.chapter-dim').click(function () {
    $('.chapter-tool').removeClass("active");
});
$('.icon-read-model').click(function () {
    $('html').toggleClass("dark"),
    $('html').hasClass('dark')
        ? localStorage.setItem('model', 'dark')
        : localStorage.setItem('model', '');
})
$('.share-entrance').click(function () {
    $(this).toggleClass('fadeIn')
})

$('.icon-read-font').click(function () {
    $('.font-tool').addClass('fadeIn')
})
setTimeout(function () {
    var family = localStorage.getItem('family') || 'fontRoboto'
    $('.style-btn[data-style="' + family + '"]').click();
}, 10);
$('.style-btn').click(function () {
    if (!$(this).hasClass('active')) {
        var t = $(this).attr('data-style');
        $('body').attr('data-style', t),
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active')
        localStorage.setItem('family', t)
    }
})
$('.font-btn').click(function () {
    var t = $(this).index();
    setSize(t)
}),
$('.icon-size').click(function () {
    var t = $('.size-wrapper').attr('data-size');
    t = Math.round(t || 1),
    $(this).hasClass("icon-size-plus")
        ? t += 1
        : t -= 1,
    setSize(t)
});

setSize((localStorage.getItem('size') || 16) - 15);
function setSize(s) {
    var s = parseInt(s);
    if (s >= 0 && s <= 5) {
        $('.font-btn').each(function (t, a) {
            t < s
                ? $(this)
                    .addClass("actived")
                    .removeClass("active")
                : s < t
                    ? $(this)
                        .removeClass("actived")
                        .removeClass("active")
                    : $(this)
                        .addClass("active")
                        .removeClass("actived"),
            $(".percentage").css("width", Math.round(20 * s) + "%")
        })
        $('.size-wrapper').attr('data-size', s)
        $('body').attr('data-size', 15 + s);
        localStorage.setItem('size', 15 + s);
    }
}

function addHit(bookid) {
    $.post("/post.php", {
        action: "addhit",
        bookid: bookid
    });
}

if (typeof addHit != 'undefined' && addHit instanceof Function) {
    addHit(CHAPTER.bookIds);
}

$(function () {
    $(".chapter-list-item[cid=" + CHAPTER.bookIds + "]").addClass('active')
})

saveReadHistory(
    {bookid: CHAPTER.bookIds, bookname: CHAPTER.bookName, chapterid: CHAPTER.chapterId, bookcover: CHAPTER.bookCover, bookurl: window.location.pathname}
)
/*滚动加载*/
$(function () {
    preloading.init()
})

var preloading = {
    nextData: '',
    docHeight: isMobile
        ? $('#section-list-wp').height()
        : $(document).height(), //内容总高度
    winHeight: $(window).height(), //屏幕可视高度
    init: function () {
        this.ajaxGetNextChapter(CHAPTER.bookIds, CHAPTER.bookNextChapterId);
        var scrllTarget = isMobile
            ? $('.entity')
            : $(window);
        var curScrollTopTarget = isMobile
            ? $('.entity')
            : $(document)
        scrllTarget
            .scroll(function () {
                var gap = preloading.docHeight - preloading.winHeight - curScrollTopTarget.scrollTop() // 距离底部高度
                if (gap < 300) {
                    preloading.loadNextHtml()
                }
                if (gap <= 1) {
                    /*没有下一章*/
                    $('.section-end').show();
                }
            })
            .resize(function () {
                preloading.winHeight = $(window).height();
            })

    },
    ajaxGetNextChapter: function (bid, cid) {
        this.nextData = 'ajaxGetNextChapter()';
        var data = {
            action: 'nextchapter',
            bookid: bid,
            chapterid: cid
        }
        $.getJSON('/memberaction.php', data, function (res) {
            if (res && res.data && res.data.NextChapterPage) {
                preloading.nextData = res.data;
                /*如果第一次进入时，内容较少，直接加载下一章内容*/
                var txtHei = $('#section-list-wp').height()
                if (txtHei < preloading.winHeight - 30) {
                    preloading.loadNextHtml()
                }
            }
        })
    },
    loadNextHtml: function () {
        if (this.nextData.ChapterContents) {
            var html = '<section class="section"><h2 class="chapter-title" >' + this.nextData.ChapterName +
                    '</h1><div class="chapter-entity">' + this.nextData.ChapterContents + '</div></' +
                    'section >'
            $('#section-list-wp').append(html);
            this.docHeight = isMobile
                ? $('#section-list-wp').height()
                : $(document).height();
            this.winHeight = $(window).height();
            //阅读记录
            saveReadHistory(
                {bookid: CHAPTER.bookIds, bookname: CHAPTER.bookName, chapterid: this.nextData.ChapterId, bookcover: CHAPTER.bookCover, bookurl: this.nextData.ChapterListUrl}
            )
            CHAPTER.bookNextChapterId = this
                .nextData
                .NextChapterId
                this
                .ajaxGetNextChapter(CHAPTER.bookIds, CHAPTER.bookNextChapterId);
        }
    }
}