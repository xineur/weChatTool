// main侧边栏
export interface NavigationItem {
  title: string;
  icon: string;
  href: string;
}

// 设置页面侧边栏
export interface ToolTip {
  title: string,
  index: number,
  active: string
}
