'use strict';
module.exports = function(grunt) {

  grunt.initConfig({

    // Express
    express: {
      dev: {
        options: {
          args: ['--nocache'],
          script: './server'
        }
      }
    },

    // Watch
    watch: {
      express: {
        files:  [ './*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          nospawn: true // Without this option specified express won't be reloaded
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [ 'express', 'watch' ]);

};