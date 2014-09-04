module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'app/scripts/app.js',
                    'app/scripts/services/**.js',
                    'app/scripts/controllers/**.js',
                    'app/scripts/filters/**.js',
                    'app/scripts/directives/**.js'
                ],
                dest: 'app/dist/app.js'
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: 'app/dist/app.min.map.js',
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'app/dist/app.min.js': ['<%= concat.dist.dest %>']
                }
            },
            tpl: {
                options: {
                    sourceMap: 'app/dist/templates.min.map.js',
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'app/dist/templates.min.js': ['<%= ngtemplates.app.dest %>']
                }
            }
        },
        ngtemplates: {
            app: {
                cwd: 'app/',
                src: 'views/**.html',
                dest: 'app/dist/templates.js',
                options: {
                    module: 'dwikiApp'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'app/dist/app.css': 'app/styles/main.scss'
                }
            },
            bootstrap: {
                files: {
                    'app/vendor/bootstrap/assets/stylesheets/bootstrap.css': 'app/vendor/bootstrap/assets/stylesheets/bootstrap.scss'
                }
            }
        },
        watch: {
            js: {
                files: ['app/scripts/**/**.js'],
                tasks: ['concat', 'uglify']
            },
            scss: {
                files: ['app/styles/**'],
                tasks: ['sass']
            },
            bootstrap: {
                files: ['app/vendor/bootstrap/assets/stylesheets/bootstrap/**.scss'],
                tasks: ['sass']
            },
            template: {
                files: ['app/templates/**'],
                tasks: ['ngtemplates']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify', 'sass', 'watch']);
    grunt.registerTask('dev', ['sass', 'watch']);
}
