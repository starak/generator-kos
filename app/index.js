'use strict';
var util = require( 'util' );
var path = require( 'path' );
var yeoman = require( 'yeoman-generator' );
var chalk = require( 'chalk' );

var KosGenerator = yeoman.generators.Base.extend( {
    init: function () {
        this.pkg = require( '../package.json' );

        this.on( 'end', function () {
            if ( !this.options['skip-install'] ) {
                // Figure out whether we have an internet connection. If not, need to
                // pass --offline to bower otherwise it won't fall back on cache.
                require( 'dns' ).resolve( 'example.com', function ( isOffline ) {
                    console.log( 'Installing dependencies in ' + (isOffline ? 'offline' : 'online') + ' mode...' );
                    if ( isOffline ) {
                        // Patch bowerInstall to pass --offline
                        this.bowerInstall = (function ( originalFunction ) {
                            return function ( paths, options, cb ) {
                                options = options || {};
                                options.offline = true;
                                return originalFunction.call( this, paths, options, cb );
                            };
                        })( this.bowerInstall );
                    }

                    this.installDependencies();

                }.bind( this ) );
            }
        } );
    },

    askFor: function () {
        var done = this.async();
        this.log( this.yeoman );
        this.log( chalk.magenta( 'You\'re using the fantastic Knockout app generator.' ) );

        var prompts = [{
            name: 'name',
            message: 'What\'s the name of your new site?',
            default: path.basename( process.cwd() )
        }];

        this.prompt( prompts, function ( props ) {
            this.longName = props.name;
            this.slugName = this._.slugify( this.longName );
            done();
        }.bind( this ) );
    },

    templating: function () {
        this._processDirectory( 'src', 'src' );
        this.template( '_package.json', 'package.json' );
        this.template( '_bower.json', 'bower.json' );
        this.template( '_gulpfile.js', 'gulpfile.js' );
        this.template( '_gitignore', '.gitignore' );
        this.directory('sass','sass');
        this.copy( 'bowerrc', '.bowerrc' );
        this.copy( 'jsconfig.json' );
    },

    _processDirectory: function ( source, destination ) {
        var root = this.isPathAbsolute( source ) ? source : path.join( this.sourceRoot(), source );
        var files = this.expandFiles( '**', {dot: true, cwd: root} );
        var dest;

        for ( var i = 0; i < files.length; i++ ) {
            var f = files[i];
            var src = path.join( root, f );
            if ( path.basename( f ).indexOf( '_' ) == 0 ) {
                dest = path.join( destination, path.dirname( f ), path.basename( f ).replace( /^_/, '' ) );
                this.template( src, dest );
            }
            else {
                dest = path.join( destination, f );
                this.copy( src, dest );
            }
        }
    }
} );

module.exports = KosGenerator;