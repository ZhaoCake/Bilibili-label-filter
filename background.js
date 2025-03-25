// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 当页面完全加载完毕并且是Bilibili视频页面时
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('bilibili.com/video')) {
    console.log(`标签页已加载完成: ${tab.url}`);
    // 向内容脚本发送消息，开始检查标签
    chrome.tabs.sendMessage(tabId, { action: "checkTags" }, response => {
      if (chrome.runtime.lastError) {
        console.error("发送消息时出错:", chrome.runtime.lastError);
      } else {
        console.log("已向内容脚本发送检查标签请求");
      }
    });
  }
});

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("后台脚本收到消息:", request);
  if (request.action === "closeTab") {
    console.log("准备关闭标签页:", sender.tab.id);
    // 关闭不符合要求的标签页
    chrome.tabs.remove(sender.tab.id);
  }
});
