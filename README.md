[![lilaquadrat STUDIO](https://cdn3.lilaquadrat.de/lilaquadrat/homepage/untouched_bannerlinkedin2.png)](https://lilaquadrat.de)

![GitHub package.json version](https://img.shields.io/github/package-json/v/lilaquadrat/design?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/lilaquadrat/design?style=flat-square)

# lilaquadrat STUDIO

lilaquadrat STUDIO is a modular and extensible SaaS Enterprise CMS.

[https://lilaquadrat.de](https://lilaquadrat.de)

## STUDIO Design

This repository has all files and information to view and change the default design, which is shipped with lilaquadrat STUDIO.

### tl;dr - relevant commands

```bash
# start storybook
yarn storybook

# start storybook for your project
yarn storybook -c projects/COMPANY/PROJECT/.storybook/

# build your design
yarn build --env company=COMPANY --env project=PROJECT

# build the bundle for your project
yarn bundle --env company=COMPANY --env project=PROJECT

# server renderer
yarn cli publish server

# STUDIO live preview
yarn cli publish app
```

***

- [lilaquadrat STUDIO](#lilaquadrat-studio)
  - [STUDIO Design](#studio-design)
    - [tl;dr - relevant commands](#tldr---relevant-commands)
  - [The use-cases](#the-use-cases)
    - [Live preview in STUDIO Editor](#live-preview-in-studio-editor)
    - [Server Rendering on publish](#server-rendering-on-publish)
    - [Implementation in external Apps](#implementation-in-external-apps)
  - [Technical Details](#technical-details)
  - [Prerequisites](#prerequisites)
    - [Requirements](#requirements)
    - [Recommendations](#recommendations)
  - [Understanding the main concept](#understanding-the-main-concept)
    - [The partial](#the-partial)
    - [The module](#the-module)
    - [Variants](#variants)
    - [CSS / LESS](#css--less)
      - [Project scope](#project-scope)
      - [The partial scope](#the-partial-scope)
      - [The module scope](#the-module-scope)
      - [The special "content-module" scope](#the-special-content-module-scope)
  - [Customizing the design](#customizing-the-design)
    - [Change the default design or extend it](#change-the-default-design-or-extend-it)
      - [extending](#extending)
      - [change the default](#change-the-default)
    - [how to: workflow or see what you do](#how-to-workflow-or-see-what-you-do)
    - [how to: colors](#how-to-colors)
    - [how to: fonts](#how-to-fonts)
      - [Apply a font](#apply-a-font)
      - [Change font sizes](#change-font-sizes)
      - [Add Local fonts / you have the woff files](#add-local-fonts--you-have-the-woff-files)
      - [Add external fonts like google fonts](#add-external-fonts-like-google-fonts)
    - [how to: padding / margin](#how-to-padding--margin)
    - [how to: partials](#how-to-partials)
    - [how to: modules](#how-to-modules)
    - [how to: logic](#how-to-logic)
      - [modules and partial](#modules-and-partial)
      - [Basic HTML](#basic-html)
        - [Dynamic rendering](#dynamic-rendering)
        - [Server Renderer](#server-renderer)
      - [Live preview in lilaquadrat STUDIO](#live-preview-in-lilaquadrat-studio)
      - [vuejs / main app](#vuejs--main-app)
      - [server renderer](#server-renderer-1)
      - [webpack build](#webpack-build)
  - [Publish your design](#publish-your-design)
    - [cli configuration](#cli-configuration)
    - [build](#build)
      - [Server renderer](#server-renderer-2)
      - [STUDIO live preview](#studio-live-preview)
    - [publish](#publish)
      - [Server renderer](#server-renderer-3)
      - [STUDIO live preview](#studio-live-preview-1)
- [license](#license)

***

## The use-cases

STUDIO Design has three major use-cases:

### Live preview in STUDIO Editor

When you open the STUDIO Editor, the editor-child.screen.vue will be viewed in an iframe. The main site will send the updated content to editor-child.screen.vue. The invocation of the content-module will result in the rendered content.

### Server Rendering on publish

STUDIO Publish offers the option to create static HTML files and publish them e.g. via FTP. The creation of those HTML files is handled by the vuejs server renderer.
The logic, structure and design are provided by STUDIO Design.

### Implementation in external Apps

The published npm package includes the source files for all modules and partials, therefore the modules can be used in any vuejs app.

## Technical Details

Everything is based upon javascript and preprocessed by Typescript. The heavy lifting is done from vuejs with help from vue router, vue server renderer and vuex. All design needs are fulfilled through LESS. Everything comes together via webpack and babel makes sure everybody gets the same functionality. eslint takes care of linting in development.

- vuejs 2.x.x
- vue router 3.x.x
- vuex 3.x.x
- LESS 4.x.x
- typescript 4.x.x
- webpack 5.x.x
- babel 6.x.x
- eslint 8.x.x

## Prerequisites

To effectively work with STUDIO Design we have hard requirements and some recommendations.

### Requirements

- [nodejs](https://nodejs.org) >= 14
- a text editor
- a shell
- [lilaquadrat DESIGN](https://github.com/lilaquadrat/design)

The following is required if you want to commit your changes to a project.

- lilaquadrat STUDIO account
- Rights to change the design of a project

### Recommendations

- [yarn](https://yarnpkg.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
  - [Vetur Extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
  - [eslint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Understanding the main concept

One key principle of lilaquadrat STUDIO is to separate content from design. At the time of writing, the design consists of 17 modules and 15 partials.

### The partial

A partial can contain one or multiple entities. It needs to be in the context of a module and is not allowed to be rendered on its own. e.g. picture partial, link partial, list partial

example code:

```HTML
  <section class="textblock">
    <h1>{{ headline }}</h1>
    <h2>{{ subline }}</h2>

    <h3>{{ intro }}</h3>
    <p>{{ singleText }}</p>
  </section>
```

### The module

A module is an entity that is made of one or more partials. Every module has to make sense on its own and if the css scoping is done right, should look always as intended. e.g. text module, picture module, gallery module

example code:

```HTML
  <section class="module text-module">
    <textblock-partial v-bind="$props" />
    ...
  </section>
```

### Variants

Modules and partials have different variants that change what and/or how it is rendered. This brings variety into the design without creating very similar modules.

Let's say your textblock partial needs to look different as a child of the picture and text module. The best way to achieve this would be to create a variant at the textblock partial and hint it from the picture and text module.

Variants can be combined, for this reason, the variant prop is always an array.

```HTML
  <section class="module pictureandtext-module">
    <textblock-partial :variant="['your-variant']" v-bind="$props" />
    ...
  </section>
```

### CSS / LESS

We use LESS as a preprocessor for CSS, even though there is no hard requirement for using LESS. Sass, any other preprocessor or plain and simple CSS would be feasible too.

#### Project scope

The whole design has a main css that defines things, that are used by multiple or even all partials. These variables should not be overwritten in any context. This concept keeps the design technically simple and limits also the complexity which the user will be confronted with.

e.g. the fonts, main colors, breakpoints

```LESS
.font-normal {
  font-family: 'Nexa';
  letter-spacing: .2px;
}

.font-head {
  font-family: 'Nexa-Heavy';
}

@smartphone :~"only screen and (max-width: 599px)";
@tablet :~"only screen and (min-width: 600px) and (max-width: 899px)";
@desktop :~"only screen and (min-width: 900px)";
@desktopExt :~"only screen and (min-width: 1000px)";
@wide :~"only screen and (min-width: 1200px)";

@color1: #3f2d56;
@color2: #e0e5e5;
@color3: #533474;

@success: #5A8C99;
@error: #EA624F;
@textColor : #555;
@black : #000000;
@white : #FFFFFF;
```

#### The partial scope

At this point, the partial defines for example the padding and margin between single entities that are contained.

#### The module scope

At the module level, we declare the padding/margin between the contained partials. It is possible to change the css ( "leaking into the css of a child") of a partial at this level, but we consider this bad practice. If the partial needs to look different in this context, it should get a variant and describe the design by itself.

#### The special "content-module" scope

The content module renders a list of modules and therefore decides the padding/margin between modules.
This concept can be of course extended but for the user's and maintainer's sake, it should be as simple as possible.

The default design offers two modes:

```LESS
// is used for example landing pages, where every module describes a single thing
&.presentation {
    gap: @rowGapPresentation; //150px;
}

// is used if the whole site represents a single entity like blog posts.
&.content {
    gap: @rowGapContent; //50px
}
```

## Customizing the design

### Change the default design or extend it

The architecture of STUDIO Design follows the idea of having a default design and extending it. Through this approach, it is possible to just maintain a single design for all of your projects without losing the ability to differentiate between them.

#### extending

With the following command, you create a new project under a company and extend the current default design.

//TODO extend cli for creating a new project

```bash
yarn cli create design
```

#### change the default

If you have a project that needs a more custom approach and will not be reused in any way, just clone/download the STUDIO Design repository again and change everything to your needs.

```bash
git clone https://github.com/lilaquadrat/design
```

### how to: workflow or see what you do

For a live visual representation of your changes, you can start storybook. Your changes will be reflected in the browser without the need of reloading it.

Links

- [https://storybook.js.org/](https://storybook.js.org/)
  
The following shell command will start storybook with the default design.

```bash
 yarn storybook
```

If you`ve chosen to extend the default design, you have to start storybook as followed to see the design.

```bash
yarn storybook -c projects/COMPANY/PROJECT/.storybook/
```

### how to: colors

All of the colors are defined in the variables.less file.
Adding a new color anywhere else is considered bad practice.

where to change:

```text
projects/COMPANY/PROJECT/source/less/variables.less
```

Used colors for the default design:

```less
@textColor : #555;

@black : #000000;
@white : #FFFFFF;

@grey : #CCCCCC;
@grey1 : #F6F6F6;
@grey2 : #F9F9F9;
@grey3 : #fcfcfc;
@bg : #F6F6F6;

@link : #5A8C99;
@linkHover : #533474;

@color1: #3f2d56;
@color2: #e0e5e5;
@color3: #533474;
@color4: #533474;
@color5: #3f2d56;

@success: #5A8C99;
@error: #EA624F;
```

### how to: fonts

Fonts are loaded and defined at the global scope and then applied at the partial scope.

#### Apply a font

example for paragraph from the textblock partial:

```LESS
p {
  .font-normal;
  font-size: @fontText;
  color: @textColor;
}
```

The .font-normal mixin derives from fonts.less

```text
projects/COMPANY/PROJECT/source/less/fonts.less
```

```LESS
.font-normal {
  font-family: 'Nexa';
  letter-spacing: .2px;
}
```

#### Change font sizes

Fonts sizes and the matching line-height are also defined within the variables.less

where to change:

```text
projects/COMPANY/PROJECT/source/less/variables.less
```

```LESS
@fontText : 14.5px;
@fontTextSmaller: 13px;
@fontSmall: 10px;

@headline_XL : 45px;
@headlineLineHeight_XL : 47px;

@headline_L : 34px;
@headlineLineHeight_L : 36px;

@headline_M : 28px;
@headlineLineHeight_M : 30px;

@headline_S : 22px;
@headlineLineHeight_S : 24px;

@headline_XS : 16px;
@headlineLineHeight_XS : 18px;
```

#### Add Local fonts / you have the woff files

Add the woff files to the fonts folder and invoke them in the fonts.less

where to add:

```text
projects/COMPANY/PROJECT/source/fonts/
```

where to change:

```text
projects/COMPANY/PROJECT/source/less/fonts.less
```

The font mixin loads the local file and makes the font available as a font family.

what to change:

```less
.font("Nexa", "Nexa"); //in this example we use the Nexa font

.font-light {
  font-family: Nexa;
}
```

#### Add external fonts like google fonts

There are multiple ways to invoke an external font. In this example, we will load "Roboto" via Google Fonts.

We need to import the css that Google provides.

where to change:

```text
projects/COMPANY/PROJECT/source/less/base.less
```

what to change:

```less
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap'); // add the import before everything else

@import "./variables.less";
@import "./fonts.less";

@import "../../../../../src/source/less/base_bootstrap.less";
```

Now you can use the imported font via the font family.

where to change:

```text
projects/COMPANY/PROJECT/source/less/fonts.less
```

what to change:

```less
.font-normal {
  font-family: 'Roboto', sans-serif;
  letter-spacing: .2px;
}
```

### how to: padding / margin

Module paddings and the padding/gap between modules are also defined via variables.less

where to change:

```text
projects/COMPANY/PROJECT/source/less/variables.less
```

what to change:

```LESS
@modulePadding: 40px; //padding for all modules

// gap between modules in context of content-module
@rowGapPresentation: 150px;
@rowGapContent: 50px;
```

See [1.4.4.4. The special "content-module" scope](#1444-the-special-content-module-scope) for details about the gap.

### how to: partials

Partials can be edited, created and implemented as you need. Although you could use partials from completely different design systems, as long as you consider the naming convention, the partials are automatically available. There are other ways to load external components, just check the vuejs documentation. Every partial is available at global scope and therefore in any project that extended the default design.

Links

- [vuejs Component Registration](https://vuejs.org/v2/guide/components-registration.html)

Naming conventions:

```text
new-partial-name.partial.vue
camelCase.partial.vue
```

would result in the availability of

```HTML
<new-partial-name-partial />
<camelCase-partial />
```

where to add:

```text
src/partials/
```

### how to: modules

Modules and partials follow the same rules, with just different names and locations.

Naming conventions:

```text
new.module.vue
camelCase.module.vue
```

would result in the availability of

```HTML
<new-module />
<camelCase-module />
```

where to add:

```text
src/modules/
```

### how to: logic
  
#### modules and partial

Every module and partial holds its logic within its scope. If a module/partial needs new functionality, you just need to edit it.

example:

```Typescript
@Component
export default class MenuModule extends ExtComponent {

  mounted() {
    //new code that is executed when the MenuModule is mounted 
  }
  
}
```

#### Basic HTML

The Html files are separated by purpose.
Dynamic frontend renderer and static server renderer.

##### Dynamic rendering

For dynamic rendering in the browser, the index.html will be used. CSS and JS files will be added automatically in the build process. vuejs will be rendered inside of the element with the id "add". Everything else can be adjusted to your needs.

```HTML
 <body>
    <div id="app" :class="[$enviroment]">
```

where to change:

```text
src/index.html
```

##### Server Renderer

The index.server.html has special links, app and css, that need to stay the way they are. If they are changed, it will likely result in an unwanted experience.

```HTML
<script src="https://{{cdn}}/{{settings.company}}/{{settings.project}}/editor/{{app}}"></script>

<link rel="stylesheet" href="https://{{cdn}}/{{settings.company}}/{{settings.project}}/editor/{{css}}">

```

where to change:

```text
src/index.html
```

#### Live preview in lilaquadrat STUDIO

You can completely change the logic of the live preview. It is possible to replace vuejs with vanilla js, react, Angular or even use a different programming language. Only the javascript-based communication between live preview and lilaquadrat STUDIO has to be considered.

```Typescript
    const messageHandler = (message: any) => {

      //content updates
      if (message.data.type === 'studio-content') {
        ...
      }

      //site settings update
      if (message.data.type === 'studio-editor-settings') {
        ...
      }

      //html settings on project level
      if (message.data.type === 'studio-settings') {
        ...
      }

      //contains the current active module
      if (message.data.type === 'studio-active') {
        ...
      }

    };

    // triggers lilaquadrat STUDIO to send the inital settings and the content
    window.parent.postMessage('studio-design-ready', '*');

  }
```

Look into the editor-child.screen to get a better understanding of how the live preview works.

```text
src/screens/editor-child.screen.vue
```

#### vuejs / main app

The main app logic is found in the app.ts. Like in the editor-child.screen, only the communication with the lilaquadrat STUDIO is a hard requirement.

```text
src/app/app.ts
```

#### server renderer

To fulfill the need of the special requirement that server-side rendering is, we have two files that can be edited.

```text
src/app/app-server.ts
src/app/server-entry.ts
```

#### webpack build

webpack is used to create a lean and efficient app for the production environment. Like everything else, you can change the configuration to your needs.

```Typescript
webpack.config.js //base for all

webpack.dev-browser.js //dev 
webpack.dev-preview.js //same as prod, only with source maps
webpack.prod-browser.js //production

webpack.dev-bundle.js //server side renderer dev
webpack.bundle.js //server side renderer production
```

## Publish your design

We offer a cli that helps you with publishing your design to your project.

### cli configuration

The includes CLI does most of the work but needs a bit of a setup. If you use the CLI for the first time, you will see three red messages.

try:

```bash
yarn cli
```

and you will get the following:

```text
Mode NOT set. yarn cli mode
NOT logged in. yarn cli login
Publish NOT set. yarn cli config
```

Just follow the hints of the messages and execute them in the shown order.

```Typescript
yarn cli mode //select LIVE
yarn cli login //follow the instructions in the browser
yarn cli config //select company and project 
```

If everything went as expected you will see something like the following:

```Text
Mode set to live
Logged in as Schübel, Mathias.
Publish set to company lilaquadrat and project homepage.
```

### build

The build command will create the files that will be used in production. As always, we have a distinction between server renderer and STUDIO live preview.

#### Server renderer

```bash
yarn bundle --env company=COMPANY --env project=PROJECT
```

will create the dist-bundle folder that contains a server.bundle.json

```bash
dist-bundle/server.bundle.json
```

#### STUDIO live preview

```bash
yarn build --env company=COMPANY --env project=PROJECT
```

will create the dist folder that contains will contain numerous files.

e.g.

```bash
dist/index.html
dist/app.7cb91ee0ab3926de7451.js
dist/design-module-0.de32cf355e45c8a74123.js
```

### publish

If you followed the instructions and completed all steps in [1.6. Publish your design](#16-publish-your-design), you have two CLI commands left.

#### Server renderer

```bash
yarn cli publish server
```

#### STUDIO live preview

```bash
yarn cli publish app
```

Both commands will result in a message like:

```bash
<--- start PUSH
338.51 kB total
file created
publish started
publish success
PUSH end --->
```

Your project just received your updated design and can be used immediately for STUDIO live preview and publish.

# license

lilaquadrat Design © 2019 by lilaquadrat e.k. is licensed under [Attribution-NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/deed.en)
