
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // load nytimes
	var NYTURL='http://api.nytimes.com/svc/search/v2/articlesearch.json?'+'q='+cityStr.replace(/\s+/g,'+')+'&api-key=91404d538668e6d58ee66f41dc841bca:10:72529321'
    $.getJSON(NYTURL,function(data){
		$nytHeaderElem.text('New York Times Articles About'+cityStr);
		articles=data.response.docs;
		for(var i=0;i<articles.length;i++){
			var article=articles[i];
			$nytElem.append('<li class="article">'+
			'<a href="'+article.web_url+'">'+article.headline.main+
			'</a>'+
			'<p>'+article.snippet+'</p>'+
			'</li>');
		};
	})
	//var NYTArtical_JSON=jQuery.getJSON(NYTURL);
	//var obj=("("+NYTArtical_JSON+")");
	//var Ariticals=new Array();
	//var Ariticals=NYTArtical_JSON.response.docs;
	//for(var i=0;i<10;i++){
	//	$nytElem.append("<p>"+Ariticals[i].headline.main+"</p>");
	//};
    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
