# Introduction

The JavaScript ecosystem evolves at incredible speed: staying current can feel
overwhelming. So, instead of you having to stay on top of every new tool,
feature and technique to hit the headlines, this project aims to lighten the
load by providing a curated baseline of the most valuable ones.

- [**Introduction**](introduction.md)
- [FAQ](faq.md)
- [Gotchas](gotchas.md)
- [Debugging](debugging.md)
- [Components](components.md)

# Feature overview

## Instant feedback

Enjoy the best DX and code your app at the speed of thought! Your saved changes
to the CSS and JS are reflected instantaneously without refreshing the page.
Preserve application state even when you update something in the underlying code!

## Predictable state management

We use Redux to manage our applications state. We have also added optional
support for the [Chrome Redux DevTools Extension] – if you have it installed,
you can see, play back and change your action history!

[Chrome Redux DevTools Extension]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

## Next generation JavaScript

Use ESNext template strings, object destructuring, arrow functions, JSX syntax
and more, today. This is possible thanks to Babel with the `env`, `stage-0`
and `react` presets!

## Next generation CSS

Write composable CSS that's co-located with your components using [`styled-components`]
for complete modularity. Unique generated class names keep the specificity low
while eliminating style clashes. Ship only the styles that are used on the
visible page for the best performance.

[`styled-components`]: ../css/styled-components.md

## Industry-standard routing

It's natural to want to add pages (e.g. `/about`) to your application, and
routing makes this possible. Thanks to [react-router] with [react-router-redux],
that's as easy as pie and the url is auto-synced to your application state!

[react-router]: https://github.com/reactjs/react-router
[react-router-redux]: https://github.com/reactjs/react-router-redux

## Performant Web Font Loading

If you simply use web fonts in your project, the page will stay blank until
these fonts are downloaded. That means a lot of waiting time in which users
could already read the content.

[FontFaceObserver](https://github.com/bramstein/fontfaceobserver) adds a class
to the `body` when the fonts have loaded. (see [`app.js`](../../app/app.js)
and [`styles/global-styles.js`](../../app/styles/global-styles.js))

### Adding a new font

1. Either add the `@font-face` declaration to `styles/global-styles.js` or add a `<link>`
tag to the [`index.html`](../../app/index.html). Add a FontFaceObserver to `app.js` if you 
want to use performant loading

2. In `App/styles.css`, specify your initial `font-family` in the `body` tag
with only web-save fonts. In the `body.jsFontLoaded` tag, specify your
`font-family` stack with your web font.

3. In `app.js` add a `<fontName>Observer` for your font.

## Image optimization

Images often represent the majority of bytes downloaded on a web page, so image
optimization can often be a notable performance improvement. Thanks to Webpack's
[`image-loader`](https://github.com/tcoopman/image-webpack-loader), every PNG, JPEG, GIF and SVG images
is optimized.

See [`image-loader`](https://github.com/tcoopman/image-webpack-loader) to customize optimizations options.
