# react-ga-gtm
### React Google Analytics Module / Supports GTM

[![Build Status](https://img.shields.io/travis/Tap30/react-ga-gtm/master.svg?style=flat-square)](https://travis-ci.org/react-ga/react-ga)
[![npm version](https://img.shields.io/npm/v/react-ga-gtm.svg?style=flat-square)](https://www.npmjs.com/package/react-ga)
[![npm downloads](https://img.shields.io/npm/dm/react-ga-gtm.svg?style=flat-square)](https://www.npmjs.com/package/react-ga)

This is a JavaScript module that can be used to include Google Analytics tracking code in a website or app that uses [React](https://facebook.github.io/react/) for its front-end codebase. It does not currently use any React code internally, but has been written for use with a number of Mozilla Foundation websites that are using React, as a way to standardize our GA Instrumentation across projects.

It is designed to work with the latest version of Google Analytics, [Universal Analytics](https://support.google.com/analytics/answer/2790010). At this point, all Google Analytics projects are being upgraded to Universal Analytics, so this module will not support the older `ga.js` implementation.

This module is mildly opinionated in how we instrument tracking within our front-end code. Our API is slightly more verbose than the core Google Analytics library, in the hope that the code is easier to read and understand for our engineers. See examples below.

If you use `react-ga` too, we'd love your feedback. Feel free to file [issues, ideas and pull requests against this repo](https://github.com/Tap30/react-ga-gtm/issues).

## Installation

With [npm](https://www.npmjs.com/):
```bash
npm install react-ga-gtm --save
```

With [bower](http://bower.io/):
```bash
bower install react-ga-gtm --save
```

Note that [React](https://github.com/facebook/react) >= 0.14.0 is needed in order to use the `<OutboundLink>` component.

## Usage

### With npm

Initializing GA and Tracking Pageviews:

```js
import ReactGA from 'react-ga-gtm';
ReactGA.initialize('UA-000000-01');
ReactGA.pageview(window.location.pathname + window.location.search);
```

### With bower

When included as a script tag, a variable `ReactGA` is exposed in the global scope.

```js

<!-- The core React library -->
<script src="https://unpkg.com/react@15.5.0/dist/react.min.js"></script>
<!-- The ReactDOM Library -->
<script src="https://unpkg.com/react-dom@15.5.0/dist/react-dom.min.js"></script>
<!-- ReactGA library -->
<script src="/path/to/bower_components/react-ga-gtm/dist/react-ga.min.js"></script>

<script>
  ReactGA.initialize('UA-000000-01', { debug: true });
</script>
```

### Demo Code

For a working demo have a look at the [demo files](/demo) or clone this repo and run `npm install` `npm start` then open http://localhost:8080 and follow the instructions.
Demo requires you to have your own TrackingID.

## Upgrading from `1.x` to `2.x`

You can safely upgrade to `2.x` as there are no breaking changes. The main new feature is that the underlying `ga` function is now exposed via the property `ReactGA.ga`. This can be helpful when you need a function that `ReactGA` doesn't support at the moment. Also, for that reason, it is recommended that you rename your imported value as `ReactGA` rather than `ga` so as to distinguish between the React GA wrapper and the original `ga` function.

## Community Components

While some convenience components are included inside the package, some are specific to each application.
A community curated list of these is available in the wiki: https://github.com/Tap30/react-ga-gtm/wiki/Community-Components. Feel free to add any you have found useful.

## API

#### ReactGA.initialize(gaTrackingID, options)

GA must be initialized using this function before any of the other tracking functions will record any data. The values are checked and sent through to the `ga('create', ...` call.

###### Example

```js
ReactGA.initialize('UA-000000-01', {
  debug: true,
  titleCase: false,
  gaOptions: {
    userId: 123
  }
});
```

Or with multiple trackers

```js
ReactGA.initialize([{
  trackingId: 'UA-000000-01',
  gaOptions: {
    name: 'tracker1',
    userId: 123
  }
}, {
 trackingId: 'UA-000000-02',
 gaOptions: { name: 'tracker2' }
}], { debug: true, alwaysSendToDefaultTracker: false });
```


|Value|Notes|
|------|-----|
|gaTrackingID| `String`. Required. GA Tracking ID like `UA-000000-01`.|
|options.debug| `Boolean`. Optional. If set to `true`, will output additional feedback to the console.|
|options.titleCase| `Boolean`. Optional. Defaults to `true`. If set to `false`, strings will not be converted to title case before sending to GA.|
|options.gaOptions| `Object`. Optional. [GA configurable create only fields.](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference)|
|options.gaAddress| `String`. Optional. If you are self-hosting your `analytics.js`, you can specify the URL for it here.
|options.alwaysSendToDefaultTracker| `Boolean`. Optional. Defaults to `true`. If set to `false` _and_ using multiple trackers, the event wll not be send to the default tracker|

If you are having additional troubles and setting `debug = true` shows as working please try using the [Chrome GA Debugger Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna).
This will help you figure out if your implementation is off or your GA Settings are not correct.

#### ReactGA.set(fieldsObject)

###### Example

```js
ReactGA.set({ userId: 123 });
```

|Value|Notes|
|------|-----|
|fieldsObject|`Object`. e.g. `{ userId: 123 }`|

#### ReactGA.pageview(path)

###### Example

```js
ReactGA.pageview('/about/contact-us');
```

|Value|Notes|
|------|-----|
|path|`String`. e.g. '/get-involved/other-ways-to-help'|
|trackerNames|`Array`. Optional. A list of extra trackers to run the command on|
|title|`String`. Optional. e.g. 'Other Ways to Help'|

See example above for use with `react-router`.

#### ReactGA.modalview(modalName)

A modal view is often an equivalent to a pageview in our UX, but without a change in URL that would record a standard GA pageview. For example, a 'contact us' modal may be accessible from any page in a site, even if we don't have a standalone 'contact us' page on its own URL. In this scenario, the modalview should be recorded using this function.

###### Example

```js
ReactGA.modalview('/about/contact-us');
```

|Value|Notes|
|------|-----|
|modalName|`String`. E.g. 'login', 'read-terms-and-conditions'|

#### ReactGA.event(args)

Tracking in-page `event` interactions is key to understanding the use of any interactive web property. This is how we record user interactions that don't trigger a change in URL.

###### Examples

```js
ReactGA.event({
  category: 'User',
  action: 'Created an Account'
});

ReactGA.event({
  category: 'Social',
  action: 'Rated an App',
  value: 3
});

ReactGA.event({
  category: 'Editing',
  action: 'Deleted Component',
  label: 'Game Widget'
});

ReactGA.event({
  category: 'Promotion',
  action: 'Displayed Promotional Widget',
  label: 'Homepage Thing',
  nonInteraction: true
});
```

|Value|Notes|
|------|-----|
|args.category|`String`. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.|
|args.action|`String`. Required. A description of the behaviour. E.g. 'Clicked Delete', 'Added a component', 'Deleted account', etc.|
|args.label|`String`. Optional. More precise labelling of the related action. E.g. alongside the 'Added a component' action, we could add the name of a component as the label. E.g. 'Survey', 'Heading', 'Button', etc.|
|args.value|`Int`. Optional. A means of recording a numerical value against an event. E.g. a rating, a score, etc.|
|args.nonInteraction|`Boolean`. Optional. If an event is not triggered by a user interaction, but instead by our code (e.g. on page load, it should be flagged as a `nonInteraction` event to avoid skewing bounce rate data.|
|args.transport|`String`. Optional. This specifies the transport mechanism with which hits will be sent. Valid values include 'beacon', 'xhr', or 'image'.|

#### ReactGA.timing(args)

Allow to measure periods of time such as AJAX requests and resources loading by sending hits using the analytics.js library. For more detailed description, please refer to https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings.

###### Example

Usage:

```js
ReactGA.timing({
  category: 'JS Libraries',
  variable: 'load',
  value: 20, // in milliseconds
  label: 'CDN libs'
});
```

This is equivalent to the following Google Analytics command:

```js
ga('send', 'timing', 'JS Libraries', 'load', 20, 'CDN libs');
```

|Value|Notes|
|------|-----|
|args.category|`String`. Required. A string for categorizing all user timing variables into logical groups.|
|args.variable|`String`. Required. Name of the variable being recorded.|
|args.value|`Int`. Required. Number of milliseconds elapsed time to report.|
|args.label|`String`. Optional. It can improved visibility in user timing reports.|

#### ReactGA.ga()

The original `ga` function can be accessed via this method. This gives developers the flexibility of directly
using `ga.js` features that have not yet been implemented in `ReactGA`. No validations will be done
by `ReactGA` as it is being bypassed if this approach is used.

If no arguments are passed to `ReactGA.ga()`, the `ga` object is returned instead.

###### Example

Usage with arguments:

```js
ReactGA.ga('send', 'pageview', '/mypage');
```

Usage without arguments:

```js
var ga = ReactGA.ga();
ga('send', 'pageview', '/mypage');
```

#### ReactGA.outboundLink(args, hitCallback)

Tracking links out to external URLs (including id.webmaker.org for OAuth 2.0 login flow). A non-programmatic approach is found in the next section, by using an `<OutboundLink>` component.

###### Example

```js
ReactGA.outboundLink({
  label: 'Clicked Create an Account'
}, function () {
  console.log('redirect here');
});
```

|Value|Notes|
|------|-----|
|args.label|`String`. Required. Description of where the outbound link points to. Either as a URL, or a string.|
|hitCallback|`function`. The react-ga-gtm implementation accounts for the possibility that GA servers are down, or GA is blocked, by using a fallback 250ms timeout. See [notes in GA Dev Guide](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#hitCallback)|

### `<OutboundLink>` Component

Outbound links can directly be used as a component in your React code and the event label will be sent directly to ReactGA.

###### Example

```js
var ReactGA = require('react-ga-gtm');

render() {
  return (
    <div>
      <ReactGA.OutboundLink
        eventLabel="myLabel"
        to="http://www.example.com"
        target="_blank">
        My Link
      </ReactGA.OutboundLink>
    </div>
  );
}
```

|Value|Notes|
|------|-----|
|eventLabel|`String`. Required. Description of where the outbound link points to. Either as a URL, or a string.|
|to|`String`. Required. URL the link leads to.|
|target|`String`. Optional. To open the link in a new tab, use a value of `_blank`.|

For bower, use the `<ReactGA.OutboundLink>` component.


#### ReactGA.exception(args)

[GA exception tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions)

###### Example

```js
ReactGA.exception({
  description: 'An error ocurred',
  fatal: true
});
```

|Value|Notes|
|------|-----|
|args.description|`String`. Optional. Description of what happened.|
|args.fatal|`String`. Optional. Set to `true` if it was a fatal exception.|


#### ReactGA.plugin.require(name, [options])

Require GA plugins.

###### Example
```js
ReactGA.plugin.require('localHitSender', { path: '/log', debug: true });
```

|Value|Notes|
|------|-----|
|name|`String`. Required. The name of the plugin to be required. Note: if the plugin is not an official analytics.js plugin, it must be provided elsewhere on the page.|
|options|`Object`. Optional. An initialization object that will be passed to the plugin constructor upon instantiation.|


#### ReactGA.plugin.execute(pluginName, action, [actionType], [payload])

Execute the `action` for the `pluginName` with the payload.

###### Example

```js
ReactGA.plugin.execute('ecommerce', 'addTransaction', {
  id: 'jd38je31j',
  revenue: '3.50'
});
```

You can use this function with four arguments to pass `actionType` and `payload` along with executed action

###### Example

```js
ReactGA.plugin.execute('ec', 'setAction', 'purchase', {
  id: 'jd38je31j',
  revenue: '3.50'
});
```

### Test Mode

To enable test mode, initialize ReactGA with the `testMode: true` option. Here's an example from `tests/utils/testMode.test.js`
```js
// This should be part of your setup
ReactGA.initialize('foo', { testMode: true });
// This would be in the component/js you are testing
ReactGA.ga('send', 'pageview', '/mypage');
// This would be how you check that the calls are made correctly
ReactGA.testModeAPI.calls.should.eql([
  ['create', 'foo', 'auto'],
  ['send', 'pageview', '/mypage']
]);
```

---

## Development

### Prerequisites

* node.js
* npm
* `npm install`
* `npm install react@^15.6.1 prop-types@^15.5.10` - This is for the optionalDependancies.

### To Test
```bash
npm test
```

### Submitting a PR

* Always work on a new branch
* Submit Pull Requests against `master`

1. Open a PR
1. Request code review
1. Complete code review with fixes
1. Merge the PR
1. Then, bump the version as below

The regenerated `dist` files should not be committed until the review has been R+'d and merged, since it's much easier to do the code review without the `dist` clutter getting in the way.

### To Ship (i.e bump the version number)

```bash
git pull...
gulp build
mversion patch
git add .
git commit...
git push...
npm publish
```

---

#### Acknowledgements

* Quite a lot of the code in this repo, came from [webmaker-analytics](https://github.com/mozilla/webmaker-analytics).
