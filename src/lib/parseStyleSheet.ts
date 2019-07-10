import { readFileSync } from 'fs';
import * as sass from 'node-sass';

export const parseStyleSheet = (stylesheet: string): string => {

  if (!stylesheet) return '';

  if (stylesheet.includes('.scss')) {
    try {
      const styles = sass.renderSync({
        file: stylesheet
      });

      return styles.css;
    } catch (e) {
      return '';
    }
  }

  try {
    const styles = readFileSync(stylesheet, 'utf8');

    return styles;
  } catch (e) {
    return '';
  }

};
