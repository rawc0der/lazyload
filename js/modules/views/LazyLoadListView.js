define([
 'underscore',
 'backbone',
 'widget',
 'models/ListViewModel',
 'views/ListItem',
 'controllers/VirtualProxyDataSource'

], function(_, Backbone, Widget, ListViewModel, ListItemView, VirtualProxyDataSource){
	

	var ListView = Widget.extend({
		
		template: {
			templateString: '<div id="ListView"> <h4> ListView Demo </h4> <div id="ListContainer"> <div id="wrapper"> <div id="scroller"> <ul id="ListItemsContainer"> </ul> </div>  </div>  </div> </div>'
		},

		container: null,

		subviewsContainer: '#ListItemsContainer',

		model: new ListViewModel(),

		ds: null,

		DataSource: {
			load: function(from, to){
				if ( ListView.prototype.ds === null ) {
					ListView.prototype.ds = new VirtualProxyDataSource( 
						ListView.prototype.model 
					);
				}
				return ListView.prototype.ds.load(from, to);
			}
		},

		subviews: [],

		viewOptions: ['container'],

		_isReady: 1,

		_configOptions: {
			currentIndex: 0,     // current scroll position
			previousFoldIndex: -1,	 // previous fold index, used for backreferencing 
			nextIndexStartRange: 0, // holds a idx ref for next set of items to load
			foldIndex: 10,		 // Load more items after scrolling N items
			loadItemsRange: 10,  // Loan N number of items
			initItemsRange: 20,	 // On initialize load with N items
			loaderDelay: 1500,	 // Delay loading message remove action
			listItemHeight: 138,
			lastLoadedItemsNo: 0, // holds last number of loaded items
		},   
		
		_iscrollDefaults: {
			// Options
			hScroll: true,
			vScroll: true,
			bounce: false,
			snap: 'li',
			bounceLock: false,
			momentum: false,
			lockDirection: true,
			useTransform: true,
			useTransition: false,
			mouseWheel: true,
			// Events
			onRefresh: null,
			onBeforeScrollStart: null,
			onScrollStart: null,
			onBeforeScrollMove: null,
			onScrollMove: null,
			onBeforeScrollEnd: null,
			onScrollEnd: null,
			onTouchEnd: null,
			onDestroy: null,
		},

		initialize: function(){
			Widget.prototype.initialize.call(this);
			this.renderTo( $(this.container), true );
			this.setup();
			console.log(this);
			this.initialLoad();
		},

		setup: function(){
			
			console.log(this.DataSource);
			this.initScrollBindings();
			_.extend( this._configOptions, this.options.configOptions);
			this.ScrollingList = new window.iScroll(
				'wrapper',
				this._iscrollDefaults
			);
			var visibleNoItems = Math.round( $('#wrapper').height() / 
				this._configOptions.listItemHeight );
			this._configOptions.visibleItems = visibleNoItems;
			$('body').css({
				background: 'gray'
			});
			console.log('%cListView::init', 'color:blue', this.ScrollingList);
		},

		initScrollBindings: function(){
			var self = this;
			this._iscrollDefaults.onBeforeScrollStart = function (e) { 
				e.preventDefault(); 
				// console.log('scrollStart::');
			};

			this._iscrollDefaults.onScrollMove = function (e) {		
				var delta = Math.round(
					-self.ScrollingList.y / self._configOptions.listItemHeight 
				);
				if(delta !== self._configOptions.currentIndex) {
					self.updateIndex( delta );
				}
			};

			this._iscrollDefaults.onScrollEnd = function () {};

			this._iscrollDefaults.onRefresh = function () {
				console.log('Refresh::');
			};
		},

		updateIndex: function(delta){
			console.log('%cscrollTo position:', 'color:green', delta);
			this._configOptions.currentIndex = delta;
			if ( this.shouldLoadItems(delta) ) {
				this.loadMoreItems();
			} 
			// else if ( this.shouldRemoveItems() ) {
				// this.removeItems();
			// }
		},

		shouldLoadItems: function(delta){
			if (this._configOptions.currentIndex >= 
				this._configOptions.foldIndex) {
					return true;
			}
			return false;
		},

		// shouldRemoveItems: function(delta){
		// 	// console.log(this._configOptions.currentIndex <= this._configOptions.previousFoldIndex)
		// 	if (this._configOptions.currentIndex <= 
		// 		this._configOptions.previousFoldIndex) {
		// 			return true;
		// 	}
		// 	return false;	
		// },

		updateFoldIndex: function(){
			// if(this._configOptions.previousFoldIndex < 0) {
				// this._configOptions.previousFoldIndex = 0;
			// } else {
				// this._configOptions.previousFoldIndex = this._configOptions.foldIndex;
			// }
			// this._configOptions.foldIndex = this._configOptions.visibleItems + 
			// 								this._configOptions.currentIndex;
			this._configOptions.foldIndex = this._configOptions.loadItemsRange + 
											this._configOptions.currentIndex;
			console.log('%cnext visible:', 'color:purple', this._configOptions.foldIndex );
		},

		// decreaseFoldIndex: function(){
		// 	this._configOptions.foldIndex = this._configOptions.previousFoldIndex;
		// 	this._configOptions.previousFoldIndex -= this._configOptions.loadItemsRange;
		// },

		initialLoad: function(){
			var self = this;
			this.showLoadingMessage();
			var from = this._configOptions.nextIndexStartRange;
			var to = this._configOptions.nextIndexStartRange + 
				this._configOptions.initItemsRange;
			$.when( self.DataSource.load( from, to )).then(
				function(done){
					self.hideLoadingMessage();
					self.addItems(done.data);
					self._configOptions.nextIndexStartRange += 
						done.data.length;
					// self._configOptions.lastLoadedItemsNo = done.data.length;
				},
				function(fail){
					console.log('%c something went wrong !', 'color:red');
					self.hideLoadingMessage();
				}
			);
			this.updateFoldIndex();
			console.log( '%cinitialLoad::', 'color:purple' );
		},

		loadMoreItems:  function(){
			if( this.isReady() ) {
				this.setBusyState();
				this.showLoadingMessage();
				var from = this._configOptions.nextIndexStartRange;
				var to = this._configOptions.nextIndexStartRange + 
					this._configOptions.loadItemsRange;
				var self = this;
				$.when( self.DataSource.load( from, to )).then(
					function(done){
						self.hideLoadingMessage();
						self.addItems(done.data);
						self._configOptions.nextIndexStartRange += 
						done.data.length;
						// self._configOptions.lastLoadedItemsNo = done.data.length;
					},
					function(fail){
						console.log('%c something went wrong !', 'color:red');
						self.hideLoadingMessage();
					}
				);
				self.setReadyState();
				console.log( '%cloadingMore::', 'color:purple' );
				this.updateFoldIndex();
			}
		},

		isReady: function(){
			if ( this._isReady === 1 ) return true;
			return false;
		},

		setReadyState: function(){
			this._isReady = 1;
		},

		setBusyState: function(){
			this._isReady = 0;
		},

		// removeItem: function(idx){
		// 	console.log(this.getSubview(idx))
		// 	this.getSubview(idx).remove();
		// 	this.removeSubview(idx);

		// },

		// removeItems: function(){
		// 	if( this.isReady() ) {

		// 		this.setBusyState();
		// 		var i,
		// 			from = this._configOptions.lastLoadedItemsNo +
		// 					this._configOptions.loadItemsRange + 1,
		// 			to = from - this._configOptions.loadItemsRange;
		// 			console.log('redy and delete', i, from, to)
		// 		for (i = from; i > to; i--) {
		// 			this.removeItem(i);
		// 		}
		// 		this.decreaseFoldIndex();
		// 		this.setReadyState();
		// 	}
		// },

		addItem: function(data){
			var newItem = new ListItemView({
				template: {
					templateDataObject: data
				}
			});
			this.addSubview( newItem );
		},
		addItems: function(nextItems){
			_.map(nextItems, function(itemData){
				this.addItem( itemData );
			}, this);
			this.renderSubviews();
			this.ScrollingList.refresh();
		},

		showLoadingMessage: function(){
			var loader = $('<li id="loader"> <center> <img src="res/loader.gif"> </center> </li>')
				.css({
					'list-style': 'none',
					position: 'relative'
				});
			$('#ListItemsContainer').after().append( loader );
			// $('ul').css({'-webkit-transform': 'translate3d(0px, -396px, 0px) scale(1)'})
			// var paddingCss = parseInt( $('#ListItemsContainer').css('padding-top').replace('px', '') );
			// var px = paddingCss - 80;
			 // $('#ListItemsContainer').css('padding-top', '-40px')
			// console.log( px );
		},

		hideLoadingMessage: function(){
			var self = this;
			setTimeout(function(){ 
				self.$el.find('#loader').remove(); 
			}, this._configOptions.loaderDelay);
		}



	});

	return ListView;

});