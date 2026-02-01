# Smart Task Manager Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a modern, Apple-style bilingual (Chinese/English) landing page for the AI-Native Smart Task Manager product using HTML5, Tailwind CSS, and Alpine.js.

**Architecture:** Single-page application with client-side language switching using JavaScript localStorage. Responsive design with mobile-first approach using Tailwind CSS utility classes. Alpine.js for lightweight interactive components (navigation menu, language toggles).

**Tech Stack:** HTML5, Tailwind CSS (CDN), Alpine.js (CDN), Vanilla JavaScript

---

## Task 1: Create HTML skeleton with CDN dependencies

**Files:**
- Create: `index.html`

**Step 1: Create basic HTML structure with meta tags and CDN links**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI原生智能任务管理器 - AI-Native Smart Task Manager</title>
    <meta name="description" content="让 AI 为你每月节省 20+ 小时，专注于真正重要的事">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <!-- Custom config for Tailwind -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        blue: '#007AFF',
                        gray: {
                            dark: '#1D1D1F',
                            medium: '#86868B',
                            light: '#F5F5F7',
                            border: '#E5E5EA'
                        },
                        green: '#34C759',
                        orange: '#FF9500',
                        red: '#FF3B30'
                    },
                    fontFamily: {
                        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
                    },
                    borderRadius: {
                        'pill': '980px',
                    }
                }
            }
        }
    </script>

    <style>
        html {
            scroll-behavior: smooth;
        }
    </style>
</head>
<body class="bg-white text-gray-dark font-sans">
    <!-- Content will be added in subsequent tasks -->

    <script src="js/main.js"></script>
</body>
</html>
```

**Step 2: Verify HTML structure**

Open `index.html` in browser
Expected: Blank white page with no console errors

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add HTML skeleton with Tailwind CSS and Alpine.js"
```

---

## Task 2: Implement fixed navigation bar with language toggle

**Files:**
- Modify: `index.html`

**Step 1: Add navigation bar HTML before closing body tag**

```html
<!-- Navigation -->
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" x-data="{ scrolled: false }" @scroll.window="scrolled = (window.pageYOffset > 20)">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
         :class="scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'">

        <!-- Logo -->
        <a href="#" class="text-xl font-bold text-gray-dark hover:text-blue transition-colors" data-lang="zh">
            AI原生智能任务管理器
        </a>
        <a href="#" class="text-xl font-bold text-gray-dark hover:text-blue transition-colors hidden" data-lang="en">
            AI-Native Smart Task Manager
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
            <a href="#features" class="text-gray-medium hover:text-gray-dark transition-colors" data-lang="zh">功能介绍</a>
            <a href="#features" class="text-gray-medium hover:text-gray-dark transition-colors hidden" data-lang="en">Features</a>

            <a href="#scenarios" class="text-gray-medium hover:text-gray-dark transition-colors" data-lang="zh">使用场景</a>
            <a href="#scenarios" class="text-gray-medium hover:text-gray-dark transition-colors hidden" data-lang="en">Use Cases</a>

            <a href="#comparison" class="text-gray-medium hover:text-gray-dark transition-colors" data-lang="zh">产品对比</a>
            <a href="#comparison" class="text-gray-medium hover:text-gray-dark transition-colors hidden" data-lang="en">Comparison</a>

            <a href="#" class="text-gray-medium hover:text-gray-dark transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            </a>

            <!-- Language Toggle -->
            <button id="langToggle" class="px-3 py-1 rounded-full border border-gray-border text-sm hover:bg-gray-light transition-colors">
                EN
            </button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2" x-data="{ open: false }" @click="open = !open">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </button>
    </div>

    <!-- Mobile Menu -->
    <div class="md:hidden hidden bg-white border-t border-gray-border">
        <div class="px-6 py-4 space-y-4">
            <a href="#features" class="block text-gray-medium hover:text-gray-dark" data-lang="zh">功能介绍</a>
            <a href="#features" class="block text-gray-medium hover:text-gray-dark hidden" data-lang="en">Features</a>

            <a href="#scenarios" class="block text-gray-medium hover:text-gray-dark" data-lang="zh">使用场景</a>
            <a href="#scenarios" class="block text-gray-medium hover:text-gray-dark hidden" data-lang="en">Use Cases</a>

            <a href="#comparison" class="block text-gray-medium hover:text-gray-dark" data-lang="zh">产品对比</a>
            <a href="#comparison" class="block text-gray-medium hover:text-gray-dark hidden" data-lang="en">Comparison</a>

            <a href="#" class="block text-gray-medium hover:text-gray-dark">
                <span data-lang="zh">GitHub</span>
                <span class="hidden" data-lang="en">GitHub</span>
            </a>
        </div>
    </div>
</nav>
```

**Step 2: Verify navigation bar displays correctly**

Open `index.html` in browser
Expected: Fixed navigation bar at top with logo, links, and language toggle

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add fixed navigation bar with language toggle"
```

---

## Task 3: Implement Hero section with CTA buttons

**Files:**
- Modify: `index.html`

**Step 1: Add Hero section after navigation**

```html
<!-- Hero Section -->
<section class="pt-40 pb-32 px-6 text-center">
    <div class="max-w-4xl mx-auto">
        <!-- Title -->
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-dark leading-tight mb-6">
            <span data-lang="zh">AI原生智能任务管理器</span>
            <span class="hidden" data-lang="en">AI-Native Smart Task Manager</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-gray-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            <span data-lang="zh">内置 20 年经验的顶级行政助理，精通 GTD 方法论</span>
            <span class="hidden" data-lang="en">Built-in 20 years of experience executive assistant, mastering GTD methodology</span>
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#"
               class="w-full sm:w-auto px-8 h-12 bg-blue text-white rounded-pill font-medium hover:bg-blue/90 active:scale-[0.98] transition-all flex items-center justify-center">
                <span data-lang="zh">立即下载</span>
                <span class="hidden" data-lang="en">Download Now</span>
            </a>

            <a href="#demo-video"
               class="w-full sm:w-auto px-8 h-12 border-2 border-blue text-blue rounded-pill font-medium hover:bg-blue/5 active:scale-[0.98] transition-all flex items-center justify-center">
                <span data-lang="zh">观看演示视频 ↓</span>
                <span class="hidden" data-lang="en">Watch Demo Video ↓</span>
            </a>
        </div>
    </div>
</section>
```

**Step 2: Verify Hero section renders correctly**

Open `index.html` in browser
Expected: Large title, subtitle, and two CTA buttons centered on page

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Hero section with CTA buttons"
```

---

## Task 4: Implement language switching functionality

**Files:**
- Create: `js/main.js`

**Step 1: Create language switching JavaScript**

```javascript
// Language switching functionality
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'zh';

// Initialize language on page load
function initLanguage() {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        if (el.getAttribute('data-lang') === currentLang) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    // Update toggle button text
    langToggle.textContent = currentLang === 'zh' ? 'EN' : '中';

    // Update HTML lang attribute
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}

// Toggle language
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', currentLang);
    initLanguage();
});

// Initialize on page load
initLanguage();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = 64;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});
```

**Step 2: Test language switching**

Open `index.html` in browser
1. Click "EN" button
Expected: All Chinese text hides, English text shows, button shows "中"

2. Click "中" button
Expected: All English text hides, Chinese text shows, button shows "EN"

3. Refresh page
Expected: Language preference persists from localStorage

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: implement language switching with localStorage persistence"
```

---

## Task 5: Add Media Showcase section (screenshots, video, infographic, audio)

**Files:**
- Modify: `index.html`
- Create: `assets/images/` (directory)
- Create: `assets/videos/` (directory)
- Create: `assets/audio/` (directory)

**Step 1: Create asset directories**

```bash
mkdir -p assets/images assets/videos assets/audio
```

**Step 2: Add Media Showcase section**

```html
<!-- Media Showcase Section -->
<section class="py-24 px-6 bg-gray-light">
    <div class="max-w-7xl mx-auto space-y-20">

        <!-- Product Screenshot -->
        <div class="text-center">
            <img src="assets/images/screenshot.png"
                 alt="Product Screenshot"
                 class="mx-auto rounded-2xl shadow-lg max-w-5xl w-full"
                 loading="lazy"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div class="hidden text-center py-20 bg-white rounded-2xl border border-gray-border">
                <p class="text-gray-medium" data-lang="zh">产品截图待添加</p>
                <p class="hidden text-gray-medium" data-lang="en">Product screenshot coming soon</p>
            </div>
            <p class="mt-4 text-gray-medium text-sm" data-lang="zh">主界面 - 任务列表、筛选、智能分析</p>
            <p class="hidden mt-4 text-gray-medium text-sm" data-lang="en">Main Interface - Task list, filtering, smart insights</p>
        </div>

        <!-- Demo Video -->
        <div id="demo-video" class="text-center">
            <h2 class="text-2xl font-bold text-gray-dark mb-8">
                <span data-lang="zh">演示视频</span>
                <span class="hidden" data-lang="en">Demo Video</span>
            </h2>
            <div class="max-w-5xl mx-auto">
                <video controls preload="metadata" class="w-full rounded-xl shadow-lg">
                    <source src="assets/videos/demo-zh.mp4" type="video/mp4" data-lang="zh">
                    <source src="assets/videos/demo-en.mp4" type="video/mp4" data-lang="en">
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>

        <!-- Infographic -->
        <div class="text-center">
            <img src="assets/images/infographic-zh.png"
                 alt="Infographic"
                 data-lang="zh"
                 class="mx-auto rounded-xl shadow-lg max-w-4xl w-full"
                 loading="lazy"
                 onerror="this.style.display='none'">
            <img src="assets/images/infographic-en.png"
                 alt="Infographic"
                 data-lang="en"
                 class="hidden mx-auto rounded-xl shadow-lg max-w-4xl w-full"
                 loading="lazy"
                 onerror="this.style.display='none'">
        </div>

        <!-- Audio Podcast -->
        <div class="max-w-3xl mx-auto">
            <div class="bg-white rounded-2xl p-8 shadow-md">
                <h3 class="text-xl font-bold text-gray-dark mb-4">
                    <span data-lang="zh">产品介绍播客</span>
                    <span class="hidden" data-lang="en">Product Introduction Podcast</span>
                </h3>
                <audio controls class="w-full">
                    <source src="assets/audio/podcast-zh.m4a" type="audio/mp4" data-lang="zh">
                    <source src="assets/audio/podcast-en.m4a" type="audio/mp4" data-lang="en">
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    </div>
</section>
```

**Step 3: Verify media section structure**

Open `index.html` in browser
Expected: Section with placeholder for screenshot, video player, infographic, and audio player

**Step 4: Commit**

```bash
git add index.html assets/
git commit -m "feat: add media showcase section with video, infographic, and audio"
```

---

## Task 6: Implement Core Features section with 5 feature cards

**Files:**
- Modify: `index.html`

**Step 1: Add Core Features section**

```html
<!-- Core Features Section -->
<section id="features" class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-dark text-center mb-16">
            <span data-lang="zh">核心功能</span>
            <span class="hidden" data-lang="en">Core Features</span>
        </h2>

        <!-- Features Grid - First Row (3 columns) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

            <!-- Feature 1: AI Parsing -->
            <div class="bg-white border border-gray-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div class="text-4xl mb-4">🤖</div>
                <h3 class="text-xl font-bold text-gray-dark mb-3">
                    <span data-lang="zh">说人话，不是填表单</span>
                    <span class="hidden" data-lang="en">Speak Naturally, No Forms</span>
                </h3>
                <p class="text-gray-medium leading-relaxed">
                    <span data-lang="zh">"明天下午3点开会"直接输入，AI 自动提取时间、地点、优先级，2 秒创建任务。</span>
                    <span class="hidden" data-lang="en">Type "Meeting at 3pm tomorrow" directly, AI automatically extracts time, location, priority, creating tasks in 2 seconds.</span>
                </p>
            </div>

            <!-- Feature 2: Quick Record -->
            <div class="bg-white border border-gray-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div class="text-4xl mb-4">⌨️</div>
                <h3 class="text-xl font-bold text-gray-dark mb-3">
                    <span data-lang="zh">双快捷键系统</span>
                    <span class="hidden" data-lang="en">Dual Hotkey System</span>
                </h3>
                <p class="text-gray-medium leading-relaxed">
                    <span data-lang="zh">普通模式可编辑，静默模式后台创建。在任何应用中复制 + 快捷键，任务记录完成。</span>
                    <span class="hidden" data-lang="en">Normal mode for editing, silent mode for background creation. Copy + hotkey in any app, task recorded.</span>
                </p>
            </div>

            <!-- Feature 3: Smart Insights -->
            <div class="bg-white border border-gray-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div class="text-4xl mb-4">📊</div>
                <h3 class="text-xl font-bold text-gray-dark mb-3">
                    <span data-lang="zh">主动提醒，未雨绸缪</span>
                    <span class="hidden" data-lang="en">Proactive Reminders</span>
                </h3>
                <p class="text-gray-medium leading-relaxed">
                    <span data-lang="zh">自动识别过期任务、工作负载、资源冲突，提供个性化建议。出差任务含天气提醒。</span>
                    <span class="hidden" data-lang="en">Automatically identifies overdue tasks, workload, resource conflicts, provides personalized suggestions. Weather alerts for travel tasks.</span>
                </p>
            </div>
        </div>

        <!-- Features Grid - Second Row (2 columns, centered) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            <!-- Feature 4: Work Summary -->
            <div class="bg-white border border-gray-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div class="text-4xl mb-4">📝</div>
                <h3 class="text-xl font-bold text-gray-dark mb-3">
                    <span data-lang="zh">面向"管理者或未来的自己"</span>
                    <span class="hidden" data-lang="en">For Managers & Future You</span>
                </h3>
                <p class="text-gray-medium leading-relaxed">
                    <span data-lang="zh">资深工作复盘助理自动生成日报/周报/月报，提炼成果与洞察，大幅节省复盘时间。</span>
                    <span class="hidden" data-lang="en">Senior work review assistant automatically generates daily/weekly/monthly reports, extracting achievements and insights, saving review time.</span>
                </p>
            </div>

            <!-- Feature 5: Data Security -->
            <div class="bg-white border border-gray-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div class="text-4xl mb-4">🔒</div>
                <h3 class="text-xl font-bold text-gray-dark mb-3">
                    <span data-lang="zh">本地存储 + 自动备份</span>
                    <span class="hidden" data-lang="en">Local Storage + Auto Backup</span>
                </h3>
                <p class="text-gray-medium leading-relaxed">
                    <span data-lang="zh">所有数据保存在本地，每 10 分钟自动备份，支持 Obsidian 双向同步。</span>
                    <span class="hidden" data-lang="en">All data stored locally, auto-backup every 10 minutes, supports Obsidian two-way sync.</span>
                </p>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Verify features display correctly**

Open `index.html` in browser
Expected: 5 feature cards with icons, titles, and descriptions in responsive grid layout

**Step 3: Test hover effects**

Hover over each card
Expected: Card moves up 4px and shadow increases

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add core features section with 5 feature cards"
```

---

## Task 7: Implement User Scenarios section

**Files:**
- Modify: `index.html`

**Step 1: Add User Scenarios section**

```html
<!-- User Scenarios Section -->
<section id="scenarios" class="py-24 px-6 bg-gray-light">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-dark text-center mb-16">
            <span data-lang="zh">适合谁使用？</span>
            <span class="hidden" data-lang="en">Who Is This For?</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- Scenario 1: Knowledge Workers -->
            <div class="bg-white border border-gray-border rounded-2xl p-8">
                <div class="flex items-start justify-between mb-4">
                    <div class="text-4xl">💻</div>
                    <span class="px-3 py-1 bg-blue text-white text-xs font-medium rounded-full">
                        <span data-lang="zh">核心用户 40%</span>
                        <span class="hidden" data-lang="en">Core Users 40%</span>
                    </span>
                </div>
                <h3 class="text-2xl font-bold text-gray-dark mb-2">
                    <span data-lang="zh">知识工作者</span>
                    <span class="hidden" data-lang="en">Knowledge Workers</span>
                </h3>
                <p class="text-gray-medium text-sm mb-4">
                    程序员、产品经理、设计师、研究人员
                </p>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm font-semibold text-gray-dark mb-1">
                            <span data-lang="zh">痛点</span>
                            <span class="hidden" data-lang="en">Pain Points</span>
                        </p>
                        <ul class="text-sm text-gray-medium list-disc list-inside space-y-1">
                            <li data-lang="zh">任务来源多样，容易遗漏</li>
                            <li class="hidden" data-lang="en">Diverse task sources, easy to miss</li>
                            <li data-lang="zh">传统应用操作繁琐，打断工作流</li>
                            <li class="hidden" data-lang="en">Traditional apps are cumbersome, interrupt workflow</li>
                            <li data-lang="zh">需要生成工作总结，展示成果</li>
                            <li class="hidden" data-lang="en">Need to generate work summaries, show achievements</li>
                        </ul>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-dark mb-1">
                            <span data-lang="zh">解决方案</span>
                            <span class="hidden" data-lang="en">Solutions</span>
                        </p>
                        <ul class="text-sm text-gray-medium list-disc list-inside space-y-1">
                            <li data-lang="zh">秒速记录，不中断思考</li>
                            <li class="hidden" data-lang="en">Record in seconds, don't interrupt thinking</li>
                            <li data-lang="zh">AI 自动生成周报/月报</li>
                            <li class="hidden" data-lang="en">AI auto-generates weekly/monthly reports</li>
                            <li data-lang="zh">本地存储，保护隐私</li>
                            <li class="hidden" data-lang="en">Local storage, privacy protection</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Scenario 2: Freelancers -->
            <div class="bg-white border border-gray-border rounded-2xl p-8">
                <div class="flex items-start justify-between mb-4">
                    <div class="text-4xl">🎨</div>
                    <span class="px-3 py-1 bg-orange text-white text-xs font-medium rounded-full">
                        <span data-lang="zh">重要用户 30%</span>
                        <span class="hidden" data-lang="en">Important Users 30%</span>
                    </span>
                </div>
                <h3 class="text-2xl font-bold text-gray-dark mb-2">
                    <span data-lang="zh">自由职业者</span>
                    <span class="hidden" data-lang="en">Freelancers</span>
                </h3>
                <p class="text-gray-medium text-sm mb-4">
                    独立开发者、设计师、撰稿人
                </p>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm font-semibold text-gray-dark mb-1">
                            <span data-lang="zh">痛点</span>
                            <span class="hidden" data-lang="en">Pain Points</span>
                        </p>
                        <ul class="text-sm text-gray-medium list-disc list-inside space-y-1">
                            <li data-lang="zh">多个客户项目容易混乱</li>
                            <li class="hidden" data-lang="en">Multiple client projects easily get messy</li>
                            <li data-lang="zh">需要精确记录时间用于计费</li>
                            <li class="hidden" data-lang="en">Need precise time tracking for billing</li>
                            <li data-lang="zh">缺乏团队协作</li>
                            <li class="hidden" data-lang="en">Lack team collaboration</li>
                        </ul>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-dark mb-1">
                            <span data-lang="zh">解决方案</span>
                            <span class="hidden" data-lang="en">Solutions</span>
                        </p>
                        <ul class="text-sm text-gray-medium list-disc list-inside space-y-1">
                            <li data-lang="zh">按客户/项目分类管理</li>
                            <li class="hidden" data-lang="en">Categorize by client/project</li>
                            <li data-lang="zh">任务计时功能</li>
                            <li class="hidden" data-lang="en">Task time tracking feature</li>
                            <li data-lang="zh">工作总结展示专业能力</li>
                            <li class="hidden" data-lang="en">Work summaries showcase professionalism</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Scenario 3: Students -->
            <div class="bg-white border border-gray-border rounded-2xl p-8">
                <div class="flex items-start justify-between mb-4">
                    <div class="text-4xl">📚</div>
                    <span class="px-3 py-1 bg-green text-white text-xs font-medium rounded-full">
                        <span data-lang="zh">成长用户 20%</span>
                        <span class="hidden" data-lang="en">Growing Users 20%</span>
                    </span>
                </div>
                <h3 class="text-2xl font-bold text-gray-dark mb-2">
                    <span data-lang="zh">学生群体</span>
                    <span class="hidden" data-lang="en">Students</span>
                </h3>
                <p class="text-gray-medium text-sm mb-4">
                    大学生、研究生、博士生
                </p>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm font-semibold text-gray-dark mb-1">
                            <span data-lang="zh">痛点</span>
                            <span class="hidden" data-lang="en">Pain Points</span>
                        </p>
                        <ul class="text-sm text-gray-medium list-disc list-inside space-y-1">
                            <li data-lang="zh">课程、考试容易遗漏</li>
                            <li class="hidden" data-lang="en">Courses, exams easily forgotten</li>
                            <li data-lang="zh">缺乏时间管理经验</li>
                            <li class="hidden" data-lang="en">Lack time management experience</li>
                            <li data-lang="zh">需要记录学习成果</li>
                            <li class="hidden" data-lang="en">Need to record learning achievements</li>
                        </ul>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-dark mb-1">
                            <span data-lang="zh">解决方案</span>
                            <span class="hidden" data-lang="en">Solutions</span>
                        </p>
                        <ul class="text-sm text-gray-medium list-disc list-inside space-y-1">
                            <li data-lang="zh">简单易用，学习成本低</li>
                            <li class="hidden" data-lang="en">Simple to use, low learning curve</li>
                            <li data-lang="zh">提醒功能不错过截止日期</li>
                            <li class="hidden" data-lang="en">Reminder feature never miss deadlines</li>
                            <li data-lang="zh">学习总结和知识沉淀</li>
                            <li class="hidden" data-lang="en">Learning summaries and knowledge retention</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Scenario 4: Productivity Enthusiasts -->
            <div class="bg-white border border-gray-border rounded-2xl p-8">
                <div class="flex items-start justify-between mb-4">
                    <div class="text-4xl">⚡</div>
                    <span class="px-3 py-1 bg-red text-white text-xs font-medium rounded-full">
                        <span data-lang="zh">潜在用户 10%</span>
                        <span class="hidden" data-lang="en">Potential Users 10%</span>
                    </span>
                </div>
                <h3 class="text-2xl font-bold text-gray-dark mb-2">
                    <span data-lang="zh">效率爱好者</span>
                    <span class="hidden" data-lang="en">Productivity Enthusiasts</span>
                </h3>
                <p class="text-gray-medium text-sm mb-4">
                    <span data-lang="zh">追求生产力，喜欢尝试新工具</span>
                    <span class="hidden" data-lang="en">Pursue productivity, love trying new tools</span>
                </p>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm font-semibold text-gray-dark mb-1">
                            <span data-lang="zh">痛点</span>
                            <span class="hidden" data-lang="en">Pain Points</span>
                        </p>
                        <ul class="text-sm text-gray-medium list-disc list-inside space-y-1">
                            <li data-lang="zh">尝试过很多工具，各有优劣</li>
                            <li class="hidden" data-lang="en">Tried many tools, each has pros and cons</li>
                            <li data-lang="zh">寻找更智能的解决方案</li>
                            <li class="hidden" data-lang="en">Looking for smarter solutions</li>
                        </ul>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-dark mb-1">
                            <span data-lang="zh">解决方案</span>
                            <span class="hidden" data-lang="en">Solutions</span>
                        </p>
                        <ul class="text-sm text-gray-medium list-disc list-inside space-y-1">
                            <li data-lang="zh">AI 创新，智能建议</li>
                            <li class="hidden" data-lang="en">AI innovation, smart suggestions</li>
                            <li data-lang="zh">可定制化快捷键</li>
                            <li class="hidden" data-lang="en">Customizable hotkeys</li>
                            <li data-lang="zh">高性能，数据可导出</li>
                            <li class="hidden" data-lang="en">High performance, data exportable</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Verify user scenarios display**

Open `index.html` in browser
Expected: 4 user scenario cards in 2x2 grid on desktop, stacked on mobile

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add user scenarios section with 4 user personas"
```

---

## Task 8: Implement Comparison section with table

**Files:**
- Modify: `index.html`

**Step 1: Add Comparison section**

```html
<!-- Comparison Section -->
<section id="comparison" class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-dark text-center mb-16">
            <span data-lang="zh">为什么选择 AI原生智能任务管理器？</span>
            <span class="hidden" data-lang="en">Why Choose AI-Native Smart Task Manager?</span>
        </h2>

        <!-- Comparison Table -->
        <div class="overflow-x-auto mb-16">
            <table class="w-full bg-white rounded-2xl overflow-hidden shadow-sm">
                <thead class="bg-gray-light">
                    <tr>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-dark">
                            <span data-lang="zh">功能</span>
                            <span class="hidden" data-lang="en">Feature</span>
                        </th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-dark">
                            <span data-lang="zh">AI原生智能任务管理器</span>
                            <span class="hidden" data-lang="en">AI-Native Task Manager</span>
                        </th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-dark">
                            <span data-lang="zh">传统待办应用</span>
                            <span class="hidden" data-lang="en">Traditional Todo Apps</span>
                        </th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-dark">
                            <span data-lang="zh">其他 AI 应用</span>
                            <span class="hidden" data-lang="en">Other AI Apps</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-border">
                    <tr>
                        <td class="px-6 py-4 text-sm font-medium text-gray-dark">
                            <span data-lang="zh">AI 解析</span>
                            <span class="hidden" data-lang="en">AI Parsing</span>
                        </td>
                        <td class="px-6 py-4"><span class="text-green font-semibold">✅</span> <span class="text-sm text-gray-medium"><span data-lang="zh">自然语言，无需选择字段</span><span class="hidden" data-lang="en">Natural language, no field selection</span></span></td>
                        <td class="px-6 py-4"><span class="text-gray-400">❌</span> <span class="text-sm text-gray-medium"><span data-lang="zh">手动填写每个字段</span><span class="hidden" data-lang="en">Manual field entry</span></span></td>
                        <td class="px-6 py-4"><span class="text-orange">⚠️</span> <span class="text-sm text-gray-medium"><span data-lang="zh">部分支持</span><span class="hidden" data-lang="en">Partial support</span></span></td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 text-sm font-medium text-gray-dark">
                            <span data-lang="zh">快捷键</span>
                            <span class="hidden" data-lang="en">Hotkeys</span>
                        </td>
                        <td class="px-6 py-4"><span class="text-green font-semibold">✅</span> <span class="text-sm text-gray-medium"><span data-lang="zh">双模式，适应不同场景</span><span class="hidden" data-lang="en">Dual mode for different scenarios</span></span></td>
                        <td class="px-6 py-4"><span class="text-orange">⚠️</span> <span class="text-sm text-gray-medium"><span data-lang="zh">仅快捷打开</span><span class="hidden" data-lang="en">Quick open only</span></span></td>
                        <td class="px-6 py-4"><span class="text-gray-400">❌</span> <span class="text-sm text-gray-medium"><span data-lang="zh">无</span><span class="hidden" data-lang="en">None</span></span></td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 text-sm font-medium text-gray-dark">
                            <span data-lang="zh">工作总结</span>
                            <span class="hidden" data-lang="en">Work Summary</span>
                        </td>
                        <td class="px-6 py-4"><span class="text-green font-semibold">✅</span> <span class="text-sm text-gray-medium"><span data-lang="zh">AI 自动生成，面向管理者</span><span class="hidden" data-lang="en">AI auto-generated, manager-facing</span></span></td>
                        <td class="px-6 py-4"><span class="text-gray-400">❌</span> <span class="text-sm text-gray-medium"><span data-lang="zh">无</span><span class="hidden" data-lang="en">None</span></span></td>
                        <td class="px-6 py-4"><span class="text-gray-400">❌</span> <span class="text-sm text-gray-medium"><span data-lang="zh">无</span><span class="hidden" data-lang="en">None</span></span></td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 text-sm font-medium text-gray-dark">
                            <span data-lang="zh">智能洞察</span>
                            <span class="hidden" data-lang="en">Smart Insights</span>
                        </td>
                        <td class="px-6 py-4"><span class="text-green font-semibold">✅</span> <span class="text-sm text-gray-medium"><span data-lang="zh">主动建议，含天气等</span><span class="hidden" data-lang="en">Proactive suggestions, weather, etc.</span></span></td>
                        <td class="px-6 py-4"><span class="text-gray-400">❌</span> <span class="text-sm text-gray-medium"><span data-lang="zh">无</span><span class="hidden" data-lang="en">None</span></span></td>
                        <td class="px-6 py-4"><span class="text-orange">⚠️</span> <span class="text-sm text-gray-medium"><span data-lang="zh">简单提醒</span><span class="hidden" data-lang="en">Simple reminders</span></span></td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 text-sm font-medium text-gray-dark">
                            <span data-lang="zh">数据安全</span>
                            <span class="hidden" data-lang="en">Data Security</span>
                        </td>
                        <td class="px-6 py-4"><span class="text-green font-semibold">✅</span> <span class="text-sm text-gray-medium"><span data-lang="zh">本地存储 + 自动备份</span><span class="hidden" data-lang="en">Local storage + auto backup</span></span></td>
                        <td class="px-6 py-4"><span class="text-orange">⚠️</span> <span class="text-sm text-gray-medium"><span data-lang="zh">云端为主</span><span class="hidden" data-lang="en">Mostly cloud-based</span></span></td>
                        <td class="px-6 py-4"><span class="text-orange">⚠️</span> <span class="text-sm text-gray-medium"><span data-lang="zh">云端存储</span><span class="hidden" data-lang="en">Cloud storage</span></span></td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 text-sm font-medium text-gray-dark">
                            <span data-lang="zh">集成能力</span>
                            <span class="hidden" data-lang="en">Integration</span>
                        </td>
                        <td class="px-6 py-4"><span class="text-green font-semibold">✅</span> <span class="text-sm text-gray-medium"><span data-lang="zh">Obsidian 双向同步</span><span class="hidden" data-lang="en">Obsidian two-way sync</span></span></td>
                        <td class="px-6 py-4"><span class="text-gray-400">❌</span> <span class="text-sm text-gray-medium"><span data-lang="zh">无</span><span class="hidden" data-lang="en">None</span></span></td>
                        <td class="px-6 py-4"><span class="text-gray-400">❌</span> <span class="text-sm text-gray-medium"><span data-lang="zh">无</span><span class="hidden" data-lang="en">None</span></span></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Key Advantages -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div class="text-center">
                <div class="text-4xl mb-4">🎯</div>
                <h3 class="text-lg font-bold text-gray-dark mb-2">
                    <span data-lang="zh">真正的 AI-Native</span>
                    <span class="hidden" data-lang="en">Truly AI-Native</span>
                </h3>
                <p class="text-gray-medium text-sm">
                    <span data-lang="zh">不是简单的 AI 功能叠加，而是从底层设计的 AI 智能体</span>
                    <span class="hidden" data-lang="en">Not just AI features added on, but AI agent designed from the ground up</span>
                </p>
            </div>
            <div class="text-center">
                <div class="text-4xl mb-4">⌨️</div>
                <h3 class="text-lg font-bold text-gray-dark mb-2">
                    <span data-lang="zh">秒级响应</span>
                    <span class="hidden" data-lang="en">Second-Level Response</span>
                </h3>
                <p class="text-gray-medium text-sm">
                    <span data-lang="zh">双快捷键系统，2 秒完成记录，不打断工作流</span>
                    <span class="hidden" data-lang="en">Dual hotkey system, record in 2 seconds, don't interrupt workflow</span>
                </p>
            </div>
            <div class="text-center">
                <div class="text-4xl mb-4">📊</div>
                <h3 class="text-lg font-bold text-gray-dark mb-2">
                    <span data-lang="zh">面向管理者</span>
                    <span class="hidden" data-lang="en">Manager-Facing</span>
                </h3>
                <p class="text-gray-medium text-sm">
                    <span data-lang="zh">一键生成工作总结，让成果清晰可见</span>
                    <span class="hidden" data-lang="en">One-click work summaries, make achievements clearly visible</span>
                </p>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Verify comparison table displays**

Open `index.html` in browser
Expected: Responsive comparison table with color-coded checkmarks and three advantage cards below

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add comparison section with feature table and advantages"
```

---

## Task 9: Implement Footer section

**Files:**
- Modify: `index.html`

**Step 1: Add Footer section**

```html
<!-- Footer -->
<footer class="bg-gray-dark py-16 px-6">
    <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

            <!-- Left: Product Info -->
            <div>
                <h3 class="text-xl font-bold text-white mb-2">
                    <span data-lang="zh">AI原生智能任务管理器</span>
                    <span class="hidden" data-lang="en">AI-Native Smart Task Manager</span>
                </h3>
                <p class="text-gray-medium">
                    <span data-lang="zh">让 AI 为你每月节省 20+ 小时</span>
                    <span class="hidden" data-lang="en">Save 20+ hours per month with AI</span>
                </p>
            </div>

            <!-- Middle: Links -->
            <div class="grid grid-cols-3 gap-6">
                <!-- Product Links -->
                <div>
                    <h4 class="text-white font-semibold mb-3">
                        <span data-lang="zh">产品</span>
                        <span class="hidden" data-lang="en">Product</span>
                    </h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-medium hover:text-white text-sm transition-colors"><span data-lang="zh">下载</span><span class="hidden" data-lang="en">Download</span></a></li>
                        <li><a href="#features" class="text-gray-medium hover:text-white text-sm transition-colors"><span data-lang="zh">功能介绍</span><span class="hidden" data-lang="en">Features</span></a></li>
                        <li><a href="#scenarios" class="text-gray-medium hover:text-white text-sm transition-colors"><span data-lang="zh">使用场景</span><span class="hidden" data-lang="en">Use Cases</span></a></li>
                    </ul>
                </div>

                <!-- Support Links -->
                <div>
                    <h4 class="text-white font-semibold mb-3">
                        <span data-lang="zh">支持</span>
                        <span class="hidden" data-lang="en">Support</span>
                    </h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-medium hover:text-white text-sm transition-colors"><span data-lang="zh">快速入门</span><span class="hidden" data-lang="en">Quick Start</span></a></li>
                        <li><a href="#" class="text-gray-medium hover:text-white text-sm transition-colors"><span data-lang="zh">用户手册</span><span class="hidden" data-lang="en">User Manual</span></a></li>
                        <li><a href="#" class="text-gray-medium hover:text-white text-sm transition-colors"><span data-lang="zh">常见问题</span><span class="hidden" data-lang="en">FAQ</span></a></li>
                    </ul>
                </div>

                <!-- About Links -->
                <div>
                    <h4 class="text-white font-semibold mb-3">
                        <span data-lang="zh">关于</span>
                        <span class="hidden" data-lang="en">About</span>
                    </h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-medium hover:text-white text-sm transition-colors"><span data-lang="zh">开发故事</span><span class="hidden" data-lang="en">Development Story</span></a></li>
                        <li><a href="#" class="text-gray-medium hover:text-white text-sm transition-colors"><span data-lang="zh">联系我们</span><span class="hidden" data-lang="en">Contact Us</span></a></li>
                        <li><a href="#" class="text-gray-medium hover:text-white text-sm transition-colors">GitHub</a></li>
                    </ul>
                </div>
            </div>

            <!-- Right: Contact & Social -->
            <div class="text-left md:text-right">
                <p class="text-gray-medium text-sm mb-4">
                    <span data-lang="zh">电子邮件：</span>
                    <span class="hidden" data-lang="en">Email:</span>
                    <a href="mailto:your-email@example.com" class="text-blue hover:text-blue/80 transition-colors">your-email@example.com</a>
                </p>
                <div class="flex gap-4 md:justify-end">
                    <!-- Social media placeholders -->
                    <a href="#" class="text-gray-medium hover:text-white transition-colors" aria-label="GitHub">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-700 pt-8 text-center">
            <p class="text-gray-medium text-sm">
                © 2026 AI-Native Smart Task Manager. All rights reserved.
            </p>
        </div>
    </div>
</footer>
```

**Step 2: Verify footer displays**

Open `index.html` in browser
Expected: Dark footer with 3-column layout, links, social icons, and copyright

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add footer with links and copyright"
```

---

## Task 10: Add scroll animations using Intersection Observer

**Files:**
- Modify: `js/main.js`

**Step 1: Add scroll animation JavaScript**

Add this code to the end of `js/main.js`:

```javascript
// Scroll animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('section > div');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});
```

**Step 2: Test scroll animations**

Open `index.html` in browser
1. Scroll down the page
Expected: Sections fade in and slide up as they enter viewport

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add scroll animations with Intersection Observer"
```

---

## Task 11: Test responsive design on mobile devices

**Files:**
- No file changes

**Step 1: Open browser DevTools and test mobile viewports**

1. Open `index.html` in browser
2. Open DevTools (F12 or Cmd+Option+I)
3. Toggle device toolbar (Cmd+Shift+M)
4. Test various viewport sizes:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - Desktop (1920px)

**Step 2: Verify responsive behavior**

For each viewport:
- Navigation: Logo and language toggle visible, menu accessible
- Hero section: Text and buttons properly sized
- Features: 1 column on mobile, 3 on desktop
- User scenarios: 1 column on mobile, 2 on desktop
- Comparison table: Horizontal scroll on mobile
- Footer: Stacked on mobile, 3 columns on desktop

**Step 3: Test language switching on mobile**

1. Toggle language on mobile viewport
Expected: All text switches language correctly

2. Test mobile menu (if implemented)
Expected: Menu opens and navigation works

**Step 4: Document any issues found**

Create list of responsive design issues if any

**Step 5: Commit if fixes needed**

```bash
# If fixes were made
git add index.html
git commit -m "fix: resolve responsive design issues"
```

---

## Task 12: Final testing and optimization

**Files:**
- No new files (testing phase)

**Step 1: Run performance audit**

1. Open `index.html` in Chrome
2. Open DevTools Lighthouse tab
3. Run performance audit
4. Review scores and recommendations

**Step 2: Verify all functionality**

- [ ] Language switching works and persists
- [ ] All navigation links scroll smoothly
- [ ] All sections display correctly in both languages
- [ ] Buttons and links are clickable
- [ ] Hover effects work
- [ ] Scroll animations trigger
- [ ] Footer links are valid

**Step 3: Check browser compatibility**

Test in multiple browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if on Mac)

**Step 4: Validate HTML**

Use online validator: https://validator.w3.org/

**Step 5: Verify accessibility**

Check:
- Semantic HTML structure
- Alt text on images
- ARIA labels on icon buttons
- Keyboard navigation (Tab through page)
- Color contrast ratios

**Step 6: Final commit**

```bash
git add .
git commit -m "feat: complete landing page implementation with all features"
```

---

## Task 13: Merge feature branch to master

**Files:**
- No file changes (git operations)

**Step 1: Switch to master branch**

```bash
cd .worktrees/landing-page
git checkout master
```

**Step 2: Merge feature branch**

```bash
git merge feature/landing-page --no-ff -m "Merge feature/landing-page: Complete landing page implementation"
```

**Step 3: Push to remote**

```bash
git push origin master
```

**Step 4: Verify deployment**

1. Visit GitHub Pages URL
2. Test all functionality in production

**Step 5: Clean up worktree (optional)**

```bash
# From main repository
git worktree remove .worktrees/landing-page
```

---

## Next Steps After Implementation

1. **Add actual media assets**:
   - Place screenshot in `assets/images/screenshot.png`
   - Place demo videos in `assets/videos/demo-zh.mp4` and `assets/videos/demo-en.mp4`
   - Place infographics in `assets/images/infographic-zh.png` and `assets/images/infographic-en.png`
   - Place audio files in `assets/audio/podcast-zh.m4a` and `assets/audio/podcast-en.m4a`

2. **Consider future enhancements**:
   - FAQ section with accordion
   - User testimonials/reviews
   - Download page with platform-specific links
   - Analytics integration
   - SEO optimization (meta tags, Open Graph, Twitter Cards)

3. **Content review**:
   - Have native speakers review translations
   - Verify all claims about the product
   - Check for grammatical errors

4. **Performance monitoring**:
   - Set up GitHub Pages deployment monitoring
   - Track page load times
   - Monitor user engagement if analytics added

---

**Implementation Plan Complete**

This plan provides a comprehensive, step-by-step guide to building the Smart Task Manager landing page. Each task includes exact file paths, complete code snippets, testing instructions, and commit messages.

The plan follows TDD principles where applicable, uses DRY practices, implements YAGNI (no unnecessary features), and encourages frequent commits for easy rollback.
