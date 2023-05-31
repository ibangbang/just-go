console.log(`Just Go is running O(∩_∩)O~`);
console.log(`To save time is to lengthen life.`);
const domainConfig = [
    {
        'domain': 'zhihu.com',
        'name': '知乎',
        'pref': 'https://link.zhihu.com/?target=',
        'divider': 'target=',
        'times_key': 'times_zhihu.com',
        'pages_key': 'pages_zhihu.com',
    },
    {
        'domain': 'jianshu.com',
        'name': '简书',
        'pref': 'https://links.jianshu.com/go?to=',
        'divider': 'to=',
        'times_key': 'times_jianshu.com',
        'pages_key': 'pages_jianshu.com',
    },
    {
        'domain': 'juejin.cn',
        'name': '稀土掘金',
        'pref': 'https://link.juejin.cn/?target=',
        'divider': 'target=',
        'times_key': 'times_juejin.cn',
        'pages_key': 'pages_juejin.cn',
    },
    {
        'domain': 'csdn.net',
        'name': 'CSDN',
        'pref': 'https://link.csdn.net/?target=',
        'divider': 'target=',
        'times_key': 'times_csdn.net',
        'pages_key': 'pages_csdn.net',
    },
];

function findMatchedDomainConfig (url) {
    return domainConfig.find(e => {
        return url.endsWith(e['domain']);
    });
}

function isTargetUrl (href, config) {
    return href.startsWith(config['pref']);
}

function decodeTargetUrl (href, config) {
    var splitStrs = href.split(config['divider']);
    return decodeURIComponent(splitStrs[1]);
}

// 更新 just go times
function increateGoTimes (domainConfig, count) {
    var key = domainConfig['times_key'];
    chrome.storage.sync.get({ [key]: 0 }, (res) => {
        // console.log('last times: ', JSON.stringify(res))
        var nextTimes = res[key] ? res[key] + count : 1;
        var saveObj = { [key]: nextTimes };
        chrome.storage.sync.set(saveObj);
    });
}

// 更新 pages
function increatePages (domainConfig) {
    var key = domainConfig['pages_key'];
    chrome.storage.sync.get({ [key]: 0 }, (res) => {
        // console.log('last times: ', JSON.stringify(res))
        var nextTimes = res[key] ? res[key] + 1 : 1;
        var saveObj = { [key]: nextTimes };
        chrome.storage.sync.set(saveObj);
    });
}

function handleJustGo () {
    var config = findMatchedDomainConfig(window.location.host);
    const aList = document.querySelectorAll('a');
    var count = 0;
    aList.forEach(e => {
        if (isTargetUrl(e.href, config)) {
            count++;
            e.href = decodeTargetUrl(e.href, config);
        }
    });
    // console.log('replaced:', count);
    if (count > 0) {
        increateGoTimes(config, count);
    }
    increatePages(config);
}

handleJustGo();