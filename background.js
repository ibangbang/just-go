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
    'pref': 'https://links.jianshu.com/go?to=',
    'divider': 'to=',
    'times_key': 'times_jianshu.com'
  },
  {
    'domain': 'juejin.cn',
    'name': '稀土掘金',
    'pref': 'https://link.juejin.cn/?target=',
    'divider': 'target=',
    'times_key': 'times_juejin.cn'
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

function handleTabOnCreatedUrl (tabId, tabUrl, selected) {
  if (tabUrl) {
    // console.log('handleTabCreateUrl:', tabUrl);
    var findDomainConfig = findMatchedDomainConfig(tabUrl);
    // console.log('find domain config:', findDomainConfig != null);
    if (findDomainConfig) {
      var replacedUrl;
      replacedUrl = parseTargetUrl(tabUrl, findDomainConfig);
      if (replacedUrl) {
        increateGoTimes(findDomainConfig);
        // console.log('replaced url', findDomainConfig['domain'], replacedUrl);
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

chrome.tabs.onCreated.addListener(function (tab) {
  handleTabOnCreatedUrl(tab.id, tab.pendingUrl, tab.selected);
});