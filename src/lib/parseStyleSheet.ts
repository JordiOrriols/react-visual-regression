import { readFileSync } from 'fs';

export const parseStyleSheet = function (stylesheet: string): string {
  try {
    const styles = readFileSync(stylesheet, 'utf8');
    return styles;
  } catch (e) {
    return '';
  }
};
