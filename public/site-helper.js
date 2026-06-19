// public/site-helper.js
// Page hint cards, keyword badges and access guide – no external libs

(function() {
  'use strict';

  // ----- configuration data -----
  const SITE = {
    url: 'https://cn-portal-xksports.com',
    keyword: '星空体育app',
    version: '1.1.0'
  };

  // sample data for demo cards
  const cardData = [
    { title: '快速导航', icon: '🚀', content: '使用左侧菜单浏览各版块内容' },
    { title: '热门推荐', icon: '⭐', content: '发现与 ' + SITE.keyword + ' 关联的最新资讯' },
    { title: '账户信息', icon: '👤', content: '登录后查看个人资料与订阅状态' }
  ];

  const keywordTags = [
    { label: '体育资讯', color: '#1e88e5' },
    { label: SITE.keyword, color: '#e53935' },
    { label: '直播赛事', color: '#43a047' },
    { label: '数据分析', color: '#fb8c00' }
  ];

  const accessSteps = [
    { step: 1, desc: '打开浏览器访问 ' + SITE.url },
    { step: 2, desc: '点击右上角“注册”创建账号' },
    { step: 3, desc: '在搜索栏输入关键词“' + SITE.keyword + '”探索内容' }
  ];

  // ----- helper functions -----

  function createElement(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(key) {
        if (key === 'className') {
          el.className = attrs[key];
        } else if (key === 'innerText') {
          el.innerText = attrs[key];
        } else if (key === 'innerHTML') {
          el.innerHTML = attrs[key];
        } else {
          el.setAttribute(key, attrs[key]);
        }
      });
    }
    if (children) {
      children.forEach(function(child) {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          el.appendChild(child);
        }
      });
    }
    return el;
  }

  function buildCard(card) {
    var container = createElement('div', { className: 'sh-card' });
    var iconSpan = createElement('span', { className: 'sh-card-icon', innerText: card.icon });
    var titleEl = createElement('h3', { className: 'sh-card-title', innerText: card.title });
    var contentEl = createElement('p', { className: 'sh-card-content', innerText: card.content });
    container.appendChild(iconSpan);
    container.appendChild(titleEl);
    container.appendChild(contentEl);
    return container;
  }

  function buildBadge(tag) {
    var badge = createElement('span', {
      className: 'sh-badge',
      style: 'background-color:' + tag.color + ';'
    });
    badge.innerText = tag.label;
    return badge;
  }

  function buildAccessGuide() {
    var list = createElement('ol', { className: 'sh-access-list' });
    accessSteps.forEach(function(item) {
      var li = createElement('li', { className: 'sh-access-item' });
      var text = '步骤' + item.step + '：' + item.desc;
      li.innerText = text;
      list.appendChild(li);
    });
    return list;
  }

  // ----- main render function -----

  function renderHelper(targetSelector) {
    var target = document.querySelector(targetSelector);
    if (!target) return;

    // container wrapper
    var wrapper = createElement('div', { className: 'sh-helper-container' });

    // ---- hint cards section ----
    var cardsSection = createElement('section', { className: 'sh-cards-section' });
    var cardsHeading = createElement('h2', { className: 'sh-section-title', innerText: '页面提示卡片' });
    cardsSection.appendChild(cardsHeading);

    var cardsWrapper = createElement('div', { className: 'sh-cards-wrapper' });
    cardData.forEach(function(card) {
      cardsWrapper.appendChild(buildCard(card));
    });
    cardsSection.appendChild(cardsWrapper);
    wrapper.appendChild(cardsSection);

    // ---- keyword badges section ----
    var badgesSection = createElement('section', { className: 'sh-badges-section' });
    var badgesHeading = createElement('h2', { className: 'sh-section-title', innerText: '关键词徽章' });
    badgesSection.appendChild(badgesHeading);

    var badgesWrapper = createElement('div', { className: 'sh-badges-wrapper' });
    keywordTags.forEach(function(tag) {
      badgesWrapper.appendChild(buildBadge(tag));
    });
    badgesSection.appendChild(badgesWrapper);
    wrapper.appendChild(badgesSection);

    // ---- access guide section ----
    var guideSection = createElement('section', { className: 'sh-guide-section' });
    var guideHeading = createElement('h2', { className: 'sh-section-title', innerText: '访问说明' });
    guideSection.appendChild(guideHeading);
    guideSection.appendChild(buildAccessGuide());
    wrapper.appendChild(guideSection);

    // append to target
    target.appendChild(wrapper);
  }

  // ----- autoload when DOM ready -----
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    // try rendering into a common container, fallback to body
    var container = document.getElementById('sh-helper-root') || document.getElementById('app') || document.body;
    if (container === document.body) {
      var mainDiv = createElement('div', { id: 'sh-helper-root' });
      document.body.insertBefore(mainDiv, document.body.firstChild);
      container = mainDiv;
    }
    renderHelper('#' + container.id);
  });

})();