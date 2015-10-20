module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({

        // less task
        less: {
            development: {
                options: {
                    cleancss: false
                },
                files: {
                    'css/style.css': 'css/less/style.less'
                }
            }
        },

        watch: {
            less: {
                files: ['css/less/**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['less']);
};
