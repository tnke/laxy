/***************************************************************


       __        _____     __  __    __  __   
      /\_\      /\___/\  /\  /\  /\/\  /\  /\ 
     ( ( (     / / _ \ \ \ \ \/ / /\ \ \/ / / 
      \ \_\    \ \(_)/ /  \ \  / /  \ \__/ /  
      / / /__  / / _ \ \  / /  \ \   \__/ /   
     ( (_____(( (_( )_) )/ / /\ \ \  / / /    
      \/_____/ \/_/ \_\/ \/__\/__\/  \/_/     
                                         
        ~ A Parallax Side Menu Plugin

 Version: 0.2.2
 Author: Timo Sundvik
 Website: https://github.com/tnke

***************************************************************/

/*!
 * Laxy - Parallax Side Menu Plugin
 * Copyright (c) 2015 Timo Sundvik
 * License: MIT
 */

(function($){

    'use strict';
    var Laxy = window.Laxy || {};     

    Laxy = (function() {

        function Laxy(element, settings) {

            var _ = this;

            _.defaults = {
                container: 'body',                
                trigger: $(element).attr('id') + '-trigger',
                rtl: false,                
                wrapperID: 'laxy-wrapper',                
                wrapperClass: 'laxy-wrapper',
                menuClass: 'laxy-menu',
                activeClass: 'laxy-menu-active',
                triggerClass: 'laxy-menu-trigger',                
                ltrClass: 'laxy-menu-left',
                rtlClass: 'laxy-menu-right',                
                closeClass: 'laxy-menu-close',                
                cloneID: null,
                cloneClass: null,
                push: null,
                beforeOpen: null,
                afterOpen: null,
                beforeClose: null,
                afterClose: null
            };

            _.options = $.extend({}, _.defaults, settings);

            _.initials = {
                $menu: null,
                $wrapper: null
            };

            $.extend(_, _.initials);

            _.$source = $(element);            
            _.$container = $(_.options.container);            
            _.$trigger = $(_.options.trigger);

            _.clickHandler = $.proxy(_.clickHandler, _);
           
            _.init();
        }

        return Laxy;

    }());

    Laxy.prototype.getScrollbarSize = function() {

        var _ = this;

        if(_.scrollbarSize === undefined) {
            var scrollDiv = document.createElement("div");
            scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
            document.body.appendChild(scrollDiv);
            _.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
        }

        return _.scrollbarSize;
    };

    Laxy.prototype.init = function() {

        var _ = this;

        if (!_.$source.hasClass('laxy-initialized')) {

            _.buildOut();
            _.setClasses();
            _.initEvents();            
            _.$source.addClass('laxy-initialized');
            
        }
    };

    Laxy.prototype.buildOut = function() {

        var _ = this,
                wrapperCreated = $('#' + _.options.wrapperID).length;

        if (!wrapperCreated) {
            _.$container.wrapInner('<div id="' + _.options.wrapperID + '"></div>');            
        }

        _.$wrapper = $('#' + _.options.wrapperID);

        _.buildMenu();
    };

    Laxy.prototype.buildMenu = function() {

        var _ = this,            
                menuID = _.options.cloneID || _.$source.attr('id') + '-laxy',
                menu = _.$source.clone(true);

        if (_.options.cloneClass !== null) {
            menu.addClass(_.options.cloneClass);
        }

        menu.attr('id', menuID).appendTo(_.$container);        
        _.$menu = $('#'+menuID);
    };

    Laxy.prototype.setClasses = function() {

        var _ = this;

        _.$trigger.addClass(_.options.triggerClass);
        _.$wrapper.addClass(_.options.wrapperClass);
        _.$menu.addClass(_.options.menuClass);

        if (_.options.rtl) {
            _.$menu.addClass(_.options.rtlClass);
        } else {
            _.$menu.addClass(_.options.ltrClass);
        }

        if (_.options.push) {
            $.each(_.options.push, function (i, v) {
                $(v.element).addClass('laxy-push');

                if (v.offset) {
                    $(v.element).addClass('laxy-push-offset');
                }
            });
        }

    };

    Laxy.prototype.initEvents = function() {

        var _ = this;

        _.$trigger.on('click.laxy', _.clickHandler);
    };

    Laxy.prototype.open = function() {

        var _ = this;

        if (_.options.beforeOpen !== null) {
            _.options.beforeOpen.call(_);
        };

        // Disable scroll for main content
        _.disableScroll();         

        // Wait for next cycle to allow CSS transition
        setTimeout(function() {
            _.$trigger.addClass(_.options.closeClass);
            _.$menu.addClass(_.options.activeClass);
            _.$wrapper.addClass(_.options.activeClass);

            if (_.options.rtl) {
                _.$wrapper.addClass(_.options.rtlClass);
            } else {
                _.$wrapper.addClass(_.options.ltrClass);
            }

            if (_.options.afterOpen !== null) {
                _.options.afterOpen.call(_);
            };
        }, 16);
    };

    Laxy.prototype.disableScroll = function() {

        var _ = this,
            scrollbarSize = _.scrollbarSize || _.getScrollbarSize();

        $('html').addClass('laxy-noscroll');

        if(_.options.push !== null) {
            if (!_.options.rtl) {
                $('html').css({ 
                    marginLeft: 0,
                    marginRight: scrollbarSize + 'px'
                });
            } else {
                $('html').css({ 
                    marginLeft: scrollbarSize + 'px',
                    marginRight: 0
                });
            }
        }        
    };

    Laxy.prototype.enableScroll = function() {

        var _ = this;

        $('html').removeClass('laxy-noscroll').css({ 
            marginLeft: 0,
            marginRight: 0
        });
    };

    Laxy.prototype.close = function() {

        var _ = this;

        if (_.options.beforeClose !== null) {
            _.options.beforeClose.call(_);
        };

        // Enable scroll for main content
        _.enableScroll();

        // Wait for next cycle to allow CSS transition
        setTimeout(function() {
            _.$menu.removeClass(_.options.activeClass);
            _.$wrapper.removeClass(_.options.activeClass + ' ' + _.options.ltrClass + ' ' + _.options.rtlClass);
            _.$wrapper
                .find('.' + _.options.triggerClass)
                    .removeClass(_.options.closeClass);

            if (_.options.afterClose !== null) {
                _.options.afterClose.call(_);
            };
        }, 16);
    };

    Laxy.prototype.clickHandler = function(e) {
        e.preventDefault(); 

        var _ = this,
                isMenuOpen = _.$trigger.hasClass(_.options.closeClass) ? 1 : 0;

        if (!isMenuOpen) {
            _.open();
        } else {
            _.close();
        }
    };

    $.fn.laxy = function(options) {
        var _ = this;
        return _.each(function(index, element) {

            element.laxy = new Laxy(element, options);            

        });
    };

    $.fn.laxyClose = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.laxy.close();

        });
    }; 

})(window.jQuery);