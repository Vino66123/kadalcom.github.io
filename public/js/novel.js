
function setCookie(name, value, expires, domain, path) {
    if (expires) {
        expires = new Date(+new Date() + expires);
    } else {
        expires = new Date(+new Date() + 31536000000);
    }
    var tempcookie = name + '=' + encodeURIComponent(value) +
        ((expires) ? '; expires=' + expires.toGMTString() : '') +
        ((path) ? '; path=' + path : '; path=/') +
        ((domain) ? '; domain=' + domain : '; domain=' + document.domain);

    if (tempcookie.length < 4096) {
        document.cookie = tempcookie;
    }
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
}


//é˜…è¯»è®°å½•é‡å†™
function getReadHistory() {
    var ls = localStorage.readHistory;
    if (ls) {
        ls = JSON.parse(ls)
    }
    return ls;
}
function saveReadHistory(bookparam) {
    var ls = getReadHistory();
    if (ls && ls.length) {
        for (var i in ls) {
            if (ls[i].bookid == bookparam.bookid) {
                ls.splice(i, 1);
                break;
            }
        }
        ls.unshift(bookparam)
    } else {
        ls = [bookparam]
    }
    localStorage.setItem('readHistory', JSON.stringify(ls));
}
function delReadHistory(bookid) {
    var ls = getReadHistory();
    for (var i in ls) {
        if (ls[i].bookid == bookid) {
            ls.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('readHistory', JSON.stringify(ls));
}
//begin-------æœç´¢è®°å½• cookie
function saveSearchKey(key) {
    var searchKeyArray = getKeyList();
    var strKey = "";
    if (searchKeyArray != null && searchKeyArray != undefined && searchKeyArray.length > 0) {
        for (var i = 0; i < searchKeyArray.length; i++) {
            if (key == searchKeyArray[i]) {
                searchKeyArray.splice(i,1);
            }
        }
        strKey = searchKeyArray.join(",");
        strKey += strKey=="" ? key : "," + key;
    } else {
        strKey = key;
    }
    setCookie("searchkey", strKey);
}

function getKeyList() {
    var keyList = new Array();
    var strKeyList = getCookie("searchkey");
    if (strKeyList != null && strKeyList != undefined && strKeyList.length > 0) {
        keyList = strKeyList.split(",");
    }
    return keyList;
}

function showSearchKey() {
    var keyList = getKeyList();
    var html = "";
    if (keyList.length > 0) {
        for (var i = 0; i < keyList.length; i++) {
            var key = keyList[i];
            if (key) {
                html += '<li class="history-item list-item _hisItem" key="' + key + '">';
                html += '<span class="text" onclick="searchKey(\'' + key + '\')">' + key + '</span> <span class="clear-item icon-ic_close iconfont" onclick="delKey(\'' + key + '\')"></span></li>';
            }
        }
        $(".history-list").html(html);
    }
}

function clearKeyCookies(key) {
    var keyList = new Array();
    var strKeyList = getCookie("searchkey");
    var keyStr = "";
    if (strKeyList != null && strKeyList != undefined && strKeyList.length > 0) {
        var arrKeyList = strKeyList.split(",");
        for (var i = 0; i < arrKeyList.length; i++) {
            var keyItem = arrKeyList[i];
            if (keyItem != key) {
                keyList[i] = keyItem;
            }
        }
    }
    if (keyList != null && keyList != undefined && keyList.length > 0) {
        for (var key in keyList) {
            keyStr = keyStr + "," + keyList[key];
        }
        if (keyStr.length > 0) {
            keyStr = keyStr.substring(1);
        }
    }
    setCookie("searchkey",keyStr);
}

function delKey(key) {
    clearKeyCookies(key);
    $("li[key='" + key + "']").remove();
    swal({
        title: "Tip",
        text: 'Your record has been deleted.',
        timer: 1000,
    });
}

//æ¸…é™¤å…¨éƒ¨è®°å½•
function delAll() {
    setCookie("searchkey", "");
    $(".history-list li").remove();
}
//end----------æœç´¢è®°å½• cookie

var bookUserName = getCookie("member_username");
function ShowUserName() {
    if (bookUserName != null && bookUserName != undefined) {
        document.write('<span class="person-name _overallName">' + bookUserName + '</span>');
    }
}