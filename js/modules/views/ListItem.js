define([
 'underscore',
 'backbone',
 'widget'

], function(_, Backbone, Widget){
	
	var ListItem = Widget.extend({
		
		// template: {
		// 	templateString: '<li>  <%= content %>  </li>',
		// 	templateDataObject: {
		// 		content: 'Default Item text'
		// 	}
		// },
		template: {
			templateString: '<li class="Item Match s-1 c-77" data-matchid="206740484" itemtype="http://data-vocabulary.org/Event" itemscope="itemscope"><a class="MatchLink" itemprop="url" href="#" title="See the Man Utd vs Chelsea match page"><span class="ItemAside LiveInfo"><span class="StartDate" itemprop="startDate"><span class="SD-Date">30/05/13</span> <span class="SD-Time">16:00</span></span></span><span class="ItemMain MatchInfo"><span class="Match-P" itemprop="summary"><span class="P-Home">Man Utd</span><span class="P-Sep">–</span><span class="P-Away">Chelsea</span></span><span class="Match-L" itemprop="location"><span class="L-Sport" itemprop="eventType">Football</span><span class="L-Region Flag">England</span><span class="L-Tour">Premier League</span><span class="L-BookieNo">11 <span class="L-BNLive">(3)</span></span><span class="L-BetType">M<span class="Hideable">atch </span>W<span class="Hideable">inner</span>, 2<span class="Hideable">nd </span>s<span class="Hideable">et</span></span></span></span></a><ol class="OddsList ThreeWay"><li class="Outcome Outcome1"><a class="Bet" title="Best odds for Man Utd" href="#"><span class="Odds">1.22</span><span class="OutcomeName">Man Utd</span><span class="BML PP-3000200"><span class="BL">totesport</span></span></a></li><li class="Outcome Outcome2"><a class="Bet" title="Best odds for Draw" href="#"><span class="Odds">126.00</span><span class="OutcomeName">Draw</span><span class="BML PP-3000200"><span class="BL">totesport</span></span></a></li><li class="Outcome Outcome3"><a class="Bet" title="Best odds for Chelsea" href="#"><span class="Odds">4.00</span><span class="OutcomeName">Chelsea</span><span class="BML PP-3000200"><span class="BL">totesport</span></span></a></li></ol></li>',
		},

		// subviewsContainer: '',

		// subviews: [],

		viewOptions: [],

		initialize: function(){
			Widget.prototype.initialize.call(this);
		},

		setup: function(){}

		
	});

	return ListItem;

});