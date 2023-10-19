import { lstatSync, readdirSync } from 'fs';
import path from 'path';

const isDirectory = (source: string): boolean => lstatSync(source).isDirectory();

const getDirectories = (source: string): string[] =>
  readdirSync(source)
    .map((name) => path.join(source, name))
    .filter(isDirectory);

const NAME_REGEX = /[^\/]+$/;

const apiActionCollections = getDirectories(`./src/api/actions`)
  .map(collection => {
    const result = NAME_REGEX.exec(collection);

    if (!result) {
      return '';
    }

    return result[0].trimStart().trimEnd();
  });

export const apiActionCollectionDefaultChoice = apiActionCollections[0];

export const apiActionCollectionChoices = apiActionCollections.map((collection) => ({
  name: collection,
  value: collection
}));

export const getPlaceholderPattern = (pattern: string) => new RegExp(`(\/\/ ${pattern})`, 's');
