define([
 'underscore',
 'backbone',
 'widget',
 'views/ListItem',
 'models/ListViewModel'

], function(_, Backbone, Widget, ListItemView, ListViewModel){
	

	var ListView = Widget.extend({
		
		_maxItems: null,

		_containerWidth: null,

		_containerHeight: null,

		_itemsHeight: null,

		container: null,

		overflow: 'hidden',

		template: {
			templateString: '<div id="ListView"> <h4> ListView Demo </h4> <div id="ListContainer">  <ul id="ListItemsContainer"> </ul> </div>   </div>'
		},

		subviewsContainer: '#ListItemsContainer',

		model: new ListViewModel(),

		subviews: [],

		viewOptions: ['container'],

		initialize: function(options, mixins){
			Widget.prototype.initialize.call(this);
			this.renderTo( $(this.container), true );
			this._setup(options);
			console.log(this);
		},
		_setup: function(options){
			this.setMaxItems(options.maxItems);
			this.setItemsHeight(options.itemsHeight);
			this.setWidth(options.width);
			this.setHeight(options.height);
			this.overflow =  options.mouseScroll ? 'scroll' : 'hidden';
			/////////////////////////////////////////
			this.loadItemsRange();
			this.renderItems();
			/////////////////////////////////////////
			this.setStyle();			
			
		},

		setStyle: function(){
			this.$el.find(this.subviewsContainer).css({
				'width': this._containerWidth,
				'height': this._containerHeight,
				'list-style': 'none',
				'overflow': this.overflow,
				border: '1px solid gray'

			});
			this.$el.find('li').css({
				'height': this._itemsHeight,
			});
		},

		addItem: function(data){
			var newItem = new ListItemView({
				template: {
					templateDataObject: data
				}
			});
			this.addSubview( newItem );
		},

		removeItem: function(idx){
			this.removeSubview(idx);
		},

		loadItemsRange: function(from, to){
			var check, 
				items = this.model.get('viewData');
			if (!!to) {
				check = (!!from) ? true : false;
			} else {
				to = from,
				from = 0,
				check = true;
			}
			var parseItems = (check) ? items.slice(from, to) : items;
			_.map(parseItems, function(item){
				if( !this.isFull() ) {
					this.addItem(item);   /// FIXME - break out of loop
				}
			}, this);
		},		

		unloadItems: function(){
			this.clearSubviews();
		},

		renderItems: function(){
			this.renderSubviews();
		},

		getCount: function(){
			return this._subviews.length;
		},

		isFull: function(){
			return (this.getCount() < this._maxItems) ? false : true;
		},

		setMaxItems: function(no){
			this._maxItems = no;
		},

		setWidth: function(px){
			this._containerWidth = px;
		},

		setHeight: function(px){
			this._containerHeight = px;
		},

		setItemsHeight: function(px){
			this._itemsHeight = px;
		},

	});

	return ListView;

});