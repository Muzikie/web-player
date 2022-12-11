export interface TabItem {
  title: string;
  to: string;
  inactive?: boolean;
}

export interface TabsProps {
  items: TabItem[];
}
