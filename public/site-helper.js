// 页面辅助功能模块：提示卡片、关键词徽章与访问说明
(function () {
  'use strict';

  // 站点配置数据
  var siteConfig = {
    siteUrl: 'https://zhhome-leyu.com.cn',
    keywords: ['乐鱼体育', '体育赛事', '在线娱乐'],
    tips: [
      '欢迎来到乐鱼体育平台，畅享极致赛事体验。',
      '请确保网络环境稳定，以获得最佳观赛效果。',
      '在页面中浏览或搜索您感兴趣的运动项目。',
      '如有任何问题，请参考页面底部的帮助说明。'
    ]
  };

  // 创建提示卡片容器
  function createTipCard() {
    var card = document.createElement('div');
    card.className = 'site-helper-tip-card';
    card.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#fff;border:1px solid #e0e0e0;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,0.1);padding:16px;max-width:300px;z-index:9999;font-size:14px;color:#333;transition:opacity 0.3s;';
    card.innerHTML = '<div style="font-weight:bold;margin-bottom:8px;">提示</div><div id="tip-content"></div><button id="tip-close" style="margin-top:10px;padding:4px 12px;background:#f0f0f0;border:1px solid #ccc;border-radius:4px;cursor:pointer;">关闭</button>';
    document.body.appendChild(card);
    return card;
  }

  // 更新卡片内容
  function updateTipContent(index) {
    var content = document.getElementById('tip-content');
    if (!content) return;
    var tipList = siteConfig.tips;
    var idx = index % tipList.length;
    content.textContent = tipList[idx];
  }

  // 关键词徽章渲染
  function renderKeywordBadges(container) {
    if (!container) return;
    var kwList = siteConfig.keywords;
    var badgeContainer = document.createElement('div');
    badgeContainer.style.cssText = 'margin-top:12px;';
    var label = document.createElement('span');
    label.textContent = '关键词：';
    label.style.cssText = 'font-weight:bold;margin-right:6px;';
    badgeContainer.appendChild(label);
    kwList.forEach(function (kw) {
      var badge = document.createElement('span');
      badge.textContent = kw;
      badge.style.cssText = 'display:inline-block;background:#1976d2;color:#fff;border-radius:12px;padding:2px 10px;margin:2px 4px;font-size:12px;';
      badgeContainer.appendChild(badge);
    });
    container.appendChild(badgeContainer);
  }

  // 访问说明块生成
  function createAccessNotice() {
    var notice = document.createElement('div');
    notice.className = 'site-helper-notice';
    notice.style.cssText = 'margin-top:16px;padding:10px;background:#fffbe6;border:1px solid #ffe58f;border-radius:6px;font-size:13px;color:#8c6e00;';
    notice.innerHTML = '访问说明：您当前正在浏览 <strong>' + siteConfig.siteUrl + '</strong>，所有内容仅供个人参考使用。';
    return notice;
  }

  // 初始化页面增强
  function initHelper() {
    var tipCard = createTipCard();
    var tipContent = document.getElementById('tip-content');
    if (tipContent) {
      updateTipContent(0);
    }

    // 关闭按钮
    var closeBtn = document.getElementById('tip-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        tipCard.style.opacity = '0';
        setTimeout(function () {
          tipCard.style.display = 'none';
        }, 300);
      });
    }

    // 随机切换提示
    var currentIndex = 0;
    setInterval(function () {
      currentIndex++;
      updateTipContent(currentIndex);
    }, 8000);

    // 在页面主体添加关键词徽章和访问说明
    var mainContent = document.querySelector('main') || document.querySelector('.content') || document.body;
    if (mainContent) {
      renderKeywordBadges(mainContent);
      var noticeBlock = createAccessNotice();
      mainContent.appendChild(noticeBlock);
    }
  }

  // 如果DOM已经加载则立即执行，否则等待
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHelper);
  } else {
    initHelper();
  }
})();