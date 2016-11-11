# generator-ko

Generates a starting point for a Knockout application with Skeleton CSS.

## Install

First, install [Yeoman](http://yeoman.io) and generator-kos using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-kos
```

### Usage

Initialy you nedd to generate the application:

    $ mkdir myApp && cd $_
    $ yo kos
    $ gulp serve:src

... then you can generate pages and components

    $ yo kos:page myPage
    $ yo kos:staticpage myStaticPage
    $ yo kos:component myComponent

