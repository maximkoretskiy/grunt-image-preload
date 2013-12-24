/*
 * grunt-image-preload
 * https://github.com/lexich/grunt-image-preload
 *
 * Copyright (c) 2013 Efremov Alexey (lexich)
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    image_preload: {
      default_options: {
        options: {
          jsname:"PRELOADER",
          root:"http://example.com/"
        },
        files:[{
          cwd: "test/fixtures/images", 
          src: "**/*.{jpg,jpeg,png,gif}"
        }],        
        process:{
          files:[{
            cwd: "test/fixtures/",
            src: "*.html",
            dest: "tmp/"
          }]
        }
      }
    },
    coffee:{
      options:{
        bare:true,
        separator:"  "
      },
      files:{
        "template/inject.js":"template/inject.coffee"
      }
    },
    uglify:{
      dist:{
        files:{
          "template/inject.min.js":"template/inject.js"
        }
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'coffee', 'uglify', 'image_preload', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
