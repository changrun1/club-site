// Markdown 文件載入工具
export interface MarkdownFile {
  slug: string
  frontmatter: Record<string, any>
  content: string
}

/**
 * 載入指定類型的 Markdown 文件
 * @param type 文件類型 (events, projects, members, announcements 等)
 * @returns Promise<MarkdownFile[]>
 */
export async function loadMarkdownFiles(type: string): Promise<MarkdownFile[]> {
  try {
    // 使用 Vite 的 import.meta.glob 動態載入 markdown 文件
    const modules = import.meta.glob('/content/**/*.md', { 
      as: 'raw',
      eager: true 
    })
    
    const files: MarkdownFile[] = []
    
    for (const [path, content] of Object.entries(modules)) {
      // 檢查路徑是否符合指定類型
      if (!path.includes(`/content/${type}/`)) {
        continue
      }
      
      // 解析文件名作為 slug
      const slug = path.split('/').pop()?.replace('.md', '') || ''
      
      // 解析 frontmatter 和內容
      const parsed = parseFrontmatter(content as string)
      
      files.push({
        slug,
        frontmatter: parsed.frontmatter,
        content: parsed.content
      })
    }
    
    return files
  } catch (error) {
    console.error(`Failed to load ${type} files:`, error)
    return []
  }
}

/**
 * 解析 Frontmatter
 * @param fileContent 文件內容
 * @returns 解析後的 frontmatter 和內容
 */
function parseFrontmatter(fileContent: string): { frontmatter: Record<string, any>, content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = fileContent.match(frontmatterRegex)
  
  if (!match) {
    return {
      frontmatter: {},
      content: fileContent
    }
  }
  
  const frontmatterText = match[1]
  const content = match[2]
  
  if (!frontmatterText || !content) {
    return {
      frontmatter: {},
      content: fileContent
    }
  }
  
  try {
    // 簡單的 YAML 解析 (僅支援基本格式)
    const frontmatter = parseSimpleYaml(frontmatterText)
    return {
      frontmatter,
      content: content.trim()
    }
  } catch (error) {
    console.error('Failed to parse frontmatter:', error)
    return {
      frontmatter: {},
      content: content.trim()
    }
  }
}

/**
 * 簡單的 YAML 解析器 (僅支援基本格式)
 * @param yamlText YAML 文本
 * @returns 解析後的物件
 */
function parseSimpleYaml(yamlText: string): Record<string, any> {
  const result: Record<string, any> = {}
  const lines = yamlText.split('\n')
  
  let currentKey = ''
  let isArray = false
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    
    if (trimmed.startsWith('- ')) {
      // 陣列項目
      if (isArray && currentKey) {
        if (!Array.isArray(result[currentKey])) {
          result[currentKey] = []
        }
        result[currentKey].push(trimmed.substring(2).replace(/['"]/g, ''))
      }
    } else if (trimmed.includes(':')) {
      // 鍵值對
      const colonIndex = trimmed.indexOf(':')
      const key = trimmed.substring(0, colonIndex).trim()
      const value = trimmed.substring(colonIndex + 1).trim()
      
      currentKey = key
      
      if (value === '') {
        // 可能是陣列的開始
        isArray = true
        result[key] = []
      } else {
        isArray = false
        // 解析值
        result[key] = parseYamlValue(value)
      }
    }
  }
  
  return result
}

/**
 * 解析 YAML 值
 * @param value 值字符串
 * @returns 解析後的值
 */
function parseYamlValue(value: string): any {
  // 移除引號
  const cleaned = value.replace(/^['"]|['"]$/g, '')
  
  // 布林值
  if (cleaned === 'true') return true
  if (cleaned === 'false') return false
  
  // 數字
  if (/^\d+$/.test(cleaned)) return parseInt(cleaned, 10)
  if (/^\d*\.\d+$/.test(cleaned)) return parseFloat(cleaned)
  
  // 字符串
  return cleaned
}

/**
 * 載入單個 Markdown 文件
 * @param type 文件類型
 * @param slug 文件 slug
 * @returns Promise<MarkdownFile | null>
 */
export async function loadMarkdownFile(type: string, slug: string): Promise<MarkdownFile | null> {
  try {
    const files = await loadMarkdownFiles(type)
    return files.find(file => file.slug === slug) || null
  } catch (error) {
    console.error(`Failed to load ${type}/${slug}:`, error)
    return null
  }
}