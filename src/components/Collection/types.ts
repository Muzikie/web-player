import { Entity } from '../Entity/types';

export interface CollectionProps {
  className?: string;
  direction?: string;
  title?: string;
  itemTheme?: string;
  itemsPerColumn?: string;
  items: Entity[];
}
