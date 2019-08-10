# ef-full-stack-frontend

This is the frontend for the EF Full-stack home assignment. It was bootstrapped with the TypeScript version [Create React App](https://github.com/facebook/create-react-app).

It uses [Material-UI](https://material-ui.com/) for the user interface. To display an infinite list of images while keeping the memory frontent lowm we use the [Masonry](https://bvaughn.github.io/react-virtualized/#/components/Masonry) component from [react-virtualized](https://github.com/bvaughn/react-virtualized). I used Javascript to make the columns of the list responsive based on the `window.innerWidth`. Right now, each image thumbnail has a width of `220px` but it would be easy to adopt the design to different requirements. For example we could display a single column for mobiles with image width equal to the screen width minus some style padding.

We use the `srcset` attribute in `<img>` elements to set thumbnails depending on the pixel density of the screen. This will save bandwidth on lower pixel density screens and offer better image quality (at the cost of more bandwidth) for higer pixel density screens.

We use a custom service worker to cache not only the App shell but also the response from the API -- both the `api/list` route and the static image responses -- for better user experience. Since these are opaque requests with different levels of significance for the functionality of our App we use a NetworkFirst strategy fot the `api/list` and CacheFist strategy for the images with an expiration day. To run the service worker version first build the app using `npm run build` and then serve the app with a static server from the build dir.

Finally, From the project requirements it's not very clear if clicking on an image should display it or navigate the browser to the Picsum image page. Both are easy to implement either with a new view in React or with an anchor tag that navigates to the Picsum image.

## API

This frontend uses the express.js API server of [ef-full-stack-backend](https://github.com/triglian/ef-full-stack-backend). The first iteration of this API was just wrapping the Piscum API, the the latest augments it with thumbnail sized versions of the images for better bandwidth utilization.

## Dev

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build-sw`

Builds a custom service worker using [Workbox](https://developers.google.com/web/tools/workbox/). Run this after `react-scripts build`.

#### `npm run clean-cra-sw`

Cleans up the default CRA Service Worker. Run this after `react-scripts build`.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
