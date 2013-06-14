define([
 'underscore',
 'backbone',
 'widget'

], function(_, Backbone, Widget){
	
	/*
	 * Must provide a way to choose from Early / Lazy instatntiation
	 */

	var VirtualProxyDataSource = function(model){
		this.ds = model;
		console.log('%cDataSource::init ', 'color:red');
	};

	
	VirtualProxyDataSource.prototype = {
		getItemsRange: function(from, to){
			this.index = to;
			this.range = to - from;
			return this.ds.get('viewData').slice(from, to);
		},
				
		load: function(from, to){
			console.log('%cDataSource::load '+from+'-'+to, 'color:red');
			var self = this;
			var dfd = $.Deferred(function(){
				var items = self.getItemsRange(from,to);
				this.resolve({ data:items });
			});
			return dfd.promise();
		}
	};
	
	return VirtualProxyDataSource;
});

