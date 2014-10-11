/**
 * Created with PhpStorm.
 * User: Liu Yang
 * Date: 14-10-9
 * Time: 下午3:09
 * Description:对TOC插件的一个简单的扩充
 */
;(function(w,$){
    var namespace = "tocPlugin";
    var verboseIdCache = {};
    $.fn[namespace] = function (opt) {
        var opts = $.extend({}, $.fn[namespace].defaults, opt),
            self = this,
            container = $(opts.container),
            headings = $(opts.selectors, container),
            headingOffsets = [],
            activeClassName = opts.prefix + opts.activeClass,
            activeOpenClassName = opts.prefix + opts.activeOpenClassName;

        //获取下标
        function getIndex(arr,text) {
            for(var i = 0; i<arr.length; i++){
                if(text.toLowerCase() === arr[i].toLowerCase()) {
                    return i;
                }
            }
        }

        //highlight on scroll
        var timeout;
        var highlightOnScroll = function(e) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function() {
                var top = $(w).scrollTop(),
                    highlighted, closest = Number.MAX_VALUE, index = 0;

                for (var i = 0, c = headingOffsets.length; i < c; i++) {
                    var currentClosest = Math.abs(headingOffsets[i] - top);
                    if (currentClosest < closest) {
                        index = i;
                        closest = currentClosest;
                    }
                }

                $('li', self).removeClass(activeClassName + " " + activeOpenClassName);
                highlighted = $('li:eq('+ index +')', self).addClass(activeClassName);
                opts.onHighlight(highlighted,activeOpenClassName);
            }, 50);
        };

        if (opts.highlightOnScroll) {
            $(w).bind('scroll', highlightOnScroll);
            highlightOnScroll();
        }

        $(w).resize(function(e){
            headings.each(function(i) {
                headingOffsets[i] = $(this).offset().top - opts.highlightOffset;
            });
        });

        return self.each(function(){
            var el = $(this),ul = $(opts.listType),ulList=[],currentIndex= 0,lastLi=null;
            ul.addClass(opts.prefix + opts.wrapClass);
            ulList.push(ul);
            if(headings.length) {
                el.removeClass(opts.prefix + opts.emptyClass)
            }
            headings.each(function(i,heading){
                var $h = $(heading);
                headingOffsets.push($h.offset().top - opts.highlightOffset);
                var anchorName = opts.anchorName(i, heading, opts.prefix);
                //add anchor
                if(!heading.id) {
                    $h.attr('id',anchorName);
                }
                var a = $('<a/>')
                    .text(opts.headerText(i, heading, $h))
                    .attr('href', '#' + anchorName);
                var dot = $('<i>').addClass(opts.prefix + opts.listNavDot);
                var li = $('<li/>').
                    addClass(opts.itemClass(i, heading, $h, opts.prefix))
                    .append(a,dot);
                if(opts.listMode) { //子级带折叠模式
                    var index = getIndex(opts.selectors.split(','), heading.tagName);
                    if(i && currentIndex < index ) {
                        ulList[index] = $(opts.listType).addClass(function(){
                            if(typeof opts.ulClass == 'function') {
                                return opts.ulClass(index, opts.prefix);
                            }
                        });
                        lastLi.append(ulList[index]);
                        currentIndex = index;
                    }
                    if(currentIndex > index) {
                        currentIndex = index;
                    }
                    ulList[currentIndex] && ulList[currentIndex].append(li);
                } else {
                    ul.append(li);
                }
                lastLi = li;
            });

            el.append(ul);
        });
    };


    //默认参数配置
    $.fn[namespace].defaults = {
        container: 'body',
        listType: '<ul/>',
        listMode: "1",         //1是子级模式
        selectors: 'h2,h3,h4',
        scrollToOffset: 0,
        prefix: 'toc-',
        wrapClass: 'nav',
        activeClass: 'active',
        activeOpenClassName: 'open',
        listNavDot: 'nav-dot',
        emptyClass: 'empty',
        onHighlight: function(li,className) {
            $(li).parents('li').addClass(className);
        },
        highlightOnScroll: true,
        highlightOffset: 100,
        anchorName: function(i, heading, prefix) {
            if(heading.id.length) {
                return heading.id;
            }
            var candidateId = $(heading).text().replace(/[^a-z0-9]/ig, ' ').replace(/\s+/g, '-').toLowerCase();
            if (verboseIdCache[candidateId]) {
                var j = 2;

                while(verboseIdCache[candidateId + j]) {
                    j++;
                }
                candidateId = candidateId + '-' + j;

            }
            verboseIdCache[candidateId] = true;

            return prefix + candidateId + i;
        },
        headerText: function(i, heading, $heading) {
            return $heading.data('toc-title') || $heading.text();
        },
        itemClass: function(i, heading, $heading, prefix) {
            return prefix + $heading[0].tagName.toLowerCase();
        },
        ulClass: function(i,prefix){
            return prefix + 'depth-' +i;
        }
    };
})(window,jQuery);