# generator-ko

Generates a starting point for a Knockout application with Skeleton CSS.

### Dependencies

You need global Yeoman installed

    $ [sudo] npm install -g yo


### Dev Install

To install the generator in your dev environment

    $ git clone THIS_REPO
    $ npm install
    $ npm link

### Npm Install

This repo is not published as a npm module yet, so you'll ned to install it directly from this repo like this:

    $ [sudo] npm install -g git+ssh://git@bitbucket.org:starak/generator-kos.git

### Usage

Initialy you nedd to generate the application:

    $ mkdir myApp && cd $_
    $ yo kos
    $ gulp serve:src

... then you can generate pages and components

    $ yo kos:page myPage
    $ yo kos:staticpage myStaticPage
    $ yo kos:component myComponent

