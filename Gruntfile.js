module.exports = function(grunt) {
  gzip = require("gzip-js");
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n\n'
      },
      dist: {
        src: ['./script.js', './submodules/add2home/src/add2home.js', 'fd-slider.js', 'prettify.js', './submodules/pulltorefresh/ptr.js'],
        dest: './min/script.dev.js'
      }
    },
    uglify: {
      options: {
        banner: '/* * * * * * * * * *\n' +
                ' *     selfCSS     *\n' +
                ' *  Version <%= pkg.version %>  *\n' +
                ' *  License:  MIT  *\n' +
                ' * Simon  Waldherr *\n' +
                ' * * * * * * * * * */\n\n',
        footer: '\n\n\n\n /* foo */'
      },
      dist: {
        files: {
          './min/script.js': ['./min/script.dev.js']
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/* * * * * * * * * *\n' +
                  ' *     selfCSS     *\n' +
                  ' *  Version <%= pkg.version %>  *\n' +
                  ' *  License:  MIT  *\n' +
                  ' * Simon  Waldherr *\n' +
                  ' * * * * * * * * * */\n\n'
        },
        files: {
          './min/style.css': ['./submodules/fd-slider/css/fd-slider.css', './submodules/add2home/style/add2home.css', './style.css', './dark.css', './prettify.css']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};
