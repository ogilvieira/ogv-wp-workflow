var mozjpeg = require('imagemin-mozjpeg');
var themepath = 'public/wp-content/themes/mytheme/';

module.exports = function(grunt) {
  var project_files = {
      javascript: [
        'bower_components/jquery/dist/jquery.js',
        'src/assets/js/modules/**/*.js',
        'src/assets/js/page/**/*.js',
        'src/assets/js/app.js',
      ],
      stylesheet: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootstrap/dist/css/bootstrap-theme.css',
        'bower_components/font-awesome/css/font-awesome.css',
        'src/assets/css/**/*.css',
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
        dest: themepath+'assets/js/app.min.js'
      },
    },
    cssmin : {
      options : {
        keepSpecialComments: 0,
      },
      dist: {
        src: project_files.stylesheet,
        dest: themepath+'assets/css/app.min.css'
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
          cwd: 'src/assets/sass/',
          src: [ 'app.scss' ],
          dest: 'src/assets/css/',
          ext: '.css'
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/assets/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: themepath+'assets/img/'
        }]
      }
    },
    clean: {
      build: [themepath]
    },
    copy: {
      main: { 
        expand: true,
        cwd: 'src/',
        src: ['**', '!assets/css/**/*', '!assets/sass/**/*', '!assets/js/**/*', '!assets/img/**/*'],
        dest: themepath,
        filter: 'isFile'
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      sass: {
        files: 'src/assets/sass/**/*.scss',
        tasks: ['sass', 'cssmin'],
      },
      copy: {
        files: ['src/**/*', '!src/assets/css/**/*', '!src/assets/js/**/*', '!src/assets/img/**/*'],
        tasks: ['copy']
      },
      imagemin: {
        files: 'src/assets/img/**/*.{png,jpg,gif}',
        tasks: ['imagemin'],
      },
      javascript: {
        files: project_files.javascript,
        tasks: ['uglify']
      },
      livereload: {
        files: [
          themepath+'**/*.php',
          themepath+'assets/css/app.min.css',
          themepath+'assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['clean','sass', 'cssmin', 'uglify', 'imagemin', 'copy']);

};