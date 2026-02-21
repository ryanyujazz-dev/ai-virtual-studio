export type TranslationKey =
  // Header
  | 'app.name'
  | 'nav.projects'
  | 'nav.templates'
  | 'nav.assets'
  | 'nav.settings'
  // Dashboard
  | 'dashboard.title'
  | 'dashboard.subtitle'
  | 'filter.all'
  | 'filter.drafts'
  | 'filter.rendering'
  | 'filter.completed'
  | 'projectcard.duration'
  | 'projectcard.format'
  | 'empty.title'
  | 'empty.description'
  // Create Modal
  | 'modal.createTitle'
  | 'modal.projectName'
  | 'modal.projectNamePlaceholder'
  | 'modal.aspectRatio'
  | 'modal.createButton'
  | 'modal.disabledButton'
  // Settings
  | 'settings.title'
  | 'settings.back'
  | 'settings.description'
  | 'settings.language'
  | 'settings.languageEnglish'
  | 'settings.languageChinese'
  // Time
  | 'time.justNow'
  | 'time.minutesAgo'
  | 'time.hoursAgo'
  | 'time.yesterday'
  | 'time.daysAgo'
  // Status
  | 'status.draft'
  | 'status.rendering'
  | 'status.completed'
  // Editor
  | 'editor.project'
  | 'script.title'
  | 'script.description'
  | 'scene.title'
  | 'scene.description'
  | 'final.title'
  | 'final.description'
  // Script Editor
  | 'script.addScene'
  | 'script.emptyTitle'
  | 'script.emptyDescription'
  | 'script.nextStep'
  // Scene Editor
  | 'scene'
  | 'scene.voiceover'
  | 'scene.voiceoverPlaceholder'
  | 'scene.visualPrompt'
  | 'scene.visualPromptPlaceholder'
  | 'scene.duration'
  // AI Planning
  | 'ai.planning'
  | 'ai.templates'
  | 'ai.keywords'
  | 'ai.keywordsPlaceholder'
  | 'ai.generate'
  | 'ai.generating'
  // Common
  | 'common.edit'
  | 'common.save'
  | 'common.cancel';

type Translations = Record<TranslationKey, string>;

export const en: Translations = {
  // Header
  'app.name': 'AI Virtual Studio',
  'nav.projects': 'Projects',
  'nav.templates': 'Templates',
  'nav.assets': 'Assets',
  'nav.settings': 'Settings',

  // Dashboard
  'dashboard.title': 'Project Hall',
  'dashboard.subtitle': 'Curated works & drafts',
  'filter.all': 'All Work',
  'filter.drafts': 'Drafts',
  'filter.rendering': 'Rendering',
  'filter.completed': 'Completed',

  // ProjectCard
  'projectcard.duration': '',
  'projectcard.format': '',

  // Empty State
  'empty.title': 'No projects found',
  'empty.description': 'Create your first project to get started',

  // Create Modal
  'modal.createTitle': 'Create New Project',
  'modal.projectName': 'Project Name',
  'modal.projectNamePlaceholder': 'Enter project name...',
  'modal.aspectRatio': 'Aspect Ratio',
  'modal.createButton': 'Create Project',
  'modal.disabledButton': 'Create Project',

  // Settings
  'settings.title': 'Settings',
  'settings.back': 'Back',
  'settings.description': 'Manage your preferences',
  'settings.language': 'Language',
  'settings.languageEnglish': 'English',
  'settings.languageChinese': '中文',

  // Time
  'time.justNow': 'Just now',
  'time.minutesAgo': 'm ago',
  'time.hoursAgo': 'h ago',
  'time.yesterday': 'Yesterday',
  'time.daysAgo': 'd ago',

  // Status
  'status.draft': 'Draft',
  'status.rendering': 'Rendering',
  'status.completed': 'Completed',

  // Editor
  'editor.project': 'Project',
  'script.title': 'Script Room',
  'script.description': 'Create and edit your video script',
  'scene.title': 'Scene Room',
  'scene.description': 'Generate scenes and takes',
  'final.title': 'Final Room',
  'final.description': 'Compose and export your video',

  // Script Editor
  'script.addScene': 'Add Scene',
  'script.emptyTitle': 'No scenes yet',
  'script.emptyDescription': 'Start by creating your first scene or use AI to generate a script',
  'script.nextStep': 'Continue to Scene Room',

  // Scene Editor
  'scene': 'Scene',
  'scene.voiceover': 'Voiceover',
  'scene.voiceoverPlaceholder': 'Enter the voiceover text...',
  'scene.visualPrompt': 'Visual Prompt',
  'scene.visualPromptPlaceholder': 'Describe the visual elements...',
  'scene.duration': 'Duration',

  // AI Planning
  'ai.planning': 'AI Planning',
  'ai.templates': 'Templates',
  'ai.keywords': 'Keywords',
  'ai.keywordsPlaceholder': 'Enter keywords for custom script generation...',
  'ai.generate': 'Generate Script',
  'ai.generating': 'Generating...',

  // Common
  'common.edit': 'Edit',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
};

export const zh: Translations = {
  // Header
  'app.name': 'AI 虚拟片场',
  'nav.projects': '项目',
  'nav.templates': '模板',
  'nav.assets': '素材',
  'nav.settings': '设置',

  // Dashboard
  'dashboard.title': '项目大厅',
  'dashboard.subtitle': '精选作品与草稿',
  'filter.all': '全部',
  'filter.drafts': '草稿',
  'filter.rendering': '渲染中',
  'filter.completed': '已完成',

  // ProjectCard
  'projectcard.duration': '',
  'projectcard.format': '',

  // Empty State
  'empty.title': '暂无项目',
  'empty.description': '创建第一个项目开始创作',

  // Create Modal
  'modal.createTitle': '创建新项目',
  'modal.projectName': '项目名称',
  'modal.projectNamePlaceholder': '输入项目名称...',
  'modal.aspectRatio': '画幅比例',
  'modal.createButton': '创建项目',
  'modal.disabledButton': '创建项目',

  // Settings
  'settings.title': '设置',
  'settings.back': '返回',
  'settings.description': '管理您的偏好设置',
  'settings.language': '语言',
  'settings.languageEnglish': 'English',
  'settings.languageChinese': '中文',

  // Time
  'time.justNow': '刚刚',
  'time.minutesAgo': '分钟前',
  'time.hoursAgo': '小时前',
  'time.yesterday': '昨天',
  'time.daysAgo': '天前',

  // Status
  'status.draft': '草稿',
  'status.rendering': '渲染中',
  'status.completed': '已完成',

  // Editor
  'editor.project': '项目',
  'script.title': '剧本室',
  'script.description': '创建和编辑您的视频剧本',
  'scene.title': '分镜室',
  'scene.description': '生成场景和镜头',
  'final.title': '成片室',
  'final.description': '合成和导出您的视频',

  // Script Editor
  'script.addScene': '添加分镜',
  'script.emptyTitle': '暂无分镜',
  'script.emptyDescription': '创建第一个分镜或使用 AI 生成剧本',
  'script.nextStep': '继续到分镜室',

  // Scene Editor
  'scene': '分镜',
  'scene.voiceover': '旁白',
  'scene.voiceoverPlaceholder': '输入旁白文本...',
  'scene.visualPrompt': '画面描述',
  'scene.visualPromptPlaceholder': '描述视觉元素...',
  'scene.duration': '时长',

  // AI Planning
  'ai.planning': 'AI 策划',
  'ai.templates': '模板',
  'ai.keywords': '关键词',
  'ai.keywordsPlaceholder': '输入关键词自定义生成剧本...',
  'ai.generate': '生成剧本',
  'ai.generating': '生成中...',

  // Common
  'common.edit': '编辑',
  'common.save': '保存',
  'common.cancel': '取消',
};

export const translations = { en, zh };
export type { Translations };

export function getTranslation(language: 'en' | 'zh'): Translations {
  return translations[language];
}