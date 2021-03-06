var botFactory	= require( "./lib/bot" );
var fs			= require( "fs");
var path		= require( "path" )
var sqlFactory	= require( "sqlite3" ).verbose().Database;

//
// Global Objects
// These are for use by plugins
//
GLOBAL.bot	= new botFactory();
GLOBAL.db	= new sqlFactory( "store.db", LoadPlugins );

function LoadPlugins() {

	var plugins = fs.readdirSync( "./plugins" );

	// Load our main plugin first
	plugins.unshift( "../main.js" );

	plugins.forEach( function( plugin ) {

		if ( path.extname( plugin ) != ".js" )
			return;

		try {

			require( "./plugins/" + plugin );
			console.log( "Loaded " + plugin );

		} catch ( e ) {

			bot.sendMessage( "Failed to load plugin '" + plugin + "'\n" + e + "." );
			console.trace( e );

		}

	} );

}
