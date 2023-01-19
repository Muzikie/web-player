import { Entity } from '../Entity/types';
import { entityTheme } from '../Entity/types';

export enum liskThemes {
  smallRow = 'smallRow',
  normal = 'normal',
  wide = 'wide',
}

export type collectionTheme = liskThemes | undefined;

export interface LiskProps {
  className?: string;
  direction?: string;
  title?: string;
  itemTheme?: entityTheme;
  theme?: collectionTheme;
  items: Entity[];
}
