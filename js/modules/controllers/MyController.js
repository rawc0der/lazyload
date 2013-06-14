define([
 'underscore', 
 'backbone',
 'widget',
 'views/LazyLoadListView',
 'models/ListViewModel',
 'views/ListView'


], function(_, Backbone, Widget, LazyLoadListView, ListViewModel, ListView){
	/**
	 * Controller Object responsible for View construction and application event flow
	 * @type {[Object]}
	 */
	var MyController = _.extend( {}, Backbone.Events );
	/**
	 * Define application logic here, by extending the Controller
	 */
	_.extend( MyController, {
		/**
		 * Function called immediately after App Initialize 
		 */
		start: function(){

			console.log('Controller::Start  --> define logic');
			
		$('#page_wrapper').css({
			'margin-left': '100px'
		})

			var scrollView = new LazyLoadListView({
				container: '#page_wrapper', 
				configOptions: {
					initItemsRange: 20,
				}
			});
			// scrollView.renderTo( $('#page_wrapper'), true );  not needed !

			// var listView = new ListView({
			// 	maxItems: 40,
			// 	itemsHeight: '30px',
			// 	container: '#page_wrapper',
			// 	height: '420px',
			// 	width: '150px',
			// 	mouseScroll: true
			// });

		} // end start

	});

	return MyController;

});