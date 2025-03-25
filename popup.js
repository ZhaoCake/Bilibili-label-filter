document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const expectedTagsTextarea = document.getElementById('expectedTags');
  const saveBtn = document.getElementById('saveBtn');
  const clearBtn = document.getElementById('clearBtn');
  const statusDiv = document.getElementById('status');

  // 从存储中加载期望的标签
  chrome.storage.sync.get(['expectedTags'], function(result) {
    if (result.expectedTags) {
      expectedTagsTextarea.value = result.expectedTags.join(', ');
    }
  });

  // 保存按钮点击事件
  saveBtn.addEventListener('click', function() {
    const tagsText = expectedTagsTextarea.value;
    // 分割并清理标签
    const tags = tagsText.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    // 保存到存储
    chrome.storage.sync.set({ expectedTags: tags }, function() {
      statusDiv.textContent = '已保存！';
      setTimeout(() => { statusDiv.textContent = ''; }, 2000);
    });
  });

  // 清除按钮点击事件
  clearBtn.addEventListener('click', function() {
    expectedTagsTextarea.value = '';
    chrome.storage.sync.set({ expectedTags: [] }, function() {
      statusDiv.textContent = '已清除！';
      setTimeout(() => { statusDiv.textContent = ''; }, 2000);
    });
  });
});
