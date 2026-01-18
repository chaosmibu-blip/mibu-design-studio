import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

// 定義可用的圖示名稱類型
export type IconName = keyof typeof LucideIcons;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

/**
 * 動態渲染 Lucide 圖示的元件
 * 用於替代 emoji，保持品牌風格一致
 */
const Icon = ({ name, ...props }: IconProps) => {
  // 獲取對應的圖示元件
  const IconComponent = LucideIcons[name as IconName] as React.ComponentType<LucideProps>;
  
  if (!IconComponent) {
    // 如果找不到圖示，返回一個佔位符
    console.warn(`Icon "${name}" not found in lucide-react`);
    return <LucideIcons.HelpCircle {...props} />;
  }
  
  return <IconComponent {...props} />;
};

export default Icon;
