module.exports = function(grunt) {

  grunt.initConfig({

    // Express
    express: {
      dev: {
        options: {
          script: './server.js'
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

  grunt.registerTask('server', [ 'express:dev', 'watch' ]);

};