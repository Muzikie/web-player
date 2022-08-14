import { Entity } from '../Entity/types';
import { entityTheme } from '../Entity/types';

export enum collectionThemes {
  smallRow = 'smallRow',
  normal = 'normal',
  wide = 'wide',
}

export type collectionTheme = collectionThemes | undefined;

export interface CollectionProps {
  className?: string;
  direction?: string;
  title?: string;
  itemTheme?: entityTheme;
  theme?: collectionTheme;
  items: Entity[];
}
