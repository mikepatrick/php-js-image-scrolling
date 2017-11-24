
    var Imgs = [
        'https://tympanus.net/Development/GridLoadingEffects/images/1.jpg',
        'https://tympanus.net/Development/GridLoadingEffects/images/3.jpg',
        'https://d13yacurqjgara.cloudfront.net/users/64706/screenshots/1167254/attachments/152315/SUGARSKULL-01.png',
        'https://tympanus.net/Development/GridLoadingEffects/images/8.jpg',
        'https://tympanus.net/Development/GridLoadingEffects/images/10.png',
        'https://tympanus.net/Development/GridLoadingEffects/images/14.png',
        'https://tympanus.net/Development/GridLoadingEffects/images/9.jpg',
        'https://tympanus.net/Development/GridLoadingEffects/images/13.png',
        'https://tympanus.net/Development/GridLoadingEffects/images/12.png',
        'https://tympanus.net/Development/GridLoadingEffects/images/4.jpg',
        'http://www.thedrum.com/uploads/news/172673/DzrMPF_DeezerPoster_MusicSoundBetterWithYou_03.jpg'
    ];
    var pagesServed = 0;

    $(document).ready(function(){ 
        $grid = $('#grid-content');

        $.fn.revealItems = function($items){
			var self = this;
            var iso = this.data('isotope');
            var itemSelector = iso.options.itemSelector;
			$items.then(function($fetcheditems) {
				console.log($fetcheditems);
				$($fetcheditems).hide();
				$(self).append($fetcheditems);
				$($fetcheditems).imagesLoaded().progress(function(imgLoad, image){
					var $item = $(image.img).parents(itemSelector);
					$item.show();
					iso.appended($item);
				});
			});


            return this;
        }
        $grid.isotope({
            containerStyle: null,
            masonry:{
                columnWidth: 300,
                gutter: 15
            },
            itemSelector: '.grid-item',
            filter : '*',
            transitionDuration: '0.4s'
        });


        $grid.imagesLoaded().progress(function(){
            $grid.isotope();
        })

        function GenerateItems(){
            
            // var items = '';
            // if (++pagesServed > 2) {
            //   return items; 
            // }
            // for(var i=0; i < Imgs.length; i++){
            //     items += '<div class="grid-item c'+(i%9)+' wow fadeInUp" ><a href=""><img src="'+Imgs[i%Imgs.length]+'" /></a></div>';
            // }
            // return $(items);
          console.log("generating items");
          var fetched =  fetch('http://localhost:8000').then(function(data) {
			  return data.text();
		  });
		  
		  return fetched;
        }

        // SimpleInfiniteScroll
        function Infinite(e){
            if((e.type == 'scroll') || e.type == 'click'){
                var doc = document.documentElement;
                var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
                var bottom = top + $(window).height();
                var docBottom = $(document).height();
				GenerateItems().then(function(data) {
					if(bottom + 50 >= docBottom){
						$grid.revealItems(GenerateItems());
					}
				});
                //if(bottom + 50 >= docBottom){
				//	
                //    $grid.revealItems(GenerateItems());
            }
        }
        

        $grid.revealItems(GenerateItems());

        $(window).resize(function(){
            var margin=40;
            var padding=15;
            var columns=0;
            var cWidth=300;
            var windowWidth = $(window).width();

            var overflow = false;
            while(!overflow){
                columns++;
                var WidthTheory = ((cWidth*columns)+((columns+1)*padding)+margin);
                if(WidthTheory > windowWidth)
                    overflow = true;
            }
            if(columns > 1)
                columns--;

            var GridWidth = ((cWidth*columns)+((columns+1)*padding)+margin);

            if( GridWidth != $('#grid').width()){
                $('#grid').width(GridWidth);
            }
        });
        $(window).scroll(Infinite);
        //new WOW().init();

    })