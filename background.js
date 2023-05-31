const domainConfig = [
  {
    'domain': 'zhihu.com',
    'name': '知乎',
    'pref': 'https://link.zhihu.com/?target=',
    'divider': 'target=',
    'times_key': 'times_zhihu.com'
  },
  {
    'domain': 'jianshu.com',
    'name': '简书',
    'pref': 'https://www.jianshu.com/go-wild?',
    'divider': 'url=',
    'times_key': 'times_jianshu.com'
  },
  {
    'domain': 'juejin.cn',
    'name': '稀土掘金',
    'pref': 'https://link.juejin.cn/?target=',
    'divider': 'target=',
    'times_key': 'times_juejin.cn'
  },
  {
    'domain': 'csdn.net',
    'name': 'CSDN',
    'pref': 'https://link.csdn.net/?target=',
    'divider': 'target=',
    'times_key': 'times_csdn.net'
  },
];

function findMatchedDomainConfig (url) {
  return domainConfig.find(e => {
    return url.startsWith(e['pref']);
  });
}

function parseTargetUrl (href, config) {
  if (href.startsWith(config['pref'])) {
    var splitStrs = href.split(config['divider']);
    return decodeURIComponent(splitStrs[1]);
  }
}

function handleTabOnCreateOrOnUpdateddUrl (tabId, tabUrl, selected) {
  if (tabUrl) {
    // console.log('handleTabCreateUrl:', tabUrl);
    var findDomainConfig = findMatchedDomainConfig(tabUrl);
    // console.log('find domain config:', findDomainConfig != null);
    if (findDomainConfig) {
      var replacedUrl;
      replacedUrl = parseTargetUrl(tabUrl, findDomainConfig);
      if (replacedUrl) {
        increateGoTimes(findDomainConfig);
        console.log('replaced oldUrl', tabUrl, findDomainConfig['domain'], 'newUrl', replacedUrl);
        chrome.tabs.update(tabId, {
          'url': replacedUrl,
          'selected': selected
        });
      }
    }
  }
}

// 更新 just go times
function increateGoTimes (domainConfig) {
  var key = domainConfig['times_key'];
  chrome.storage.sync.get({ [key]: 0 }, (res) => {
    // console.log('last times: ', JSON.stringify(res))
    var nextTimes = res[key] ? res[key] + 1 : 1;
    var saveObj = { [key]: nextTimes };
    chrome.storage.sync.set(saveObj);
  });
}

//监听 create 事件，由于直接打开会没有 url和pendingUrl所以增加onUpdated监听
chrome.tabs.onCreated.addListener(function (tab) {
  // console.log('onCreated', JSON.stringify(tab));
  if (tab.status === 'loading' && tab.pendingUrl) {
    handleTabOnCreateOrOnUpdateddUrl(tab.id, tab.pendingUrl, tab.selected);
  }
});

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
  // console.log('onUpdated', JSON.stringify(tab));
  if (info && info.status === 'loading' && info.url) {
    handleTabOnCreateOrOnUpdateddUrl(id, info.url, tab.selected);
  }
});