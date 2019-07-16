import { readFileSync } from 'fs';
import * as sass from 'node-sass';

export const parseStyleSheet = (stylesheet: string | string[]): string => {

  if (!stylesheet) return '';

  let stylesheetArray: string[];
  if (!Array.isArray(stylesheet)) stylesheetArray = [stylesheet];
  else stylesheetArray = stylesheet;

  return stylesheetArray.map(getStylesFromFile).join();

};

const getStylesFromFile = (stylesheet: string): string => {
  return (stylesheet.includes('.scss')) ? loadSCSSFile(stylesheet) : loadCSSFile(stylesheet);
};

const loadSCSSFile = (stylesheet: string): string => {
  try {
    const styles = sass.renderSync({
      file: stylesheet
    });

    return styles.css.toString();
  } catch (e) {
    console.error(`Error when loading SCSS at path "${stylesheet}"`);

    return '';
  }
};

const loadCSSFile = (stylesheet: string): string => {
  try {
    return readFileSync(stylesheet, 'utf8');
  } catch (e) {
    console.error(`Error when loading CSS at path "${stylesheet}"`);

    return '';
  }
};