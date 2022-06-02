import { LocationInfo } from 'ui/locationInfo/LocationInfo';

export const Help = () => {
  return (
    <>
      <h2>Help</h2>
      <p>
        This project was bootstrapped with <a href="https://github.com/facebook/create-react-app">Create React App</a>{' '}
        and modified by TSH team.
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
        See the section about <a href="https://facebook.github.io/create-react-app/docs/running-tests">
          running tests
        </a>{' '}
        for more information.
      </p>
      <h4 id="-npm-run-coverage-">
        <code>npm run coverage</code>
      </h4>
      <p>
        Launches the test runner in the coverage report generation mode.
        <br />
        See <a href="https://create-react-app.dev/docs/running-tests/#coverage-reporting">this</a> section for more
        information.
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
        See the section about <a href="https://facebook.github.io/create-react-app/docs/deployment">deployment</a> for
        more information.
      </p>
      <h4 id="-npm-run-eject-">
        <code>npm run eject</code>
      </h4>
      <p>
        <strong>
          Note: this is a one-way operation. Once you <code>eject</code>, you can’t go back!
        </strong>
      </p>
      <p>
        If you aren’t satisfied with the build tool and configuration choices, you can <code>eject</code> at any time.
        This command will remove the single build dependency from your project.
      </p>
      <p>
        Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc)
        right into your project so you have full control over them. All of the commands except <code>eject</code> will
        still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
      </p>
      <p>
        You don’t have to ever use <code>eject</code>. The curated feature set is suitable for small and middle
        deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t
        be useful if you couldn’t customize it when you are ready for it.
      </p>
      <h3 id="learn-more">Learn More</h3>
      <p>
        You can learn more in the{' '}
        <a href="https://facebook.github.io/create-react-app/docs/getting-started">Create React App documentation</a>.
      </p>
      <p>
        To learn React, check out the <a href="https://reactjs.org/">React documentation</a>.
      </p>
      <hr />
      <LocationInfo />
    </>
  );
};
