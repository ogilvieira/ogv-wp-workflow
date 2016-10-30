var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
  var project_files = {
      javascript: [
        './bower_components/jquery/dist/jquery.js',
        './src/assets/js/modules/**/*.js',
        './src/assets/js/page/**/*.js',
        './src/assets/js/app.js',
      ],
      stylesheet: [
        './bower_components/bootstrap/dist/css/bootstrap.css',
        './bower_components/bootstrap/dist/css/bootstrap-theme.css',
        './bower_components/font-awesome/css/font-awesome.css',
        './src/assets/css/**/*.css',
      ],
  };
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*===================================================== \n'
                +'= <%= pkg.siteName %> \n'
                +'= by <%= pkg.author %> \n'
                +'= [LAST BUILD: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>] \n'
                +'=====================================================*/\n'
      },
      build: {
        src: project_files.javascript,
        dest: './assets/js/bundle.js'
      },
    },
    cssmin : {
      options : {
        keepSpecialComments: 0,
      },
      dist: {
        src: project_files.stylesheet,
        dest: './assets/css/bundle.css'
      }
    },
    sass : {
      dist: {
        options: {
          style: 'expanded',
          lineNumbers: false, // 1
          sourcemap: 'none',
          options: {
            // forceWatchMethod: true,
          }
        },
        files: [{
          expand: true, // 2
          cwd: './src/assets/sass/',
          src: [ 'app.scss' ],
          dest: './src/assets/css/',
          ext: '.css'
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: './src/assets/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: './assets/img/'
        }]
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      sass: {
        files: './src/assets/sass/**/*.scss',
        tasks: ['sass', 'cssmin'],
      },
      imagemin: {
        files: './src/assets/img/**/*.{png,jpg,gif}',
        tasks: ['imagemin'],
      },
      javascript: {
        files: project_files.javascript,
        tasks: ['uglify']
      },
      livereload: {
        files: ['./**/*.php', 'assets/css/bundle.css','assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'imagemin']);
};