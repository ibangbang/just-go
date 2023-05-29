console.log(`Just Go is running O(∩_∩)O~`);
console.log(`To save time is to lengthen life.`);
// const domainZhiHu = 'zhihu.com';
// const domainJianShu = 'jianshu.com';
// const domainZhiHuPref = 'https://link.zhihu.com/?target=';
// const domainJianShuPref = 'https://links.jianshu.com/go?to=';
// const supportDomains = [domainZhiHu, domainJianShu];

// function findMatchedDomain (host) {
//   console.log(`findMatchedDomain: ${host}`);
//   return supportDomains.find(e => {
//     return host.endsWith(e);
//   });
// }

// handlePageJustGo();

// function handlePageJustGo () {
//   console.log(`host:${window.location.host}`);
//   var url = window.location.href;
//   var domain = findMatchedDomain(window.location.host);
//   console.log(`find domain: ${domain}`);
//   switch (domain) {
//     case domainZhiHu:
//       handleZhiHu();
//       break;
//     case domainJianShu:
//       handleJianShu();
//       break;
//   }
// }

// // all <a> starts with https://link.zhihu.com/?target=
// function handleZhiHu () {
//   console.log(`handle zhihu page`);
//   const aList = document.querySelectorAll('a');
//   aList.forEach(e => {
//     parseZhiHuRealUrl(e);
//   }
//   );
// }

// // process a tag
// function parseZhiHuRealUrl (aElement) {
//   if (aElement.href.startsWith(domainZhiHuPref)) {
//     var splitStrs = aElement.href.split('target=');
//     aElement.href = decodeURIComponent(splitStrs[1]);
//   }
// }

// // all <a> starts with https://links.jianshu.com/go?to=
// function handleJianShu () {
//   console.log(`handle jianshu page`);
//   const aList = document.querySelectorAll('a');
//   aList.forEach(e => {
//     parseJianShuRealUrl(e);
//   }
//   );
// }

// // process a tag
// function parseJianShuRealUrl (aElement) {
//   if (aElement.href.startsWith(domainJianShuPref)) {
//     var splitStrs = aElement.href.split('to=');
//     aElement.href = decodeURIComponent(splitStrs[1]);
//   }
// }