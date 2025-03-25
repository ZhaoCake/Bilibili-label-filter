// 监听来自后台脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkTags") {
    console.log("收到检查标签的请求");
    setTimeout(checkVideoTags, 1500); // 给页面元素加载一些时间
  }
});

// 检查视频标签是否符合用户期望
function checkVideoTags() {
  console.log("开始检查视频标签...");
  
  // 获取视频标签元素
  const tagElements = document.querySelectorAll('.tag-link, .tag');
  const videoTags = Array.from(tagElements).map(tag => tag.textContent.trim());
  
  // 获取视频标题
  const videoTitle = document.querySelector('.video-title, .title').textContent.trim();
  
  console.log("发现视频标题:", videoTitle);
  console.log("发现视频标签:", videoTags);
  
  // 如果找不到标签，可能DOM结构有变化，先不处理
  if (videoTags.length === 0) {
    console.warn("没有找到视频标签，可能B站页面结构已变化");
    return;
  }
  
  // 从存储中获取用户期望的标签
  chrome.storage.sync.get(['expectedTags'], function(result) {
    const expectedTags = result.expectedTags || [];
    console.log("用户期望的标签:", expectedTags);
    
    // 检查是否有匹配的标签
    const hasMatchingTag = videoTags.some(tag => 
      expectedTags.some(expected => {
        const match = tag.toLowerCase().includes(expected.toLowerCase());
        console.log(`比较标签: "${tag}" 与期望 "${expected}" - 匹配: ${match}`);
        return match;
      })
    );
    
    console.log("标签匹配结果:", hasMatchingTag);
    
    // 如果没有匹配的标签，显示提示并关闭页面
    if (expectedTags.length > 0 && !hasMatchingTag) {
      alert(`视频『${videoTitle}』的标签 [${videoTags.join(', ')}] 与您期望的内容不相关，即将关闭该页面。`);
      
      // 向后台脚本发送消息，关闭当前标签页
      chrome.runtime.sendMessage({ action: "closeTab" });
    }
  });
}
