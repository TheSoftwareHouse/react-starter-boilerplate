import {lstatSync, readdirSync} from "fs";
import path from "path";

const NAME_REGEX = /[^\/]+$/;

const isDirectory = (source) => lstatSync(source).isDirectory();

export const getDirectoriesList = (source) =>
  readdirSync(source)
    .map((name) => path.join(source, name))
    .filter(isDirectory)
    .map((directoryName) => NAME_REGEX.exec(directoryName)[0].trimStart().trimEnd());

export const getPlaceholderPattern = (pattern) => new RegExp(`(\/\/ ${pattern})`, 's');
