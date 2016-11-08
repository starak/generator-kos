'use strict';
var util = require( 'util' );
var yeoman = require( 'yeoman-generator' );
var fs = require( 'fs' );
var chalk = require( 'chalk' );

var PageGenerator = yeoman.generators.NamedBase.extend( {

    detectCodeLanguage: function () {
        this.codeFileExtension = '.js';
    },

    init: function () {
        var codeLanguage = 'JavaScript';
        console.log( 'Creating page \'' + this.name + '\' (' + codeLanguage + ')...' );
        this.componentName = this.name;
        this.dirname = 'src/pages/' + this._.dasherize( this.name ) + '-page/';
        this.filename = this._.dasherize( this.name );
        //
        this.viewModelClassName = this._.classify( this.name );
    },

    template: function () {
        var codeExtension = '.js';
        this.copy( 'view.html', this.dirname + this.filename + '.html' );
        this.copy( 'viewmodel' + this.codeFileExtension, this.dirname + this.filename + this.codeFileExtension );
    },

    addComponentRegistration: function () {
        var startupFile = 'src/app/startup' + this.codeFileExtension;
        readIfFileExists.call( this, startupFile, function ( existingContents ) {
            var existingRegistrationRegex = new RegExp( '\\bko\\.components\\.register\\(\s*[\'"]' + this.filename + '-page[\'"]' );
            if ( existingRegistrationRegex.exec( existingContents ) ) {
                this.log( chalk.white( this.filename ) + chalk.cyan( ' is already registered in ' ) + chalk.white( startupFile ) );
                return;
            }

            var token = '// [Scaffolded component registrations will be inserted here. To retain this feature, don\'t remove this comment.]',
                regex = new RegExp( '^(\\s*)(' + token.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&' ) + ')', 'm' ),
                modulePath = 'pages/' + this.filename + '-page/' + this.filename,
                lineToAdd = 'ko.components.register(\'' + this.filename + '-page\', { require: \'' + modulePath + '\' });',
                newContents = existingContents.replace( regex, '$1' + lineToAdd + '\n$&' );
            fs.writeFile( startupFile, newContents );
            this.log( chalk.green( '   registered ' ) + chalk.white( this.filename ) + chalk.green( ' in ' ) + chalk.white( startupFile ) );

            if ( fs.existsSync( 'gulpfile.js' ) ) {
                this.log( chalk.magenta( 'To include in build output, reference ' ) + chalk.white( '\'' + modulePath + '\'' ) + chalk.magenta( ' in ' ) + chalk.white( 'gulpfile.js' ) );
            }
        } );
    }

} );

function readIfFileExists( path, callback ) {
    if ( fs.existsSync( path ) ) {
        callback.call( this, this.readFileAsString( path ) );
    }
}

module.exports = PageGenerator;
