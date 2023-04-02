import { LocationInfo } from 'ui/locationInfo/LocationInfo';

export const Help = () => {
  return (
    <>
      <h2>Help</h2>
      <p>
        This project was bootstrapped with <a href="https://github.com/vitejs/vite">Vite</a> and modified by TSH team.
      </p>
      <h3 id="available-scripts">Available Scripts</h3>
      <p>In the project directory, you can run:</p>
      <h4 id="-npm-start-">
        <code>npm start</code>
      </h4>
      <p>
        Runs the app in the development mode.
        <br />
        Open <a href="http://localhost:3000">http://localhost:3000</a> to view it in the browser.
      </p>
      <p>
        The page will reload if you make edits.
        <br />
        You will also see any lint errors in the console.
      </p>
      <h4 id="-npm-test-">
        <code>npm test</code>
      </h4>
      <p>
        Launches the test runner in the interactive watch mode.
        <br />
        See the section about <a href="https://vitest.dev/guide/cli.html">running tests</a> for more information.
      </p>
      <h4 id="-npm-run-coverage-">
        <code>npm run coverage</code>
      </h4>
      <p>
        Launches the test runner in the coverage report generation mode.
        <br />
        See <a href="https://vitest.dev/guide/coverage.html">this</a> section for more information.
      </p>
      <h4 id="-npm-run-build-">
        <code>npm run build</code>
      </h4>
      <p>
        Builds the app for production to the <code>build</code> folder.
        <br />
        It correctly bundles React in production mode and optimizes the build for the best performance.
      </p>
      <p>
        The build is minified and the filenames include the hashes.
        <br />
        Your app is ready to be deployed!
      </p>
      <p>
        See the section about <a href="https://vitejs.dev/guide/static-deploy.html">deployment</a> for more information.
      </p>
      <h3 id="learn-more">Learn More</h3>
      <p>
        You can learn more in the <a href="https://vitejs.dev/guide/">Vite documentation</a>.
      </p>
      <p>
        To learn React, check out the <a href="https://reactjs.org/">React documentation</a>.
      </p>
      <hr />
      <LocationInfo />
    </>
  );
};
