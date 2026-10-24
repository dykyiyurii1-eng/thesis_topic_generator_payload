export type BlockType = 'hero' | 'features' | 'contacts'
export type ButtonVariant = 'primary' | 'secondary' | 'outline'

export type ImageData = { src: string; alt: string }
export type HeroButton = { text: string; link: string; variant: ButtonVariant }
export type FeatureItem = { icon?: string; title: string; text: string }
export type MenuItem = { label: string; link: string }

export type BaseBlock = { anchor?: string }

export type HeroBlock = BaseBlock & {
  type: 'hero'
  badge?: string
  title: string
  subtitle: string
  image: ImageData
  buttons?: HeroButton[]
}

export type FeaturesBlock = BaseBlock & {
  type: 'features'
  title: string
  items?: FeatureItem[]
}

export type ContactsBlock = BaseBlock & {
  type: 'contacts'
  title: string
  email: string
  phone?: string
  github?: string
  address?: string
}

export type Block = HeroBlock | FeaturesBlock | ContactsBlock

export type PageResponse = { path: string; title: string; blocks: Block[] }
export type SiteSettings = { siteName: string; menu: MenuItem[]; footer: string }