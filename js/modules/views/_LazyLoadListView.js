define([
 'underscore',
 'backbone',
 'widget'


], function(_, Backbone, Widget){
	
	var ScrollView = Widget.extend({
		
		template: {
			templateString: '<div id="LoopScrollView"> <h4>  <div id="wrapper"> </div> </div>'
		},

		subviewsContainer: 'wrapper',

		subviews: [],

		viewOptions: [],

		/*************************Default iScroll options*********************/
		
		/*********************************************************************/

		initialize: function(){
			Widget.prototype.initialize.call(this);
			
		},
		
		setup: function(){
			// $('#wrapper').css({
			// 	position: 'absolute',
			// 	'z-index': 1,
			// 	top: '45px',
			// 	bottom: '48px',
			// 	left: 0,
			// 	width: '100%',
			// 	background: '#ccc',
			// 	overflow: 'hidden',
			// });
			// $('#scroller').css({
			// 	position: 'absolute',
			// 	'z-index': 1,
			// 	'-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
			// 	width: '100%',
			// 	'-webkit-transform': 'translateZ(0)',
			// 	'-moz-transform': 'translateZ(0)',
			// 	'-ms-transform': 'translateZ(0)',
			// 	'-o-transform': 'translateZ(0)',
			// 	transform: 'translateZ(0)',
			// 	'-webkit-touch-callout': 'none',
			// 	'-webkit-user-select': 'none',
			// 	'-moz-user-select': 'none',
			// 	'-ms-user-select': 'none',
			// 	'user-select': 'none',
			// 	'-webkit-text-size-adjust': 'none',
			// 	'-moz-text-size-adjust': 'none',
			// 	'-ms-text-size-adjust': 'none',
			// 	'-o-text-size-adjust': 'none',
			// 	'text-size-adjust': 'none',
			// });
			// $('#scroller ul').css({
			// 	'list-style': 'none',
			// 	padding: 0,
			// 	margin: 0,
			// 	width: '100%',
			// 	'text-align': 'left',
			// });
			// $('#scroller li').css({
			// 	padding: '0 10px',
			// 	height: '40px',
			// 	'line-height': '40px',
			// 	'border-bottom': '1px solid #ccc',
			// 	'border-top': '1px solid #fff',
			// 	'background-color': '#fafafa',
			// 	'font-size': '14px',
			// });
		}


	});

	return ScrollView;

});