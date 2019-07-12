import { readFileSync } from 'fs';
import * as sass from 'node-sass';

export const parseStyleSheet = (stylesheet: string): string => {

  if (!stylesheet) return '';

  if (stylesheet.includes('.scss')) {
    try {
      const styles = sass.renderSync({
        file: stylesheet
      });

      return styles.css.toString();
    } catch (e) {
      throw new Error(`Error when loading SCSS at path "${stylesheet}"`);
    }
  }

  try {
    const styles = readFileSync(stylesheet, 'utf8');

    return styles;
  } catch (e) {
    throw new Error(`Error when loading CSS at path "${stylesheet}"`);
  }

};
