module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      foo: {
	      files: [
	        {src: ['src/bbb.js', 'src/bb.js'], dest: 'dest/home.js'},
	        {src: ['src/bb.js'], dest: 'dest/home2.js'},
	      ],
	    },
    },
    uglify: {
      my_target: {
	      files: [{
	          expand: true,
	          cwd: 'dest',
	          src: '**/*.js',
	          dest: 'dest-min',
	          ext: '.min.js' 
	      }]
    	}
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }, 
    clean : {
    	tests: ['dest', 'dest-min']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['clean','jshint', 'concat', 'uglify']);

};