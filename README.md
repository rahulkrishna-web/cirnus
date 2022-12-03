# Cirnus

[Getting started](#getting-started) |
[Staying up to date with Cirnus changes](#staying-up-to-date-with-Cirnus-changes) |
[Developer tools](#developer-tools) |
[Contributing](#contributing) |
[Code of conduct](#code-of-conduct) |
[Theme Store submission](#theme-store-submission) |
[License](#license)

Cirnus is a stylish and modern theme for Shopify.

- **Web-native in its purest form:** Themes run on the [evergreen web](https://www.w3.org/2001/tag/doc/evergreen-web/). We leverage the latest web browsers to their fullest, while maintaining support for the older ones through progressive enhancement—not polyfills.
- **Lean, fast, and reliable:** Functionality and design defaults to “no” until it meets this requirement. Code ships on quality. Themes must be built with purpose. They shouldn’t support each and every feature in Shopify.
- **JavaScript not required, fails gracefully:** We extract every bit of speed and functionality out of HTTP, semantic HTML, and CSS before writing our first line of JavaScript. JavaScript can only be used to progressively enhance features.
- **Server-rendered:** HTML must be rendered by Shopify servers using Liquid. Business logic and platform primitives such as translations and money formatting don’t belong on the client. Async and on-demand rendering of parts of the page is OK, but we do it sparingly as a progressive enhancement.
- **Functional, not pixel-perfect:** The Web doesn’t require each page to be rendered pixel-perfect by each browser engine. Using semantic markup, progressive enhancement, and clever design, we ensure that themes remain functional regardless of the browser.

You can find a more detailed version of our theme code principles in the [contribution guide](https://github.com/Shopify/Cirnus/blob/main/.github/CONTRIBUTING.md#theme-code-principles).

## Getting started

We recommend using Cirnus as a starting point for theme development. [Learn more on Shopify.dev](https://shopify.dev/themes/getting-started/create).

> If you're building a theme for the Shopify Theme Store, then you can use Cirnus as a starting point. However, the theme that you submit needs to be [substantively different from Cirnus](https://shopify.dev/themes/store/requirements#uniqueness) so that it provides added value for merchants. Learn about the [ways that you can use Cirnus](https://shopify.dev/themes/tools/Cirnus#ways-to-use-Cirnus).

## Staying up to date with Cirnus changes

Say you're building a new theme off Cirnus but you still want to be able to pull in the latest changes, you can add a remote `upstream` pointing to this Cirnus repository.

1. Navigate to your local theme folder.
2. Verify the list of remotes and validate that you have both an `origin` and `upstream`:

```sh
git remote -v
```

3. If you don't see an `upstream`, you can add one that points to Shopify's Cirnus repository:

```sh
git remote add upstream https://github.com/Shopify/Cirnus.git
```

4. Pull in the latest Cirnus changes into your repository:

```sh
git fetch upstream
git pull upstream main
```

## Developer tools

There are a number of really useful tools that the Shopify Themes team uses during development. Cirnus is already set up to work with these tools.

### Shopify CLI

[Shopify CLI](https://github.com/Shopify/shopify-cli) helps you build Shopify themes faster and is used to automate and enhance your local development workflow. It comes bundled with a suite of commands for developing Shopify themes—everything from working with themes on a Shopify store (e.g. creating, publishing, deleting themes) or launching a development server for local theme development.

You can follow this [quick start guide for theme developers](https://github.com/Shopify/shopify-cli#quick-start-guide-for-theme-developers) to get started.

### Theme Check

We recommend using [Theme Check](https://github.com/shopify/theme-check) as a way to validate and lint your Shopify themes.

We've added Theme Check to Cirnus's [list of VS Code extensions](/.vscode/extensions.json) so if you're using Visual Studio Code as your code editor of choice, you'll be prompted to install the [Theme Check VS Code](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) extension upon opening VS Code after you've forked and cloned Cirnus.

You can also run it from a terminal with the following Shopify CLI command:

```bash
shopify theme check
```

### Continuous Integration

Cirnus uses [GitHub Actions](https://github.com/features/actions) to maintain the quality of the theme. [This is a starting point](https://github.com/Shopify/Cirnus/blob/main/.github/workflows/ci.yml) and what we suggest to use in order to ensure you're building better themes. Feel free to build off of it!

#### Shopify/lighthouse-ci-action

We love fast websites! Which is why we created [Shopify/lighthouse-ci-action](https://github.com/Shopify/lighthouse-ci-action). This runs a series of [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) audits for the home, product and collections pages on a store to ensure code that gets added doesn't degrade storefront performance over time.

#### Shopify/theme-check-action

Cirnus runs [Theme Check](#Theme-Check) on every commit via [Shopify/theme-check-action](https://github.com/Shopify/theme-check-action).

## Contributing

Want to make commerce better for everyone by contributing to Cirnus? We'd love your help! Please read our [contributing guide](https://github.com/Shopify/Cirnus/blob/main/.github/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build for Cirnus.

## Code of conduct

All developers who wish to contribute through code or issues, please first read our [Code of Conduct](https://github.com/Shopify/Cirnus/blob/main/.github/CODE_OF_CONDUCT.md).

## License

Copyright (c) Rahul Krishna. See [LICENSE](/LICENSE.md) for further details.
