/**
 * $.popupmenu plugin
 * @author Jaroslav HraniÄŤka
 */

// run plugin
$(function () {
	$("ul.popupmenu").popupmenu();
});

(function ($) {
	var isTouch = function () {
		return ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch ||
			(typeof (navigator.msMaxTouchPoints) !== "undefined" && (navigator.msMaxTouchPoints > 0));
	};

	$.fn.popupmenu = function (options) {

		// support multiple elements
		if (this.length > 1) {
			this.each(function () {
				$(this).popupmenu(options);
			});
			return;
		}

		var defaults = {
			duration: 200,
			activeClass: "active"
		};

		options = $.extend(defaults, options);
		var self = this;
		var allMenus = [];

		var mouseEnterEvent = isTouch() ? "click" : "mouseenter";
		var mouseLeaveEvent = isTouch() ? "click" : "mouseleave";

		this.init = function () {
			$("li", self).each(function () {
				var $currentMenu = $(this);
				var $currentMenuLink = $(this).find('a:first');

				if ($("ul", $currentMenu).length) {
					allMenus.push($currentMenu);
					$currentMenu.data("popupmenu-before-active", $currentMenu.hasClass("active"));
					$currentMenuLink.data("popupmenu-before-active", $currentMenuLink.hasClass("active"));

					// show
					$currentMenu.bind(mouseEnterEvent + '.popupmenu', function (e) {
						var isOpened = $("ul", this).is(":visible");
						if (!isOpened) {
							if (mouseEnterEvent === "click") {
								e.preventDefault();
							}
							e.stopImmediatePropagation();
						}

						$(allMenus).each(function () {
							var $this = $(this);
							if ($this[0] !== $currentMenu[0]) {
								self.hideMenu($this);
							}
						});
						self.showMenu($currentMenu);
					});

					// hide
					var $hideSelector = $currentMenu;
					if (mouseLeaveEvent === "click") {
						$hideSelector = $("body");
					}

					$hideSelector.bind(mouseLeaveEvent + '.popupmenu', function () {
						self.hideMenu($currentMenu);
					});
				}
			});
		};

		this.showMenu = function ($currentMenu) {
			var data = self.parseMenu($currentMenu);
			if (data.progress) {
				return;
			}

			data.menu.addClass(options.activeClass);
			data.link.addClass(options.activeClass);

			data.ul.stop(true, true).slideDown(options.duration);
		};

		this.hideMenu = function ($currentMenu) {
			var data = self.parseMenu($currentMenu);

			if (!data.menu.data("popupmenu-before-active")) {
				data.menu.removeClass(options.activeClass);
			}
			if (!data.link.data("popupmenu-before-active")) {
				data.link.removeClass(options.activeClass);
			}

			data.ul.stop(true, true)
				.data('animating', true)
				.slideUp(options.duration, function () {
					data.ul.removeData('animating');
				});
		};

		this.parseMenu = function ($menu) {
			var $ul = $("ul", $menu);

			return {
				menu: $menu,
				progress: !!$ul.data('animating'),
				ul: $ul,
				link: $menu.find('a:first')
			};
		};

		this.reset = function () {
			$("li", self).each(function () {
				var $currentMenu = $(this);
				$currentMenu.unbind('.popupmenu');

				// hide
				var $hideSelector = $currentMenu;
				if (mouseLeaveEvent === "click") {
					$hideSelector = $("body");
				}

				$hideSelector.unbind('.popupmenu');
			});
		};

		this.reset();
		this.init();

	};
})(jQuery);