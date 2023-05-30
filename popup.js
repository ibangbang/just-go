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
  {
    'domain': 'csdn.net',
    'name': 'CSDN',
    'pref': 'https://link.csdn.net/?target=',
    'divider': 'target=',
    'times_key': 'times_csdn.net'
  },
];

document.getElementById('app_name').innerHTML = chrome.i18n.getMessage("appName") + "!";

var keyObj = {};

domainConfig.forEach(e => {
  keyObj[e.times_key] = 0;
});

var domainTimes = [];

// 更新 just go times
function getTimes (domain) {
  domainTimes = [];
  chrome.storage.sync.get(keyObj, (res) => {
    domainConfig.forEach(e => {
      domainTimes.push({
        'domain': e.domain,
        'name': e.name,
        'times': res[e.times_key] ?? 0
      });
    });
    domainTimes.sort((a, b) => b.times - a.times);
    updateList();
  });
}

function getMedal (index) {
  switch (index) {
    case 0: return "🏅";
    case 1: return "🥈";
    case 2: return "🥉";
    default: return "4️⃣\xa0";
  }
}

function updateList () {
  var div = document.querySelector('ul');
  var pObjs = div.childNodes;
  for (var i = pObjs.length - 1; i >= 0; i--) {
    div.removeChild(pObjs[i]);
  }
  const template = document.getElementById('li_template');
  const elements = new Set();
  for (let [index, timeItem] of domainTimes.entries()) {
    const element = template.content.firstElementChild.cloneNode(true);

    // const title = (index + 1) + ". " + timeItem['name'] + "-" + timeItem['domain'];
    const title = getMedal(index) + " " + timeItem['name'] + " - " + timeItem['domain'];
    const pathname = chrome.i18n.getMessage("goTimes") + timeItem['times'];

    element.querySelector('.title').textContent = title;
    element.querySelector('.pathname').textContent = pathname;
    elements.add(element);
  }
  document.querySelector('ul').append(...elements);
}

// const button = document.querySelector('button');
// button.addEventListener('click', async () => {
//   const tabIds = tabs.map(({ id }) => id);
//   if (tabIds.length) {
//     const group = await chrome.tabs.group({ tabIds });
//     await chrome.tabGroups.update(group, { title: 'DOCS' });
//   }
// });

getTimes();

