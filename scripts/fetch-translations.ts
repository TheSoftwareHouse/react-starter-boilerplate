import { fromBabelsheet } from 'babelsheet2-reader';
import { writeJSONFile } from 'babelsheet2-json-writer';
import { groupBy, mergeMap } from 'rxjs/operators';
import path from 'path';

const projectRoot = path.relative(__dirname, process.cwd());
const babelsheetConfig = require(path.join(projectRoot, './babelsheet.json'));

fromBabelsheet({
  spreadsheetId: babelsheetConfig.spreadsheetId,
  credentials: require(path.join(projectRoot, babelsheetConfig.credentials)),
}).pipe(
  groupBy(
    ({ language }) => language,
    { element: ({ path, ...entry }) => ({ ...entry, path: path.join(".") }) }
  ),
  mergeMap(languageEntries$ => languageEntries$.pipe(
    writeJSONFile(`./src/i18n/data/${languageEntries$.key}.json`)
  )),
).subscribe(
  ({ filePath, entryCount }) => {
    console.log(`Wrote file: "${filePath}" with ${entryCount} entries`);
  }
);