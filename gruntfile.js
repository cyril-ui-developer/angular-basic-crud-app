module.exports = function(grunt) {
require('es6-promise').polyfill();
	
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'src/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
//	  		
	concat: {
		  options: {
			// define a string to put between each file in the concatenated output
			separator: '\n'
		  },
		  dist: {
			// the files to concatenate
			src: 'src/js/*.js',
			// the location of the resulting JS file
			dest: 'dist/<%= pkg.name %>.js'
				
		  }
		},
	  uglify: {
		  options: {
			// the banner is inserted at the top of the output
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		  },
		  dist: {
			files: {
			  'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
					}
		  		}
			},
		    uncss: {
			   dist: {
					  options: {
						 ignore: [/js-.+/, '.special-class'],
						 ignoreSheets: [/fonts.googleapis/],
					  },
					  files: {
						 'dist/css/unused-removed.css': ['src/index2.html']
					  }
				   }
			},
	        cssmin: {
				   dist: {
					  options: {
						 banner: '/*! MyLib.js 1.0.0 | Aurelio De Rosa (@AurelioDeRosa) | MIT Licensed */'
					  },
				  files: {
					 'dist/css/style.min.css': ['dist/css/unused-removed.css']
				  }
			  }
			},
	  	htmlmin: {
			   dist: {
				  options: {
					 removeComments: true,
					 collapseWhitespace: true
				  },
				  files: [{
					 expand: true,
					 cwd: 'src',
					 src: '*.html',
					 dest: 'dist/'
				  }]
			   }
			},
	  imagemin: {
		   dist: {
			  options: {
				optimizationLevel: 7
			  },
			  files: [{
				 expand: true,
				 cwd: 'src/images',
				 src: ['*.{png,jpg,gif}'],
				 dest: 'dist/images'
			  }]
		   }
		},
		watch: {
			options:{
			livereload:true
			},
			  files: ['<%= jshint.files %>'],
			  tasks: ['jshint','concat','uglify','cssmin','uncss','htmlmin','imagemin']
			}
  });

  	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	

  grunt.registerTask('serve', ['jshint','concat','uglify','cssmin','uncss','htmlmin','imagemin','watch']);

};