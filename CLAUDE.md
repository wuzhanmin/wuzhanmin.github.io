# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll blog using the Jacman theme (a port of Hexo Jacman). It's deployed as a GitHub Pages site at `wuzhanmin.github.io`.

## Development Commands

### Local Development
```bash
# Install dependencies (first time only)
bundle install

# Start local Jekyll server
bundle exec jekyll server

# Serve at specific port
bundle exec jekyll server --port 4001
```

The site will be available at `http://localhost:4000`

### Building
```bash
# Build the site for production
bundle exec jekyll build
```

## Architecture

### Theme Structure (Jacman)

The Jacman theme uses a modular include-based architecture:

- **`_includes/layout.html`**: Master layout controller that conditionally renders different page structures based on layout type
- **`_includes/_partial/`**: Reusable partial components (head, header, footer, sidebar, article elements)
- **`_includes/_widget/`**: Sidebar widgets (category, tag, tagcloud, links, douban, github-card, rss, weibo)
- **`_layouts/`**: Layout templates that wrap content with the theme structure
  - `default.html`: Base layout (includes layout.html)
  - `post.html`: Blog post layout
  - `page.html`: Static page layout (no sidebar)
  - `photo.html`: Photo gallery layout
  - `archives.html`, `categories.html`, `tags.html`, `search.html`: Special pages

### Layout Logic

The `layout.html` file controls rendering based on page type:
- **Post/Photo pages**: Full layout with sidebar and article content
- **Page layout**: Static pages without sidebar
- **Search/Categories/Tags/Archives**: Special listing pages
- **Default**: Standard layout with sidebar

### Content Organization

- **`_posts/`**: Blog posts in format `YYYY-MM-DD-title.md`
  - Must include YAML front matter with `layout: post`, `title`, `date`, `categories`, `tags`
- **`_drafts/`**: Draft posts not published to production
- **Special pages**:
  - `about/` - About page
  - `archives/index.html` - Archive listing (layout: archives)
  - `categories/index.html` - Categories listing (layout: categories)
  - `tags/index.html` - Tags listing (layout: tags)
  - `search/` - Search functionality

### Configuration

- **`_config.yml`**: Main Jekyll configuration
  - Theme settings (menu, widgets, images, author info)
  - Feature toggles (TOC, comments, analytics, search)
  - Language settings (`language: zh-CN` for Chinese)
  - Pagination: 20 posts per page

### Internationalization

Language files in `_data/languages/`:
- `zh-CN.yml`, `zh-TW.yml`, `en.yml`, `de.yml`
- Current language set in `_config.yml` (line 38: `language: zh-CN`)
- Variables accessed via `site.data.languages[site.language]` in templates

### Custom Plugins

- **`_plugins/debug.rb`**: Liquid debug filter for inspecting template variables
  - Usage: `{{ site | debug }}` or `{{ site.posts | debug }}`

## Adding New Blog Posts

1. Create file in `_posts/` with naming convention: `YYYY-MM-DD-title.md`
2. Include required front matter:
```yaml
---
title: Post Title
layout: post
date: YYYY-MM-DD HH:MM:SS +0800
categories: [Category Name]
tags: [tag1, tag2]
---
```
3. Write content in Markdown
4. Test locally with `bundle exec jekyll server`

## Key Features Configured

- **Markdown**: kramdown with GFM input
- **Highlighting**: rouge (pygments is deprecated)
- **Search**: Simple Jekyll Search enabled (`simple_jekyll_search: enable: true`)
- **MathJax**: Enabled (`mathjax: true`)
- **TOC**: Table of contents in articles and sidebar
- **Widgets**: category, tag, tagcloud, links, douban, rss
- **Comment systems**: Disabled (duoshuo, disqus, hypercomments all empty)
- **Analytics**: Google Analytics, Baidu Tongji, CNZZ all disabled

## Important Notes

- This is a GitHub Pages site - must use supported gems (github-pages in Gemfile)
- Image assets should be placed in `assets/` directory
- The site uses the Jacman theme - modifications to theme structure should respect the modular partial system
- When modifying templates, remember that `layout.html` is the main controller and changes here affect all page types
- Language-dependent content should use the `lang` variable: `{% assign lang = site.data.languages[site.language] %}`
