// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function (grunt) {

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);     
    require('jit-grunt')(grunt);
    
   /* grunt.event.on('watch', function(action, filepath, target) {
      grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    }); */   

    // Configure Grunt 
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
  
       autoprefixer: {
            dist: {
                src: ['html/project/css/project.css'],
                dest: 'html/project/css/project.css'
            },
            options:{
                browsers: ['> 5%']
            }
        },       
        
       /*concat: {
          dist: {
            src: [
             '!www/js/main.min.js',
                 'www/bower_components/jquery/dist/jquery.min.js',
                    'www/bower_components/bootstrap/dist/js/bootstrap.min.js',
                'www/js/script.js',

            
            
            ],
           dest: 'www/js/main.min.js'
          }
      },  */      
        
        express: {
            all: {                                            
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    bases: 'html',
                    // Make sure you don't use `.` or `..` in the path as Express
                    // is likely to return 403 Forbidden responses if you do
                    // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
                    livereload: true
                }
            }
        },   
        
//        'ftp-deploy': {
//          build: {
//            auth: {
//              host: '83.167.245.104',
//              port: 21,
//              authKey:'key1'
//            },
//            src: './',
//            dest: '/kodovani.dixilo.cz/pracezarohem',
//            exclusions: [
//                './**/.DS_Store',
//                './package.json',
//                './Gruntfile.js',
//                './handlebarsStr.css.handlebars',
//                './nbproject',
//                './ilightbox',
//                './node_modules',
//                './.ftppass',
//                'sprites.png',
//                './bower_components/bootstrap/fonts',
//                './bower_components/bootstrap/grunt',
//                './bower_components/bootstrap/js',
////                './bower_components/bootstrap/less',
//                './bower_components/jquery/src',
//                './bower_components/nouislider/documentation',
//                './bower_components/nouislider/src',
//                './bower_components/nouislider/tests',
//                './bower_components/raty/demo',
//                './bower_components/raty/spec',
//                './bower_components/raty/vendor',
////                './bower_components'
////                '*.html'
//            ],
//            forceVerbose:true
//          }
//        },       
            
        
//        cssmin: {         
//          options: {
//            shorthandCompacting: false,
//            roundingPrecision: -1,
//            banner: '/*!\nProject: <%= pkg.name %>\nLast changes: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\nAuthor: <%= pkg.author %>\nWebsite: <%= pkg.homepage %>\n*/\n'
//          },
//          target: {
//            files: {
//              'css/main.min.css': ['css/main.css']
//            }
//          }
//        },     
        
       /* sprite:{
            all: {
              src: ['sprites/*.png','sprites/*.jpg'],
              dest: 'sprites.png',
              destCss: 'css/sprites.less',              
              cssTemplate: 'handlebarsStr.css.handlebars',
              cssFormat: 'less'
            }
          } , */     
        less: {
      development: {
            files: {
           "html/project/css/project.css":  ['!html/project/css/project.css','html/project/css/project.less'] // destination file and source file
        }
      }
    },
        // grunt-watch will monitor the projects files
        watch: {
            all: {
                files: ['html/*.html','html/project/js/*.js'],
                options: {
                    livereload: true
                }               
            },
          /*  png:{
                files:['html/project/images/*.png','html/project/images/*.jpg'],
                tasks: ['sprite']
            },
            jpeg:{
                files:['html/project/images/*.png','html/project/images/*.jpg'],
                tasks: ['sprite']
            },*/            
            html: {
                files: ['html/*.html']
            },
            less: {
                files: ['html/project/css/*.less','html/project/fonts/*.less'],
                tasks: ['less','autoprefixer']
            },
           /* js:{
                files: ['www/js/*.js','!www/js/main.min.js'],
                tasks: ['concat']
          }  */
        },
        // grunt-open will open your browser at the project's URL
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.all.options.port%>'
            }
        }
    });

    // Creates the `server` task
    grunt.registerTask('server', [
        'express',
        'open',
        'watch',
        'less',
       // 'sprite',
        //'cssmin',
        'uglify',
        'autoprefixer'
    ]);
    
    grunt.loadNpmTasks('grunt-contrib-concat');
};