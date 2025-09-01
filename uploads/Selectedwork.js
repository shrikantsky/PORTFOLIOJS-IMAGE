/*!
* jQuery Transit - CSS3 transitions and transformations
* (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
* MIT Licensed.
*/

(function (k) { k.transit = { version: "0.9.9", propertyMap: { marginLeft: "margin", marginRight: "margin", marginBottom: "margin", marginTop: "margin", paddingLeft: "padding", paddingRight: "padding", paddingBottom: "padding", paddingTop: "padding" }, enabled: true, useTransitionEnd: false }; var d = document.createElement("div"); var q = {}; function b(v) { if (v in d.style) { return v } var u = ["Moz", "Webkit", "O", "ms"]; var r = v.charAt(0).toUpperCase() + v.substr(1); if (v in d.style) { return v } for (var t = 0; t < u.length; ++t) { var s = u[t] + r; if (s in d.style) { return s } } } function e() { d.style[q.transform] = ""; d.style[q.transform] = "rotateY(90deg)"; return d.style[q.transform] !== "" } var a = navigator.userAgent.toLowerCase().indexOf("chrome") > -1; q.transition = b("transition"); q.transitionDelay = b("transitionDelay"); q.transform = b("transform"); q.transformOrigin = b("transformOrigin"); q.transform3d = e(); var i = { transition: "transitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", WebkitTransition: "webkitTransitionEnd", msTransition: "MSTransitionEnd" }; var f = q.transitionEnd = i[q.transition] || null; for (var p in q) { if (q.hasOwnProperty(p) && typeof k.support[p] === "undefined") { k.support[p] = q[p] } } d = null; k.cssEase = { _default: "ease", "in": "ease-in", out: "ease-out", "in-out": "ease-in-out", snap: "cubic-bezier(0,1,.5,1)", easeOutCubic: "cubic-bezier(.215,.61,.355,1)", easeInOutCubic: "cubic-bezier(.645,.045,.355,1)", easeInCirc: "cubic-bezier(.6,.04,.98,.335)", easeOutCirc: "cubic-bezier(.075,.82,.165,1)", easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)", easeInExpo: "cubic-bezier(.95,.05,.795,.035)", easeOutExpo: "cubic-bezier(.19,1,.22,1)", easeInOutExpo: "cubic-bezier(1,0,0,1)", easeInQuad: "cubic-bezier(.55,.085,.68,.53)", easeOutQuad: "cubic-bezier(.25,.46,.45,.94)", easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)", easeInQuart: "cubic-bezier(.895,.03,.685,.22)", easeOutQuart: "cubic-bezier(.165,.84,.44,1)", easeInOutQuart: "cubic-bezier(.77,0,.175,1)", easeInQuint: "cubic-bezier(.755,.05,.855,.06)", easeOutQuint: "cubic-bezier(.23,1,.32,1)", easeInOutQuint: "cubic-bezier(.86,0,.07,1)", easeInSine: "cubic-bezier(.47,0,.745,.715)", easeOutSine: "cubic-bezier(.39,.575,.565,1)", easeInOutSine: "cubic-bezier(.445,.05,.55,.95)", easeInBack: "cubic-bezier(.6,-.28,.735,.045)", easeOutBack: "cubic-bezier(.175, .885,.32,1.275)", easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)" }; k.cssHooks["transit:transform"] = { get: function (r) { return k(r).data("transform") || new j() }, set: function (s, r) { var t = r; if (!(t instanceof j)) { t = new j(t) } if (q.transform === "WebkitTransform" && !a) { s.style[q.transform] = t.toString(true) } else { s.style[q.transform] = t.toString() } k(s).data("transform", t) } }; k.cssHooks.transform = { set: k.cssHooks["transit:transform"].set }; if (k.fn.jquery < "1.8") { k.cssHooks.transformOrigin = { get: function (r) { return r.style[q.transformOrigin] }, set: function (r, s) { r.style[q.transformOrigin] = s } }; k.cssHooks.transition = { get: function (r) { return r.style[q.transition] }, set: function (r, s) { r.style[q.transition] = s } } } n("scale"); n("translate"); n("rotate"); n("rotateX"); n("rotateY"); n("rotate3d"); n("perspective"); n("skewX"); n("skewY"); n("x", true); n("y", true); function j(r) { if (typeof r === "string") { this.parse(r) } return this } j.prototype = { setFromString: function (t, s) { var r = (typeof s === "string") ? s.split(",") : (s.constructor === Array) ? s : [s]; r.unshift(t); j.prototype.set.apply(this, r) }, set: function (s) { var r = Array.prototype.slice.apply(arguments, [1]); if (this.setter[s]) { this.setter[s].apply(this, r) } else { this[s] = r.join(",") } }, get: function (r) { if (this.getter[r]) { return this.getter[r].apply(this) } else { return this[r] || 0 } }, setter: { rotate: function (r) { this.rotate = o(r, "deg") }, rotateX: function (r) { this.rotateX = o(r, "deg") }, rotateY: function (r) { this.rotateY = o(r, "deg") }, scale: function (r, s) { if (s === undefined) { s = r } this.scale = r + "," + s }, skewX: function (r) { this.skewX = o(r, "deg") }, skewY: function (r) { this.skewY = o(r, "deg") }, perspective: function (r) { this.perspective = o(r, "px") }, x: function (r) { this.set("translate", r, null) }, y: function (r) { this.set("translate", null, r) }, translate: function (r, s) { if (this._translateX === undefined) { this._translateX = 0 } if (this._translateY === undefined) { this._translateY = 0 } if (r !== null && r !== undefined) { this._translateX = o(r, "px") } if (s !== null && s !== undefined) { this._translateY = o(s, "px") } this.translate = this._translateX + "," + this._translateY } }, getter: { x: function () { return this._translateX || 0 }, y: function () { return this._translateY || 0 }, scale: function () { var r = (this.scale || "1,1").split(","); if (r[0]) { r[0] = parseFloat(r[0]) } if (r[1]) { r[1] = parseFloat(r[1]) } return (r[0] === r[1]) ? r[0] : r }, rotate3d: function () { var t = (this.rotate3d || "0,0,0,0deg").split(","); for (var r = 0; r <= 3; ++r) { if (t[r]) { t[r] = parseFloat(t[r]) } } if (t[3]) { t[3] = o(t[3], "deg") } return t } }, parse: function (s) { var r = this; s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function (t, v, u) { r.setFromString(v, u) }) }, toString: function (t) { var s = []; for (var r in this) { if (this.hasOwnProperty(r)) { if ((!q.transform3d) && ((r === "rotateX") || (r === "rotateY") || (r === "perspective") || (r === "transformOrigin"))) { continue } if (r[0] !== "_") { if (t && (r === "scale")) { s.push(r + "3d(" + this[r] + ",1)") } else { if (t && (r === "translate")) { s.push(r + "3d(" + this[r] + ",0)") } else { s.push(r + "(" + this[r] + ")") } } } } } return s.join(" ") } }; function m(s, r, t) { if (r === true) { s.queue(t) } else { if (r) { s.queue(r, t) } else { t() } } } function h(s) { var r = []; k.each(s, function (t) { t = k.camelCase(t); t = k.transit.propertyMap[t] || k.cssProps[t] || t; t = c(t); if (k.inArray(t, r) === -1) { r.push(t) } }); return r } function g(s, v, x, r) { var t = h(s); if (k.cssEase[x]) { x = k.cssEase[x] } var w = "" + l(v) + " " + x; if (parseInt(r, 10) > 0) { w += " " + l(r) } var u = []; k.each(t, function (z, y) { u.push(y + " " + w) }); return u.join(", ") } k.fn.transition = k.fn.transit = function (z, s, y, C) { var D = this; var u = 0; var w = true; if (typeof s === "function") { C = s; s = undefined } if (typeof y === "function") { C = y; y = undefined } if (typeof z.easing !== "undefined") { y = z.easing; delete z.easing } if (typeof z.duration !== "undefined") { s = z.duration; delete z.duration } if (typeof z.complete !== "undefined") { C = z.complete; delete z.complete } if (typeof z.queue !== "undefined") { w = z.queue; delete z.queue } if (typeof z.delay !== "undefined") { u = z.delay; delete z.delay } if (typeof s === "undefined") { s = k.fx.speeds._default } if (typeof y === "undefined") { y = k.cssEase._default } s = l(s); var E = g(z, s, y, u); var B = k.transit.enabled && q.transition; var t = B ? (parseInt(s, 10) + parseInt(u, 10)) : 0; if (t === 0) { var A = function (F) { D.css(z); if (C) { C.apply(D) } if (F) { F() } }; m(D, w, A); return D } var x = {}; var r = function (H) { var G = false; var F = function () { if (G) { D.unbind(f, F) } if (t > 0) { D.each(function () { this.style[q.transition] = (x[this] || null) }) } if (typeof C === "function") { C.apply(D) } if (typeof H === "function") { H() } }; if ((t > 0) && (f) && (k.transit.useTransitionEnd)) { G = true; D.bind(f, F) } else { window.setTimeout(F, t) } D.each(function () { if (t > 0) { this.style[q.transition] = E } k(this).css(z) }) }; var v = function (F) { this.offsetWidth; r(F) }; m(D, w, v); return this }; function n(s, r) { if (!r) { k.cssNumber[s] = true } k.transit.propertyMap[s] = q.transform; k.cssHooks[s] = { get: function (v) { var u = k(v).css("transit:transform"); return u.get(s) }, set: function (v, w) { var u = k(v).css("transit:transform"); u.setFromString(s, w); k(v).css({ "transit:transform": u }) } } } function c(r) { return r.replace(/([A-Z])/g, function (s) { return "-" + s.toLowerCase() }) } function o(s, r) { if ((typeof s === "string") && (!s.match(/^[\-0-9\.]+$/))) { return s } else { return "" + s + r } } function l(s) { var r = s; if (k.fx.speeds[r]) { r = k.fx.speeds[r] } return o(r, "ms") } k.transit.getTransitionValue = g })(jQuery);



/*!
Waypoints - 4.0.1
Copyright Â© 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Private */
  Waypoint.invokeAll = function(method) {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    Waypoint.invokeAll('destroy')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function() {
    Waypoint.invokeAll('disable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function() {
    Waypoint.Context.refreshAll()
    for (var waypointKey in allWaypoints) {
      allWaypoints[waypointKey].enabled = true
    }
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1
    if (!Waypoint.windowContext) {
      Waypoint.windowContext = true
      Waypoint.windowContext = new Context(window)
    }

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    var isWindow = this.element == this.element.window
    if (horizontalEmpty && verticalEmpty && !isWindow) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        Waypoint.requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        Waypoint.requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    setTimeout(function(){
        Waypoint.Context.refreshAll()
    },150);
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: 0,
        oldScroll: 0,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: window.nectarDOMInfo.scrollTop,
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        if (waypoint.triggerPoint === null) {
          continue
        }
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window
    /*eslint-enable eqeqeq */
    var contextOffset = isWindow ? undefined : this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = Math.floor(elementOffset + contextModifier - adjustment)
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    Waypoint.requestAnimationFrame(function() {
      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers()
      }
    })

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }


  Waypoint.requestAnimationFrame = function(callback) {
    var requestFn = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      requestAnimationFrameShim
    requestFn.call(window, callback)
  }
  Waypoint.Context = Context
}())
;(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  function JQueryAdapter(element) {
    this.$element = $(element)
  }

  $.each([
    'innerHeight',
    'innerWidth',
    'off',
    'offset',
    'on',
    'outerHeight',
    'outerWidth',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    JQueryAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  $.each([
    'extend',
    'inArray',
    'isEmptyObject'
  ], function(i, method) {
    JQueryAdapter[method] = $[method]
  })

  Waypoint.adapters.push({
    name: 'jquery',
    Adapter: JQueryAdapter
  })
  Waypoint.Adapter = JQueryAdapter
}())
;(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
    return function() {
      var waypoints = []
      var overrides = arguments[0]

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1])
        overrides.handler = arguments[0]
      }

      this.each(function() {
        var options = framework.extend({}, overrides, {
          element: this
        })
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0]
        }
        waypoints.push(new Waypoint(options))
      })

      return waypoints
    }
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}())
;



/**
 * Salient "Testimonial Slider" script file.
 *
 * @package Salient
 * @author ThemeNectar
 */

(function( $ ) {
	
	"use strict";

  function NectarTestimonialSlider(el,type,resizeVideoToCover,fullWidthContentColumns) {
		
    this.el = el;
    this.type = type;
		this.resizeVideoToCover = resizeVideoToCover;
		this.fullWidthContentColumns = fullWidthContentColumns;
    this.flickityEl = null;
    
    this.createTestimonialControls();
  }


  // create controls
  NectarTestimonialSlider.prototype.createTestimonialControls = function() {
    
    var $frontEndEditorTestimonialDiv =  ($('body.vc_editor').length > 0) ? '> div': 'blockquote';
    var $that, slide_interval, objectStore;
    
    if( this.type != 'multiple_visible' && this.type != 'multiple_visible_minimal' ) {
      
      // fadeIn
      this.el.animate({'opacity':'1'},800);
      

      if(this.el.find('blockquote').length > 1) {
        this.el.find('.controls, .testimonial-next-prev').remove();
        this.el.append('<div class="controls"><ul></ul></div>');
        
        var slideNum = this.el.find('blockquote').length;
        $that = this.el;
        
        for(var i=0;i<slideNum;i++) {
          
          if( !this.el.is('[data-style="minimal"]') ) {
            $that.find('.controls ul').append('<li><span class="pagination-switch"></span></li>');
          } else {
            $that.find('.controls ul').append('<li>'+(i+1)+'</li>');
          }
        }
        
        // minimal
        if( this.el.is('[data-style="minimal"]') ) {
          
          // add next/prev
          this.el.append('<div class="testimonial-next-prev"><a href="#" class="prev fa fa-angle-left"></a><a href="#" class="next fa fa-angle-right"></a></div>');
          
          // bind controls
          this.el.find('.testimonial-next-prev a').on('click',this.minimalNextPrevSelect);
          
          // start on first
          if(this.el.find('.active').length == 0) {
            this.el.find('.slides '+$frontEndEditorTestimonialDiv +':first-child').addClass('active').css({'opacity':'1', 'transform': 'translateX(0px)'}).css('z-index','20');
            if(	!this.el.hasClass('disable-height-animation') ) {
              this.el.find('.slides').css({'height' : this.el.find('.slides '+$frontEndEditorTestimonialDiv +':first-child').height() + 40 + 'px' });
            }
          }
          
          // autorotate
          if(this.el.attr('data-autorotate').length > 0) {
            $that = this.el;
            slide_interval = (parseInt(this.el.attr('data-autorotate')) < 100) ? 4000 : parseInt(this.el.attr('data-autorotate'));
            objectStore = this;
            var $rotate = setInterval(function(){ objectStore.testimonialRotate($that); },slide_interval);
          }
          this.el.find('.testimonial-next-prev a').on('click',function(e){
            if(typeof e.clientX != 'undefined') {
							clearInterval($rotate);
						}
          });
          
          // wrap bullets
          this.el.find('.controls ul').wrap('<div class="control-wrap" />');
          this.el.find('.controls ul').css('width', ((this.el.find('.controls ul li').length * 20) +1) + 'px');
          this.el.find('.controls').append('<span class="out-of">/</span><span class="total">'+ this.el.find('blockquote').length+'</span>');
          
          //// swipe for testimonials
          this.el.swipe({
            
            swipeLeft : function(e) {
              $that.find('.testimonial-next-prev .next').trigger('click');
              e.stopImmediatePropagation();
              clearInterval($rotate);
              return false;
            },
            swipeRight : function(e) {
              $that.find('.testimonial-next-prev .prev').trigger('click');
              e.stopImmediatePropagation();
              clearInterval($rotate);
              return false;
            }    
          });
          
          
        }
        
        // non minimal
        if( !this.el.is('[data-style="minimal"]') ) {
          
          // bind controls
          this.el.find('.controls ul li').on('click',this.defaultPaginationSelect);
          
          // activate first slide
          this.el.find('.controls ul li').first().trigger('click');
          
          // autorotate
          if(this.el.attr('data-autorotate').length > 0) {
            slide_interval = (parseInt(this.el.attr('data-autorotate')) < 100) ? 4000 : parseInt(this.el.attr('data-autorotate'));
            $that = this.el;
            objectStore = this;
            var $rotate = setInterval(function(){ objectStore.testimonialRotate($that); },slide_interval);
          }
          
          this.el.find('.controls li').on('click',function(e){
            if(typeof e.clientX != 'undefined') clearInterval($rotate);
          });
          
          //// swipe for testimonials
          this.el.swipe({
            
            swipeLeft : function(e) {
              $that.find('.controls ul li span.active').parent().next('li').find('span').trigger('click');
              e.stopImmediatePropagation();
              clearInterval($rotate);
              return false;
            },
            swipeRight : function(e) {
              $that.find('.controls ul li span.active').parent().prev('li').find('span').trigger('click');
              e.stopImmediatePropagation();
              clearInterval($rotate);
              return false;
            }    
          });
          
        }
      } 
      
      // only one testimonial
      else if(this.el.find('.controls').length == 0) {
        
        var currentHeight = this.el.find('.slides blockquote').height();
        
        this.el.find('.slides blockquote')
          .css({'opacity':'0', 'transform': 'translateX(-25px)', 'z-index': '1'});
          
        this.el.find('.slides blockquote')
          .css({'opacity':'1', 'transform': 'translateX(0px)'})
          .css('z-index','20');
          
        this.el.find('.slides')
          .stop(true,true)
          .animate({'height' : currentHeight + 20 + 'px' },450,'easeOutCubic');
      }
      
      
    } //non multiple vis
    
    
    
    if( this.type == 'multiple_visible' || this.type == 'multiple_visible_minimal' ) {
      
      objectStore = this;
      $that = this.el; 
      var $element = $that;
      var $autoplay = ($that.attr('data-autorotate').length > 1 && parseInt($that.attr('data-autorotate')) > 100) ? parseInt($that.attr('data-autorotate')) : false;
      if($that.find('img').length == 0) { $element = $('body'); }
      
      // move img pos
      if( this.el.attr('data-style') != 'multiple_visible_minimal') {
        this.el.find('blockquote').each(function(){
          $(this).find('.image-icon').insertAfter($(this).find('p'));
        });
      } else {
        // has alf class
        if(this.el.find('blockquote').length > 4) {
          this.el.addClass('has-alf');
        }
      }
      
      var $testimonialGroupCells = (this.el.attr('data-style') == 'multiple_visible_minimal') ? true : false;
      var $frontEndEditorDrag =  ($('body.vc_editor').length > 0) ? false: true;
      var $frontEndEditorPause =  ($('body.vc_editor').length > 0) ? true: false;
      
      this.flickityEl = $that.find('.slides').flickity({
        contain: true,
        draggable: $frontEndEditorDrag,
        groupCells: $testimonialGroupCells,
        lazyLoad: false,
        imagesLoaded: true,
        percentPosition: true,
        prevNextButtons: false,
        pageDots: true,
        resize: true,
        setGallerySize: true,
        wrapAround: true,
        autoPlay: $autoplay,
        pauseAutoPlayOnHover: $frontEndEditorPause,
        accessibility: false
      });
      
      if(this.flickityEl.find('.vc_element.is-selected > blockquote').length > 0) {
        
        // starting
        this.flickityEl.find('.vc_element.is-selected > blockquote').addClass('is-selected');
        
        // changed
        this.flickityEl.on( 'select.flickity', function() {
          objectStore.flickityEl.find('.vc_element > blockquote').removeClass('is-selected');
          objectStore.flickityEl.find('.vc_element.is-selected > blockquote').addClass('is-selected');
        });
      }
      
      
      $that.css('opacity','1');
      
      
    }
		
		var testimonialObj = this;
		$('body').on('click', '.testimonial_slider:not([data-style*="multiple_visible"]):not([data-style="minimal"]) .controls li, .testimonial_slider[data-style="minimal"] .testimonial-next-prev a', function () {
			testimonialObj.resizeVideoToCover();
			return false;
		});
    
    
  };


  NectarTestimonialSlider.prototype.defaultPaginationSelect = function(clicked) {
    
    var $target = $(clicked.currentTarget);
    
    if($target.find('span').hasClass('active')) { 
      return false; 
    }
    
    var $frontEndEditorTestimonialDiv = ($('body.vc_editor').length > 0) ? '> div': 'blockquote';
    var $index = $target.index();
    var currentHeight = $target.parents('.testimonial_slider').find('.slides blockquote').eq($index).height();
    
    $target.parents('.testimonial_slider').find('li span').removeClass('active');
    $target.find('span').addClass('active');
    
    $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv).addClass('no-trans');
    $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv).css({'opacity':'0', 'transform': 'translateX(-25px)', 'z-index': '1'});
    
    $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv)
      .eq($index)
      .removeClass('no-trans')
      .css({'opacity':'1', 'transform': 'translateX(0px)'})
      .css('z-index','20');
      
    $target.parents('.testimonial_slider:not(.disable-height-animation)').find('.slides')
      .stop(true,true)
      .animate({'height' : currentHeight + 40 + 'px' },450,'easeOutCubic');
    
  };

  NectarTestimonialSlider.prototype.minimalNextPrevSelect = function(clicked) {
    
    var $target = $(clicked.currentTarget);
    
    var $frontEndEditorTestimonialDiv =  ($('body.vc_editor').length > 0) ? '> div': 'blockquote';
    var $index = $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv+'.active').index();
    var $actualIndex = $index;
    var currentHeight;
    
    $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv).addClass('no-trans');
    $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv).css({'opacity':'0', 'transform': 'translateX(-25px)', 'z-index': '1'});
    
    
    $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv).eq($index).removeClass('active');
    
    if($target.hasClass('next')) {
      if($index+1 >= $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv).length) { 
        $actualIndex = 0; 
      } else {
        $actualIndex = $index+1; 
      }
      currentHeight = $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv).eq($actualIndex).height();
      
      // show slide
      $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv).eq($actualIndex)
        .addClass('active')
        .removeClass('no-trans')
        .css({'opacity':'1', 'transform': 'translateX(0px)'})
        .css('z-index','20');
      
      // change pag #
      $target.parents('.testimonial_slider').find('.control-wrap ul').css({'transform':'translateX(-'+(20*$actualIndex)+'px)'});
      
    } else {
      if($index-1 == -1) { 
        $actualIndex = $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv).length-1; 
      } else {
        $actualIndex = $index-1; 
      }
      currentHeight = $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv).eq($index-1).height();
      
      // show slide
      $target.parents('.testimonial_slider').find('.slides '+$frontEndEditorTestimonialDiv)
        .eq($index-1)
        .addClass('active')
        .removeClass('no-trans')
        .css({'opacity':'1', 'transform': 'translateX(0px)'})
        .css('z-index','20');
        
      // change pag #
      $target.parents('.testimonial_slider')
        .find('.control-wrap ul')
        .css({'transform':'translateX(-'+(20*$actualIndex)+'px)'});
        
    }
    
    
    $target.parents('.testimonial_slider:not(.disable-height-animation)')
      .find('.slides')
      .stop(true,true)
      .animate({'height' : currentHeight + 40 + 'px' },450,'easeOutCubic');
			
		return false;
    
  };


  NectarTestimonialSlider.prototype.testimonialRotate = function(){
    
    var $testimonialLength = this.el.find('li').length;
    var $currentTestimonial = this.el.find('.pagination-switch.active').parent().index();
    
    // stop the rotation when toggles are closed
    if( this.el.parents('.toggle').length > 0 && this.el.parents('.toggle').hasClass('open') ) {
      
      if( !this.el.is('[data-style="minimal"]') ) {
        if( $currentTestimonial+1 == $testimonialLength) {
          this.el.find('ul li:first-child').trigger('click');
        } else {
          this.el.find('.pagination-switch.active').parent().next('li').trigger('click');
        }
      } else {
        this.el.find('.testimonial-next-prev .next').trigger('click');
      }
      
    } else {
      
      if( !this.el.is('[data-style="minimal"]') ) {
        if( $currentTestimonial+1 == $testimonialLength) {
          this.el.find('ul li:first-child').trigger('click');
        } else {
          this.el.find('.pagination-switch.active').parent().next('li').trigger('click');
        }
      } else {
        this.el.find('.testimonial-next-prev .next').trigger('click');
      }
      
    }
    
  };


  NectarTestimonialSlider.prototype.testimonialHeightResize = function() {
    
    if(!this.el.is('.disable-height-animation') && !this.el.is('[data-style*="multiple_visible"]') ) {
      
      var $frontEndEditorTestimonialDiv = ($('body.vc_editor').length > 0) ? '.slides > div': '.slides blockquote';
      var $index;
      
      if( this.el.is('[data-style="minimal"]') ) {
        $index = this.el.find($frontEndEditorTestimonialDiv + '.active').index();
      } else {
        $index = this.el.find('.controls ul li span.active').parent().index();
      }
      
      var currentHeight = this.el.find($frontEndEditorTestimonialDiv).eq($index).height();
      this.el.find('.slides').stop(true,true).css({'height' : currentHeight + 40 + 'px' });
      
    }
    
  };


  NectarTestimonialSlider.prototype.testimonialSliderHeight = function() {
    
    if( this.el.is('.disable-height-animation') && !this.el.is('[data-style*="multiple_visible"]') ) {
      
      var $tallestQuote = 0;
      
      this.el.find('blockquote').each(function(){
        ($(this).height() > $tallestQuote) ? $tallestQuote = $(this).height() : $tallestQuote = $tallestQuote;
      });	
      
      // safety net incase height couldn't be determined
      if($tallestQuote == 0) {
				$tallestQuote = 100;
			}
      
      // set even height
      this.el.find('.slides').css('height',$tallestQuote+40+'px');
      
      // show the slider once height is set
      this.el.animate({'opacity':'1'});
      
      this.fullWidthContentColumns();
      
    }	
    
  };

  NectarTestimonialSlider.prototype.testimonialSliderHeightMinimalMult = function() {
    
    if( this.type == 'multiple_visible_minimal') {
      
      var $tallestQuote = 0;
      
      this.el.find('blockquote > .inner p').css('height','auto');
      
      this.el.find('blockquote > .inner p').each(function(){
        ($(this).height() > $tallestQuote) ? $tallestQuote = $(this).height() : $tallestQuote = $tallestQuote;
      });	
      
      // safety net incase height couldn't be determined
      if($tallestQuote == 0) { $tallestQuote = 200; }
      
      // set even height
      this.el.find('blockquote > .inner p').css('height',$tallestQuote+'px');
      
    }
    
    
  };
  
  window.NectarTestimonialSlider = NectarTestimonialSlider;

}( jQuery ));

/*!
 * Flickity PACKAGED v2.1.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'jquery-bridget/jquery-bridget',[ 'jquery' ], function( jQuery ) {
      return factory( window, jQuery );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('jquery')
    );
  } else {
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  }

}( window, function factory( window, jQuery ) {
'use strict';

// ----- utils ----- //

var arraySlice = Array.prototype.slice;

// helper function for logging errors
// $.error breaks jQuery chaining
var console = window.console;
var logError = typeof console == 'undefined' ? function() {} :
  function( message ) {
    console.error( message );
  };

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) {
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) {
    return;
  }

  // add option method -> $().plugin('option', {...})
  if ( !PluginClass.prototype.option ) {
    // option setter
    PluginClass.prototype.option = function( opts ) {
      // bail out if not an object
      if ( !$.isPlainObject( opts ) ){
        return;
      }
      this.options = $.extend( true, this.options, opts );
    };
  }

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0 /*, arg1 */ ) {
    if ( typeof arg0 == 'string' ) {
      // method call $().plugin( 'methodName', { options } )
      // shift arguments by 1
      var args = arraySlice.call( arguments, 1 );
      return methodCall( this, arg0, args );
    }
    // just $().plugin({ options })
    plainCall( this, arg0 );
    return this;
  };

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) {
    var returnValue;
    var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

    $elems.each( function( i, elem ) {
      // get instance
      var instance = $.data( elem, namespace );
      if ( !instance ) {
        logError( namespace + ' not initialized. Cannot call methods, i.e. ' +
          pluginMethodStr );
        return;
      }

      var method = instance[ methodName ];
      if ( !method || methodName.charAt(0) == '_' ) {
        logError( pluginMethodStr + ' is not a valid method' );
        return;
      }

      // apply method, get return value
      var value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
    });

    return returnValue !== undefined ? returnValue : $elems;
  }

  function plainCall( $elems, options ) {
    $elems.each( function( i, elem ) {
      var instance = $.data( elem, namespace );
      if ( instance ) {
        // set options & init
        instance.option( options );
        instance._init();
      } else {
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
      }
    });
  }

  updateJQuery( $ );

}

// ----- updateJQuery ----- //

// set $.bridget for v1 backwards compatibility
function updateJQuery( $ ) {
  if ( !$ || ( $ && $.bridget ) ) {
    return;
  }
  $.bridget = jQueryBridget;
}

updateJQuery( jQuery || window.jQuery );

// -----  ----- //

return jQueryBridget;

}));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'get-size/get-size',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'desandro-matches-selector/matches-selector',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {



var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      /*nectar addition*/
      if(jQuery('body.compose-mode').length == 0) {
        return;
      }
      /*nectar addition end*/
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/cell',[
      'get-size/get-size'
    ], function( getSize ) {
      return factory( window, getSize );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory(
      window,
      window.getSize
    );
  }

}( window, function factory( window, getSize ) {



function Cell( elem, parent ) {
  this.element = elem;
  this.parent = parent;

  this.create();
}

var proto = Cell.prototype;

proto.create = function() {
  this.element.style.position = 'absolute';
  this.element.setAttribute( 'aria-selected', 'false' );
  this.x = 0;
  this.shift = 0;
};

proto.destroy = function() {
  // reset style
  this.element.style.position = '';
  var side = this.parent.originSide;
  this.element.removeAttribute('aria-selected');
  this.element.style[ side ] = '';
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.setPosition = function( x ) {
  this.x = x;
  this.updateTarget();
  this.renderPosition( x );
};

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function() {
  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
  this.target = this.x + this.size[ marginProperty ] +
    this.size.width * this.parent.cellAlign;
};

proto.renderPosition = function( x ) {
  // render position of cell with in slider
  var side = this.parent.originSide;
  this.element.style[ side ] = this.parent.getPositionValue( x );
};

/**
 * @param {Integer} factor - 0, 1, or -1
**/
proto.wrapShift = function( shift ) {
  this.shift = shift;
  this.renderPosition( this.x + this.parent.slideableWidth * shift );
};

proto.remove = function() {
  this.element.parentNode.removeChild( this.element );
};

return Cell;

}));

// slide
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/slide',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( window, function factory() {
'use strict';

function Slide( parent ) {
  this.parent = parent;
  this.isOriginLeft = parent.originSide == 'left';
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

var proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length == 1 ) {
    this.x = cell.x; // x comes from first cell
    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
    this.firstMargin = cell.size[ beginMargin ];
  }
};

proto.updateTarget = function() {
  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
  var lastCell = this.getLastCell();
  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.changeSelected( true );
};

proto.unselect = function() {
  this.changeSelected( false );
};

proto.changeSelected = function( isSelected ) {
  var classMethod = isSelected ? 'add' : 'remove';
  this.cells.forEach( function( cell ) {
    cell.element.classList[ classMethod ]('is-selected');
    cell.element.setAttribute( 'aria-selected', isSelected.toString() );
  });
};

proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

return Slide;

}));

// animate
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/animate',[
      'fizzy-ui-utils/utils'
    ], function( utils ) {
      return factory( window, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory(
      window,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, utils ) {



// -------------------------- animate -------------------------- //

var proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) {
    return;
  }

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  var previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) {
    var _this = this;
    requestAnimationFrame( function animateFrame() {
      _this.animate();
    });
  }
};

proto.positionSlider = function() {
  var x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) {
    x = utils.modulo( x, this.slideableWidth );
    x = x - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  x = x + this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft ? -x : x;
  var value = this.getPositionValue( x );
  // use 3D tranforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = this.isAnimating ?
    'translate3d(' + value + ',0,0)' : 'translateX(' + value + ')';

  // scroll event
  var firstSlide = this.slides[0];
  if ( firstSlide ) {
    var positionX = -this.x - firstSlide.target;
    var progress = positionX / this.slidesWidth;
    this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
  }
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) {
    return;
  }
  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';
  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) {
    this.restingFrames++;
  }
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  var beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    var cellShift = gap > 0 ? shift : 0;
    cell.wrapShift( cellShift );
    gap -= cell.size.outerWidth;
  }
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) {
    return;
  }
  for ( var i=0; i < cells.length; i++ ) {
    cells[i].wrapShift( 0 );
  }
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isDraggable || !this.isPointerDown ) {
    return;
  }
  // change the position to drag position by applying force
  var dragVelocity = this.dragX - this.x;
  var dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no slides
  var dragDown = this.isDraggable && this.isPointerDown;
  if ( dragDown || this.isFreeScrolling || !this.slides.length ) {
    return;
  }
  var distance = this.selectedSlide.target * -1 - this.x;
  var force = distance * this.options.selectedAttraction;
  this.applyForce( force );
};

return proto;

}));

// Flickity main
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/flickity',[
      'ev-emitter/ev-emitter',
      'get-size/get-size',
      'fizzy-ui-utils/utils',
      './cell',
      './slide',
      './animate'
    ], function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
      return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./cell'),
      require('./slide'),
      require('./animate')
    );
  } else {
    // browser global
    var _Flickity = window.Flickity;

    window.Flickity = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      _Flickity.Cell,
      _Flickity.Slide,
      _Flickity.animatePrototype
    );
  }

}( window, function factory( window, EvEmitter, getSize,
  utils, Cell, Slide, animatePrototype ) {



// vars
var jQuery = window.jQuery;
var getComputedStyle = window.getComputedStyle;
var console = window.console;

function moveElements( elems, toElem ) {
  elems = utils.makeArray( elems );
  while ( elems.length ) {
    toElem.appendChild( elems.shift() );
  }
}

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Flickity intances
var instances = {};

function Flickity( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) {
    var instance = instances[ this.element.flickityGUID ];
    instance.option( options );
    return instance;
  }

  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }
  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // kick things off
  this._create();
}

Flickity.defaults = {
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true
  // watchCSS: false,
  // wrapAround: false
};

// hash of methods triggered on _create()
Flickity.createMethods = [];

var proto = Flickity.prototype;
// inherit EventEmitter
utils.extend( proto, EvEmitter.prototype );

proto._create = function() {
  // add id for Flickity.data
  var id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.originSide = this.options.rightToLeft ? 'right' : 'left';
  // create viewport & slider
  /*nectar addition*/

  if(this.$element.hasClass('generate-markup')) {
    this.viewport = document.createElement('div');
    this.viewport.className = 'flickity-viewport';
  } else {
    this.viewport = this.$element.find('.flickity-viewport')[0];
    this.slider = this.$element.find('.flickity-slider')[0];
    this.viewport.className = 'flickity-viewport';
  }

  this._createSlider();


  /*nectar addition end*/

  if ( this.options.resize || this.options.watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  // add listeners from on option
  for ( var eventName in this.options.on ) {
    var listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  }

  Flickity.createMethods.forEach( function( method ) {
    this[ method ]();
  }, this );

  if ( this.options.watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }

};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) {
    return;
  }
  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  var cellElems = this._filterFindCellElements( this.element.children );

  /* nectar addition */
  if(this.$element.hasClass('generate-markup')) {
    moveElements( cellElems, this.slider );
    this.viewport.appendChild( this.slider );
    this.element.appendChild( this.viewport );
  } else {
    //do nothing
  }
  /* nectar addition  end */

  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');

  var index;
  var initialIndex = this.options.initialIndex;
  if ( this.isInitActivated ) {
    index = this.selectedIndex;
  } else if ( initialIndex !== undefined ) {
    index = this.cells[ initialIndex ] ? initialIndex : 0;
  } else {
    index = 0;
  }
  // select instantly
  this.select( index, false, true );
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
};

// slider positions the cells
/* nectar addition */
proto._createSlider = function() {
  if(this.$element.hasClass('generate-markup')) {
    var slider = document.createElement('div');
    slider.className = 'flickity-slider';
    slider.style[ this.originSide ] = 0;
    this.slider = slider;
  } else {
    // slider element does all the positioning
    //var slider = document.createElement('div');
    //slider.className = 'flickity-slider';
    this.slider.style[ this.originSide ] = 0;
  //  this.slider = slider;
  }

};
/* nectar addition end */

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  /* nectar addition */

  if(jQuery(this.slider).parent().parent().find('.flickity-page-dots').length > 0) {
    var $that = this;
    setTimeout(function(){
      $that.pageDots.setDots();
    },100);
  }
  var slidesArr = [];
  jQuery(this.slider).find('> *').each(function(i){
    slidesArr[i] = jQuery(this)[0];
  });


  // collection of item elements
    this.cells = this._makeCells(slidesArr);
    /* nectar addition end */
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) {
  var cellElems = this._filterFindCellElements( elems );

  // create new Flickity for collection
  var cells = cellElems.map( function( cellElem ) {
    return new Cell( cellElem, this );
  }, this );

  return cells;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.getLastSlide = function() {
  return this.slides[ this.slides.length - 1 ];
};

// positions all cells
proto.positionCells = function() {
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
};

/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */
proto._positionCells = function( index ) {
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  var cellX = 0;
  // get cellX
  if ( index > 0 ) {
    var startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  }
  var len = this.cells.length;
  for ( var i=index; i < len; i++ ) {
    var cell = this.cells[i];
    cell.setPosition( cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  }
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
};

/**
 * cell.getSize() on multiple cells
 * @param {Array} cells
 */
proto._sizeCells = function( cells ) {
  cells.forEach( function( cell ) {
    cell.getSize();
  });
};

// --------------------------  -------------------------- //

proto.updateSlides = function() {
  this.slides = [];
  if ( !this.cells.length ) {
    return;
  }

  var slide = new Slide( this );
  this.slides.push( slide );
  var isOriginLeft = this.originSide == 'left';
  var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

  var canCellFit = this._getCanCellFit();

  this.cells.forEach( function( cell, i ) {
    // just add cell if first cell in slide
    if ( !slide.cells.length ) {
      slide.addCell( cell );
      return;
    }

    var slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ nextMargin ] );

    if ( canCellFit.call( this, i, slideWidth ) ) {
      slide.addCell( cell );
    } else {
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( this );
      this.slides.push( slide );
      slide.addCell( cell );
    }
  }, this );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
};

proto._getCanCellFit = function() {
  var groupCells = this.options.groupCells;
  if ( !groupCells ) {
    return function() {
      return false;
    };
  } else if ( typeof groupCells == 'number' ) {
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    var number = parseInt( groupCells, 10 );
    return function( i ) {
      return ( i % number ) !== 0;
    };
  }
  // default, group by width of slide
  // parse '75%
  var percentMatch = typeof groupCells == 'string' &&
    groupCells.match(/^(\d+)%$/);
  var percent = percentMatch ? parseInt( percentMatch[1], 10 ) / 100 : 1;
  return function( i, slideWidth ) {
    return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
  };
};

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() {
  this.positionCells();
  this.positionSliderAtSelected();
};

proto.getSize = function() {
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
};

var cellAlignShorthands = {
  // cell align, then based on origin side
  center: {
    left: 0.5,
    right: 0.5
  },
  left: {
    left: 0,
    right: 1
  },
  right: {
    right: 0,
    left: 1
  }
};

proto.setCellAlign = function() {
  var shorthand = cellAlignShorthands[ this.options.cellAlign ];
  this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
};

proto.setGallerySize = function() {
  if ( this.options.setGallerySize ) {
    var height = this.options.adaptiveHeight && this.selectedSlide ?
      this.selectedSlide.height : this.maxCellHeight;
    this.viewport.style.height = height + 'px';
  }
};

proto._getWrapShiftCells = function() {
  // only for wrap-around
  if ( !this.options.wrapAround ) {
    return;
  }
  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  var gapX = this.cursorPosition;
  var cellIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  gapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
};

proto._getGapCells = function( gapX, cellIndex, increment ) {
  // keep adding cells until the cover the initial gap
  var cells = [];
  while ( gapX > 0 ) {
    var cell = this.cells[ cellIndex ];
    if ( !cell ) {
      break;
    }
    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  }
  return cells;
};

// ----- contain ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() {
  if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) {
    return;
  }
  var isRightToLeft = this.options.rightToLeft;
  var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
  var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
  var contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
  // content is less than gallery size
  var isContentSmaller = contentWidth < this.size.innerWidth;
  // bounds
  var beginBound = this.cursorPosition + this.cells[0].size[ beginMargin ];
  var endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
  // contain each cell target
  this.slides.forEach( function( slide ) {
    if ( isContentSmaller ) {
      // all cells fit inside gallery
      slide.target = contentWidth * this.cellAlign;
    } else {
      // contain to bounds
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
    }
  }, this );
};

// -----  ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) {
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    var $event = type;
    if ( event ) {
      // create jQuery event
      var jQEvent = jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
    }
    this.$element.trigger( $event, args );
  }
};

// -------------------------- select -------------------------- //

/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) {
  if ( !this.isActive ) {
    return;
  }
  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.options.wrapAround || isWrap ) {
    index = utils.modulo( index, this.slides.length );
  }
  // bail if invalid index
  if ( !this.slides[ index ] ) {
    return;
  }
  var prevIndex = this.selectedIndex;
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) {
    this.positionSliderAtSelected();
  } else {
    this.startAnimation();
  }
  if ( this.options.adaptiveHeight ) {
    this.setGallerySize();
  }
  // events
  this.dispatchEvent( 'select', null, [ index ] );
  // change event if new index
  if ( index != prevIndex ) {
    this.dispatchEvent( 'change', null, [ index ] );
  }
  // old v1 event name, remove in v3
  this.dispatchEvent('cellSelect');
};

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) {
  var len = this.slides.length;
  var isWrapping = this.options.wrapAround && len > 1;
  if ( !isWrapping ) {
    return index;
  }
  var wrapIndex = utils.modulo( index, len );
  // go to shortest
  var delta = Math.abs( wrapIndex - this.selectedIndex );
  var backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
  var forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
  if ( !this.isDragSelect && backWrapDelta < delta ) {
    index += len;
  } else if ( !this.isDragSelect && forewardWrapDelta < delta ) {
    index -= len;
  }
  // wrap position so slider is within normal area
  if ( index < 0 ) {
    this.x -= this.slideableWidth;
  } else if ( index >= len ) {
    this.x += this.slideableWidth;
  }
};

proto.previous = function( isWrap, isInstant ) {
  this.select( this.selectedIndex - 1, isWrap, isInstant );
};

proto.next = function( isWrap, isInstant ) {
  this.select( this.selectedIndex + 1, isWrap, isInstant );
};

proto.updateSelectedSlide = function() {
  var slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) {
    return;
  }
  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  // Remove in v3?
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
};

proto.unselectSelectedSlide = function() {
  if ( this.selectedSlide ) {
    this.selectedSlide.unselect();
  }
};

/**
 * select slide from number or cell element
 * @param {Element or Number} elem
 */
proto.selectCell = function( value, isWrap, isInstant ) {
  // get cell
  var cell = this.queryCell( value );
  if ( !cell ) {
    return;
  }

  var index = this.getCellSlideIndex( cell );
  this.select( index, isWrap, isInstant );
};

proto.getCellSlideIndex = function( cell ) {
  // get index of slides that has cell
  for ( var i=0; i < this.slides.length; i++ ) {
    var slide = this.slides[i];
    var index = slide.cells.indexOf( cell );
    if ( index != -1 ) {
      return i;
    }
  }
};

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem
 * @returns {Flickity.Cell} item
 */
proto.getCell = function( elem ) {
  // loop through cells to get the one that matches
  for ( var i=0; i < this.cells.length; i++ ) {
    var cell = this.cells[i];
    if ( cell.element == elem ) {
      return cell;
    }
  }
};

/**
 * get collection of Flickity.Cells, given Elements
 * @param {Element, Array, NodeList} elems
 * @returns {Array} cells - Flickity.Cells
 */
proto.getCells = function( elems ) {
  elems = utils.makeArray( elems );
  var cells = [];
  elems.forEach( function( elem ) {
    var cell = this.getCell( elem );
    if ( cell ) {
      cells.push( cell );
    }
  }, this );
  return cells;
};

/**
 * get cell elements
 * @returns {Array} cellElems
 */
proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

/**
 * get parent cell from an element
 * @param {Element} elem
 * @returns {Flickit.Cell} cell
 */
proto.getParentCell = function( elem ) {
  // first check if elem is cell
  var cell = this.getCell( elem );
  if ( cell ) {
    return cell;
  }
  // try to get parent cell elem
  elem = utils.getParent( elem, '.flickity-slider > *' );
  return this.getCell( elem );
};

/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) {
  if ( !adjCount ) {
    return this.selectedSlide.getCellElements();
  }
  index = index === undefined ? this.selectedIndex : index;

  var len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) {
    return this.getCellElements();
  }

  var cellElems = [];
  for ( var i = index - adjCount; i <= index + adjCount ; i++ ) {
    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
    var slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

/**
 * select slide from number or cell element
 * @param {Element, Selector String, or Number} selector
 */
proto.queryCell = function( selector ) {
  if ( typeof selector == 'number' ) {
    // use number as index
    return this.cells[ selector ];
  }
  if ( typeof selector == 'string' ) {
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  }
  // get cell from element
  return this.getCell( selector );
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

proto.childUIPointerDown = function( event ) {
  this.emitEvent( 'childUIPointerDown', [ event ] );
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  if ( !this.isActive ) {
    return;
  }
  this.getSize();
  // wrap values
  if ( this.options.wrapAround ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  var selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  var watchOption = this.options.watchCSS;
  if ( !watchOption ) {
    return;
  }

  var afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.indexOf('flickity') != -1 ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  // only work if element is in focus
  var isNotFocused = document.activeElement && document.activeElement != this.element;
  if ( !this.options.accessibility ||isNotFocused ) {
    return;
  }

  var handler = Flickity.keyboardHandlers[ event.keyCode ];
  if ( handler ) {
    handler.call( this );
  }
};

Flickity.keyboardHandlers = {
  // left arrow
  37: function() {
    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this.uiChange();
    this[ leftMethod ]();
  },
  // right arrow
  39: function() {
    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this.uiChange();
    this[ rightMethod ]();
  },
};

// ----- focus ----- //

proto.focus = function() {
  // TODO remove scrollTo once focus options gets more support
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
  var prevScrollY = window.pageYOffset;
  this.element.focus({ preventScroll: true });
  // hack to fix scroll jump after focus, #76
  if ( window.pageYOffset != prevScrollY && prevScrollY > 10 ) { // nectar addition - iframe fix
    window.scrollTo( window.pageXOffset, prevScrollY );
  }
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) {
    return;
  }
  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( function( cell ) {
    cell.destroy();
  });
  this.element.removeChild( this.viewport );
  // move child elements back into element
  moveElements( this.slider.children, this.element );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

utils.extend( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {Element} elem
 * @returns {Flickity}
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.flickityGUID;
  return id && instances[ id ];
};

utils.htmlInit( Flickity, 'flickity' );

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'flickity', Flickity );
}

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) {
  jQuery = jq;
};

Flickity.Cell = Cell;

return Flickity;

}));

/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'unipointer/unipointer',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {



function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd - remove if falsey
 */
proto._bindStartEvent = function( elem, isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

  // default to mouse events
  var startEvent = 'mousedown';
  if ( window.PointerEvent ) {
    // Pointer Events
    startEvent = 'pointerdown';
  } else if ( 'ontouchstart' in window ) {
    // Touch Events. iOS Safari
    startEvent = 'touchstart';
  }
  elem[ bindMethod ]( startEvent, this );
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss right click and other pointers
  // button = 0 is okay, 1-4 not
  if ( event.button || this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  this._pointerReset();
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto._pointerReset = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'unidragger/unidragger',[
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {



// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */
proto._bindHandles = function( isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = touchAction;
    }
  }
};

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }
  // track start event position
  this.pointerDownPointer = pointer;

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) {
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) {
    this._pointerReset();
  }
  return isOkay;
};

// kludge to blur previously focused input
proto.pointerDownBlur = function() {
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) {
    focused.blur();
  }
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

// drag
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/drag',[
      './flickity',
      'unidragger/unidragger',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unidragger, utils ) {
      return factory( window, Flickity, Unidragger, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unidragger'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.Unidragger,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unidragger, utils ) {



// ----- defaults ----- //

utils.extend( Flickity.defaults, {
  draggable: '>1',
  dragThreshold: 3,
});

// ----- create ----- //

Flickity.createMethods.push('_createDrag');

// -------------------------- drag prototype -------------------------- //

var proto = Flickity.prototype;
utils.extend( proto, Unidragger.prototype );
proto._touchActionValue = 'pan-y';

// --------------------------  -------------------------- //

var isTouch = 'createTouch' in document;
var isTouchmoveScrollCanceled = false;

proto._createDrag = function() {
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'childUIPointerDown', this._childUIPointerDownDrag );
  this.on( 'deactivate', this.onDeactivateDrag );
  this.on( 'cellChange', this.updateDraggable );
  // TODO updateDraggable on resize? if groupCells & slides change
  // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
  // #457, RubaXa/Sortable#973
  if ( isTouch && !isTouchmoveScrollCanceled ) {
    window.addEventListener( 'touchmove', function() {});
    isTouchmoveScrollCanceled = true;
  }
};

proto.onActivateDrag = function() {
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
};

proto.onDeactivateDrag = function() {
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
};

proto.updateDraggable = function() {
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable == '>1' ) {
    this.isDraggable = this.slides.length > 1;
  } else {
    this.isDraggable = this.options.draggable;
  }
  if ( this.isDraggable ) {
    this.element.classList.add('is-draggable');
  } else {
    this.element.classList.remove('is-draggable');
  }
};

// backwards compatibility
proto.bindDrag = function() {
  this.options.draggable = true;
  this.updateDraggable();
};

proto.unbindDrag = function() {
  this.options.draggable = false;
  this.updateDraggable();
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

proto._childUIPointerDownDrag = function( event ) {
  // allow focus & preventDefault even when not draggable
  // so child UI elements keep focus on carousel. #721
  event.preventDefault();
  this.pointerDownFocus( event );
};

// -------------------------- pointer events -------------------------- //

proto.pointerDown = function( event, pointer ) {
  if ( !this.isDraggable ) {
    this._pointerDownDefault( event, pointer );
    return;
  }
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }

  this._pointerDownPreventDefault( event );
  this.pointerDownFocus( event );
  // blur
  if ( document.activeElement != this.element ) {
    // do not blur if already focused
    this.pointerDownBlur();
  }

  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );

  this._pointerDownDefault( event, pointer );
};

// default pointerDown logic, used for staticClick
proto._pointerDownDefault = function( event, pointer ) {
  // track start event position
  this.pointerDownPointer = pointer;
  // bind move and end events
  this._bindPostStartEvents( event );
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

var focusNodes = {
  INPUT: true,
  TEXTAREA: true,
  SELECT: true,
};

proto.pointerDownFocus = function( event ) {
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isFocusNode ) {
    this.focus();
  }
};

proto._pointerDownPreventDefault = function( event ) {
  var isTouchStart = event.type == 'touchstart';
  var isTouchPointer = event.pointerType == 'touch';
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) {
    event.preventDefault();
  }
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.pointerUp = function( event, pointer ) {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

proto.pointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.dragStart = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  this.dragStartPosition = this.x;
  this.startAnimation();
  window.removeEventListener( 'scroll', this );
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
};

proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isDraggable ) {
    return;
  }
  event.preventDefault();

  // reverse if right-to-left
  var direction = this.options.rightToLeft ? -1 : 1;
  if ( this.options.wrapAround ) {
    // wrap around move. #589
    moveVector.x = moveVector.x % this.slideableWidth;
  }
  var dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.options.wrapAround && this.slides.length ) {
    // slow drag
    var originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    var endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  }

  // nectar addition ios13 bugfix
  if ( this.dragX !== dragX ) {
    this.previousDragX = this.dragX;
  }

  this.dragX = dragX;

  this.dragMoveTime = new Date();
  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

proto.dragEnd = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  if ( this.options.freeScroll ) {
    this.isFreeScrolling = true;
  }
  // set selectedIndex based on where flick will end up
  var index = this.dragEndRestingSelect();

  if ( this.options.freeScroll && !this.options.wrapAround ) {
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    var restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  } else if ( !this.options.freeScroll && index == this.selectedIndex ) {
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  }
  delete this.previousDragX;
  // apply selection
  // TODO refactor this, selecting here feels weird
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.options.wrapAround;
  this.select( index );
  delete this.isDragSelect;
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

proto.dragEndRestingSelect = function() {
  var restingX = this.getRestingPosition();
  // how far away from selected slide
  var distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  var positiveResting = this._getClosestResting( restingX, distance, 1 );
  var negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  var index = positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
  return index;
};

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */
proto._getClosestResting = function( restingX, distance, increment ) {
  var index = this.selectedIndex;
  var minDistance = Infinity;
  var condition = this.options.contain && !this.options.wrapAround ?
    // if contain, keep going if distance is equal to minDistance
    function( d, md ) { return d <= md; } : function( d, md ) { return d < md; };
  while ( condition( distance, minDistance ) ) {
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) {
      break;
    }
    distance = Math.abs( distance );
  }
  return {
    distance: minDistance,
    // selected was previous index
    index: index - increment
  };
};

/**
 * measure distance between x and a slide target
 * @param {Number} x
 * @param {Integer} index - slide index
 */
proto.getSlideDistance = function( x, index ) {
  var len = this.slides.length;
  // wrap around if at least 2 slides
  var isWrapAround = this.options.wrapAround && len > 1;
  var slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  var slide = this.slides[ slideIndex ];
  if ( !slide ) {
    return null;
  }
  // add distance for wrap-around slides
  var wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
  return x - ( slide.target + wrap );
};

proto.dragEndBoostSelect = function() {
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) {
    return 0;
  }

  var distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  var delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) {
    // boost to next if moving towards the right, and positive velocity
    return 1;
  } else if ( distance < 0 && delta < 0 ) {
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  }
  return 0;
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  // get clickedCell, if cell was clicked
  var clickedCell = this.getParentCell( event.target );
  var cellElem = clickedCell && clickedCell.element;
  var cellIndex = clickedCell && this.cells.indexOf( clickedCell );
  this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
};

// ----- scroll ----- //

proto.onscroll = function() {
  var scroll = getScrollPosition();
  var scrollMoveX = this.pointerDownScroll.x - scroll.x;
  var scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
    this._pointerDone();
  }
};

// ----- utils ----- //

function getScrollPosition() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}

// -----  ----- //

return Flickity;

}));

/*!
 * Tap listener v2.0.0
 * listens to taps
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false*/ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'tap-listener/tap-listener',[
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.TapListener = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {



// --------------------------  TapListener -------------------------- //

function TapListener( elem ) {
  this.bindTap( elem );
}

// inherit Unipointer & EventEmitter
var proto = TapListener.prototype = Object.create( Unipointer.prototype );

/**
 * bind tap event to element
 * @param {Element} elem
 */
proto.bindTap = function( elem ) {
  if ( !elem ) {
    return;
  }
  this.unbindTap();
  this.tapElement = elem;
  this._bindStartEvent( elem, true );
};

proto.unbindTap = function() {
  if ( !this.tapElement ) {
    return;
  }
  this._bindStartEvent( this.tapElement, true );
  delete this.tapElement;
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  var pointerPoint = Unipointer.getPointerPoint( pointer );
  var boundingRect = this.tapElement.getBoundingClientRect();
  var scrollX = window.pageXOffset;
  var scrollY = window.pageYOffset;
  // calculate if pointer is inside tapElement
  var isInside = pointerPoint.x >= boundingRect.left + scrollX &&
    pointerPoint.x <= boundingRect.right + scrollX &&
    pointerPoint.y >= boundingRect.top + scrollY &&
    pointerPoint.y <= boundingRect.bottom + scrollY;
  // trigger callback if pointer is inside element
  if ( isInside ) {
    this.emitEvent( 'tap', [ event, pointer ] );
  }

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    var _this = this;
    setTimeout( function() {
      delete _this.isIgnoringMouseUp;
    }, 400 );
  }
};

proto.destroy = function() {
  this.pointerDone();
  this.unbindTap();
};

// -----  ----- //

return TapListener;

}));

// prev/next buttons
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/prev-next-button',[
      './flickity',
      'tap-listener/tap-listener',
      'fizzy-ui-utils/utils'
    ], function( Flickity, TapListener, utils ) {
      return factory( window, Flickity, TapListener, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('tap-listener'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.TapListener,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, TapListener, utils ) {
'use strict';

var svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( direction, parent ) {
  this.direction = direction;
  this.parent = parent;
  this._create();
}

PrevNextButton.prototype = Object.create( TapListener.prototype );

PrevNextButton.prototype._create = function() {
  // properties
  this.isEnabled = true;
  this.isPrevious = this.direction == -1;
  var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
  this.isLeft = this.direction == leftDirection;

  var element = this.element = document.createElement('button');
  element.className = 'flickity-button flickity-prev-next-button';
  element.className += this.isPrevious ? ' previous' : ' next';
  // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  // init as disabled
  this.disable();

  element.setAttribute( 'aria-label', this.isPrevious ? 'Previous' : 'Next' );

  // create arrow
  var svg = this.createSVG();
  element.appendChild( svg );
  // events
  this.on( 'tap', this.onTap );
  this.parent.on( 'select', this.update.bind( this ) );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PrevNextButton.prototype.activate = function() {
  this.bindTap( this.element );
  // click events from keyboard
  this.element.addEventListener( 'click', this );
  // add to DOM
  this.parent.element.appendChild( this.element );
};

PrevNextButton.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.element );
  // do regular TapListener destroy
  TapListener.prototype.destroy.call( this );
  // click events from keyboard
  this.element.removeEventListener( 'click', this );
};

PrevNextButton.prototype.createSVG = function() {
  var svg = document.createElementNS( svgURI, 'svg');
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  var path = document.createElementNS( svgURI, 'path');
  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
  }
  svg.appendChild( path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) {
    return shape;
  }
  // create movement string
  return 'M ' + shape.x0 + ',50' +
    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
    ' L ' + shape.x3 + ',50 ' +
    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
    ' Z';
}

PrevNextButton.prototype.onTap = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.parent.uiChange();
  var method = this.isPrevious ? 'previous' : 'next';
  this.parent[ method ]();
};

PrevNextButton.prototype.handleEvent = utils.handleEvent;

PrevNextButton.prototype.onclick = function( event ) {
  // only allow clicks from keyboard
  var focused = document.activeElement;
  if ( focused && focused == this.element ) {
    this.onTap( event, event );
  }
};

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  if ( this.isEnabled ) {
    return;
  }
  this.element.disabled = false;
  this.isEnabled = true;
};

PrevNextButton.prototype.disable = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.element.disabled = true;
  this.isEnabled = false;
};

PrevNextButton.prototype.update = function() {
  // index of first or last slide, if previous or next
  var slides = this.parent.slides;
  // enable is wrapAround and at least 2 slides
  if ( this.parent.options.wrapAround && slides.length > 1 ) {
    this.enable();
    return;
  }
  var lastIndex = slides.length ? slides.length - 1 : 0;
  var boundIndex = this.isPrevious ? 0 : lastIndex;
  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
  this[ method ]();
};

PrevNextButton.prototype.destroy = function() {
  this.deactivate();
};

// -------------------------- Flickity prototype -------------------------- //

utils.extend( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  }
});

Flickity.createMethods.push('_createPrevNextButtons');
var proto = Flickity.prototype;

proto._createPrevNextButtons = function() {
  if ( !this.options.prevNextButtons ) {
    return;
  }

  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );

  this.on( 'activate', this.activatePrevNextButtons );
};

proto.activatePrevNextButtons = function() {
  this.prevButton.activate();
  this.nextButton.activate();
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.deactivate();
  this.nextButton.deactivate();
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

}));

// page dots
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/page-dots',[
      './flickity',
      'tap-listener/tap-listener',
      'fizzy-ui-utils/utils'
    ], function( Flickity, TapListener, utils ) {
      return factory( window, Flickity, TapListener, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('tap-listener'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.TapListener,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, TapListener, utils ) {

// -------------------------- PageDots -------------------------- //



function PageDots( parent ) {
  this.parent = parent;
  this._create();
}

PageDots.prototype = new TapListener();

PageDots.prototype._create = function() {
  // create holder element
  this.holder = document.createElement('ol');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
  // events
  this.on( 'tap', this.onTap );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PageDots.prototype.activate = function() {
  this.setDots();
  this.bindTap( this.holder );
  // add to DOM
  this.parent.element.appendChild( this.holder );
};

PageDots.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.holder );
  TapListener.prototype.destroy.call( this );
};

PageDots.prototype.setDots = function() {
  // get difference between number of slides and number of dots
  var delta = this.parent.slides.length - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  var fragment = document.createDocumentFragment();
  var newDots = [];
  var length = this.dots.length;
  var max = length + count;

  for ( var i = length; i < max; i++ ) {
    var dot = document.createElement('li');
    dot.className = 'dot';
    dot.setAttribute( 'aria-label', 'Page dot ' + ( i + 1 ) );
    fragment.appendChild( dot );
    newDots.push( dot );
  }

  this.holder.appendChild( fragment );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  var removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( function( dot ) {
    this.holder.removeChild( dot );
  }, this );
};

PageDots.prototype.updateSelected = function() {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.className = 'dot';
    this.selectedDot.removeAttribute('aria-current');
  }
  // don't proceed if no dots
  if ( !this.dots.length ) {
    return;
  }
  this.selectedDot = this.dots[ this.parent.selectedIndex ];
  this.selectedDot.className = 'dot is-selected';
  this.selectedDot.setAttribute( 'aria-current', 'step' );
};

PageDots.prototype.onTap = function( event ) {
  var target = event.target;
  // only care about dot clicks
  if ( target.nodeName != 'LI' ) {
    return;
  }

  this.parent.uiChange();
  var index = this.dots.indexOf( target );
  this.parent.select( index );
};

PageDots.prototype.destroy = function() {
  this.deactivate();
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pageDots: true
});

Flickity.createMethods.push('_createPageDots');

var proto = Flickity.prototype;

proto._createPageDots = function() {
  if ( !this.options.pageDots ) {
    return;
  }
  this.pageDots = new PageDots( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

proto.activatePageDots = function() {
  this.pageDots.activate();
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected();
};

proto.updatePageDots = function() {
  this.pageDots.setDots();
};

proto.deactivatePageDots = function() {
  this.pageDots.deactivate();
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

}));

// player & autoPlay
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/player',[
      'ev-emitter/ev-emitter',
      'fizzy-ui-utils/utils',
      './flickity'
    ], function( EvEmitter, utils, Flickity ) {
      return factory( EvEmitter, utils, Flickity );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('ev-emitter'),
      require('fizzy-ui-utils'),
      require('./flickity')
    );
  } else {
    // browser global
    factory(
      window.EvEmitter,
      window.fizzyUIUtils,
      window.Flickity
    );
  }

}( window, function factory( EvEmitter, utils, Flickity ) {



// -------------------------- Player -------------------------- //

function Player( parent ) {
  this.parent = parent;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
}

Player.prototype = Object.create( EvEmitter.prototype );

// start play
Player.prototype.play = function() {
  if ( this.state == 'playing' ) {
    return;
  }
  // do not play if page is hidden, start playing when page is visible
  var isPageHidden = document.hidden;
  if ( isPageHidden ) {
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state != 'playing' ) {
    return;
  }

  var time = this.parent.options.autoPlay;
  // default to 3 seconds
  time = typeof time == 'number' ? time : 3000;
  var _this = this;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( function() {
    _this.parent.next( true );
    _this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state == 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state == 'paused' ) {
    this.play();
  }
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  var isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pauseAutoPlayOnHover: true
});

Flickity.createMethods.push('_createPlayer');
var proto = Flickity.prototype;

proto._createPlayer = function() {
  this.player = new Player( this );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) {
    return;
  }
  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) {
    return;
  }
  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

}));

// add, remove cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/add-remove-cell',[
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {



// append cells to a document fragment
function getCellsFragment( cells ) {
  var fragment = document.createDocumentFragment();
  cells.forEach( function( cell ) {
    fragment.appendChild( cell.element );
  });
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

var proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {Element, Array, NodeList} elems
 * @param {Integer} index
 */
proto.insert = function( elems, index ) {
  var cells = this._makeCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }
  var len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  var fragment = getCellsFragment( cells );
  // append to slider
  var isAppend = index == len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    var insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    var endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );
  this.cellChange( index, true );
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {Element, Array, NodeList} elems
 */
proto.remove = function( elems ) {
  var cells = this.getCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }

  var minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( function( cell ) {
    cell.remove();
    var index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
  }, this );

  this.cellChange( minCellIndex, true );
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  var cell = this.getCell( elem );
  if ( !cell ) {
    return;
  }
  cell.getSize();

  var index = this.cells.indexOf( cell );
  this.cellChange( index );
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
  var prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._getWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex
  // try to maintain position & select previous selected element
  var cell = this.getCell( prevSelectedElem );
  if ( cell ) {
    this.selectedIndex = this.getCellSlideIndex( cell );
  }
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
  // do not position slider after lazy load
  if ( isPositioningSlider ) {
    this.positionSliderAtSelected();
  }
};

// -----  ----- //

return Flickity;

}));

// lazyload
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/lazyload',[
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {
'use strict';

Flickity.createMethods.push('_createLazyload');
var proto = Flickity.prototype;

proto._createLazyload = function() {
  this.on( 'select', this.lazyLoad );
};

proto.lazyLoad = function() {
  var lazyLoad = this.options.lazyLoad;
  if ( !lazyLoad ) {
    return;
  }
  // get adjacent cells, use lazyLoad option for adjacent count
  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  var cellElems = this.getAdjacentCellElements( adjCount );
  // get lazy images in those cells
  var lazyImages = [];
  cellElems.forEach( function( cellElem ) {
    var lazyCellImages = getCellLazyImages( cellElem );
    lazyImages = lazyImages.concat( lazyCellImages );
  });
  // load lazy images
  lazyImages.forEach( function( img ) {
    new LazyLoader( img, this );
  }, this );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.nodeName == 'IMG' ) {
    var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
    var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
    var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
    if ( lazyloadAttr || srcAttr || srcsetAttr ) {
      return [ cellElem ];
    }
  }
  // select lazy images in cell
  var lazySelector = 'img[data-flickity-lazyload], ' +
    'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
  var imgs = cellElem.querySelectorAll( lazySelector );
  return utils.makeArray( imgs );
}

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 */
function LazyLoader( img, flickity ) {
  this.img = img;
  this.flickity = flickity;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  var src = this.img.getAttribute('data-flickity-lazyload') ||
    this.img.getAttribute('data-flickity-lazyload-src');
  var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
  // set src & serset
  this.img.src = src;
  if ( srcset ) {
    this.img.setAttribute( 'srcset', srcset );
  }
  // remove attr
  this.img.removeAttribute('data-flickity-lazyload');
  this.img.removeAttribute('data-flickity-lazyload-src');
  this.img.removeAttribute('data-flickity-lazyload-srcset');
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );

  var cell = this.flickity.getParentCell( this.img );
  var cellElem = cell && cell.element;
  this.flickity.cellSizeChange( cellElem );

  this.img.classList.add( className );
  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

}));

/*!
 * Flickity v2.1.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/index',[
      './flickity',
      './drag',
      './prev-next-button',
      './page-dots',
      './player',
      './add-remove-cell',
      './lazyload'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('./flickity'),
      require('./drag'),
      require('./prev-next-button'),
      require('./page-dots'),
      require('./player'),
      require('./add-remove-cell'),
      require('./lazyload')
    );
  }

})( window, function factory( Flickity ) {
  /*jshint strict: false*/
  return Flickity;
});

/*!
 * Flickity asNavFor v2.0.1
 * enable asNavFor for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity-as-nav-for/as-nav-for',[
      'flickity/js/index',
      'fizzy-ui-utils/utils'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( Flickity, utils ) {



// -------------------------- asNavFor prototype -------------------------- //

// Flickity.defaults.asNavFor = null;

Flickity.createMethods.push('_createAsNavFor');

var proto = Flickity.prototype;

proto._createAsNavFor = function() {
  this.on( 'activate', this.activateAsNavFor );
  this.on( 'deactivate', this.deactivateAsNavFor );
  this.on( 'destroy', this.destroyAsNavFor );

  var asNavForOption = this.options.asNavFor;
  if ( !asNavForOption ) {
    return;
  }
  // HACK do async, give time for other flickity to be initalized
  var _this = this;
  setTimeout( function initNavCompanion() {
    _this.setNavCompanion( asNavForOption );
  });
};

proto.setNavCompanion = function( elem ) {
  elem = utils.getQueryElement( elem );
  var companion = Flickity.data( elem );
  // stop if no companion or companion is self
  if ( !companion || companion == this ) {
    return;
  }

  this.navCompanion = companion;
  // companion select
  var _this = this;
  this.onNavCompanionSelect = function() {
    _this.navCompanionSelect();
  };
  companion.on( 'select', this.onNavCompanionSelect );
  // click
  this.on( 'staticClick', this.onNavStaticClick );

  this.navCompanionSelect( true );
};

proto.navCompanionSelect = function( isInstant ) {
  if ( !this.navCompanion ) {
    return;
  }
  // select slide that matches first cell of slide
  var selectedCell = this.navCompanion.selectedCells[0];
  var firstIndex = this.navCompanion.cells.indexOf( selectedCell );
  var lastIndex = firstIndex + this.navCompanion.selectedCells.length - 1;
  var selectIndex = Math.floor( lerp( firstIndex, lastIndex,
    this.navCompanion.cellAlign ) );
  this.selectCell( selectIndex, false, isInstant );
  // set nav selected class
  this.removeNavSelectedElements();
  // stop if companion has more cells than this one
  if ( selectIndex >= this.cells.length ) {
    return;
  }

  var selectedCells = this.cells.slice( firstIndex, lastIndex + 1 );
  this.navSelectedElements = selectedCells.map( function( cell ) {
    return cell.element;
  });
  this.changeNavSelectedClass('add');
};

function lerp( a, b, t ) {
  return ( b - a ) * t + a;
}

proto.changeNavSelectedClass = function( method ) {
  this.navSelectedElements.forEach( function( navElem ) {
    navElem.classList[ method ]('is-nav-selected');
  });
};

proto.activateAsNavFor = function() {
  this.navCompanionSelect( true );
};

proto.removeNavSelectedElements = function() {
  if ( !this.navSelectedElements ) {
    return;
  }
  this.changeNavSelectedClass('remove');
  delete this.navSelectedElements;
};

proto.onNavStaticClick = function( event, pointer, cellElement, cellIndex ) {
  if ( typeof cellIndex == 'number' ) {
    this.navCompanion.selectCell( cellIndex );
  }
};

proto.deactivateAsNavFor = function() {
  this.removeNavSelectedElements();
};

proto.destroyAsNavFor = function() {
  if ( !this.navCompanion ) {
    return;
  }
  this.navCompanion.off( 'select', this.onNavCompanionSelect );
  this.off( 'staticClick', this.onNavStaticClick );
  delete this.navCompanion;
};

// -----  ----- //

return Flickity;

}));

/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'imagesloaded/imagesloaded',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {



var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});

/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
      'imagesloaded/imagesloaded'
    ], function( Flickity, imagesLoaded ) {
      return factory( window, Flickity, imagesLoaded );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('flickity'),
      require('imagesloaded')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.imagesLoaded
    );
  }

}( window, function factory( window, Flickity, imagesLoaded ) {
'use strict';

Flickity.createMethods.push('_createImagesLoaded');

var proto = Flickity.prototype;

proto._createImagesLoaded = function() {
  this.on( 'activate', this.imagesLoaded );
};

proto.imagesLoaded = function() {
  if ( !this.options.imagesLoaded ) {
    return;
  }
  var _this = this;
  function onImagesLoadedProgress( instance, image ) {
    var cell = _this.getParentCell( image.img );
    _this.cellSizeChange( cell && cell.element );
    if ( !_this.options.freeScroll ) {
      _this.positionSliderAtSelected();
    }
  }
  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
};

return Flickity;

}));

/*
 * jQuery Superfish Menu Plugin - v1.7.4
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

;(function ($) {
	"use strict";


	$(window).on('resize',function(){
		$('.sf-menu ul.tracked-pos').removeClass('tracked-pos');
	});

	var methods = (function () {
		// private properties and methods go here
		var c = {
				bcClass: 'sf-breadcrumb',
				menuClass: 'sf-js-enabled',
				anchorClass: 'sf-with-ul',
				menuArrowClass: 'sf-arrows'
			},
			ios = (function () {
				var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
				if (ios) {
					// tap anywhere on iOS to unfocus a submenu
					$('html').css('cursor', 'pointer').on('click', $.noop);
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function () {
							return ($(this).children(o.popUpSelector).hide().show().length);
						}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var touchAction = $menu.css('ms-touch-action');
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css('ms-touch-action', touchAction);
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				}
				else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			},
			touchHandler = function (e) {
				var $this = $(this),
					$ul = $this.siblings(e.data.popUpSelector);

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);

				if($(this).parents('.megamenu').length > 0) return;

				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}

					if($(this).hasClass('menu-item-over') && $(this).hasClass('megamenu')) {
						return true;
					}

					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;
					o.onBeforeHide.call($ul);

					if(o.dropdownStyle == 'minimal') {
						var $this = $(this);
						o.onHide.call($this);
					} else {

						$ul.stop(true, true).animate(o.animationOut, speed, function () {
							var $this = $(this);
							o.onHide.call($this);
						});
					}

					if($(this).parents('.megamenu').length > 0) return;

					//megamenu removes transparent option
					if($('#header-outer[data-megamenu-rt="1"]').length > 0 && $('#header-outer[data-transparent-header="true"]').length > 0) {

						if($('#header-outer.scrolled-down').length == 0 && $('#header-outer.small-nav').length == 0 && $('#header-outer.detached').length == 0 && $('#header-outer.fixed-menu').length == 0) {
							$('#header-outer').addClass('transparent');
						}
						if($('#header-outer[data-permanent-transparent="1"][data-transparent-header="true"]').length > 0) {
							$('#header-outer').addClass('transparent');
						}

					}
				}
				return this;
			},
			show: function () {

				if($(this).parents('.megamenu').length > 0) return;

				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);


				//megamenu removes transparent option
				if($('#header-outer[data-megamenu-rt="1"]').length > 0 &&
				   $(this).hasClass('megamenu') &&
					 !$(this).hasClass('width-75') &&
					 !$(this).hasClass('width-50') &&
					 $('#header-outer').attr('data-transparent-header') == 'true' ) {

					$('#header-outer').addClass('no-transition');
					$('#header-outer').removeClass('transparent');

				}

				o.onBeforeShow.call($ul);


				//make sure the ul has space
				if(!$ul.hasClass('tracked-pos') &&
					 !$($ul).parents('li').hasClass('megamenu') &&
				   !$($ul).parents('ul').hasClass('sub-menu') &&
					 $ul.offset() ) {

					$ul.addClass('temp-hidden-display');
					var docW = $("#top .container").width();
					var elm = $ul;
	        var off = elm.offset();
	        var l = off.left - ($(window).width() - docW)/2;
	        var w = elm.width();
					var isEntirelyVisible = (l+w <= $(window).width()-100);

	        if ( ! isEntirelyVisible ) {
	            $ul.parents('li').addClass('edge');
	        } else {
	            $ul.parents('li').removeClass('edge');
	        }

					$ul.removeClass('temp-hidden-display');

				}

				if(o.dropdownStyle == 'minimal') {
					o.onShow.call($ul);
				} else {
					$ul.stop(true, true).animate(o.animation, o.speed, function () {
						o.onShow.call($ul);
					});
				}

				//show on left class
				if( !$ul.hasClass('tracked-pos') ) {
					if( $ul.length > 0 && $ul.parents('.sub-menu').length > 0 && $ul.parents('.sf-menu').length > 0 ) {
						if($ul.offset().left + $ul.outerWidth() > $(window).width()) {
							$ul.addClass('on-left-side');
							$ul.find('ul').addClass('on-left-side');
						}
					}
				}

				$ul.addClass('tracked-pos');

				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' +  method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity: 'show'},
		animationOut: {opacity: 'hide'},
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop,
		dropdownStyle: ($('body[data-dropdown-style="minimal"]').length > 0) ? 'minimal' : 'classic'
	};

	// soon to be deprecated
	$.fn.extend({
		hideSuperfishUl: methods.hide,
		showSuperfishUl: methods.show
	});

})(jQuery);

/**
 * Main Salient script file.
 *
 * @package Salient
 * @author ThemeNectar
 */
 /* global jQuery */
 /* global Waypoint */
 /* global imagesLoaded */
 /* global Flickity */

(function($, window, document) {

	"use strict";

		// Theme vars.
		var $window                 = $(window),
		$body                       = $('body'),
		$offCanvasEl                = $('#slide-out-widget-area'),
		$offCanvasBG                = $('#slide-out-widget-area-bg'),
		$headerOuterEl              = $('#header-outer'),
		$headerSecondaryEl          = $('#header-secondary-outer'),
		$searchButtonEl             = $('#header-outer #search-btn a'),
		$wpAdminBar                 = $('#wpadminbar'),
		$loadingScreenEl            = $('#ajax-loading-screen'),
		$bodyBorderTop              = $('.body-border-top'),
		$pageHeaderBG               = $('#page-header-bg'),
		$footerOuterEl              = $('#footer-outer'),
		$bodyBorderWidth            = ($('.body-border-right').length > 0) ? $('.body-border-right').width() : 0,
		$logoHeight                 = ($headerOuterEl.is('[data-logo-height]')) ? parseInt($headerOuterEl.attr('data-logo-height')) : 30,
		headerPadding               = ($headerOuterEl.is('[data-padding]')) ? parseInt($headerOuterEl.attr('data-padding')) : 28,
		logoShrinkNum               = ($headerOuterEl.is('[data-shrink-num]')) ? $headerOuterEl.attr('data-shrink-num') : 6,
		condenseHeaderLayout        = ($headerOuterEl.is('[data-condense="true"]')) ? true : false,
		usingLogoImage              = ($headerOuterEl.is('[data-using-logo="1"]')) ? true : false,
		headerResize                = ($headerOuterEl.is('[data-header-resize="1"]')) ? true : false,
		headerTransparent           = ($headerOuterEl.is('[data-transparent-header="true"]')) ? true : false,
		headerMobileFixed           = ($headerOuterEl.is('[data-mobile-fixed="1"]')) ? true : false,
		headerLayoutFormat          = ($body.is('[data-header-format]')) ? $body.attr('data-header-format') : 'default',
		headerHideUntilNeeded       = ($body.is('[data-hhun]')) ? $body.attr('data-hhun') : '',
		$animationEasing            = ($body.is('[data-cae]') && $body.attr('data-cae') !== 'swing' ) ? $body.attr('data-cae') : 'easeOutCubic',
		$animationDuration          = ($body.is('[data-cad]')) ? $body.attr('data-cad') : '650',
		bypassAnimations            = (!$body.is('[data-m-animate="1"]') && navigator.userAgent.match(/(Android|iPod|iPhone|iPad|BlackBerry|IEMobile|Opera Mini)/) ) ? true : false,
		$portfolio_containers       = [],
		$svgIcons                   = [],
		$nectarCustomSliderRotate   = [],
		$flickitySliders            = [],
		flickityDragArr             = [],
		viewIndicatorArr            = [],
		iconMouseFollowArr          = [],
		postGridImgMouseFollowArr   = [],
		parallaxItemsArr            = [],
		$fsProjectSliderArr         = [],
		$wooFlickityCarousels       = [],
		$liquidBG_EL                = [],
		$testimonialSliders         = [],
		$mouseParallaxScenes        = [],
		$nectarMasonryBlogs         = [],
		$standAnimatedColTimeout    = [],
		$animatedSVGIconTimeout     = [],
		$projectCarouselSliderArr   = [],
		$nectarPostGridArr          = [],
		$verticalScrollingTabs      = [],
		$tabbedClickCount           = 0,
		$fullscreenSelector         = '',
		$fullscreenMarkupBool       = false,
		$bodyBorderHeaderColorMatch = false,
		nectarBoxRoll               = {
			animating: 'false',
			perspect: 'not-rolled'
		},
		$nectarFullPage             = {
			$usingFullScreenRows: false
		},
		$svgResizeTimeout,
		$bodyBorderSizeToRemove;

		if( $bodyBorderTop.length > 0 ) {

			if ( $bodyBorderTop.css('background-color') == '#ffffff' && $body.attr('data-header-color') == 'light' ||
				$bodyBorderTop.css('background-color') == 'rgb(255, 255, 255)' && $body.attr('data-header-color') == 'light' ||
				$bodyBorderTop.css('background-color') == $headerOuterEl.attr('data-user-set-bg')) {
				$bodyBorderHeaderColorMatch = true;
			}

		}


		/**
		* Nectar DOM info helper.
		*
		* @since 9.0
		*/
		var nectarDOMInfo = {

			usingMobileBrowser: (navigator.userAgent.match(/(Android|iPod|iPhone|iPad|BlackBerry|IEMobile|Opera Mini)/)) ? true : false,
			usingFrontEndEditor: (typeof window.vc_iframe === 'undefined') ? false : true,
			getWindowSize: function() {
				nectarDOMInfo.winH                  = window.innerHeight;
				nectarDOMInfo.winW                  = window.innerWidth;
				nectarDOMInfo.adminBarHeight        = ($wpAdminBar.length > 0) ? $wpAdminBar.height() : 0;
				nectarDOMInfo.secondaryHeaderHeight = ($headerSecondaryEl.length > 0 && $headerSecondaryEl.css('display') != 'none') ? $headerSecondaryEl.outerHeight() : 0;
				nectarDOMInfo.footerOuterHeight     = ($footerOuterEl.length > 0) ? $footerOuterEl.outerHeight() : 0;
			},
			scrollTop: 0,
			clientX: 0,
			clientY: 0,
			scrollPosMouse: function() {
				return window.scrollY || $window.scrollTop();
			},
			scrollPosRAF: function() {

				nectarDOMInfo.scrollTop = window.scrollY || $window.scrollTop();
				requestAnimationFrame(nectarDOMInfo.scrollPosRAF);
			},
			bindEvents: function() {

				if (!nectarDOMInfo.usingMobileBrowser) {

					$window.on('scroll', function() {
						nectarDOMInfo.scrollTop = nectarDOMInfo.scrollPosMouse();
					});
					document.addEventListener("mousemove", function(e) {
						nectarDOMInfo.clientX = e.clientX;
						nectarDOMInfo.clientY = e.clientY;
					});

				} else {
					requestAnimationFrame(nectarDOMInfo.scrollPosRAF);
				}

				$window.on('resize', nectarDOMInfo.getWindowSize);

			},
			init: function() {
				// Re-cache WP admin bar after DOM ready
				$wpAdminBar = $('#wpadminbar');

				// Get values and bind events
				this.getWindowSize();
				this.scrollTop = this.scrollPosMouse();
				this.bindEvents();

				this.usingFrontEndEditor = (typeof window.vc_iframe === 'undefined') ? false : true;
			}

		};
		window.nectarDOMInfo = nectarDOMInfo;


		/**
		* Nectar State.
		*
		* @since 13.0
		*/
		var nectarState = {
			materialOffCanvasOpen: false,
			materialSearchOpen: false,
			permanentTransHeader: ( $headerOuterEl.is('[data-permanent-transparent="1"]') ) ? true : false,
			animatedScrolling: false,
			preventScroll: false,
			mobileHeader: ''
		}


		/**
		* Debounced resize event
		*
		* @since 2.0
		*/

		function smartResizeInit() {
			fullWidthContentColumns();
			if (!nectarDOMInfo.usingMobileBrowser) {
				parallaxRowsBGCals();
			}
			headerSpace();
			OCM_overflowState();
			showOnLeftSubMenu();
			inlineMegaMenuPos();
		}


		/**
		* Orientation change event.
		*
		* @since 13.0
		*/
		function orientationChangeInit() {
			parallaxRowsBGCals();
		}



		/**
		* Main resize event.
		*
		* @since 2.0
		*/
		function resizeInit() {
			fullWidthSections();
			fullWidthContentColumns();
			addOrRemoveSF();
			responsiveVideoIframes();

			if (!nectarDOMInfo.usingMobileBrowser) {
				parallaxRowsBGCals();
			}

		}



		/**
		* Flexslider plugin initialization.
		*
		* @since 5.0
		*/
		function flexsliderInit() {
			$('.flex-gallery').each(function () {

				if (!$().flexslider) {
					return;
				}

				var $that = $(this);

				imagesLoaded($(this), function () {

					var autorotate = ($that.find('ul').is('[data-d-autorotate="true"]')) ? false : true;

					$that.flexslider({
						animation: 'fade',
						smoothHeight: false,
						animationSpeed: 500,
						useCSS: false,
						touch: true,
						slideshow: autorotate,
					});

					//gallery slider add arrows
					$('.flex-gallery .flex-direction-nav li a.flex-next').html('<i class="fa fa-angle-right"></i>');
					$('.flex-gallery .flex-direction-nav li a.flex-prev').html('<i class="fa fa-angle-left"></i>');

				});

			});
		}



		/**
		* Icon follow.
		*
		* @since 11.0
		*/

		function NectarIconMouseFollow($el, iconType) {

			this.lastX = nectarDOMInfo.clientX;
			this.lastY = nectarDOMInfo.clientY;
			this.$el = $el;
			this.iconType = iconType;
			this.timeout = false;
			this.overEl = false;
			this.initialCalc = false;
			this.bgElSelector = '';
			this.$dragEl = '';
			this.$viewEl = '';
			this.$closeEl = '';
			this.lerpDamp = 0.18;

			this.createMarkup();
			this.setup();
			this.mouseBind();

		}

		NectarIconMouseFollow.prototype.setup = function() {

			if( this.iconType === 'post-grid-images' ) {
				this.viewportTracking();
			}

		};

		NectarIconMouseFollow.prototype.viewportTracking = function() {

			var that = this;

			if( 'IntersectionObserver' in window ) {

				var options = {
					rootMargin: '0px',
					threshold: 0
				}

				this.observer = new IntersectionObserver(function(entries) {

					entries.forEach(function(entry) {
						if ( entry.isIntersecting ) {
							that.$el.addClass('active');
							that.$el.find( that.bgElSelector ).css('visibility','visible');
							that.activeViewRAF = true;
						} else {
							that.$el.find( that.bgElSelector ).css('visibility','hidden');
							that.activeViewRAF = false;
						}
					});

				}, options);

				this.observer.observe(this.$el[0]);


			}

		};

		NectarIconMouseFollow.prototype.createMarkup = function() {

			var that = this;

			if( this.iconType === 'horizontal-movement' ) {

				if( $('.nectar-drag-indicator').length == 0 ) {
					var $usingBoxedClass = ($('body > #boxed').length > 0) ? ' in-boxed' : '';
					$('body').append('<div class="nectar-drag-indicator' + $usingBoxedClass + '"><span><i class="fa fa-angle-left"></i><i class="fa fa-angle-right"></i></span></div>');
					this.$dragEl = $('.nectar-drag-indicator');
					this.dragRAF();
				} else {
					this.$dragEl = $('.nectar-drag-indicator');
				}

			}

			if( this.iconType === 'view-indicator' ) {

				this.activeViewRAF = true;

				if( $('.nectar-view-indicator').length == 0 ) {

					var $usingBoxedClass = ($('body > #boxed').length > 0) ? ' in-boxed' : '';
					$('body').append('<div class="nectar-view-indicator' + $usingBoxedClass + '"><div class="color-circle"></div><span></span></div>');

					if( this.iconType !== 'gallery-zoom-indicator' ) {
						$('.nectar-view-indicator span').text( $('.nectar-post-grid').attr('data-indicator-text') );
					}
					this.$viewEl = $('.nectar-view-indicator');

					// initial calc.
					setTimeout(function(){

						that.lastY = nectarDOMInfo.clientY;
						that.lastX = nectarDOMInfo.clientX;

						that.viewRAF();

					},100);

				} else {
					this.$viewEl = $('.nectar-view-indicator');
				}

			}

			if( this.iconType === 'close-indicator' ) {
				if( $('.nectar-view-indicator').length == 0 ) {
					var $usingBoxedClass = ($('body > #boxed').length > 0) ? ' in-boxed' : '';
					$('body').append('<div class="nectar-close-indicator' + $usingBoxedClass + '"><div class="inner"></div></div>');
					this.$closeEl = $('.nectar-close-indicator');
					this.closeRAF();
				} else {
					this.$closeEl = $('.nectar-close-indicator');
				}

			}

			if( this.iconType === 'post-grid-images' ) {

				this.activeViewRAF = true;

				this.bgElSelector = (!this.$el.hasClass('nectar-category-grid')) ? '.nectar-post-grid-item-bg-wrap' : '.nectar-category-grid-item-bg';

				if( !this.$el.hasClass('mouse-move-bound') ) {
					this.$viewEl = this.$el.find( this.bgElSelector );
					this.$el.addClass('mouse-move-bound');
					this.viewRAF();
				} else {
					this.$viewEl = this.$el.find( this.bgElSelector );
					this.viewRAF();
				}

			}

		}



		NectarIconMouseFollow.prototype.mouseBind = function() {

			var that = this;

			if( this.iconType === 'horizontal-movement' ) {

				that.$el.find('.flickity-viewport').on('mouseenter', function() {
					that.$dragEl.addClass('visible');

					var $iconColor = (that.$el.is('[data-touch-icon-color]')) ? 'color-' + that.$el.attr('data-touch-icon-color') : '';
					that.$dragEl.removeClass('color-dark').removeClass('color-light').removeClass('color-default');
					that.$dragEl.addClass($iconColor);
				});

				that.$el.find('.flickity-viewport').on('mouseleave', function() {
					that.$dragEl.removeClass('visible');
				});

				// Handle product links.
				that.$el.find('.product-add-to-cart a').on('mouseenter', function() {
					that.$dragEl.removeClass('visible');
				});
				that.$el.find('.product-add-to-cart a').on('mouseleave', function() {
					that.$dragEl.addClass('visible');
				});

			}
			else if( this.iconType === 'close-indicator' ) {

				$('body').on('click','.team-member[data-style*="bio_fullscreen"]',function(){

					if ($('.nectar_team_member_overlay:not(.open)').length > 0) {
						return;
					}

					that.$closeEl.addClass('visible');
					that.$closeEl.find('.inner').addClass('visible');
				});

				$('body').on('click','.nectar_team_member_overlay:not(.animating)',function(){
					that.$closeEl.removeClass('visible');
					that.$closeEl.find('.inner').removeClass('visible');
				});

				// Handle links.
				$('body').on('mouseenter', '.nectar_team_member_overlay .bio-inner a', function() {
					that.$closeEl.removeClass('visible');
				});
				$('body').on('mouseleave', '.nectar_team_member_overlay .bio-inner a', function() {
					that.$closeEl.addClass('visible');
				});

			}
			else if( this.iconType === 'view-indicator' ) {

				var $color = that.$el.attr('data-indicator-color');
				var $style = that.$el.attr('data-indicator-style');

				// unbind first.
				that.$el.find('.nectar-post-grid-item').off();

				that.$el.find('.nectar-post-grid-item').on('mouseenter', function() {

					that.$viewEl.addClass('visible');

					// Handle style class.
					that.$viewEl.attr('class', function(i, c){
							return c.replace(/(^|\s)style-\S+/g, '');
					});
					that.$viewEl.addClass('style-'+$style);
					if( $style !== 'see-through' ) {
						that.$viewEl.find('.color-circle').css('background-color', $color);
					}

					clearTimeout(that.timeout);
				});

				that.$el.find('.nectar-post-grid-item').on('mouseleave', function() {
					that.timeout = setTimeout(function(){
						that.$viewEl.removeClass('visible');
					},100);

				});

				// Handle category links.
				that.$el.find('.nectar-post-grid-item .meta-category a').on('mouseenter', function() {
					that.$viewEl.removeClass('visible');
				});
				that.$el.find('.nectar-post-grid-item .meta-category a').on('mouseleave', function() {
					that.$viewEl.addClass('visible');
				});

			}


			else if( this.iconType === 'post-grid-images' ) {
				that.$el.on('mouseenter', function() {
					$(this).addClass('mouse-over');
				});
				that.$el.on('mouseleave', function() {
					$(this).removeClass('mouse-over');
				});
			}

		};

		NectarIconMouseFollow.prototype.dragRAF = function() {

			this.lastY = linearInterpolate(this.lastY, nectarDOMInfo.clientY, this.lerpDamp);
			this.lastX = linearInterpolate(this.lastX, nectarDOMInfo.clientX, this.lerpDamp);

			this.$dragEl[0].style.transform = 'translateX(' + this.lastX + 'px) translateY(' + this.lastY + 'px)';

			requestAnimationFrame(this.dragRAF.bind(this));

		};

		NectarIconMouseFollow.prototype.viewRAF = function() {

			this.lastY = linearInterpolate(this.lastY, nectarDOMInfo.clientY, this.lerpDamp);
			this.lastX = linearInterpolate(this.lastX, nectarDOMInfo.clientX, this.lerpDamp);

			if( this.activeViewRAF ) {
				for(var i=0; i < this.$viewEl.length; i++) {
					this.$viewEl[i].style.transform = 'translateX(' + this.lastX + 'px) translateY(' + this.lastY + 'px)';
				}
			}

			requestAnimationFrame(this.viewRAF.bind(this));

		};

		NectarIconMouseFollow.prototype.closeRAF = function() {

			this.lastY = linearInterpolate(this.lastY, nectarDOMInfo.clientY, this.lerpDamp);
			this.lastX = linearInterpolate(this.lastX, nectarDOMInfo.clientX, this.lerpDamp);

			this.$closeEl.css({
				'transform': 'translateX(' + this.lastX + 'px) translateY(' + this.lastY + 'px)'
			});

			requestAnimationFrame(this.closeRAF.bind(this));

		};



		/**
		* Flickity lazy image helper
		*
		* Needed to calculate the space which
		* lazy loaded images will eventually occupy.
		*
		* @since 11.0
		*/
		function flickityLazyCalcs() {

			$('.wpb_gallery_slidesflickity_static_height_style .cell[data-lazy="true"]').each(function() {

				$(this).css({
					'height': '',
					'width' : ''
				});

				var heightAttr = parseInt($(this).find('img').attr('height'));
				var widthAttr = parseInt($(this).find('img').attr('width'));

				var dimensions = calculateAspectRatio( widthAttr, heightAttr, 2000, parseInt($(this).find('img').height()) );
				var captionHeight = ( $(this).find('.item-meta').length > 0 ) ? $(this).find('.item-meta').outerHeight() : 0;

				$(this).css({
					'height':  (dimensions.height + captionHeight) + 'px',
					'width' :  dimensions.width + 'px'
				});

			});

		}


		/**
		* Flickity lazy initialization.
		*
		* @since 11.0
		*/
		function flickityLazyInit() {
			// Lazy assist.
			if( $('.wpb_gallery_slidesflickity_static_height_style .cell[data-lazy="true"]').length > 0 ) {
				flickityLazyCalcs();
				$window.on('smartresize',flickityLazyCalcs);
			}
		}


		/**
		* Flickity plugin initialization.
		*
		* @since 7.0
		*/
		function flickityInit() {

			if ($('.nectar-flickity:not(.masonry)').length == 0) {
				return false;
			}

			$flickitySliders = [];
			flickityDragArr = [];


			$('.nectar-flickity:not(.masonry)').each(function (i) {

				$(this).removeClass(function (index, className) {
					return (className.match(/(^|\s)instance-\S+/g) || []).join(' ');
				});
				$(this).addClass('instance-' + i);

				var $freeScrollBool   = ($(this).is('[data-free-scroll]') && $(this).attr('data-free-scroll') == 'true') ? true : false,
				$groupCellsBool       = true,
				$flickContainBool     = true,
				$flcikAttr            = 0.025,
				$paginationBool       = false,
				$nextPrevArrowBool    = true,
				$setGallerySizeBool   = true,
				$imagesLoaded         = true,
				$flickCellAlign       = 'center';

				// Fixed Text Style.
				if($(this).is('[data-format="fixed_text_content_fullwidth"]')) {

					$flickCellAlign   = 'left';
					$groupCellsBool   = false;
					$flickContainBool = false;
					$flcikAttr        = 0.02;

					if( $(this).parent().is('[data-alignment="right"]') ) {
						$flickCellAlign   = 'right';
					}

				}

				if($freeScrollBool == true ) {
					$groupCellsBool = false;
				}


				// Controls.
				if ($(this).attr('data-controls').length > 0 &&
				$(this).attr('data-controls') == 'next_prev_arrows'||
				$(this).attr('data-controls').length > 0 &&
				$(this).attr('data-controls') == 'next_prev_arrows_overlaid') {
					$paginationBool     = false;
					$nextPrevArrowBool  = true;
				} else {
					$paginationBool     = true;
					$nextPrevArrowBool  = false;
				}


				if ($(this).attr('data-controls').length > 0 &&
				$(this).attr('data-controls') == 'none') {
					$paginationBool     = false;
					$nextPrevArrowBool  = false;
				}

				var $flickity_autoplay = false;
        var $flickity_stored_autoplay = false;

				if ($(this).is('[data-autoplay]') &&
				$(this).attr('data-autoplay') == 'true') {

					$flickity_autoplay = true;
					$flickity_stored_autoplay = 5000;

					if ($(this).is('[data-autoplay-dur]') &&
					$(this).attr('data-autoplay-dur').length > 0) {

						if (parseInt($(this).attr('data-autoplay-dur')) > 100 &&
						parseInt($(this).attr('data-autoplay-dur')) < 30000) {
							$flickity_autoplay = parseInt($(this).attr('data-autoplay-dur'));
							$flickity_stored_autoplay = $flickity_autoplay;
						}

					}

				}

				var $that 							 = $(this);
				var $frontEndEditorDrag  = ($('body.vc_editor').length > 0) ? false : true;
				var $frontEndEditorPause = ($('body.vc_editor').length > 0) ? true : false;
				var $arrowShape = '';
				var $wrapAround = ( $(this).is('[data-wrap]') && $(this).attr('data-wrap') == 'no-wrap' ) ? false : true;

				// Centered cells.
				if($(this).is('[data-centered-cells="true"]')) {
					$groupCellsBool = 1;
				}

				// Adaptive height.
				var $flickity_adaptive_height = false;
				if( $(this).is('[data-adaptive-height="true"]') ) {
					$flickity_adaptive_height = true;
				}

				// Lazy load.
				var $lazyload = ($(this).find('img[data-flickity-lazyload]').length > 0) ? 1 : false;
				if( $(this).find('img[data-flickity-lazyload]').length > 0 && $(this).is('[data-overflow="visible"]') && $(this).is('[data-wrap="no-wrap"]') ) {
					$lazyload = 2;
				}

				// RTL.
				var $flickity_rtl = ( $body.hasClass('rtl') ) ? true : false;

				// Arrow shape.
				if( $(this).attr('data-controls').length > 0 && $(this).attr('data-controls') == 'next_prev_arrows_overlaid' ||
						$(this).attr('data-controls').length > 0 && $(this).attr('data-controls') == 'touch_total' ||
						$(this).hasClass('nectar-simple-slider') ) {
					$arrowShape	= {
						x0: 10,
						x1: 60, y1: 50,
						x2: 70, y2: 40,
						x3: 30
					}
				} else {
					$arrowShape = {
						x0: 20,
						x1: 70,
						y1: 30,
						x2: 70,
						y2: 25,
						x3: 70
					}
				}

				if( $(this).is('[data-format="fixed_text_content_fullwidth"]') &&
				    $(this).parents('.full-width-content.wpb_row').length > 0 ) {
					  $(this).parents('.full-width-content.wpb_row')
							.removeClass('full-width-content')
							.addClass('full-width-section');
				}

				// Nectar Simple Slider
				if( $(this).hasClass('nectar-simple-slider') ) {
					$flickity_adaptive_height = false;
					$paginationBool           = false;
					$nextPrevArrowBool        = false;
					$setGallerySizeBool       = false;
					$wrapAround               = false;
					$imagesLoaded             = false;
					$flcikAttr                = 0.022;

					if( $(this).attr('data-pagination') == 'true') {
						$paginationBool = true;
					}

					if( $(this).attr('data-wrap') == 'true') {
						$wrapAround = true;
					}

				}

				$flickitySliders[i] = new Flickity('.nectar-flickity.instance-' + i, {
					setGallerySize: $setGallerySizeBool,
					contain: $flickContainBool,
					draggable: $frontEndEditorDrag,
					lazyLoad: $lazyload,
					imagesLoaded: $imagesLoaded,
					percentPosition: true,
					adaptiveHeight: $flickity_adaptive_height,
					cellAlign: $flickCellAlign,
					groupCells: $groupCellsBool,
					prevNextButtons: $nextPrevArrowBool,
					freeScroll: $freeScrollBool,
					pageDots: $paginationBool,
					resize: true,
					selectedAttraction: $flcikAttr,
					autoPlay: $flickity_autoplay,
					rightToLeft: $flickity_rtl,
					pauseAutoPlayOnHover: $frontEndEditorPause,
					wrapAround: $wrapAround,
					accessibility: false,
					arrowShape: $arrowShape
				});


				// Simple Slider Arrows
				if( $that.attr('data-arrows') == 'true' ) {

					if( $that.find('.flickity-prev-next-button').length == 0 ) {

						$that.append('<button class="flickity-button flickity-prev-next-button previous" aria-label="'+ nectar_front_i18n.previous +'" type="button"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow"></path></svg></button>');
						$that.append('<button class="flickity-button flickity-prev-next-button next" aria-label="'+ nectar_front_i18n.next +'" type="button"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>');

						// Previous.
						$that.find('.flickity-prev-next-button.previous').on( 'click', function() {

							if( $wrapAround === false &&
									$flickitySliders[i].selectedIndex == 0 &&
								  ( $flickitySliders[i].isAnimating == false || typeof $flickitySliders[i].isAnimating === 'undefined') ) {

								// Nudge.
								var currentX = $flickitySliders[i].x;
								anime({
									targets: $flickitySliders[i],
									x: currentX + 100,
									duration: 350,
									easing: 'easeOutCubic'
								});
								$flickitySliders[i].startAnimation();

							}

							 $flickitySliders[i].previous();
						});

						// Next.
						$that.find('.flickity-prev-next-button.next').on( 'click', function() {

							// Nudge.
							if( $wrapAround === false &&
									$flickitySliders[i].selectedIndex == $flickitySliders[i].slides.length - 1 &&
								  $flickitySliders[i].isAnimating == false) {

								// Nudge.
								var currentX = $flickitySliders[i].x;
								anime({
									targets: $flickitySliders[i],
									x: currentX - 100,
									duration: 350,
									easing: 'easeOutCubic'
								});
								$flickitySliders[i].startAnimation();

							}

							$flickitySliders[i].next();
						});

					}

				} // End Simple Slider Arrows.


				// Simple Slider Lazy Load.
				if( $(this).hasClass('nectar-simple-slider') && $that.find('.bg-layer[data-nectar-img-src]').length > 0 ) {

					var waypoint = new Waypoint({
						element: $that,
						handler: function () {

							$that.find('.bg-layer[data-nectar-img-src]').each(function() {
								var entry = $(this)[0];
								var imgSrc = entry.getAttribute('data-nectar-img-src');
								entry.style.backgroundImage = "url('" + imgSrc + "')";
								entry.classList.add('loaded');
							});

							waypoint.destroy();
						},
						offset: '95%'

					});

				}

				// Simple Slider Parallax
				if( $(this).hasClass('nectar-simple-slider') && $(this).is('[data-parallax="true"]') ) {

				  var slides = $(this).find('.cell');
					var j = i;

					// limit time between slide changes when wrapping.
					if( $wrapAround === true ) {
						$that.find('.flickity-prev-next-button').on('click', function () {
							$that.addClass('disabled-nav');
							setTimeout(function(){
								$that.removeClass('disabled-nav');
							},500);
						});
					}


					// parallax effect.
					$flickitySliders[i].on('scroll', function () {

					  $.each( $flickitySliders[i].slides, function(i,slide) {

					    var imageBG = slides[i].querySelector('.bg-layer');
							var content = slides[i].querySelector('.inner');

							var flkty = $flickitySliders[j];
							var x = 0;

							if( 0 === i ) {
								x = Math.abs( flkty.x ) > flkty.slidesWidth ? ( flkty.slidesWidth + flkty.x + flkty.slides[flkty.slides.length - 1 ].outerWidth + slide.target ) : ( slide.target + flkty.x );
							} else if( i === flkty.slides.length - 1 ) {
								x = Math.abs( flkty.x ) + flkty.slides[i].outerWidth < flkty.slidesWidth ? ( slide.target - flkty.slidesWidth + flkty.x - flkty.slides[i].outerWidth ) : ( slide.target + flkty.x );
							} else {
								x = slide.target + flkty.x;
							}

						  imageBG.style.transform = 'translate3d(' + x * ( -1 / 2 ) + 'px,0,0)';
							content.style.transform = 'translate3d(' + x * ( -1 / 4 ) + 'px,0,0)';

					  });
					});
			  }

				// Simple Slider Pagination
				if( $(this).hasClass('nectar-simple-slider') && true == $paginationBool ) {

					$(this).find('.flickity-page-dots li').append('<svg width="65px" height="65px" viewBox="0 0 72 72" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle class="time" stroke-width="5" fill="none" stroke-linecap="round" cx="33" cy="33" r="28"></circle></svg>');

					if( $flickity_stored_autoplay ) {
						$(this).find('.flickity-page-dots li circle.time').css('transition', 'stroke-dashoffset '+ (parseInt($flickity_stored_autoplay) + 100) +'ms linear, stroke 0.2s ease');

						$(this).find('.flickity-page-dots li:first').addClass('no-trans');
						setTimeout(function() {
							$that.find('.flickity-page-dots li:first').removeClass('no-trans');
						},60);

						$flickitySliders[i].on('select', function (event) {
							$flickitySliders[i].playPlayer();
						});

						$flickitySliders[i].on('dragEnd', function (event) {
							$flickitySliders[i].playPlayer();
							$that.find('.flickity-page-dots .is-selected').removeClass('no-trans');
						});

						$flickitySliders[i].on('dragStart', function (event) {
							$that.find('.flickity-page-dots .is-selected').addClass('no-trans');
						});

					}

				}

				// Visualized total controls
				if( $(this).is('[data-controls="touch_total"]') ) {

					// Create markup.
					if( $(this).find('.visualized-total').length == 0 ) {
						if( $(this).parents('.full-width-content').length > 0 && $(this).parents('.vc_col-sm-12').length > 0 ) {
							$(this).append('<div class="container normal-container"><div class="visualized-total"><span></span></div></div>');
						} else {
							$(this).append('<div class="visualized-total"><span></span></div>');
						}
					}


					// Init drag indicator.
					if( !nectarDOMInfo.usingMobileBrowser ) {

						flickityDragArr[i] = new NectarIconMouseFollow($(this),'horizontal-movement');

						$flickitySliders[i].on('dragMove', function (event, pointer) {
							nectarDOMInfo.clientY = pointer.clientY;
							nectarDOMInfo.clientX = pointer.clientX;
						});

						$flickitySliders[i].on('pointerDown', function (event, pointer) {
							$('.nectar-drag-indicator').addClass('pointer-down');
						});
						$flickitySliders[i].on('pointerUp', function (event, pointer) {
							$('.nectar-drag-indicator').removeClass('pointer-down');
						});

					}

					var $totalImgs      = $(this).find('.flickity-page-dots li').length;
					var $totalIndicator = $(this).find('.visualized-total span');
					var $totalPosition  = 1;
					var $totalWidth     = $(this).find('.visualized-total').width();

					$window.on('smartresize',function() {

						setTimeout(function() {

							$totalImgs  = $that.find('.flickity-page-dots li').length;
							$totalWidth = $that.find('.visualized-total').width();

							$totalPosition = ($totalWidth / $totalImgs) * $that.find('.flickity-page-dots .is-selected').index();

							// Update pos on interaction.
							$totalIndicator.css('width', 100/$totalImgs + '%');
							$totalIndicator.css({
								'x' : $totalPosition + 'px'
							});

						},200);

					});

					// Set initial total tracker width.
					setTimeout(function(){
						$totalImgs  = $that.find('.flickity-page-dots li').length;
						$totalWidth = $that.find('.visualized-total').width();

						$totalIndicator.css('width', 100/$totalImgs + '%');
					},200);

					$flickitySliders[i].on('change', function (event, progress) {

						$totalPosition = ($totalWidth / $totalImgs) * $that.find('.flickity-page-dots .is-selected').index();

						// Update pos on interaction.
						$totalIndicator.css({
							'x' : $totalPosition + 'px'
						});

					});

				}


				// Fixed text content style
				if ($(this).is('[data-format="fixed_text_content_fullwidth"]') && !nectarDOMInfo.usingFrontEndEditor) {

					var $onMobileBrowser = nectarDOMInfo.usingMobileBrowser;

					$flickitySliders[i].on('scroll', function () {

						if ($onMobileBrowser) {
							return;
						}

						var $flkSlideWidth 	= $that.find('.cell').outerWidth() + 25,
						$leftHeaderSize 		= ($('body[data-header-format="left-header"]').length > 0 && $window.width() > 1000) ? 275 : 0,
						$extraWindowSpace 	= (($window.width() + $leftHeaderSize) - $that.parents('.main-content').width()) / 2;

						$extraWindowSpace += parseInt($that.css('margin-left')) + 2;

						$flickitySliders[i].slides.forEach(function (slide, j) {

							var $scaleAmt     = 1,
							$translateXAmt    = 0,
							$rotateAmt        = 0,
							$slideZIndex      = 10,
							$opacityAmt       = 1,
							$slideOffset      = $(slide.cells[0].element).offset().left,
							flkInstanceSlide  = $('.nectar-flickity.instance-' + i + ' .cell:nth-child(' + (j + 1) + ')');

							if ($slideOffset - $extraWindowSpace < 0 &&
								$slideOffset - $extraWindowSpace > $flkSlideWidth * -1) {

								$scaleAmt       = 1 + (($slideOffset - $extraWindowSpace) / 1500);
								$opacityAmt     = 1 + (($slideOffset - $extraWindowSpace + 70) / 550);
								$translateXAmt  = (($slideOffset - $extraWindowSpace)) * -1;
								$rotateAmt      = (($slideOffset - $extraWindowSpace) / 25) * -1;

							} else {
								$scaleAmt       = 1;
								$opacityAmt     = 1;
								$translateXAmt  = 0;
								$rotateAmt      = 0;
							}

							if ($slideOffset + 5 - $extraWindowSpace < 0 &&
								$slideOffset - $extraWindowSpace > $flkSlideWidth * -1) {

								$slideZIndex = 5;
							} else {
								$slideZIndex = 10;
							}

							flkInstanceSlide.css({
								'z-index': $slideZIndex
							});

							flkInstanceSlide.find('.inner-wrap-outer').css({
								'transform': 'perspective(800px) translateX(' + $translateXAmt + 'px) rotateY(' + $rotateAmt + 'deg) translateZ(0)',
								'opacity': $opacityAmt
							});

							flkInstanceSlide.find('.inner-wrap').css({
								'transform': 'scale(' + $scaleAmt + ') translateZ(0)'
							});

						});

					});

				}

				var $removeHiddenTimeout;
				var $removeMovingTimeout;

				$flickitySliders[i].on('dragStart', function () {

					clearTimeout($removeHiddenTimeout);
					clearTimeout($removeMovingTimeout);
					$that.addClass('is-dragging');
					$that.addClass('is-moving');

					$that.find('.flickity-prev-next-button').addClass('hidden');
				});

				$flickitySliders[i].on('dragEnd', function () {

					$that.removeClass('is-dragging');

					$removeHiddenTimeout = setTimeout(function () {

						$that.removeClass('is-moving');
						$that.find('.flickity-prev-next-button').removeClass('hidden');

					}, 600);

					$removeMovingTimeout = setTimeout(function () {
						$that.removeClass('is-moving');
					}, 300);

				});

				$('.flickity-prev-next-button').on('click', function () {

					clearTimeout($removeHiddenTimeout);

					$(this).parents('.nectar-flickity')
						.find('.flickity-prev-next-button')
						.addClass('hidden');

					$removeHiddenTimeout = setTimeout(function () {
						$that
							.find('.flickity-prev-next-button')
							.removeClass('hidden');
					}, 600);

				});


				// Images loaded.
				if ($that.hasClass('nectar-carousel')) {
					imagesLoaded($that, function () {
						nectarCarouselFlkEH($that);
					});
				}

			});


			// Resize event.
			var $usingNectarCarouselFlk = ($('.nectar-carousel.nectar-flickity:not(.masonry)').length > 0) ? true : false;

			if ($usingNectarCarouselFlk) {

				if( !nectarDOMInfo.usingMobileBrowser ) {
					$window.on('resize',setNectarCarouselFlkEH);
				} else {
					window.addEventListener("orientationchange", setNectarCarouselFlkEH);
				}

			}

			var handleCaptions = ( $('.wpb_gallery_slidesflickity_static_height_style .item-meta').length > 0 ) ? true : false;

			if( handleCaptions ) {
				$window.on('resize', setNectarFlickityCaptions);
				setNectarFlickityCaptions();
			}

		}





		/**
		* Flickity equal height helper.
		*
		* @since 7.0
		*/
		function setNectarCarouselFlkEH() {
			$('.nectar-carousel.nectar-flickity:not(.masonry)').each(function () {
				nectarCarouselFlkEH($(this));
			});
		}

		/**
		* Flickity captions calculcations
		*
		* @since 12.2
		*/
		function setNectarFlickityCaptions() {
			$('.wpb_gallery_slidesflickity_static_height_style .item-meta').each(function() {

				$(this).css({
					'width': $(this).parent().find('img').width()
				});


			});

		}

		/**
		* Flickity equal height calculations.
		*
		* @since 7.0
		*/
		function nectarCarouselFlkEH($slider_instance) {

			var $tallestSlideCol = 0;

			$slider_instance
				.find('.flickity-slider > .cell')
				.css('height', 'auto');

			$slider_instance.find('.flickity-slider > .cell').each(function () {

				if( $(this).height() > $tallestSlideCol ) {
					$tallestSlideCol = $(this).height();
				}

			});

			if ($tallestSlideCol < 10) {
				$tallestSlideCol = 'auto';
			}

			//set even height
			$slider_instance
				.find('.flickity-slider > .cell')
				.css('height', $tallestSlideCol + 'px');

		}



		/**
		* twentytwenty plugin initialization.
		*
		* @since 7.0
		*/
		function twentytwentyInit() {
			$('.twentytwenty-container').each(function () {
				var $that = $(this);

				if ($that.find('.twentytwenty-handle').length == 0) {
					$(this).imagesLoaded(function () {
						$that.twentytwenty();
					});
				}

			});
		}





		/**
		* Superfish initialization and submenu functionality.
		*
		* @since 2.0
		*/
		function initSF() {

			addOrRemoveSF();

			if ($('body[data-header-format="left-header"]').length == 0) {

				var $disableHI;

				if (!($('#header-outer[data-megamenu-rt="1"]').length > 0 &&
				$('#header-outer[data-transparent-header="true"]').length > 0)) {
					$disableHI = true;
				} else {
					$disableHI = false;
				}

				$(".sf-menu:not(.buttons)").superfish({
					delay: 500,
					speed: 'fast',
					disableHI: $disableHI,
					speedOut: 'fast',
					animation: {
						opacity: 'show'
					}
				});

				// Pull right/left menu
				$('#header-outer .sf-menu.buttons li.menu-item').on('mouseover',function(){
					$(this).addClass('sfHover');
				});
				$('#header-outer .sf-menu.buttons li.menu-item').on('mouseleave',function(){
					var $that = $(this);

					if( $that.is('.menu-item-has-children') ) {
						setTimeout(function () {
							if( !$that.is(':hover') ) {
								$that.removeClass('sfHover');
							}
						}, 200);
					} else {
							$that.removeClass('sfHover');
					}
				});

				// Areas that do not use megamenu.
				$('#header-secondary-outer li.megamenu:not(.nectar-megamenu-menu-item), #header-outer:not([data-format="menu-left-aligned"]):not([data-format="centered-logo-between-menu-alt"]) .sf-menu.buttons li.megamenu')
					.removeClass('nectar-megamenu-menu-item')
					.removeClass('megamenu');

				// Centered menu bottom bar forced megamenu values.
				$('#header-outer[data-format="centered-menu-bottom-bar"] .right-side .sf-menu li.nectar-megamenu-menu-item')
					.removeClass('align-left')
					.removeClass('align-middle')
					.addClass('align-right');

				$('#header-outer[data-format="centered-menu-bottom-bar"] .left-side .sf-menu li.nectar-megamenu-menu-item')
					.removeClass('align-right')
					.removeClass('align-middle')
					.addClass('align-left');


				$('#header-outer .sf-menu > li:not(.megamenu) > ul > li > ul').each(function () {

					if ($(this).offset().left + $(this).outerWidth() > $window.width()) {
						$(this).addClass('on-left-side');
						$(this).find('ul').addClass('on-left-side');
					}

				});

				// Megamenu multi section per column title support.
				$('body:not([data-header-format="left-header"]) header#top nav > ul > li.megamenu > ul > li > ul > li:has("> ul")').addClass('has-ul');

				// Full width megamenu.
				if ($('body[data-megamenu-width="full-width"]').length > 0 && $('ul.sub-menu').length > 0) {
					megamenuFullwidth();
					$window.on('smartresize', megamenuFullwidth);
					$('header#top nav > ul > li.megamenu > .sub-menu').css('box-sizing', 'content-box');
				}

				// Extra hover class for megamenu check.
				$('header#top nav > ul.sf-menu > li.menu-item').on('mouseenter', function () {
					$(this).addClass('menu-item-over');
				});
				$('header#top nav > ul.sf-menu > li.menu-item').on('mouseleave', function () {
					$(this).removeClass('menu-item-over');
				});

				// Remove arrows on mega menu item.
				$('#header-outer nav .megamenu .sub-menu a.sf-with-ul .sf-sub-indicator, #header-outer .megamenu .sub-menu a .sf-sub-indicator').remove();

				// Megamenu bg
				$('.sf-menu > .nectar-megamenu-menu-item > a .menu-title-text .megamenu-bg-lazy[data-bg-src]').each(function() {
					var parentLI   = $(this).parents('.nectar-megamenu-menu-item');
					var bgImgSrc   = $(this).attr('data-bg-src');
					var bgImgAlign = $(this).attr('data-align').replace( '_', ' ');

					parentLI.find('> ul').css({
						'background-position': bgImgAlign,
						'background-image': 'url("' + bgImgSrc + '")'
					});

					$(this).remove();
				});

				$('.sf-menu > .nectar-megamenu-menu-item > ul > li > a .menu-title-text .megamenu-col-bg-lazy[data-bg-src]').each(function() {
					var parentLI = $(this).closest('.menu-item');
					var bgImgSrc = $(this).attr('data-bg-src');
					var bgImgAlign = $(this).attr('data-align').replace( '_', ' ');
					parentLI.css({
						'background-position': bgImgAlign,
						'background-image': 'url("' + bgImgSrc + '")'
					});
					$(this).remove();
				});


				// Blank title megamenu columns.
				$('#header-outer nav > ul > li.megamenu > ul.sub-menu > li > a').each(function () {
					if ($(this).text() == '-' || $(this).text() == 'â€“' || $(this).parent().hasClass('hide-title')) {
						$(this).remove();
					}
				});

			}


			// Lazy load nectar menu images.
			if( 'IntersectionObserver' in window ) {

				var options = {
					rootMargin: '0px',
					threshold: 0
				}

				var menuObserver = new IntersectionObserver(function(entries) {

					entries.forEach(function(entry) {
						if ( entry.isIntersecting ) {
							var lazyItem = entry.target;
							lazyItem.classList.add('loaded');

							var lazySrc = lazyItem.getAttribute('data-menu-img-src');
							if( lazySrc ) {
								lazyItem.setAttribute( 'src', lazySrc );
								lazyItem.removeAttribute('data-menu-img-src');
							}

							menuObserver.unobserve(lazyItem);
						}
					});

				}, options);

				var lazyMenuIcons = [].slice.call(document.querySelectorAll('.nectar-menu-icon-img[data-menu-img-src], #header-outer .nectar-ext-menu-item .image-layer'));
				lazyMenuIcons.forEach(function(lazyItem) {
					menuObserver.observe(lazyItem);
				});

			} else {
				// fallback.
				$('.sf-menu .nectar-menu-icon-img[data-menu-img-src]').each(function() {
					$(this).attr('src',$(this).attr('data-menu-img-src'));
					$(this).removeAttr('data-menu-img-src');
				});
				$('.nectar-ext-menu-item .image-layer').addClass('loaded');

			}

			// Icon markup.
			$('.sub-menu .nectar-menu-icon, .sub-menu .nectar-menu-icon-img, .off-canvas-menu-container > ul > li > a .nectar-menu-icon, .off-canvas-menu-container > ul > li > a .nectar-menu-icon-img').each(function() {

				var $parent = $(this).parent();
				var $icon = $(this).detach();

				if( $parent.parents('.nectar-ext-menu-item').length == 0 ) {
					$parent.wrapInner('<span class="nectar-menu-icon-text" />');
					$parent.addClass('nectar-menu-item-with-icon');
				}

				$parent.prepend($icon);

			});

			// Badge Labels.
			$('#slide-out-widget-area:not(.fullscreen) .nectar-menu-label').each(function(){

				if($(this).parents('.nectar-ext-menu-item').length == 0 ) {
						$(this).closest('a').addClass('nectar-menu-item-with-icon');
				}

			});


			// OCM Remove Ext menu items option.
			if( window.nectarOptions && window.nectarOptions.ocm_remove_ext_menu_items && window.nectarOptions.ocm_remove_ext_menu_items == 'remove_images' ) {

				$('.off-canvas-menu-container .title[class*="inherit-h"], #mobile-menu .title[class*="inherit-h"]').removeClass(function (index, className) {
					return (className.match(/(^|\s)inherit-h\S+/g) || []).join(' ');
				});
				$('.off-canvas-menu-container .nectar-ext-menu-item .image-layer-outer, #mobile-menu .nectar-ext-menu-item .image-layer-outer').remove();
				$('.off-canvas-menu-container .nectar-ext-menu-item .menu-item-desc').removeClass('menu-item-desc').addClass('item_desc');
				$('.off-canvas-menu-container .nectar-ext-menu-item .inner-content > .title').each(function(){
					if( $(this).find('.menu-title-text').length == 0 ) {
						$(this).removeClass('title').addClass('menu-title-text');
					}
				});

			}

			// Desc class for OCM for added submenu spacing
			$('.off-canvas-menu-container .item_desc').each(function() {
				var $parent = $(this).parents('.menu-item');
				$parent.addClass('nectar-extra-menu-item-spacing');
			});

			// Desc class for OCM for different flex alignment.
			$('.off-canvas-menu-container .nectar-menu-icon, .off-canvas-menu-container .nectar-menu-icon-img').each(function() {

				var $parent = $(this).parent();

				if( $parent.find('.item_desc').length > 0 || $parent.find('.nav_desc').length > 0 ) {
					$parent.addClass('nectar-menu-item-with-desc');
				}

			});


			// Deactivate hide header until needed effect on phone.
			if (nectarDOMInfo.usingMobileBrowser && $('#header-outer[data-remove-fixed="1"]').length == 0) {
				$body.attr('data-hhun', '0');
			}

			inlineMegaMenuPos();

		}



		function inlineMegaMenuPos() {

			// Left aligned items.
			$('nav:not(.left-side):not(.right-side) .sf-menu > .nectar-megamenu-menu-item.align-left:not(.width-100)').each(function() {
				var $parentEl = $(this);
				var $headerContainer = $('header#top > .container > .row');
				var $submenu = $(this).find('> ul.sub-menu');

				if( $parentEl ) {

					// Change into center positioning.
					if( $submenu.width() + $parentEl.offset().left > nectarDOMInfo.winW ) {
						$(this).addClass('align-middle');
						return true;
					}

					// Set left positioning.
					$(this).find('> ul.sub-menu').css({
						'right':  $headerContainer.width() - ( ($parentEl.offset().left + $parentEl.width()) - $headerContainer.offset().left ) - $(this).find('> ul.sub-menu').width() + $parentEl.width(),
						'left': 'auto'
					});
					$(this).removeClass('align-middle');
				}

			});


			// Right aligned items.
			$('nav:not(.left-side):not(.right-side) .sf-menu > .nectar-megamenu-menu-item.align-right:not(.width-100)').each(function() {
				var $parentEl = $(this);
				var $headerContainer = $('header#top > .container > .row');
				var $submenu = $(this).find('> ul.sub-menu');

				if( $parentEl ) {

					// Change into center positioning.
					if( ($parentEl.offset().left + $parentEl.width() - $submenu.width()) < 0 ) {
						$(this).addClass('align-middle');
						return true;
					}

					$(this).find('> ul.sub-menu').css({
						'right':  $headerContainer.width() - ( ($parentEl.offset().left + $parentEl.width()) - $headerContainer.offset().left ),
						'left': 'auto'
					});
					$(this).removeClass('align-middle');
				}

			});

			// Center aligned items.
			$('nav:not(.left-side):not(.right-side) .sf-menu > .nectar-megamenu-menu-item.align-middle:not(.width-100)').each(function() {
				var $parentEl = $(this);
				var $headerContainer = $('header#top > .container > .row');
				var $submenu = $(this).find('> ul.sub-menu');

				if( $parentEl ) {

					var headerContainerW   = $headerContainer.width(),
					headerContainerOffsetL = $headerContainer.offset().left,
					menuItemOffsetL        = $parentEl.offset().left,
					menuItemW              = $parentEl.width(),
					megaMenuW              = $submenu.width();

					// Default center align.
					$submenu.css({
						'right':  headerContainerW - ( (menuItemOffsetL + menuItemW) - headerContainerOffsetL ) - megaMenuW/2 + menuItemW/2,
						'left': 'auto'
					});

					var megaMenuOffset = $submenu.offset();

					// Overflowing left.
					if(megaMenuOffset.left < 0) {
						$submenu.css({
							'right': 'auto',
							'left': '0px'
						});
					}
					// Overflowing right.
					else if( megaMenuOffset.left + megaMenuW > nectarDOMInfo.winW ) {
						$submenu.css({
							'right': '0px',
							'left': 'auto'
						});
					}

				}

			});


		}

		/**
		* Calculates the "Header Mega Menu Width - Full screen width" theme option.
		*
		* @since 6.0
		*/
		function megamenuFullwidth() {

			var $windowWidth = $window.width();
			var $headerContainerWidth = $('header#top > .container').width();
			$('header#top nav:not(.left-side):not(.right-side) > ul > li.megamenu:not(.width-50):not(.width-75) > .sub-menu').css({
				'padding-left': ($windowWidth - $headerContainerWidth) / 2 + 'px',
				'padding-right': ($windowWidth + 2 - $headerContainerWidth) / 2 + 'px',
				'width': $headerContainerWidth,
				'left': '-' + ($windowWidth - $headerContainerWidth) / 2 + 'px'
			});
		}


		/**
		* Hide main navigation on mobile.
		*
		* @since 2.0
		*/
		function addOrRemoveSF() {

			if (nectarDOMInfo.winW < 1000 && $body.attr('data-responsive') == '1') {
				$body.addClass('mobile');
				$('header#top nav').css('display', 'none');
			} else {
				$body.removeClass('mobile');
				$('header#top nav').css('display', '');
				$('.slide-out-widget-area-toggle #toggle-nav .lines-button').removeClass('close');
			}


		}


		/**
		* Calculates whether submenu needs to display aligned opposite (from lack of space).
		*
		* @since 2.0
		*/
		function showOnLeftSubMenu() {

			// Show on left class for minimal styling.
			$('#header-outer .sf-menu > li:not(.megamenu) > ul > li > ul').each(function () {

				$(this).removeClass('on-left-side');

				if ($(this).offset().left + $(this).outerWidth() > $window.width()) {
					$(this).addClass('on-left-side');
					$(this).find('ul').addClass('on-left-side');
				} else {
					$(this).removeClass('on-left-side');
					$(this).find('ul').removeClass('on-left-side');
				}

			});
		}




		/**
		* Caroufredsel plugin initialization.
		*
		* @since 2.0
		*/
		function standardCarouselInit() {

			if ($('.carousel').length == 0) {
				return;
			}

			if (typeof SalientRecentProjectsCarousel !== 'undefined') {
				$('ul.carousel.portfolio-items').each(function (i) {
					$projectCarouselSliderArr[i] = new SalientRecentProjectsCarousel($(this));
				});
			}

			$('ul.carousel:not(".clients"):not(.portfolio-items)').each(function () {

				var $that       = $(this),
				maxCols         = ($(this).parents('.carousel-wrap').attr('data-full-width') == 'true') ? 'auto' : 3,
				scrollNum       = ($(this).parents('.carousel-wrap').attr('data-full-width') == 'true') ? 'auto' : '',
				colWidth        = ($(this).parents('.carousel-wrap').attr('data-full-width') == 'true') ? 500 : 453,
				$autoplayBool   = ($(this).attr('data-autorotate') == 'true') ? true : false,
				$themeSkin      = true,
				$themeSkin2     = true;

				var scrollSpeed, easing;

				if ($('body.ascend').length > 0 && $(this).parents('.carousel-wrap').attr('data-full-width') != 'true' ||
				$('body.material').length > 0 && $(this).parents('.carousel-wrap').attr('data-full-width') != 'true') {

					if ($(this).find('li').length % 3 === 0) {
						$themeSkin  = true;
						$themeSkin2 = true;
					} else {
						$themeSkin  = false;
						$themeSkin2 = true;
					}

				} else {
					$themeSkin 	= true;
					$themeSkin2 = true;
				}

				scrollSpeed = (parseInt($(this).attr('data-scroll-speed'))) ? parseInt($(this).attr('data-scroll-speed')) : 700;
				easing = ($(this).is('[data-easing]')) ? $(this).attr('data-easing') : 'linear';

				var $element = $that;
				if ($that.find('img').length == 0) {
					$element = $body;
				}

				imagesLoaded($element, function () {

					$that.carouFredSel({
						circular: $themeSkin,
						infinite: $themeSkin2,
						height: 'auto',
						responsive: true,
						items: {
							width: colWidth,
							visible: {
								min: 1,
								max: maxCols
							}
						},
						swipe: {
							onTouch: true,
							onMouse: true,
							options: {
								excludedElements: "button, input, select, textarea, .noSwipe",
								tap: function (event, target) {
									if ($(target).attr('href') &&
									!$(target).is('[target="_blank"]') &&
									!$(target).is('[rel^="prettyPhoto"]') &&
									!$(target).is('.magnific-popup') &&
									!$(target).is('.magnific')) {
										window.open($(target).attr('href'), '_self');
									}
								}
							},
							onBefore: function () {
								// Hover effect.
								$that.find('.work-item').trigger('mouseleave');
								$that.find('.work-item .work-info a').trigger('mouseup');
							}
						},
						scroll: {
							items: scrollNum,
							easing: easing,
							duration: scrollSpeed,
							onBefore: function () {

								if ($('body.ascend').length > 0 && $that.parents('.carousel-wrap').attr('data-full-width') != 'true' ||
								$('body.material').length > 0 && $that.parents('.carousel-wrap').attr('data-full-width') != 'true') {

									$that.parents('.carousel-wrap')
										.find('.item-count .total')
										.html(Math.ceil($that.find('> li').length / $that.triggerHandler("currentVisible").length));

								}
							},
							onAfter: function () {
								if ($('body.ascend').length > 0 && $that.parents('.carousel-wrap').attr('data-full-width') != 'true' ||
								$('body.material').length > 0 && $that.parents('.carousel-wrap').attr('data-full-width') != 'true') {

									$that.parents('.carousel-wrap')
										.find('.item-count .current')
										.html($that.triggerHandler('currentPage') + 1);

									$that.parents('.carousel-wrap')
										.find('.item-count .total')
										.html(Math.ceil($that.find('> li').length / $that.triggerHandler("currentVisible").length));

								}
							}

						},
						prev: {
							button: function () {
								return $that.parents('.carousel-wrap').find('.carousel-prev');
							}
						},
						next: {
							button: function () {
								return $that.parents('.carousel-wrap').find('.carousel-next');
							}
						},
						auto: {
							play: $autoplayBool
						}
					}, {
						transition: true
					}).animate({
						'opacity': 1
					}, 1300);

					$that
						.parents('.carousel-wrap')
						.wrap('<div class="carousel-outer">');

					if ($that.parents('.carousel-wrap').attr('data-full-width') == 'true') {
						$that
							.parents('.carousel-outer')
							.css('overflow', 'visible');
					}

					// Add count for non full width ascend skin.
					if ($('body.ascend').length > 0 && $that.parents('.carousel-wrap').attr('data-full-width') != 'true' ||
					$('body.material').length > 0 && $that.parents('.carousel-wrap').attr('data-full-width') != 'true') {
						$('<div class="item-count"><span class="current">1</span>/<span class="total">' + ($that.find('> li').length / $that.triggerHandler("currentVisible").length) + '</span></div>').insertAfter($that.parents('.carousel-wrap').find('.carousel-prev'));
					}

					$that.addClass('finished-loading');

					carouselHeightCalcs();

				});

			});

			// Resize
			$window.off('smartresize.carouselHeightCalcs');
			$window.on('smartresize.carouselHeightCalcs', carouselHeightCalcs);

		}





		/**
		* Full width carousel link event.
		*
		* @since 4.0
		*/
		function fwCarouselLinkFix() {

			var $mousePosStart      = 0,
			$mousePosEnd            = 0,
			fwCarouselLinkSelector  = '.carousel-wrap .portfolio-items .col .work-info a, .woocommerce .products-carousel ul.products li.product a';

			$(fwCarouselLinkSelector).on('mousedown', function (e) {
				$mousePosStart = e.clientX;
			});

			$(fwCarouselLinkSelector).on('mouseup', function (e) {
				$mousePosEnd = e.clientX;
			});

			$(fwCarouselLinkSelector).on('click', function () {
				if (Math.abs($mousePosStart - $mousePosEnd) > 10) {
					return false;
				}
			});

		}




		/**
		* Owl carousel plugin initialization.
		*
		* @since 6.0
		*/
		function owlCarouselInit() {

			if ( $('.owl-carousel[data-desktop-cols]').length === 0 ) {
				return;
			}

			$('.owl-carousel[data-desktop-cols]').each(function () {

				$(this).addClass('owl-theme');

				var $that         = $(this),
				$autoRotateBool   = $that.attr('data-autorotate'),
				$autoRotateSpeed  = $that.attr('data-autorotation-speed'),
				$owlLoopBool      = ($that.is('[data-loop="true"]')) ? true : false,
				$owlRTL           = ( $body.hasClass('rtl') ) ? true : false;

				$(this).owlCarousel({
					responsive: {
						0: {
							items: $(this).attr('data-mobile-cols')
						},
						690: {
							items: $(this).attr('data-tablet-cols')
						},
						1000: {
							items: $(this).attr('data-desktop-small-cols')
						},
						1300: {
							items: $(this).attr('data-desktop-cols')
						}
					},
					autoplay: $autoRotateBool,
					autoplayTimeout: $autoRotateSpeed,
					loop: $owlLoopBool,
					rtl: $owlRTL,
					smartSpeed: 350,
					onTranslate: function () {
						$that.addClass('moving');
					},
					onTranslated: function () {
						$that.removeClass('moving');
					}

				});

				$(this).on('changed.owl.carousel', function (event) {
					if (event.item.count - event.page.size == event.item.index) {

						$(event.target).find('.owl-dots div:last')
							.addClass('active')
							.siblings()
							.removeClass('active');
					}

				});

			});

		}


		/**
		* Owl carousel animate items.
		*
		* @since 6.0
		*/
		function owl_carousel_animate() {

			$($fullscreenSelector + '.owl-carousel[data-enable-animation="true"]').each(function () {

				var $owlOffsetPos 	= ($fullscreenMarkupBool == true) ? '200%' : 'bottom-in-view';
				var $animationDelay = 0;

				if($(this).is('[data-animation-delay]') &&
				$(this).attr('data-animation-delay').length > 0 &&
				$(this).attr('data-animation') != 'false') {
					$animationDelay = $(this).attr('data-animation-delay');
				}

				var $that = $(this);
				var waypoint = new Waypoint({
					element: $that,
					handler: function () {

						if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
							waypoint.destroy();
							return;
						}

						setTimeout(function () {
							$that.find('.owl-stage > .owl-item').each(function (i) {

								var $that = $(this);
								$that.delay(i * 200).transition({
									'opacity': '1',
									'y': '0'
								}, 600, 'easeOutQuart');
							});
							$that.addClass('animated-in');

						}, $animationDelay);

						waypoint.destroy();
					},
					offset: $owlOffsetPos

				});

			});

		}


		/**
		* Update WooCommerce Flickity count.
		*
		* Updates next/prev count for carousels on mobile devices.
		*
		* @since 9.0
		*/
		function updateWooFlickityCount(e) {
			var slideNumber = e.data.wooFlickity.selectedIndex + 1;
			e.data.wooFlickityCount.text(slideNumber + '/' + e.data.wooFlickity.slides.length);
		}



		/**
		* Product carousel initialization.
		*
		* @since 4.0
		*/
		function productCarouselInit() {

			if ($('.products-carousel').length === 0 && $('.nectar-woo-flickity').length === 0) {
				return;
			}

			$('.products-carousel').each(function () {

				var $that     = $(this).find('ul.products'),
				maxCols       = 'auto',
				scrollNum     = 'auto',
				colWidth      = ($(this).parents('.full-width-content ').length > 0) ? 400 : 353,
				scrollSpeed   = 800,
				easing        = 'easeInOutQuart';

				var $element = $that;
				if ($that.find('img').length == 0) {
					$element = $body;
				}

				// Controls on hover.
				$(this).append('<a class="carousel-prev" href="#"><i class="icon-salient-left-arrow"></i></a> <a class="carousel-next" href="#"><i class="icon-salient-right-arrow"></i></a>');

				imagesLoaded($element, function () {

					$that.carouFredSel({
						circular: true,
						responsive: true,
						items: {
							width: colWidth,
							visible: {
								min: 1,
								max: maxCols
							}
						},
						swipe: {
							onTouch: true,
							onMouse: true,
							options: {
								excludedElements: "button, input, select, textarea, .noSwipe",
								tap: function (event, target) {

									if ($(target).attr('href') &&
									!$(target).is('[target="_blank"]') &&
									!$(target).hasClass('add_to_wishlist') &&
									!$(target).hasClass('add_to_cart_button') &&
									!$(target).is('[rel^="prettyPhoto"]'))	{
										window.open($(target).attr('href'), '_self');
									}

									if ($(target).parent().attr('href') &&
									!$(target).parent().is('[target="_blank"]') &&
									!$(target).parent().hasClass('add_to_wishlist') &&
									!$(target).parent().hasClass('add_to_cart_button') &&
									!$(target).parent().is('[rel^="prettyPhoto"]')) {
										window.open($(target).parent().attr('href'), '_self');
									}

								}
							},
							onBefore: function () {
								$that.find('.product-wrap').trigger('mouseleave');
								$that.find('.product a').trigger('mouseup');
							}
						},
						scroll: {
							items: scrollNum,
							easing: easing,
							duration: scrollSpeed
						},
						prev: {
							button: function () {
								return $that.parents('.carousel-wrap').find('.carousel-prev');
							}
						},
						next: {
							button: function () {
								return $that.parents('.carousel-wrap').find('.carousel-next');
							}
						},
						auto: {
							play: false
						}
					}).animate({
						'opacity': 1
					}, 1300);

					$that.parents('.carousel-wrap').wrap('<div class="carousel-outer">');

					$that.addClass('finished-loading');
					fullWidthContentColumns();
					$window.trigger('resize');

				});


			});



			$wooFlickityCarousels = [];
			$('.nectar-woo-flickity').each(function (i) {

				var $that = $(this);

				$(this).find('.products > li').each(function () {
					$(this).wrap('<div class="flickity-cell"></div>');
				});

				var pageDotsBool 	= ($that.is('[data-controls="bottom-pagination"]')) ? true : false,
				arrowsBool				= ($that.is('[data-controls="bottom-pagination"]')) ? false : true,
				carouselWrap      = (!$that.is('[data-wrap="no-wrap"]')) ? true : false,
				groupCellsBool    = (carouselWrap == true) ? pageDotsBool : true,
				$autoplay 				= ($that.is('[data-autorotate-speed]') && parseInt($that.attr('data-autorotate-speed')) > 800) ? parseInt($that.attr('data-autorotate-speed')) : 5000;

				if (!$that.is('[data-autorotate="true"]')) {
					$autoplay = false;
				}

				$(this).find('ul.products').addClass('generate-markup');

				$wooFlickityCarousels[i] = $(this).find('ul.products');

				// Overlaid Arrows.
				if($that.is('[data-controls="arrows-overlaid"]')) {
					arrowsBool = true;
				}

				if (arrowsBool == true) {
					$wooFlickityCarousels[i].on('ready.flickity', function () {
						var flickityPrv = $that.find('.flickity-prev-next-button.previous').detach();
						var flickityNxt = $that.find('.flickity-prev-next-button.next').detach();

						$that.find('.nectar-woo-carousel-top').append(flickityPrv).append(flickityNxt);
					});
				}

				// RTL.
				var $flickity_rtl = false;
				var $flickity_rtl_cell_align = 'center';

				if( $body.hasClass('rtl') ) {
					$flickity_rtl = true;
					$flickity_rtl_cell_align = 'right';
				}

				// Related/Upsell
				var relatedUpsell = false;
				var adaptiveHeight = false;

				if( window.nectarOptions && window.nectarOptions.woo_related_upsell_carousel && window.nectarOptions.woo_related_upsell_carousel == 'true' && $(this).hasClass('related-upsell-carousel') ) {
					relatedUpsell = true;
					carouselWrap  = false;
					groupCellsBool = true;

					if( $flickity_rtl_cell_align == 'center' && $(this).find('.products > div').length < 4 ) {
						$flickity_rtl_cell_align = 'left';
					}

					if( $(this).find('.products > div').length < 5 ) {
						$(this).addClass('desktop-controls-hidden');
					}

				}

				$wooFlickityCarousels[i].flickity({
					draggable: true,
					contain: true,
					lazyLoad: false,
					imagesLoaded: true,
					cellAlign: $flickity_rtl_cell_align,
					groupCells: groupCellsBool,
					prevNextButtons: arrowsBool,
					pageDots: pageDotsBool,
					resize: true,
					adaptiveHeight: adaptiveHeight,
					percentPosition: true,
					setGallerySize: true,
					rightToLeft: $flickity_rtl,
					wrapAround: carouselWrap,
					autoPlay: $autoplay,
					accessibility: false
				});



				// Visualized total controls
				if( $(this).is('[data-controls="touch_indicator"]') ) {

					// Init drag indicator.
					if( !nectarDOMInfo.usingMobileBrowser ) {

						flickityDragArr.push( new NectarIconMouseFollow($(this),'horizontal-movement') );

						$wooFlickityCarousels[i].on('dragMove.flickity', function (event, pointer) {
							nectarDOMInfo.clientY = pointer.clientY;
							nectarDOMInfo.clientX = pointer.clientX;
						});

						$wooFlickityCarousels[i].on('pointerDown.flickity', function (event, pointer) {
							$('.nectar-drag-indicator').addClass('pointer-down');
						});
						$wooFlickityCarousels[i].on('pointerUp.flickity', function (event, pointer) {
							$('.nectar-drag-indicator').removeClass('pointer-down');
						});

					}

				}
				// Mobile pagination numbers.
				else if (arrowsBool == true) {

					$that.find('.flickity-prev-next-button').append('<svg width="65px" height="65px" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><circle stroke-width="3" fill="none" stroke-linecap="round" cx="33" cy="33" r="28"></circle> <circle class="time" stroke-width="3" fill="none" stroke-linecap="round" cx="33" cy="33" r="28"></circle></svg>');

					var $wooFlickityCount = $('<div class="woo-flickity-count" />');

					if( relatedUpsell == true ) {
						$that.find('section > h2').append($wooFlickityCount);
					} else {
						$that.append($wooFlickityCount);
					}

					var $wooFlickityData = $wooFlickityCarousels[i].data('flickity');

					var $eventData = {
						data: {
							wooFlickity: $wooFlickityData,
							wooFlickityCount: $wooFlickityCount
						}
					};

					updateWooFlickityCount($eventData);

					$wooFlickityCarousels[i].on('select.flickity', { wooFlickity: $wooFlickityData, wooFlickityCount: $wooFlickityCount }, updateWooFlickityCount );
				}


			});

		}





		/**
		* Standard Carousel Height Calculations.
		*
		* @since 2.0
		*/
		function carouselHeightCalcs() {

			// Standard carousels
			$('.carousel.finished-loading:not(".portfolio-items, .clients"), .caroufredsel_wrapper .products.finished-loading').each(function () {

				var tallestColumn = 0;

				$(this).find('> li').each(function () {

					if( $(this).height() > tallestColumn ) {
						tallestColumn = $(this).height();
					}

				});

				$(this).css('height', tallestColumn + 5);
				$(this).parents('.caroufredsel_wrapper').css('height', tallestColumn + 5);

				if ($('body.ascend').length > 0 && $(this).parents('.carousel-wrap').attr('data-full-width') != 'true' ||
				$('body.material').length > 0 && $(this).parents('.carousel-wrap').attr('data-full-width') != 'true') {

					$(this).parents('.carousel-wrap').find('.item-count .current').html(Math.ceil(($(this).triggerHandler("currentPosition") + 1) / $(this).triggerHandler("currentVisible").length));
					$(this).parents('.carousel-wrap').find('.item-count .total').html(Math.ceil($(this).find('> li').length / $(this).triggerHandler("currentVisible").length));
				}

			});

		}



		/**
		* Clients carousel element.
		*
		* @since 2.0
		*/
		function clientsCarouselInit() {

			if ( $('.carousel.clients').length === 0 ) {
				return;
			}

			$('.carousel.clients').each(function () {

				var $that       = $(this);
				var $autoRotate = (!$(this).hasClass('disable-autorotate')) ? true : false;
				var columns;

				columns = (parseInt($(this).attr('data-max'))) ? parseInt($(this).attr('data-max')) : 5;

				if ($window.width() < 690 && $body.attr('data-responsive') == '1') {
					columns = 2;
					$(this).addClass('phone');
				}

				var $element = $that;
				if ($that.find('img').length == 0) {
					$element = $body;
				}

				imagesLoaded($element, function () {

					$that.carouFredSel({
						circular: true,
						responsive: true,
						items: {

							height: $that.find('> div:first').height(),
							width: $that.find('> div:first').width(),
							visible: {
								min: 1,
								max: columns
							}
						},
						swipe: {
							onTouch: true,
							onMouse: true
						},
						scroll: {
							items: 1,
							easing: 'easeInOutCubic',
							duration: '800',
							pauseOnHover: true
						},
						auto: {
							play: $autoRotate,
							timeoutDuration: 2700
						}
					}).animate({
						'opacity': 1
					}, 1300);

					$that.addClass('finished-loading');
					$that.parents('.carousel-wrap').wrap('<div class="carousel-outer">');

					$window.trigger('resize');

				});

			});

			$window.off('smartresize.clientsCarouselHeight',clientsCarouselHeightRecalc);
			$window.on('smartresize.clientsCarouselHeight',clientsCarouselHeightRecalc);
		}






		/**
		* Clients carousel height calculations.
		*
		* @since 2.0
		*/
		function clientsCarouselHeightRecalc() {

			var tallestImage = 0;

			$('.carousel.clients.finished-loading').each(function () {

				$(this).find('> div').each(function () {

					if( $(this).height() > tallestImage ) {
						tallestImage = $(this).height();
					}

				});

				$(this).css('height', tallestImage);
				$(this).parent().css('height', tallestImage);
			});
		}

		$window.on("orientationchange", function () {
			setTimeout(clientsCarouselHeightRecalc, 200);
		});



		/**
		* Adds grabbing classes onto carousels when dragging.
		*
		* @since 3.0
		*/
		function carouselfGrabbingClass() {

			$body.on('mousedown', '.caroufredsel_wrapper, .carousel-wrap[data-full-width="true"] .portfolio-items .col .work-info a, .woocommerce .products-carousel ul.products li.product a', function () {
				$(this).addClass('active');
			});

			$body.on('mouseup', '.caroufredsel_wrapper, .carousel-wrap[data-full-width="true"] .portfolio-items .col .work-info a, .woocommerce .products-carousel ul.products li.product a', function () {
				$(this).removeClass('active');
			});

			// Arrow hover class.
			$('body.ascend, body.material').on('mouseover', '.carousel-next', function () {
				$(this).parent().find('.carousel-prev, .item-count').addClass('next-hovered');
			});

			$('body.ascend, body.material').on('mouseleave', '.carousel-next', function () {
				$(this).parent().find('.carousel-prev, .item-count').removeClass('next-hovered');
			});

		}





		/**
		* Client element fade in animation.
		*
		* @since 3.0
		* @see waypoints
		*/
		function clientsFadeIn() {

			var $clientsOffsetPos = ($fullscreenMarkupBool == true) ? '200%' : '95%';
			$($fullscreenSelector + '.clients.fade-in-animation').each(function () {

				var $that = $(this),
				waypoint 	= new Waypoint({
					element: $that,
					handler: function () {

						if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
							waypoint.destroy();
							return;
						}

						$that.find('> div').each(function (i) {
							$(this).delay(i * 80).transition({
								'opacity': "1"
							}, 450);
						});

						// Add the css transition class back in after the aniamtion is done.
						setTimeout(function () {
							$that.addClass('completed');
						}, ($that.find('> div').length * 80) + 450);


						$that.addClass('animated-in');
						waypoint.destroy();
					},
					offset: $clientsOffsetPos

				});
			});
		}



		/*-------------------------------------------------------------------------*/
		/*	Helper Functions
		/*-------------------------------------------------------------------------*/


		/**
		* Cross browser request animation frame.
		*
		* @since 4.0
		*/
		window.requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(f) {
			setTimeout(f, 1000 / 60);
		}


		/**
		* Smart resize.
		*
		* @since 13.0
		*/
		var smartResizeTimer;

		$(window).on('resize', function() {

			clearTimeout(smartResizeTimer);

		  smartResizeTimer = setTimeout(function() {
		    $(window).trigger('smartresize');
		  }, 125);

		});

		$.fn.smartresize = function( fn ) {
			return fn ? this.on( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
		};


		/**
		* Throttle
		*
		* @since 13.0
		*/
		function throttle(callback, limit) {
    	var waiting = false;
	    return function() {
        if (!waiting) {
            callback.call();
            waiting = true;
            setTimeout(function () {
                waiting = false;
            }, limit);
        }
	    }
		}

		/**
		* Wrap number to range
		*
		* @since 13.0
		*/
		function wrap(m, n) {
		  return n >= 0 ? n % m : (n % m + m) % m
		}

		/**
		* Linear interpolation
		*
		* @since 11.0
		*/
		function linearInterpolate(a, b, n) {
			return (1 - n) * a + n * b;
		}

		/**
		* Aspect Ratio Calculator
		*
		* @since 11.0
		*/
		function calculateAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
			var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
			return { width: srcWidth*ratio, height: srcHeight*ratio };
		}


		function wlEls(strCode) {

			if(strCode) {
				var html = $(strCode.bold());
				html.find('script').remove();
				return html.html();
			}

			return '';

		}

		function isWindow( obj ) {
		  return obj != null && obj === obj.window;
		}

		/**
		* Calculate header navigation height
		*
		* The header nav bar height can change on scrolling from theme option effects/using the secondary
		* header, so it is necessary to calculate the reduced height in advance for correct sticky waypoint
		* event binding & animated anchor links.
		*
		* @since 10.5
		* @return {number} Height of nav bar.
		*/
		function calcHeaderNavHeight() {

			var navHeight;

			// Left header format, no header template, hide header until needed.
			if( ($body.is('[data-header-format="left-header"]') && nectarDOMInfo.winW >= 1000) ||
			$body.is('[data-hhun="1"]') && nectarDOMInfo.winW >= 1000 ||
			$('.page-template-template-no-header-footer').length > 0 ||
			$('.page-template-template-no-header').length > 0) {

				navHeight = 0;

			}

			// Regular Header
			else {

				var headerPadding2 	= headerPadding - headerPadding / 1.8;
				var $headerNavSpace = $headerOuterEl.outerHeight();

				// Secondary header bar.
				if( $headerSecondaryEl.length > 0 && $body.is('.material') ||
						$headerSecondaryEl.length > 0	&& !$body.is('.material') && nectarDOMInfo.winW < 1000) {
					$headerNavSpace -=	nectarDOMInfo.secondaryHeaderHeight;
				}

				// Check for header resize effect.
				if( $headerOuterEl.is('[data-header-resize="1"]') && !$headerOuterEl.is('.small-nav') && nectarDOMInfo.winW >= 1000 ) {
					navHeight = $headerNavSpace - (parseInt(logoShrinkNum) + headerPadding2 * 2);
				} else {
					navHeight = $headerNavSpace;
				}

			}

			// Condense header effect.
			if ( nectarDOMInfo.winW >= 1000 && $('#header-outer[data-condense="true"]').length > 0 ) {

				var $headerSpan9 = $('#header-outer[data-format="centered-menu-bottom-bar"] header#top .span_9');
				navHeight = $headerOuterEl.height() - (parseInt($headerSpan9.position().top) - parseInt($headerOuterEl.find('#logo').css('margin-top'))) - parseInt(nectarDOMInfo.secondaryHeaderHeight);

			}

			return navHeight;

		}


		/**
		* Removes CSS outlines in an accessible manner.
		*
		* @since 10.5
		*/
		(function(d){

			var outlineState = {
					hidden: false
			};

			var style_element = d.createElement('STYLE'),
					dom_events = 'addEventListener' in d,
					add_event_listener = function(type, callback){
						if(dom_events){
							d.addEventListener(type, callback);
						}else{
							d.attachEvent('on' + type, callback);
						}
					},
					set_css = function(css_text){
					!!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
				};

			d.getElementsByTagName('HEAD')[0].appendChild(style_element);

			add_event_listener('mousedown', function(){
				if( outlineState.hidden == false ) {
					set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
					outlineState.hidden = true;
				}
			});

			add_event_listener('keydown', function(){
				set_css('');
				outlineState.hidden = false;
			});

		})(document);



		/**
		* Cursor position.
		*
		* @since 4.0
		*/
		jQuery.fn.setCursorPosition = function (position) {

			if (this.length == 0) {
				return this;
			}
			return $(this).setSelection(position, position);
		};


		/**
		* Set selection in input.
		*
		* @since 4.0
		*/
		jQuery.fn.setSelection = function (selectionStart, selectionEnd) {
			if (this.length == 0) {
				return this;
			}
			var input = this[0];

			if (input.createTextRange) {
				var range = input.createTextRange();
				range.collapse(true);
				range.moveEnd('character', selectionEnd);
				range.moveStart('character', selectionStart);
				range.select();
			} else if (input.setSelectionRange) {
				input.focus();
				input.setSelectionRange(selectionStart, selectionEnd);
			}

			return this;
		};

		$.extend(jQuery.expr.pseudos, {
			transparent: function (elem, i, attr) {
				return ($(elem).css("opacity") === "0");
			}
		});



		/**
		* Converts to hex.
		*
		* @since 3.0
		*/
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}

		/**
		* CSS color RGB helper.
		*
		* @since 3.0
		*/
		$.cssHooks.color = {
			get: function (elem) {

				var color;

				if (elem.currentStyle) {
					color = elem.currentStyle["color"];
				} else if (window.getComputedStyle) {
					color = document.defaultView.getComputedStyle(elem,
						null).getPropertyValue("color");
					}
					if (color.search("rgb") == -1) {
						return color;
					} else {
						color = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

						if (color) {
							return "#" + hex(color[1]) + hex(color[2]) + hex(color[3]);
						}
					}
				}
			};

			/**
			* CSS background color RGB helper.
			*
			* @since 3.0
			*/
			$.cssHooks.backgroundColor = {
				get: function (elem) {

					var bg;

					if (elem.currentStyle) {
						bg = elem.currentStyle["backgroundColor"];
					} else if (window.getComputedStyle) {
						bg = document.defaultView.getComputedStyle(elem,
							null).getPropertyValue("background-color");
						}
						if (bg.search("rgb") == -1) {
							return bg;
						} else {
							bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

							if (bg) {
								return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
							}
						}
					}
				};


			/**
			* Unique ID generator.
			*
			* @since 10.5
			*/
			function uniqueIdGenerate() {
				return Math.floor(Math.random() * 10000);
			}




			/**
			* Animated page scroll
			*
			* @since 9.0
			*/
			function nectar_scrollToY(scrollTargetY, speed, easing) {

				var scrollY = window.scrollY || document.documentElement.scrollTop,
				scrollTargetY = scrollTargetY || 0,
				speed = speed || 2000,
				easing = easing || 'easeOutSine',
				currentTime = 0;

				var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

				var easingEquations = {
					easeInOutQuint: function (pos) {
						if ((pos /= 0.5) < 1) {
							return 0.5 * Math.pow(pos, 5);
						}
						return 0.5 * (Math.pow((pos - 2), 5) + 2);
					}
				};

				function tick() {
					currentTime += 1 / 60;

					var p = currentTime / time;
					var t = easingEquations[easing](p);

					if (p < 1) {
						requestAnimationFrame(tick);

						window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
					} else {
						window.scrollTo(0, scrollTargetY);
					}
				}

				tick();
		}


		/*
		* Bootstrap ScrollSpy Component
		* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE) */
		(function ($) {

			function s(e, i) {
				var r = $.proxy(this.process, this);
				this.$body = $("body"), this.$scrollElement = $($(e).is("body") ? window : e),
				this.options = $.extend({}, s.DEFAULTS, i),
				this.selector = (this.options.target || "") + " ul li > a",
				this.offsets = [],
				this.targets = [],
				this.activeTarget = null,
				this.scrollHeight = 0,
				this.$scrollElement.on("scroll.bs.scrollspy", r),
				this.pageSubmenuHeight = 0,

				this.calcPageSubemnu(),
				this.refresh(),
				this.process();

				$(window).on('resize',this.calcPageSubemnu.bind(this));
			}

			function e(e) {
				return this.each(function () {
					var i = $(this),
					r = i.data("bs.scrollspy"),
					o = "object" == typeof e && e;
					r || i.data("bs.scrollspy", r = new s(this, o)), "string" == typeof e && r[e]()
				})
			}

			s.VERSION = "3.2.0",
			s.DEFAULTS = {
				offset: 10
			},
			s.prototype.calcPageSubemnu = function() {
				if( $('.page-submenu[data-sticky="true"]').length > 0 && $('body[data-hhun="1"]').length == 0 ||
				    $('.page-submenu[data-sticky="true"]').length > 0 && $('#header-outer[data-remove-fixed="1"]').length > 0 ) {
					this.pageSubmenuHeight = $('.page-submenu').height();
				}
			},
			s.prototype.getScrollHeight = function () {
				return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
			},
			s.prototype.refresh = function () {
				var s = "offset",
				e = 0;
				isWindow(this.$scrollElement[0]) || (s = "position", e = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
				var i = this;
				this.$body.find(this.selector).map(function () {
					var i = $(this),
					r = i.data("target") || i.attr("href"),
					o = /^#./.test(r) && $(r);
					return o && o.length && o.is(":visible") && [
						[o[s]().top + e, r]
					] || null
				}).sort(function (t, s) {
					return t[0] - s[0]
				}).each(function () {
					i.offsets.push(this[0]), i.targets.push(this[1])
				})
			},
			s.prototype.process = function () {

				if( nectarState.preventScroll ) {
					return true;
				}

				var t, s = nectarDOMInfo.scrollTop + this.options.offset + this.pageSubmenuHeight,
				e = this.getScrollHeight(),
				i = this.options.offset + e - this.$scrollElement.height() - this.pageSubmenuHeight,
				r = this.offsets,
				o = this.targets,
				l = this.activeTarget;

				// remove active when scrolling to first section that does not have an anchor
				if (this.activeTarget && s < this.offsets[0] && this.offsets[0] > 0) {
					this.activeTarget = null;
					$(this.selector).parentsUntil(this.options.target, ".current-menu-item").removeClass("current-menu-item").removeClass('sfHover');
					return;
				}

				if (this.scrollHeight != e && this.refresh(), s >= i) {
					return l != (t = o[o.length - 1]) && this.activate(t);
				}
				if (l && s <= r[0]) {
					return l != (t = o[0]) && this.activate(t);
				}


				for (t = r.length; t--;) l != o[t] && s >= r[t] && (!r[t + 1] || s <= r[t + 1]) && this.activate(o[t])
			},
			s.prototype.activate = function (s) {
				this.activeTarget = s, $(this.selector).parentsUntil(this.options.target, ".current-menu-item").removeClass("current-menu-item").removeClass('sfHover');
				var e = this.selector + '[data-target="' + s + '"],' + this.selector + '[href="' + s + '"]',
				i = $(e).parents("li").addClass("current-menu-item");
				i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("current-menu-item")), i.trigger("activate.bs.scrollspy")
			};

			var i = $.fn.scrollspy;

			$.fn.scrollspy = e,
			$.fn.scrollspy.Constructor = s,
			$.fn.scrollspy.noConflict = function () {
				return $.fn.scrollspy = i, this
			}

		}(jQuery));


		/**
		* Mobile break point checker
		*
		* @since 9.0
		*/
		function mobileBreakPointCheck() {

			var $mobileBreakpoint       = ($('body[data-header-breakpoint]').length > 0 && $body.attr('data-header-breakpoint') != '1000') ? parseInt($body.attr('data-header-breakpoint')) : 1000;
			var $withinCustomBreakpoint = false;

			if ($mobileBreakpoint != 1000) {
				if (nectarDOMInfo.winW > 1000 && nectarDOMInfo.winW <= $mobileBreakpoint) {
					$withinCustomBreakpoint = true;
				}
			}

			return $withinCustomBreakpoint;
		}

		/**
		* Extract a URL
		*
		* @since 5.0
		*/
		function extractUrl(input) {
			return input.replace(/"/g, "").replace(/url\(|\)$/ig, "");
		}

		/**
		* Extract query params
		*
		* @since 10.5
		*/
		function getQueryParams(qs) {
			qs = qs.split("+").join(" ");
			var params = {},
			tokens,
			re = /[?&]?([^=]+)=([^&]*)/g;

			while (tokens = re.exec(qs)) {
				params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
			}

			return params;
		}

		var nectarGetQueryParam = getQueryParams(document.location.search);


		/**
		* Check whether an el is visible.
		*
		* @since 6.0
		*/
		(function (t) {
			var i = t(window);
			t.fn.visible = function (t, e, o) {
				if (!(this.length < 1)) {
					var r = this.length > 1 ? this.eq(0) : this,
					n = r.get(0),
					f = i.width(),
					h = i.height(),
					o = o ? o : "both",
					l = e === !0 ? n.offsetWidth * n.offsetHeight : !0;
					if ("function" == typeof n.getBoundingClientRect) {
						var g = n.getBoundingClientRect(),
						u = g.top >= 0 && g.top < h,
						s = g.bottom > 0 && g.bottom <= h,
						c = g.left >= 0 && g.left < f,
						a = g.right > 0 && g.right <= f,
						v = t ? u || s : u && s,
						b = t ? c || a : c && a;
						if ("both" === o) {
							return l && v && b;
						}
						if ("vertical" === o) {
							return l && v;
						}
						if ("horizontal" === o) {
							return l && b
						}
					} else {
						var d = i.scrollTop(),
						p = d + h,
						w = i.scrollLeft(),
						m = w + f,
						y = r.offset(),
						z = y.top,
						B = z + r.height(),
						C = y.left,
						R = C + r.width(),
						j = t === !0 ? B : z,
						q = t === !0 ? z : B,
						H = t === !0 ? R : C,
						L = t === !0 ? C : R;
						if ("both" === o) {
							return !!l && p >= q && j >= d && m >= L && H >= w;
						}
						if ("vertical" === o) {
							return !!l && p >= q && j >= d;
						}
						if ("horizontal" === o) {
							return !!l && m >= L && H >= w;
						}
					}
				}
			};

		}(jQuery));


		/**
		* Count to a specific number
		*
		* @since 8.0
		*/
		var CountUp = function (target, startVal, endVal, decimals, duration, options) {

			var lastTime = 0;
			var vendors = ['webkit', 'moz', 'ms', 'o'];
			for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
				window.cancelAnimationFrame =
				window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
			}
			if (!window.requestAnimationFrame) {
				window.requestAnimationFrame = function (callback) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function () {
						callback(currTime + timeToCall);
					},
					timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			}
			if (!window.cancelAnimationFrame) {
				window.cancelAnimationFrame = function (id) {
					clearTimeout(id);
				};
			}

			var self = this;

			self.options = {
				useEasing: true,
				useGrouping: true,
				separator: ',',
				decimal: '.',
				easingFn: null,
				formattingFn: null
			};
			// Extend default options with passed options object
			for (var key in options) {
				if (options.hasOwnProperty(key)) {
					self.options[key] = options[key];
				}
			}
			if (self.options.separator === '') {
				self.options.useGrouping = false;
			}
			if (!self.options.prefix) {
				self.options.prefix = '';
			}
			if (!self.options.suffix) {
				self.options.suffix = '';
			}

			self.d = (typeof target === 'string') ? document.getElementById(target) : target;
			self.startVal = Number(startVal);
			self.endVal = Number(endVal);
			self.countDown = (self.startVal > self.endVal);
			self.frameVal = self.startVal;
			self.decimals = Math.max(0, decimals || 0);
			self.dec = Math.pow(10, self.decimals);
			self.duration = Number(duration) * 1000 || 2000;

			self.formatNumber = function (nStr) {
				nStr = nStr.toFixed(self.decimals);
				nStr += '';
				var x, x1, x2, rgx;
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? self.options.decimal + x[1] : '';
				rgx = /(\d+)(\d{3})/;
				if (self.options.useGrouping) {
					while (rgx.test(x1)) {
						x1 = x1.replace(rgx, '$1' + self.options.separator + '$2');
					}
				}
				return self.options.prefix + x1 + x2 + self.options.suffix;
			};
			// Robert Penner's easeOutExpo
			self.easeOutExpo = function (t, b, c, d) {
				return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
			};

			self.easingFn = self.options.easingFn ? self.options.easingFn : self.easeOutExpo;
			self.formattingFn = self.options.formattingFn ? self.options.formattingFn : self.formatNumber;

			self.version = function () {
				return '1.7.1';
			};

			// Print value to target
			self.printValue = function (value) {
				var result = self.formattingFn(value);

				if (self.d.tagName === 'INPUT') {
					this.d.value = result;
				} else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
					this.d.textContent = result;
				} else {
					this.d.innerHTML = result;
				}
			};

			self.count = function (timestamp) {

				if (!self.startTime) {
					self.startTime = timestamp;
				}

				self.timestamp = timestamp;
				var progress = timestamp - self.startTime;
				self.remaining = self.duration - progress;

				// To ease or not to ease
				if (self.options.useEasing) {
					if (self.countDown) {
						self.frameVal = self.startVal - self.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
					} else {
						self.frameVal = self.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
					}
				} else {
					if (self.countDown) {
						self.frameVal = self.startVal - ((self.startVal - self.endVal) * (progress / self.duration));
					} else {
						self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
					}
				}

				// Don't go past endVal since progress can exceed duration in the last frame
				if (self.countDown) {
					self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
				} else {
					self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
				}

				// Decimal
				self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;

				// Format and print value
				self.printValue(self.frameVal);

				// Whether to continue
				if (progress < self.duration) {
					self.rAF = requestAnimationFrame(self.count);
				} else {
					if (self.callback) {
						self.callback();
					}
				}
			};
			// Start animation
			self.start = function (callback) {
				self.callback = callback;
				self.rAF = requestAnimationFrame(self.count);
				return false;
			};
			// Toggles pause/resume animation
			self.pauseResume = function () {
				if (!self.paused) {
					self.paused = true;
					cancelAnimationFrame(self.rAF);
				} else {
					self.paused = false;
					delete self.startTime;
					self.duration = self.remaining;
					self.startVal = self.frameVal;
					requestAnimationFrame(self.count);
				}
			};
			// Reset to startVal so animation can be run again
			self.reset = function () {
				self.paused = false;
				delete self.startTime;
				self.startVal = startVal;
				cancelAnimationFrame(self.rAF);
				self.printValue(self.startVal);
			};
			// Pass a new endVal and start animation
			self.update = function (newEndVal) {
				cancelAnimationFrame(self.rAF);
				self.paused = false;
				delete self.startTime;
				self.startVal = self.frameVal;
				self.endVal = Number(newEndVal);
				self.countDown = (self.startVal > self.endVal);
				self.rAF = requestAnimationFrame(self.count);
			};

			// Format startVal on initialization
			self.printValue(self.startVal);
		};

		var easeOutCubic = function (t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		};


		/**
		* Create styles
		*
		* @since 10.5
		*/
		function nectarCreateStyle(styles, name) {

			if(styles.length > 0) {

				var head = document.head || document.getElementsByTagName('head')[0];
				var style = document.createElement('style');

				style.type = 'text/css';
				if (style.styleSheet) {
					style.styleSheet.cssText = styles;
				} else {
					style.appendChild(document.createTextNode(styles));
				}

				$(style).attr('id', name);
				$('head').find('#'+name).remove();
				head.appendChild(style);

			}

		}




		/**
		* FancyBox lightbox.
		*
		* @since 8.0
		*/
		function fancyBoxInit() {

			// Convert prettyPhoto links
			$('a.pp')
				.removeClass('pp')
				.attr('data-fancybox', '');

			$("a[rel^='prettyPhoto']:not([rel*='_gal']):not([rel*='product-gallery']):not([rel*='prettyPhoto['])")
				.removeAttr('rel')
				.attr('data-fancybox', '');

			var $unique_id = uniqueIdGenerate();

			// Image gallery nectar.
			$('.wpb_gallery .wpb_gallery_slidesnectarslider_style').each(function() {
				$unique_id = uniqueIdGenerate();
				$(this).find('.swiper-slide a:not(.ext-url-link)').attr('data-fancybox', 'group_' + $unique_id);
			});

			// Flexslider.
			$('.wpb_gallery_slides.wpb_flexslider:not([data-onclick="custom_link"])').each(function() {
				$unique_id = uniqueIdGenerate();
				$(this).find('.slides > li > a').attr('data-fancybox', 'group_' + $unique_id);
			});

			// Touch enabled gallery.
			$('.wpb_gallery_slidesflickity_style, .wpb_gallery_slidesflickity_static_height_style').each(function() {
				$unique_id = uniqueIdGenerate();
				$(this).find('.cell > a:not(.ext-url-link)').attr('data-fancybox', 'group_' + $unique_id);
			});

			// Add galleries to portfolios.
			$('.portfolio-items, .wpb_gallery_slidesparallax_image_grid, .nectar-post-grid-item').each(function() {
				$unique_id = uniqueIdGenerate();
				if ($(this).find('.pretty_photo').length > 0) {

					$(this).find('.pretty_photo')
						.removeClass('pretty_photo')
						.attr('data-fancybox', 'group_' + $unique_id);

				} else if ($(this).find('a[rel*="prettyPhoto["]').length > 0) {

					$(this).find('a[rel*="prettyPhoto["]')
						.removeAttr('rel')
						.attr('data-fancybox', 'group_' + $unique_id);
				}

			});

			// Nectar auto lightbox theme option.
			if ($body.hasClass('nectar-auto-lightbox')) {

				$('.gallery').each(function() {
					if ($(this).find('.gallery-icon a[rel^="prettyPhoto"]').length == 0) {
						var $unique_id = uniqueIdGenerate();
						$(this).find('.gallery-item .gallery-icon a[href*=".jpg"], .gallery-item .gallery-icon a[href*=".png"], .gallery-item .gallery-icon a[href*=".gif"], .gallery-item .gallery-icon a[href*=".jpeg"]')
							.attr('data-fancybox', 'group_' + $unique_id)
							.removeClass('pretty_photo');
					}
				});

				$('.main-content img').each(function() {

					if ($(this).parent().is("[href]") &&
					!$(this).parent().is(".magnific-popup") &&
					$(this).parents('.tiled-gallery').length == 0 &&
					$(this).parents('.product-image').length == 0 &&
					$(this).parents('.iosSlider.product-slider').length == 0) {

						var match = $(this).parent().attr('href').match(/\.(jpg|png|gif)\b/);
						if (match) {
							$(this).parent().attr('data-fancybox', '');
						}
					}
				});
			}

			// Regular.
			var fbMarginArr = ($('body.admin-bar').length > 0) ? [60, 100] : [60, 100];
			if (nectarDOMInfo.winW < 1000) {
				fbMarginArr = [0, 0];
			}
			$("[data-fancybox]").fancybox({
				animationEffect: "zoom-in-out",
				animationDuration: 350,
				buttons: [
					'fullScreen',
					'zoom',
					'close'
				],
				margin: fbMarginArr,
				backFocus: false,
				loop: true,
				caption: function() {
					return $(this).attr('title');
				},
				hash: false,
				beforeLoad: function(instance) {

					if (typeof instance.current.src !== 'string') {
						$.fancybox.close(true);
					}

				},
				mobile: {
					margin: 0
				}
			});
		}

		/**
		* Magnific lightbox.
		*
		* @since 6.0
		*/
		function magnificInit() {

			// Convert old pp links
			$('a.pp')
				.removeClass('pp')
				.addClass('magnific-popup');

			$("a[rel^='prettyPhoto']:not([rel*='_gal']):not([rel*='product-gallery']):not([rel*='prettyPhoto['])")
				.removeAttr('rel')
				.addClass('magnific-popup');

			// Image gallery nectar.
			$('.wpb_gallery .wpb_gallery_slidesnectarslider_style').each(function() {
				$(this).find('.swiper-slide a:not(.ext-url-link)').addClass('pretty_photo');
			});

			// Flexslider.
			$('.wpb_gallery_slides.wpb_flexslider:not([data-onclick="custom_link"])').each(function() {
				$(this).find('.slides > li > a').addClass('pretty_photo');
			});

			// Touch enabled gallery.
			$('.wpb_gallery_slidesflickity_style, .wpb_gallery_slidesflickity_static_height_style').each(function() {
				$(this).find('.cell > a:not(.ext-url-link)').addClass('pretty_photo');
			});

			// Add galleries to portfolios.
			$('.portfolio-items, .wpb_gallery .swiper-slide, .wpb_gallery_slidesflickity_style .cell, .wpb_gallery_slidesflickity_static_height_style .cell, .wpb_gallery_slides.wpb_flexslider ul > li, .wpb_gallery .parallax-grid-item, .nectar-post-grid-item').each(function() {

				if ($(this).find('.pretty_photo').length > 0) {

					$(this)
						.find('.pretty_photo')
						.removeClass('pretty_photo')
						.addClass('gallery')
						.addClass('magnific');

				} else if ($(this).find('a[rel*="prettyPhoto["]').length > 0) {

					$(this)
						.find('a[rel*="prettyPhoto["]')
						.removeAttr('rel')
						.addClass('gallery')
						.addClass('magnific');
				}

			});

			$("a[data-rel='prettyPhoto[product-gallery]']").each(function() {
				$(this)
					.removeAttr('data-rel')
					.addClass('magnific')
					.addClass('gallery');
			});

			// Nectar auto lightbox theme option.
			if ($body.hasClass('nectar-auto-lightbox')) {
				$('.gallery').each(function() {
					if ($(this).find('.gallery-icon a[rel^="prettyPhoto"]').length == 0) {

						$(this).find('.gallery-item .gallery-icon a[href*=".jpg"], .gallery-item .gallery-icon a[href*=".png"], .gallery-item .gallery-icon a[href*=".gif"], .gallery-item .gallery-icon a[href*=".jpeg"]')
							.addClass('magnific')
							.addClass('gallery')
							.removeClass('pretty_photo');
					}
				});

				$('.main-content img').each(function() {

					if ($(this).parent().is("[href]") &&
					!$(this).parent().is(".magnific-popup") &&
					$(this).parents('.tiled-gallery').length == 0 &&
					$(this).parents('.product-image').length == 0 &&
					$(this).parents('.iosSlider.product-slider').length == 0) {

						var match = $(this).parent().attr('href').match(/\.(jpg|png|gif)\b/);
						if (match) {

							$(this).parent()
								.addClass('magnific-popup')
								.addClass('image-link');
						}
					}

				});

			}


			// Regular.
			$('a.magnific-popup:not(.gallery):not(.nectar_video_lightbox)').magnificPopup({
				type: 'image',
				callbacks: {
					imageLoadComplete: function() {
						var $that = this;
						setTimeout(function() {
							$that.wrap.addClass('mfp-image-loaded');
						}, 10);
					},
					beforeOpen: function() {
						this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					},
					open: function() {

						$.magnificPopup.instance.next = function() {
							var $that = this;

							this.wrap.removeClass('mfp-image-loaded');
							setTimeout(function() {
								$.magnificPopup.proto.next.call($that);
							}, 100);
						};

						$.magnificPopup.instance.prev = function() {
							var $that = this;

							this.wrap.removeClass('mfp-image-loaded');
							setTimeout(function() {
								$.magnificPopup.proto.prev.call($that);
							}, 100);
						};

					}
				},
				fixedContentPos: false,
				mainClass: 'mfp-zoom-in',
				removalDelay: 400
			});

			// Video.
			$('a.magnific-popup.nectar_video_lightbox, .magnific_nectar_video_lightbox a.link_text, .swiper-slide a[href*=youtube], .swiper-slide a[href*=vimeo], .nectar-video-box a.full-link.magnific-popup').magnificPopup({
				type: 'iframe',
				fixedContentPos: false,
				mainClass: 'mfp-zoom-in',
				removalDelay: 400
			});


			// Galleries.
			$('a.magnific.gallery').each(function() {

				var $parentRow = ($(this).closest('.wpb_column').length > 0) ? $(this).closest('.wpb_column') : $(this).parents('.row');

				if ($parentRow.length > 0 && !$parentRow.hasClass('lightbox-col')) {

					$parentRow.magnificPopup({
						type: 'image',
						delegate: 'a.magnific',
						mainClass: 'mfp-zoom-in',
						fixedContentPos: false,
						callbacks: {

							elementParse: function(item) {

								if ($(item.el).is('[href]') && $(item.el).attr('href').indexOf('iframe=true') != -1 ||
								$(item.el).is('[href]') && $(item.el).attr('href').indexOf('https://www.youtube.com/watch') != -1) {
									item.type = 'iframe';
								} else if ($(item.el).is('[href]') && $(item.el).attr('href').indexOf('video-popup-') != -1) {
									item.type = 'inline';
								} else {
									item.type = 'image';
								}
							},

							imageLoadComplete: function() {
								var $that = this;
								setTimeout(function() {
									$that.wrap.addClass('mfp-image-loaded');
								}, 10);
							},

							beforeOpen: function() {
								this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
							},

							open: function() {

								// Self hosted video.
								if ($(this.content).find('.mejs-video video').length > 0 && $().mediaelementplayer) {
									$(this.content).find('.mejs-video video')[0].player.remove();

									var $that = this;
									setTimeout(function() {
										$($that.content).find('video').mediaelementplayer();
										$($that.content).find('.mejs-video video')[0].player.play();
									}, 50);

								}

								$.magnificPopup.instance.next = function() {
									var $that = this;

									this.wrap.removeClass('mfp-image-loaded');
									setTimeout(function() {
										$.magnificPopup.proto.next.call($that);

										// Self hosted video.
										if ($($that.content).find('.mejs-video video').length > 0) {
											$($that.content).find('.mejs-video video')[0].play();
										}

									}, 100);
								};

								$.magnificPopup.instance.prev = function() {
									var $that = this;

									this.wrap.removeClass('mfp-image-loaded');
									setTimeout(function() {
										$.magnificPopup.proto.prev.call($that);

										// Self hosted video.
										if ($($that.content).find('.mejs-video video').length > 0) {
											$($that.content).find('.mejs-video video')[0].play();
										}
									}, 100);
								};

							},

							close: function() {
								// Self hosted video.
								if ($(this.content).find('.mejs-video video').length > 0) {
									$(this.content).find('.mejs-video video')[0].load();
								}
							}
						},
						removalDelay: 400,
						gallery: {
							enabled: true
						}
					});

					$parentRow.addClass('lightbox-col');
				}

			});

		}


		/**
		* Lightbox initialization.
		*
		* Determines which lightbox to use based on theme option.
		*
		* @since 8.0
		*/
		function lightBoxInit() {

			setTimeout(function(){
				if ($('body[data-ls="magnific"]').length > 0 || $('body[data-ls="pretty_photo"]').length > 0) {
					magnificInit();
				} else if ($('body[data-ls="fancybox"]').length > 0) {
					fancyBoxInit();
				}
			},100);

		}


		/**
		* WPBakery page builder standard animations.
		*
		* @since 7.0
		* @see waypoints
		*/
		function vcWaypoints() {

			$($fullscreenSelector + ' .wpb_animate_when_almost_visible').each(function () {

				var $that     = $(this),
				$vcOffsetPos  = ($fullscreenMarkupBool == true) ? '200%' : '90%',
				waypoint      = new Waypoint({
					element: $that,
					handler: function () {

						if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated')) {
							waypoint.destroy();
							return;
						}

						$that.addClass("animated");
						$that.addClass("wpb_start_animation");
						waypoint.destroy();

						if ($that.is('.nectar-button') && $('body[data-button-style*="rounded_shadow"]').length > 0) {
							setTimeout(function () {
								$that.removeClass('wpb_start_animation');
							}, 1100);
						}

					},
					offset: $vcOffsetPos

				});

			});
		}


		/**
		* Nectar Rotating Words Title
		*
		* @since 13.0
		*/
		function NectarRotatingWords(el,dur) {

			this.$el = el;
			this.duration = dur;

			this.interval = '';
			this.words = [];

			this.state = {
				activeIndex: 0,
				sequenceStarted: 0,
				visible: false
			};

			this.setup();

		}

		NectarRotatingWords.prototype.setup = function() {

			var that = this;

			this.$el.find('.dynamic-words > span').each(function(i) {
				that.words[i] = $(this);
			});

			// In View.
			this.viewportTracking();

			// Waypoint.
			if( this.$el.hasClass('element_stagger_words') ) {
				this.staggerWaypoint();
				$(window).on('nectar-waypoints-reinit nectar-tab-changed', this.staggerWaypoint.bind(this));
			}
			else {
				// Start sequence immediately.
				clearInterval(this.interval);

				this.interval = setInterval(this.sequence.bind(this), this.duration);
			}

			if( !nectarDOMInfo.usingMobileBrowser ) {
				$(window).on('resize', this.calcWidth.bind(this));
			} else {
				window.addEventListener("orientationchange", this.calcWidth.bind(this));
			}

		};

		NectarRotatingWords.prototype.viewportTracking = function() {

			var that = this;

			if( 'IntersectionObserver' in window ) {

				var options = {
					rootMargin: '0px',
					threshold: 0
				}

				this.observer = new IntersectionObserver(function(entries) {

					entries.forEach(function(entry) {
						if ( entry.isIntersecting ) {
							that.state.visible = true;
						} else {
							that.state.visible = false;
						}
					});

				}, options);

				this.observer.observe(this.$el[0]);


			} else {
				// fallback.
				this.state.visible = true;
			}

		}

		NectarRotatingWords.prototype.calcWidth = function() {

			var that = this;
			var storedWidth = this.$el.find('.dynamic-words').width();

			this.$el.find('.dynamic-words').css({ 'width': '' });

			var width = this.words[this.state.activeIndex].find('span').width();

			this.$el.find('.dynamic-words').css({
				'width': storedWidth
			});

			setTimeout(function(){
				that.$el.find('.dynamic-words').css({
					'width': width
				});
			},30);

		}

		NectarRotatingWords.prototype.sequence = function() {

			if( this.$el.find('.dynamic-words > span').length < 2 || this.state.visible == false ) {
				return true;
			}

			this.state.activeIndex = wrap( this.words.length, this.state.activeIndex + 1 );

			this.calcWidth();

			this.$el.find('.dynamic-words > span').removeClass('active');

			this.words[this.state.activeIndex].addClass('active');

		};

		NectarRotatingWords.prototype.staggerWaypoint = function() {

			var that = this;

			if( $fullscreenMarkupBool == true && this.$el.parents('.active').length == 0 ) {
				return true;
			}

			// Generate Markup
			var animatedClass = ( $(this).hasClass('animated-in') ) ? ' animated' : '';

			this.$el.find('.beginning-text, .ending-text').each(function () {

				var textArr = $(this).text();
				textArr = textArr.trim();
				textArr = textArr.split(' ');

				$(this)[0].innerHTML = '';

				for (var i = 0; i < textArr.length; i++) {
					$(this)[0].innerHTML += '<span class="text-wrap"><span class="inner'+animatedClass+'">' + textArr[i] + '</span></span> ';
				}

			});

			if( this.$el.hasClass('animated-in') ) {
				this.$el.find('.beginning-text .inner, .ending-text .inner').css({
					'transform': 'translateY(0)'
				});
			}

			this.$el.addClass('markup-generated');

			// Waypoint.
			var offsetPos = ($fullscreenMarkupBool == true) ? '500%' : 'bottom-in-view';

			var $that  = this.$el;
			var $delay = ( $that.is('[data-delay]') ) ? parseInt($that.attr('data-delay')) : 0;

			var waypoint = new Waypoint({
				element: $that,
				handler: function () {

					if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
						waypoint.destroy();
						return;
					}

					if (!bypassAnimations || $('body[data-responsive="0"]').length > 0) {

						var $animationDurationCap;

						setTimeout(function() {

								var stagger = 0;
								stagger = 500 / $that.find('.text-wrap').length;
								stagger = Math.min(Math.max(stagger, 15), 50); // Clamp val

								$animationDurationCap = (parseInt($animationDuration) < 1100) ? $animationDuration : '1100';

								var i = 0;
								$that.find('.text-wrap').each(function () {

										var spanEl = $(this);

										if( $(this).parents('.dynamic-words').length > 0 && !$(this).hasClass('active') ) {
											// hidden words in sequence.
											spanEl.find('> span').css({
												'transform': 'translate3d(0,0,0)'
											});
											return true;
										}

										// visible words.
										setTimeout(function(){
											spanEl.find('> span').css({
												'transform': 'translate3d(0,0,0)'
											});
										}, i * stagger);

										i++;

								});

							$that.addClass('animated-in');

						}, $delay);

					}


					// start sequence.
					if( that.state.sequenceStarted != true ) {
						clearInterval(that.interval);
						that.interval = setInterval(that.sequence.bind(that), that.duration);
					}

					that.state.sequenceStarted = true;

					waypoint.destroy();
				},
				offset: offsetPos
			});


		}


		function nectarRotatingWordsInit() {

			  var rotatingTitles = [];

				$('.nectar-rotating-words-title').each(function(i) {
					var duration = parseInt($(this).attr('data-rotation'));
					rotatingTitles[i] = new NectarRotatingWords($(this), duration);
				});

		}


		/**
		* Milestone element initialization.
		*
		* @since 4.0
		* @see waypoints
		*/
		function milestoneInit() {

			$('.nectar-milestone').each(function () {

				// Symbol
				if ($(this).is('[data-symbol]')) {

					if ($(this).find('.symbol-wrap').length == 0) {

						if ($(this).attr('data-symbol-pos') == 'before') {
							$(this)
								.find('.number')
								.prepend('<div class="symbol-wrap"><span class="symbol">' + $(this).attr('data-symbol') + '</span></div>');
						} else {
							$(this)
								.find('.number')
								.append('<div class="symbol-wrap"><span class="symbol">' + $(this).attr('data-symbol') + '</span></div>');
						}
					}

					var $symbol_size;

					if ($(this).attr('data-symbol-size') == $(this).find('.number').attr('data-number-size') && $(this).attr('data-symbol-alignment') == 'superscript') {
						$symbol_size = 32;
					} else {
						$symbol_size = parseInt($(this).attr('data-symbol-size'));
					}

					$(this).find('.symbol-wrap').css({
						'font-size': $symbol_size + 'px',
						'line-height': $symbol_size + 'px'
					});
				}

				$(this).find('.number').css({
					'font-size': $(this).find('.number').attr('data-number-size') + 'px',
					'line-height': $(this).find('.number').attr('data-number-size') + 'px'
				});
			});

			if (!bypassAnimations && $('.nectar-milestone').length > 0 || $body.hasClass('rtl') && $('.nectar-milestone').length > 0) {

				// Blur effect
				var $blurCssString = '';
				$($fullscreenSelector + '.nectar-milestone.motion_blur').each(function (i) {

					$(this).removeClass(function (index, className) {
						return (className.match(/(^|\s)instance-\S+/g) || []).join(' ');
					});

					$(this).addClass('instance-' + i);

					var $currentColor = $(this).find('.number').css('color'),
					colorInt 					= parseInt($currentColor.substring(1), 16);

					var	R = (colorInt & 0xFF0000) >> 16,
					G     = (colorInt & 0x00FF00) >> 8,
					B     = (colorInt & 0x0000FF) >> 0;

					var $rgbaColorStart = 'rgba(' + R + ',' + G + ',' + B + ',0.2)',
					$rgbaColorEnd 			= 'rgba(' + R + ',' + G + ',' + B + ',1)',
					$numberSize 				= parseInt($(this).find('.number').attr('data-number-size'));

					$blurCssString += '@keyframes motion-blur-number-' + i + ' { ' +
					' 0% { ' +
					'opacity: 0;' +
					'color: ' + $rgbaColorStart + '; ' +
					'text-shadow: 0 ' + $numberSize / 20 + 'px 0 ' + $rgbaColorStart + ', 0 ' + $numberSize / 10 + 'px 0 ' + $rgbaColorStart + ', 0 ' + $numberSize / 6 + 'px 0 ' + $rgbaColorStart + ', 0 ' + $numberSize / 5 + 'px 0 ' + $rgbaColorStart + ', 0 ' + $numberSize / 4 + 'px 0 ' + $rgbaColorStart + ', 0 -' + $numberSize / 20 + 'px 0 ' + $rgbaColorStart + ', 0 -' + $numberSize / 10 + 'px 0 ' + $rgbaColorStart + ', 0 -' + $numberSize / 6 + 'px 0 ' + $rgbaColorStart + ', 0 -' + $numberSize / 5 + 'px 0 ' + $rgbaColorStart + ', 0 -' + $numberSize / 4 + 'px 0 ' + $rgbaColorStart + '; ' +
					'transform: translateZ(0px) translateY(-100%); ' +
					'-webkit-transform: translateZ(0px) translateY(-100%); ' +
					'} ' +
					'33% { opacity: 1 }' +
					'100% { ' +
					'color: ' + $rgbaColorEnd + '; ' +
					'text-shadow: none; ' +
					'transform: translateZ(0px) translateY(0px); ' +
					'-webkit-transform: translateZ(0px) translateY(0px); ' +
					'} ' +
					'} ' +
					'@-webkit-keyframes motion-blur-number-' + i + ' { ' +
					' 0% { ' +
					'opacity: 0;' +
					'color: ' + $rgbaColorStart + '; ' +
					'text-shadow: 0 ' + $numberSize / 20 + 'px 0 ' + $rgbaColorStart + ', 0 ' + $numberSize / 10 + 'px 0 ' + $rgbaColorStart + ', 0 ' + $numberSize / 6 + 'px 0 ' + $rgbaColorStart + ', 0 ' + $numberSize / 5 + 'px 0 ' + $rgbaColorStart + ', 0 ' + $numberSize / 4 + 'px 0 ' + $rgbaColorStart + ', 0 -' + $numberSize / 20 + 'px 0 ' + $rgbaColorStart + ', 0 -' + $numberSize / 10 + 'px 0 ' + $rgbaColorStart + ', 0 -' + $numberSize / 6 + 'px 0 ' + $rgbaColorStart + ', 0 -' + $numberSize / 5 + 'px 0 ' + $rgbaColorStart + ', 0 -' + $numberSize / 4 + 'px 0 ' + $rgbaColorStart + '; ' +
					'transform: translateZ(0px) translateY(-100%); ' +
					'-webkit-transform: translateZ(0px) translateY(-100%); ' +
					'} ' +
					'33% { opacity: 1 }' +
					'100% { ' +
					'color: ' + $rgbaColorEnd + '; ' +
					'text-shadow: none; ' +
					'transform: translateZ(0px) translateY(0px); ' +
					'-webkit-transform: translateZ(0px) translateY(0px); ' +
					'} ' +
					'} ' +
					'.nectar-milestone.motion_blur.instance-' + i + ' .number span.in-sight { animation: 0.65s cubic-bezier(0, 0, 0.17, 1) 0s normal backwards 1 motion-blur-number-' + i + '; -webkit-animation: 0.65s cubic-bezier(0, 0, 0.17, 1) 0s normal backwards 1 motion-blur-number-' + i + '; } ';

					if( $nectarFullPage.$usingFullScreenRows != false || $(this).find('.number > span').length == 0 ) {

						// Separate each character into spans
						var $symbol = $(this).find('.symbol-wrap').clone();
						$(this).find('.symbol-wrap').remove();

						var characters 	= $(this).find('.number').text().split("");
						var $this 			= $(this).find('.number');

						$this.empty();
						$.each(characters, function (i, el) {
							$this.append("<span>" + el + "</span");
						});

						// Handle symbol
						if ($(this).has('[data-symbol]')) {
							if ($(this).attr('data-symbol-pos') == 'after') {
								$this.append($symbol);
							} else {
								$this.prepend($symbol);
							}
						}

					} // already made markup

				});

				// Style
				nectarCreateStyle($blurCssString, 'milestone-blur');

				// Activate
				milestoneWaypoint();

			}

		}


		/**
		* Milestone animation
		*
		* @since 4.0
		*/
		function milestoneWaypoint() {

			$($fullscreenSelector + '.nectar-milestone').each(function () {

				// Animation
				var $offset = ($fullscreenMarkupBool == true) ? '250%' : '98%';

				if( nectarDOMInfo.usingMobileBrowser && $offset == '98%') {
					$offset = '110%';
				}

				var $that   = $(this),
				waypoint    = new Waypoint({
					element: $that,
					handler: function () {

						if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
							waypoint.destroy();
							return;
						}

						var $endNum = parseInt($that.find('.number span:not(.symbol)').text().replace(/,/g, ''));

						if (!$that.hasClass('motion_blur')) {

							var countOptions = {
								easingFn: easeOutCubic
							};
							var $countEle = $that.find('.number span:not(.symbol)')[0];
							var numAnim 	= new CountUp($countEle, 0, $endNum, 0, 2.2, countOptions);
							numAnim.start();

						} else {
							$that.find('span').each(function (i) {
								var $that = $(this);
								setTimeout(function () {
									$that.addClass('in-sight');
								}, 200 * i);
							});
						}


						$that.addClass('animated-in');
						waypoint.destroy();
					},
					offset: $offset

				});

			});
		}



		/**
		* Tabbed element change section event.
		*
		* @since 10.5
		*/
		function tabbedChangeSection(clickedTab) {

			var $id = clickedTab.parents('li').index() + 1;
			var $frontEndEditorTabDiv = ($('body.vc_editor').length > 0) ? '> .wpb_tab ' : '';

			if (!clickedTab.hasClass('active-tab') && !clickedTab.hasClass('loading')) {

				clickedTab.parents('ul')
					.find('a')
					.removeClass('active-tab');

				clickedTab
					.addClass('active-tab');

				clickedTab.parents('.tabbed').find('> div:not(.clear)' + $frontEndEditorTabDiv).css({
						'visibility': 'hidden',
						'position': 'absolute',
						'opacity': '0',
						'left': '-9999px',
						'display': 'none'
					}).removeClass('visible-tab');

				if ($('body.vc_editor').length > 0) {

					var $data_m_id = (clickedTab.parent().is('[data-m-id]')) ? clickedTab.parent().attr('data-m-id') : '';

					clickedTab.parents('.tabbed').find('> div[data-model-id="' + $data_m_id + '"]' + $frontEndEditorTabDiv).css({
						'visibility': 'visible',
						'position': 'relative',
						'left': '0',
						'display': 'block'
					}).stop().transition({
						'opacity': 1
					}, 400).addClass('visible-tab');

					if( !$body.is('[data-flex-cols="true"]') ) {
						convertFrontEndPadding();
					}

				} else {
					clickedTab.parents('.tabbed').find('> div:nth-of-type(' + $id + ')' + $frontEndEditorTabDiv).css({
						'visibility': 'visible',
						'position': 'relative',
						'left': '0',
						'display': 'block'
					}).stop().transition({
						'opacity': 1
					}, 400).addClass('visible-tab');
				}

				if (clickedTab.parents('.tabbed').find('> div:nth-of-type(' + $id + ') .iframe-embed').length > 0 ||
				clickedTab.parents('.tabbed').find('> div:nth-of-type(' + $id + ') .portfolio-items').length > 0) {
					setTimeout(function () {
						$window.trigger('resize');
					}, 10);
				}
			}

			// Waypoint checking
			if ($tabbedClickCount != 0) {

				var $currentVisTab = clickedTab.parents('.tabbed').find('> div:nth-of-type(' + $id + ')' + $frontEndEditorTabDiv);

				if ($currentVisTab.find('.nectar-progress-bar').length > 0) {
					progressBars();
				}
				if ($currentVisTab.find('.divider-small-border [data-animate="yes"]').length > 0 ||
				$currentVisTab.find('.divider-border [data-animate="yes"]').length > 0) {
					dividers();
				}
				if ($currentVisTab.find('img.img-with-animation').length > 0 ||
				$currentVisTab.find('.col.has-animation').length > 0 ||
				$currentVisTab.find('.nectar_cascading_images').length > 0 ||
				$currentVisTab.find('.wpb_column.has-animation').length > 0) {
					colAndImgAnimations();
					cascadingImageBGSizing();
				}
				if ($currentVisTab.find('.parallax-layer').length > 0 || $currentVisTab.parents('.nectar-parallax-enabled').length > 0) {
					parallaxRowsBGCals();
					for(var i=0; i < parallaxItemsArr.length; i++ ) {
						parallaxItemsArr[i].resize();
					}
				}
				if ($currentVisTab.find('.nectar-milestone').length > 0) {
					milestoneWaypoint();
				}
				if ($currentVisTab.find('.nectar_image_with_hotspots[data-animation="true"]').length > 0) {
					imageWithHotspots();
					setTimeout(function(){
						$window.trigger('resize');
					},100);
				}
				if ($currentVisTab.find('.nectar-fancy-ul').length > 0) {
					nectarFancyUlInit();
				}
				if ($currentVisTab.find('.nectar-split-heading').length > 0) {
					splitLineHeadings();
				}
				if ($currentVisTab.find('.wpb_column[data-border-animation="true"]').length > 0) {
					animatedColBorders();
				}
				if ($currentVisTab.find('.wpb_animate_when_almost_visible').length > 0) {
					vcWaypoints();
				}
				if ($currentVisTab.find('.nectar-animated-title').length > 0) {
					animatedTitles();
				}
				if ($currentVisTab.find('.nectar-highlighted-text').length > 0) {
					highlightedText();
				}
				if ($currentVisTab.find('.nectar_food_menu_item').length > 0) {
					foodMenuItems();
				}
				if ($currentVisTab.find('.nectar-post-grid:not([data-animation="none"])').length > 0) {
					NectarPostGridWaypoint();
				}

				if (clickedTab.parents('.wpb_row').length > 0) {

					if ($currentVisTab.find('.vc_pie_chart').length > 0 ||
					$currentVisTab.find('.wp-video-shortcode').length > 0 ||
					$currentVisTab.find('.post-area.masonry .posts-container').length > 0 ||
					$currentVisTab.find('.twentytwenty-container').length > 0 ||
					clickedTab.parents('#nectar_fullscreen_rows[data-content-overflow="scrollbar"]').length > 0 ||
					clickedTab.parents('.tabbed').find('> div:nth-of-type(' + $id + ')').find('.wpb_gallery').length > 0 ||
					clickedTab.parents('.tabbed').find('> div:nth-of-type(' + $id + ')').find('.swiper-container').length > 0 ||
					clickedTab.parents('.wpb_row').next().hasClass('parallax_section')) {
						$window.trigger('resize');
					}

					if ($currentVisTab.find('.nectar-flickity').length > 0 && typeof Flickity != 'undefined') {
						var tabbedFlkty = Flickity.data(clickedTab.parents('.tabbed').find('> div:nth-of-type(' + $id + ')').find('.nectar-flickity')[0]);
						tabbedFlkty.resize();
					}

					if ($currentVisTab.find('.nectar-woo-flickity').length > 0 && typeof Flickity != 'undefined') {
						var wootabbedFlkty = Flickity.data(clickedTab.parents('.tabbed').find('> div:nth-of-type(' + $id + ')').find('.nectar-woo-flickity > ul')[0]);
						wootabbedFlkty.resize();
						$(window).trigger('nectar-product-filters-layout');
					}

				}

				//SVG icons
				$currentVisTab.find('.svg-icon-holder').each(function (i) {

					var $that = $(this);

					setTimeout(function () {

						var $animationDelay = 0;

						if($that.is('[data-animation-delay]') &&
						$that.attr('data-animation-delay').length > 0 &&
						$that.attr('data-animation') != 'false') {
							$animationDelay = $that.attr('data-animation-delay');
						}

						clearTimeout($animatedSVGIconTimeout[i]);

						if ($that.attr('data-animation') == 'false') {
							$that.css('opacity', '1');
							$svgIcons[$that.find('svg').attr('id').slice(-1)].finish();
						} else {

							$svgIcons[$that.find('svg').attr('id').slice(-1)].reset();
							$animatedSVGIconTimeout[i] = setTimeout(function () {
								$svgIcons[$that.find('svg').attr('id').slice(-1)].play();
							}, $animationDelay);

						}
					}, 150);
				});

			}

			// Fix columns inside tabs
			clickedTab.parents('.tabbed').find('.wpb_row').each(function () {
				if (typeof $(this).find('[class*="vc_col-"]').first().offset() != 'undefined') {

					var $firstChildOffset = $(this).find('[class*="vc_col-"]').first().offset().left;

					$(this).find('[class*="vc_col-"]').each(function () {
						$(this).removeClass('no-left-margin');
						if ($(this).offset().left < $firstChildOffset + 15) {
							$(this).addClass('no-left-margin');
						} else {
							$(this).removeClass('no-left-margin');
						}
					});
				}

			});

			$tabbedClickCount++;

			// Magic line
			if (clickedTab.parent().parent().find('.magic-line').length > 0) {
				magicLineCalc(clickedTab);
			}

			$(window).trigger('nectar-tab-changed');

		}


		/**
		* Tabbed element magic line - used for style "Minimal alt"
		*
		* @since 7.0
		*/
		function magicLineCalc($ele) {

			var el, leftPos, ratio;

			el = $ele.parent();
			if (el.length) {
				leftPos = el.position().left;
				ratio = el.width();
			} else {
				leftPos = ratio = 0;
			}


			$ele.parent().parent()
				.find('.magic-line')
				.css('transform', 'translateX(' + leftPos + 'px) scaleX(' + ratio + ')');
		}


		/**
		* Tabbed element deep linking.
		*
		* @since 3.0
		*/
		function tabbbedDeepLinking() {

			if (typeof nectarGetQueryParam['tab'] != 'undefined') {

				$('.wpb_tabs_nav').each(function () {

					$(this).find('li').each(function () {

						var $currentText  = $(this).find('a').clone(),
						$getText          = nectarGetQueryParam['tab'],
						$that             = $(this);

						$currentText.find('svg').remove();
						$currentText = $currentText.text();
						$currentText = $currentText.replace(/\s+/g, '-').toLowerCase();

						// SVG icons.
						if( $currentText.length > 0 && $currentText.substring(0,1) === '-' ) {
							$currentText = $currentText.substring(1);
						}

						$getText = $getText.replace(/\s+/g, '-').replace(/</g, '&lt;').replace(/"/g, '&quot;').toLowerCase();

						if ($currentText == $getText) {

							$(this).find('a').trigger('click');

							setTimeout(function () {
								$that.find('a').trigger('click');
							}, 501);
						}

					});

				});

			}

		}



		/**
		* Tabbed element initialization.
		*
		* @since 3.0
		*/
		function tabbedInit() {

			// Click event.
			$body.on('click', '.tabbed > ul li:not(.cta-button) a', function(e){

				tabbedChangeSection($(this));

				// Mobile scroll to.
				if (e.originalEvent !== undefined && nectarDOMInfo.winW < 1000 && $nectarFullPage.$usingFullScreenRows == false) {

					// Ensure that it would be needed.
					var $tabbedNav = $(this).closest('.tabbed').find('> ul');

					if( $tabbedNav.height() > 350 ) {

						var $scrollTopDistance = $tabbedNav.offset().top + $tabbedNav.height() - nectarDOMInfo.adminBarHeight;

						if( $('#header-outer[data-mobile-fixed="1"]').length > 0 ) {
								$scrollTopDistance = $tabbedNav.offset().top + $tabbedNav.height() - $headerOuterEl.outerHeight() - nectarDOMInfo.adminBarHeight
						}

					  nectar_scrollToY($scrollTopDistance, 700, 'easeInOutQuint');
					}

				}

				return false;
			});

			// Custom user def anchor click event helper.
			$('a[class*="nectar-tab-trigger"]').on('click', function(e) {

				// verify the link is setup correct.
				if( !$(this).is('[href*="#"]') || $(this).attr('href').length < 1 ) {
					return true;
				}

				var clickedTrigger = $(this).attr('href');
				clickedTrigger = clickedTrigger.substr(1);
				clickedTrigger = clickedTrigger.replace(/\s+/g, '-').replace(/</g, '&lt;').replace(/"/g, '&quot;').toLowerCase();

				$('.wpb_tabs_nav').each(function () {

					$(this).find('li').each(function () {

						var $currentText = $(this).find('a').clone();

						$currentText.find('svg').remove();
						$currentText = $currentText.text();
						$currentText = $currentText.replace(/\s+/g, '-').toLowerCase();

						// SVG icons.
						if( $currentText.length > 0 && $currentText.substring(0,1) === '-' ) {
							$currentText = $currentText.substring(1);
						}

						// trigger.
						if ($currentText == clickedTrigger) {
							$(this).find('a').trigger('click');
						}

					});

				});

				e.preventDefault();

			});


			$('.tabbed').each(function () {

				var $that;

				// Handle icons
				$(this).find('.wpb_tab').each(function (i) {

					if ($(this).is('[data-tab-icon]') && $(this).attr('data-tab-icon').length > 0) {

						$(this)
							.parents('.tabbed')
							.addClass('using-icons');

						$(this)
							.parents('.tabbed')
							.find('.wpb_tabs_nav li:nth-child(' + (i + 1) + ') > a')
							.prepend('<i class="' + $(this).attr("data-tab-icon") + '"></i>');

					}

					// SVG icons
					if ($(this).find('.im-icon-wrap.tab-icon').length > 0) {

						var $svg_icon_markup = $(this).find('.im-icon-wrap.tab-icon').detach();
						$(this).parents('.tabbed')
							.find('.wpb_tabs_nav li:nth-child(' + (i + 1) + ') > a')
							.prepend($svg_icon_markup);
					}

				});


				$(this).find('> ul li:first-child a').trigger('click');

				$that = $(this);

				// Minimal alt effect
				setTimeout(function () {
					if ($that.is('[data-style="minimal_alt"]')) {
						$that.find('> ul').append('<li class="magic-line" />');
						magicLineCalc($that.find('> ul > li:first-child > a'));
					}
				}, 100);


			});

			// Minimal alt resize event.
			if ( $('.tabbed[data-style="minimal_alt"]').length > 0 ) {
				$window.on('smartresize',function(){

					$('.tabbed[data-style="minimal_alt"]').each(function(){

						if( $(this).find('a.active-tab').length > 0 ) {
							magicLineCalc( $(this).find('a.active-tab') );
						}

					});


				});

			}


			tabbbedDeepLinking();

			// Vertical scrolling
			$('.nectar-scrolling-tabs').each(function(i) {
				if(!nectarDOMInfo.usingFrontEndEditor) {
					$verticalScrollingTabs[i] = new VerticalScrollingTabs($(this));
				}
			});

			// Tab change event.
			$(window).on('nectar-tab-changed', wooProductCarouselAnimations);


		}


		/**
		* Vertical Scrolling Tabs
		*
		* @since 12.0
		*/

		function VerticalScrollingTabs(el) {

			this.$el = el;
			this.$tabContent = el.find('.scrolling-tab-content');
			this.$lineEl = el.find('.scrolling-tab-nav .line');
			this.observer = null;

			this.domSetup();
			this.highlightObserve();
			// Sticky handled in NectarStickyEls();

		}

		VerticalScrollingTabs.prototype.domSetup = function() {

			var that = this;
			var href = '';


			// Icons
			this.$el.find('.wpb_tab').each(function (i) {

				if ($(this).is('[data-tab-icon]') && $(this).attr('data-tab-icon').length > 0) {
						that.$el.addClass('using-icons');

						href = that.$el.find('.wpb_tabs_nav li:nth-child(' + (i + 1) + ') a').attr('href');

						that.$el
							.find('.wpb_tabs_nav li:nth-child(' + (i + 1) + ')')
							.addClass('has-icon')
							.prepend('<a class="skip-hash" href="'+href+'"><i class="' + $(this).attr("data-tab-icon") + '"></i></a>');
				}

				// SVG icons
				if ($(this).find('.im-icon-wrap.tab-icon').length > 0) {

					href = that.$el.find('.wpb_tabs_nav li:nth-child(' + (i + 1) + ') a').attr('href');

					var $svg_icon_markup = $(this).find('.im-icon-wrap.tab-icon').detach();
					that.$el
						.find('.wpb_tabs_nav li:nth-child(' + (i + 1) + ')')
						.addClass('has-icon')
						.prepend('<a class="skip-hash svg-icon-link" href="'+href+'"></a>');

					that.$el.find('.wpb_tabs_nav li:nth-child(' + (i + 1) + ') .svg-icon-link').append($svg_icon_markup);

				}

			});


			// First active
			this.$el.find('.scrolling-tab-nav .menu-item:first').addClass('active');
			this.lineAnimation();

			// Only tab
			if( this.$el.find('.scrolling-tab-nav .menu-item').length == 1 ) {
				this.$el.find('.scrolling-tab-nav').addClass('single-tab');
			}

			var $tabContent = this.$el.find('.scrolling-tab-content');

			this.$el.find('.scrolling-tab-nav .menu-item').each(function(i) {

				i = i+1;
				var $tab = $tabContent.find('> div:nth-child('+i+')');

				// Add titles to mobile
				var $title = $(this).html();
				$tab.prepend('<div class="scrolling-tab-mobile-title"><div class="inner">' + wlEls($title) + '</div></div>');
				$tab.find('.scrolling-tab-mobile-title a').contents().unwrap();

				// Create normal anchor relation.
				if( $tab ) {
					var id = $(this).find('a').attr('href');
					id = id.substr(1);
					$tab.find('> .scrolling-tab-mobile-title').attr('id',id);
					$tab.removeAttr('id');
				}

			});

			this.$el.addClass('initalized');

		};

		VerticalScrollingTabs.prototype.highlightObserve = function() {

			var that = this;

			if( !(nectarDOMInfo.usingMobileBrowser && nectarDOMInfo.winW < 1000) ) {

				if( 'IntersectionObserver' in window ) {

					var rMarign = ($headerOuterEl.is('[data-remove-fixed="1"]')) ? '100px 0px 0px 0px' : '5px 0px 0px 0px';

					var options = {
						rootMargin: rMarign,
						threshold: 1
					}

					this.observer = new IntersectionObserver(function(entries) {

						entries.forEach(function(entry) {

							var href = '#' + $(entry.target).attr('id');
							var $menuItem = that.$el.find('.scrolling-tab-nav a[href="'+href+'"]');

							if (entry.isIntersecting && entry.intersectionRatio >= 1) {

								$menuItem.parents('.menu-item').addClass('visible');

							} else {
								$menuItem.parents('.menu-item').removeClass('visible');
							}

							// Highlight
							var $firstVisLink = that.$el.find('.scrolling-tab-nav .menu-item.visible:first');

							// a link is visible
							if( $firstVisLink.length > 0 ) {
								that.$el.find('.scrolling-tab-nav .menu-item').removeClass('active');
								$firstVisLink.addClass('active');
								that.lineAnimation();
							}


						});

					}, options);

					// Observe each section.
					this.$tabContent.find('> div > .scrolling-tab-mobile-title[id]').each(function() {
						that.observer.observe($(this)[0]);
					});

				} // if intersection observer.

			} // don't trigger on mobile.

		};

		VerticalScrollingTabs.prototype.lineAnimation = function() {

			var activeItem = this.$el.find('.scrolling-tab-nav .active');

			if( activeItem.length == 0 ) {
				return;
			}

			var itemOffset = parseInt(activeItem.position().top);
			var itemHeight = parseInt(activeItem.height());

			this.$lineEl.css({
				'max-height': itemHeight + 'px',
				'transform' : 'translate3d(0px, '+itemOffset+'px, 0px)'
			});

		};








		/**
		* Toggle Panels element deep linking.
		*
		* @since 3.0
		*/
		function accordionDeepLinking() {

			if (typeof nectarGetQueryParam['toggle'] != 'undefined') {
				$('.toggles').each(function () {

					$(this).find('.toggle').each(function () {
						var $currentText = $(this).find('h3 a').clone();
						var $getText = nectarGetQueryParam['toggle'];

						$($currentText).find('i').remove();
						$currentText = $currentText.text();
						$currentText = $currentText.replace(/\s+/g, '-').toLowerCase();
						$getText = $getText.replace(/\s+/g, '-').replace(/</g, '&lt;').replace(/"/g, '&quot;').toLowerCase();

						if ($currentText == $getText) {
							$(this).find('h3 a').trigger('click');
						}
					});
				});
			}

		}




		function accordionSizing() {

			$('.toggles').each(function(){

				var openToggle = $(this).find('.toggle.open');

				if( openToggle.length > 0 ) {

					openToggle.each(function() {
						var openToggleInner = $(this).find('> div')[0];
						openToggleInner.style.maxHeight = openToggleInner.scrollHeight + "px";
					});

				}


			});

		}

		/**
		* Toggle Panels element initialization.
		*
		* @since 3.0
		*/
		function accordionInit() {

			setTimeout(function() {

				$('.toggles.accordion:not([data-starting="closed"])').each(function () {

					// Legacy.
					if( $(this).find('.toggle[data-inner-wrap="true"]').length == 0 ) {
						$(this).find('> .toggle').first().addClass('open').find('> div').show();
					} else if(!nectarDOMInfo.usingFrontEndEditor) {
						var $firstToggle = $(this).find('> .toggle').first();
						$firstToggle.addClass('open');
						$firstToggle.find('> div')[0].style.maxHeight = $firstToggle.find('> div')[0].scrollHeight + "px";
					}

					$(this).find('> .toggle').first().find('a:not(.nectar-button) i').attr('class', 'fa fa-minus-circle');

				});

				setTimeout(accordionDeepLinking,300);

			}, 60);

			if( $('.toggle[data-inner-wrap="true"]').length > 0 ) {
				$window.on('smartresize', accordionSizing);
			}

		}

		function accordionClickEvents() {


			$body.on('click', '.toggle h3 a', function () {

				// Regular toggle click event
				if (!$(this).parents('.toggles').hasClass('accordion')) {

					// Legacy.
					if( $(this).parents('.toggle[data-inner-wrap="true"]').length == 0 ) {

						$(this).parents('.toggle')
							.find('> div')
							.slideToggle(300);

					} else {

						var parentEl = $(this).parents('.toggle').find('> div')[0];

						if (parentEl.style.maxHeight) {
							parentEl.style.maxHeight = null;
						} else {
							parentEl.style.maxHeight = parentEl.scrollHeight + "px";
						}

					}


					$(this).parents('.toggle')
						.toggleClass('open');

					// Switch icon
					if ($(this).parents('.toggle').hasClass('open')) {
						$(this)
							.find('i')
							.attr('class', 'fa fa-minus-circle');
					} else {
						$(this)
							.find('i')
							.attr('class', 'fa fa-plus-circle');
					}

					if ($(this).parents('.toggle').find('> div .iframe-embed').length > 0 &&
					$(this).parents('.toggle').find('> div iframe.iframe-embed').height() == '0') {
						responsiveVideoIframes();
					}

					// toggles which contain images
					if( $(this).parents('.toggle').find('> div img').length > 0 &&
					    $(this).parents('.toggle').is('[data-inner-wrap="true"]') ) {

						for(var j=1; j<10; j++ ) {
							setTimeout(accordionSizing, j*100);
						}
					}

					if ($(this).parents('.full-width-content').length > 0) {
						setTimeout(function () {
							fullWidthContentColumns();
						}, 300);
					}

					if ($('#nectar_fullscreen_rows').length > 0) {
						setTimeout(function () {
							$window.trigger('smartresize');
						}, 300);
					}
					return false;
				}
			});

			// Accordion click event
			$body.on('click', '.toggles.accordion .toggle h3 a', function (e) {

				if ($(this).parents('.toggle').hasClass('open')) {
					return false;
				}

				var $t;
				var $parentToggles  = $(this).parents('.toggles');
				var $parentToggle   = $(this).parents('.toggle');


				// Legacy.
				if( $(this).parents('.toggle[data-inner-wrap="true"]').length == 0 ) {

					$parentToggles.find('.toggle > div').slideUp(300);
					$parentToggles.find('.toggle h3 a i').attr('class', 'fa fa-plus-circle');
					$parentToggles.find('.toggle').removeClass('open');
					$parentToggle.find('> div').slideDown(300);
					$parentToggle.addClass('open');

				} else {

					// Mobile scroll to.
					if (e.originalEvent !== undefined &&
						  nectarDOMInfo.winW < 1000 &&
							$parentToggles.find('.toggle.open').length > 0 &&
						  $nectarFullPage.$usingFullScreenRows == false) {

						var $openToggle = $parentToggles.find('.toggle.open');

						setTimeout(function(){
							var $scrollTopDistance = $parentToggle.offset().top - nectarDOMInfo.adminBarHeight;

							if( $('#header-outer[data-mobile-fixed="1"]').length > 0 ) {
									$scrollTopDistance = $parentToggle.offset().top - $headerOuterEl.outerHeight() - nectarDOMInfo.adminBarHeight
							}

							nectar_scrollToY($scrollTopDistance, 500, 'easeInOutQuint');
						},50);

					}


					var parentEl = $parentToggle.find('> div')[0];

					$parentToggles.find('.toggle > div').each(function(){
						$(this)[0].style.maxHeight = null;
					});

					$parentToggles.find('.toggle h3 a i').attr('class', 'fa fa-plus-circle');
					$parentToggles.find('.toggle').removeClass('open');

					parentEl.style.maxHeight = parentEl.scrollHeight + "px";

					$parentToggle.addClass('open');

				}


				// Switch icon
				if ($parentToggle.hasClass('open')) {
					$(this).find('i').attr('class', 'fa fa-minus-circle');
				} else {
					$(this).find('i').attr('class', 'fa fa-plus-circle');
				}

				if ($(this).parents('.full-width-content').length > 0) {
					clearTimeout($t);
					$t = setTimeout(function () {
						fullWidthContentColumns();
					}, 400);
				}
				if ($('#nectar_fullscreen_rows').length > 0) {
					clearTimeout($t);
					$t = setTimeout(function () {
						$window.trigger('smartresize');
					}, 400);
				}

				return false;

			});

		}


		/**
		* Sticky elements powered by CSS.
		*
		* @since 12.2
		*/
    function NectarStickyEls() {
			this.selectors = '.nectar-sticky-pos';

			if($(this.selectors).length === 0) {
				return;
			}

			this.topOffset = 0;
			this.topOffsetCushion = 60;
			this.calcTopOffset();
			this.resizeEvent();
			$window.on('resize', this.resizeEvent.bind(this));
		}

		NectarStickyEls.prototype.calcTopOffset = function() {

			if ($('.page-template-template-no-header-footer').length > 0 ||
			    $('.page-template-template-no-header').length > 0 ||
				  $('#header-outer[data-remove-fixed="1"]').length > 0 ||
			   	$('body[data-header-format="left-header"]').length > 0 ) {
				this.topOffset = 0;
			} else {

				var $headerNavSpace = $('#header-space').outerHeight();
				var resize = 0;

				// Resize effect.
				if( $('#header-outer[data-header-resize="1"]').length > 0 ) {
					var headerPadding = parseInt($headerOuterEl.attr('data-padding')) - parseInt($headerOuterEl.attr('data-padding')) / 1.8;
					resize = parseInt(logoShrinkNum) + headerPadding * 2;
				}

				this.topOffset = parseInt($headerNavSpace) + resize + nectarDOMInfo.adminBarHeight;

				// Condense effect.
				if ($('#header-outer[data-condense="true"]').length > 0) {

					var $headerSpan9       = $('#header-outer[data-format="centered-menu-bottom-bar"] header#top .span_9'),
					$headerHeightStored    = $headerOuterEl.height(),
					$headerHeightCondensed = $headerHeightStored - (parseInt($headerSpan9.height()) + parseInt($('#header-outer #logo').css('margin-top')));

					this.topOffset = parseInt($headerNavSpace) + $headerHeightCondensed - nectarDOMInfo.adminBarHeight;

				}

			}

			this.topOffset += this.topOffsetCushion;


		};

		NectarStickyEls.prototype.resizeEvent = function() {

			if( nectarDOMInfo.winW > 1000 ) {

				this.calcTopOffset();

				$(this.selectors).css({
					'position':'sticky',
					'top': this.topOffset
				});
			} else {
				$(this.selectors).css({
					'position': '',
					'top': ''
				});
			}

		};


		/**
		* Color hex to rgb
		*
		* @since 3.0
		*/
		function shadeColor(hex, lum) {

				// Validate hex string
				hex = String(hex).replace(/[^0-9a-f]/gi, '');
				if (hex.length < 6) {
					hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
				}
				lum = lum || 0;

				// Convert to decimal and change luminosity
				var rgb = "#",
				c, i;
				for (i = 0; i < 3; i++) {
					c = parseInt(hex.substr(i * 2, 2), 16);
					c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
					rgb += ("00" + c).substr(c.length);
				}

				return rgb;
		}

			/**
			* Jumbo size 3D nectar button.
			*
			* @since 3.0
			*/
			function createExtraJumboSize() {

				$('.nectar-3d-transparent-button').each(function () {

					if ($(this).css('visibility') != 'visible') {
						return;
					}

					var $that   = $(this),
					$size       = $that.attr('data-size'),
					$padding    = 0;

					var $vert_height_divider = 1.7;

					if ($size == 'extra_jumbo') {

						var $font_size;

						if (nectarDOMInfo.winW < 1000 && nectarDOMInfo.winW > 690) {
							$padding    = 64;
							$font_size  = 34;
							$that.find('.back-3d rect').attr('stroke-width', '12');
							$vert_height_divider = 1.7;
						} else if (nectarDOMInfo.winW <= 690) {
							$padding    = 46;
							$font_size  = 16;
							$that.find('.back-3d rect').attr('stroke-width', '10');
							$vert_height_divider = 1.7;
						} else {
							$padding    = 100;
							$font_size  = 64;
							$that.find('.back-3d rect').attr('stroke-width', '20');
							$vert_height_divider = 1.6;
						}


						$that.find('svg text').attr('font-size', $font_size);

						var $boundingRect = $(this).find('.back-3d .button-text')[0].getBoundingClientRect(),
						$text_width       = $boundingRect.width,
						$text_height      = $font_size * 1.5;

						$that.css({
							'width': ($text_width + $padding * 1.5) + 'px',
							'height': ($text_height + $padding) + 'px'
						});

						$that.find('> a').css({
							'height': ($text_height + $padding) + 'px'
						});

						$that.find('.back-3d svg, .front-3d svg').css({
							'width': ($text_width + $padding * 1.5) + 'px',
							'height': ($text_height + $padding) + 'px'
						}).attr('viewBox', '0 0 ' + ($text_width + $padding * 1.5) + ' ' + ($text_height + $padding));

						$that.find('svg text').attr('transform', 'matrix(1 0 0 1 ' + ($text_width + $padding * 1.6) / 2 + ' ' + (($text_height + $padding) / $vert_height_divider) + ')');
						$that.find('.front-3d ').css('transform-origin', '50% 50% -' + ($text_height + $padding) / 2 + 'px');
						$that.find('.back-3d').css('transform-origin', '50% 50% -' + ($text_height + $padding) / 2 + 'px');

					}

				});

			}


			/**
			* Nectar Button custom coloring
			*
			* @since 3.0
			*/
			function coloredButtons() {

				$('.nectar-button.see-through[data-color-override], .nectar-button.see-through-2[data-color-override], .nectar-button.see-through-3[data-color-override]').each(function () {

					var $usingMaterialSkin = ($('body.material[data-button-style^="rounded"]').length > 0) ? true : false;
					$(this).css('visibility', 'visible');

					if ($(this).hasClass('see-through-3') && $(this).attr('data-color-override') == 'false') {
						return true;
					}

					var $color;
					var $that;

					if ($(this).attr('data-color-override') != 'false') {
						$color = $(this).attr('data-color-override');
					} else {

						if ($(this).parents('.dark').length > 0) {
							$color = '#000000';
						}	else {
							$color = '#ffffff';
						}

					}

					if (!$(this).hasClass('see-through-3')) {
						$(this).css('color', $color);
					}

					$(this).find('i').css('color', $color);

					var colorInt        = parseInt($color.substring(1), 16);
					var $hoverColor     = ($(this).has('[data-hover-color-override]')) ? $(this).attr('data-hover-color-override') : 'no-override';
					var $hoverTextColor = ($(this).has('[data-hover-text-color-override]')) ? $(this).attr('data-hover-text-color-override') : '#fff';

					var R = (colorInt & 0xFF0000) >> 16;
					var G = (colorInt & 0x00FF00) >> 8;
					var B = (colorInt & 0x0000FF) >> 0;

					var $opacityStr = ($(this).hasClass('see-through-3')) ? '1' : '0.75';

					$(this).css('border-color', 'rgba(' + R + ',' + G + ',' + B + ',' + $opacityStr + ')');

					// Material theme skin buttons w/ icons starting
					if ($usingMaterialSkin) {
						$(this).find('i').css({
							'background-color': 'rgba(' + R + ',' + G + ',' + B + ',1)',
							'box-shadow': '0px 8px 15px rgba(' + R + ',' + G + ',' + B + ',0.24)'
						});
					}

					if ($(this).hasClass('see-through')) {

						$that = $(this);

						$(this).on('mouseenter touchstart', function () {
							$that.css('border-color', 'rgba(' + R + ',' + G + ',' + B + ',1)');
						});

						$(this).on('mouseleave touchtouchend', function () {
							$that.css('border-color', 'rgba(' + R + ',' + G + ',' + B + ',1)');
							$opacityStr = ($(this).hasClass('see-through-3')) ? '1' : '0.75';
							$that.css('border-color', 'rgba(' + R + ',' + G + ',' + B + ',' + $opacityStr + ')');
						});

					} else {

						$(this).find('i').css('color', $hoverTextColor);

						if ($hoverColor != 'no-override') {

							$that = $(this);

							$(this).on('mouseenter touchstart', function () {

								$that.css({
									'border-color': $hoverColor,
									'background-color': $hoverColor,
									'color': $hoverTextColor
								});

								// Material buttons w/ icons over
								if ($usingMaterialSkin) {
									$that.find('i').css({
										'background-color': '',
										'box-shadow': ''
									});
								}
							});

							$(this).on('mouseleave touchtouchend', function () {

								$opacityStr = ($(this).hasClass('see-through-3')) ? '1' : '0.75';

								if ($usingMaterialSkin) {
									$that.find('i').css({
										'background-color': 'rgba(' + R + ',' + G + ',' + B + ',1)',
										'box-shadow': '0px 8px 15px rgba(' + R + ',' + G + ',' + B + ',0.24)'
									});
								}

								if (!$that.hasClass('see-through-3')) {
									$that.css({
										'border-color': 'rgba(' + R + ',' + G + ',' + B + ',' + $opacityStr + ')',
										'background-color': 'transparent',
										'color': $color
									});
								} else {
									$that.css({
										'border-color': 'rgba(' + R + ',' + G + ',' + B + ',' + $opacityStr + ')',
										'background-color': 'transparent'
									});
								}

							});

						} else {

							$that = $(this);

							$(this).on('mouseenter touchstart', function () {

								$that.css({
									'border-color': $hoverColor,
									'color': $hoverTextColor
								});

							});

							$(this).on('mouseleave touchtouchend', function () {

								$opacityStr = ($that.hasClass('see-through-3')) ? '1' : '0.75';
								$that.css({
									'border-color': 'rgba(' + R + ',' + G + ',' + B + ',' + $opacityStr + ')',
									'color': $hoverTextColor
								});

							});

						}
					}
				});

				$('.nectar-button:not(.see-through):not(.see-through-2):not(.see-through-3)[data-color-override]').each(function () {

					$(this).css('visibility', 'visible');

					if ($(this).attr('data-color-override') != 'false') {

						var $color = $(this).attr('data-color-override');

						$(this)
							.removeClass('accent-color')
							.removeClass('extra-color-1')
							.removeClass('extra-color-2')
							.removeClass('extra-color-3')
							.css('background-color', $color);
					}

				});


				// Solid color tilt
				if ($('.swiper-slide .solid_color_2').length > 0 || $('.tilt-button-inner').length > 0) {

					var $tiltButtonCssString = '';
					var $color;

					$('.swiper-slide .solid_color_2 a').each(function (i) {

						$(this).addClass('instance-' + i);

						if ($(this).attr('data-color-override') != 'false') {
							$color = $(this).attr('data-color-override');
						} else {
							if ($(this).parents('.dark').length > 0) {
								$color = '#000000';
							}
							else {
								$color = '#ffffff';
							}
						}

						$(this).css('color', $color);
						$(this).find('i').css('color', $color);

						var $currentColor = $(this).css('background-color'),
						$topColor         = shadeColor($currentColor, 0.13),
						$bottomColor      = shadeColor($currentColor, -0.15);

						$tiltButtonCssString += '.swiper-slide .solid_color_2 a.instance-' + i + ':after { background-color: ' + $topColor + ';  }' + ' .swiper-slide .solid_color_2 a.instance-' + i + ':before { background-color: ' + $bottomColor + '; } ';

					});


					$('.tilt-button-wrap a').each(function (i) {

						$(this).addClass('instance-' + i);

						var $currentColor = $(this).css('background-color');
						var $color;

						if ($(this).attr('data-color-override') != 'false') {
							$color = $(this).attr('data-color-override');
							$(this).css('background-color', $color);
							$currentColor = $color;
						}

						var $topColor = shadeColor($currentColor, 0.13),
						$bottomColor  = shadeColor($currentColor, -0.15);

						$tiltButtonCssString += '.tilt-button-wrap a.instance-' + i + ':after { background-color: ' + $topColor + ';  }' + ' .tilt-button-wrap a.instance-' + i + ':before { background-color: ' + $bottomColor + '; } ';

					});

					// Style
					nectarCreateStyle($tiltButtonCssString, 'tilt-button');

				}


				// Transparent 3D
				if ($('.nectar-3d-transparent-button').length > 0) {

					var $3dTransButtonCssString = '';
					$('.nectar-3d-transparent-button').each(function (i) {

						var $that = $(this),
						$size 		= $that.attr('data-size'),
						$padding 	= 0,
						v1 				= 1.5,
						v2 				= 1.65,
						$font_size;

						// Size
						if ($size == 'large') {
							$padding 		= 46;
							$font_size 	= 16;
							v1 					= 1.5;
							v2 					= 1.7;
						} else if ($size == 'medium') {
							$padding 		= 30;
							$font_size 	= 16;
						} else if ($size == 'small') {
							$padding 		= 20;
							$font_size 	= 12;
						} else if ($size == 'jumbo') {
							$padding 		= 54;
							$font_size 	= 24;
							v1 					= 1.5;
							v2 					= 1.68;
						} else if ($size == 'extra_jumbo') {
							$padding 		= 100;
							$font_size 	= 64;
							v1 					= 1.6;
							v2 					= 1.6;
						}

						$that.find('svg text').attr('font-size', $font_size);

						var $boundingRect = $(this).find('.back-3d .button-text')[0].getBoundingClientRect(),
						$text_width       = $boundingRect.width,
						$text_height      = $font_size * 1.5;

						$that.css({
							'width': ($text_width + $padding * 1.5) + 'px',
							'height': ($text_height + $padding) + 'px'
						});

						$that.find('> a').css({
							'height': ($text_height + $padding) + 'px'
						});

						$that.find('.back-3d svg, .front-3d svg').css({
							'width': ($text_width + $padding * 1.5) + 'px',
							'height': ($text_height + $padding) + 'px'
						}).attr('viewBox', '0 0 ' + ($text_width + $padding * 1.5) + ' ' + ($text_height + $padding));

						$that.find('svg text').attr('transform', 'matrix(1 0 0 1 ' + ($text_width + $padding * v1) / 2 + ' ' + (($text_height + $padding) / v2) + ')');
						$that.find('.front-3d, .back-3d').css('transform-origin', '50% 50% -' + ($text_height + $padding) / 2 + 'px');

						// Mask
						$(this).find('.front-3d svg > rect').attr('id', 'masked-rect-id-' + i);
						$(this).find('.front-3d defs mask').attr('id', 'button-text-mask-' + i);

						$that.css('visibility', 'visible');
						$3dTransButtonCssString += '#masked-rect-id-' + i + ' { mask: url(#button-text-mask-' + i + '); -webkit-mask: url(#button-text-mask-' + i + ')} ';

					});

					// Extra jumbo resize
					createExtraJumboSize();
					$window.on('smartresize', createExtraJumboSize);

					// Style
					nectarCreateStyle($3dTransButtonCssString, 'nectar-td-button');

				}

				// Gradient btn init
				setTimeout(function () {
					$('.nectar-button[class*="color-gradient"] .start').removeClass('loading');
				}, 150);
				// No grad for ff
				if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ||
				navigator.userAgent.indexOf("MSIE ") > -1 ||
				navigator.userAgent.match(/Trident\/7\./)) {
					$('.nectar-button[class*="color-gradient"] .start').addClass('no-text-grad');
				}
			}




			/**
			* Shortcode icon large style
			*
			* @since 1.0
			*/
			function largeIconHover() {
				$('.icon-3x').each(function () {
					$(this).closest('.col').on('mouseenter', function () {
						$(this).find('.icon-3x').addClass('hovered');
					});

					$(this).closest('.col').on('mouseleave', function () {
						$(this).find('.icon-3x').removeClass('hovered');
					});
				});

				if (navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.match(/Trident\/7\./)) {
					$('[class^="icon-"][class*="color-gradient"], .nectar_icon_wrap[data-color*="extra-color-gradient"] .nectar_icon, .nectar-gradient-text').addClass('no-grad');
				}
			}



				/**
				* Team member element - fullscreen style.
				*
				* @since 7.0
				*/
				function teamMemberFullscreen() {

					if ( $('.team-member').length === 0 ) {
						return;
					}

					// Open click event
					$body.on('click', '.team-member[data-style="bio_fullscreen"], .team-member[data-style="bio_fullscreen_alt"]', function () {

						if ($('.nectar_team_member_overlay').length > 0) {
							return;
						}

						var $usingBoxedClass  = ($('body > #boxed').length > 0) ? 'in-boxed' : '',
						$teamMemberMeta       = $(this).find('.nectar_team_bio').html(),
						$teamMemberTitle      = ($(this).is('[data-style="bio_fullscreen_alt"]')) ? $(this).find('.team-meta h5').text() : $(this).find('.team-meta p').text(),
						$teamMemberImg        = ($(this).find('.nectar_team_bio_img[data-img-src]').length > 0) ? $(this).find('.nectar_team_bio_img').attr('data-img-src') : '',
						$teamMemberStyle      = ($(this).is('[data-style="bio_fullscreen_alt"]')) ? 'bio-fullscreen-alt' : 'bio-fullscreen',
						$teamName             = '';

						if($(this).is('[data-style="bio_fullscreen_alt"]')) {
							$teamName = '<div class="title">' + $teamMemberTitle + '</div><h2>' + $(this).find('.team-meta h3').text() + '</h2>';
						} else {
							$teamName = '<h2>' + $(this).find('.team-meta h3').text() + '</h2><div class="title">' + $teamMemberTitle + '</div>';
						}

						$body.append('<div class="nectar_team_member_overlay ' + $usingBoxedClass + '" data-style="' + $teamMemberStyle + '"><div class="inner-wrap"><div class="team_member_details"><div class="bio-inner"><span class="mobile-close"></span>'+ $teamName +'<div class="team-desc">' + wlEls($teamMemberMeta) + '</div></div></div><div class="team_member_picture"><div class="team_member_image_bg_cover"></div><div class="team_member_picture_wrap"><div class="team_member_image"></div></div></div></div></div>');

						if ($teamMemberImg.length > 0) {

							// Fade in img on load
							var teamTmpImg = new Image();
							teamTmpImg.src = $teamMemberImg;
							teamTmpImg.onload = function () {
								$('.nectar_team_member_overlay .team_member_image').css('opacity', '1');
							};
							$('.nectar_team_member_overlay .team_member_image').css({
								'background-image': 'url("' + $teamMemberImg + '")'
							});
						}

						var $headerNavSpace = ($('body[data-header-format="left-header"]').length > 0 && $window.width() > 1000) ? 0 : $headerOuterEl.height();
						$('.nectar_team_member_overlay .inner-wrap').css({
							'padding-top': $headerNavSpace
						});

						// No-scroll class - ios ready
						if ($('.using-mobile-browser').length > 0) {
							$('body,html').addClass('nectar-no-scrolling');
						}

						teamFullscreenResize();

						// Transition in
						$('.nectar_team_member_overlay')
							.addClass('open')
							.addClass('animating');

						setTimeout(function () {
							$('.nectar_team_member_close').addClass('visible');
							$('.nectar_team_member_overlay').removeClass('animating');
						}, 500);

						if ($('.team-member[data-style="bio_fullscreen"]').length > 0 && nectarDOMInfo.usingMobileBrowser) {
							$('.nectar_team_member_overlay').addClass('on-mobile');
						}

					});

					// Close click event
					$body.on('click', '.nectar_team_member_overlay', function () {

						if (!$(this).hasClass('animating')) {

							$('.nectar_team_member_overlay').removeClass('open');
							$('.nectar_team_member_close').removeClass('visible');

							if ($('.using-mobile-browser').length > 0) {
								$('body,html').removeClass('nectar-no-scrolling');
							}

							setTimeout(function () {

								$('.nectar_team_member_overlay, .nectar_team_member_close').remove();

							}, 820);
						}
					});

					if ($('.team-member[data-style="bio_fullscreen"]').length > 0 || $('.team-member[data-style="bio_fullscreen_alt"]').length > 0) {
						$window.on('resize', teamFullscreenResize);
						if( !nectarDOMInfo.usingMobileBrowser ) {
							var closeIndicator = new NectarIconMouseFollow('','close-indicator');
						}

					}

				}


				/**
				* Team member element fullscreen resize event.
				*
				* @since 7.0
				*/
				function teamFullscreenResize() {
					var $leftHeaderSize = ($('body[data-header-format="left-header"]').length > 0 && $window.width() > 1000) ? 275 : 0;
					$('.nectar_team_member_overlay').css({
						'width': $window.width() - $leftHeaderSize,
						'left': $leftHeaderSize
					});
				}


				/**
				* WPBakery column element BG hover
				*
				* @since 5.0
				*/
				function columnBGColors() {

					var $columnColorCSS = '';

					$('.wpb_column').each(function (i) {

						$(this).removeClass(function (index, className) {
							return (className.match(/(^|\s)instance-\S+/g) || []).join(' ');
						});

						if( $(this).attr('data-has-bg-color') == 'true' || $(this).is('[data-hover-bg^="#"]') ) {
							$(this).addClass('instance-' + i);
						}


						var $innerSelector = ( $(this).find('> .vc_column-inner > .column-bg-overlay-wrap').length > 0 || $(this).find('> .vc_column-inner > .column-bg-overlay').length > 0 ) ? ' > .vc_column-inner ' : '';
						var $innerWrapSelector = ( $(this).find($innerSelector + ' > .column-bg-overlay-wrap').length > 0 ) ? '> .column-bg-overlay-wrap ' : '';

						// BG color
						if ($(this).attr('data-has-bg-color') == 'true') {
							$columnColorCSS += '.wpb_column.instance-' + i + $innerSelector + $innerWrapSelector + ' > .column-bg-overlay { background-color:' + $(this).attr('data-bg-color') + ';  opacity: ' + $(this).attr('data-bg-opacity') + '; }';
						}

						// Hover bg color
						if ($(this).is('[data-hover-bg^="#"]')) {
							$columnColorCSS += '.wpb_column.instance-' + i + ':hover ' + $innerSelector + $innerWrapSelector + ' > .column-bg-overlay { background-color: ' + $(this).attr('data-hover-bg') + '!important; opacity: ' + $(this).attr('data-hover-bg-opacity') + '!important; }';
						}
					});

					// Style
					nectarCreateStyle($columnColorCSS, 'column-bg-colors');

				}



				/**
				* Displace filter column/row BG effect
				*
				* @since 10.5
				*/
				function nectarLiquidBGs() {
					$liquidBG_EL = [];

					if (typeof NectarLiquid == 'undefined' || nectarDOMInfo.usingFrontEndEditor) {
						return;
					}

					$('.row-bg-wrap[data-bg-animation*="displace-filter"] .row-bg.using-image, .column-image-bg-wrap[data-bg-animation*="displace-filter"] .column-image-bg').each(function (i) {

						var $that_el = $(this);
						var $type;
						var $el_type;

						if ($(this).is('.row-bg')) {
							$type = $(this).parents('.row-bg-wrap').attr('data-bg-animation');
							$el_type = 'row';
						}
						else if ($(this).is('.column-image-bg')) {
							$type = $(this).parents('.column-image-bg-wrap').attr('data-bg-animation');
							$el_type = 'col';
						}

						$liquidBG_EL[i] = new NectarLiquid($that_el, $type, $el_type);

					});
				}



				/**
				* Morphing outline element creation.
				*
				* @since 5.0
				*/
				function morphingOutlines() {

					if ($('.morphing-outline').length > 0) {

						var $morphingOutlineCSS 	= '',
						$frontEndEditorMOSelector = ($('body.vc_editor').length > 0) ? '' : '>';

						$('.morphing-outline').each(function (i) {

							$(this).removeClass(function (index, className) {
								return (className.match(/(^|\s)instance-\S+/g) || []).join(' ');
							});

							$(this).addClass('instance-' + i).css({
								'visibility': 'visible'
							});

							var $width  = $(this).find('.inner').width(),
							$height     = $(this).find('.inner').height(),
							$border     = parseInt($(this).attr("data-border-thickness")),
							$hover      = ($('body[data-button-style*="rounded"]').length > 0) ? ':hover' : '',
							$hover2     = ($('body[data-button-style*="rounded"]').length > 0) ? '' : ':hover';

							$morphingOutlineCSS += 'body .morphing-outline.instance-' + i + ' .inner > * { color: ' + $(this).attr("data-starting-color") + '; } ';
							$morphingOutlineCSS += 'body .morphing-outline.instance-' + i + ' .inner:after  { border-width:' + $(this).attr("data-border-thickness") + 'px ; border-color: ' + $(this).attr("data-starting-color") + '; } ';

							$morphingOutlineCSS += 'body .wpb_column:hover > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner > *, body .wpb_column:hover > .vc_column-inner > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner > * { color: ' + $(this).attr("data-hover-color") + '; } ';
							$morphingOutlineCSS += 'body .wpb_column:hover > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after, body .wpb_column:hover > .vc_column-inner > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after  { border-color: ' + $(this).attr("data-hover-color") + '; } ';

							// Padding calcs
							$morphingOutlineCSS += 'body .wpb_column' + $hover2 + ' > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after, body .wpb_column' + $hover2 + ' > .vc_column-inner > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after { padding: ' + (($width + 100 + $border * 2 - $height) / 2 - $border) + 'px 50px}';
							$morphingOutlineCSS += '.morphing-outline.instance-' + i + ' { padding: ' + (30 + ($width + 80 + $border * 2 - $height) / 2 - $border) + 'px 50px}';
							$morphingOutlineCSS += 'body .wpb_column' + $hover2 + ' > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after, body .wpb_column' + $hover2 + ' > .vc_column-inner > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after { top: -' + parseInt((($width + 100 + $border * 2 - $height) / 2 - $border) + $border) + 'px }';

							$morphingOutlineCSS += 'body .wpb_column > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after, body .wpb_column > .vc_column-inner > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after { left: -' + parseInt(50 + $border) + 'px }';

							// Hover
							$morphingOutlineCSS += 'body .wpb_column' + $hover + ' > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after, body .wpb_column' + $hover + ' > .vc_column-inner > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after { padding: 50px 50px}';
							$morphingOutlineCSS += 'body .wpb_column' + $hover + ' > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after, body .wpb_column' + $hover + ' > .vc_column-inner > .wpb_wrapper ' + $frontEndEditorMOSelector + ' .morphing-outline.instance-' + i + ' .inner:after { top: -' + parseInt(50 + $border) + 'px }';

						});

						// Style
						nectarCreateStyle($morphingOutlineCSS, 'morphing-outlines');

					}

				}


				/**
				* Morphing outline element initialization.
				*
				* @since 5.0
				*/
				function morphingOutlinesInit() {

					if($('.morphing-outline').length > 0) {

						// Create style.
						setTimeout(morphingOutlines, 100);
						setTimeout(fullWidthContentColumns, 125);

						// Handle resize.
						$window.on('smartresize', morphingOutlines);

					}

				}



				/**
				* SVG icon element animations
				*
				* @since 6.0
				* @see waypoints
				*/
				function svgAnimations() {

					var $svgOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : 'bottom-in-view';

					if ($svgIcons.length == 0) {

						$('.svg-icon-holder:not(.animated-in)').has('svg').each(function (i) {

							var $that = $(this);

							if (bypassAnimations) {
								$that.attr('data-animation', 'false');
							}
							// Size
							$that.find('svg').css({
								'height': parseInt($that.attr('data-size')) + 'px',
								'width': parseInt($that.attr('data-size')) + 'px'
							});

							// Animation
							$(this).find('svg').attr('id', 'nectar-svg-animation-instance-' + i);

							var $animationSpeed = ($that.is('[data-animation-speed]') && $that.attr('data-animation-speed').length > 0) ? $that.attr('data-animation-speed') : 200;

							if ($that.attr('data-animation') == 'false') {
								$animationSpeed = 1;
								$that.css('opacity', '1');
							}

							if (!$that.hasClass('bound')) {
								$svgIcons[i] = new Vivus($that.find('svg').attr('id'), {
									type: 'delayed',
									pathTimingFunction: Vivus.EASE_OUT,
									animTimingFunction: Vivus.LINEAR,
									duration: $animationSpeed,
									onReady: svgInit
								});
							}

							if ($animationSpeed !== 1) {

								var waypoint = new Waypoint({
									element: $that,
									handler: function () {
										if ($that.hasClass('animated-in')) {
											waypoint.destroy();
											return;
										}

										checkIfReady();
										$that.addClass('animated-in');
										waypoint.destroy();
									},
									offset: $svgOffsetPos

								});

							} else {
								checkIfReady();
							}

							function checkIfReady() {

								var $animationDelay = 0;

								if($that.is('[data-animation-delay]') &&
								$that.attr('data-animation-delay').length > 0 &&
								$that.attr('data-animation') != 'false') {
									$animationDelay = $that.attr('data-animation-delay');
								}

								var $iconID = $that.find('svg').attr('id').replace(/[^0-9]/g, '');

								if ($svgIcons[$iconID].isReady == true) {
									setTimeout(function () {
										$that.css('opacity', '1');
										$svgIcons[$iconID].reset().play();
									}, $animationDelay);
								} else {
									setTimeout(checkIfReady, 50);
								}
							}

							function svgInit() {

								//set size
								$that.css({
									'height': parseInt($that.attr('data-size')) + 'px',
									'width': parseInt($that.attr('data-size')) + 'px'
								});

							}

							$that.addClass('bound');

						});


						// SVG in equal height column resize
						if ($('.vc_row-o-equal-height .svg-icon-holder[data-animation="true"]').length > 0 &&
						$('#nectar_fullscreen_rows').length == 0) {

							$window.on('smartresize', function () {
								clearTimeout($svgResizeTimeout);
								$svgResizeTimeout = setTimeout(function () {

									if ($svgIcons.length > 0) {
										$('.svg-icon-holder.animated-in').each(function () {

											$(this).css('opacity', '1');
											if ($(this).is('[id]')) {
												var $iconID = $(this).attr('id').replace(/[^0-9]/g, '');
												$svgIcons[$iconID].finish();
											}

										});
									}

								}, 300);

							});

						}

					}

					// After svg animated icons initalized
					else {
						$('.svg-icon-holder').addClass('animated-in').css('opacity', '1');
					}

					// Full vc row support
					$('#nectar_fullscreen_rows .svg-icon-holder.animated-in').has('svg').each(function (i) {

						var $animationDelay = 0;

						if($(this).is('[data-animation-delay]') &&
						$(this).attr('data-animation-delay').length > 0 &&
						$(this).attr('data-animation') != 'false') {
							$animationDelay = $(this).attr('data-animation-delay');
						}

						var $that = $(this);

						var $iconID = $that.find('svg').attr('id').replace(/[^0-9]/g, '');

						clearTimeout($animatedSVGIconTimeout[i]);

						if ($that.attr('data-animation') == 'false') {

							$that.css('opacity', '1');
							$svgIcons[$iconID].finish();

						} else {

							if ($(this).parents('.active').length > 0 ||
							$(this).parents('#footer-outer').length > 0 ||
							$('body.mobile').length > 0) {

								$svgIcons[$iconID].reset();
								$animatedSVGIconTimeout[i] = setTimeout(function () {
									$svgIcons[$iconID].play();
								}, $animationDelay);

							} else {
								$svgIcons[$iconID].reset().stop();
							}
						}
					});

				}



				/**
				* Fancy unordered list element initialization.
				*
				* @since 4.0
				* @see waypoints
				*/
				function nectarFancyUlInit() {

					$($fullscreenSelector + '.nectar-fancy-ul').each(function () {

						var $animation  = $(this).attr('data-animation'),
						$animationDelay = 0;

						if($(this).is('[data-animation-delay]') &&
							$(this).attr('data-animation-delay').length > 0 &&
							$(this).attr('data-animation') != 'false') {
							$animationDelay = $(this).attr('data-animation-delay');
						}

						if ($animation == 'true') {

							var $that = $(this),
							waypoint 	= new Waypoint({
								element: $that,
								handler: function () {

									if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
										waypoint.destroy();
										return;
									}

									setTimeout(function () {
										$that.find('li').each(function (i) {
											var $that = $(this);
											$that.delay(i * 220).transition({
												'opacity': '1',
												'left': '0'
											}, 220, 'easeOutCubic');
										});
									}, $animationDelay);

									$that.addClass('animated-in');
									waypoint.destroy();
								},
								offset: 'bottom-in-view'

							});

						}

					});

				}


				/**
				* Fancy unordered list element icons.
				*
				* @since 11.0
				*/
				function nectarFancyUlIcons() {

					$('.nectar-fancy-ul:not([data-list-icon="dot"]):not([data-list-icon="none"])').each(function () {

						var $icon = $(this).attr('data-list-icon'),
						$color    = $(this).attr('data-color');

						$(this).find('li').each(function () {
							$(this).find('> i').remove();
							$(this).prepend('<i class="icon-default-style ' + $icon + ' ' + $color + '"></i> ');
						});

					});

				}


				/**
				* Flipbox element height calculations.
				*
				* @since 7.0
				*/
				function flipBoxHeights() {

					$('.nectar-flip-box').each(function () {

						var $flipBoxMinHeight = parseInt($(this).attr('data-min-height')),
						$flipBoxHeight        = $(this).find('.flip-box-front .inner').height();

						if ($(this).find('.flip-box-back .inner').height() > $(this).find('.flip-box-front .inner').height()) {
							$flipBoxHeight = $(this).find('.flip-box-back .inner').height();
						}

						if ($flipBoxHeight >= $flipBoxMinHeight - 80) {
							$(this).find('> div').css('height', $flipBoxHeight + 80);
						} else {
							$(this).find('> div').css('height', 'auto');
						}

						// Safari needs 3D translate.
						if ($(this).parent().hasClass('wpb_wrapper')) {
							$(this).parent().css('transform', 'translateZ(0)');
						}

					});
				}




				/**
				* Flipbox element events.
				*
				* @since 7.0
				*/
				function flipBoxInit() {

					if( $('.nectar-flip-box').length > 0 ) {

						// Mobile gets click.
						if (nectarDOMInfo.usingMobileBrowser) {
							$body.on('click', '.nectar-flip-box', function () {
								$(this).toggleClass('flipped');
							});
						}

						flipBoxHeights();

						// Handle resize.
						$window.on('smartresize', flipBoxHeights);
					}

				}




				/**
				* Runs before other full width section calculations.
				*
				* @since 4.0
				*/
				function fullWidthSectionsPreInit() {

					// Nectar Slider force full width parent row when using full width element option.
					$('.wpb_row .vc_col-sm-12 .nectar-slider-wrap[data-full-width="true"]').each(function () {
						if ($(this).parents('.wpb_row.full-width-section').length == 0 && $(this).parents('.wpb_row.full-width-content').length == 0) {
							$(this).parents('.wpb_row').addClass('full-width-section');
						}
					});

					// Handle percent row padding values when using the boxed theme option.
					if( !nectarDOMInfo.usingMobileBrowser && $('body[data-boxed-style="1"]').length > 0 && $('#boxed').length > 0 ) {
						fullWidthRowPaddingAdjustCalcBoxed();
					}

				}



				/**
				* Full width calculations for legacy items.
				*
				* @since 4.0
				*/
				function fullWidthSections() {

					var $windowInnerWidth = nectarDOMInfo.winW,
					$bodyBorderWidth      = ($('.body-border-right').length > 0 && $windowInnerWidth > 1000) ? parseInt($('.body-border-right').width()) * 2 : 0,
					$container_width      = ($('.container-wrap').length > 0) ? parseInt($('.container-wrap').outerWidth()) : $window.width(),
					$extended_padding     = ($('body[data-ext-padding]').length > 0) ? parseInt($('body').attr('data-ext-padding'))*2 : 180;

					var $windowWidth,
					$justOutOfSight,
					$mainContentWidth;

					if ($('#boxed').length == 1) {
						$justOutOfSight = ((parseInt($('.container-wrap').width()) - parseInt($('.main-content').width())) / 2) + 4;
					} else {

						// Ext responsive mode is on - add the extra padding into the calcs
						var $extResponsivePadding = ($('body[data-ext-responsive="true"]').length > 0 && $windowInnerWidth >= 1000) ? $extended_padding : 0;

						if ($container_width - $bodyBorderWidth <= parseInt($('.main-content').css('max-width'))) {
							$windowWidth = parseInt($('.main-content').css('max-width'));
						} else {
							$windowWidth = $container_width - $bodyBorderWidth;
						}


						var $contentWidth = parseInt($('.main-content').css('max-width'));

						// Single post fullwidth
						if ($('body.single-post[data-ext-responsive="true"]').length > 0 && $('.container-wrap.no-sidebar').length > 0) {
							$contentWidth = $('.post-area').width();
							$extResponsivePadding = 0;
						}

						$justOutOfSight = Math.ceil((($windowWidth + $extResponsivePadding - $contentWidth) / 2));
					}


					$('.carousel-outer').has('.carousel-wrap[data-full-width="true"]').css('overflow', 'visible');

					$('.carousel-wrap[data-full-width="true"], .portfolio-items[data-col-num="elastic"]:not(.fullwidth-constrained), #boxed .full-width-content').each(function () {

						var $leftHeaderSize = ($('#header-outer[data-format="left-header"]').length > 0 && $windowInnerWidth >= 1000) ? parseInt($('#header-outer[data-format="left-header"]').width()) : 0;
						var $bodyBorderWidth = ($('.body-border-right').length > 0 && $windowInnerWidth > 1000) ? (parseInt($('.body-border-right').width()) * 2) - 2 : 0;

						// Single post fullwidth.
						if ($('#boxed').length == 1) {

							$mainContentWidth = ($('#nectar_fullscreen_rows').length == 0) ? parseInt($('.main-content').width()) : parseInt($(this).parents('.container').width());

							if ($('body.single-post[data-ext-responsive="true"]').length > 0 && $('.container-wrap.no-sidebar').length > 0 && $(this).parents('.post-area').length > 0) {
								$contentWidth         = $('.post-area').width();
								$extResponsivePadding = 0;
								$windowWidth          = $container_width - $bodyBorderWidth;
								$justOutOfSight       = Math.ceil((($windowWidth + $extResponsivePadding - $contentWidth) / 2));
							} else {
								if ($(this).parents('.page-submenu').length > 0) {
									$justOutOfSight = ((parseInt($('.container-wrap').width()) - $mainContentWidth) / 2);
								}
								else {
									$justOutOfSight = ((parseInt($('.container-wrap').width()) - $mainContentWidth) / 2) + 4;
								}
							}
						} else {

							if ($('body.single-post[data-ext-responsive="true"]').length > 0 && $('.container-wrap.no-sidebar').length > 0 && $(this).parents('.post-area').length > 0) {

								$contentWidth         = $('.post-area').width();
								$extResponsivePadding = 0;
								$windowWidth          = $container_width - $bodyBorderWidth;

							} else {

								var $mainContentMaxWidth = ($('#nectar_fullscreen_rows').length == 0) ? parseInt($('.main-content').css('max-width')) : parseInt($(this).parents('.container').css('max-width'));

								if ($container_width - $bodyBorderWidth <= $mainContentMaxWidth) {
									$windowWidth = $mainContentMaxWidth;
								}

								$contentWidth         = $mainContentMaxWidth;
								$extResponsivePadding = ($('body[data-ext-responsive="true"]').length > 0 && nectarDOMInfo.winW >= 1000) ? $extended_padding : 0;

								if ($leftHeaderSize > 0) {
									$extResponsivePadding = ($('body[data-ext-responsive="true"]').length > 0 && nectarDOMInfo.winW >= 1000) ? 120 : 0;
								}

							}

							$justOutOfSight = Math.ceil((($windowWidth + $extResponsivePadding - $contentWidth) / 2));
						}

						var $extraSpace = 0;
						if ($(this).hasClass('carousel-wrap')) {
							$extraSpace = 1;
						}
						if ($(this).hasClass('portfolio-items')) {
							$extraSpace = 5;
						}

						var $carouselWidth = ($('#boxed').length == 1) ? $mainContentWidth + parseInt($justOutOfSight * 2) : $container_width - $bodyBorderWidth + $extraSpace;

						// When using gutter on portfolio don't add extra space
						if ($('#boxed').length == 0 && $(this).hasClass('portfolio-items') && $(this).is('[data-gutter*="px"]') && $(this).attr('data-gutter').length > 0 && $(this).attr('data-gutter') != 'none') {
							if ($container_width > 1000) {
								$carouselWidth = $container_width - $bodyBorderWidth + 3;
							}
							else {
								$carouselWidth = $container_width - $bodyBorderWidth;
							}
						}

						if ($(this).parent().hasClass('default-style')) {

							$mainContentWidth = ($('#nectar_fullscreen_rows').length == 0) ? parseInt($('.main-content').width()) : parseInt($(this).parents('.container').width());

							if ($('#boxed').length != 0) {
								$carouselWidth  = ($('#boxed').length == 1) ? $mainContentWidth + parseInt($justOutOfSight * 2) : $container_width + $extraSpace;
							} else {
								$carouselWidth  = ($('#boxed').length == 1) ? $mainContentWidth + parseInt($justOutOfSight * 2) : ($container_width - $bodyBorderWidth) - (($container_width - $bodyBorderWidth) * 0.025) + $extraSpace;
								$windowWidth    = ($container_width - $bodyBorderWidth <= $mainContentWidth) ? $mainContentWidth : ($container_width - $bodyBorderWidth) - (($container_width - $bodyBorderWidth) * 0.025);
								$justOutOfSight = Math.ceil((($windowWidth - $mainContentWidth) / 2));
							}

						}

						else if ($(this).parent().hasClass('spaced')) {

							$mainContentWidth = ($('#nectar_fullscreen_rows').length == 0) ? parseInt($('.main-content').width()) : parseInt($(this).parents('.container').width());

							if ($('#boxed').length != 0) {
								$carouselWidth = ($('#boxed').length == 1) ? $mainContentWidth + parseInt($justOutOfSight * 2) - ($container_width * 0.02) : $container_width + $extraSpace;
							} else {
								$carouselWidth = ($('#boxed').length == 1) ? $mainContentWidth + parseInt($justOutOfSight * 2) : ($container_width - $bodyBorderWidth) - Math.ceil(($container_width - $bodyBorderWidth) * 0.02) + $extraSpace;
								var $windowWidth2 = ($container_width - $bodyBorderWidth <= $mainContentWidth) ? $mainContentWidth : ($container_width - $bodyBorderWidth) - (($container_width - $bodyBorderWidth) * 0.02);
								$justOutOfSight = Math.ceil((($windowWidth2 - $mainContentWidth) / 2) + 2);
							}
						}

						// Make sure the element/row is capable of going full width.
						if (!$(this).parents('.span_9').length > 0 &&
						!$(this).parent().hasClass('span_3') &&
						$(this).parent().attr('id') != 'sidebar-inner' &&
						!$(this).find('.nectar-carousel-flickity-fixed-content').length > 0 &&
						$(this).parent().attr('id') != 'portfolio-extra' ) {

							// Escape if inside woocoommerce page and not using applicable layout
							if ($('.single-product').length > 0 &&
							$(this).parents('#tab-description').length > 0 &&
							$(this).parents('.full-width-tabs').length == 0) {

								$(this).css({
									'visibility': 'visible'
								});

							} else {
								// Portfolio.
								if ($(this).hasClass('portfolio-items')) {

									if( $(this).parents('.full-width-content').length == 0 ) {

										$(this).css({
											'margin-left': -$justOutOfSight,
											'left': 0,
											'width': $carouselWidth,
											'visibility': 'visible'
										});

									}

								} else {

									// Fullscreen page rows left.
									if ($('#nectar_fullscreen_rows').length > 0 && $(this).hasClass('wpb_row')) {

										$(this).css({
											'margin-left': -$justOutOfSight,
											'width': $carouselWidth,
											'visibility': 'visible'
										});

									} else {
										// Regular rows.
										if( $(this).parents('.full-width-content').length == 0 ) {
											$(this).css({
												'left': 0,
												'margin-left': -$justOutOfSight,
												'width': $carouselWidth,
												'visibility': 'visible'
											});
										}
									}

								}

							}
						}

						else if ($(this).parent().attr('id') == 'portfolio-extra' && $('#full_width_portfolio').length != 0) {

							if( !$(this).find('.nectar-carousel-flickity-fixed-content').length > 0 ) {
								$(this).css({
									'left': 0,
									'margin-left': -$justOutOfSight,
									'width': $carouselWidth,
									'visibility': 'visible'
								});
							}

						} else {

							$(this).css({
								'margin-left': 0,
								'width': 'auto',
								'left': '0',
								'visibility': 'visible'
							});
						}

					});

				}



				/**
				* First full width row on page
				*
				* @since 4.0
				*/
				function firstFWSection() {

					$('.full-width-section.wpb_row, .full-width-content.wpb_row').each(function () {

						if (!$(this).parent().hasClass('span_9') &&
								!$(this).parent().hasClass('span_3') &&
								$(this).parent().attr('id') != 'sidebar-inner') {

							if ($(this).parents('#portfolio-extra').length > 0 && $('#full_width_portfolio').length == 0) {
								return false;
							}

							if ($(this).index() == '0' &&
									$pageHeaderBG.length == 0 &&
									$('.page-header-no-bg').length == 0 &&
									$('.project-title').length == 0 &&
									$('body.single').length == 0 &&
									$('.project-title').length == 0) {

									$(this).addClass('first-section');

									var $that = $(this);
									setTimeout(function () {
										$that.addClass('loaded');
									}, 50);

							}

						}

					});

				}



				/**
				* Parallax Scrolling
				*
				* @since 13.0
				*/
				function NectarParallaxScroll(el, parallaxElClass, speed, type) {

					this.$el          = el;
					this.$parallaxEl  = this.$el.find(parallaxElClass);
					this.firstSection = false;
					this.type         = type;
					this.speed        = speed;
					this.storedWinH   = nectarDOMInfo.winH;

					this.setup();
					this.resize();
					this.update();

				}

				NectarParallaxScroll.prototype.setup = function() {

					var that = this;

					// Page Header.
					if( this.$el.parents('#page-header-bg').length > 0 ) {
						this.type = 'page-header';
					}

					// Is the element in the first row on the page?
					if(this.$el.parents('.top-level').length > 0 && this.$el.parents('.parallax_slider_outer').length > 0 ||
						 this.$el.parents('.top-level').length > 0 && this.$el.hasClass('nectar-simple-slider') ||
						 this.$el.parents('.top-level').length > 0 && this.$el.hasClass('nectar-recent-posts-single_featured') ||
						 this.$el.parents('.top-level').length > 0 && this.$el.hasClass('column-image-bg-wrap') && this.$el.parent().parent().is('.vc_col-sm-12:not(.child_column)') ||
						 this.$el.is('.wpb_row.top-level') ||
						 this.type == 'page-header' ||
						 $('.wpb_row').length == 0) {
						this.firstSection = true;
					}

					//// Nectar Slider.
					if($('.wpb_row').length == 0 &&
						this.$el.parents('.parallax_slider_outer').length > 0 &&
						this.$el.is('[data-full-width="true"]') ||
						($('#portfolio-extra').length > 0 &&
						this.$el.parents('.parallax_slider_outer').length > 0 &&
						this.$el.parents('.wpb_row').length > 0 &&
						this.$el.parents('.wpb_row').index() == '0')) {
						this.firstSection = true;
					}
					//// Disable first section calcs when using FE editor.
					if (nectarDOMInfo.usingFrontEndEditor && this.type != 'page-header') {
						this.firstSection = false;
					}

					// Init class.
					this.$parallaxEl.addClass('translate');

					// Need to periodically check height/offset.
					setInterval(function() {

						if( nectarState.materialOffCanvasOpen != true ) {
							that.offsetTop = that.$el.offset().top;
							that.height    = that.$el.outerHeight(true);
						}

					}, 800);

					$(window).on('nectar-column-animation-start',this.checkColumnAnimation.bind(this));

					// Bind events.
					$(window).on('resize load', this.resize.bind(this));
					window.addEventListener("orientationchange", this.orientationChange.bind(this));
				};

				NectarParallaxScroll.prototype.checkColumnAnimation = function() {
					if( this.$parallaxEl.parents('.col.has-animation.triggered-animation:not(.animated-in)').length > 0 ) {
						this.realtimeOffsetUpdate();
					}
				};

				NectarParallaxScroll.prototype.realtimeOffsetUpdate = function() {
					// Triggered when a column animation is active.
					var that = this;

					var realTimeOffset = setInterval(function() {
						if( nectarState.materialOffCanvasOpen != true ) {
							that.offsetTop = that.$el.offset().top;
							that.height    = that.$el.outerHeight(true);
						}
					},30);

					setTimeout(function(){
						clearInterval(realTimeOffset);
					},2000);

				}

				NectarParallaxScroll.prototype.resize = function() {

					this.offsetTop = this.$el.offset().top;
					this.height = this.$el.outerHeight(true);

					if( !nectarDOMInfo.usingMobileBrowser ) {
						this.storedWinH = nectarDOMInfo.winH;
					}

				};

				NectarParallaxScroll.prototype.orientationChange = function() {

					if( nectarDOMInfo.usingMobileBrowser ) {
						this.offsetTop = this.$el.offset().top;
						this.height = this.$el.outerHeight(true);
						this.storedWinH = nectarDOMInfo.winH;
					}

				};


				NectarParallaxScroll.prototype.update = function() {

					// Outside of viewport.
					if(this.offsetTop + this.height < nectarDOMInfo.scrollTop ||
						 this.offsetTop > nectarDOMInfo.scrollTop + nectarDOMInfo.winH ||
						 nectarState.materialOffCanvasOpen == true) {

						 for(var i = 0; i < this.$parallaxEl.length; i++) {
							 this.$parallaxEl[i].style.willChange = 'auto';
						 }

						 requestAnimationFrame(this.update.bind(this));
						 return;
					}

					for(var i = 0; i < this.$parallaxEl.length; i++) {

						if( this.firstSection === true ) {
							this.$parallaxEl[i].style.transform = 'translate3d(0, ' + parseInt(nectarDOMInfo.scrollTop * this.speed) + 'px, 0)';
						}
						else {
							this.$parallaxEl[i].style.transform = 'translate3d(0, ' + parseInt(((this.storedWinH + nectarDOMInfo.scrollTop - this.offsetTop) * this.speed)) + 'px, 0) scale(1.005)';
						}
						this.$parallaxEl[i].style.willChange = 'transform';
					}

					requestAnimationFrame(this.update.bind(this));
				};



				/**
				* Parallax scroll speed helper.
				*
				* @since 4.0
				*/
				function parallaxSrollSpeed(speedString) {

					var speed;
					switch (speedString) {
						case 'slow':
							speed = 0.6;
							break;
						case 'medium':
							speed = 0.4;
							break;
						case 'medium_fast':
							speed = 0.28;
							break;
						case 'fast':
							speed = 0.20;
							break;
						case 'very_subtle':
							speed = 0.12;
							break;
					}

					return speed;
				}


				/**
				* Parallax scroll initialization.
				*
				* @since 4.0
				*/
				function parallaxScrollInit() {

					if (nectarDOMInfo.usingMobileBrowser && $('body[data-remove-m-parallax="1"]').length > 0) {
						return;
					}

					parallaxRowsBGCals();

					var parallaxItemCount = 0;

					$('.nectar-recent-posts-single_featured, [data-n-parallax-bg="true"], .wpb_row.parallax_section, #page-header-bg[data-parallax="1"] .page-header-bg-image-wrap, #page-header-bg[data-parallax="1"] .nectar-video-wrap, .parallax_slider_outer .nectar-slider-wrap').each(function() {


						// Generic.
						if( $(this).is('[data-n-parallax-bg][data-parallax-speed]') ) {
							parallaxItemsArr[parallaxItemCount] = new NectarParallaxScroll($(this), '.parallax-layer', parallaxSrollSpeed($(this).attr('data-parallax-speed')), 'regular');
							parallaxItemCount++;
						}
						else {

							if ( $(this).find('[data-parallax-speed="fixed"]').length == 0) {

								// Slider.
								if ( $(this).hasClass('nectar-slider-wrap') ) {
									parallaxItemsArr[parallaxItemCount] = new NectarParallaxScroll($(this), '.video-wrap, .image-bg', 0.25, 'nectar-slider');
								}
								// Page Header.
								else if( $(this).hasClass('page-header-bg-image-wrap') ) {
									parallaxItemsArr[parallaxItemCount] = new NectarParallaxScroll($(this), '.page-header-bg-image', 0.25, 'page-header');
								}
								else if( $(this).hasClass('nectar-video-wrap') && $(this).parents('#page-header-bg').length > 0 ) {
									parallaxItemsArr[parallaxItemCount] = new NectarParallaxScroll($(this), '.nectar-video-bg', 0.25, 'page-header');
								}
								// All Others.
								else {
									parallaxItemsArr[parallaxItemCount] = new NectarParallaxScroll($(this), '.row-bg.using-image', parallaxSrollSpeed($(this).find('.row-bg').attr('data-parallax-speed')), 'regular');
								}

								parallaxItemCount++;

							}

						}

						$(this).addClass('nectar-parallax-enabled');

					});

					$('.woocommerce-tabs .wc-tabs li').on('click', function(){
						setTimeout(parallaxRowsBGCals,100);
					});


				}



				/**
				* Parallax row background height calculations.
				*
				* @since 6.0
				*/
				function parallaxRowsBGCals() {

					if (nectarDOMInfo.usingMobileBrowser && $('body[data-remove-m-parallax="1"]').length > 0) {
						return;
					}

					$('.nectar-recent-posts-single_featured, [data-n-parallax-bg="true"], .wpb_row.parallax_section, #page-header-bg[data-parallax="1"] .page-header-bg-image-wrap, .parallax_slider_outer .nectar-slider-wrap .slide-bg-wrap').each(function () {

						var $non_page_builder_slider;

						if( $(this).parents('.wpb_tab:not(.visible-tab)').length > 0 || $(this).parents('.wc-tab').length > 0 && $(this).parents('.wc-tab').css('display') !== 'block' ) {
								return true;
						}

						if ($(this).find('.row-bg').length == 0 &&
						    $(this).find('.page-header-bg-image').length > 0 ) {
							//skip processing.
						}
						else if ($(this).find('.row-bg').length == 0 &&
						         $(this).find('.image-bg').length > 0) {

							$non_page_builder_slider = false;

							// First nectar slider shortcode without page builder
							if ($('.wpb_row').length == 0 &&
									$(this).parents('.nectar-slider-wrap[data-full-width="true"]').length > 0 &&
									$(this).parents('.parallax_slider_outer').length > 0 &&
									$(this).parents('.parallax_slider_outer').index() == '1') {
										$non_page_builder_slider = true;
							}

							// Portfolio first
							if ($('#portfolio-extra').length > 0 &&
									$(this).parents('.wpb_row').length > 0 &&
									$(this).parents('.parallax_slider_outer').length > 0 &&
									$(this).parents('.wpb_row').index() == '0') {
								$non_page_builder_slider = true;
							}

							// Set heights.
							if ($(this).parents('.top-level').length > 0 && !nectarDOMInfo.usingFrontEndEditor ||
									$non_page_builder_slider && !nectarDOMInfo.usingFrontEndEditor) {

									$(this).find('.image-bg').css({
										'height': Math.ceil($(this).parent().offset().top * 0.25) + $(this).outerHeight(true)
									});
							} else {
								$(this).find('.image-bg').css({
									'height': Math.ceil($window.height() * 0.25) + $(this).outerHeight(true)
								});
							}

						}

						// Video backgrounds.
						else if ($(this).find('.row-bg').length == 0 && $(this).find('.video-wrap').length > 0) {

							$non_page_builder_slider = false;
							// First nectar slider shortcode without page builder
							if ($('.wpb_row').length == 0 &&
							$(this).parents('.nectar-slider-wrap[data-full-width="true"]').length > 0 &&
							$(this).parents('.parallax_slider_outer').length > 0 &&
							$(this).parents('.parallax_slider_outer').index() == '1') {
								$non_page_builder_slider = true;
							}
							// Portfolio first
							if ($('#portfolio-extra').length > 0 &&
							$(this).parents('.wpb_row').length > 0 &&
							$(this).parents('.parallax_slider_outer').length > 0 &&
							$(this).parents('.wpb_row').index() == '0') {
								$non_page_builder_slider = true;
							}

							// Set heights.
							if ($(this).parents('.top-level').length > 0 && !nectarDOMInfo.usingFrontEndEditor ||
							$non_page_builder_slider && !nectarDOMInfo.usingFrontEndEditor) {

								$(this).find('.video-wrap').css({
									'height': Math.ceil($(this).parent().offset().top * 0.25) + $(this).outerHeight(true)
								});
							}

							else {
								$(this).find('.video-wrap').css({
									'height': Math.ceil($window.height() * 0.25) + $(this).outerHeight(true)
								});
							}

							var vid     = $(this).find('.video-wrap video'),
							vid_w_orig  = 1280,
							vid_h_orig  = 720;

							// Get the parent element size
							var container_w = vid.parent().width(),
							container_h     = vid.parent().height(),
							scale_w         = container_w / vid_w_orig,
							scale_h         = container_h / vid_h_orig;

							var scale       = scale_w > scale_h ? scale_w : scale_h;

							// Scale the video.
							vid.width(scale * vid_w_orig);
							vid.height(scale * vid_h_orig);

						} else {

							// Top Level Special elements, Recent posts/ Simple Slider.
							if ($(this).is('.nectar-recent-posts-single_featured') &&
							    $(this).parents('.top-level').length > 0 &&
									!nectarDOMInfo.usingFrontEndEditor) {
								//skip processing.
							}
							else if ($(this).is('.nectar-simple-slider') &&
							    $(this).parents('.top-level').length > 0 &&
									!nectarDOMInfo.usingFrontEndEditor) {
								//skip processing.
							}
							else if($(this).is('.column-image-bg-wrap') &&
							  $(this).parents('.top-level').length > 0 &&
								$(this).parent().parent().is('.vc_col-sm-12:not(.child_column)')) {
								//skip processing.
							}
							// Regular.
							else if (!$(this).hasClass('top-level') || nectarDOMInfo.usingFrontEndEditor || $(this).find('.parallax-layer').length > 0) {

								var classSelector = '.row-bg';
								var parallaxSpeed = $(this).find('.row-bg').attr('data-parallax-speed');

								if( $(this).find('.parallax-layer').length > 0 ) {
									classSelector =  '.parallax-layer';
									parallaxSpeed = $(this).attr('data-parallax-speed');
								}

								var $ifFast = ($(this).find(classSelector + '[data-parallax-speed="fast"]').length > 0) ? 60 : 0;
								$(this).find(classSelector).css({
									'height': Math.ceil($window.height() * parallaxSrollSpeed(parallaxSpeed) ) + $(this).outerHeight(true) + $ifFast
								});


							}

						}

					});

				}


				/**
				* Class names added for specific full width section rows at top
				*
				* @since 3.0
				*/
				function fwsClasses() {

					$('.wpb_wrapper > .nectar-slider-wrap[data-full-width="true"]').each(function () {
						if (!$(this).parent().hasClass('span_9') && !$(this).parent().hasClass('span_3') && $(this).parent().attr('id') != 'sidebar-inner') {
							if ($(this).parents('.wpb_row').index() == '0') {
								$(this).addClass('first-nectar-slider');
							}
						}
					});

					var $contentElementsNum = ($('#portfolio-extra').length == 0) ? $('.main-content > .row > *').length : $('.main-content > .row #portfolio-extra > *').length;

					if ($('#portfolio-extra').length == 0) {
						$contentElementsNum = ($('.main-content > .row > .wpb_row').length > 0) ? $('.main-content > .row > .wpb_row').length : $('.main-content > .row > *').length;
					} else {
						$contentElementsNum = $('.main-content > .row #portfolio-extra > *').length;
					}

					$('.container-wrap .full-width-section, .container-wrap .full-width-content:not(.page-submenu .full-width-content):not(.blog-fullwidth-wrap), .row > .nectar-slider-wrap[data-full-width="true"], .wpb_wrapper > .nectar-slider-wrap[data-full-width="true"], .portfolio-items[data-col-num="elastic"]').each(function () {

						if( $(this).parents('.nectar-global-section.before-footer').length > 0 ) {
							return true;
						}


						if (!$(this).parent().hasClass('span_9') && !$(this).parent().hasClass('span_3') && $(this).parent().attr('id') != 'sidebar-inner') {

							if ($(this).parents('.wpb_row').length > 0) {

								if ($(this).parents('#portfolio-extra').length > 0 &&
									$('#full_width_portfolio').length == 0) {
									return false;
								}

								////first
								if ($(this).parents('.wpb_row').index() == '0' && $pageHeaderBG.length != 0) {
									//skip processing.
								}
								else if ($(this).parents('.wpb_row').index() == '0' &&
								$pageHeaderBG.length == 0 && $('.page-header-no-bg').length == 0 &&
								$('.project-title').length == 0 && $(this).parents('.wpb_row').index() == '0' &&
								$('.project-title').length == 0 && $('body[data-bg-header="true"]').length == 0) {

									if ($('.single').length == 0) {
										$('.container-wrap').css('padding-top', '0px');
									} else {
										$(this).addClass('first-section');
									}

								}

								// Check if it's also last (i.e. the only fws)
								if ($(this).parents('.wpb_row').index() == $contentElementsNum - 1 && $('#respond').length == 0) {
									if ($(this).attr('id') != 'portfolio-filters-inline') {
										$('.container-wrap').css('padding-bottom', '0px');
										$('#call-to-action .triangle').remove();
									}
								}

							} else {

								if ($(this).parents('#portfolio-extra').length > 0 && $('#full_width_portfolio').length == 0) {
									return false;
								}

								if ($(this).find('.portfolio-filters-inline').length == 0 && $(this).attr('id') != 'post-area') {

									////first
									if ($(this).index() == '0' && $pageHeaderBG.length != 0) {
										//skip processing.
									}
									else if ($(this).index() == '0' && $pageHeaderBG.length == 0 &&
									$(this).index() == '0' && $('.page-header-no-bg').length == 0 &&
									$(this).index() == '0' && !$(this).hasClass('blog_next_prev_buttons') &&
									!$(this).hasClass('nectar-shop-outer') && $(this).parents('.pum-container').length == 0) {

										if ($('body[data-header-resize="0"]').length == 1 && $('.single').length == 0 || $('body.material').length > 0 && $('.single').length == 0) {

											if (!$('body.blog .blog-fullwidth-wrap > .masonry:not(.meta-overlaid)').length > 0) {
												$('.container-wrap').css('padding-top', '0px');
											}

										}

										else {
											$(this).addClass('first-section');
										}

									}

									//check if it's also last (i.e. the only fws)
									if ($(this).index() == $contentElementsNum - 1 && $('#respond').length == 0 && $('body.woocommerce-checkout').length == 0) {
										$('.container-wrap').css('padding-bottom', '0px');
										$('.bottom_controls').css('margin-top', '0px');
										$('#call-to-action .triangle').remove();
									}

								}
							}
						}

					});


					$('#portfolio-extra > .nectar-slider-wrap[data-full-width="true"], .portfolio-wrap').each(function () {
						//check if it's last
						if ($(this).index() == $contentElementsNum - 1 && $('#commentform').length == 0 && $('#pagination').length == 0) {
							if (parseInt($('.container-wrap').css('padding-bottom')) > 0) {
								$(this).css('margin-bottom', '-40px');
							}
							$('#call-to-action .triangle').remove();
						}
					});


					$('.portfolio-filters').each(function () {
						////first
						if ($(this).index() == '0' && $pageHeaderBG.length != 0 || $(this).index() == '0') {
							$(this).addClass('first-section nder-page-header');
						} else if ($(this).index() == '0' && $pageHeaderBG.length == 0 || $(this).index() == '0') {
							$(this).css({
								'margin-top': '0px'
							}).addClass('first-section');
						}
					});


					$('.portfolio-filters-inline').each(function () {
						////first
						if ($(this).parents('.wpb_row').length > 0) {
							//skip processing.
						} else {
							if ($(this).index() == '0' && $pageHeaderBG.length != 0 || $(this).index() == '0') {
								$(this).addClass('first-section nder-page-header');
							} else if ($(this).index() == '0' && $pageHeaderBG.length == 0 || $(this).index() == '0') {

								$(this).css({
									'margin-top': '-30px',
									'padding-top': '50px'
								}).addClass('first-section');

							}
						}

					});


				}




				/**
				* Full width row padding adjust calculations.
				*
				* @since 3.0
				*/
				function fullWidthRowPaddingAdjustCalc() {

					if ($('#boxed').length == 0) {

						$('.full-width-section[data-top-percent], .full-width-section[data-bottom-percent], .full-width-content[data-top-percent], .full-width-content[data-bottom-percent]').each(function () {

							var $windowHeight = $window.width(),
							$topPadding       = ($(this).attr('data-top-percent')) ? $(this).attr('data-top-percent') : 'skip',
							$bottomPadding    = ($(this).attr('data-bottom-percent')) ? $(this).attr('data-bottom-percent') : 'skip';

							//top
							if ($topPadding != 'skip') {
								$(this).css('padding-top', $windowHeight * (parseInt($topPadding) / 100));
							}

							//bottom
							if ($bottomPadding != 'skip') {
								$(this).css('padding-bottom', $windowHeight * (parseInt($bottomPadding) / 100));
							}

						});
					}
				}

				/**
				* Full width row padding adjust calculations for boxed theme option.
				*
				* @since 11.0.4
				*/
				function fullWidthRowPaddingAdjustCalcBoxed() {

					if ($('#boxed').length > 0) {

						$('.full-width-section[data-top-percent], .full-width-section[data-bottom-percent], .full-width-content[data-top-percent], .full-width-content[data-bottom-percent]').each(function () {

							var $topPadding = ($(this).attr('data-top-percent')) ? $(this).attr('data-top-percent') : 'skip',
							$bottomPadding  = ($(this).attr('data-bottom-percent')) ? $(this).attr('data-bottom-percent') : 'skip';

							//top
							if ($topPadding != 'skip') {
								$(this).css('padding-top', $topPadding);
							}

							//bottom
							if ($bottomPadding != 'skip') {
								$(this).css('padding-bottom', $bottomPadding);
							}

						});
					}

				}


				/**
				* Full width row padding adjust initialization
				*
				* @since 10.5
				*/
				function fullWidthRowPaddingAdjust() {

					if (nectarDOMInfo.usingMobileBrowser) {
						fullWidthRowPaddingAdjustCalc();
					}

					$window.on('resize', fullWidthRowPaddingAdjustCalc);

				}




				/**
				* Full width content row auto equal height cols.
				*
				* @since 4.0
				*/
				function fullWidthContentColumns() {

					var $frontEndEditorElDiv = ($('body.vc_editor').length > 0) ? '.vc_element > ' : '';

					$('.main-content > .row > ' + $frontEndEditorElDiv + ' .full-width-content, #portfolio-extra > ' + $frontEndEditorElDiv + ' .full-width-content, .woocommerce-tabs #tab-description > .full-width-content, .post-area.span_12 article .content-inner > .full-width-content').each(function () {

						// Only set the height if more than one column
						if ($(this).find('> .span_12 > ' + $frontEndEditorElDiv + ' .col').length > 1) {

							var tallestColumn       = 0;
							var $columnInnerHeight  = 0;
							var $column_inner_selector;

							$(this).find('> .span_12 > ' + $frontEndEditorElDiv + '  .col').each(function () {

								$column_inner_selector = ($(this).find('> .vc_column-inner > .wpb_wrapper').length > 0) ? '.vc_column-inner' : '.column-inner-wrap > .column-inner';

								var $padding = ( $body.is('[data-flex-cols="true"]') ) ? parseInt($(this).find('> .vc_column-inner').css('padding-top')) : parseInt($(this).css('padding-top'));
								var $frontEndEditorElPadding = ($frontEndEditorElDiv.length > 2 && $(this).find('> .vc_column-inner').length > 0) ? parseInt($(this).find('> .vc_column-inner').css('padding-top')) : 0;

								if( $(this).find('> ' + $column_inner_selector + ' > .wpb_wrapper').height() + ($padding * 2) + $frontEndEditorElPadding > tallestColumn ) {
									tallestColumn = $(this).find('> ' + $column_inner_selector + ' > .wpb_wrapper').height() + ($padding * 2) + $frontEndEditorElPadding;
								}

							});

							$(this).find('> .span_12 > ' + $frontEndEditorElDiv + ' .col').each(function () {

								$column_inner_selector = ($(this).find('> .vc_column-inner > .wpb_wrapper').length > 0) ? '.vc_column-inner' : '.column-inner-wrap > .column-inner';

								// Columns with content
								if ($(this).find('> ' + $column_inner_selector + ' > .wpb_wrapper > *').length > 0) {

									// Added in 7.6 to fix equal height columns
									if ($frontEndEditorElDiv.length < 2 && !$(this).parent().parent().hasClass('vc_row-o-equal-height')) {
										$(this).css('height', tallestColumn);

										if( $body.is('[data-flex-cols="true"]') ) {
											$(this).find('> .vc_column-inner').css('height', tallestColumn);
										}

									} else if ($frontEndEditorElDiv.length > 2 && !$(this).parent().parent().parent().hasClass('vc_row-o-equal-height')) {
										$(this).css('height', tallestColumn);

										if( $body.is('[data-flex-cols="true"]') ) {
											$(this).find('> .vc_column-inner').css('height', tallestColumn);
										}

									}
								}

								// Empty columns
								else {
									if ($(this).is('[data-using-bg="true"]')) {

										$(this).css('min-height', tallestColumn);

										if( $body.is('[data-flex-cols="true"]') ) {
											$(this).find('> .vc_column-inner').css('min-height', tallestColumn);
										}

										if ($(this).is('[data-animation*="reveal"]')) {
											$(this).find('.column-inner')
												.css('min-height', tallestColumn);
										}

									}
								}

							});

							// Nested column height
							if (nectarDOMInfo.winW < 1000) {
								$(this).find('> .span_12 > ' + $frontEndEditorElDiv + ' .col .wpb_row .col').css('min-height', '0px');
							}

							// Vertically center
							if ($(this).hasClass('vertically-align-columns') &&
							nectarDOMInfo.winW > 1000 &&
							!$(this).hasClass('vc_row-o-equal-height')) {

								// Parent columns
								$(this).find('> .span_12 > ' + $frontEndEditorElDiv + ' .col').each(function () {

									$column_inner_selector = ($(this).find('> .vc_column-inner > .wpb_wrapper').length > 0) ? '.vc_column-inner' : '.column-inner-wrap > .column-inner';

									$columnInnerHeight = $(this).find('> ' + $column_inner_selector + ' > .wpb_wrapper').height();

									var $marginCalc = ($(this).height() / 2) - ($columnInnerHeight / 2);

									if ($marginCalc <= 0) {
										$marginCalc = 0;
									}

									$(this).find('> ' + $column_inner_selector + ' > .wpb_wrapper')
										.css('margin-top', $marginCalc)
										.css('margin-bottom', $marginCalc);

								});


							}

						}

					});


					if( $('body[data-flex-cols="true"]').length == 0 ) {

						// Equal height columns in container type with reveal columns
						$('.main-content > .row > .wpb_row:not(.full-width-content).vc_row-o-equal-height').each(function () {
							if ($(this).find('>.span_12 > ' + $frontEndEditorElDiv + ' .wpb_column[data-animation*="reveal"]').length > 0) {

								var tallestColumn = 0;

								$(this).find('> .span_12 > ' + $frontEndEditorElDiv + ' .col').each(function () {

									var $padding = parseInt($(this).find('> .column-inner-wrap > .column-inner').css('padding-top'));

									if( $(this).find('> .column-inner-wrap > .column-inner').height() + ($padding * 2) > tallestColumn ) {
										tallestColumn = $(this).find('> .column-inner-wrap > .column-inner').height() + ($padding * 2);
									}

								});

								$(this).find('> .span_12 > ' + $frontEndEditorElDiv + ' .col').each(function () {

									// Columns with content
									if ($(this).find('> .column-inner-wrap > .column-inner .wpb_wrapper > *').length > 0) {
										$(this).find('> .column-inner-wrap').css('height', tallestColumn);
									}
									// Empty columns
									else {
										$(this).css('min-height', tallestColumn);
										if ($(this).is('[data-animation*="reveal"]')) {
											$(this).find('.column-inner').css('min-height', tallestColumn);
										}
									}
								});

							}
						});

						// Using equal height option, top/bottom padding % needs to be convered into px for cross browser (flex bug)
						$('.wpb_row.vc_row-o-equal-height>.span_12> ' + $frontEndEditorElDiv + '.wpb_column[class*="padding-"][data-padding-pos="all"]').each(function () {
							if ($(this).parents('.tabbed').length == 0) {
								$(this).css({
									'padding-top': $(this).css('padding-left'),
									'padding-bottom': $(this).css('padding-left')
								});
							}
						});

					} // endif; Not using modern grid system.

				}




				/**
				* Mouse parallax row option.
				*
				* @since 4.0
				*/
				function mouseParallaxInit() {

					$('.wpb_row:has(.nectar-parallax-scene)').each(function (i) {

						var $strength = parseInt($(this).find('.nectar-parallax-scene').attr('data-scene-strength'));

						$mouseParallaxScenes[i] = $(this).find('.nectar-parallax-scene').parallax({
							scalarX: $strength,
							scalarY: $strength
						});

						// Wait until the images in the scene have loaded.
						var images = $(this).find('.nectar-parallax-scene li');

						$.each(images, function () {
							if ($(this).find('div').length > 0) {
								var el = $(this).find('div'),
								image = el.css('background-image').replace(/"/g, '').replace(/url\(|\)$/ig, '');
								if (image && image !== '' && image !== 'none') {
									images = images.add($('<img>').attr('src', image));
								}
							}
						});

					});

				}




				/**
				* Add checkmark icons to unorder list with checkmark class.
				*
				* @since 2.0
				*/
				function ulCheckmarks() {
					$('ul.checks li').each(function () {
						if ($(this).find('i.fa-check-circle').length == 0) {
							$(this).prepend('<i class="fa fa-check-circle"></i>');
						}
					});
				}



				/**
				* Allow CTA element BG color to also act as a link.
				*
				* @since 11.0
				*/
				function ctaLinkBG() {

					$body.on('click','.nectar-cta[data-using-bg="true"]:not([data-style="material"]) .link_wrap', function(e) {
						if( !$(e.target).is('a') ) {
							$(this).find('a.link_text')[0].click();
						}
					});

				}



				/**
				* Add CSS default animation classes through JS to
				* avoid inital animation on page load.
				*
				* @since 11.0
				*/
				function nectarKeyframeAssist() {

					$('.nectar-cta[data-style="arrow-animation"]').addClass('loaded');

				}




				/**
				* Page builder row background layer animations.
				*
				* @since 9.0
				* @see waypoints
				*/
				function rowBGAnimations() {

					var $rowBGAnimationsOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : '93%';
					var $rowBGAnimationsRevealOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : '97%';
					var $rowBGOffset;

					$($fullscreenSelector + '.row-bg-wrap[data-bg-animation]:not([data-bg-animation="none"]) .row-bg').each(function () {

						var $animation = $(this).parents('.row-bg-wrap').attr('data-bg-animation');

						if( $animation != 'zoom-out-reveal' && $animation.indexOf('reveal-from-') == -1  ) {
							$rowBGOffset = $rowBGAnimationsOffsetPos;
						} else {
							$rowBGOffset = $rowBGAnimationsRevealOffsetPos;
						}

						if( !$(this).hasClass('using-image') && $(this).parents('.nectar-scrolling-text').length == 0 ) {

							if( $animation != 'zoom-out-reveal' && $animation.indexOf('reveal-from-') == -1 ) {
								return;
							}

						}


						var $that = $(this);
						var waypoint = new Waypoint({
							element: $that.parents('.row-bg-wrap'),
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
									waypoint.destroy();
									return;
								}

								$that.parents('.inner-wrap').addClass('animated-in');

								if( $animation == 'zoom-out-reveal' || $animation.indexOf('reveal-from-') > -1 || $that.parents('.nectar-scrolling-text').length > 0 ) {
									$that.parents('.row-bg-wrap').addClass('animated-in');
								}

								waypoint.destroy();
							},
							offset: $rowBGOffset
						});

					});

				}


				/**
				* Page builder column background layer animations.
				*
				* @since 9.0
				* @see waypoints
				*/
				function columnBGAnimations() {

					var $colBGAnimationsOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : '93%';
					var $colBGAnimationsRevealOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : '80%';
					var $colBGOffset;

					$($fullscreenSelector + '.column-image-bg-wrap[data-bg-animation]:not([data-bg-animation="none"]):not([data-bg-animation*="displace-filter"]) .column-image-bg').each(function () {

						var $animation = $(this).parents('.column-image-bg-wrap').attr('data-bg-animation');

						if( $animation != 'zoom-out-reveal' && $animation.indexOf('reveal-from-') == -1 ) {
							$colBGOffset = $colBGAnimationsOffsetPos;
						} else {

							if( $animation == 'ro-reveal-from-bottom' && $fullscreenMarkupBool == false ) {
								$colBGOffset = '95%';
							} else if( $animation == 'ro-reveal-from-top' && $fullscreenMarkupBool == false ) {
								$colBGOffset = '65%';
							} else {
								$colBGOffset = $colBGAnimationsRevealOffsetPos;
							}
						}

						var $that = $(this);

						var waypoint = new Waypoint({
							element: $that.parents('.column-image-bg-wrap'),
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
									waypoint.destroy();
									return;
								}

								$that.parents('.inner-wrap').addClass('animated-in');
								if( $animation == 'zoom-out-reveal' || $animation.indexOf('reveal-from-') > -1 ) {
									$that.parents('.column-image-bg-wrap').addClass('animated-in');
									$that.parents('.column-image-bg-wrap').siblings('.column-bg-overlay-wrap').addClass('animated-in');
									$that.parents('.vc_column-inner').addClass('revealed-bg');
								}
								waypoint.destroy();
							},
							offset: $colBGOffset
						});

					});

					// Zoom out reveal with BG color only
					$($fullscreenSelector + '.column-bg-overlay-wrap[data-bg-animation]').each(function () {

						$colBGOffset = $colBGAnimationsRevealOffsetPos;

						var $that = $(this);
						var $animation = $(this).attr('data-bg-animation');

						if( $animation == 'zoom-out-reveal' || $animation.indexOf('reveal-from-') > 0 ) {

							if( $that.parent().find('.column-image-bg-wrap').length == 0 ) {

								var waypoint = new Waypoint({
									element: $that,
									handler: function () {

										if ( $that.hasClass('animated-in') ) {
											waypoint.destroy();
											return;
										}

										$that.addClass('animated-in');
										$that.parents('.vc_column-inner').addClass('revealed-bg');
										waypoint.destroy();

									},
									offset: $colBGOffset
								});

							}

						}

					});

				}



				/**
				* Page builder column and image animations.
				*
				* @since 4.0
				* @see waypoints
				*/
				function colAndImgAnimations() {

					var $colAndImgOffsetPos       = ($fullscreenMarkupBool == true) ? '500%' : '88%';
					var $cascadingOffsetPos       = ($fullscreenMarkupBool == true) ? '500%' : '70%';
					var $colAndImgRevealOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : '70%';

					$($fullscreenSelector + '.img-with-animation').each(function () {

						var $that = $(this);

						var $animationType = ($that.is('[data-animation]')) ? $that.attr('data-animation') : 'fade-in';

						// reveal images alters offset
						if( $animationType == 'ro-reveal-from-right' && $colAndImgOffsetPos == '88%' ||
						$animationType == 'ro-reveal-from-left' && $colAndImgOffsetPos == '88%' ) {
							$colAndImgOffsetPos = '75%';
						}

						// initiate waypoint.
						var waypoint = new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
									waypoint.destroy();
									return;
								}

								if (!bypassAnimations || $('body[data-responsive="0"]').length > 0) {

									var $delay       = ($that.is('[data-delay]')) ? $that.attr('data-delay') : 0;
									var $elToAnimate = ($that.parents('.hover-wrap').length > 0) ? $that.parents('.hover-wrap') : $that;


									if ($animationType == 'fade-in-from-left' || $animationType == 'fade-in-from-right') {

										$elToAnimate.delay($delay).transition({
											'opacity': 1,
											'x': '0px'
										}, $animationDuration, $animationEasing);

									} else if ($animationType == 'fade-in-from-bottom') {

										$elToAnimate.delay($delay).transition({
											'opacity': 1,
											'y': '0px'
										}, $animationDuration, $animationEasing);

									} else if ($animationType == 'fade-in') {

										$elToAnimate.delay($delay).transition({
											'opacity': 1
										}, $animationDuration, $animationEasing);

									} else if ($animationType == 'grow-in') {

										setTimeout(function () {
											$elToAnimate.transition({
												scale: 1,
												'opacity': 1
											}, $animationDuration, $animationEasing);
										}, $delay);

									} else if ($animationType == 'flip-in') {

										setTimeout(function () {
											$elToAnimate.transition({
												rotateY: 0,
												'opacity': 1
											}, $animationDuration, $animationEasing);
										}, $delay);

									} else if ($animationType == 'flip-in-vertical') {

										setTimeout(function () {
											$elToAnimate.transition({
												rotateX: 0,
												'opacity': 1
											}, $animationDuration, $animationEasing);
										}, $delay);

									}
									else if ($animationType == 'ro-reveal-from-left' ||
									$animationType == 'ro-reveal-from-right' ||
									$animationType == 'ro-reveal-from-bottom' ||
									$animationType == 'ro-reveal-from-top') {
										$that.parents('.img-with-aniamtion-wrap').addClass('animated-in');
									}

									$that.addClass('animated-in');

								}

								waypoint.destroy();

							},
							offset: $colAndImgOffsetPos
						});



					});


					$($fullscreenSelector + '.nectar_cascading_images').each(function () {

						var $that           = $(this);
						var $animationDelay = ($(this).is('[data-animation-timing]')) ? $(this).attr('data-animation-timing') : 175;
						$animationDelay     = parseInt($animationDelay);

						var waypoint = new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
									waypoint.destroy();
									return;
								}

								if (!bypassAnimations || $('body[data-responsive="0"]').length > 0) {

									$that.find('.cascading-image').each(function (i) {

										var $that2 = $(this);

										if ($that2.attr('data-animation') == 'flip-in' || $that2.attr('data-animation') == 'flip-in-vertical') {
											setTimeout(function () {
												$that2.find('.inner-wrap').css({
													'opacity': 1,
													'transform': 'rotate(0deg) translateZ(0px)'
												});
											}, i * $animationDelay);
										} else if( $that2.attr('data-animation') == 'grow-in-reveal' ) {
											setTimeout(function () {
												$that2.find('.inner-wrap').css({
													'opacity': 1,
													'transform': 'translateX(0px) translateY(0px) scale(1,1) translateZ(0px)'
												});
												$that2.find('.inner-wrap img').css({
													'transform': 'translateX(0px) translateY(0px) scale(1,1) translateZ(0px)'
												});
											}, i * $animationDelay);
										}
										else {
											setTimeout(function () {
												$that2.find('.inner-wrap').css({
													'opacity': 1,
													'transform': 'translateX(0px) translateY(0px) scale(1,1) translateZ(0px)'
												});
											}, i * $animationDelay);
										}


									});

									$that.addClass('animated-in');

								}

								waypoint.destroy();

							},
							offset: $cascadingOffsetPos
						});

					});


					$($fullscreenSelector + '.col.has-animation:not([data-animation*="reveal"]), ' + $fullscreenSelector + '.wpb_column.has-animation:not([data-animation*="reveal"]), ' + $fullscreenSelector + '.nectar-fancy-box.has-animation').each(function (i) {

						var $that = $(this);

						var waypoint = new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
									waypoint.destroy();
									return;
								}

								if (!bypassAnimations || $('body[data-responsive="0"]').length > 0) {

									$that.addClass('triggered-animation');
									$(window).trigger('nectar-column-animation-start');

									var $delay = $that.attr('data-delay');

									if ($that.attr('data-animation') == 'fade-in-from-left' || $that.attr('data-animation') == 'fade-in-from-right') {

										$standAnimatedColTimeout[i] = setTimeout(function () {
											$that.transition({
												'opacity': 1,
												'x': '0px'
											}, $animationDuration, $animationEasing);
										}, $delay);

									} else if ($that.attr('data-animation') == 'fade-in-from-bottom') {

										$standAnimatedColTimeout[i] = setTimeout(function () {
											$that.transition({
												'opacity': 1,
												'y': '0px'
											}, $animationDuration, $animationEasing);
										}, $delay);

									} else if ($that.attr('data-animation') == 'fade-in') {

										$standAnimatedColTimeout[i] = setTimeout(function () {
											$that.transition({
												'opacity': 1
											}, $animationDuration, $animationEasing);
										}, $delay);

									} else if ($that.attr('data-animation') == 'grow-in' || $that.attr('data-animation') == 'zoom-out') {

										$standAnimatedColTimeout[i] = setTimeout(function () {
											$that.transition({
												scale: 1,
												'opacity': 1
											}, $animationDuration, $animationEasing);
										}, $delay);

									} else if ($that.attr('data-animation') == 'flip-in') {

										$standAnimatedColTimeout[i] = setTimeout(function () {
											$that.transition({
												rotateY: '0',
												'opacity': 1
											}, $animationDuration, $animationEasing);
										}, $delay);

									} else if ($that.attr('data-animation') == 'flip-in-vertical') {

										$standAnimatedColTimeout[i] = setTimeout(function () {
											$that.transition({
												rotateX: '0',
												y: '0',
												'opacity': 1
											}, $animationDuration, $animationEasing);
										}, $delay);

									} else if ($that.attr('data-animation') == 'slight-twist') {

										$standAnimatedColTimeout[i] = setTimeout(function () {
											anime({
												targets: $that[0],
												rotateY: [20, 0],
												rotateZ: [-4, 0],
												opacity: 1,
												easing: $animationEasing,
												duration: $animationDuration
											});
										}, $delay);

									}

									//boxed column hover fix
									if ($that.hasClass('boxed')) {
										$that.addClass('no-pointer-events');
										setTimeout(function () {
											$that.removeClass('no-pointer-events');
										}, parseInt($animationDuration) + parseInt($delay) + 30);
									}

									if ($that.find('.nectar-post-grid-wrap[data-style="mouse_follow_image"]')) {
										setTimeout(function() {
											$that[0].style.transform = 'none';
										}, parseInt($animationDuration) + parseInt($delay) + 30 );
									}

									$that.addClass('animated-in');

								}

								waypoint.destroy();
							},
							offset: $colAndImgOffsetPos
						});

					});


					$($fullscreenSelector + '.wpb_column.has-animation[data-animation*="reveal"]').each(function () {

						var $that = $(this),
						waypoint 	= new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
									waypoint.destroy();
									return;
								}

								var $delay = $that.attr('data-delay');

								if (!bypassAnimations || $('body[data-responsive="0"]').length > 0) {

									var $columnInnerSelector = ( $that.find('> .vc_column-inner').length > 0 ) ? true : false;

									if ($that.attr('data-animation') == 'reveal-from-bottom' || $that.attr('data-animation') == 'reveal-from-top') {

										setTimeout(function () {

											if ($that.hasClass('animated-in')) {

												if( $columnInnerSelector == true ) {

													// Modern.
													$that.find('> .vc_column-inner').transition({
														'y': 0
													}, $animationDuration, $animationEasing );

												} else {

													// Legacy.
													$that.find('.column-inner-wrap, .column-inner').transition({
														'y': 0
													}, $animationDuration, $animationEasing, function () {
														$that.find('.column-inner-wrap, .column-inner').addClass('no-transform');
													});
												}

											}

										}, $delay);

									} else if ($that.attr('data-animation') == 'reveal-from-right' || $that.attr('data-animation') == 'reveal-from-left') {
										setTimeout(function () {
											if ($that.hasClass('animated-in')) {

												if( $columnInnerSelector == true ) {

													// Modern.
													$that.find('> .vc_column-inner').transition({
														'x': 0
													}, $animationDuration, $animationEasing);


												} else {
													// Legacy.
													$that.find('.column-inner-wrap, .column-inner').transition({
														'x': 0
													}, $animationDuration, $animationEasing, function () {
														$that.find('.column-inner-wrap, .column-inner').addClass('no-transform');
													});

												}


											}
										}, $delay);
									}

									$that.addClass('animated-in');

								}

								waypoint.destroy();
							},
							offset: $colAndImgRevealOffsetPos
						});

					});

				}



				/**
				* Cascading images element sizing
				*
				* @since 6.0
				*/
				function cascadingImageBGSizing() {

					$('.nectar_cascading_images').each(function () {

						var forcedAspect = ( $(this).hasClass('forced-aspect') ) ? true : false;

						//handle max width for cascading images in equal height columns
						if ($(this).parents('.vc_row-o-equal-height').length > 0 && $(this).parents('.wpb_column').length > 0) {
							$(this).css('max-width', $(this).parents('.wpb_column').width());
						}

						//set size for layers with no images
						$(this).find('.bg-color').each(function () {

							if( forcedAspect == true && $(this).parents('.cascading-image').index() == 0 ) {
								return true;
							}

							var $bgColorHeight  = 0;
							var $bgColorWidth   = 0;

							if ($(this).parent().find('.img-wrap').length == 0) {

								var $firstSibling = $(this).parents('.cascading-image').siblings('.cascading-image[data-has-img="true"]').first();

								$bgColorHeight 	= $firstSibling.find('.img-wrap').height();
								$bgColorWidth 	= $firstSibling.find('.img-wrap').width();

							} else {
								$bgColorHeight 	= $(this).parent().find('.img-wrap').height();
								$bgColorWidth 	= $(this).parent().find('.img-wrap').width();
							}

							$(this).css({
								'height': $bgColorHeight,
								'width': $bgColorWidth
							}).addClass('calculated');

						});

					});

				}




				/**
				* Cascading images element initialization.
				*
				* @since 10.5
				*/
				function cascadingImageInit() {

					if ($('.nectar_cascading_images').length > 0) {

						var cascadingParallax = [];

						$('.nectar_cascading_images').each(function(i){

							imagesLoaded($(this), function (instance) {

								// Create sizes.
								cascadingImageBGSizing();

								// Parallax scrolling.
								if( $(instance.elements[0]).is('[data-parallax="yes"]') && !nectarDOMInfo.usingMobileBrowser && $('#nectar_fullscreen_rows').length == 0 ) {
									cascadingParallax[i] = new CascadingParallax($(instance.elements[0]), $(instance.elements[0]).attr('data-parallax-intensity'));
								}

							});

						});

						// BG Sizing Resize.
						$window.on('resize', cascadingImageBGSizing);

					}

				}




				function CascadingParallax(el, intensity) {

					this.$element  = el;
					this.inView    = false;
					this.topLevel  = false;
					this.lastY     = 0;

					this.layer1Parallax = ( this.$element.is('[data-layer-1-parallax="yes"]') ) ? true : false;

					switch(intensity) {
						case 'subtle':
							this.intensity = 0.09;
							break;
						case 'medium':
							this.intensity = 0.15;
							break;
						case 'high':
							this.intensity = 0.25;
							break;
					}
					this.calculatePos();
					this.trackView();
					this.animate();

					if( $('.portfolio-filters').length > 0 ||
					$('.portfolio-filters-inline').length > 0 ) {
						setInterval(this.calculatePos.bind(this),700);
					}

					$window.on('resize', this.calculatePos.bind(this));
				}

				CascadingParallax.prototype.calculatePos = function() {
					this.offsetTop  = this.$element.offset().top;
					this.height     = this.$element.outerHeight();
					this.vertCenter = nectarDOMInfo.winH/2 - this.height/2;
				};

				CascadingParallax.prototype.trackView = function() {

					var that = this;

					if( this.$element.parents('.top-level').length > 0 ) {
						this.topLevel = true;
					}

					if( 'IntersectionObserver' in window ) {

						var options = {
							rootMargin: '250px',
						}
						var observer = new IntersectionObserver(function(entries) {

							entries.forEach(function(entry){
								var isIntersecting = entry.isIntersecting;

								if (isIntersecting) {
									that.inView = true;
								} else {
									that.inView = false;
								}
							});

						}, options);

						observer.observe(this.$element[0]);

					}

				};

				CascadingParallax.prototype.animate = function() {

					if( nectarState.materialOffCanvasOpen == true ) {
						window.requestAnimationFrame(this.animate.bind(this));
						return;
					}

					this.lastY = linearInterpolate(this.lastY, nectarDOMInfo.scrollTop, 0.2);

					if( this.inView ) {

						var that = this;

						this.$element.find('.bg-layer').each(function(i) {

							var $scale = $(this).data('scale');

							if( that.layer1Parallax ) {
								i = (i/1.5)+1;
							}

							if( that.topLevel === true && nectarDOMInfo.winW > 1000) {
								$(this)[0].style.transform = 'translateY(' + -(that.lastY * that.intensity * i) + 'px) translateZ(0) scale(' + $scale + ')';
							} else {
								$(this)[0].style.transform = 'translateY(' + -((that.lastY - that.offsetTop + that.vertCenter ) * that.intensity * i ) + 'px) translateZ(0) scale(' + $scale + ')';
							}

						});
					}

					window.requestAnimationFrame(this.animate.bind(this));
				};




				/**
				* Split line heading element initialization.
				*
				* @since 10.5
				* @see waypoints
				*/
				function splitLineHeadings() {

					// Create waypoint.
					var $splitLineOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : 'bottom-in-view';
					$($fullscreenSelector + '.nectar-split-heading').each(function () {

						var $that  = $(this);
						var $delay = ( $that.is('[data-animation-delay]') ) ? parseInt($that.attr('data-animation-delay')) : 0;

						var waypoint = new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
									waypoint.destroy();
									return;
								}

								if (!bypassAnimations || $('body[data-responsive="0"]').length > 0) {

									var $animationDurationCap;

									setTimeout(function() {

										if( $that.is('[data-animation-type="line-reveal-by-space"]') ) {

											var stagger = 0;
											if( $that.is('[data-stagger="true"]') ) {
												stagger = 500 / $that.find('> * > span').length;
												stagger = Math.min(Math.max(stagger, 15), 50); // Clamp val
											}

											$animationDurationCap = (parseInt($animationDuration) < 1100) ? $animationDuration : '1100';

											if( $that.is('[data-m-rm-animation="true"]') && nectarDOMInfo.winW < 1000 ) {
												$that.find('> * > span .inner').css({
													'transform' : 'translateY(0)'
												});
											}
											else {
												$that.find('> * > span').each(function (i) {

													if( stagger == 0 ) {
														$(this).find('> .inner').delay(i * stagger).transition({
															'y': '0px'
														}, $animationDurationCap, $animationEasing);
													}
													else {
														var spanEl = $(this);
														var $innerEl = spanEl.find('> .inner');
														setTimeout(function(){
															$innerEl[0].style.transform = 'translateY(0em)';
														}, i * stagger);

													}

												});
											}

										} else if( $that.is('[data-animation-type="letter-fade-reveal"]') ) {

											$animationDurationCap = (parseInt($animationDuration) < 1000) ? $animationDuration : '1000';
											$that.find('> * > span span').each(function (i) {

												$(this).delay(i * 8).transition({
													'y': '0px',
													'opacity': '1'
												}, $animationDurationCap, $animationEasing);

											});

										} else {
											$that.find('.heading-line').each(function (i) {

												$(this).find('> div').delay(i * 70).transition({
													'y': '0px'
												}, $animationDuration, $animationEasing);

											});
										}

										$that.addClass('animated-in');

									}, $delay);

								}

								waypoint.destroy();
							},
							offset: $splitLineOffsetPos
						});

					});
				}



				/**
				* Progress bar element initialization.
				*
				* @since 3.0
				* @see waypoints
				*/

				function progressBars() {

					var $progressBarsOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : 'bottom-in-view';
					var $progressSelector = ($('#nectar_fullscreen_rows[data-mobile-disable="on"]').length > 0 && nectarDOMInfo.usingMobileBrowser) ? '.nectar-progress-bar' : $fullscreenSelector + '.nectar-progress-bar';

					if( nectarDOMInfo.usingMobileBrowser && $progressBarsOffsetPos == 'bottom-in-view') {
						$progressBarsOffsetPos = '70%';
					}

					$($progressSelector).each(function () {

						var $that = $(this);

					  var	waypoint 	= new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('completed')) {
									waypoint.destroy();
									return;
								}

								if ($progressBarsOffsetPos == '100%') {
									$that.find('.bar-wrap').css('opacity', '1');
								}


								var percent = $that.find('span').attr('data-width'),
								$endNum 		= parseInt($that.find('span strong i').text());

								$that.find('span').transition({
									'width': percent + '%'
								}, 800, 'easeInOutCubic');

								var countOptions = {
									useEasing: false
								};
								var $countEle = $that.find('span strong i')[0];
								var numAnim = new CountUp($countEle, 0, $endNum, 0, 1, countOptions);
								numAnim.start();

								$that.find('span strong').transition({
									'opacity': 1
								}, 550, 'easeInCirc');

								////100% progress bar
								if (percent == '100') {
									$that.find('span strong').addClass('full');
								}

								$that.addClass('completed');

								waypoint.destroy();

							},
							offset: $progressBarsOffsetPos
						});

					});

				}



				/**
				* Page builder column border animations.
				*
				* @since 8.0
				* @see waypoints
				*/
				function animatedColBorders() {

					var $progressBarsOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : '75%';
					$($fullscreenSelector + '.wpb_column[data-border-animation="true"]').each(function () {

						var $that = $(this),
						waypoint  = new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('completed')) {
									waypoint.destroy();
									return;
								}

								var $borderDelay = ($that.attr('data-border-animation-delay').length > 0) ? parseInt($that.attr('data-border-animation-delay')) : 0;
								setTimeout(function () {
									$that.find('.border-wrap').addClass('animation');
									$that.find('.border-wrap').addClass('completed');
								}, $borderDelay);

								waypoint.destroy();

							},
							offset: $progressBarsOffsetPos
						});

					});
				}



				/**
				* Food menu item element.
				*
				* @since 8.0
				* @see waypoints
				*/
				function foodMenuItems() {

					var $foodItemOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : '80%';
					$($fullscreenSelector + '.nectar_food_menu_item').parent().each(function () {

						var $that = $(this),
						waypoint  = new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('completed')) {
									waypoint.destroy();
									return;
								}

								$that.find('.nectar_food_menu_item').each(function (i) {

									var $that = $(this);

									setTimeout(function () {
										$that.addClass('animated-in');
									}, i * 150);

								});

								waypoint.destroy();

							},
							offset: $foodItemOffsetPos
						});

					});
				}



				/**
				* Divider element
				*
				* @since 3.0
				* @see waypoints
				*/
				function dividers() {

					var $dividerOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : 'bottom-in-view';

					$($fullscreenSelector + '.divider-small-border[data-animate="yes"], ' + $fullscreenSelector + '.divider-border[data-animate="yes"]').each(function () {

						var $lineDur  = ($(this).hasClass('divider-small-border')) ? 1300 : 1500,
						$that         = $(this),
						waypoint      = new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('completed')) {
									waypoint.destroy();
									return;
								}

								$that.each(function () {

									$(this).css({
										'transform': 'scale(0,1)',
										'visibility': 'visible'
									});
									var $that = $(this);

									$that.delay($that.attr('data-animation-delay')).transition({
										'transform': 'scale(1, 1)'
									}, $lineDur, 'cubic-bezier(.18,1,.22,1)');

								});

								$that.addClass('completed');

								waypoint.destroy();

							},
							offset: $dividerOffsetPos
						});

					});
				}



				/**
				* Image with hotspots element hover event
				*
				* @since 7.0
				*/
				function hotSpotHoverBind() {

					//add pulse animation
					$('.nectar_image_with_hotspots[data-hotspot-icon="numerical"]').each(function () {
						$(this).find('.nectar_hotspot_wrap').each(function (i) {
							var $that = $(this);
							setTimeout(function () {
								$that.find('.nectar_hotspot').addClass('pulse');
							}, i * 300);
						});
					});


					var hotSpotHoverTimeout = [];

					$('.nectar_image_with_hotspots:not([data-tooltip-func="click"]) .nectar_hotspot').each(function (i) {

						hotSpotHoverTimeout[i] = '';

						$(this).on('mouseover', function () {
							clearTimeout(hotSpotHoverTimeout[i]);
							$(this).parent().css({
								'z-index': '400',
								'height': 'auto',
								'width': 'auto'
							});
						});

						$(this).on('mouseleave', function () {

							var $that = $(this);
							$that.parent().css({
								'z-index': 'auto'
							});

							hotSpotHoverTimeout[i] = setTimeout(function () {
								$that.parent().css({
									'height': '30px',
									'width': '30px'
								});
							}, 300);

						});

					});

				}



				/**
				* Image with hotspots element responsive behavior.
				*
				* @since 7.0
				*/
				function responsiveTooltips() {

					$('.nectar_image_with_hotspots').each(function () {

						$(this).find('.nectar_hotspot_wrap').each(function () {

							if (nectarDOMInfo.winW > 690) {

								// Remove click if applicable
								if ($(this).parents('.nectar_image_with_hotspots[data-tooltip-func="hover"]').length > 0) {
									$(this).find('.nectar_hotspot').removeClass('click');
									$(this).find('.nttip').removeClass('open');
								}

								$(this).find('.nttip .inner a.tipclose').remove();
								$('.nttip').css('height', 'auto');

								// Reset for positioning
								$(this).css({
									'width': 'auto',
									'height': 'auto'
								});

								$(this).find('.nttip')
									.removeClass('force-right')
									.removeClass('force-left')
									.removeClass('force-top')
									.css('width', 'auto');

								var $tipOffset = $(this).find('.nttip').offset();

								// Against right side
								if ($tipOffset.left > $(this).parents('.nectar_image_with_hotspots').width() - 200) {
									$(this).find('.nttip').css('width', '250px');
								}
								else {
									$(this).find('.nttip').css('width', 'auto');
								}

								// Responsive
								if ($tipOffset.left < 0) {
									$(this).find('.nttip').addClass('force-right');
								}
								else if ($tipOffset.left + $(this).find('.nttip').outerWidth(true) > nectarDOMInfo.winW) {
									$(this).find('.nttip').addClass('force-left').css('width', '250px');
								}
								else if ($tipOffset.top + $(this).find('.nttip').height() + 35 > $window.height() && $('#nectar_fullscreen_rows').length > 0) {
									$(this).find('.nttip').addClass('force-top');
								}

								if ($(this).find('> .open').length == 0) {

									$(this).css({
										'width': '30px',
										'height': '30px'
									});
								}

							} else {

								//fixed position
								$(this).find('.nttip')
									.removeClass('force-left')
									.removeClass('force-right')
									.removeClass('force-top');

								$(this).find('.nectar_hotspot').addClass('click');

								if ($(this).find('.nttip a.tipclose').length == 0) {
									$(this).find('.nttip .inner').append('<a href="#" class="tipclose"><span></span></a>');
								}

								// Change height of fixed
								$('.nttip').css('height', $window.height());
							}
						});
					});

				}


				/**
				* Image with hotspots events
				*
				* @since 10.5
				*/
				function imageWithHotspotEvents() {

					if( $('.nectar_image_with_hotspots').length == 0 ) {
						return;
					}

					// Hover
					hotSpotHoverBind();

					// Click
					$body.on('click', '.nectar_hotspot.click', function () {
						$(this).parents('.nectar_image_with_hotspots').find('.nttip').removeClass('open');
						$(this).parent().find('.nttip').addClass('open');

						$(this).parents('.nectar_image_with_hotspots').find('.nectar_hotspot').removeClass('open');
						$(this).parent().find('.nectar_hotspot').addClass('open');

						if (nectarDOMInfo.winW > 690) {
							$(this).parent().css({
								'z-index': '120',
								'height': 'auto',
								'width': 'auto'
							});

							var $that = $(this);

							setTimeout(function () {
								$that.parents('.nectar_image_with_hotspots').find('.nectar_hotspot_wrap').each(function () {

									if ($(this).find('> .open').length == 0) {
										$(this).css({
											'height': '30px',
											'width': '30px',
											'z-index': 'auto'
										});
									}
								});
							}, 300);
						}

						if (nectarDOMInfo.winW <= 690) {
							$(this).parents('.wpb_row, [class*="vc_col-"]').css('z-index', '200');
						}

						return false;
					});

					$body.on('click', '.nectar_hotspot.open', function () {
						$(this).parent().find('.nttip').removeClass('open');
						$(this).parent().find('.nectar_hotspot').removeClass('open');

						$(this).parents('.wpb_row').css('z-index', 'auto');

						return false;
					});

					$body.on('click', '.nttip.open', function (e) {
						if (nectarDOMInfo.winW < 690) {

							if( e.target && $(e.target).is('a') ) {
								return;
							}

							$(this).parents('.nectar_image_with_hotspots').find('.nttip').removeClass('open');
							$(this).parents('.nectar_image_with_hotspots').find('.nectar_hotspot').removeClass('open');
							$(this).parents('.wpb_row').css('z-index', 'auto');
							return false;
						}
					});


					// Calculate on init.
					responsiveTooltips();

					// Resize event.
					$window.on('resize',responsiveTooltips);

				}



				/**
				* Image with hotspots initialization.
				*
				* @since 7.0
				* @see waypoints
				*/
				function imageWithHotspots() {

					var $imageWithHotspotsOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : '50%';

					$($fullscreenSelector + '.nectar_image_with_hotspots[data-animation="true"]').each(function () {

						var $that = $(this);
						var waypoint = new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('completed')) {
									waypoint.destroy();
									return;
								}

								$that.addClass('completed');
								$that.find('.nectar_hotspot_wrap').each(function (i) {
									var $that2 = $(this);
									var $extrai = ($that2.parents('.col.has-animation').length > 0) ? 1 : 0;
									setTimeout(function () {
										$that2.addClass('animated-in');
									}, 175 * (i + $extrai));
								});

								waypoint.destroy();

							},
							offset: $imageWithHotspotsOffsetPos
						});

					});


				}


				/**
				* Nectar Lazy Loading
				*
				* @since 11.0
				*/
				function nectarLazyImageLoading() {

					var lazyItems = [].slice.call(document.querySelectorAll('[data-nectar-img-src]'));

					if ('IntersectionObserver' in window) {

						var options = {
							rootMargin: '300px',
						}

						nectarLazyImageSizing();
						$window.off('resize.nectarLazySizing', nectarLazyImageSizing);
						$window.on('resize.nectarLazySizing', nectarLazyImageSizing);

						var lazyItemObserver = new IntersectionObserver(function(entries) {

							entries.forEach(function(entry) {
								if (entry.isIntersecting) {
									var lazyItem = entry.target;

									var imgSrc = lazyItem.getAttribute('data-nectar-img-src');

									if( imgSrc ) {

										// img tags.
										if( lazyItem.classList.contains('nectar-lazy') ) {
											lazyItem.addEventListener( 'load', function() {
												lazyItem.style.height = "";
												lazyItem.style.width = "";
												lazyItem.classList.add('loaded');
												lazyItem.removeAttribute('data-nectar-img-src');
												lazyItemObserver.unobserve(lazyItem);
											});
											lazyItem.src = imgSrc;
											var srcset = lazyItem.getAttribute('data-nectar-img-srcset');
											if( srcset ) {
												lazyItem.setAttribute( 'srcset', srcset );
												lazyItem.removeAttribute('data-nectar-img-srcset');
											}

											lazyItem.parentNode.classList.add('img-loaded');

										}
										// BGs.
										else {
											lazyItem.style.backgroundImage = "url('" + imgSrc + "')";
											lazyItem.classList.add('loaded');
											lazyItem.removeAttribute('data-nectar-img-src');
											lazyItemObserver.unobserve(lazyItem);
										}

									}

								}

							});

						}, options);

						lazyItems.forEach(function(lazyItem) {
							lazyItemObserver.observe(lazyItem);
						});

					}
					else {
						// load all the images when intersection observer is not supported.
						lazyItems.forEach(function(lazyItem) {

							// img tags.
							if( lazyItem.classList.contains('nectar-lazy') ) {
								lazyItem.style.height = "";
								lazyItem.style.width = "";
								lazyItem.src = lazyItem.getAttribute('data-nectar-img-src');
								var srcset = lazyItem.getAttribute('data-nectar-img-srcset');
								if( srcset ) {
									lazyItem.setAttribute( 'srcset', srcset );
									lazyItem.removeAttribute('data-nectar-img-srcset');
								}

								lazyItem.parentNode.classList.add('img-loaded');
								lazyItem.classList.add('loaded');
								lazyItem.removeAttribute('data-nectar-img-src');
							}
							// BGs.
							else {
								lazyItem.style.backgroundImage = "url('" + lazyItem.getAttribute('data-nectar-img-src') + "')";
								lazyItem.classList.add('loaded');
								lazyItem.removeAttribute('data-nectar-img-src');
							}

						});
					}


				}


				/**
				* Nectar lazy img size helper.
				*
				* @since 11.0
				*/

				function nectarLazyImageSizing() {

					$('img.nectar-lazy:not(.loaded)').each(function() {

						// items to skip.
						if( $(this).hasClass('attachment-shop_thumbnail') || $(this).hasClass('attachment-woocommerce_thumbnail') ) {
							return true;
						}

						$(this).css({
							'height': '',
							'width' : ''
						});


						var heightAttr = parseInt($(this).attr('height'));
						var widthAttr = parseInt($(this).attr('width'));

						var width = ($(this).parents('.nectar_cascading_images').length > 0) ? $(this).parents('.bg-layer').width() : $(this).width();

						// Shadow img.
						if( $(this).parents('.img-with-aniamtion-wrap[data-shadow*="depth"]').length > 0 ) {
							width = $(this).parents('.img-with-aniamtion-wrap').width();
						}

						// Post grid.
						if( $(this).parents('.nectar-post-grid-item-bg-wrap-inner').length > 0 ) {
							width = $(this).parents('.nectar-post-grid-item-bg-wrap-inner').width();
						}

						var dimensions = calculateAspectRatio( widthAttr, heightAttr, width, 2000 );

						$(this).css({
							'height':  dimensions.height + 'px',
							'width' :  dimensions.width + 'px'
						});

					});

				}


			/**
			* Nectar Post Grid Mouse Follow Init
			*
			* @since 11.0
			*/
			function nectarPostGridMouse() {

				viewIndicatorArr = [];
				postGridImgMouseFollowArr = [];

				if( !nectarDOMInfo.usingMobileBrowser ) {

					$('.nectar-post-grid[data-indicator="yes"]').each(function(i) {
						viewIndicatorArr[i] = new NectarIconMouseFollow($(this),'view-indicator');
					});

					$('.nectar-post-grid-wrap[data-style="mouse_follow_image"] .nectar-post-grid').each(function(i) {
						postGridImgMouseFollowArr[i] = new NectarIconMouseFollow($(this), 'post-grid-images');
					});

					$('.nectar-category-grid[data-style="mouse_follow_image"]').each(function(i) {
						postGridImgMouseFollowArr[i] = new NectarIconMouseFollow($(this), 'post-grid-images');
					});

				}

			}





			/**
			* Nectar Post Grid
			*
			* @since 11.0
			*/
			function nectarPostGridInit() {

					$nectarPostGridArr = [];

					// Mouse follow.
					nectarPostGridMouse();

					// Create grid instances.
					$('.nectar-post-grid-wrap').each(function(i) {
						$nectarPostGridArr[i] = new NectarPostGrid($(this));
					});


				}



				function NectarPostGrid(el) {

					this.el             = el;
					this.currentPage    = 0;
					this.activeFilter   = 1;
					this.activeCatTotal = 0;
					this.settingsData   = JSON.parse(this.el.attr('data-el-settings'));
					this.queryData      = JSON.parse(this.el.attr('data-query'));
					this.sortable       = this.el.find('.nectar-post-grid-filters').attr('data-sortable');

					this.initialMarkup();
					this.clickEvents();
					this.deepLinking();
					this.lightboxGroups();
					this.externalProjectLinks();
				}

				NectarPostGrid.prototype.initialMarkup = function() {

					// Start Filter Active.
					if( this.el.find('.nectar-post-grid-filters a.active').length == 0 ) {
						this.el.find('.nectar-post-grid-filters a:first-child').addClass('active');
					}

					// Load More Markup.
					if( this.settingsData.pagination === 'load-more' && this.el.find('.load-more-wrap').length == 0 ) {

						if( this.el.find('.active.all-filter').length > 0 ) {
							this.activeFilter = this.el.find('.active.all-filter').index() + 1;
						}

						this.activeCatTotal = parseInt(this.el.find('.nectar-post-grid-filters a:nth-child(' + this.activeFilter + ')').attr('data-total-count'));

						// Start hidden?
						if( this.el.find('.nectar-post-grid-item').length >= this.activeCatTotal ) {
							this.el.append('<div class="load-more-wrap inactive"><a href="#" class="load-more">'+ this.el.attr('data-load-more-text') + '</a></div>');
						} else {
							this.el.append('<div class="load-more-wrap"><a href="#" class="load-more">'+ this.el.attr('data-load-more-text') + '</a></div>');
						}

					}

				};

				NectarPostGrid.prototype.lightboxGroups = function() {

					var unique_id = uniqueIdGenerate();
					var usingLightbox = (this.el.find('.nectar-post-grid-link.pretty_photo').length > 0) ? true : false;

					if ($('body[data-ls="magnific"]').length > 0) {
						this.el.find('.nectar-post-grid-link.pretty_photo')
							.addClass('magnific')
							.addClass('gallery')
							.removeClass('pretty_photo');
					}
					else if ($('body[data-ls="fancybox"]').length > 0) {
						// New.
						this.el.find('.nectar-post-grid-link.pretty_photo')
							.attr('data-fancybox', 'group_' + unique_id)
							.removeClass('pretty_photo');
						// Existing.
						this.el.find('.nectar-post-grid-link[data-fancybox]')
							.attr('data-fancybox','group_' + unique_id);
					}

					if(usingLightbox) {
						lightBoxInit();
					}

				}

				NectarPostGrid.prototype.externalProjectLinks = function() {
					if( this.el.hasClass('target-blank-external-urls') ) {
						this.el.find(".nectar-post-grid-item a[href*='http://']:not([href*='" + window.location.hostname + "'])").attr("target", "_blank");
						this.el.find(".nectar-post-grid-item a[href*='https://']:not([href*='" + window.location.hostname + "'])").attr("target", "_blank");
					}
				}

				NectarPostGrid.prototype.clickEvents = function() {

					// Sortable Mobile Toggle.
					this.el.find('.nectar-post-grid-filters h4').on('click', function(){
						$(this).parent().find('div').toggleClass('visible');
						$(this).toggleClass('visible');
					});

					// Sortable/Pagination.
					var settingsData = this.settingsData;
					var queryData    = this.queryData;
					var instance     = this;

					this.el.find('.nectar-post-grid-filters a, .load-more-wrap .load-more').on('click', function() {

						var $that = $(this);

						// Filter active.
						if($that.parents('.nectar-post-grid-wrap.loading').length > 0 || $(this).hasClass('active') || $(this).hasClass('inactive') ) {
							return false;
						}


						if( $(this).parents('.nectar-post-grid-filters').length > 0 ) {
							// Filter specific.
							$that.parent().find('a').removeClass('active');
							$that.addClass('active');
							instance.currentPage = 0;
							instance.activeFilter = $that.index() + 1;
						} else {
							// Load More specific.
							instance.currentPage++;
						}

						var $gridEl       = $that.parents('.nectar-post-grid-wrap').find('.nectar-post-grid')
						var $pagination   = settingsData.pagination;
						var $action       = ($that.hasClass('load-more') && $pagination === 'load-more') ? 'load-more' : 'filter';
						var $category     = '';
						var $custom_query = '';

						// Determine what category to load from.
						if( instance.sortable === 'yes' ) {
							$category = $that.parents('.nectar-post-grid-wrap').find('.nectar-post-grid-filters a.active').attr('data-filter');
							$custom_query = $that.parents('.nectar-post-grid-wrap').find('.nectar-post-grid-filters a.active').attr('data-filter');
						} else {

							var skipAll = ( $that.parents('.nectar-post-grid-wrap').find('.nectar-post-grid-filters a').length > 1 ) ? ':not(.all-filter)' : '';

							$that.parents('.nectar-post-grid-wrap').find('.nectar-post-grid-filters a' + skipAll).each(function(){
								$category += $(this).attr('data-filter') + ', ';
								$custom_query += $(this).attr('data-filter') + ', ';
							});

							$category = $category.substring(0, $category.length - 2);
							$custom_query = $custom_query.substring(0, $custom_query.length - 2);

						}


						var $dataToPass = {
							action: 'nectar_get_post_grid_segment',
							post_type: queryData.post_type,
							cpt_name: queryData.cpt_name,
							custom_query_tax: $custom_query,
							category: $category,
							posts_per_page: queryData.posts_per_page,
							current_page: instance.currentPage,
							offset: queryData.offset,
							order: queryData.order,
							orderby: queryData.orderby,
							load_action: $action,
							settings: {
								pagination: $pagination,
								post_type: settingsData.post_type,
								image_size: settingsData.image_size,
								aspect_ratio_image_size: settingsData.aspect_ratio_image_size,
								card_bg_color: settingsData.card_bg_color,
								display_categories: settingsData.display_categories,
								display_excerpt: settingsData.display_excerpt,
								display_date: settingsData.display_date,
								color_overlay: settingsData.color_overlay,
								color_overlay_opacity: settingsData.color_overlay_opacity,
								color_overlay_hover_opacity: settingsData.color_overlay_hover_opacity,
								grid_style: settingsData.grid_style,
								heading_tag: settingsData.heading_tag,
								post_title_overlay: settingsData.post_title_overlay,
								enable_gallery_lightbox: settingsData.enable_gallery_lightbox
							}
						};

						$that.parents('.nectar-post-grid-wrap').addClass('loading');

						$.post(window.nectarLove.ajaxurl, $dataToPass, function (data) {

							// Update markup.
							if( $action === 'load-more' ) {
								$gridEl.append(data);
							} else {
								$gridEl.html(data);
							}

							// Load in animation.
							if( $gridEl.is('[data-animation="fade-in-from-bottom"]') ) {

									$that.parents('.nectar-post-grid-wrap').removeClass('finished-animating');

									$gridEl.find('.nectar-post-grid-item:not(.animated-in)').each(function(i) {
										var $storedEl = $(this);
										setTimeout(function() {
											$storedEl.addClass('animated-in');
										}, i * 90);

									});

									setTimeout(function(){
										$that.parents('.nectar-post-grid-wrap').addClass('finished-animating');
									}, 950);
							}

							if( $pagination === 'load-more' ) {

								instance.activeCatTotal = parseInt(instance.el.find('.nectar-post-grid-filters a:nth-child(' + instance.activeFilter + ')').attr('data-total-count'));

								if( $gridEl.find('.nectar-post-grid-item').length >= instance.activeCatTotal ) {
									instance.el.find('.load-more-wrap').addClass('inactive');
								} else {
									instance.el.find('.load-more-wrap').removeClass('inactive');
								}

							}

							// Lightbox items.
							instance.lightboxGroups();

							// Ext. links.
							instance.externalProjectLinks();

							$that.parents('.nectar-post-grid-wrap').removeClass('loading');

							// Resize.
							$window.trigger('resize');

							// Mouse follow.
							nectarPostGridMouse();

						}); // end POST

						return false;

					});

				};

				NectarPostGrid.prototype.deepLinking = function() {

					if (typeof nectarGetQueryParam['grid-filter'] != 'undefined') {

							this.el.find('.nectar-post-grid-filters a').each(function () {

								var $currentText  = $(this).clone(),
								$getText          = nectarGetQueryParam['grid-filter'],
								$that             = $(this);

								$currentText = $currentText.text();
								$currentText = $currentText.replace(/\s+/g, '-').toLowerCase();

								if( $currentText.length > 0 && $currentText.substring(0,1) === '-' ) {
									$currentText = $currentText.substring(1);
								}

								$getText = $getText.replace(/\s+/g, '-').replace(/</g, '&lt;').replace(/"/g, '&quot;').toLowerCase();

								// Switch to filter
								if ($currentText == $getText) {
									$(this).trigger('click');
								}

							});

					}

				};


				function NectarPostGridWaypoint() {

					var postGridOffsetPos = ($fullscreenMarkupBool == true) ? '200%' : '75%';

					$($fullscreenSelector + '.nectar-post-grid-wrap').each(function () {

						var $that = $(this),
						waypoint 	= new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('completed')) {
									waypoint.destroy();
									return;
								}

								$that.find('.nectar-post-grid-filters').addClass('animated-in');
								$that.find('.nectar-post-grid-item').each(function(i) {

										var $item = $(this);

										setTimeout(function() {

											$item.addClass('animated-in');

										}, i * 90);

								});

								setTimeout(function(){
									$that.addClass('finished-animating');
								}, 950);


								waypoint.destroy();

							},
							offset: postGridOffsetPos
						});

					});

				}



				/**
				* Animated title element initialization.
				*
				* @since 7.0
				* @see waypoints
				*/
				function animatedTitles() {

					var $animatedTitlesOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : 'bottom-in-view';

					$($fullscreenSelector + '.nectar-animated-title').each(function () {

						var $that = $(this),
						waypoint 	= new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('completed')) {
									waypoint.destroy();
									return;
								}

								$that.addClass('completed');

								waypoint.destroy();

							},
							offset: $animatedTitlesOffsetPos
						});

					});
				}




				/**
				* Highlighted Text element initialization.
				*
				* @since 9.0
				* @see waypoints
				*/
				function highlightedText() {

					var $highlightedTextOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : 'bottom-in-view';

					if( nectarDOMInfo.usingMobileBrowser && $highlightedTextOffsetPos == 'bottom-in-view' ) {
						$highlightedTextOffsetPos = '85%';
					}

					$($fullscreenSelector + '.nectar-highlighted-text').each(function (i) {

						var $animationDelay = 0;

						// convert italics to em.
						$(this).find('i').each(function(){
							$(this).replaceWith(function(){
								return $('<em />').append($(this).html());
							});
						});

						if($(this).is('[data-animation-delay]') &&
						$(this).attr('data-animation-delay').length > 0 &&
						$(this).attr('data-animation') != 'false') {
							$animationDelay = $(this).attr('data-animation-delay');
						}

						$(this).find('em:has(a)').addClass('has-link');

						if (bypassAnimations) {
							$(this).find('em').addClass('animated');
						}

						// Waypoint
						var $that = $(this);
						var waypoint = new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated')) {
									waypoint.destroy();
									return;
								}

								setTimeout(function() {

									$that.find('em').each(function (i) {
										var $highlighted_em = $(this);
										setTimeout(function () {
											$highlighted_em.addClass('animated');
										}, i * 300);

									});

								}, $animationDelay);

								waypoint.destroy();

							},
							offset: $highlightedTextOffsetPos
						});

					});

				}



				/**
				* WooCommerce product carousel.
				*
				* @since 13.0
				* @see waypoints
				*/
				function wooProductCarouselAnimations() {

					var $wooProductOffsetPos = ($fullscreenMarkupBool == true) ? '500%' : '75%';

					$($fullscreenSelector + '.nectar-woo-flickity[data-animation*="fade-in"]').each(function () {

						var $that = $(this),
						waypoint 	= new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('animated-in')) {
									waypoint.destroy();
									return;
								}

								$that.addClass('animated-in');

								$that.find('.flickity-cell').each(function (i) {
									var $el = $(this);

									setTimeout(function(){
										$el.css({
											'transform': 'translate3d(0,0,0)',
											'opacity': '1'
										});
									}, i * 100);
								});

								waypoint.destroy();

							},
							offset: $wooProductOffsetPos
						});

					});
				}


				/**
				* Pricing table element height calculations.
				*
				* @since 2.0
				*/
				function pricingTableHeight() {

					var $tallestCol;

					$('.pricing-table[data-style="default"]').each(function () {
						$tallestCol = 0;

						$(this).find('> div ul').each(function () {

							if( $(this).height() > $tallestCol ) {
								$tallestCol = $(this).height();
							}

						});

						//safety net incase pricing tables height couldn't be determined
						if ($tallestCol == 0) {
							$tallestCol = 'auto';
						}

						//set even height
						$(this).find('> div ul').css('height', $tallestCol);

					});
				}




				/**
				* Testimonial slider element initialization.
				*
				* @since 10.5
				*/
				function nectarTestimonialSliders() {

					$testimonialSliders = [];

					if (typeof NectarTestimonialSlider == 'undefined') {
						return;
					}

					$('.testimonial_slider').each(function (i) {

						var $that_el  = $(this),
						$type         = ($(this).is('[data-style]')) ? $(this).attr('data-style') : 'none';

						$testimonialSliders[i] = new NectarTestimonialSlider($that_el, $type, resizeVideoToCover, fullWidthContentColumns);


						if ($(this).is('.disable-height-animation:not([data-style*="multiple_visible"])')) {
							$testimonialSliders[i].testimonialSliderHeight();
							setTimeout($testimonialSliders[i].testimonialSliderHeight.bind($testimonialSliders[i]), 500);
						}

						if ($(this).is('.testimonial_slider[data-style="multiple_visible_minimal"]')) {
							$testimonialSliders[i].testimonialSliderHeightMinimalMult();
							setTimeout($testimonialSliders[i].testimonialSliderHeightMinimalMult.bind($testimonialSliders[i]), 500);
						}

					});


				}


				/**
				* Testimonial slider element resize binding.
				*
				* @since 10.5
				*/
				function nectarTestimonialSlidersEvents() {

					$window.off('smartresize.nectarTestimonials');
					$window.off('resize.nectarTestimonialsMin');

					if($testimonialSliders.length > 0) {
						$window.on('smartresize.nectarTestimonials',nectarTestimonialMainResize);
					}

					if( $('.testimonial_slider[data-style="multiple_visible_minimal"]').length > 0 ) {
						$window.on('resize.nectarTestimonialsMin',nectarTestimonialMiniamlResize);
					}

				}

				function nectarTestimonialMainResize() {
						for (var i = 0; i < $testimonialSliders.length; i++) {
							$testimonialSliders[i].testimonialSliderHeight();
							$testimonialSliders[i].testimonialHeightResize();
						}
				}
				function nectarTestimonialMiniamlResize() {
						for (var i = 0; i < $testimonialSliders.length; i++) {
							$testimonialSliders[i].testimonialSliderHeightMinimalMult();
						}
				}



				/**
				* Icon list element initialization.
				*
				* @since 6.0
				* @see waypoints
				*/
				function iconList() {

					var $iconListOffsetPos = ($fullscreenMarkupBool == true) ? '250%' : '75%';

					$($fullscreenSelector + '.nectar-icon-list[data-animate="true"]').each(function () {

						var $that = $(this),
						waypoint 	= new Waypoint({
							element: $that,
							handler: function () {

								if ($that.parents('.wpb_tab').length > 0 && $that.parents('.wpb_tab').css('visibility') == 'hidden' || $that.hasClass('completed')) {
									waypoint.destroy();
									return;
								}

								$that.each(function () {

									var $listItemAnimationDelay = ($that.is('[data-direction="horizontal"]')) ? 100 : 300;

									$(this).find('.nectar-icon-list-item').each(function (i) {
										var $thatt = $(this);
										setTimeout(function () {
											$thatt.addClass('animated');
										}, i * $listItemAnimationDelay);
									});

								});

								$that.addClass('completed');

								waypoint.destroy();

							},
							offset: $iconListOffsetPos
						});

					});
				}



				/**
				* Get the BG color of parent column/row.
				*
				* @since 6.0
				*/
				function narrowParentBGC(element) {

					var narrowedBGC;

					if (element.parents('.wpb_column[data-bg-color*="#"]').length > 0 && element.parents('.wpb_column[data-bg-opacity="1"]').length > 0) {
						narrowedBGC = element.parents('.wpb_column').attr('data-bg-color');
					}
					else if (element.parents('.wpb_row').length > 0 && element.parents('.wpb_row').find('.row-bg.using-bg-color').length > 0 ||
						element.parents('.wpb_row').length > 0 && element.parents('.wpb_row').find('.row-bg.using-bg-color-excluded').length > 0) {
						narrowedBGC = element.parents('.wpb_row').find('.row-bg').css('background-color');
					}
					else {
						if ($('#nectar_fullscreen_rows').length > 0) {
							narrowedBGC = $('#nectar_fullscreen_rows > .wpb_row .full-page-inner-wrap').css('background-color');
						}
						else {
							narrowedBGC = $('.container-wrap').css('background-color');
						}
					}

					return narrowedBGC;

				}


				/**
				* Icon BG matching row BG
				*
				* @since 6.0
				*/
				function nectarIconMatchColoring() {

					var nectarMatchingBGCss = '';

					// Icon list
					$('.nectar-icon-list[data-icon-style="border"], .nectar_icon_wrap[data-style="border-animation"][data-color*="extra-color-gradient-"]').each(function (i) {

						var $bgColorToSet = narrowParentBGC($(this));

						if( $(this).hasClass('nectar-icon-list') ) {
							$(this).find('.list-icon-holder').css('background-color', $bgColorToSet);
						}
						else {

							$(this).removeClass(function (index, className) {
								return (className.match(/(^|\s)instance-\S+/g) || []).join(' ');
							});

							$(this).addClass('instance-' + i);
							nectarMatchingBGCss += '.nectar_icon_wrap.instance-' + i + ' .nectar_icon:before { background-color: ' + $bgColorToSet + '!important; }';
						}

					});

					// Material gradient btns
					$('body.material .nectar-button.see-through[class*="m-extra-color-gradient"]').each(function (i) {

						var $bgColorToSet = narrowParentBGC($(this));

						$(this).removeClass(function (index, className) {
							return (className.match(/(^|\s)instance-\S+/g) || []).join(' ');
						});

						$(this).addClass('instance-' + i);
						nectarMatchingBGCss += '.nectar-button.see-through.instance-' + i + ':after { background-color: ' + $bgColorToSet + '!important; }';

					});

					// Style
					nectarCreateStyle(nectarMatchingBGCss, 'nectaricon-color-match');

				}





				/**
				* One fourth column classes.
				*
				* @since 2.0
				*/
				function oneFourthClasses() {

					$('.col.span_3, .vc_span3, .vc_col-sm-3').each(function () {
						if (!$(this).is('[data-t-w-inherits="small_desktop"]')) {

							var $currentDiv = $(this);
							var $nextDiv    = $(this).next('div');

							if ($nextDiv.hasClass('span_3') && !$currentDiv.hasClass('one-fourths') ||
							$nextDiv.hasClass('vc_span3') && !$currentDiv.hasClass('one-fourths') ||
							$nextDiv.hasClass('vc_col-sm-3') && !$currentDiv.hasClass('one-fourths')) {
								$currentDiv.addClass('one-fourths clear-both');
								$nextDiv.addClass('one-fourths right-edge');
							}
						}
					});

					// Make empty second 1/2 half columns display right on iPad
					$('.span_12 .col.span_6').each(function () {
						if ($(this).next('div').hasClass('span_6') && $.trim($(this).next('div').html()).length == 0) {
							$(this).addClass('empty-second');
						}
					});

				}




				/**
				* Responsive video iframes initialization.
				*
				* @since 3.0
				*/
				function responsiveVideoIframesInit() {

						$('iframe').each(function () {

							// Make sure the iframe has a src
							if (typeof $(this).attr('src') != 'undefined' &&
							!$(this).hasClass('skip-nectar-video-size') &&
							!$(this).hasClass('iframe-embed') &&
							$(this).parents('.ult_modal').length == 0 &&
							$(this).parents('.ls-slide').length == 0 &&
							$(this).parents('.woo-variation-product-gallery').length == 0 &&
							$(this).parents('.esg-entry-media').length == 0 &&
							$(this).parents('.wpb_video_widget.wpb_content_element').length == 0) {

								if( $(this).parents('.woocommerce-product-gallery').length > 0 ) {
									if( !$(this).is('[width="100%"]') || !$(this).is('[height="100%"]') ) {
										return true;
									}
								}

								var embedSrcLower = $(this).attr('src').toLowerCase();

								if (embedSrcLower.indexOf("youtube") >= 0 ||
								embedSrcLower.indexOf("vimeo") >= 0 ||
								embedSrcLower.indexOf("twitch.tv") >= 0 ||
								embedSrcLower.indexOf("kickstarter") >= 0 ||
								embedSrcLower.indexOf("embed-ssl.ted") >= 0 ||
								embedSrcLower.indexOf("dailymotion") >= 0) {

									$(this).addClass('iframe-embed');

									if ($(this).width() < $(this).parent().width()) {
										$(this)
											.attr('data-aspectRatio', $(this).height() / $(this).width())
											.removeAttr('height')
											.removeAttr('width');
									} else {
										$(this)
											.attr('data-aspectRatio', '0.56')
											.removeAttr('height')
											.removeAttr('width');
									}

									if ($(this).parents('.post-area.masonry.classic').length > 0) {
										$(this)
											.attr('data-aspectRatio', '0.56')
											.removeAttr('height')
											.removeAttr('width');
									}

								}

							}

						});

				}


				/**
				* Responsive video iframes.
				*
				* @since 3.0
				*/
				function responsiveVideoIframes() {

					$('iframe[data-aspectRatio]').each(function () {

						var $el   = $(this),
						newWidth  = $el.parent().width();

						// In nectar slider
						if ($(this).parents('.swiper-slide').length > 0) {
							if ($(this).is(':visible')) {
								$el
									.width(newWidth)
									.height(newWidth * $el.attr('data-aspectRatio'));
							}
						}
						// All others
						else {
							$el
								.width(newWidth)
								.height(newWidth * $el.attr('data-aspectRatio'));
						}

					});

				}


				/**
				* Reveal the audio/video elements after the size has been calculated.
				*
				* @since 10.5
				*/
				function audioVideoVis() {

					//unwrap post and portfolio videos
					$('.video-wrap iframe').unwrap();
					$('#sidebar iframe[src]').unwrap();

					$('audio')
						.attr('width', '100%')
						.attr('height', '100%')
						.css('visibility', 'visible');

					$('video').css('visibility', 'visible');

					$('.wp-video').each(function () {
						var video = $(this).find('video').get(0);
						video.addEventListener('loadeddata', function () {
							$window.trigger('resize');
						}, false);
					});

					//webkit video back button fix
					$('.main-content iframe[src]').each(function () {
						$(this).css({
							'opacity': '1',
							'visibility': 'visible'
						});
					});

				}





				/**
				* Nectar video background size calculations
				*
				* @since 5.0
				*/
				function resizeVideoToCover() {

					var vid_w_orig  = 1280,
					vid_h_orig      = 720,
					min_w           = 1200;

					$('.nectar-video-wrap').each(function () {

						var $containerHeight, $containerWidth;

						if ($(this).find('video').length == 0) {
							return;
						}

						if ($(this).parents('#page-header-bg').length > 0) {

							if ($('.container-wrap.auto-height').length > 0) {
								return false;
							}

							$containerHeight  = $(this).parents('#page-header-bg').outerHeight();
							$containerWidth   = $(this).parents('#page-header-bg').outerWidth();
						} else {

							if ($(this).hasClass('column-video')) {
								if( $body.is('[data-flex-cols="true"]') ) {
									$containerHeight  = $(this).parents('.vc_column-inner').outerHeight();
									$containerWidth   = $(this).parents('.vc_column-inner').outerWidth();
								} else {
									$containerHeight  = $(this).parents('.wpb_column').outerHeight();
									$containerWidth   = $(this).parents('.wpb_column').outerWidth();
								}
							} else {
								$containerHeight  = $(this).parents('.wpb_row').outerHeight();
								$containerWidth   = ($(this).parents('.full-width-section').length > 0) ? nectarDOMInfo.winW : $(this).parents('.wpb_row').outerWidth();
							}
						}

						// Set the video viewport to the window size
						$(this).width($containerWidth);
						if ($(this).parents('#page-header-bg').length > 0) {
							$(this).height($containerHeight);
						}

						// Use largest scale factor of horizontal/vertical
						var scale_h = $containerWidth / vid_w_orig,
						scale_v     = ($containerHeight - $containerHeight) / vid_h_orig,
						scale       = scale_h > scale_v ? scale_h : scale_v;

						// Update minium width to never allow excess space
						min_w = 1280 / 720 * ($containerHeight + 40);

						// Don't allow scaled width < minimum video width
						if (scale * vid_w_orig < min_w) {
							scale = min_w / vid_w_orig;
						}

						// Now scale the video
						$(this).find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * vid_w_orig + 0));
						$(this).find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * vid_h_orig + 0));

						// And center it by scrolling the video viewport
						$(this).scrollLeft(($(this).find('video').width() - $containerWidth) / 2);
						$(this).scrollTop(($(this).find('video').height() - ($containerHeight)) / 2);
						$(this).find('.mejs-overlay, .mejs-poster').scrollTop(($(this).find('video').height() - ($containerHeight)) / 2);


						// Align bottom
						if ($(this).attr('data-bg-alignment') == 'center bottom' || $(this).attr('data-bg-alignment') == 'bottom') {
							$(this).scrollTop(($(this).find('video').height() - ($containerHeight + 6)));
						}
						// Align top
						else if ($(this).attr('data-bg-alignment') == 'center top' || $(this).attr('data-bg-alignment') == 'top') {
							$(this).scrollTop(0);
						}

						// Add loaded class
						$(this).addClass('position-loaded');
					});

				}



				/**
				* Nectar video background initialization.
				*
				* @since 5.0
				*/
				function videoBGInit() {

					if ($('.nectar-video-wrap').length == 0 && $('.nectar-youtube-bg').length == 0) {
						return;
					}

					setTimeout(function () {

						resizeVideoToCover();

						// Resize
						$window.on('resize',resizeVideoToCover);

						$('.video-color-overlay').each(function () {
							$(this).css('background-color', $(this).attr('data-color'));
						});

						$('.nectar-video-wrap').each(function () {

							if ($(this).find('video').length == 0) {
								return;
							}

							var $headerVideo  = ($(this).parents('#page-header-bg').length > 0) ? true : false;
							var $that         = $(this);
							var videoReady    = setInterval(function () {

								if ($that.find('video').get(0).readyState > 3) {

									if (!nectarDOMInfo.usingMobileBrowser) {
										$that.transition({
											'opacity': '1'
										}, 400);
										$that.find('video').transition({
											'opacity': '1'
										}, 400);
										$that.parent().find('.video-color-overlay').transition({
											'opacity': '0.7'
										}, 400);
										if ($headerVideo == true) {
											pageHeaderTextEffect();
										}
									}

									// Remove page loading screen
									$loadingScreenEl.addClass('loaded');
									setTimeout(function () {
										$loadingScreenEl.addClass('hidden');
									}, 1000);


									clearInterval(videoReady);
								}

							}, 60);

							if (nectarDOMInfo.usingMobileBrowser) {

								if ($that.parents('.full-width-section').length > 0 &&
								    $that.parents('#nectar_fullscreen_rows').length == 0 &&
									  !$that.hasClass('column-video') ) {

									$that.css('left', '50%');
								} else {
									$that.css('left', '0px');
								}

								if ($headerVideo == true) {
									pageHeaderTextEffect();
								}

								$that.find('video')[0].onplay = function () {
									$that.transition({
										'opacity': '1'
									}, 400);
									$that.find('video').transition({
										'opacity': '1'
									}, 400);
									$that.parent().find('.video-color-overlay').transition({
										'opacity': '0.7'
									}, 400);
								};

							} // end mobile only

						});
					}, 300);


					if (nectarDOMInfo.usingMobileBrowser) {

						$('.nectar-video-wrap').each(function () {

							if (!$(this).find('video').is('[muted]')) {

								// Autoplay not supported unless muted
								$(this).parent().find('.mobile-video-image').show();
								$(this).remove();
							}

						});

					}


					$('.wpb_row:has(".nectar-video-wrap"):not(.fp-section)').each(function (i) {
						$(this).css('z-index', 100 + i);
					});


					$(".vc_row").each(function () {
						var youtubeUrl, youtubeId, $row = jQuery(this);
						$row.find('.nectar-youtube-bg').length > 0 ? (youtubeUrl = $row.find('.nectar-youtube-bg span').text(), youtubeId = nectarExtractYoutubeId(youtubeUrl), youtubeId && ($row.find(".vc_video-bg").remove(), nectarInsertYoutubeVideoAsBackground($row.find('.nectar-youtube-bg'), youtubeId))) : $row.find(".nectar-youtube-bg").remove();

						// Remove yt url
						$row.find('.nectar-youtube-bg span').remove();

						if (!nectarDOMInfo.usingMobileBrowser) {
							$row.find('.nectar-video-wrap, .nectar-youtube-bg').css({
								'opacity': '1',
								'width': '100%',
								'height': '100%'
							});
						}
						$row.find('.video-color-overlay').transition({
							'opacity': '0.7'
						}, 400);
					});


					function nectarInsertYoutubeVideoAsBackground($element, youtubeId, counter) {
						if ("undefined" == typeof YT || void 0 === YT.Player) return 100 < (counter = void 0 === counter ? 0 : counter) ? void console.warn("Too many attempts to load YouTube api") : void setTimeout(function () {
							nectarInsertYoutubeVideoAsBackground($element, youtubeId, counter++)
						}, 100);
						var $container = $element.prepend('<div class="vc_video-bg"><div class="inner"></div></div>').find(".inner");
						new YT.Player($container[0], {
							width: "100%",
							height: "100%",
							videoId: youtubeId,
							playerVars: {
								playlist: youtubeId,
								iv_load_policy: 3,
								enablejsapi: 1,
								disablekb: 1,
								autoplay: 1,
								controls: 0,
								showinfo: 0,
								rel: 0,
								loop: 1
							},
							events: {
								onReady: function (event) {
									event.target.mute().setLoop(!0);
									nectarResizeVideoBackground($element);
								}
							}
						}), nectarResizeVideoBackground($element), jQuery(window).on("resize", function () {
							nectarResizeVideoBackground($element);
						});

						setTimeout(function () {
							nectarResizeVideoBackground($element);
						}, 100);
					}

					function nectarResizeVideoBackground($element) {
						var iframeW, iframeH, marginLeft, marginTop, containerW = $element.innerWidth(),
						containerH = $element.innerHeight(),
						ratio1 = 16,
						ratio2 = 9;
						ratio1 / ratio2 > containerW / containerH ? (iframeW = containerH * (ratio1 / ratio2),
						iframeH = containerH, marginLeft = -Math.round((iframeW - containerW) / 2) + "px", marginTop = -Math.round((iframeH - containerH) / 2) + "px", iframeW += "px", iframeH += "px") : (iframeW = containerW, iframeH = containerW * (ratio2 / ratio1), marginTop = -Math.round((iframeH - containerH) / 2) + "px",
						marginLeft = -Math.round((iframeW - containerW) / 2) + "px", iframeW += "px", iframeH += "px"),
						$element.find(".vc_video-bg iframe").css({
							maxWidth: "1000%",
							marginLeft: marginLeft,
							marginTop: marginTop,
							width: iframeW,
							height: iframeH
						});
					}

					function nectarExtractYoutubeId(url) {

						if ("undefined" == typeof url) {
							return !1;
						}

						var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
						return null !== id ? id[1] : !1
					}


				}




				/**
				* Single Blog Posts
				*
				* @since 11.0
				*/
				function blogSingle() {

					// Remove first gallery on post when using the gallery slider option.
					if( $body.hasClass('single-post') && $('.content-inner[data-has-gallery]').length > 0 ) {


						if($('.wp-block-gallery').length > 0) {
							// Gutenberg.
							$('.content-inner').find('.wp-block-gallery').each(function(i) {
								if(i !== 0) {
										$(this).css('display','flex');
								}
							});

						} else {
							// Classic Editor.
							$('.content-inner').find('.gallery').each(function(i) {
								if(i !== 0) {
										$(this).css('display','block');
								}
							});

						}

					} // If using gallery slider on single conditional end.

				}





				/*-------------------------------------------------------------------------*/
				/*	Header + Search
				/*-------------------------------------------------------------------------*/

				/**
				* Correct megamenus in mobile navigation.
				*
				* @since 8.0
				*/
				function mobileNavMegamenuCorrect() {

					////mobile megamenus without titles / nested groupings
					var $mobileNavSelector = ( $('#top #mobile-menu').length > 0 ) ? '#top #mobile-menu ' : '.off-canvas-menu-container.mobile-only ';

					$($mobileNavSelector + '.menu-item > ul > li > a').each(function () {

						if ($(this).text() == '-' || $(this).text() == 'â€“' || $(this).parent().hasClass('hide-title') || $(this).find('> .remove-menu-item-title').length > 0 ) {

							var $navLIs = $(this).parent().find('> ul > li').clone();

							// column has widget
							if( $(this).parent().find('> .widget-area-active').length > 0 ) {
								$(this).parent().find('> a').remove();
							} else {

								$(this).parent().find('ul').remove();
								$(this).parent().parent().append($navLIs);
								$(this).parent().remove();
							}

						}
					});

				}



				/**
				* Material theme skin off canvas menu initialization.
				*
				* @since 10.5
				*/
				function materialSkinOCM_Init() {

					if ($('body.material[data-slide-out-widget-area-style="slide-out-from-right"]').length > 0) {
						OCM_materialWidth();

						if( $wpAdminBar.length > 0 ) {
							var $topToolBar = $wpAdminBar.detach();
							$('.ocm-effect-wrap-inner').append($topToolBar);
						}

					}

					OCM_materialIconMarkup();
					materialSkinTransition();

					$window.on('resize', OCM_materialSize);

				}




				/**
				* Material theme skin transition helper
				*
				* @since 10.5
				*/
				function materialSkinTransition() {

					if ($('body.material[data-header-search="true"]').length > 0 ||
					$('body.material .ocm-effect-wrap').length > 0) {

						var materialTransTO,
						allowMaterialResizeCalc = false,
						orientTrack = 0,
						$winDOMWidth  = nectarDOMInfo.winW,
						$winDOMHeight = nectarDOMInfo.winH;

						// For mobile make sure the orientation has changed.
						window.addEventListener("orientationchange", function () {
							orientTrack = 1;
						});

						// Resize.
						$window.on('resize', function () {

							if( nectarDOMInfo.usingMobileBrowser ) {
								// Mobile.
								if (($window.width() != $winDOMWidth && $window.height != $winDOMHeight) || orientTrack === 1) {

									// Store the current window dimensions.
									$winDOMWidth  = nectarDOMInfo.winW;
									$winDOMHeight = nectarDOMInfo.winH;

									// Reset orientation change tracker.
									orientTrack = 0;

									// Set to allow.
									allowMaterialResizeCalc = true;

								}
							} else {
								// Desktop always allows.
								allowMaterialResizeCalc = true;
							}

							if(allowMaterialResizeCalc) {

								clearTimeout(materialTransTO);

								$('body[data-slide-out-widget-area-style="slide-out-from-right"] > a.slide_out_area_close, .material #header-outer, .ocm-effect-wrap, .ocm-effect-wrap-shadow')
									.addClass('no-material-transition');

								materialTransTO = setTimeout(function () {
									$('body[data-slide-out-widget-area-style="slide-out-from-right"] > a.slide_out_area_close, .material #header-outer, .ocm-effect-wrap, .ocm-effect-wrap-shadow')
										.removeClass('no-material-transition');
								}, 250);

								OCM_materialWidth();

								// Reset allow.
								allowMaterialResizeCalc = false;

							} // endif for allow.

						}); // end resize.

					}

				}



				/**
				* Calculate off canvas menu slide out from right on hover
				*
				* @since 8.0
				*/
				function calculateHoverNavMinHeight() {

					var $widgetHeights = 0;
					$('#slide-out-widget-area > .widget').each(function () {
						$widgetHeights += $(this).height();
					});

					var $menuHeight;

					if(($offCanvasEl.height() - 25 - $('.bottom-meta-wrap').outerHeight(true) - $widgetHeights) > $('#slide-out-widget-area .off-canvas-menu-container:last-child').height()) {
						$menuHeight = $offCanvasEl.height() - 25 - $('.bottom-meta-wrap').outerHeight(true) - $widgetHeights;
					} else {
						$menuHeight = $('#slide-out-widget-area .off-canvas-menu-container:last-child').height();
					}

					$('#slide-out-widget-area .inner').css({
						'height': 'auto',
						'min-height': $menuHeight
					});


				}


				/**
				* Material theme skin off canvas menu width.
				*
				* @since 8.0
				*/
				function OCM_materialWidth() {

					$('#slide-out-widget-area.slide-out-from-right').css({
						'padding-top': $window.height() * 0.1,
						'padding-bottom': $window.height() * 0.1
					});

					OCM_overflowState();
				}



				/**
				* Material theme skin off canvas menu icon markup
				*
				* @since 8.0
				*/
				function OCM_materialIconMarkup() {

					if ($('body.material').length > 0 && $('body[data-slide-out-widget-area-style="slide-out-from-right-hover"]').length == 0 ) {

						if ($('body[data-slide-out-widget-area-style*="fullscreen"]').length == 0 && $('#mobile-menu').length == 0) {
							var $menuIconClone = $('header#top nav ul .slide-out-widget-area-toggle a > span > i').clone();
							$menuIconClone.addClass('hover-effect');
							$('header#top nav ul .slide-out-widget-area-toggle a > span').append($menuIconClone);

							var $menuIconClone2 = $('header#top .slide-out-widget-area-toggle.mobile-icon a > span > i').clone();
							$menuIconClone2.addClass('hover-effect');
							$('header#top .slide-out-widget-area-toggle.mobile-icon a > span').append($menuIconClone2);
						}

						$('body:not([data-slide-out-widget-area-style="slide-out-from-right"]) header#top .slide-out-widget-area-toggle a > span')
							.append($('<span class="close-wrap"> <span class="close-line close-line1"></span> <span class="close-line close-line2"></span> </span>'));

							setTimeout(function(){
								$('header#top .slide-out-widget-area-toggle a > span .close-wrap').addClass('loaded');
							},200);

					}

					if ($('body.material #boxed').length > 0 && $('body[data-slide-out-widget-area-style="slide-out-from-right-hover"]').length > 0 && $('.ocm-effect-wrap').length > 0 ) {
						$('#ajax-content-wrap > .slide-out-widget-area-toggle.slide-out-hover-icon-effect').insertAfter('.ocm-effect-wrap');
					}

					//move material skin default ocm
					if ($('body.material').length > 0 &&
					    $('body[data-slide-out-widget-area-style*="fullscreen"]').length == 0 &&
							$('.ocm-effect-wrap').length > 0 ) {
						$('body.material #slide-out-widget-area.slide-out-from-right .slide_out_area_close').insertAfter('.ocm-effect-wrap');
						$('#slide-out-widget-area-bg').insertAfter('.ocm-effect-wrap');
						$offCanvasEl.insertAfter('.ocm-effect-wrap');

					}

				}



				/**
				* Material theme skin off canvas menu height
				*
				* @since 8.0
				*/
				function OCM_materialSize() {
					if ($('.ocm-effect-wrap.material-ocm-open').length > 0) {

						$('.ocm-effect-wrap').css({
							'height': $window.height()
						});

						$('.ocm-effect-wrap-inner').css({
							'padding-top': nectarDOMInfo.adminBarHeight
						});

					}
				}



				/**
				* Off canvas menu dropdown markup
				*
				* @since 8.0
				*/
				function OCM_dropdownMarkup() {
					var $nectar_ocm_dropdown_func = ($('#slide-out-widget-area[data-dropdown-func]').length > 0) ? $offCanvasEl.attr('data-dropdown-func') : 'default';
					if ($nectar_ocm_dropdown_func == 'separate-dropdown-parent-link') {
						$('#slide-out-widget-area .off-canvas-menu-container li.menu-item-has-children').append('<span class="ocm-dropdown-arrow"><i class="fa fa-angle-down"></i></span>');
					}
				}



				/**
				* Off canvas menu dropdown icon position.
				*
				* @since 8.0
				*/
				function OCM_dropdownIconPos() {

					$('#slide-out-widget-area[class*="slide-out-from-right"] .off-canvas-menu-container li.menu-item-has-children').each(function () {
						$(this).find('.ocm-dropdown-arrow').css({
							'top': $(this).find('a').height() / 2
						});
					});
					$('#slide-out-widget-area.fullscreen-split .off-canvas-menu-container li.menu-item-has-children').each(function () {
						$(this).find('.ocm-dropdown-arrow').css({
							'top': $(this).find('a').height() / 2
						});
					});

				}




				/**
				* Off canvas menu overflow scrolling.
				*
				* @since 8.0
				*/
				function OCM_overflowState() {

					//switch position of social media/extra info based on screen size
					if (nectarDOMInfo.winW < 1000 ||
					$('body > #boxed').length > 0 ||
					$('.ocm-effect-wrap-inner > #boxed').length > 0) {

						$('#slide-out-widget-area.fullscreen .off-canvas-social-links, #slide-out-widget-area.fullscreen-alt .off-canvas-social-links').appendTo('#slide-out-widget-area .inner');
						$('#slide-out-widget-area.fullscreen .bottom-text, #slide-out-widget-area.fullscreen-alt .bottom-text').appendTo('#slide-out-widget-area .inner');

					} else {
						$('#slide-out-widget-area.fullscreen .off-canvas-social-links,#slide-out-widget-area.fullscreen-alt .off-canvas-social-links').appendTo('#slide-out-widget-area .inner-wrap');
						$('#slide-out-widget-area.fullscreen .bottom-text, #slide-out-widget-area.fullscreen-alt .bottom-text').appendTo('#slide-out-widget-area .inner-wrap');
					}


					//close mobile only slide out widget area if switching back to desktop
					if ($('.slide-out-from-right.open .off-canvas-menu-container.mobile-only').length > 0 && $('body.mobile').length == 0) {
						$('#slide-out-widget-area .slide_out_area_close').trigger('click');
					}

					//sizing for dropdown
					OCM_dropdownIconPos();

				}



				/**
				* Off canvas menu: slide out from right hover open.
				*
				* @since 10.5
				*/
				function OCM_slideOutRightHoverOpen() {

					calculateHoverNavMinHeight();

					if ( nectarDOMInfo.usingMobileBrowser && $('#slide-out-widget-area.open').length > 0 ) {
						OCM_mobileSlideOutRightHoverCloseCheck();
						return false;
					}

					if( nectarDOMInfo.usingMobileBrowser ) {
						$('.slide-out-widget-area-toggle a').attr('aria-expanded','true');
						$offCanvasBG.css({
							'height': '100%',
							'width': '100%'
						});
					}

					$offCanvasEl.css({
						'transform': 'translate3d(0,0,0)'
					}).addClass('open');

					var withinCustomBreakpoint = mobileBreakPointCheck();
					if( nectarDOMInfo.winW < 1000 ) {
						withinCustomBreakpoint = true;
					}
					var alignmentPosition = (window.nectarOptions && window.nectarOptions.mobile_header_format && window.nectarOptions.mobile_header_format === 'centered-menu' && withinCustomBreakpoint) ? 'left' : 'right';

					// Icon effect
					// Set position
					if ($('header#top .container .span_9 > .slide-out-widget-area-toggle').length > 0) {

						var $hIconEl       = $('.slide-out-hover-icon-effect'),
						secondaryBarHeight = nectarDOMInfo.secondaryHeaderHeight;

						var $nectarHamMenuPos;
						var $withinCustomBreakpoint = mobileBreakPointCheck();
						if( $('#header-outer[data-format="centered-menu-bottom-bar"]').length > 0 ) {
							$withinCustomBreakpoint = false;
						}

						if ($('body.mobile').length > 0 || $withinCustomBreakpoint) {

							$hIconEl.css({
								'top': $('header#top .span_9 > .slide-out-widget-area-toggle a').offset().top - nectarDOMInfo.scrollTop
							});

							if( alignmentPosition === 'left' ) {
								$hIconEl.css({
									'left' : parseInt($('#header-outer header > .container').css('padding-right')) + 1,
									'right' : ''
								});
							} else {
								$hIconEl.css({
									'right' : parseInt($('#header-outer header > .container').css('padding-right')) + 1,
									'left' : ''
								});
							}

						} else {

							if ($bodyBorderHeaderColorMatch) {

								var $extraCushion = ($('#header-outer[data-has-menu="false"]').length > 0) ? 2 : 1;
								$hIconEl.css({
									'top': nectarDOMInfo.adminBarHeight + secondaryBarHeight + parseInt($('header#top nav >ul .slide-out-widget-area-toggle a').css('padding-top')),
									'right': 29 + $extraCushion
								});

							} else {

								if ($('#header-outer[data-format="centered-menu-bottom-bar"]').length > 0) {
									$nectarHamMenuPos = ($('header#top .span_9 > .slide-out-widget-area-toggle').css('display') == 'flex') ? $('header#top .span_9 > .slide-out-widget-area-toggle.mobile-icon a').offset() : $('header#top .span_3 .right-side .slide-out-widget-area-toggle > div').offset();

									if( $('#top .span_3 .slide-out-widget-area-toggle.mobile-icon').css('display') == 'flex' ) {
										$nectarHamMenuPos = $('#top .span_3 .slide-out-widget-area-toggle.mobile-icon a').offset();
									}

									$hIconEl.css({
										'top': parseInt($nectarHamMenuPos.top) - nectarDOMInfo.scrollTop,
										'right': parseInt($('#header-outer header >.container').css('padding-right')) + 2,
										'left': ''
									});
								} else {

									if( $body.hasClass('ascend') ) {
										$nectarHamMenuPos = ($('header#top .span_9 > .slide-out-widget-area-toggle').css('display') == 'block') ? $('header#top .span_9 > .slide-out-widget-area-toggle.mobile-icon').position() : $('header#top nav .buttons .slide-out-widget-area-toggle > div a > span:not(.screen-reader-text)').position();
									} else {
										$nectarHamMenuPos = ($('header#top .span_9 > .slide-out-widget-area-toggle').css('display') == 'block') ? $('header#top .span_9 > .slide-out-widget-area-toggle.mobile-icon').position() : $('header#top nav .buttons .slide-out-widget-area-toggle > div').position();
									}


									if ($('#header-secondary-outer.hide-up').length > 0) {
										secondaryBarHeight = 0;
									}

									$hIconEl.css({
										'top': nectarDOMInfo.adminBarHeight + secondaryBarHeight + parseInt($nectarHamMenuPos.top),
										'right': parseInt($('#header-outer header >.container').css('padding-right')) + 2,
										'left': ''
									});
								}

							} // No body border color match.

						} //Not on mobile.

					}

					////Open
					$('.slide-out-hover-icon-effect .lines-button')
						.removeClass('no-delay')
						.addClass('unhidden-line');

					if ($('#header-outer[data-permanent-transparent="1"]').length == 0 &&
						$('#nectar_fullscreen_rows').length == 0 &&
						!nectarDOMInfo.usingFrontEndEditor &&
						nectarDOMInfo.winW > 1000) {

						if (!(nectarDOMInfo.scrollTop == 0 && $('#header-outer.transparent').length > 0)) {

							if ($('body.mobile').length == 0 && $bodyBorderHeaderColorMatch) {

								$headerOuterEl.attr('data-transparent', 'true').addClass('no-bg-color').addClass('slide-out-hover');
								$('#header-outer header, #header-outer > .cart-outer').addClass('all-hidden');
							}

						}

						if ($('#header-outer[data-remove-fixed="1"]').length == 0 && $('body.mobile').length == 0 && $bodyBorderHeaderColorMatch) {

							if (headerResize == true) {

								$window.off('scroll', bigNav);
								$window.off('scroll', smallNav);

							} else {
								$window.off('scroll', opaqueCheck);
								$window.off('scroll', transparentCheck);
							}
						}

					}

					if (!nectarDOMInfo.usingMobileBrowser) {
						$window.on('mousemove.rightOffsetCheck', OCM_slideOutRightHoverCloseCheck);
					} else {
						return false;
					}

				}


				/**
				* Off canvas menu: slide out from right hover close
				*
				* @since 10.5
				*/
				function OCM_slideOutRightHoverCloseCheck(e) {

					var $windowWidth   = $window.width();
					var $ocmHoverWidth = $offCanvasEl.outerWidth();
					var withinCustomBreakpoint = mobileBreakPointCheck();
					if( nectarDOMInfo.winW < 1000 ) {
						withinCustomBreakpoint = true;
					}
					var alignmentPosition = (window.nectarOptions && window.nectarOptions.mobile_header_format && window.nectarOptions.mobile_header_format === 'centered-menu' && withinCustomBreakpoint) ? 'left' : 'right';

					var conditionalShow = false;
					if( alignmentPosition !== 'left') {
						conditionalShow = (e.clientX < $windowWidth - parseInt($ocmHoverWidth) - $bodyBorderWidth);
					} else {
						conditionalShow = (e.clientX > parseInt($ocmHoverWidth) + $bodyBorderWidth);
					}


					if (conditionalShow && $offCanvasEl.hasClass('mouse-accessed')) {

						$offCanvasEl.removeClass('mouse-accessed');
						$window.off('mousemove.rightOffsetCheck', OCM_slideOutRightHoverCloseCheck);

						$offCanvasEl.css({
							'transform': ''
						}).removeClass('open');

						$headerOuterEl.removeClass('style-slide-out-from-right');

						$('.slide-out-hover-icon-effect .lines-button')
							.removeClass('unhidden-line')
							.addClass('no-delay');

						if ($('#header-outer[data-permanent-transparent="1"]').length == 0) {

							if ($('#header-outer[data-remove-fixed="1"]').length == 0 && $('body.mobile').length == 0 && $bodyBorderHeaderColorMatch) {

								if ($('body.mobile').length == 0) {
									$headerOuterEl.removeClass('no-bg-color');
									$('#header-outer header, #header-outer > .cart-outer').removeClass('all-hidden');
								}
							}

							if ($('#header-outer[data-remove-fixed="1"]').length == 0 && $('body.mobile').length == 0 && $bodyBorderHeaderColorMatch) {

								if (headerResize == true) {

									$window.off('scroll.headerResizeEffect');

									if (nectarDOMInfo.scrollTop == 0) {

										$window.on('scroll.headerResizeEffect', smallNav);

										if ($('#header-outer[data-full-width="true"][data-transparent-header="true"]').length > 0 &&
										$bodyBorderTop.length > 0 &&
										$bodyBorderHeaderColorMatch == true &&
										$('#header-outer.pseudo-data-transparent').length > 0) {

											$('#header-outer[data-full-width="true"] header > .container').stop(true, true).animate({
												'padding': '0'
											}, {
												queue: false,
												duration: 250,
												easing: 'easeOutCubic'
											});

										}
									} else {
										$window.on('scroll.headerResizeEffect', bigNav);
									}

								} else {

									$window.off('scroll.headerResizeEffectOpaque');
									$window.on('scroll.headerResizeEffectOpaque', opaqueCheck);
								}
							}
						}
					}

				}


				/**
				* Off canvas menu: mobile slide out from right hover close.
				*
				* @since 10.5
				*/
				function OCM_mobileSlideOutRightHoverCloseCheck() {

					if(nectarDOMInfo.usingMobileBrowser) {
						$('.slide-out-widget-area-toggle a').attr('aria-expanded','false');
						$offCanvasBG.css({
							'height': '1px',
							'width': '1px'
						});
					}

					$offCanvasEl.css({
						'transform': ''
					}).removeClass('open');

					$headerOuterEl.removeClass('style-slide-out-from-right');

					$('.slide-out-hover-icon-effect .lines-button')
						.removeClass('unhidden-line')
						.addClass('no-delay');

					if ($('#header-outer[data-permanent-transparent="1"]').length == 0) {

						$headerOuterEl.removeClass('no-bg-color');
						$('#header-outer header').removeClass('all-hidden');

					}


					if ($('#header-outer[data-remove-fixed="1"]').length == 0 && $('body.mobile').length == 0 && $bodyBorderHeaderColorMatch) {

						if (headerResize == true) {

							$window.off('scroll.headerResizeEffect');

							if (nectarDOMInfo.scrollTop == 0) {

								$window.on('scroll.headerResizeEffect', smallNav);

								if ($('#header-outer[data-full-width="true"][data-transparent-header="true"]').length > 0 &&
								$bodyBorderTop.length > 0 &&
								$bodyBorderHeaderColorMatch == true &&
								$('#header-outer.pseudo-data-transparent').length > 0) {

									$('#header-outer[data-full-width="true"] header > .container').stop(true, true).animate({
										'padding': '0'
									}, {
										queue: false,
										duration: 250,
										easing: 'easeOutCubic'
									});

								}
							}

							else {
								$window.on('scroll.headerResizeEffect', bigNav);
							}

						} else {

							$window.off('scroll.headerResizeEffectOpaque');
							$window.on('scroll.headerResizeEffectOpaque', opaqueCheck);

						}

					}

				}



				/**
				* Off canvas menu: slide out from right hover initialization.
				*
				* @since 10.5
				*/
				function OCM_slideOutRightHoverInit() {

						if ($('#ajax-content-wrap > .slide-out-widget-area-toggle').length == 0) {

							//icon effect html creation
							var $iconInsertLocation = ( $('.slide-out-widget-area-toggle[data-custom-color="true"]').length > 0 ) ? '#slide-out-widget-area > div' : '#slide-out-widget-area';

							$('<div class="slide-out-widget-area-toggle slide-out-hover-icon-effect" data-icon-animation="simple-transform"><div> <a href="#sidewidgetarea" class="closed"> <span> <i class="lines-button x2"> <i class="lines"></i> </i> </span> </a> </div> </div>').insertAfter($iconInsertLocation);

							if ($('#header-outer[data-has-menu="true"]').length > 0 ||
								$('body[data-header-search="true"]').length > 0 ||
								$('.slide-out-widget-area-toggle a.using-label').length > 0 ||
								$('.slide-out-widget-area-toggle[data-custom-color="true"]').length > 0 ) {
									$('.slide-out-widget-area-toggle').addClass('small');
							}
						}


						//hover triggered
						if (!nectarDOMInfo.usingMobileBrowser) {
							$body.on('mouseenter', '#header-outer .slide-out-widget-area-toggle:not(.std-menu) a', OCM_slideOutRightHoverOpen);
							$offCanvasEl.on('mouseenter', function () {
								$(this).addClass('mouse-accessed');
							});

						} else {
							$body.on('click', '.slide-out-widget-area-toggle:not(.std-menu) a', OCM_slideOutRightHoverOpen);
							$body.on('click', '#slide-out-widget-area-bg', OCM_slideOutRightMobileClose);
						}

						$window.on('smartresize', calculateHoverNavMinHeight);


				}


				/**
				* Off canvas menu: slide out from right close from body click on mobile.
				*
				* @since 12.2
				*/
				function OCM_slideOutRightMobileClose() {

					if( $('.slide-out-from-right-hover.open').length > 0 ) {
						$('.slide-out-widget-area-toggle:not(.std-menu) a').first().addClass('non-human-allowed').trigger('click');
						setTimeout(function () {
								$('.slide-out-widget-area-toggle:not(.std-menu) a').removeClass('non-human-allowed');
						}, 100);
					}

				}


				/**
				* Off canvas menu: slide out from right open.
				*
				* @since 10.5
				*/
				function OCM_slideOutRightOpen() {

						var $slideOutAmount = ($bodyBorderTop.length > 0 && $('body.mobile').length == 0) ? $bodyBorderTop.height() : 0;

						var withinCustomBreakpoint = mobileBreakPointCheck();
						if( nectarDOMInfo.winW < 1000 ) {
							withinCustomBreakpoint = true;
						}
						var alignmentPosition = (window.nectarOptions && window.nectarOptions.mobile_header_format && window.nectarOptions.mobile_header_format === 'centered-menu' && withinCustomBreakpoint) ? 'left' : 'right';

						if ($('body.material').length == 0) {

							// Calc height if used bottom meta.
							$('#slide-out-widget-area .inner').css({
								'height': 'auto',
								'min-height': $offCanvasEl.height() - 25 - $('.bottom-meta-wrap').height()
							});

							// First item dropdown?
							if($('#slide-out-widget-area[data-dropdown-func="separate-dropdown-parent-link"] .inner > div:first-of-type > .menu > li:first-child').length > 0 &&
							$('#slide-out-widget-area .inner > div:first-of-type > .menu > li:first-child').hasClass('menu-item-has-children')) {
								$('#slide-out-widget-area .inner > div:first-of-type').css({'margin-top':'50px'});
							}

							if ($('#boxed').length == 0) {

								$('.container-wrap, .home-wrap, #footer-outer:not(#nectar_fullscreen_rows #footer-outer), .nectar-box-roll, #page-header-wrap .page-header-bg-image, #page-header-wrap .nectar-video-wrap, #page-header-wrap .mobile-video-image, #page-header-wrap #page-header-bg > .container, .page-header-no-bg, div:not(.container) > .project-title').stop(true).transition({
									x: (alignmentPosition === 'left') ? '300px' : '-300px'
								}, 700, 'easeInOutCubic');

								var $withinCustomBreakpoint = mobileBreakPointCheck();

								if ($('#header-outer[data-format="centered-logo-between-menu"]').length == 0 || $withinCustomBreakpoint) {

									if ($('#header-outer[data-transparency-option="1"]').length == 0 ||
									($('#header-outer[data-transparency-option="1"]').length > 0 && $('#header-outer[data-full-width="true"]').length == 0) ||
									$('body.mobile').length > 0) {

										$headerOuterEl.stop(true).css('transform', 'translateY(0)').transition({
											x: (alignmentPosition === 'left') ? (300 + $slideOutAmount) + 'px' : '-' + (300 + $slideOutAmount) + 'px'
										}, 700, 'easeInOutCubic');

									} else {

										$headerOuterEl.stop(true).css('transform', 'translateY(0)').transition({
											x: (alignmentPosition === 'left') ? (300 + $slideOutAmount) + 'px' : '-' + (300 + $slideOutAmount) + 'px',
											'background-color': 'transparent',
											'border-bottom': '1px solid rgba(255,255,255,0.22)'
										}, 700, 'easeInOutCubic');

									}
								} else {
									$('#header-outer header#top nav > ul.buttons, body:not(.material) #header-outer:not([data-format="centered-logo-between-menu"]) .cart-outer .cart-menu-wrap').transition({
										x: (alignmentPosition === 'left') ? '300px' : '-300px'
									}, 700, 'easeInOutCubic');
								}

							}

							$offCanvasEl.stop(true).transition({
								x: (alignmentPosition === 'left') ? $slideOutAmount + 'px' : '-' + $slideOutAmount + 'px'
							}, 700, 'easeInOutCubic').addClass('open');


							if ($('#boxed').length == 0) {

								// Full width menu adjustments
								if ($('#header-outer[data-full-width="true"]').length > 0 && !$body.hasClass('mobile')) {
									$headerOuterEl.addClass('highzI');
									$('#ascrail2000').addClass('z-index-adj');

									if ($('#header-outer[data-format="centered-logo-between-menu"]').length == 0) {

										if ($bodyBorderWidth == 0) {
											$('header#top #logo').stop(true).transition({
												x: (300 + $slideOutAmount) + 'px' //todo
											}, 700, 'easeInOutCubic');
										}

									}

									$('header#top .slide-out-widget-area-toggle .lines-button:not(.legacy-double)').addClass('close');

									$('body #header-outer nav > ul > li > a').css({
										'margin-bottom': '0'
									});

								}

							}

							$headerOuterEl.addClass('style-slide-out-from-right');

							// Fade In BG Overlay
							$offCanvasBG.css({
								'height': '100%',
								'width': '100%'
							}).stop(true).transition({
								'opacity': 1
							}, 700, 'easeInOutCubic', function () {
								$('.slide-out-widget-area-toggle:not(.std-menu) > div > a').removeClass('animating');
							});

							// Hide menu if no space
							if ($('#header-outer[data-format="centered-logo-between-menu"]').length == 0) {

								var $logoWidth = ($('#logo img:visible').length > 0) ? $('#logo img:visible').width() : $('#logo').width();

								if ($('header#top nav > .sf-menu').offset().left - $logoWidth - 300 < 20) {
									$headerOuterEl.addClass('hidden-menu');
								}

							} else {
								$headerOuterEl.addClass('hidden-menu-items');
							}


							if ($('#header-outer[data-remove-fixed="1"]').length == 0 && nectarDOMInfo.winW > 1000) {

								if ($bodyBorderHeaderColorMatch == true && headerResize == true && $headerOuterEl.attr('data-transparent-header') == 'true') {

									$headerOuterEl.stop(true).transition({
										y: '0'
									}, 0).addClass('transparent').css('transition', 'transform');


									$window.off('scroll', bigNav);
									$window.off('scroll', smallNav);

								} else if ($bodyBorderHeaderColorMatch == true && $headerOuterEl.attr('data-transparent-header') == 'true') {

									$headerOuterEl.addClass('transparent');
									$window.off('scroll', opaqueCheck);
									$window.off('scroll', transparentCheck);

								}
							}

						} else if ($('body.material').length > 0) {

							// Material theme skin slide out from right

							//move ajax loading outside
							if ($loadingScreenEl.length > 0 && $('.ocm-effect-wrap #ajax-loading-screen').length > 0) {
								$loadingScreenEl.insertBefore('.ocm-effect-wrap');
							}

							// Hide secondary header when not at top with hhun
							if (nectarDOMInfo.scrollTop > 40) {
								$('body[data-hhun="1"] #header-secondary-outer').addClass('hidden');
							}

							setTimeout(function () {
								$('.slide-out-widget-area-toggle:not(.std-menu) > div > a').removeClass('animating');
							}, 300);

							$('#slide-out-widget-area, #slide-out-widget-area-bg, #header-outer .slide-out-widget-area-toggle').addClass('material-open');


							// Handle bottom bar nav
							if ($('body:not(.mobile) #header-outer[data-format="centered-menu-bottom-bar"][data-condense="true"]').length > 0 &&
							$('#header-outer[data-format="centered-menu-bottom-bar"] .span_9').css('display') != 'none') {

								$('#header-outer:not(.fixed-menu)').css('top', nectarDOMInfo.adminBarHeight - nectarDOMInfo.scrollTop + 'px');

								if ($headerSecondaryEl.length > 0 && $('#header-outer.fixed-menu').length > 0) {
									$headerSecondaryEl.css('visibility', 'hidden');
								}

							}

							$('#ajax-content-wrap').css({
								'position': 'relative',
								'top': '-' + nectarDOMInfo.scrollTop + 'px'
							});

							$('.ocm-effect-wrap-inner').css({
								'padding-top': nectarDOMInfo.adminBarHeight
							});

							$('#fp-nav').addClass('material-ocm-open');

							nectarState.materialOffCanvasOpen = true;
							$body.addClass('material-ocm-open');
							$body.addClass('nectar-no-flex-height');

							$('.ocm-effect-wrap').css({
								'height': nectarDOMInfo.winH
							});

							setTimeout(function () {
								$('.ocm-effect-wrap').addClass('material-ocm-open');
							}, 40);


							$('body > .slide_out_area_close').addClass('follow-body');

							//icon effect
							$('#header-outer:not([data-format="left-header"]) header#top .slide-out-widget-area-toggle a').addClass('effect-shown');

							//handle hhun when at top
							$('body[data-hhun="1"]:not(.no-scroll):not(.mobile) #header-outer[data-permanent-transparent="false"]:not(.detached):not(.parallax-contained):not(.at-top-before-box)').css({
								'transition': 'none',
								'transform': 'translateY(' + nectarDOMInfo.adminBarHeight + 'px)'
							});


							setTimeout(function () {
								$('body > .slide_out_area_close').addClass('material-ocm-open');
							}, 350);


						}

				}


				/**
				* Off canvas menu: slide out from right close.
				*
				* @since 10.5
				*/
				function OCM_slideOutRightClose() {

					if ($('body.material').length == 0) {

						var withinCustomBreakpoint = mobileBreakPointCheck();
						if( nectarDOMInfo.winW < 1000 ) {
							withinCustomBreakpoint = true;
						}
						var alignmentPosition = (window.nectarOptions && window.nectarOptions.mobile_header_format && window.nectarOptions.mobile_header_format === 'centered-menu' && withinCustomBreakpoint) ? 'left' : 'right';

						$('.container-wrap, .home-wrap, #footer-outer:not(#nectar_fullscreen_rows #footer-outer), .nectar-box-roll, #page-header-wrap .page-header-bg-image,  #page-header-wrap .nectar-video-wrap, #page-header-wrap .mobile-video-image, #page-header-wrap #page-header-bg > .container, .page-header-no-bg, div:not(.container) > .project-title').stop(true).transition({
							x: '0px'
						}, 700, 'easeInOutCubic');

						if ($('#header-outer[data-transparency-option="1"]').length > 0 && $('#boxed').length == 0) {
							var $currentRowBG = ($('#header-outer[data-current-row-bg-color]').length > 0) ? $headerOuterEl.attr('data-current-row-bg-color') : $headerOuterEl.attr('data-user-set-bg');
							$headerOuterEl.stop(true).transition({
								x: '0px',
								'background-color': $currentRowBG
							}, 700, 'easeInOutCubic');
						} else {
							$headerOuterEl.stop(true).transition({
								x: '0px'
							}, 700, 'easeInOutCubic');
						}

						$offCanvasEl.stop(true).transition({
							x: (alignmentPosition === 'left') ? '-301px' : '301px'
						}, 700, 'easeInOutCubic').removeClass('open');


						if ($('#boxed').length == 0) {
							if ($('#header-outer[data-full-width="true"]').length > 0) {
								$headerOuterEl.removeClass('highzI');
								$('header#top #logo').stop(true).transition({
									x: '0px'
								}, 700, 'easeInOutCubic');
								$('.lines-button').removeClass('close');

							}
						}

						if ($('#header-outer[data-format="centered-logo-between-menu"]').length > 0) {
							$('#header-outer header#top nav > ul.buttons, #header-outer .cart-outer .cart-menu-wrap').stop(true).transition({
								x: '0px'
							}, 700, 'easeInOutCubic');
						}

						//fade out overlay
						$offCanvasBG.stop(true).transition({
							'opacity': 0
						}, 700, 'easeInOutCubic', function () {

							$('.slide-out-widget-area-toggle a').removeClass('animating');

							$(this).css({
								'height': '1px',
								'width': '1px'
							});

							if ($('#header-outer[data-remove-fixed="1"]').length == 0) {

								//hide menu if transparent, user has scrolled down and hhun is on
								if ($headerOuterEl.hasClass('parallax-contained') &&
								nectarDOMInfo.scrollTop > 0 &&
								$('#header-outer[data-permanent-transparent="1"]').length == 0) {
									$headerOuterEl.removeClass('parallax-contained').addClass('detached').removeClass('transparent');
								}
								else if (nectarDOMInfo.scrollTop == 0 && $('body[data-hhun="1"]').length > 0 && $('#page-header-bg[data-parallax="1"]').length > 0 ||
								nectarDOMInfo.scrollTop == 0 && $('body[data-hhun="1"]').length > 0 && $('.parallax_slider_outer').length > 0) {

									if ($('#header-outer[data-transparency-option="1"]').length > 0) {
										$headerOuterEl.addClass('transparent');
									}

									$headerOuterEl
										.addClass('parallax-contained')
										.removeClass('detached');

								}

							}

							//fix for fixed subpage menu
							$('.container-wrap').css('transform', 'none');

						});


						$headerOuterEl.removeClass('style-slide-out-from-right');


						if ($('#header-outer[data-remove-fixed="1"]').length == 0) {

							if ($bodyBorderHeaderColorMatch == true &&
								headerResize == true &&
								nectarDOMInfo.winW > 1000) {

								$window.off('scroll.headerResizeEffect');
								if (nectarDOMInfo.scrollTop == 0) {

									$window.on('scroll.headerResizeEffect', smallNav);

									if ($('#header-outer[data-full-width="true"][data-transparent-header="true"]').length > 0 &&
									$bodyBorderTop.length > 0 &&
									$bodyBorderHeaderColorMatch == true &&
									$('#header-outer.pseudo-data-transparent').length > 0) {

										$('#header-outer[data-full-width="true"] header > .container').stop(true, true).animate({
											'padding': '0'
										}, {
											queue: false,
											duration: 250,
											easing: 'easeOutCubic'
										});

									}
								} else {
									$window.on('scroll.headerResizeEffect', bigNav);
								}

								if ($headerOuterEl.hasClass('pseudo-data-transparent')) {

									$headerOuterEl.attr('data-transparent-header', 'false')
										.removeClass('pseudo-data-transparent')
										.removeClass('transparent');
								}

								$headerOuterEl.css('transition', 'transform');

							} else if ($bodyBorderHeaderColorMatch == true && nectarDOMInfo.winW > 1000) {

								$window.off('scroll.headerResizeEffectOpaque');
								$window.on('scroll.headerResizeEffectOpaque', opaqueCheck);

								$headerOuterEl.css('transition', 'transform');

								if ($headerOuterEl.hasClass('pseudo-data-transparent')) {
									$headerOuterEl.attr('data-transparent-header', 'false')
										.removeClass('pseudo-data-transparent')
										.removeClass('transparent');
								}
							}
						}
					}

					else if ($('body.material').length > 0) {

						//material
						$offCanvasEl.removeClass('open');

						$('#slide-out-widget-area, #slide-out-widget-area-bg, #header-outer .slide-out-widget-area-toggle').removeClass('material-open');
						$('.ocm-effect-wrap, .ocm-effect-wrap-shadow, body > .slide_out_area_close, #fp-nav').removeClass('material-ocm-open');

						$('body > .slide_out_area_close').removeClass('follow-body');

						setTimeout(function () {
							$('.slide-out-widget-area-toggle a').removeClass('animating');

							$body.removeClass('material-ocm-open');
							$body.removeClass('nectar-no-flex-height');

							$('.ocm-effect-wrap').css({
								'height': '100%'
							});

							$('.ocm-effect-wrap-inner').css({
								'padding-top': '0'
							});

							$window.scrollTop(Math.abs(parseInt($('#ajax-content-wrap').css('top'))));

							$('#ajax-content-wrap').css({
								'position': '',
								'top': ''
							});


							//handle bottom bar nav
							if ($('#header-outer[data-format="centered-menu-bottom-bar"]').length > 0 &&
							$('#header-outer[data-format="centered-menu-bottom-bar"] .span_9').css('display') != 'none' &&
							$('body.mobile').length == 0) {

								$('#header-outer:not(.fixed-menu)').css('top', '');
								$headerSecondaryEl.css('visibility', '');

							}

							//handle hhun when at top
							$('body[data-hhun="1"]:not(.no-scroll) #header-outer[data-permanent-transparent="false"]:not(.detached):not(.parallax-contained):not(.at-top-before-box)').css({
								'transform': ''
							});
							setTimeout(function () {
								$('body[data-hhun="1"]:not(.no-scroll) #header-outer[data-permanent-transparent="false"]:not(.detached):not(.parallax-contained):not(.at-top-before-box)').css({
									'transition': ''
								});
							}, 30);


							$('body[data-hhun="1"] #header-secondary-outer.hidden').removeClass('hidden');

							nectarState.materialOffCanvasOpen = false;

						}, 900);

						setTimeout(function () {

							//icon effect
							$('#header-outer:not([data-format="left-header"]) header#top .slide-out-widget-area-toggle a')
								.addClass('no-trans')
								.removeClass('effect-shown');

						}, 200);

						setTimeout(function () {
							//icon
							$('#header-outer:not([data-format="left-header"]) header#top .slide-out-widget-area-toggle a').removeClass('no-trans');
						}, 500);

					}

				}




				/**
				* Off canvas menu: fullscreen open.
				*
				* @since 10.5
				*/
				function OCM_fullscreenOpen() {

					if ($('body.material').length > 0) {
						$('header#top .slide-out-widget-area-toggle a').addClass('menu-push-out');
					}

					// Scroll away from fixed reveal footer if shown (firefox bug with bluring over it)
					var $scrollDelay = 0;
					var $scrollDelay2 = 0;

					if (nectarDOMInfo.scrollTop + $window.height() > $('.blurred-wrap').height() && $('#nectar_fullscreen_rows').length == 0) {
						$('body,html').stop().animate({
							scrollTop: $('.blurred-wrap').height() - $window.height()
						}, 600, 'easeInOutCubic');
						$scrollDelay = 550;
						$scrollDelay2 = 200;
					}

					$('header#top .slide-out-widget-area-toggle:not(.std-menu) .lines-button:not(.legacy-double)').addClass('close');
					setTimeout(function () {
						$('.blurred-wrap').addClass('blurred');
					}, $scrollDelay);
					$('#slide-out-widget-area.fullscreen').show().addClass('open');

					if ($('.nectar-social.fixed').length == 0) {
						hideToTop();
					}

					// Remove box shadow incase at the top of the page with nectar box roll above
					$('.container-wrap').addClass('no-shadow');
					$headerOuterEl.stop(true).css('transform', 'translateY(0)');

					setTimeout(function () {

						$('.off-canvas-menu-container .menu > li').each(function (i) {
							$(this).delay(i * 50).transition({
								y: 0,
								'opacity': 1
							}, 800, 'easeOutExpo');
						});

						$('#slide-out-widget-area.fullscreen .widget').each(function (i) {
							$(this).delay(i * 100).transition({
								y: 0,
								'opacity': 1
							}, 800, 'easeOutExpo');
						});
					}, 370 + $scrollDelay2);

					setTimeout(function () {
						$('#slide-out-widget-area .off-canvas-social-links').addClass('line-shown');

						$('#slide-out-widget-area .off-canvas-social-links li').each(function (i) {
							$(this).delay(i * 50).transition({
								'scale': 1
							}, 400, 'easeOutCubic');
						});

						$('#slide-out-widget-area .bottom-text').transition({
							'opacity': 0.7
						}, 400, 'easeOutCubic');
					}, 750 + $scrollDelay2);

					// Fade In BG Overlay
					setTimeout(function () {
						var $easing = ($('body.mobile').length > 0) ? 'easeOutCubic' : 'easeInOutQuint';
						$offCanvasBG.css({
							'height': '100%',
							'width': '100%'
						}).show().stop(true).transition({
							'y': '0%'
						}, 920, $easing, function () {
							$('.slide-out-widget-area-toggle > div > a').removeClass('animating');
						});
					}, 50 + $scrollDelay2);

					// Overflow state
					OCM_overflowState();

					if ($('.mobile #header-outer[data-permanent-transparent="false"]').length > 0 && $('.container-wrap').hasClass('no-scroll')) {
						$('#ajax-content-wrap').addClass('at-content');
					}

					var headerOffset = $headerOuterEl.offset().top - nectarDOMInfo.scrollTop + nectarDOMInfo.secondaryHeaderHeight;

					$('#slide-out-widget-area.fullscreen .inner-wrap').css('padding-top', ($headerOuterEl.outerHeight() + headerOffset));


				}


				/**
				* Off canvas menu: fullscreen close.
				*
				* @since 10.5
				*/
				function OCM_fullscreenClose() {

					if ($('body.material').length > 0) {
						setTimeout(function () {
							$('header#top .slide-out-widget-area-toggle a').removeClass('menu-push-out');
						}, 350);
					}

					$('.slide-out-widget-area-toggle:not(.std-menu) .lines-button:not(.legacy-double)').removeClass('close');
					$('.blurred-wrap').removeClass('blurred');
					$('#slide-out-widget-area.fullscreen').transition({
						'opacity': 0
					}, 700, 'easeOutQuad', function () {
						$('#slide-out-widget-area.fullscreen').hide().css('opacity', '1');
					}).removeClass('open');
					$('#slide-out-widget-area.fullscreen .widget').transition({
						'opacity': 0
					}, 700, 'easeOutQuad', function () {
						$(this).transition({
							y: '110px'
						}, 0);
					});

					setTimeout(function () {
						$('.off-canvas-menu-container .menu > li').transition({
							y: '80px',
							'opacity': 0
						}, 0);
						$('#slide-out-widget-area .off-canvas-social-links li').transition({
							'scale': 0
						}, 0);
						$('#slide-out-widget-area .off-canvas-social-links').removeClass('line-shown');
						$('#slide-out-widget-area .bottom-text').transition({
							'opacity': 0
						}, 0);

						// Close submenu items
						$('#slide-out-widget-area .menuwrapper .menu').removeClass('subview');
						$('#slide-out-widget-area .menuwrapper .menu li').removeClass('subview subviewopen');
						$('#slide-out-widget-area.fullscreen .inner .menu-wrap').css('height', 'auto');
					}, 800);

					setTimeout(function () {
						if ($('.nectar-social.fixed').length == 0) {
							showToTop();
						}
						$('.container-wrap').removeClass('no-shadow');
					}, 500);

					// Fade out overlay
					$offCanvasBG.stop(true).transition({
						'opacity': 0
					}, 900, 'easeOutQuad', function () {

						if ($('.mobile #header-outer[data-permanent-transparent="false"]').length > 0 && $('.container-wrap').hasClass('no-scroll')) {
							$('#ajax-content-wrap').removeClass('at-content');
						}
						if ($('.mobile #header-outer[data-permanent-transparent="false"]').length == 0) {
							$('#slide-out-widget-area.fullscreen .inner-wrap').css('padding-top', '0');
						}

						$('.slide-out-widget-area-toggle a').removeClass('animating');

						var $opacity = 0.4;

						if ($offCanvasBG.hasClass('solid')) {
							$opacity = 1;
						}
						if ($offCanvasBG.hasClass('dark')) {
							$opacity = 0.93;
						}
						if ($offCanvasBG.hasClass('medium')) {
							$opacity = 0.6;
						}
						if ($offCanvasBG.hasClass('light')) {
							$opacity = 0.4;
						}
						$(this).css({
							'height': '1px',
							'width': '1px',
							'opacity': $opacity
						}).transition({
							y: '-100%'
						}, 0);
					});

				}


				/**
				* Off canvas menu: fullscreen alt open.
				*
				* @since 10.5
				*/
				function OCM_fullscreenAltOpen() {

					var $ocm_fullscreen_class = ( $offCanvasEl.hasClass('fullscreen-alt') ) ? '.fullscreen-alt' : '.fullscreen-split';

					if ($('body.material').length > 0) {
						$('header#top .slide-out-widget-area-toggle a').addClass('menu-push-out');
					}

					$('header#top .slide-out-widget-area-toggle:not(.std-menu) .lines-button:not(.legacy-double)').addClass('close');

					if( $ocm_fullscreen_class === '.fullscreen-alt' ) {
						$('#slide-out-widget-area'+$ocm_fullscreen_class).show().addClass('open');
					} else {
						$('#slide-out-widget-area'+$ocm_fullscreen_class).addClass('open').removeClass('hidden');
					}

					$offCanvasBG.addClass('open').removeClass('hidden');

					$('body > div[class*="body-border"]').css('z-index', '9995');

					if( $ocm_fullscreen_class === '.fullscreen-alt' ) {
						$('.off-canvas-menu-container .menu').transition({
							y: '0px',
							'opacity': 1
						}, 0);
					}

					if ($('.nectar-social.fixed').length == 0) {
						hideToTop();
					}

					if ($('#header-outer.transparent').length > 0) {

						if ($bodyBorderTop.length > 0) {
							$('.admin-bar #slide-out-widget-area-bg'+$ocm_fullscreen_class).css({
								'padding-top': ($bodyBorderTop.outerHeight(true) + 32) + 'px'
							});
							$('body:not(.admin-bar) #slide-out-widget-area-bg'+$ocm_fullscreen_class).css({
								'padding-top': ($bodyBorderTop.outerHeight(true)) + 'px'
							});
						}
					}

					// Set translateY to 0 in all cases
					$headerOuterEl.stop(true).css('transform', 'translateY(0)');

					if ($('#logo .starting-logo').length > 0 &&
					$window.width() > 1000 &&
					$('#header-outer[data-format="centered-menu-bottom-bar"].fixed-menu').length == 0 &&
					$('body.material #header-outer[data-condense="true"]').length == 0 &&
					$headerOuterEl.attr('data-transparent-header') == 'true' &&
					!nectarDOMInfo.usingFrontEndEditor) {

						$headerOuterEl.stop(true).css('transform', 'translateY(0)').addClass('transparent');

					}

					$('.off-canvas-menu-container .clip-wrap').css('transition-duration', '0s');

					if( $ocm_fullscreen_class === '.fullscreen-alt' ) {

						setTimeout(function () {

							$('.off-canvas-menu-container .menu > li').each(function (i) {
								$(this).delay(i * 50).transition({
									y: 0,
									'opacity': 1
								}, 750, 'easeOutCubic').addClass('no-pointer-events');
							});

							setTimeout(function () {
								$('.off-canvas-menu-container .menu > li').removeClass('no-pointer-events');
								$('.off-canvas-menu-container .clip-wrap').css('transition-duration', '.45s');
							}, 500);

							$('#slide-out-widget-area.fullscreen-alt .widget').each(function (i) {
								$(this).delay(i * 100).transition({
									y: 0,
									'opacity': 1
								}, 650, 'easeOutCubic');
							});

						}, 200);

						setTimeout(function () {
							$('#slide-out-widget-area .off-canvas-social-links').addClass('line-shown');

							$('#slide-out-widget-area .off-canvas-social-links li').css('opacity', '1').each(function (i) {
								$(this).delay(i * 50).transition({
									'scale': 1
								}, 400, 'easeOutCubic');
							});
							$('#slide-out-widget-area .bottom-text').transition({
								'opacity': 1
							}, 600, 'easeOutCubic');
						}, 200);

					}

					// Fade In BG Overlay
					var $opacity = 0.4;

					if ($offCanvasBG.hasClass('solid')) {
						$opacity = 1;
					}
					if ($offCanvasBG.hasClass('dark')) {
						$opacity = 0.97;
					}
					if ($offCanvasBG.hasClass('medium')) {
						$opacity = 0.6;
					}
					if ($offCanvasBG.hasClass('light')) {
						$opacity = 0.4;
					}
					$offCanvasBG.removeClass('no-transition');


					if( $ocm_fullscreen_class === '.fullscreen-alt' ) {

						$offCanvasBG.addClass('padding-removed').css({
							'height': '100%',
							'width': '100%',
							'left': '0',
							'opacity': $opacity
						});

						// Overflow state
						OCM_overflowState();

					}

					setTimeout(function () {
						$('.slide-out-widget-area-toggle > div > a').removeClass('animating');
					}, 600);


					if ($('.mobile #header-outer[data-permanent-transparent="false"]').length > 0 &&
					$('.container-wrap').hasClass('no-scroll')) {
						$('#ajax-content-wrap').addClass('at-content');
					}

					if( $ocm_fullscreen_class === '.fullscreen-alt' ) {

						var headerOffset = $headerOuterEl.offset().top - nectarDOMInfo.scrollTop + nectarDOMInfo.secondaryHeaderHeight;

						$('#slide-out-widget-area'+$ocm_fullscreen_class+' .inner-wrap').css('padding-top', ($headerOuterEl.outerHeight() + headerOffset));

					} else {
						$('#slide-out-widget-area'+$ocm_fullscreen_class+' .inner-wrap').css('padding-top', $headerOuterEl.outerHeight());
					}

				}


				/**
				* Off canvas menu: fullscreen alt close.
				*
				* @since 10.5
				*/
				function OCM_fullscreenAltClose() {

					var $ocm_fullscreen_class = ( $offCanvasEl.hasClass('fullscreen-alt') ) ? '.fullscreen-alt' : '.fullscreen-split';

					if ($('body.material').length > 0) {
						setTimeout(function () {
							$('header#top .slide-out-widget-area-toggle a').removeClass('menu-push-out');
						}, 350);
					}

					$('.slide-out-widget-area-toggle:not(.std-menu) .lines-button:not(.legacy-double)').removeClass('close');


					$offCanvasBG.removeClass('open');

					if( $ocm_fullscreen_class === '.fullscreen-split' ) {
						setTimeout(function () {
							$offCanvasBG.addClass('hidden');
							$('#slide-out-widget-area'+$ocm_fullscreen_class).addClass('hidden');
						},600);
					}

					if( $ocm_fullscreen_class === '.fullscreen-alt' ) {

						$('.blurred-wrap').removeClass('blurred');

						$('#slide-out-widget-area.fullscreen-alt .widget').transition({
							'opacity': 0
						}, 500, 'easeOutQuad', function () {
							$(this).transition({
								y: '40px'
							}, 0);
						});
						$('#slide-out-widget-area .bottom-text, #slide-out-widget-area .off-canvas-social-links li').transition({
							'opacity': 0
						}, 250, 'easeOutQuad');
						$('#slide-out-widget-area .off-canvas-social-links').removeClass('line-shown');

						$('.off-canvas-menu-container .menu').transition({
							y: '-13px',
							'opacity': 0
						}, 400);

					}


					setTimeout(function () {

						if( $ocm_fullscreen_class === '.fullscreen-alt' ) {

							$('.off-canvas-menu-container .menu > li').stop(true, true).transition({
								y: '40px',
								'opacity': 0
							}, 0);
							$('#slide-out-widget-area .off-canvas-social-links li').transition({
								'scale': 0
							}, 0);
							$('#slide-out-widget-area .off-canvas-social-links').removeClass('line-shown');

							// Close submenu items
							$('#slide-out-widget-area .menuwrapper .menu').removeClass('subview');
							$('#slide-out-widget-area .menuwrapper .menu li').removeClass('subview subviewopen');
							$('#slide-out-widget-area.fullscreen-alt .inner .menu-wrap').css('height', 'auto');

							$offCanvasBG.css({
								'height': '1px',
								'width': '1px',
								'left': '-100%'
							});

						}

						if ($('.mobile #header-outer[data-permanent-transparent="false"]').length > 0 && $('.container-wrap').hasClass('no-scroll')) {
							$('#ajax-content-wrap').removeClass('at-content');
						}

						if ($('.mobile #header-outer[data-permanent-transparent="false"]').length == 0) {
							$('#slide-out-widget-area'+$ocm_fullscreen_class+' .inner-wrap').css('padding-top', '0');
						}

						$('.slide-out-widget-area-toggle a').removeClass('animating');

						if( $ocm_fullscreen_class === '.fullscreen-alt' ) {
							$('#slide-out-widget-area'+$ocm_fullscreen_class).hide().removeClass('open');
						}

					}, 550);

					if( $ocm_fullscreen_class === '.fullscreen-split' ) {
						$('#slide-out-widget-area'+$ocm_fullscreen_class).removeClass('open');
					}

					setTimeout(function () {
						if ($('.nectar-social.fixed').length == 0) {
							showToTop();
						}
					}, 600);

					// Fade out overlay
					setTimeout(function () {
						$offCanvasBG.removeClass('padding-removed');
					}, 50);


					var borderDelay = ($bodyBorderHeaderColorMatch == true) ? 150 : 50;

					setTimeout(function () {

						if( $ocm_fullscreen_class === '.fullscreen-alt' ) {
							$offCanvasBG.stop(true).css({
								'opacity': 0
							});
						}
						if ($('#header-outer[data-transparent-header="true"]').length > 0) {
							$('body > div[class*="body-border"]').css('z-index', '10000');
						}
					}, borderDelay);

					setTimeout(function () {
						$('#header-outer:not([data-permanent-transparent="1"]).transparent.small-nav, #header-outer[data-hhun="1"]:not([data-permanent-transparent="1"]).transparent.scrolling, #header-outer:not([data-permanent-transparent="1"]).transparent.scrolled-down').removeClass('transparent');

						if ($headerOuterEl.hasClass('pseudo-data-transparent')) {

							$headerOuterEl.attr('data-transparent-header', 'false')
								.removeClass('pseudo-data-transparent')
								.removeClass('transparent');
						}

					}, 100);

				}


				/**
				* Off canvas menu: simple dropdown open.
				*
				* @since 10.5
				*/
				function OCM_simpleDropdownOpen(classname) {

					$('#mobile-menu').show();

					$('header#top').find('.'+classname+':not(.std-menu) .lines-button').addClass('close');

					if ($('body.material').length > 0) {
						$('header#top').find('.'+classname+' a').addClass('menu-push-out');
					}

					setTimeout(function () {
						$('header#top').find('.'+classname+' > div > a').removeClass('animating');
					}, 100);

				}

				/**
				* Off canvas menu: simple dropdown close.
				*
				* @since 10.5
				*/
				function OCM_simpleDropdownClose(classname) {

					$('#mobile-menu').hide();

					$('body').find('.'+classname+':not(.std-menu) .lines-button').removeClass('close');

					setTimeout(function () {
						if ($('body.material').length > 0) {
							$('header#top .'+classname+' a').removeClass('menu-push-out');
						}
						$('body').find('.'+classname+' a').removeClass('animating');
					}, 350);
				}


				/**
				* Off canvas menu: simple dropdown click events.
				*
				* @since 10.5
				*/
				function OCM_simpleStyleInit() {

					if( $('#header-outer #mobile-menu').length == 0 ) {
						return;
					}

					$('#header-outer #mobile-menu li.megamenu').removeClass('megamenu');

					// Add icons/markup.
					$('#header-outer #mobile-menu ul li a').each(function() {
						if( !$(this).hasClass('nectar-widget-link') && $(this).find('.nectar-ext-menu-item').length == 0 ) {
							$(this).wrapInner('<span></span>');
						}
					});

					$('#header-outer #mobile-menu ul li').each(function(){

						if($(this).find('> ul').length > 0) {
							$(this).find('> a').append('<span class="sf-sub-indicator"><i class="fa fa-angle-down"></i></span>');
						}

					});

					// Click event.
					$('#header-outer #mobile-menu .sf-sub-indicator').on('click', function(){

						var $parentLI = $(this).parent().parent();

						$parentLI.toggleClass('current-open-item');

						// Open.
						if( $parentLI.hasClass('current-open-item') ) {
							$parentLI.find('> ul').show();
							setTimeout(function(){
								$parentLI.addClass('visible');
							},30);
						} else {
							// Close.
							$parentLI.find('ul').hide();
							// Ensure open children also close.
							$parentLI.find('li').removeClass('visible').removeClass('current-open-item');
							$parentLI.removeClass('visible');
						}

						return false;

					});

					// Resize event.
					$window.on('smartresize', function(){

						if( nectarDOMInfo.winW > 1000 && $('.slide-out-widget-area-toggle.mobile-icon a.open').length > 0 ||
					      nectarDOMInfo.winW > 1000 && $('.nectar-ocm-trigger-open.simple-mobile-menu a.open').length > 0) {

						$('.slide-out-widget-area-toggle.mobile-icon a, .nectar-ocm-trigger-open.simple-mobile-menu a').addClass('non-human-allowed');


						$('.slide-out-widget-area-toggle.mobile-icon a.open, .nectar-ocm-trigger-open.simple-mobile-menu a.open').trigger('click');

							setTimeout(function () {
									$('.slide-out-widget-area-toggle.mobile-icon a, .nectar-ocm-trigger-open.simple-mobile-menu a').removeClass('non-human-allowed');
							}, 100);

						}

					});

				}


				/**
				* Off canvas menu click triggered styles initialization
				*
				* @since 10.5
				*/
				function OCM_clickTriggeredStylesInit() {

					// Click triggered open bind.
					$body.on('click', '.slide-out-widget-area-toggle:not(.std-menu) a.closed:not(.animating), .nectar-ocm-trigger-open', function () {

						if (nectarBoxRoll.animating == 'true' || $('.slide-out-from-right-hover').length > 0) {
							return false;
						}

						$headerOuterEl.removeClass('no-transition');

						// Classic Mobile Direct Custom Link.
						if( $(this).hasClass('simple-mobile-menu')) {
							OCM_simpleDropdownOpen('simple-mobile-menu');
							$(this).find('a').addClass('open');
							return false;
						}

						// Slide out from right.
						if ($offCanvasEl.hasClass('slide-out-from-right')) {
							OCM_slideOutRightOpen();
						}
						// Fullscreen.
						else if ($offCanvasEl.hasClass('fullscreen')) {
							OCM_fullscreenOpen();
						}
						// Fullscreen Alt.
						else if ($offCanvasEl.hasClass('fullscreen-alt') || $offCanvasEl.hasClass('fullscreen-split')) {
							OCM_fullscreenAltOpen();
						}
						// Simple dropdown.
						else if( $('#header-outer #mobile-menu').length > 0 ) {
							OCM_simpleDropdownOpen('slide-out-widget-area-toggle');
						}


						// Add open class
						if( $('#header-outer #mobile-menu').length == 0 ) {

							$headerOuterEl
								.removeClass('side-widget-closed')
								.addClass('side-widget-open');


							// Give header transparent state
							if ($('#header-outer[data-transparency-option="1"]').length > 0 &&
							$('#boxed').length == 0 &&
							$('#header-outer[data-full-width="true"]').length > 0 &&
							!nectarDOMInfo.usingFrontEndEditor) {

								if ($('body.material[data-slide-out-widget-area-style="slide-out-from-right"]').length == 0 &&
								$('body.material #header-outer[data-condense="true"]').length == 0) {

									$headerOuterEl.addClass('transparent');

								}

							}

							// Dark slide transparent nav
							if ($('#header-outer.dark-slide.transparent').length > 0 &&
							$('#boxed').length == 0 &&
							$('body.material-ocm-open').length == 0) {
								$headerOuterEl
									.removeClass('dark-slide')
									.addClass('temp-removed-dark-slide');
							}

						} // Not using simple OCM.


						$('.slide-out-widget-area-toggle:not(.simple-mobile-menu) > div > a')
							.removeClass('closed')
							.addClass('open')
							.attr('aria-expanded','true');

						$('.slide-out-widget-area-toggle:not(.simple-mobile-menu) > div > a').addClass('animating');

						return false;

					});



					// Close event bind.
					$body.on('click', '.slide-out-widget-area-toggle:not(.std-menu) a.open:not(.animating), .nectar-ocm-trigger-open a.open, #slide-out-widget-area .slide_out_area_close, > .slide_out_area_close, #slide-out-widget-area-bg.slide-out-from-right, .material-ocm-open #ajax-content-wrap', function (e) {

						if (e.originalEvent == undefined &&
							$('.slide_out_area_close.non-human-allowed').length == 0 &&
							$('.slide-out-widget-area-toggle.mobile-icon a.non-human-allowed').length == 0) {
							return;
						}

						if ($('.slide-out-widget-area-toggle:not(.std-menu) a.animating').length > 0) {
							return;
						}

						$headerOuterEl.removeClass('no-transition');

						// Classic Mobile Direct Custom Link.
						if( $(this).parents('.simple-mobile-menu').length > 0 ) {
							OCM_simpleDropdownClose('simple-mobile-menu');
							$(this).removeClass('open');
							return false;
						}

						$('.slide-out-widget-area-toggle:not(.std-menu):not(.simple-mobile-menu) a')
							.removeClass('open')
							.addClass('closed')
							.attr('aria-expanded','false');

						$('.slide-out-widget-area-toggle:not(.simple-mobile-menu):not(.std-menu) a')
							.addClass('animating');

						// Slide out from right.
						if ($offCanvasEl.hasClass('slide-out-from-right')) {
							OCM_slideOutRightClose();
						}

						// Fullscreen.
						else if ($offCanvasEl.hasClass('fullscreen')) {
							OCM_fullscreenClose();
						}
						// Fullscreen alt.
						else if ($offCanvasEl.hasClass('fullscreen-alt') || $offCanvasEl.hasClass('fullscreen-split')) {
							OCM_fullscreenAltClose();
						}
						// Simple dropdown.
						else if( $('#header-outer #mobile-menu').length > 0 ) {
							OCM_simpleDropdownClose('slide-out-widget-area-toggle');
						}

						if( $('#header-outer #mobile-menu').length == 0 ) {

							// Dark slide transparent nav
							if ($('#header-outer.temp-removed-dark-slide.transparent').length > 0 && $('#boxed').length == 0) {
								$headerOuterEl
									.removeClass('temp-removed-dark-slide')
									.addClass('dark-slide');
							}

							// Remove header transparent state
							if ($('#header-outer[data-permanent-transparent="1"]').length == 0 && $('#slide-out-widget-area.fullscreen-alt').length == 0) {

								if ($('.nectar-box-roll').length == 0) {
									if ($('#header-outer.small-nav').length > 0 ||
									$('#header-outer.scrolled-down').length > 0) {
										$headerOuterEl.removeClass('transparent');
									}
								}
								else {
									if ($('#header-outer.small-nav').length > 0 ||
									$('#header-outer.scrolled-down').length > 0 ||
									$('.container-wrap.auto-height').length > 0) {
										$headerOuterEl.removeClass('transparent');
									}
								}

							}

							// Remove hidden menu
							$headerOuterEl.removeClass('hidden-menu');

							$headerOuterEl
								.removeClass('side-widget-open')
								.addClass('side-widget-closed');

						} // Not using simple OCM.

						return false;

					});

				}


				/**
				* Off canvas menu main initialization.
				*
				* @since 10.5
				*/
				function OCM_init() {

					if ($('#slide-out-widget-area.slide-out-from-right-hover').length > 0) {
						OCM_slideOutRightHoverInit();
					} else {
						OCM_clickTriggeredStylesInit();
						OCM_simpleStyleInit();
					}


					if ($('#slide-out-widget-area.fullscreen-split').length == 0 &&
					$('body.material[data-slide-out-widget-area-style*="slide-out-from-right"]').length == 0 &&
					$('#slide-out-widget-area[data-dropdown-func="separate-dropdown-parent-link"]').length == 0) {

						fullscreenMenuInit();

					} else if ($('body.using-mobile-browser[data-slide-out-widget-area-style="slide-out-from-right-hover"]').length > 0) {

						// Close OCM on mobile when clicking anchor on same page
						$('body #slide-out-widget-area .inner .off-canvas-menu-container li a[href*="#"]').on('click', function () {
							if ($(this).attr('href') != '#') {
								OCM_close($(this).parent());
							}

						});

					}

					// Page fullscreen row close OCM fullscreen/classic slide out from right
					if ($('#nectar_fullscreen_rows').length > 0 && ($('body[data-slide-out-widget-area-style*="fullscreen"]').length > 0 || $('body[data-slide-out-widget-area-style="slide-out-from-right"]:not(.material)').length > 0) ) {

						$('body #slide-out-widget-area .inner .off-canvas-menu-container li a[href]').on('click', function () {

							var $link_href = ($(this).is('[href*="#"]')) ? $(this).attr('href') : '';
							if ($link_href != '#' && $('div[data-fullscreen-anchor-id="' + $link_href.substr($link_href.indexOf("#") + 1) + '"]').length > 0) {

								setTimeout(function () {

									$('#slide-out-widget-area .slide_out_area_close')
										.addClass('non-human-allowed')
										.trigger('click');

								}, 100);

								setTimeout(function () {
									$('#slide-out-widget-area .slide_out_area_close').removeClass('non-human-allowed');
								}, 150);

							}

						});
					}


					// Submenu link hover fix
					$body.on('mouseover', '#slide-out-widget-area .off-canvas-menu-container .menuwrapper > .sub-menu li > a', function () {
						var $currentTxt = $(this).text();
						$('.off-canvas-menu-container .menuwrapper .menu li > a').removeClass('hovered');
						$('.off-canvas-menu-container .menuwrapper .menu li > a:contains(' + $currentTxt + ')').addClass('hovered');
					});

					$body.on('mouseover', '.off-canvas-menu-container .menuwrapper .menu li > a', function () {
						$('.off-canvas-menu-container .menuwrapper .menu li > a').removeClass('hovered');
					});


					// Bind mousewheel.
					setTimeout(OCM_scrolling, 500);

					// Handle mobile scrolling.
					if (nectarDOMInfo.usingMobileBrowser) {
						$offCanvasEl.addClass('mobile');
					}


				}




				/**
				* Off canvas menu scrolling.
				*
				* @since 10.5
				*/
				function OCM_scrolling() {

					$offCanvasEl.mousewheel(function (event, delta) {

						this.scrollTop -= (event.deltaY * event.deltaFactor)/1.5;

						event.preventDefault();
					});

				}



				/**
				* Off canvas menu close.
				*
				* @since 10.5
				*/
				function OCM_close(item) {

					if ($('#slide-out-widget-area.open').length > 0) {

						var $windowCurrentLocation = window.location.href.split("#")[0];
						var $windowClickedLocation = item.find('> a').attr('href').split("#")[0];

						if ($windowCurrentLocation == $windowClickedLocation || item.find('a[href^="#"]').length > 0) {
							if (item.parents('.slide-out-from-right-hover').length > 0) {
								$('.slide-out-widget-area-toggle.slide-out-hover-icon-effect a').trigger('click');
							} else {
								$('.slide-out-widget-area-toggle a').trigger('click');
							}

						}
					}

				}




				/**
				* Click based submenus.
				*
				* Used by left header layout and off canvas menu.
				*
				* @since 10.5
				*/
				function clickToggleSubmenus() {

					if (!$('#header-outer[data-format="left-header"]').length > 0 &&
					!$('body.material[data-slide-out-widget-area-style*="slide-out-from-right"]').length > 0 &&
					!$('#slide-out-widget-area.fullscreen-split').length > 0 &&
					!$('#slide-out-widget-area[data-dropdown-func="separate-dropdown-parent-link"]').length > 0) {
						return;
					}

					// Remove megamenu class.
					$('#header-outer[data-format="left-header"] nav li.megamenu').removeClass('nectar-megamenu-menu-item').removeClass('megamenu');

					var $ocm_link_selector;

					if ($('#slide-out-widget-area[data-dropdown-func="separate-dropdown-parent-link"]').length > 0) {
						$ocm_link_selector = '#slide-out-widget-area .off-canvas-menu-container li.menu-item-has-children > .ocm-dropdown-arrow';
					} else {
						$ocm_link_selector = 'body.material #slide-out-widget-area[class*="slide-out-from-right"] .off-canvas-menu-container li.menu-item-has-children > a, #slide-out-widget-area.fullscreen-split .off-canvas-menu-container li.menu-item-has-children > a';
					}

					var left_header_selector = '#header-outer[data-format="left-header"] nav li.menu-item-has-children > a';
					var lh_dropdown_func = ( window.nectarOptions && window.nectarOptions.left_header_dropdown_func ) ? window.nectarOptions.left_header_dropdown_func : 'default';
					if( lh_dropdown_func === 'separate-dropdown-parent-link' ) {
						left_header_selector = '#header-outer[data-format="left-header"] nav li.menu-item-has-children > a .sf-sub-indicator';
					}

					// Click event.
					$(left_header_selector + ', ' + $ocm_link_selector).on('click', function () {

						var $parentSelector = $(this).parent();
						if( lh_dropdown_func === 'separate-dropdown-parent-link' ) {
							$parentSelector = $(this).closest('.menu-item');
						}

						if ($parentSelector.hasClass('open-submenu')) {
							$parentSelector.find('.sub-menu').css({
								'max-height': '0'
							});
							$parentSelector.removeClass('open-submenu');
						} else {

							// Get max height.
							var $that = $(this);
							var $maxSubMenuHeight;

							$parentSelector
								.find('> .sub-menu')
								.addClass('no-trans');

							setTimeout(function () {

								$parentSelector.find('> .sub-menu').css({
									'max-height': 'none',
									'position': 'absolute',
									'visibility': 'hidden'
								});

								$maxSubMenuHeight = $parentSelector.find('> .sub-menu').height();

								$parentSelector
									.find('> .sub-menu')
									.removeClass('no-trans');

								$parentSelector.find('> .sub-menu').css({
									'max-height': '0',
									'position': 'relative',
									'visibility': 'visible'
								});

							}, 25);

							setTimeout(function () {

								// Reset Max Height.
								$that.closest('ul')
									.find('li.menu-item-has-children')
									.removeClass('open-submenu');

								$that.closest('ul').find('li.menu-item-has-children > .sub-menu').css({
									'max-height': '0'
								});

								$parentSelector.addClass('open-submenu');

								$parentSelector
									.find('> .sub-menu')
									.css('max-height', $maxSubMenuHeight);

								// Add height to open parents.
								if ($that.parents('ul').length > 0) {

									$that.parents('ul:not(.sf-menu)').each(function () {
										$(this).css('max-height');
										$(this).css('max-height', parseInt($(this).height() + parseInt($(this).css('padding-top')) * 2 + $maxSubMenuHeight) + 'px');
									});
								}


							}, 50);
						}

						return false;

					});

					// Start open for current page items.
					if($('#header-outer[data-format="left-header"] nav .sf-menu > .current-menu-ancestor.menu-item-has-children > ul > li.current-menu-item').length > 0) {

						if( lh_dropdown_func === 'separate-dropdown-parent-link' ) {
							$('#header-outer[data-format="left-header"] nav .sf-menu > .current-menu-ancestor.menu-item-has-children > a .sf-sub-indicator').trigger('click');
						} else {
							$('#header-outer[data-format="left-header"] nav .sf-menu > .current-menu-ancestor.menu-item-has-children > a').trigger('click');
						}

					}


				}








				/**
				* DLMenu - plugin used for submenus in off canvas menu.
				*
				* @since 6.0
				*/
				$.DLMenu = function (options, element) {
					this.$el = $(element);
					this._init(options);
				};

				// the options
				$.DLMenu.defaults = {
					// classes for the animation effects
					animationClasses: {
						classin: 'dl-animate-in-1',
						classout: 'dl-animate-out-1'
					},
					onLevelClick: function () {
						return false;
					},
					onLinkClick: function () {
						return false;
					}
				};

				$.DLMenu.prototype = {
					_init: function (options) {

						// options
						this.options = $.extend(true, {}, $.DLMenu.defaults, options);
						this._config();

						var animEndEventNames = {
							'WebkitAnimation': 'webkitAnimationEnd',
							'OAnimation': 'oAnimationEnd',
							'msAnimation': 'MSAnimationEnd',
							'animation': 'animationend'
						},
						transEndEventNames = {
							'WebkitTransition': 'webkitTransitionEnd',
							'MozTransition': 'transitionend',
							'OTransition': 'oTransitionEnd',
							'msTransition': 'MSTransitionEnd',
							'transition': 'transitionend'
						};
						// animation end event name
						this.animEndEventName = animEndEventNames['animation'] + '.menu';
						// transition end event name
						this.transEndEventName = transEndEventNames['transition'] + '.menu',
						// support for css animations and css transitions
						this.supportAnimations = true,
						this.supportTransitions = true;
						this._initEvents();

					},
					_config: function () {
						this.open 			= false;
						this.$trigger 	= this.$el.children('.trigger');
						this.$menu 			= this.$el.children('ul.menu');
						this.$menuitems = this.$menu.find('li:not(.back) > a');

						this.$el.find('ul.sub-menu')
							.prepend('<li class="back"><a href="#"> ' + $offCanvasEl.attr('data-back-txt') + ' </a></li>');

						this.$back = this.$menu.find('li.back');
					},
					_initEvents: function () {

						var self = this;

						this.$trigger.on('click.menu', function () {

							if (self.open) {
								self._closeMenu();
							} else {
								self._openMenu();
							}
							return false;

						});

						this.$menuitems.on('click.menu', function (event) {


							var $item = $(this).parent('li'),
							$submenu = $item.children('ul.sub-menu');

							$('.fullscreen-alt .off-canvas-menu-container .clip-wrap, .fullscreen-alt .off-canvas-menu-container .clip-wrap span').css('transition-duration', '0s');

							if ($submenu.length > 0) {

								var $flyin = $submenu.clone().css('opacity', 0).insertAfter(self.$menu),
								onAnimationEndFn = function () {
									self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classout).addClass('subview');
									$item.addClass('subviewopen').parents('.subviewopen:first').removeClass('subviewopen').addClass('subview');
									$flyin.remove();
									setTimeout(function () {
										$('.off-canvas-menu-container .menu > li').removeClass('no-pointer-events');
										$('.off-canvas-menu-container .clip-wrap, .off-canvas-menu-container .clip-wrap span').css('transition-duration', '.45s');
									}, 300);

								};

								setTimeout(function () {
									$flyin.addClass(self.options.animationClasses.classin);
									self.$menu.addClass(self.options.animationClasses.classout);
									if (self.supportAnimations) {
										self.$menu.on(self.animEndEventName, onAnimationEndFn);
									} else {
										onAnimationEndFn.call();
									}

									self.options.onLevelClick($item, $item.children('a:first').text());
								});


								$item.parents('.menu-wrap').css('height', $item.parents('.off-canvas-menu-container').find('.menuwrapper .menu').height()).transition({
									'height': $flyin.height()
								}, 500, 'easeInOutQuad');

								setTimeout(OCM_overflowState,600);

								return false;

							} else {

								self.options.onLinkClick($item.find('> a'), event);
							}

							OCM_close($item);

						});



						this.$back.on('click.menu', function () {

							var $this = $(this),
							$submenu 	= $this.parents('ul.sub-menu:first'),
							$item 		= $submenu.parent(),
							$flyin 		= $submenu.clone().insertAfter(self.$menu);

							var onAnimationEndFn = function () {
								self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classin);
								$flyin.remove();
							};

							setTimeout(function () {
								$flyin.addClass(self.options.animationClasses.classout);
								self.$menu.addClass(self.options.animationClasses.classin);
								if (self.supportAnimations) {
									self.$menu.on(self.animEndEventName, onAnimationEndFn);
								} else {
									onAnimationEndFn.call();
								}

								$item.removeClass('subviewopen');

								var $subview = $this.parents('.subview:first');
								if ($subview.is('li')) {
									$subview.addClass('subviewopen');
								}
								$subview.removeClass('subview');
							});



							setTimeout(function () {
								$item.parents('.menu-wrap').transition({
									'height': $item.parent().height()
								}, 500, 'easeInOutQuad');
								setTimeout(OCM_overflowState,600);
							}, 50);


							return false;

						});

					},
					closeMenu: function () {
						if (this.open) {
							this._closeMenu();
						}
					},
					_closeMenu: function () {
						var self = this,
						onTransitionEndFn = function () {
							self.$menu.off(self.transEndEventName);
							self._resetMenu();
						};

						this.$menu.removeClass('menuopen');
						this.$menu.addClass('menu-toggle');
						this.$trigger.removeClass('active');

						if (this.supportTransitions) {
							this.$menu.on(this.transEndEventName, onTransitionEndFn);
						} else {
							onTransitionEndFn.call();
						}

						this.open = false;
					},
					openMenu: function () {
						if (!this.open) {
							this._openMenu();
						}
					},
					_openMenu: function () {
						var self = this;
						$body.off('click').on('click.menu', function () {
							self._closeMenu();
						});
						this.$menu.addClass('menuopen menu-toggle').on(this.transEndEventName, function () {
							$(this).removeClass('menu-toggle');
						});
						this.$trigger.addClass('active');
						this.open = true;
					},
					_resetMenu: function () {
						this.$menu.removeClass('subview');
						this.$menuitems.removeClass('subview subviewopen');
					}
				};

				var logError = function (message) {
					if (window.console) {
						window.console.error(message);
					}
				};

				$.fn.dlmenu = function (options) {
					if (typeof options === 'string') {
						var args = Array.prototype.slice.call(arguments, 1);
						this.each(function () {
							var instance = $.data(this, 'menu');
							if (!instance) {
								logError("cannot call methods on menu prior to initialization; " +
								"attempted to call method '" + options + "'");
								return;
							}
							if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
								logError("no such method '" + options + "' for menu instance");
								return;
							}
							instance[options].apply(instance, args);
						});
					} else {
						this.each(function () {
							var instance = $.data(this, 'menu');
							if (instance) {
								instance._init();
							} else {
								instance = $.data(this, 'menu', new $.DLMenu(options, this));
							}
						});
					}
					return this;
				};


				/**
				* Initialize DL menu.
				*
				* @since 6.0
				*/
				function fullscreenMenuInit() {

					$('#slide-out-widget-area .off-canvas-menu-container .menu').wrap('<div class="menu-wrap menuwrapper" />');
					$('#slide-out-widget-area .off-canvas-menu-container .menu').addClass('menuopen');

					var $ocmAnimationClassNum = ($('#slide-out-widget-area.fullscreen-alt').length > 0) ? '4' : '5';
					$('#slide-out-widget-area .off-canvas-menu-container .menu-wrap').dlmenu({
						animationClasses: {
							classin: 'dl-animate-in-' + $ocmAnimationClassNum,
							classout: 'dl-animate-out-' + $ocmAnimationClassNum
						}
					});

				}









				/**
				* Set the page header height when using "slide down" theme option effect.
				*
				* @since 2.0
				*/
				function pageHeaderSlideInHeight() {

					var pageHeaderHeight = parseInt($pageHeaderBG.height());
					$('body[data-aie="slide-down"] #page-header-wrap:not(.fullscreen-header):not([data-responsive="true"])').css('height', pageHeaderHeight + 'px');

				}


				/**
				* Fired after page header image has loaded.
				*
				* @since 2.0
				*/
				function pageHeaderAfterLoad() {

					//fade in header
					if ($('#ajax-content-wrap').length == 0 || !$body.hasClass('ajax-loaded')) {
						$('#page-header-bg[data-parallax="1"]').animate({
							'opacity': 1
						}, 350, 'easeInCubic');
					} else if ($('#ajax-content-wrap').length == 1) {
						$('#page-header-bg[data-parallax="1"]').css({
							'opacity': 1
						});
					}

					$('#page-header-bg[data-parallax="1"] .nectar-particles').append('<div class="fade-out" />');

				}



				/**
				* Page header unload event.
				*
				* @since 2.0
				*/
				function pageHeaderUnload() {

					if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 || navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
						window.onunload = function () {

							pageHeaderInit();

							$('#page-header-bg[data-parallax="1"] .span_6').css({
								'opacity': 1
							});

						};
					}

				}


				/**
				* Page header initialization.
				*
				* @since 2.0
				*/
				function pageHeaderInit() {

					var pageHeaderState = {
						inView: true
					}

					var $pageHeaderInnerEl  = $('#page-header-bg .span_6 .inner-wrap');
					var $pageHeaderCanvasEl = $('#page-header-bg #canvas');

					if ($('#page-header-bg[data-parallax="1"]').length > 0) {

						// Fade in
						var img                = new Image(),
						pageHeaderHeight       = parseInt($pageHeaderBG.height()),
						headerSpaceHeight      = $('#header-space').height(),
						globalTopSectionHeight = ($('.nectar-global-section.after-nav').length > 0) ? $('.nectar-global-section.after-nav').height() : 0,
						$initialImgCheck       = extractUrl($('#page-header-bg[data-parallax="1"]').css('background-image'));

						if ($initialImgCheck && $initialImgCheck.indexOf('.') !== -1) {
							img.onload = function () {
								pageHeaderAfterLoad();
							};

							img.src = extractUrl($('#page-header-bg[data-parallax="1"]').css('background-image'));

						} else {
							pageHeaderAfterLoad();
						}


						if ($('body[data-hhun="1"]').length > 0 && !$('#header-outer[data-remove-fixed="1"]').length > 0) {
							$headerOuterEl.addClass('parallax-contained');
						}

						// Calculate on scroll.
						if( nectarDOMInfo.winW > 1000 ) {
							parallaxPageHeaderCalc();
						}
						window.addEventListener('scroll', function () {
							if( nectarDOMInfo.winW > 1000 ) {
								window.requestAnimationFrame(parallaxPageHeaderCalc);
							}
						}, false);

					}

					var $pt_timeout = ($('body[data-ajax-transitions="true"]').length > 0 && $('#page-header-bg[data-animate-in-effect="slide-down"]').length > 0) ? 350 : 0;

					if ($pageHeaderBG.length > 0) {

						// Slide in height effect.
						setTimeout(function () {
							pageHeaderSlideInHeight();
						}, $pt_timeout);

						$('#page-header-bg[data-animate-in-effect="fade-in"]').addClass('loaded');

						// Using bg classname.
						var $initialImgCheckAscend = extractUrl($pageHeaderBG.css('background-image'));
						if ($initialImgCheckAscend && $initialImgCheckAscend.indexOf('.') !== -1) {
							$pageHeaderBG.addClass('has-bg');
						}

						// Resize slide in height.
						$window.on('smartresize',pageHeaderSlideInHeight);

					}


					function parallaxPageHeaderCalc() {

						var $multiplier = 0.15;

						if (nectarDOMInfo.winW >= 1000 &&
						navigator.userAgent.match(/iPad/i) == null &&
						nectarState.materialOffCanvasOpen != true ) {

							// Calc parallax.
							if (pageHeaderState.inView == true) {

								$pageHeaderInnerEl.css({
									'transform': 'translateY(' + nectarDOMInfo.scrollTop * $multiplier + 'px)',
									'opacity': 1 - (nectarDOMInfo.scrollTop / ((globalTopSectionHeight + pageHeaderHeight)*.7))
								});

								if( $pageHeaderCanvasEl ) {
									$pageHeaderCanvasEl.css({
										'transform': 'translateY(' + nectarDOMInfo.scrollTop * $multiplier*2 + 'px)'
									});
								}

							}

							// Hide elements to allow other parallax sections to work in webkit browsers.
							if ((nectarDOMInfo.scrollTop / (pageHeaderHeight + headerSpaceHeight + nectarDOMInfo.adminBarHeight)) > 1) {
								pageHeaderState.inView = false;
								$('.nectar-particles, #page-header-bg .fade-out').css('visibility', 'hidden').addClass('out-of-sight');
								$('#page-header-bg').addClass('out-of-sight');
							}
							else {
								pageHeaderState.inView = true;
								$('#page-header-bg, .nectar-particles, #page-header-bg .fade-out').css('visibility', 'visible').removeClass('out-of-sight');
							}

						}

					}

					if ($pageHeaderBG.length > 0) {

						// Bind unload event
						pageHeaderUnload();

						// Initialize text effects.
						if( $('.nectar-box-roll').length == 0 ) {
							pageHeaderTextEffectInit();
						}

					}

				}







				/**
				* Page header text effect markup creation.
				*
				* @since 6.0
				*/
				function pageHeaderTextEffectMarkup() {

					$pageHeaderBG.each(function () {

						if ($(this).attr('data-text-effect') == 'rotate_in') {

							var $topHeading = 'none';

							if ($(this).find('.span_6 h1').length > 0) {
								$topHeading = 'h1';
							}

							if ($topHeading != 'none') {

								var $selector = ($(this).find('.nectar-particles').length > 0) ? '.inner-wrap.shape-1' : '.span_6';

								$(this).find($selector).find($topHeading).addClass('top-heading').contents().filter(function () {
									return this.nodeType === 3 && typeof this.data != 'undefined' && this.data.replace(/\s+/, "");
								}).wrap('<span class="wraped"></span>');

								$(this).find($selector).find('.wraped').each(function () {

									var textNode  = $(this),
									text          = textNode.text().split(' '),
									replace       = '';

									$.each(text, function (index, value) {
										if (value.replace(/\s+/, "")) {
											replace += '<span class="wraped"><span>' + value + '</span></span> ';
										}
									});

									textNode.replaceWith($(replace));

								});

							}

						}

					});

				}


				/**
				* Page header text effect animation.
				*
				* @since 6.0
				*/
				function pageHeaderTextEffect() {

					if ($('#page-header-bg .nectar-particles').length == 0 && $('#page-header-bg[data-text-effect="none"]').length == 0 ||
					$('.nectar-box-roll').length > 0 && $('#page-header-bg .nectar-particles').length == 0) {

						var $selector = ($('.nectar-box-roll').length == 0) ? '#page-header-bg .span_6' : '.nectar-box-roll .overlaid-content .span_6';

						$($selector).find('.wraped').each(function (i) {
							$(this).find('span').delay(i * 370).transition({
								rotateX: '0',
								'opacity': 1,
								y: 0
							}, 400, 'easeOutQuad');
						});

						setTimeout(function () {

							$($selector).find('.inner-wrap > *:not(.top-heading)').each(function (i) {
								$(this).delay(i * 370).transition({
									rotateX: '0',
									'opacity': 1,
									y: 0
								}, 650, 'easeOutQuad');
							});

							$('.scroll-down-wrap, .scroll-down-wrap .section-down-arrow').removeClass('hidden');

						}, $($selector).find('.wraped').length * 370);
					}

				}


				/**
				* Page header text effect initialization.
				*
				* @since 6.0
				*/
				function pageHeaderTextEffectInit() {

					pageHeaderTextEffectMarkup();

					var $effectTimeout = ($loadingScreenEl.length > 0) ? 800 : 0;

					if ($('#page-header-bg .nectar-video-wrap video').length == 0) {
						setTimeout(pageHeaderTextEffect, $effectTimeout);
					}

				}







				/**
				* Permanent transparent header effect.
				*
				* @since 6.0
				*/
				function midnightInit() {

					if ($('#header-outer[data-permanent-transparent="1"]').length > 0 &&
					$('body[data-bg-header="true"]').length > 0) {


						// Pages that set no midnight coloring.
						if ($('.container-wrap div[data-midnight]').length == 0) {
							$('.container-wrap').attr('data-midnight', 'dark');
						}

						//// Cache midnight compat divs.
						var $midnightCompatArr = [];
						$('div[data-midnight]').each(function () {

							if ($(this).attr('data-midnight') == 'light' && $(this).parents('.pum-content').length == 0 ||
							$(this).attr('data-midnight') == 'dark' && $(this).parents('.pum-content').length == 0) {

								if( $(this).is('#page-header-bg') && $(this).parents('#page-header-wrap[data-midnight]').length > 0 ) {
									// skip.
								} else {
									$midnightCompatArr.push($(this));
								}

							}

						});


						if ($midnightCompatArr.length > 0) {

							$.each($midnightCompatArr, function (k, v) {

								if (v.attr('data-midnight') == 'light' || v.attr('data-midnight') == 'dark') {

									var $that     = v;
									var waypoint  = new Waypoint({
										element: $that,
										handler: function (direction) {


											if ($('body.material-ocm-open').length > 0 || $that.css('display') == 'none' ) {
												return;
											}


											var $textColor;

											if (direction == 'down') {
												$textColor = ($that.attr('data-midnight') == 'light') ? '' : 'dark-slide';
												$headerOuterEl.removeClass('dark-slide').addClass($textColor);

											} else {

												var $prevMidItem;

												if (k - 1 >= 0) {
													$prevMidItem = k - 1;
												} else {
													$prevMidItem = k;
												}

												$textColor = ($midnightCompatArr[$prevMidItem].attr('data-midnight') == 'light') ? '' : 'dark-slide';
												$headerOuterEl.removeClass('dark-slide').addClass($textColor);

											}

										},
										offset: $headerOuterEl.height()

									});

								}

							});

						}

					}


				}




				/**
				* Box roll header effect initialization.
				*
				* @since 6.0
				*/
				function nectarBoxRollInit() {
					if ($('.nectar-box-roll').length > 0 && typeof NectarBoxRoll !== 'undefined') {

						pageHeaderTextEffectInit();

						// listen for emits.
						$(window).on('nectar-box-roll-scroll-disabled', function() {
							nectarState.preventScroll = true;
						});
						$(window).on('nectar-box-roll-scroll-enabled', function() {
							nectarState.preventScroll = false;
						});

						nectarBoxRoll = new NectarBoxRoll(nectarDOMInfo, waypoints, midnightInit, pageLoadHash, resizeVideoToCover);

					}
				}




				/**
				* Create all waypoints.
				*
				* @since 6.0
				*/
				function waypoints() {
					rowBGAnimations();
					columnBGAnimations();
					colAndImgAnimations();
					progressBars();
					dividers();
					iconList();
					animatedTitles();
					highlightedText();
					imageWithHotspots();
					clientsFadeIn();
					splitLineHeadings();
					svgAnimations();
					milestoneInit();
					nectarFancyUlInit();
					owl_carousel_animate();
					headerRowColorInheritInit();
					morphingOutlines();
					animatedColBorders();
					wooProductCarouselAnimations();
					foodMenuItems();
					vcWaypoints();
					NectarPostGridWaypoint();
					nectarRotatingWordsInit();
				}



				/**
				* Salient page builder elements initialization.
				*
				* @since 10.5
				*/
				function salientPageBuilderElInit() {
					flexsliderInit();
					flickityLazyInit();
					setTimeout(flickityInit, 100);
					twentytwentyInit();
					standardCarouselInit();
					productCarouselInit();
					clientsCarouselInit();
					carouselfGrabbingClass();
					setTimeout(tabbedInit, 60);
					accordionInit();
					accordionClickEvents();
					largeIconHover();
					nectarIconMatchColoring();
					coloredButtons();
					ctaLinkBG();
					teamMemberFullscreen();
					flipBoxInit();
					owlCarouselInit();
					mouseParallaxInit();
					ulCheckmarks();
					nectarFancyUlIcons();
					nectarFancyBoxHover();
					nectarVideoLightbox();
					nectarKeyframeAssist();
					morphingOutlinesInit();
					nectarPostGridInit();
					cascadingImageInit();
					imageWithHotspotEvents();
					pricingTableHeight();
					pageSubmenuInit();
					nectarLiquidBGs();
					nectarTestimonialSliders();
					nectarTestimonialSlidersEvents();
					recentPostsTitleOnlyEqualHeight();
					recentPostsInit();
					parallaxItemHoverEffect();
					fsProjectSliderInit();
					postMouseEvents();
					masonryPortfolioInit();
					masonryBlogInit();
					portfolioCustomColoring();
					searchResultMasonryInit();
					stickySidebarInit();
					portfolioSidebarFollow();
					splitLineHeadingInit();
					var stickyEls = new NectarStickyEls();
				}




				/***************** WooCommerce *****************/

				/**
				* Woo filter toggle
				*
				* @since 13.0
				*/
				function NectarWooCommerceFilters() {

					this.$toggleBtn = $('.nectar-shop-filters .nectar-shop-filter-trigger');
					this.$sidebar = $('#sidebar');
					this.sidebarPos = (this.$sidebar.hasClass('col_last')) ? 'right' : 'left';

					this.state = {
						open: (this.getLS()) ? this.getLS() : 'true'
					};

					this.setup();
					this.events();
				}

				NectarWooCommerceFilters.prototype.events = function() {

					this.$toggleBtn.on('click', this.toggle.bind(this));
					this.$sidebar.find('.nectar-close-btn-wrap').on('click', this.mobileToggle.bind(this));
					$(window).on('smartresize', this.mobileToggleResize.bind(this));

				};

				NectarWooCommerceFilters.prototype.mobileToggleResize = function() {

					if( this.$sidebar.hasClass('open') && nectarDOMInfo.winW > 999 ) {
						this.$sidebar.removeClass('open');
						this.$sidebar.find('.nectar-close-btn-wrap').removeClass('open');
						$('.container-wrap').css('z-index','11');
					}

				};

				NectarWooCommerceFilters.prototype.mobileToggle = function() {

					if( this.$sidebar.hasClass('open') ) {
						this.$sidebar.removeClass('open');
						this.$sidebar.find('.nectar-close-btn-wrap').removeClass('open');
						$('.container-wrap').css('z-index','11');
					} else {
						$('.container-wrap').css('z-index','10000');
						this.$sidebar.addClass('open');
						this.$sidebar.find('.nectar-close-btn-wrap').addClass('open');
					}

					return false;

				};

				NectarWooCommerceFilters.prototype.toggle = function() {

					// Mobile.
					if( nectarDOMInfo.winW < 1000 ) {
						this.mobileToggle();
						return false;
					}

					var visibility = '';

					// Close.
					if( this.state.open == 'true' ) {

						// Handle state.
						this.state.open = 'false';
						visibility = 'false';

						// Layout change.
						this.$toggleBtn.find('.hide').hide();
						this.$toggleBtn.find('.show').show();

						this.$toggleBtn.find('.top-line, .bottom-line').css({
							'transform': 'translateX(0)'
						});

						if( this.sidebarPos == 'left' ) {
							this.$sidebar.css({
								'margin-right' : '-25%',
								'opacity': '0'
							});
						} else {
							this.$sidebar.css({
								'margin-left': '-25%',
								'opacity': '0'
							});
						}

						this.$sidebar.find('> .inner').css({
							'transform': (this.sidebarPos == 'left') ? 'translateX(-100%)' : 'translateX(100%)',
						});

					}
					// Open.
					else {

						// Handle state.
						this.state.open = 'true';
						visibility = 'true';

						// Layout change.
						this.$toggleBtn.find('.show').hide();
						this.$toggleBtn.find('.hide').show();

						this.$toggleBtn.find('.top-line').css({
							'transform': 'translateX(10px)'
						});
						this.$toggleBtn.find('.bottom-line').css({
							'transform': 'translateX(-10px)'
						});

						if( this.sidebarPos == 'left' ) {
							this.$sidebar.css({
								'margin-right' : '0',
								'opacity': '1'
							});
						} else {
							this.$sidebar.css({
								'margin-left' : '0',
								'opacity': '1'
							});
						}

						this.$sidebar.find('> .inner').css({
							'transform': 'translateX(0)'
						});

					}

					// Trigger event.
					setTimeout(function(){
						$(window).trigger('nectar-product-filters-layout');
					},425);


					// Store in LS.
					if( typeof(Storage) !== "undefined" ) {
						localStorage.setItem("nectar_product_filters_vis", visibility);
					}

					return false;

				};

				NectarWooCommerceFilters.prototype.setup = function() {

					// Start filters expanded on mobile.
					this.$sidebar.find('.widget.woocommerce')
					.addClass('open-filter')
					.find('ul')
					.css({
						'display':'block'
					});

					// Mobile active filters.
					if( $('.nectar-active-product-filters').length > 0 ) {
						var $filtersHTML = $('.nectar-active-product-filters').clone();
						this.$sidebar.find('> .inner').prepend($filtersHTML);
					}

				};

				NectarWooCommerceFilters.prototype.getLS = function() {

					if( typeof(Storage) !== "undefined" ) {
						return localStorage.getItem("nectar_product_filters_vis");
					}

					return null;

				};




				/**
				* Handle Woo quantity button functionality
				*
				* @since 13.0
				*/
				function wooQauntityBtns() {
					var quantityButtons = new NectarWooCommerceQuantity();
				}

				function NectarWooCommerceQuantity() {

					this.$qty = '';
					this.step = 1;
					this.ajaxTimeout = '';
					this.ajaxTimeoutDur = 500;

					this.state = {
						max: 100000,
						min: 0,
						currentVal: 1,
						key: 0,
						removeFlag: false
					};

					this.events();

				}

				NectarWooCommerceQuantity.prototype.updateState = function(el) {

					// Get key.
					var key = 0;

					if( true === this.checkMiniCart(this.$qty) ) {
						var matches = this.$qty.attr('name').match(/cart\[(\w+)\]/);
	          key = matches[1];
					}

					// Store current.
					var currentVal = parseFloat(this.$qty.val());

					if (!currentVal || currentVal === '' || currentVal === 'NaN') {
						currentVal = 0;
					}

					// Max/Min vals.
					var max = parseFloat(this.$qty.attr('max'));
					var min = parseFloat(this.$qty.attr('min'));

					if (max === '' || max === 'NaN' || isNaN(max) ) {
						max = '';
					}

					if (min === '' || min === 'NaN' || isNaN(min) ) {
						min = 0;
					}

					// Push to state.
					this.state = {
						currentVal: currentVal,
						max: max,
						min: min,
						key: key
					};

				};

				NectarWooCommerceQuantity.prototype.events = function() {

					var that = this;

					$('body').on('click', '.quantity .plus', function() {
						  that.$qty = $(this).closest('.quantity').find('.qty');
						  that.updateState();
							that.increment($(this));
					});

					$('body').on('click', '.quantity .minus', function() {
						  that.$qty = $(this).closest('.quantity').find('.qty');
						  that.updateState();
							that.decrement($(this));
					});

					$('body').on('keyup', '.woocommerce-mini-cart .quantity .qty', function(e) {
						that.$qty = $(this);

						that.updateState();

						// Max value.
						if( that.state.max && that.$qty.val() > that.state.max ) {
							that.$qty.val(that.state.max);
						}

						// Check if item should be removed.
						if (that.state.min && (that.state.min == that.state.currentVal || that.state.currentVal < that.state.min)) {
							that.state.removeFlag = true;
						}

						$(this).trigger('change');

					});

					$('body').on('change', '.woocommerce-mini-cart .quantity .qty', function(e) {

						if( !e.originalEvent && true === that.checkMiniCart(that.$qty) ) {
							that.updateCart(that.$qty.val());
						}

					});

				};

				NectarWooCommerceQuantity.prototype.increment = function() {

					if (this.state.max && (this.state.max == this.state.currentVal || this.state.currentVal > this.state.max)) {
						this.$qty.val(this.state.max);
					} else {
						this.$qty.val(this.state.currentVal + parseFloat(this.step));
					}

					this.$qty.trigger('change');

				};

				NectarWooCommerceQuantity.prototype.decrement = function() {

					if (this.state.min && (this.state.min == this.state.currentVal || this.state.currentVal < this.state.min)) {
						this.$qty.val(0);
						this.state.removeFlag = true;

					} else if (this.state.currentVal > 0) {
						this.$qty.val(this.state.currentVal - parseFloat(this.step));
					}

					this.$qty.trigger('change');

				};

				NectarWooCommerceQuantity.prototype.checkMiniCart = function(el) {
					return ( el.parents('.woocommerce-mini-cart').length > 0 ) ? true : false;
				};

				NectarWooCommerceQuantity.prototype.updateCart = function(val) {

					var that = this;

					// Debounce a little to prevent too many requests when clicking a lot
					clearTimeout(this.ajaxTimeout);

					this.ajaxTimeout = setTimeout(function() {

					  that.$qty.closest( '.widget_shopping_cart_content' ).addClass('loading');
						that.$qty.closest( '.woocommerce-mini-cart-item' ).addClass('blockUI').addClass('blockOverlay');

						$.ajax({
			          type: 'POST',
			          url: window.nectarLove.ajaxurl,
			          data: {
		              action: "nectar_minicart_update_quantity",
		              quantity: val,
		              item_key: that.state.key
			          },
			          cache: false,
			          success: function (response) {
									if( response ) {

										that.$qty.closest( '.widget_shopping_cart_content' ).removeClass('loading');
										that.$qty.closest( '.woocommerce-mini-cart-item' ).removeClass('blockUI').removeClass('blockOverlay');

										// Update subtotal.
										var $subtotal = that.$qty.closest( '.widget_shopping_cart_content' ).find('.woocommerce-mini-cart__total');
										$subtotal.find('.woocommerce-Price-amount').remove();
										$subtotal.append(response.subtotal);

										// Does the item need to be removed?
										if( that.state.removeFlag === true ) {
											that.$qty.closest( '.woocommerce-mini-cart-item' ).remove();
											that.state.removeFlag = false;
											$( document.body ).trigger( 'updated_wc_div' );
										}

										// Update cart count.
										if( $('#header-outer a.cart-contents .cart-wrap span').length > 0 ) {
											$('#header-outer a.cart-contents .cart-wrap span').text(response.item_count);
										}

									}


			          }

			      });

					}, this.ajaxTimeoutDur);

				};


				/**
				* WooCommerce Single Product AJAX Add to Cart.
				*
				* @since 13.0
				*/
				function NectarWooCommerceCartAJAX() {

					this.state = {
						processing: false,
						productID: false,
						type: 'regular'
					};

					this.events();
				}

				NectarWooCommerceCartAJAX.prototype.events = function() {
					$('body').on('submit', 'form.cart', this.addToCartAJAX.bind(this));
				};

				NectarWooCommerceCartAJAX.prototype.addNotices = function(notices) {

					var that = this;

					var $noticeParent = $('.nectar-slide-in-cart.style_slide_in_click .widget_shopping_cart_content')

					$.each(notices, function(k,item) {
						$noticeParent.prepend('<div class="nectar-notice">'+item.notice+'</div>');
					});

					// Remove.
					setTimeout(function(){
					  $noticeParent.find('.nectar-notice').slideUp(function(){
							$(this).remove();
						});
					},6000);

				};

				NectarWooCommerceCartAJAX.prototype.addToCartAJAX = function(e) {

					var that = this;

					var $wooForm = $(e.currentTarget);

					// External or redirect active.
					if( $wooForm.closest('.product').hasClass('product-type-external') || (wc_add_to_cart_params && wc_add_to_cart_params.cart_redirect_after_add === 'yes') ) {
						return;
					}

					e.preventDefault();

					// If already submitted
					if( that.state.processing == true ) {
						return;
					}

					that.state.processing = true;
					that.state.productID = false;

					// Store type
					that.state.type = 'regular';
					if( $wooForm.parents('.nectar-quick-view-box').length > 0 ) {
						that.state.type = 'quickview';
					}

					// Gather info to pass.
					var $parentProduct = $wooForm.closest('.product');
					var $addToCartBtn  = $wooForm.find('button.single_add_to_cart_button');
					var $formData      = $wooForm.serializeArray();
					var regID          = 0;

					// Try and get ID from parent.
					if( $parentProduct.is('[id*="product-"]') ) {
						regID = $parentProduct.attr('id').match(/\d+/);

						if(regID && regID[0]) {
							that.state.productID = regID[0];
						}
					}
					// Fallback to ID from submit.
					if( that.state.productID === false && $addToCartBtn.length > 0 ) {
						regID = $addToCartBtn.val().match(/\d+/);

						if(regID && regID[0]) {
							that.state.productID = regID[0];
						}
					}

					// No ID found, bail out.
					if( that.state.productID === false ) {
						console.log('Error: no product ID found.');
						return;
					}

					// Add Loading.
					if( that.state.type === 'quickview' ) {
						$addToCartBtn = $('.single_add_to_cart_button_wrap .single_add_to_cart_button');
					}

					$addToCartBtn.prepend('<div class="loading-wrap"><div class="loading" /></div></div>');
					setTimeout(function(){
						$addToCartBtn.addClass('processing');
					},50);

					// Must be formatted like this to use add-to-cart key for WooCommerce to trigger AJAX.
					$formData.push({
						name: 'action',
						value: 'nectar_ajax_add_to_cart'
					}, {
						name: 'add-to-cart',
						value: that.state.productID
					});

					$.ajax({
							type: 'POST',
							url: window.nectarLove.ajaxurl,
							data: $formData,
							cache: false,
							success: function (response) {

								setTimeout(function(){
									that.state.processing = false;
									$addToCartBtn.removeClass('processing');
									$addToCartBtn.find('.loading-wrap').remove();
								}, 300);

								if( response && response.fragments ) {

									// Update content.
									$('body').trigger( 'added_to_cart', [response.fragments, response.cart_hash] );

									// Check for/Output errors.
									if( response.notices && response.notices.length > 0 ) {
										setTimeout(function(){
											that.addNotices(response.notices);
										},100);
									}

									// Close quickview.
									if( that.state.type === 'quickview' ) {
										$('.nectar-quick-view-box .close').trigger('click');
									}

								}

							} // end success.

					}); // end ajax.

				};


				/**
				* WooCommerce events.
				*
				* @since 10.5
				*/
				function wooCommerceEvents() {

					var wooCartTimeout;

					// Notification.
					$body.on('click', '.product .add_to_cart_button', function () {

						var $productHeading = ($(this).parents('li').find('h2').length > 0) ? 'h2' : 'h3',
						productToAdd        = $(this).parents('li').find($productHeading).text();

						$('#header-outer .cart-notification span.item-name').html(productToAdd);

					});

					// Notification hover.
					$body.on('mouseenter', '#header-outer .cart-notification', function () {

						$(this).hide();

						$('#header-outer .widget_shopping_cart')
							.addClass('open')
							.stop(true, true)
							.show();

						$('#header-outer .cart_list')
							.stop(true, true)
							.show();

						clearTimeout(wooCartTimeout);

					});


					// Cart dropdown.
					var $headerCartSelector = '#header-outer .nectar-woo-cart';

					if ($($headerCartSelector).length > 0) {

						$($headerCartSelector).hoverIntent(function () {

							$('#header-outer .widget_shopping_cart')
								.addClass('open')
								.stop(true, true)
								.show();

							$('#header-outer .cart_list')
								.stop(true, true)
								.show();

							clearTimeout(wooCartTimeout);

							$('#header-outer .cart-notification').hide();

						});
					}


					$body.on('mouseleave', $headerCartSelector, function () {
						var $that = $(this);
						setTimeout(function () {
							if (!$that.is(':hover')) {
								$('#header-outer .widget_shopping_cart')
									.removeClass('open')
									.stop(true, true)
									.fadeOut(300);

								$('#header-outer .cart_list')
									.stop(true, true)
									.fadeOut(300);
							}
						}, 200);
					});

					if ($('#header-outer[data-cart="false"]').length == 0) {

						$body.on('added_to_cart', shopping_cart_dropdown_show);
						$body.on('added_to_cart', shopping_cart_dropdown);

					}

					function shopping_cart_dropdown() {

						if (!$('.widget_shopping_cart .widget_shopping_cart_content .cart_list .empty').length &&
						    $('.widget_shopping_cart .widget_shopping_cart_content .cart_list').length > 0) {

							$('.cart-menu-wrap').addClass('has_products');
							$('header#top nav > ul, #search-outer #search #close a, header#top .span_9 >.slide-out-widget-area-toggle').addClass('product_added');

							if (!$('.cart-menu-wrap').hasClass('static')) {
								$('.cart-menu-wrap, #mobile-cart-link').addClass('first-load');
							}


						}

					}


					function shopping_cart_dropdown_show(e) {

						clearTimeout(wooCartTimeout);

						if (!$('.widget_shopping_cart .widget_shopping_cart_content .cart_list .empty').length &&
						 	 $('.widget_shopping_cart .widget_shopping_cart_content .cart_list').length > 0 &&
							 typeof e.type != 'undefined') {

							// Standalone woocommerce add to cart buttons.
							if ($('#header-outer .cart-notification .item-name').length > 0 &&
							$('#header-outer .cart-notification .item-name').text().length == 0) {
								return;
							}

							// Before cart has slide in.
							if (!$('#header-outer .cart-menu-wrap').hasClass('has_products')) {

								setTimeout(function () {
									$('#header-outer .cart-notification').fadeIn(400);
								}, 400);

							} else if (!$('#header-outer .cart-notification').is(':visible')) {
								$('#header-outer .cart-notification').fadeIn(400);
							} else {
								$('#header-outer .cart-notification').show();
							}

							$('body #header-outer [data-cart-style="slide_in_click"] .cart-menu-wrap').trigger('click');


							wooCartTimeout = setTimeout(hideCart, 2700);

						}
					}

					function hideCart() {
						$('#header-outer .cart-notification').stop(true, true).fadeOut();
					}

					function checkForWooItems() {

						var checkForCartItems = setInterval(shopping_cart_dropdown, 250);
						setTimeout(function () {
							clearInterval(checkForCartItems);
						}, 4500);

					}


					if ($('#header-outer[data-cart="false"]').length == 0) {
						checkForWooItems();
					}

					function nectarAccountPageTabs() {

						// Not on account page.
						if ($('body.woocommerce-account #customer_login').length == 0) {
							return;
						}

						// Create HTML.
						$('.woocommerce-account .woocommerce > #customer_login').prepend('<div class="nectar-form-controls" />');

						$('.woocommerce-account .woocommerce > #customer_login > div:not(.nectar-form-controls)').each(function () {
							var $title = $(this).find('> h2').text();
							$('#customer_login .nectar-form-controls').append('<div class="control">' + $title + '</div>');
						});

						// Click event.
						$('.woocommerce-account .woocommerce > #customer_login .nectar-form-controls .control').on('click', function () {

							$('.woocommerce-account .woocommerce > #customer_login .nectar-form-controls .control').removeClass('active');
							$(this).addClass('active');

							var formIndex = $(this).index() + 1;
							$('#customer_login div[class*="u-column"]').hide();
							$('#customer_login div[class*="u-column"].col-' + formIndex).show();

							setTimeout(function () {
								$('#customer_login div[class*="u-column"]').removeClass('visible');
								$('#customer_login div[class*="u-column"].col-' + formIndex).addClass('visible');
							}, 30);

						});

						// Starting.
						$('.woocommerce-account .woocommerce > #customer_login .nectar-form-controls .control:nth-child(1)').trigger('click');

					}

					nectarAccountPageTabs();

					var bindTextOnHoverMobile = ( $('.products[data-rm-m-hover="1"]').length > 0 && nectarDOMInfo.usingMobileBrowser ) ? false : true;

					// Text on hover effect.
					if(bindTextOnHoverMobile) {
						$body.on('mouseover', '.text_on_hover .product-wrap, .text_on_hover > a:first-child', function () {
							$(this).parent().addClass('hovered');
						});

						$body.on('mouseout', '.text_on_hover .product-wrap, .text_on_hover > a:first-child', function () {
							$(this).parent().removeClass('hovered');
						});
					}


					// Material/fancy parallax hover effect zindex.
					if ($('.material.product').length > 0 ||
					$('.minimal.product').length > 0 ||
					$('.nectar-fancy-box[data-style="parallax_hover"]').length > 0 ||
					$('.nectar-category-grid[data-shadow-hover="yes"]').length > 0 ||
					$('.nectar-post-grid[data-shadow-hover="yes"]').length > 0) {

						var $productZindex = 101;

						$body.on('mouseenter', '.material.product, .nectar-fancy-box[data-style="parallax_hover"], .nectar-post-grid[data-shadow-hover="yes"] .nectar-post-grid-item, .nectar-category-grid[data-shadow-hover="yes"] .nectar-category-grid-item', function () {
							$productZindex++;
							$(this).css('z-index', $productZindex + 1);
						});

						$body.on('mouseleave', '.material.product, .nectar-fancy-box[data-style="parallax_hover"], .nectar-post-grid[data-shadow-hover="yes"] .nectar-post-grid-item, .nectar-category-grid[data-shadow-hover="yes"] .nectar-category-grid-item', function () {

							var $that = $(this);
							setTimeout(function () {
								if (!$that.is(':hover')) {
									$that.css('z-index', 100);
								}
							}, 350);
						});

						if( window.nectarOptions && window.nectarOptions.woo_minimal_product_effect && window.nectarOptions.woo_minimal_product_effect === 'default' ) {
							$body.on('mouseenter', '.minimal.product', function () {
								$productZindex++;
								$(this).css('z-index', $productZindex + 1);
							});

							$body.on('mouseleave', '.minimal.product', function () {

								var $that = $(this);
								setTimeout(function () {
									if (!$that.is(':hover')) {
										$that.css('z-index', 100);
									}
								}, 350);
							});
						}

						// Reset to stop zindex from getting too high.
						setInterval(function () {
							if ($('.nectar-fancy-box[data-style="parallax_hover"]:hover').length > 0 ||
							$('.minimal.product:hover').length > 0) {
								return;
							}

							$('.material.product:not(:hover), .minimal.product:not(:hover), .nectar-fancy-box[data-style="parallax_hover"]:not(:hover), .nectar-post-grid[data-shadow-hover="yes"] .nectar-post-grid-item:not(:hover), .nectar-category-grid[data-shadow-hover="yes"] .nectar-category-grid-item:not(:hover)').css('z-index', 100);
							$productZindex = 101;
						}, 10000);

					}

					function minimalProductHover() {

						// Add icons.
						$('.products .classic .product-wrap .add_to_cart_button').wrapInner('<span />');
						$('.products .classic .product-wrap .add_to_cart_button').prepend('<i class="normal icon-salient-cart"></i>');

						// Bind hover.
						var bindMobileHover = ( $('.products[data-rm-m-hover="1"]').length > 0 && nectarDOMInfo.usingMobileBrowser ) ? false : true;

						if( bindMobileHover && window.nectarOptions && window.nectarOptions.woo_minimal_product_effect && window.nectarOptions.woo_minimal_product_effect === 'default' ) {

								$body.on('mouseover', '.products .minimal.product', function () {
									minimalProductCalc($(this));
								});

								$body.on('mouseleave', '.products .minimal.product', function () {
									$(this).find('.background-color-expand').css({
										'transform': 'scale(1, 1) translateY(0) translateZ(0px)'
									});
								});

						}

						// Starting trigger mouse over.
						$('.products .minimal.product').each(function () {
							if ($(this).is(':hover')) {
								$(this).trigger('mouseover');
							}
						});

					}



					function minimalProductCalc(el) {

						var expansionAmtX = 40,
						expansionAmtY     = expansionAmtX,
						translateYAmt     = 0;

						var $item   = el,
						$itemWidth  = $item.width(),
						$itemHeight = $item.height(),
						$wChange    = (parseInt($itemWidth) + expansionAmtX) / parseInt($itemWidth),
						$hChange    = (parseInt($itemHeight) + expansionAmtY) / parseInt($itemHeight);

						$item.addClass('hover-bound');

						$item.find('.background-color-expand').css({
							'transform': 'scale(' + $wChange + ',' + $hChange + ') translateY('+translateYAmt+'px) translateZ(0px)'
						});

					}

					minimalProductHover();



					// Mobile widget filters.
					$('.woocommerce #sidebar .widget.woocommerce').each(function () {

						// Skip widgets without any titles.
						if ($(this).find('> h4').length == 0) {
							$(this).addClass('no-widget-title');
						}

					});

					$body.on('click', '#sidebar .widget.woocommerce:not(.widget_price_filter) h4', function () {

						if(window.nectarOptions && window.nectarOptions.woo_sidebar_toggles !== 'false') {

							if ($window.width() < 1000 ) {

								if ($(this).parent().is('.widget_product_tag_cloud')) {
									$(this).parent().find('> div').slideToggle();
								}
								if ($(this).parent().is('.woocommerce-widget-layered-nav') && $(this).parent().find('> .woocommerce-widget-layered-nav-dropdown').length > 0) {
									$(this).parent().find('> .woocommerce-widget-layered-nav-dropdown').slideToggle();
								}

								$(this).parent().find('> ul').slideToggle();

								$(this).parent().toggleClass('open-filter');
							}

						}

					});


					// Slide in cart event.
					$body.on('mouseenter', '#header-outer [data-cart-style="slide_in"] .cart-menu-wrap', openRightCartHover);

					$body.on('mouseenter', '.nectar-slide-in-cart', function () {
						$(this).addClass('mouse-accessed');
					});


					function openRightCartHover() {

						if ($('.nectar-slide-in-cart ul.cart_list li:not(.empty)').length > 0) {

							$('.nectar-slide-in-cart').addClass('open');
							$window.on('mousemove.rightCartOffsetCheck', closeCartCheck);

						}
					}

					function closeCartCheck(e) {

						var $windowWidth = $window.width();
						if (e.clientX < $windowWidth - 370 - $bodyBorderWidth && $('.nectar-slide-in-cart').hasClass('mouse-accessed')) {

							$window.off('mousemove.rightCartOffsetCheck', closeCartCheck);

							$('.nectar-slide-in-cart').removeClass('open').removeClass('mouse-accessed');

						}

					}

					// Slide in click cart.
					var wooBgOverlayTimeout;

					$body.on('click', '#header-outer [data-cart-style="slide_in_click"] .cart-menu-wrap, #mobile-cart-link[data-cart-style="slide_in_click"]', openRightCart);

					function openRightCart() {
						if( $body.is('.woocommerce-checkout') || $body.is('.woocommerce-cart') ) {
							return true;
						}

						$('.nectar-slide-in-cart, .nectar-slide-in-cart-bg').addClass('open');
						$('.nectar-slide-in-cart-bg').addClass('revealed');
						clearTimeout(wooBgOverlayTimeout);

						// YITH ajax filters compat.
						$('.style_slide_in_click div.quantity').each(function(){
							if( $(this).find('.minus').length > 1 ) {
								$(this).find('.minus').first().remove();
							}
							if( $(this).find('.plus').length > 1 ) {
								$(this).find('.plus').first().remove();
							}
						});

						return false;
					}

					$body.on('click', '.nectar-slide-in-cart.style_slide_in_click .close-cart, .nectar-slide-in-cart-bg', closeRightCart);

					function closeRightCart() {

						$('.nectar-slide-in-cart, .nectar-slide-in-cart-bg').removeClass('open');

						wooBgOverlayTimeout = setTimeout(function() {
							$('.nectar-slide-in-cart-bg').removeClass('revealed');
						},400);

						return false;
					}

					// Add quantity functionality.
					wooQauntityBtns();

					// AJAX add to cart.
					if( window.nectarOptions && window.nectarOptions.ajax_add_to_cart === '1' ) {
						var ajaxAddToCart = new NectarWooCommerceCartAJAX();
					}

					if( window.nectarOptions && window.nectarOptions.woo_product_filter_toggle === '1' && $body.is('.archive.woocommerce') ) {
						var nectarProductFilters = new NectarWooCommerceFilters();
					}

					// Third party.
					// YITH Ajax filters.
					$(document).on( 'yith-wcan-ajax-filtered', nectarLazyImageLoading );


				}



				/**
				 * Modern quick search.
				 *
				 * @since 13.0
				 */
				function NectarQuickSearch() {

					this.$el        = $('#search-outer #search .container #s');
					this.$container = '';
					this.$parent    = '';
					this.$searchEl  = $('#search-outer');
					this.request    = '';
					this.timeout    = '';
					this.setup();
					this.events();

					this.state = {
						requesting: false,
						open: false,
						prevResults: ''
					}

					this.minChars = 2;

				}


				NectarQuickSearch.prototype.setup = function() {

					this.$container = $('<div class="inner"></div>');
					$('#search-outer').append($('<div class="nectar-ajax-search-results"><div class="container"></div></div>'));
					this.$parent = $('#search-outer .nectar-ajax-search-results');
					$('#search-outer .nectar-ajax-search-results .container').append(this.$container);

				};

				NectarQuickSearch.prototype.events = function() {

					var that = this;

					this.throttled = throttle(this.getResults.bind(this),350);
					this.$el.on('keyup', this.keyHandle.bind(this) );

					$(window).on('resize', this.resize.bind(this));
					$(window).on('nectar-search-close', function() {
						that.resetHeight();
						that.requestCheck();
					});

				};

				NectarQuickSearch.prototype.keyHandle = function(e) {

					// Verify Key.
					var keysToSkip = [16,91,32,37,39,17];

					if( keysToSkip.indexOf(e.keyCode) != -1 ) {
						return;
					}

				  this.throttled();
					this.debouncedSearch();

				};

				NectarQuickSearch.prototype.debouncedSearch = function() {

					var that = this;

					clearTimeout(this.timeout);
					this.timeout = setTimeout(function(){
						if(that.state.requesting) {
							return;
						}
						that.getResults();
					},400);

				};


				NectarQuickSearch.prototype.resize = function() {

					this.$parent.css({
						'max-height': ''
					});

					if( this.state.open === true ) {
						this.$parent.css({
							'max-height': parseInt(this.$container.outerHeight()) + 'px'
						});
					}

				};

				NectarQuickSearch.prototype.resetHeight = function() {

					var that = this;

					this.$parent.css({
						'max-height': ''
					});

					setTimeout(function(){
						$headerOuterEl.removeClass('results-shown');
					},400);

					this.state.prevResults = '';
					this.state.open = false;
				};


				NectarQuickSearch.prototype.requestCheck = function() {

					if( this.state.requesting === true ) {
						this.request.abort();
						this.state.requesting = false;
					}

				};

				NectarQuickSearch.prototype.getResults = function() {

					var that = this;
					var val = this.$el.val();

					// Deleted all chars / too few chars.
					if( val.length == 0 || val.length < this.minChars ) {
						$headerOuterEl.removeClass('results-shown');
						this.requestCheck();
						this.resetHeight();
						return;
					}

					this.request = $.ajax({
							type: 'POST',
							url: window.nectarLove.ajaxurl,
							data: {
								action: "nectar_ajax_ext_search_results",
								search: val
							},
							cache: false,
							success: function (response) {

								that.state.requesting = false;

								// No results.
								if( !response ) {
									that.resetHeight();
								}

								if( response && response.content && response.content !== that.state.prevResults && that.$searchEl.hasClass('material-open') ) {

									that.$container.html(response.content);

								  that.$parent.css({
										'max-height': parseInt(that.$container.outerHeight()) + 'px'
									});

									setTimeout(function(){
										$headerOuterEl.addClass('results-shown');
									},200);

									// Desktop animation
									if( nectarDOMInfo.winW >= 1000 && !$headerOuterEl.hasClass('results-shown') ) {

										that.$container.find('.product, .search-post-item').css({
											'opacity': '0',
											'transform': 'translateY(25px)',
											'transition': 'none'
										});

										setTimeout(function(){
											that.$container.find('.product, .search-post-item').css({
												'transition': 'box-shadow 0.25s ease, opacity 0.55s cubic-bezier(0.2, 0.6, 0.4, 1), transform 0.55s cubic-bezier(0.2, 0.6, 0.4, 1)'
											});
										},50);


										that.$container.find('.product, .search-post-item').each(function(i) {
											var $that = $(this);
											setTimeout(function(){
												$that.css({
													'opacity': '1',
													'transform': 'translateY(0)'
												})
											}, 50 + (i*60));
										});

									}

									that.state.open = true;
									that.state.prevResults = response.content;

								}

							}

					});

					this.state.requesting = true;

				};


				/**
		     * Search in navigation functionality.
		     *
		     * @since 10.5
		     */

				function navigationSearchInit() {

					// Init quick search.
					var quickSearch = false;
					if( window.nectarOptions && window.nectarOptions.quick_search && window.nectarOptions.quick_search === 'true' ) {
						quickSearch = new NectarQuickSearch();
					}

					var $placeholder = ($('#search-outer #search input[type=text][data-placeholder]').length > 0) ? $('#search-outer #search input[type=text]').attr('data-placeholder') : '';

					// Material skin add search BG markup.
					if ($body.hasClass('material') && $('#header-outer .bg-color-stripe').length == 0) {
						$headerOuterEl.append('<div class="bg-color-stripe" />');
					}

					// Prevent jumping on click.
					$body.on('click', '#search-btn a', function () {
						return false;
					});

					// Open search on mouseup.
					$body.on('click', '#search-btn a:not(.inactive), #header-outer .mobile-search', function () {

						if ($(this).hasClass('open-search')) {
							return false;
						}

						// Close menu on original skin.
						if( $body.hasClass('original') &&	$('.slide-out-widget-area-toggle.mobile-icon a.open').length > 0 ) {
							$('.slide-out-widget-area-toggle.mobile-icon a')
								.addClass('non-human-allowed')
								.trigger('click');

								setTimeout(function () {
										$('.slide-out-widget-area-toggle.mobile-icon a').removeClass('non-human-allowed');
								}, 100);
						}

						if ($body.hasClass('ascend') ||
						$('body[data-header-format="left-header"]').length > 0 && $('body.material').length == 0) {

							// Ascend theme skin.
							$('#search-outer > #search form, #search-outer #search .span_12 span, #search-outer #search #close').css('opacity', 0);

							$('#search-outer > #search form').css('transform', 'translateY(-30px)');
							$('#search-outer #search .span_12 span').css('transform', 'translateY(20px)');

							$('#search-outer').show();
							$('#search-outer').stop().transition({
								scale: '1,0',
								'opacity': 1
							}, 0).transition({
								scale: '1,1'
							}, 700, 'cubic-bezier(0.2, 1, 0.3, 1)');

							$('#search-outer > #search form').delay(350).transition({
								'opacity': 1,
								'transform': 'translateY(0)'
							}, 700, 'cubic-bezier(0.2, 1, 0.3, 1)');

							$('#search-outer #search #close').delay(500).transition({
								'opacity': 1
							}, 700, 'cubic-bezier(0.2, 1, 0.3, 1)');


							$('#search-outer #search .span_12 span').delay(450).transition({
								'opacity': 1,
								'transform': 'translateY(0)'
							}, 700, 'cubic-bezier(0.2, 1, 0.3, 1)');

						}

						else if (!$body.hasClass('material')) {
							// Original theme skin.
							$('#search-outer').stop(true).fadeIn(600, 'easeOutExpo');
						}
						else {

							// Material theme skin.
							$('#header-outer[data-transparent-header="true"] .bg-color-stripe').css('transition', '');
							$('#search-outer, #ajax-content-wrap').addClass('material-open');
							nectarState.materialSearchOpen = true;
							$headerOuterEl.addClass('material-search-open');
							$('#fp-nav').addClass('material-ocm-open');

							$(window).trigger('nectar-search-open');

						}


						setTimeout(function () {

							$('#search input[type=text]').trigger('focus');

							if ($('#search input[type=text]').val() == $placeholder) {
								$('#search input[type=text]').setCursorPosition(0);
							}

						}, 300);


						$(this).toggleClass('open-search');

						// Close slide out widget area.
						$('.slide-out-widget-area-toggle a:not(#toggle-nav).open:not(.animating)').trigger('click');

						return false;

					});

					// Handle the placeholder value.
					$('body:not(.material)').on('keydown', '#search input[type=text]', function () {
						if ($(this).val() == $placeholder) {
							$(this).val('');
						}
					});

					$('body:not(.material)').on('keyup', '#search input[type=text]', function () {
						if ($(this).val().length == 0 ) {
							$(this).val($placeholder);
							$(this).setCursorPosition(0);
						}
					});


					// Close search btn event.
					$body.on('click', '#close', function () {
						closeSearch();
						$searchButtonEl.removeClass('open-search');
						$('#header-outer .mobile-search').removeClass('open-search');
						return false;
					});

					// Original and Ascend skin close search when clicking off.
					$('body:not(.material)').on('blur', '#search-box input[type=text]', function () {
						closeSearch();
						$searchButtonEl.removeClass('open-search');
						$('#header-outer .mobile-search').removeClass('open-search');
					});


					// Material skin close when clicking off the search.
					$('body.material').on('click', '#ajax-content-wrap', function (e) {
						if (e.originalEvent !== undefined) {
							closeSearch();
							$searchButtonEl.removeClass('open-search');
							$('#header-outer .mobile-search').removeClass('open-search');

						}
					});

					// Material skin close on esc button event.
					if ($('body.material').length > 0) {
						$(document).on('keyup', function (e) {

							if (e.keyCode == 27) {
								closeSearch();
								$searchButtonEl.removeClass('open-search');

								// Close ocm material
								if ($('.ocm-effect-wrap.material-ocm-open').length > 0) {
									$('.slide-out-widget-area-toggle.material-open a').trigger('click');
								}
							}

						});
					}



					// Called to hide the search bar.
					function closeSearch() {

						if ($body.hasClass('ascend') || $('body[data-header-format="left-header"]').length > 0 && $('body.material').length == 0) {
							$('#search-outer').stop().transition({
								'opacity': 0
							}, 300, 'cubic-bezier(0.2, 1, 0.3, 1)');
							$searchButtonEl.addClass('inactive');
							setTimeout(function () {
								$('#search-outer').hide();
								$searchButtonEl.removeClass('inactive');
							}, 300);
						} else if ($('body.material').length == 0) {
							$('#search-outer').stop(true).fadeOut(450, 'easeOutExpo');
						}

						if ($body.hasClass('material')) {

							$(window).trigger('nectar-search-close');

							var closeTimeoutDur = ($headerOuterEl.hasClass('results-shown')) ? 800 : 400;
							setTimeout(function(){
								$('#search-outer #s').val('');
							},closeTimeoutDur);

							$('#ajax-content-wrap').removeClass('material-open');
							nectarState.materialSearchOpen = false;
							$headerOuterEl.removeClass('material-search-open');
							$('#search-outer').removeClass('material-open');
							$('#fp-nav').removeClass('material-ocm-open');
						}

					}

				}






				/**
				 * Header layout "Centered header bottom bar" functionality.
				 *
				 * @since 9.0
				 */
				function centeredNavBottomBarReposition() {

					var $headerOuter      = $headerOuterEl,
					$headerSpan9          = $('#header-outer[data-format="centered-menu-bottom-bar"] header#top .span_9'),
					$headerSpan3          = $('#header-outer[data-format="centered-menu-bottom-bar"] header#top .span_3'),
					$secondaryHeader      = $headerSecondaryEl,
					$headerBtns           = $headerSpan3.find('nav >ul.buttons'),
					$navLogoMargin        = parseInt($('body.material #header-outer').attr('data-padding')),
					$navLogoHeight        = parseInt($('body.material #header-outer').attr('data-logo-height')),
					$separatorExtra       = parseInt($headerSpan3.css('margin-bottom')),
					$triggerCondition     = $navLogoMargin + $separatorExtra + $navLogoHeight + parseInt(nectarDOMInfo.secondaryHeaderHeight);

					if ($secondaryHeader.length > 0) {

						if ($('#header-outer[data-remove-fixed="1"]').length == 0 && $('#header-outer[data-condense="true"]').length > 0) {

							setTimeout(function () {
								if( $headerSecondaryEl.css('display') != 'none' ) {
									nectarDOMInfo.secondaryHeaderHeight = $headerSecondaryEl.outerHeight();
								}

							}, 50);
						}

					}

					// Helper to determine if custom mobile breakpoint is active.
					function condenseCustomBreakPointHelper() {

						var $withinCustomBreakpoint = mobileBreakPointCheck();

						// Adding class to prevent logo from hiding when opening OCM
						if ( $withinCustomBreakpoint ) {
							$headerOuterEl.addClass('within-custom-breakpoint');
						} else {
							$headerOuterEl.removeClass('within-custom-breakpoint');
						}
					}


					// Bind events if "Condense Header On Scroll" effect is enabled.
					if ($('#header-outer[data-condense="true"]').length > 0) {

						$window.on('scroll.centeredNavCondense', centeredNavBottomFixed_Scroll);
						$window.trigger('scroll');

						$window.on('resize', function(){
							if(nectarDOMInfo.winW < 1000 || mobileBreakPointCheck() ) {
								$headerOuter.addClass('force-condense-remove');
								$window.off('scroll.centeredNavCondense');
							}
						});

						$window.on('smartresize', function() {

							condenseCustomBreakPointHelper();

							if(nectarDOMInfo.winW >= 1000 && false == mobileBreakPointCheck() ) {

								// Coming from mobile.
								if($headerOuter.hasClass('force-condense-remove')) {

									// Remove condense effect.
									centeredNavBottomFixed_Scroll();
									$headerOuter.removeClass('force-condense-remove');

									// See if the condense effect needs to be reapplied.
									setTimeout(function() {

										if(nectarDOMInfo.scrollTop >= $triggerCondition) {
											$headerOuter.addClass('force-condense');
											centeredNavBottomFixed_Scroll();
											$headerOuter.removeClass('force-condense');
										}
										// Bind scroll event.
										$window.on('scroll.centeredNavCondense', centeredNavBottomFixed_Scroll);
									},200);

								}
							}

						});

						condenseCustomBreakPointHelper();

					}



					function centeredNavBottomFixed_Scroll() {

						// Bypass calculating.
						if (nectarDOMInfo.winW < 1000 ||
							$('body.page-template-template-no-header').length > 0 ||
							$('body.page-template-template-no-header-footer').length > 0 ||
							$('body.material-ocm-open').length > 0 ||
							$('#header-outer[data-has-menu="true"][data-format="centered-menu-bottom-bar"] .span_9').css('display') == 'none' ||
						  $('#header-outer[data-has-menu="true"][data-format="centered-menu-bottom-bar"] .span_9 > nav').css('display') == 'none') {
							return;
						}

						$bodyBorderTop = ($bodyBorderTop.length > 0 && nectarDOMInfo.secondaryHeaderHeight > 0) ? $bodyBorderTop.height() : 0;

						// Add condense effect.
						if ($headerOuter.hasClass('force-condense') || !$headerOuter.hasClass('fixed-menu') && nectarDOMInfo.scrollTop >= $triggerCondition) {

							var amountToMove = (parseInt($headerSpan9.position().top) - $navLogoMargin - parseInt(nectarDOMInfo.adminBarHeight)) + parseInt(nectarDOMInfo.secondaryHeaderHeight) - $bodyBorderTop;

							// Megamenu removes transparency option
							if ($('#header-outer[data-megamenu-rt="1"]').length > 0 && $('#header-outer .megamenu').length > 0 && $('#header-outer[data-transparent-header="true"]').length > 0) {
								$headerOuterEl.removeClass('no-transition');
							}

							$headerOuter.addClass('fixed-menu').removeClass('transparent').css({
								'top': '-' + amountToMove + 'px',
								'position': 'fixed'
							});

							if( !$headerOuter.is('[data-menu-bottom-bar-align="left"]') ) {

								var $headerNavBarOffset  = ($('header#top .span_9 nav > ul').length > 0) ? $('header#top .span_9 nav > ul').offset().top : 0;
								var $headerButtonsOffset = ($headerBtns.find('li:first-child > *').length > 0) ? $headerBtns.find('li:first-child > *').offset().top : 0;
								var $headerButtonsHeight = ($headerSpan9.find('.sf-menu > li > a').length > 0) ? (20 - parseInt($headerSpan9.find('.sf-menu > li > a').height())) / 2 : 2;

								$headerBtns.css('transform', 'translateY(' + Math.ceil(parseInt($headerNavBarOffset) - parseInt($headerButtonsOffset) - $headerButtonsHeight) + 'px)');
								$headerBtns.find('.nectar-woo-cart').css('height', $headerOuter.height() + parseInt($headerOuter.css('top')) - parseInt(nectarDOMInfo.adminBarHeight));
							}

						}

						// Remove condense effect.
						else if ($headerOuter.hasClass('force-condense-remove') || $headerOuter.hasClass('fixed-menu') && nectarDOMInfo.scrollTop < $triggerCondition ) {

							$headerOuter.removeClass('fixed-menu').css({
								'top': '0',
								'position': 'absolute'
							});

							$headerBtns.css('transform', 'translateY(0px)');
							$headerBtns.find('.nectar-woo-cart').css('height', '');

							if ($('#header-outer.transparent').length == 0) {

								if ($('#header-outer[data-megamenu-rt="1"]').length > 0 &&
								$('#header-outer .megamenu').length > 0) {
									$headerOuterEl.removeClass('no-transition');
								}

								if ($('#header-outer[data-megamenu-rt="1"]').length > 0 &&
								$('#header-outer[data-transparent-header="true"]').length > 0 &&
								$('#header-outer .megamenu').length > 0) {

									if ($headerOuterEl.attr('data-transparent-header') == 'true' &&
									$('.nectar-box-roll').length == 0 &&
									$('.megamenu.sfHover:not(.width-75):not(.width-50)').length == 0) {

										$headerOuterEl.addClass('transparent');
										$headerOuterEl.removeClass('no-transition');

									}
									else if ($headerOuterEl.attr('data-transparent-header') == 'true' &&
									$('.nectar-box-roll').length == 0 &&
									$('.megamenu.sfHover').length > 0) {

										$headerOuterEl.addClass('no-transition');
									}

								}

								else {
									if ($headerOuterEl.attr('data-transparent-header') == 'true' && $('.nectar-box-roll').length == 0) {
										$headerOuterEl.addClass('transparent');
									}
								}

							} // endif transparent header conditional.


						} // End Remove condense effect.

					} // End centeredNavBottomFixed_Scroll.



				}




				/**
				 * Header layout "Centered header bottom bar" initialization.
				 *
				 * @since 10.5
				 */
				function centeredNavBottomBarInit() {

					if ($('#header-outer[data-format="centered-menu-bottom-bar"]').length > 0) {
						centeredNavBottomBarReposition();
					}

				}





				/**
				* Header layout "Centered logo between menu".
				*
				* Splits the main navigation menu into two sections placed on each side of logo.
				*
				* @since 8.0
				*/
				function centeredLogoMargins() {

					if (nectarDOMInfo.winW > 1000) {

						var $navItemLength = $('#header-outer[data-format="centered-logo-between-menu"] #top nav > .sf-menu:not(.buttons) > li').length;

						if ($('#header-outer #social-in-menu').length > 0) {
							$navItemLength--;
						}

						var $centerLogoWidth,
						$extraMenuSpace;

						if ($('#header-outer #top .row .col.span_3 #logo img:visible').length == 0) {
							$centerLogoWidth = parseInt($('#header-outer #top .row .col.span_3').width());
						} else {
							$centerLogoWidth = parseInt($('#header-outer #top .row .col.span_3 img:visible').width());
						}

						if ($('#header-outer[data-lhe="animated_underline"]').length > 0) {
							$extraMenuSpace = parseInt($('header#top nav > ul > li:first-child > a').css('margin-right'));
						} else {
							$extraMenuSpace = parseInt($('header#top nav > ul > li:first-child > a').css('padding-right'));
						}

						if ($extraMenuSpace > 30) {
							$extraMenuSpace += 45;
						} else if ($extraMenuSpace > 20) {
							$extraMenuSpace += 40;
						} else {
							$extraMenuSpace += 30;
						}

						if (!$body.hasClass('rtl')) {
							$('#header-outer[data-format="centered-logo-between-menu"] #top nav > .sf-menu:not(.buttons) > li:nth-child(' + Math.floor($navItemLength / 2) + ')').css({
								'margin-right': ($centerLogoWidth + $extraMenuSpace) + 'px'
							}).addClass('menu-item-with-margin');
						} else {
							$('#header-outer[data-format="centered-logo-between-menu"] #top nav > .sf-menu:not(.buttons) > li:nth-child(' + Math.floor($navItemLength / 2) + ')').css({
								'margin-left': ($centerLogoWidth + $extraMenuSpace) + 'px'
							}).addClass('menu-item-with-margin');
						}

						var $leftMenuWidth 	= 0;
						var $rightMenuWidth = 0;

						$('#header-outer[data-format="centered-logo-between-menu"] #top nav > .sf-menu:not(.buttons) > li:not(#social-in-menu)').each(function (i) {
							if (i + 1 <= Math.floor($navItemLength / 2)) {
								$leftMenuWidth += $(this).width();
							} else {
								$rightMenuWidth += $(this).width();
							}

						});

						var $menuDiff = Math.abs($rightMenuWidth - $leftMenuWidth);

						if ($leftMenuWidth > $rightMenuWidth || ($body.hasClass('rtl') && $leftMenuWidth < $rightMenuWidth) ) {
							$('#header-outer #top .row > .col.span_9').css('padding-right', $menuDiff);
						} else {
							$('#header-outer #top .row > .col.span_9').css('padding-left', $menuDiff);
						}

						$('#header-outer[data-format="centered-logo-between-menu"] nav').css('visibility', 'visible');

					}

					else if ($('#header-outer[data-format="centered-logo-between-menu"]').length > 0 && nectarDOMInfo.winW < 1000) {
						$('#header-outer .row > .col.span_9').css({
							'padding-right': '0',
							'padding-left': '0'
						});
					}

				}


				/**
				* Header layout "Centered logo between menu" initialization.
				*
				* @since 10.5
				*/
				function centeredLogoHeaderInit() {

					if($('#header-outer[data-format="centered-logo-between-menu"]').length > 0) {

						if(!usingLogoImage) {
							centeredLogoMargins();
						}
						else if(usingLogoImage && $('#header-outer[data-format="centered-logo-between-menu"]').length > 0 && $('header#top #logo img:first[src]').length > 0) {

							//fadein img on load
							var tempLogoImg = new Image();
							tempLogoImg.src = $('header#top #logo img:first').attr('src');

							tempLogoImg.onload = function() {
								centeredLogoMargins();
							};

						}

						// Resize event.
						$window.on('smartresize', centeredLogoMargins);

					}

				}








				/**
				* Handle basic items before initializing effects.
				*
				* @since 10.5
				*/
				function headerNavPreInit() {

					// Deactivate hide header until needed effect on mobile.
					if (nectarDOMInfo.usingMobileBrowser && $('#header-outer[data-remove-fixed="1"]').length == 0) {
						$body.attr('data-hhun', '0');
					}

					// Page fullscreen rows does not need permanent transparent.
					if ($('#nectar_fullscreen_rows').length > 0) {
						($headerOuterEl.attr('data-permanent-transparent', 'false'));
					}

					// Set mobile header height.
					if (nectarDOMInfo.usingMobileBrowser && $('#header-outer[data-mobile-fixed="1"]').length > 0 &&
					$('#header-outer[data-transparent-header="true"]').length == 0) {
						$('#header-space').css('height', $headerOuterEl.outerHeight());
					}

				}






				/**
				* Hide header until needed.
				*
				* Used when "Header Hide Until Needed" is active.
				*
				* @since 10.5
				*/
				var hhunState = {
					timeoutQueued: false,
					visible: true
				}
				function hhunHeaderEffect() {

					var previousScroll  = 0, // previous scroll position
					menuOffset          = ( headerTransparent == false && $('#page-header-bg[data-parallax="1"]').length > 0 ) ? 200 : 60, // height of menu (once scroll passed it, menu is hidden)
					hideShowOffset      = 3, // scrolling value after which triggers hide/show menu
					stickyPageSubmenu   = ( $('.page-submenu[data-sticky="true"]').length > 0 ) ? true : false,
					bodyOffsetHeight    = document.body.offsetHeight;

					function getBodyHeight() {
						if( nectarDOMInfo.winW > 999 && nectarState.materialOffCanvasOpen != true ) {
							bodyOffsetHeight = document.body.offsetHeight;
						}
					}
					// Periodically update the body height.
					setInterval(getBodyHeight, 1500);

					// Called in RAF loop to calculate the header visibility.
					function hhunCalcs() {

						$headerOuterEl.addClass('detached');

						var currentScroll = nectarDOMInfo.scrollTop, // Gets current scroll position
						scrollDifference 	= Math.abs(currentScroll - previousScroll); // Calculates how fast user is scrolling

						// Stop scrolling while animated anchors / box roll
						if ( nectarState.animatedScrolling == true && $('#header-outer.detached').length > 0 || nectarState.preventScroll == true ) {

							if (nectarDOMInfo.winW > 999) {

								if (currentScroll > menuOffset) {

									// Remove transparent when clicking anchor from the top
									if( nectarState.animatedScrolling == true && headerTransparent == true && nectarState.permanentTransHeader == false ) {
										$headerOuterEl.removeClass('transparent').addClass('scrolling');
									}

									// Still keep scroll tracking to continue hiding menu.
									previousScroll = nectarDOMInfo.scrollTop;
									currentScroll = nectarDOMInfo.scrollTop;

								}

								requestAnimationFrame(hhunCalcs);
								return;
							}
						}

						// Stop when material ocm or material search is open
						if ( nectarState.materialOffCanvasOpen == true || nectarState.materialSearchOpen == true ) {
							if (nectarDOMInfo.winW > 999) {

								// Still handle transparency when scrolling with material search open.
								if( nectarState.materialSearchOpen == true && headerTransparent == true) {

									if( nectarState.permanentTransHeader == false && currentScroll > menuOffset ) {
										$headerOuterEl.removeClass('transparent').addClass('scrolling');
									} else {
										$headerOuterEl.addClass('transparent').removeClass('scrolling');
									}

								}

								requestAnimationFrame(hhunCalcs);
								return;
							}
						}

						// Stop on mobile if not using sticky option
						if (headerMobileFixed == false && nectarDOMInfo.winW < 1000) {
							$headerOuterEl.removeClass('detached').removeClass('scrolling');
							return;
						}


						if (!$headerOuterEl.hasClass('side-widget-open') && !$('#header-outer .slide-out-widget-area-toggle a').hasClass('animating')) {

							var heightToAdjust;

							// Remove transparent and body border margin
							if (currentScroll > 1) {

								// Handle secondary header
								if ($headerSecondaryEl.length > 0) {
									if (currentScroll > menuOffset) {
										$headerSecondaryEl.addClass('hide-up');
										$headerOuterEl.css('transform', 'translateY(-' + nectarDOMInfo.secondaryHeaderHeight + 'px)');
									} else {
										$headerSecondaryEl.removeClass('hide-up');
										$headerOuterEl.css('transform', '0px)');
									}
								}

							}

							// Scrolled past menu
							if (currentScroll > menuOffset) {

								// Handle transparency
								if ( nectarState.permanentTransHeader == false ) {

									if( hhunState.timeoutQueued == false ) {
										setTimeout(function() {
											$headerOuterEl.removeClass('transparent');
											$headerOuterEl.addClass('scrolling');
											hhunState.timeoutQueued = false;
										},400);
									}
									hhunState.timeoutQueued = true;

								}

								// Scrolled past detach point add class to fix menu
								if (!$headerOuterEl.hasClass('detached')) {

									$headerOuterEl
										.addClass('detached')
										.removeClass('parallax-contained');
								}

								$headerOuterEl.removeClass('no-transition');


								// Scrolling faster than hideShowOffset hide/show menu
								if (scrollDifference >= hideShowOffset) {

									if (currentScroll > previousScroll) {

										// Hide menu
										if (!$headerOuterEl.hasClass('invisible')) {

											$headerOuterEl
												.addClass('invisible')
												.removeClass('at-top');

											// Close submenus
											if ($(".sf-menu").length > 0 && $().superfish) {
												$(".sf-menu").superfish('hide');
												$('header#top nav > ul.sf-menu > li.menu-item-over').removeClass('menu-item-over');
											}

										}

										if( stickyPageSubmenu == true ) {
											$('.page-submenu.stuck')
												.css('transform', 'translateY(0px)')
												.addClass('header-not-visible');
										}

									} else {

										// Show menu
										if ($headerOuterEl.hasClass('invisible')) {
											$headerOuterEl.removeClass('invisible');
										}

										// Page submenu adjust
										if( stickyPageSubmenu == true ) {

											heightToAdjust = $headerOuterEl.outerHeight();

											if( $headerSecondaryEl.length > 0) {
												heightToAdjust -=	nectarDOMInfo.secondaryHeaderHeight;
											}

											if ($bodyBorderTop.length > 0 && $('body.mobile').length == 0) {

												$bodyBorderSizeToRemove = ($bodyBorderHeaderColorMatch) ? $bodyBorderTop.height() : 0;

												$('.page-submenu.stuck')
													.css('transform', 'translateY(' + (heightToAdjust - $bodyBorderSizeToRemove) + 'px)')
													.removeClass('header-not-visible');

											} else {
												$('.page-submenu.stuck')
													.css('transform', 'translateY(' + heightToAdjust + 'px)')
													.removeClass('header-not-visible');
											}

										} // End sticky page sub conditional.

									}

								}

							}
							else {
								// At top of document.
								var $topDetachNum = ($('#header-outer[data-using-secondary="1"]').length > 0) ? 32 : 0;
								if ($bodyBorderTop.length > 0) {
									$topDetachNum = ($('#header-outer[data-using-secondary="1"]').length > 0) ? 32 + $bodyBorderTop.height() : $bodyBorderTop.height();
								}

								if (currentScroll <= $topDetachNum) {

									$headerOuterEl
										.addClass('at-top')
										.removeClass('invisible')
										.removeClass('scrolling');

									// Megamenu removes transparent.
									if ($('#header-outer[data-megamenu-rt="1"]').length > 0 &&
											headerTransparent == true &&
											$('#header-outer .megamenu').length > 0) {

											if ($('.nectar-box-roll').length == 0 &&
											$('.megamenu.sfHover:not(.width-75):not(.width-50)').length == 0) {

												$headerOuterEl
													.addClass('transparent')
													.css('transform', 'translateY(0)')
													.removeClass('no-transition');

											} else if ($('.nectar-box-roll').length > 0) {

												$headerOuterEl
													.css('transform', 'translateY(0)')
													.addClass('at-top-before-box');
											}

									} else {

										if (headerTransparent == true &&
										$('.nectar-box-roll').length == 0) {

											$headerOuterEl
												.addClass('transparent')
												.css('transform', 'translateY(0)');

										} else if ($('.nectar-box-roll').length > 0) {

											$headerOuterEl
												.css('transform', 'translateY(0)')
												.addClass('at-top-before-box');
										}
									}

									if ($('#page-header-bg[data-parallax="1"]').length > 0) {

										$headerOuterEl
											.addClass('parallax-contained')
											.css('transform', 'translateY(0)');
									}

								}

							}

							// At the bottom of document - show menu
							if ((nectarDOMInfo.winH + nectarDOMInfo.scrollTop) >= bodyOffsetHeight) {

								$headerOuterEl.removeClass('invisible');

								// Page submenu adjust
								if( stickyPageSubmenu == true ) {

									heightToAdjust = $headerOuterEl.outerHeight();
									if( $headerSecondaryEl.length > 0) {
										heightToAdjust -=	nectarDOMInfo.secondaryHeaderHeight;
									}

									if ($bodyBorderTop.length > 0 && $('body.mobile').length == 0) {

										$bodyBorderSizeToRemove = ($bodyBorderHeaderColorMatch) ? $bodyBorderTop.height() : 0;
										$('.page-submenu.stuck')
											.css('transform', 'translateY(' + (heightToAdjust - $bodyBorderSizeToRemove) + 'px)')
											.removeClass('header-not-visible');
									} else {

										$('.page-submenu.stuck')
											.css('transform', 'translateY(' + heightToAdjust + 'px)')
											.removeClass('header-not-visible');
									}

								} // End sticky page submenu conditional.

							}

						}

						// Keep track of current scroll position
						previousScroll = currentScroll;

						if (nectarDOMInfo.winW > 999) {
							requestAnimationFrame(hhunCalcs);
						}

					}

					// Start the animation loop.
					hhunCalcs();

				}



				/**
				* Shrink the header navigation size.
				*
				* Used when "Header Resize On Scroll" is active.
				*
				* @since 1.0
				*/
				function smallNav() {

					var $offset          = nectarDOMInfo.scrollTop,
					$windowWidth         = nectarDOMInfo.winW,
					$scrollTriggerOffset = 30;

					if( headerTransparent == true ) {
						$scrollTriggerOffset = 0;
					}

					if ($offset > $scrollTriggerOffset && $windowWidth >= 1000 && $('body.material-ocm-open').length == 0) {


						// Going to small when material search is closing, it must be closed immediately
						if ($body.is('.material')) {

							if ($('#search-outer.material-open').length == 0) {
								$('#header-outer[data-transparent-header="true"] .bg-color-stripe').css('transition', 'none');
							}

							// Secondary header
							if ($headerSecondaryEl.length > 0) {
								$headerSecondaryEl.addClass('hide-up');
								$headerOuterEl.css('transform', 'translateY(-' + nectarDOMInfo.secondaryHeaderHeight + 'px)');
							}

						}

						if ($('#header-outer[data-megamenu-rt="1"]').length > 0 &&
						$('#header-outer[data-transparent-header="true"]').length > 0 &&
						$('#header-outer .megamenu').length > 0) {

							if ($headerOuterEl.attr('data-transparent-header') == 'true' &&
							$('#header-outer.side-widget-open').length == 0 &&
							$('#header-outer[data-permanent-transparent="1"]').length == 0 &&
							$('.megamenu.sfHover:not(.width-75):not(.width-50)').length == 0) {
								$headerOuterEl.removeClass('transparent');
								$headerOuterEl.removeClass('no-transition');
							}

						} else {

							if ($headerOuterEl.attr('data-transparent-header') == 'true' &&
							$('#header-outer.side-widget-open').length == 0 &&
							$('#header-outer[data-permanent-transparent="1"]').length == 0) {
								$headerOuterEl.removeClass('transparent');
							}

						}

						// Centered logo between menu.
						$('#header-outer:not(.small-nav) header#top nav > ul > li.menu-item-with-margin').stop(true, true).animate({
							'margin-right': (parseInt($('header#top nav > ul > li.menu-item-with-margin').css('margin-right')) - parseInt(logoShrinkNum) * 3) + 'px'
						}, {
							queue: false,
							duration: 250,
							easing: 'easeOutCubic'
						});

						// Add small nav class.
						$('#header-outer, #search-outer').addClass('small-nav');

						// Body border full width side padding
						if ($('#header-outer[data-full-width="true"][data-transparent-header="true"]').length > 0 &&
						$bodyBorderTop.length > 0 &&
						$bodyBorderHeaderColorMatch == true) {

							$('#header-outer[data-full-width="true"] header > .container').stop(true, true).animate({
								'padding': '0'
							}, {
								queue: false,
								duration: 250,
								easing: 'easeOutCubic'
							});

						}


						// Box roll effect
						if ($('.nectar-box-roll').length > 0 && $('#header-outer[data-permanent-transparent="1"]').length == 0) {
							$('#ajax-content-wrap').animate({
								'margin-top': (Math.floor(($logoHeight - logoShrinkNum) + (headerPadding * 2) / 1.8 + nectarDOMInfo.adminBarHeight + nectarDOMInfo.secondaryHeaderHeight))
							}, {
								queue: false,
								duration: 250,
								easing: 'easeOutCubic'
							});
						}

						$window.off('scroll.headerResizeEffect', smallNav);
						$window.on('scroll.headerResizeEffect', bigNav);

						// Dark slider coloring border
						$('#header-outer[data-transparent-header="true"]').css('transition', 'transform 0.3s ease, background-color 0.30s ease, opacity 0.3s ease, box-shadow 0.30s ease, margin 0.25s ease-out');
						$('#header-outer[data-transparent-header="true"] .cart-menu').css('transition', 'none');
						setTimeout(function () {
							$('#header-outer[data-transparent-header="true"]').css('transition', 'transform 0.3s ease, background-color 0.30s ease, opacity 0.3s ease, box-shadow 0.30s ease, border-color 0.30s ease, margin 0.25s ease-out');
							$('#header-outer[data-transparent-header="true"] .cart-menu').css('transition', 'border-color 0.30s ease');
						}, 300);

					}

				}


				/**
				* Return header navigation size to full.
				*
				* Used when "Header Resize On Scroll" is active.
				*
				* @since 1.0
				*/
				function bigNav() {

					var $offset          = nectarDOMInfo.scrollTop,
					$windowWidth         = nectarDOMInfo.winW,
					$scrollTriggerOffset = 30;

					if ($body.is('.material-ocm-open')) {
						return false;
					}

					if( headerTransparent == true ) {
						$scrollTriggerOffset = 0;
					}

					if ($offset <= $scrollTriggerOffset && $windowWidth >= 1000 || $('.small-nav').length > 0 && $('#ajax-content-wrap.no-scroll').length > 0) {

						$('#header-outer, #search-outer').removeClass('small-nav');

						if ($('#header-outer[data-megamenu-rt="1"]').length > 0 &&
						$('#header-outer[data-transparent-header="true"]').length > 0 &&
						$('#header-outer .megamenu').length > 0) {

							if ($headerOuterEl.attr('data-transparent-header') == 'true' &&
							$('.nectar-box-roll').length == 0 &&
							$('.megamenu.sfHover:not(.width-75):not(.width-50)').length == 0) {

								$headerOuterEl.addClass('transparent');
								$headerOuterEl.removeClass('no-transition');
							}

						} else {

							if ($headerOuterEl.attr('data-transparent-header') == 'true' && $('.nectar-box-roll').length == 0) {
								$headerOuterEl.addClass('transparent');
							}

						}

						// Body border full width side padding
						if ($('#header-outer[data-full-width="true"][data-transparent-header="true"]').length > 0 &&
						$bodyBorderTop.length > 0 &&
						$bodyBorderHeaderColorMatch == true) {

							$('#header-outer[data-full-width="true"] header > .container').stop(true, true).animate({
								'padding': '0 28px'
							}, {
								queue: false,
								duration: 250,
								easing: 'easeOutCubic'
							});

						}

						// centered logo between menu.
						$('header#top nav > ul > li.menu-item-with-margin').stop(true, true).animate({
							'margin-right': (parseInt($('header#top nav > ul > li.menu-item-with-margin').css('margin-right')) + parseInt(logoShrinkNum) * 3) + 'px'
						}, {
							queue: false,
							duration: 150,
							easing: 'easeOutCubic'
						});


						// Secondary header
						if ($headerSecondaryEl.length > 0) {

							$headerSecondaryEl.removeClass('hide-up');
							$headerOuterEl
								.removeClass('hide-up')
								.css('transform', 'translateY(0%)');

						}

						// Box roll
						if ($('.nectar-box-roll').length > 0 && $('#header-outer[data-permanent-transparent="1"]').length == 0) {
							$('#ajax-content-wrap').animate({
								'margin-top': (Math.floor(($logoHeight) + (headerPadding * 2) + nectarDOMInfo.adminBarHeight + nectarDOMInfo.secondaryHeaderHeight))
							}, {
								queue: false,
								duration: 250,
								easing: 'easeOutCubic'
							});
						}

						$window.off('scroll.headerResizeEffect', bigNav);
						$window.on('scroll.headerResizeEffect', smallNav);

						// Dark slider coloring border
						$('#header-outer[data-transparent-header="true"]').css('transition', 'transform 0.3s ease, background-color 0.30s ease, opacity 0.3s ease, box-shadow 0.30s ease, margin 0.25s ease-out');
						$('#header-outer[data-transparent-header="true"] .cart-menu').css('transition', 'none');
						setTimeout(function () {
							$('#header-outer[data-transparent-header="true"]').css('transition', 'transform 0.3s ease, background-color 0.30s ease, opacity 0.3s ease, box-shadow 0.30s ease, border-color 0.30s ease, margin 0.25s ease-out');
							$('#header-outer[data-transparent-header="true"] .cart-menu').css('transition', 'border-color 0.30s ease');
						}, 300);
					}

				}



				/**
				* Default scroll event to handle transparency/secondary header when no header effects are enabled.
				*
				* @since 4.0
				*/
				function opaqueCheck() {

					// The condense header effect will bypass this unless in the custom mobile breakpoint (which is defined in theme options).
					if ($('#header-outer[data-format="centered-menu-bottom-bar"][data-condense="true"]').length > 0 && !$headerOuterEl.hasClass('within-custom-breakpoint') ) {
						return;
					}

					if (nectarDOMInfo.scrollTop > 0) {

						if ($('body.material').length > 0) {
							$headerOuterEl.addClass('scrolled-down');

							// Secondary header
							if ($headerSecondaryEl.length > 0 && nectarDOMInfo.winW > 1000) {
								$headerSecondaryEl.addClass('hide-up');
								$headerOuterEl.css('transform', 'translateY(-' + nectarDOMInfo.secondaryHeaderHeight + 'px)');
							}
						}

						if ($headerOuterEl.attr('data-transparent-header') == 'true' && $('#header-outer[data-permanent-transparent="1"]').length == 0) {
							$headerOuterEl.removeClass('transparent').addClass('scrolled-down');
						}

						// Switch event to watch.
						$window.off('scroll.headerResizeEffectOpaque', opaqueCheck);
						$window.on('scroll.headerResizeEffectOpaque', transparentCheck);
					}
				}


				/**
				* Default scroll event to handle transparency/secondary header when no header effects are enabled.
				*
				* @since 4.0
				*/
				function transparentCheck() {

					// The condense header effect will bypass this unless in the custom mobile breakpoint (which is defined in theme options).
					if ($('#header-outer[data-format="centered-menu-bottom-bar"][data-condense="true"]').length > 0 && !$headerOuterEl.hasClass('within-custom-breakpoint') ) {
						return;
					}

					if (nectarDOMInfo.scrollTop == 0 && $('body.material-ocm-open').length == 0) {

						if ($('#header-outer[data-megamenu-rt="1"]').length > 0 &&
						$('#header-outer[data-transparent-header="true"]').length > 0 &&
						$('#header-outer .megamenu').length > 0) {

							if ($headerOuterEl.attr('data-transparent-header') == 'true' && $('.megamenu.sfHover:not(.width-75):not(.width-50)').length == 0) {

								$headerOuterEl
									.addClass('transparent')
									.removeClass('scrolled-down');

								$headerOuterEl.removeClass('no-transition');

							} else if ($headerOuterEl.attr('data-transparent-header') == 'true') {

								$headerOuterEl.removeClass('scrolled-down');
							}

						} else {

							if ($headerOuterEl.attr('data-transparent-header') == 'true') {
								$headerOuterEl
									.addClass('transparent')
									.removeClass('scrolled-down');
							}

						}

						if ($('body.material').length > 0) {
							$headerOuterEl.removeClass('scrolled-down');

							// Secondary header
							if ($headerSecondaryEl.length > 0 && nectarDOMInfo.winW > 1000) {

								$headerSecondaryEl.removeClass('hide-up');
								$headerOuterEl
									.removeClass('hide-up')
									.css('transform', 'translateY(0%)');
							}
						}

						// Switch event to watch.
						$window.off('scroll.headerResizeEffectOpaque', transparentCheck);
						$window.on('scroll.headerResizeEffectOpaque', opaqueCheck);
					}

				}




				/**
				* Mobile header event for handling transparency/secondary header.
				*
				* @since 10.5
				* @see bindScrollEffectsMobile
				*/
				function mobileHeaderRAF() {

					if ( nectarState.materialOffCanvasOpen == true ) {
						requestAnimationFrame(mobileHeaderRAF);
						return;
					}
					// Scrolled down.
					if (nectarDOMInfo.scrollTop > 5 ) {

						if( nectarState.mobileHeader != 'scrolled' ) {

							if ( nectarState.permanentTransHeader == false ) {
								$headerOuterEl.removeClass('transparent');
							}

							if (nectarDOMInfo.secondaryHeaderHeight > 0) {
								$headerSecondaryEl.addClass('hide-up');
								$headerOuterEl.css('transform', 'translateY(-' + nectarDOMInfo.secondaryHeaderHeight + 'px)').addClass('hidden-secondary');
							} else {
								$headerOuterEl.removeClass('hidden-secondary');
							}

							$headerOuterEl.addClass('scrolled-down');

							// Update state.
							nectarState.mobileHeader = 'scrolled';
						}

					}
					// At top.
					else {

						if( nectarState.mobileHeader != 'at-top' ) {

							if ($headerOuterEl.attr('data-transparent-header') == 'true') {
								$headerOuterEl.addClass('transparent');
							}

							if (nectarDOMInfo.secondaryHeaderHeight > 0) {
								$headerSecondaryEl.removeClass('hide-up');
								$headerOuterEl.css('transform', 'translateY(0px)');
							}
							$headerOuterEl.removeClass('hidden-secondary').removeClass('scrolled-down');

							// Update state.
							nectarState.mobileHeader = 'at-top';
						}

					}

					if (nectarDOMInfo.winW < 1000) {
						requestAnimationFrame(mobileHeaderRAF);
					}
				}



				/**
				* Bind mobile header scroll effects.
				*
				* @since 10.5
				* @see headerNavScrollInit
				*/
				function bindScrollEffectsMobile() {

					if (nectarDOMInfo.winW > 999) {
						return;
					}

					// Reset state.
					nectarState.mobileHeader = '';

					// Unbind desktop effects.
					$window.off('scroll.headerResizeEffect');
					$window.off('scroll.headerResizeEffectOpaque');

					// Remove HHUN classes.
					$headerOuterEl
						.removeClass('scrolled-down')
						.removeClass('detached')
						.removeClass('invisible')
						.removeClass('at-top')
						.css('transform', 'none');

					// Handle mobile transparent class.
					if ($('#header-outer[data-mobile-fixed="1"]').length > 0) {
						requestAnimationFrame(mobileHeaderRAF);
					} else if ($headerOuterEl.attr('data-transparent-header') == 'true') {
						$headerOuterEl.addClass('transparent');
					}

					$window.off('smartresize.nectarNavScrollEffects');
					$window.on('smartresize.nectarNavScrollEffects', bindScrollEffectsDesktop);

				}

				/**
				* Bind deaktop header scroll effects.
				*
				* @since 10.5
				* @see headerNavScrollInit
				*/
				function bindScrollEffectsDesktop() {

					if (nectarDOMInfo.winW < 1000) {
						return;
					}

					if (headerResize == true && headerHideUntilNeeded != '1') {

						$window.off('scroll.headerResizeEffect');

						if ($('#nectar_fullscreen_rows').length == 0) {
							$window.on('scroll.headerResizeEffect', smallNav);
						} else if ($('#nectar_fullscreen_rows[data-mobile-disable="on"]').length > 0 && nectarDOMInfo.usingMobileBrowser) {
							$window.on('scroll.headerResizeEffect', smallNav);
						}

					} else if (headerHideUntilNeeded != '1') {

						$window.off('scroll.headerResizeEffectOpaque');
						$window.on('scroll.headerResizeEffectOpaque', opaqueCheck);

					} else if (headerHideUntilNeeded == '1') {


						if ($('.nectar-box-roll').length > 0) {
							$headerOuterEl.addClass('at-top-before-box');
						}

						// Don't trigger for header remove stickiness.
						if ($('#header-outer[data-remove-fixed="1"]').length == 0) {
							hhunHeaderEffect();
						}

					} //end if hhun

					// Condense header effect coming from mobile.
					if ($('#header-outer[data-format="centered-menu-bottom-bar"][data-condense="true"]').length > 0 ) {

						if( $headerSecondaryEl.length > 0 ) {
							// Remove transform.
							$headerOuterEl.css('transform','');
						}

						if ( nectarDOMInfo.scrollTop > 200 && !$headerOuterEl.hasClass('fixed-menu') ) {
							$headerOuterEl.addClass('fixed-menu');
						}

					}

					// Only bind mobile if applicable.

					$window.off('smartresize.nectarNavScrollEffects');
					$window.on('smartresize.nectarNavScrollEffects', bindScrollEffectsMobile);

				}



				/**
				* Header Navigation scroll events initialization.
				*
				* @since 10.5
				*/
				function headerNavScrollInit() {

					// Remove transparent class if page loaded further down.
					if ($('#header-outer[data-remove-fixed="1"]').length == 0 && nectarDOMInfo.winW > 1000) {
						if ( $(window).scrollTop() != 0 && $('#header-outer.transparent[data-permanent-transparent="false"]').length == 1) {
							$headerOuterEl.removeClass('transparent');
						}
					}

					// Permanent transparent header.
					if ($('#nectar_fullscreen_rows').length == 0 && $('.nectar-box-roll').length == 0) {
						midnightInit();
					}

					// Determine which events to bind at start.
					if (nectarDOMInfo.winW < 1000 && $('.nectar-box-roll').length == 0) {
						bindScrollEffectsMobile();
						$window.on('smartresize.nectarNavScrollEffects', bindScrollEffectsMobile);
					} else {
						bindScrollEffectsDesktop();
						$window.on('smartresize.nectarNavScrollEffects', bindScrollEffectsDesktop);
					}

				}






				/**
				* Set the header space div height.
				*
				* @since 10.5
				*/
				function headerSpace() {

					if ($('.mobile').length > 0) {

						if (nectarDOMInfo.winH < nectarDOMInfo.winW && nectarDOMInfo.winW > 1000) {
							if ($('#header-outer.small-nav').length == 0) {
								$('#header-space').css('height', $headerOuterEl.outerHeight());
							}
						} else {
							$('#header-space').css('height', $headerOuterEl.outerHeight());
						}

					} else {

						if ($('.nectar-parallax-scene.first-section').length == 0) {

							var headerPadding2 = headerPadding - headerPadding / 1.8;
							var $headerHeight = ($('#header-outer[data-header-resize="1"]').length > 0 && $('.small-nav').length > 0) ? $headerOuterEl.outerHeight() + (parseInt(logoShrinkNum) + headerPadding2 * 2) : $headerOuterEl.outerHeight();

							// Is the calculation greater than the margin of error?
							if( Math.abs($headerHeight - $('#header-space').height()) > 7) {
								$('#header-space').css('height', $headerHeight);
							}


						}

					}

				}



				/**
				* Handle header nav distance away from top to account for admin bar.
				*
				* @since 10.5
				*/

				function headerNavOffsetInit() {

					var lastPosition     = -1;
					var $headerScrollTop = nectarDOMInfo.scrollTop;

					// Verify scroll pos has changed before calculating.
					function headerOffsetAdjust() {

						if ( $body.hasClass('compose-mode') ) {
							return;
						}

						$headerScrollTop = nectarDOMInfo.scrollTop;

						if (lastPosition == $headerScrollTop) {
							requestAnimationFrame(headerOffsetAdjust);
							return false;
						} else {
							lastPosition = $headerScrollTop;
						}

						headerOffsetAdjustCalc();
						requestAnimationFrame(headerOffsetAdjust);

					}

					// Called when scrolling occurs.
					function headerOffsetAdjustCalc() {

						var $eleHeight = 0;

						// Mobile.
						if (nectarDOMInfo.winW < 1000 ||
						   (condenseHeaderLayout == true && $('#header-outer .span_9').css('display') == 'none') ||
							 (condenseHeaderLayout == true && $('#header-outer .span_9 > nav').css('display') == 'none')) {

							$eleHeight = 0;
							var $endOffset = ($wpAdminBar.css('position') == 'fixed') ? $wpAdminBar.height() : 0;

							$eleHeight += nectarDOMInfo.adminBarHeight;

							if ($eleHeight - $headerScrollTop > $endOffset) {
								$headerOuterEl.css('top', $eleHeight - $headerScrollTop + 'px');
							} else {
								$headerOuterEl.css('top', $endOffset);
							}

						}
						// Desktop
						else {
							if ( condenseHeaderLayout == false ) {

								$eleHeight = 0;

								if( !$headerOuterEl.is('[data-remove-fixed="1"]') ) {
									$eleHeight += nectarDOMInfo.adminBarHeight;
								}
								$headerOuterEl.css('top', $eleHeight + 'px');
							}
						}

					}

					// Bind event and begin if needed.
					if ($('#header-outer[data-mobile-fixed="1"]').length > 0 && $wpAdminBar.length > 0) {

						if ($('#nectar_fullscreen_rows').length == 0) {
							requestAnimationFrame(headerOffsetAdjust);
						} else if ($('#nectar_fullscreen_rows').length > 0 && nectarDOMInfo.usingMobileBrowser) {
							requestAnimationFrame(headerOffsetAdjust);
						}

						$window.on('smartresize', headerOffsetAdjustCalc);

					}

				}







				/**
				* Calculate the minimum body height when using the footer reveal effect or material OCM
				*
				* @since 7.0
				*/
				function footerRevealCalcs() {

					var $headerNavSpace = 0;
					var pageHeaderHeight = 0;

					if( $headerOuterEl.is('[data-logo-height]') && $headerOuterEl.is('[data-padding]') ) {

						if( !$headerOuterEl.hasClass('transparent') ) {

							if( $headerOuterEl.find('#logo.no-image').length > 0 ) {
								$headerNavSpace = ( headerLayoutFormat == 'left-header' && nectarDOMInfo.winW > 1000) ? 0 : parseInt($headerOuterEl.find('#logo.no-image').height()) + (parseInt($headerOuterEl.attr('data-padding')*2));
							} else {
								$headerNavSpace = ( headerLayoutFormat == 'left-header' && nectarDOMInfo.winW > 1000) ? 0 : parseInt($headerOuterEl.attr('data-logo-height')) + (parseInt($headerOuterEl.attr('data-padding')*2));
							}

						}

					} else {
						$headerNavSpace = ( headerLayoutFormat == 'left-header' && nectarDOMInfo.winW > 1000) ? 0 : $headerOuterEl.outerHeight();
					}

					if( $pageHeaderBG.length > 0 ) {
						pageHeaderHeight += $pageHeaderBG.height();
					}
					if( $('.page-header-no-bg').length > 0 ) {
						pageHeaderHeight += $('.page-header-no-bg').height();
					}

					if (nectarDOMInfo.winH - nectarDOMInfo.adminBarHeight - $headerNavSpace - nectarDOMInfo.footerOuterHeight - 1 - pageHeaderHeight > 0) {

						var $resizeExtra = ($('body:not(.material) #header-outer[data-header-resize="1"]').length > 0) ? 55 : 0;

						$('body[data-footer-reveal="1"]:not(.nectar_using_pfsr) .container-wrap').css({
							'margin-bottom': nectarDOMInfo.footerOuterHeight
						});

						$('.container-wrap').css({
							'min-height': nectarDOMInfo.winH - nectarDOMInfo.adminBarHeight - $headerNavSpace - nectarDOMInfo.footerOuterHeight - pageHeaderHeight + $resizeExtra
						});

					} else {
						$('body[data-footer-reveal="1"]:not(.nectar_using_pfsr) .container-wrap').css({
							'margin-bottom': nectarDOMInfo.footerOuterHeight
						});
					}

					if (nectarDOMInfo.winW < 1000) {
						$footerOuterEl.attr('data-midnight', 'light');
					}
					else {
						$footerOuterEl.removeAttr('data-midnight');
					}
				}


				/**
				* Initialize footer reveal and bind event
				*
				* @since 10.5
				*/
				function footerRevealInit() {

					if ($('body[data-footer-reveal="1"]').length > 0 || $('body.material[data-slide-out-widget-area-style="slide-out-from-right"]').length > 0) {

						setTimeout(footerRevealCalcs, 60);
						footerRevealCalcs();

						$window.on('resize', footerRevealCalcs);

						if ($('body[data-footer-reveal="1"][data-footer-reveal-shadow="large_2"]').length > 0)  {
							$('.container-wrap').css({
								boxShadow: '0 70px 110px -30px ' + $footerOuterEl.css('backgroundColor')
							});
						}

					}

				}





				/**
				* Switch header navigation BG color to match row BG color that is passes.
				*
				* Only called when using "Header Inherit Row Color" option.
				*
				* @since 5.0
				*/
				function headerRowColorInheritInit() {

					if ($('body[data-header-inherit-rc="true"]').length > 0 && $('.mobile').length == 0 && $('#header-outer[data-transparent-header="true"]').length > 0 ) {

						var headerOffset = $logoHeight / 2 + headerPadding + nectarDOMInfo.adminBarHeight;

						if( $('#header-outer[data-permanent-transparent="1"]').length == 0 ) {
							headerOffset = ($logoHeight - logoShrinkNum) + Math.ceil((headerPadding * 2) / 1.8) + nectarDOMInfo.adminBarHeight;
						}

						$('.main-content > .row > .wpb_row').each(function () {

							var $that = $(this);
							var $textColor;

							var waypoint = new Waypoint({
								element: $that,
								handler: function (direction) {

									//User is scrolling down.
									if (direction == 'down') {

										if ($that.find('.row-bg.using-bg-color').length > 0) {

											$textColor = ($that.find('> .col.span_12.light').length > 0) ? 'light-text' : 'dark-text';

											$headerOuterEl
												.css('background-color', $that.find('.row-bg').css('background-color'))
												.removeClass('light-text')
												.removeClass('dark-text')
												.addClass($textColor);

											$headerOuterEl.attr('data-current-row-bg-color', $that.find('.row-bg').css('background-color'));
											$('body.material #header-outer .bg-color-stripe').css('background-color', $that.find('.row-bg').css('background-color'));

										} else {

											$headerOuterEl
												.css('background-color', $headerOuterEl.attr('data-user-set-bg'))
												.removeClass('light-text')
												.removeClass('dark-text');

											$headerOuterEl.attr('data-current-row-bg-color', $headerOuterEl.attr('data-user-set-bg'));
											$('body.material #header-outer .bg-color-stripe').css('background-color', '');

										}

									}

									//User is scrolling up.
									else {

										if ($that.prev('div.wpb_row').find('.row-bg.using-bg-color').length > 0) {

											$textColor = ($that.prev('div.wpb_row').find('> .col.span_12.light').length > 0) ? 'light-text' : 'dark-text';

											$headerOuterEl
												.css('background-color', $that.prev('div.wpb_row').find('.row-bg').css('background-color'))
												.removeClass('light-text')
												.removeClass('dark-text')
												.addClass($textColor);

											$headerOuterEl.attr('data-current-row-bg-color', $that.prev('div.wpb_row').find('.row-bg').css('background-color'));
											$('body.material #header-outer .bg-color-stripe').css('background-color', $that.prev('div.wpb_row').find('.row-bg').css('background-color'));

										} else {

											$headerOuterEl
												.css('background-color', $headerOuterEl.attr('data-user-set-bg'))
												.removeClass('light-text')
												.removeClass('dark-text');

											$headerOuterEl.attr('data-current-row-bg-color', $headerOuterEl.attr('data-user-set-bg'));
											$('body.material #header-outer .bg-color-stripe').css('background-color', '');

										}

									}

								},
								offset: headerOffset

							}); // End of waypoint bind.

						}); // End of loop through rows.

					}

				}



				/**
				* Page submenu sticky functionality
				*
				* @since 10.5.2
				*/

				function stickyPageSubmenuInit() {

					var $ = window.jQuery,
					Waypoint = window.Waypoint,
					$offsetHeight = calcHeaderNavHeight(),
					$headerHeight = calcHeaderNavHeight();

					$window.on('smartresize', function () {

						$offsetHeight = calcHeaderNavHeight();

						if ($wpAdminBar.length > 0 &&
							$wpAdminBar.css('position') == 'fixed') {
							$offsetHeight += $wpAdminBar.height();
						}

						if ($bodyBorderTop.length > 0 &&
							$window.width() > 1000 &&
							$('body[data-hhun="1"]').length > 0) {
							$offsetHeight += $bodyBorderTop.height();
						}

						// Recalc for resizing (same as stuck/unstuck logic below)
						if ($('.page-submenu.stuck').length > 0) {

							$('.page-submenu.stuck')
								.addClass('no-trans')
								.css('top', $offsetHeight)
								.css('transform', 'translateY(0)').addClass('stuck');

							setTimeout(function () {
								$('.page-submenu.stuck').removeClass('no-trans');
							}, 50);

							$('.page-submenu.stuck')
								.parents('.wpb_row')
								.css('z-index', 10000);

							// Boxed layout
							if ($('#boxed').length > 0) {

								var $negMargin = ($window.width() > 1000) ? $('.container-wrap').width() * 0.04 : 39;

								$('.page-submenu.stuck').css({
									'margin-left': '-' + $negMargin + 'px',
									'width': $('.container-wrap').width()
								});

							}

						} else {

							$('.page-submenu.stuck')
								.css('top', '0')
								.removeClass('stuck');

							$('.page-submenu.stuck')
								.parents('.wpb_row')
								.css('z-index', 'auto');

							if ($('#boxed').length > 0) {
								$('.page-submenu.stuck').css({
									'margin-left': '0px',
									'width': '100%'
								});
							}

						}

					});

					/* http://imakewebthings.com/waypoints/shortcuts/sticky-elements */
					function Sticky(options) {
						this.options = $.extend({}, Waypoint.defaults, Sticky.defaults, options);
						this.element = this.options.element;
						this.$element = $(this.element);
						this.createWrapper();
						this.topLevel = ($(this.element).parents('.top-level').length > 0) ? true : false;
						this.createWaypoint();
					}

					/* Private */
					Sticky.prototype.createWaypoint = function () {

						var originalHandler = this.options.handler;

						$offsetHeight = calcHeaderNavHeight();

						// top level hhun
						if( this.topLevel && $('body[data-hhun="1"] #header-outer.detached:not(.invisible)').length > 0) {
							$offsetHeight += 1;
							this.$element.css({
								'margin-top': '-1px',
							});
						}

						if ($wpAdminBar.length > 0 && $wpAdminBar.css('position') == 'fixed') {
							$offsetHeight += $wpAdminBar.height();
						}

						if ($bodyBorderTop.length > 0 && $window.width() > 1000 && $('body[data-hhun="1"]').length > 0) {
							$offsetHeight += $bodyBorderTop.height();
						}

						this.waypoint = new Waypoint($.extend({}, this.options, {
							element: this.wrapper,
							handler: $.proxy(function (direction) {
								var shouldBeStuck = this.options.direction.indexOf(direction) > -1;
								var wrapperHeight = shouldBeStuck ? this.$element.outerHeight(true) : '';

								this.$wrapper.height(wrapperHeight);
								if (shouldBeStuck) {

									// top level hhun
									var transformAmt = 0;
									if( this.topLevel && $('body[data-hhun="1"] #header-outer.detached:not(.invisible)').length > 0) {

										// Page submenu adjust
										var heightToAdjust = $headerOuterEl.outerHeight();
										var $bodyBorderSizeToRemove = 0;

										if( $headerSecondaryEl.length > 0) {
											heightToAdjust -=	nectarDOMInfo.secondaryHeaderHeight;
										}

										if ($bodyBorderTop.length > 0 && $('body.mobile').length == 0) {
											$bodyBorderSizeToRemove = ($bodyBorderHeaderColorMatch) ? $bodyBorderTop.height() : 0;
										}

										transformAmt = heightToAdjust - $bodyBorderSizeToRemove;

									}

									this.$element
										.addClass('no-trans')
										.css('top', $offsetHeight)
										.css('transform', 'translateY('+transformAmt+'px)')
										.addClass('stuck');

									var $that = this;

									setTimeout(function () {
										$that.$element.removeClass('no-trans');
									}, 50);

									this.$element.parents('.wpb_row').css('z-index', 10000);

									//boxed
									if ($('#boxed').length > 0) {
										var $negMargin = ($window.width() > 1000) ? $('.container-wrap').width() * 0.04 : 39;
										this.$element.css({
											'margin-left': '-' + $negMargin + 'px',
											'width': $('.container-wrap').width()
										});
									}

								} else {
									this.$element.css('top', '0').removeClass('stuck');

									if ($('#boxed').length > 0) this.$element.css({
										'margin-left': '0px',
										'width': '100%'
									});
								}

								if (originalHandler) {
									originalHandler.call(this, direction);
								}
							}, this),
							offset: $offsetHeight
						}));

						var $that = this;


						setInterval(function () {

							if ($('body[data-hhun="1"] #header-outer.detached:not(.invisible)').length > 0) {

								var heightToAdjust = $headerOuterEl.outerHeight();

								if( $headerSecondaryEl.length > 0) {
									heightToAdjust -=	nectarDOMInfo.secondaryHeaderHeight;
								}

								$that.waypoint.options.offset = $offsetHeight + heightToAdjust;
							}
							else {
								$that.waypoint.options.offset = $offsetHeight;
							}

							Waypoint.refreshAll();

						}, 100);


					};

					/* Private */
					Sticky.prototype.createWrapper = function () {
						if (this.options.wrapper) {
							this.$element.wrap(this.options.wrapper);
						}
						this.$wrapper = this.$element.parent();
						this.wrapper  = this.$wrapper[0];
					};

					/* Public */
					Sticky.prototype.destroy = function () {

						if (this.$element.parent()[0] === this.wrapper) {
							this.waypoint.destroy();
							this.$element.removeClass(this.options.stuckClass);
							if (this.options.wrapper) {
								this.$element.unwrap();
							}
						}

					};

					Sticky.defaults = {
						wrapper: '<div class="sticky-wrapper" />',
						stuckClass: 'stuck',
						direction: 'down right'
					};

					Waypoint.Sticky = Sticky;

				}



				/**
				* Page submenu page builder element.
				*
				* @since 10.5
				*/

				function pageSubmenuInit() {

					if ($('.page-submenu[data-sticky="true"]').length > 0 && $('#nectar_fullscreen_rows').length == 0) {

						stickyPageSubmenuInit();

						// Remove outside of column setups
						if ($('.page-submenu').parents('.span_12').find('> .wpb_column').length > 1) {

							var pageMenu      = $('.page-submenu').clone(),
							pageMenuParentRow = $('.page-submenu').parents('.wpb_row');

							$('.page-submenu').remove();
							pageMenuParentRow.before(pageMenu);
						}

						var sticky = new Waypoint.Sticky({
							element: $('.page-submenu[data-sticky="true"]')[0]
						});

					}

					// Adjust to be higher.
					if ($('#nectar_fullscreen_rows').length == 0) {

						$('.page-submenu')
							.parents('.wpb_row')
							.css('z-index', 10000);
					}

					// Bind events.
					$('.page-submenu .mobile-menu-link').on('click', function () {

						$(this).parents('.page-submenu')
							.find('ul')
							.stop(true)
							.slideToggle(350);

						return false;

					});

					$('.page-submenu ul li a').on('click', function () {

						if ($('body.mobile').length > 0) {
							$(this).parents('.page-submenu')
								.find('ul')
								.stop(true)
								.slideToggle(350);
						}

					});

				}




				/**
				* Page builder full height row option.
				*
				* @since 8.0
				*/

				function vcFullHeightRow() {

					var $element = $(".vc_row-o-full-height:first");
					if ($element.length) {

						var windowHeight, offsetTop, fullHeight;
						windowHeight = $window.height();

						$(".vc_row-o-full-height").each(function () {

							offsetTop = $(this).offset().top;

							if (offsetTop < windowHeight &&
								$(this).hasClass('top-level') &&
								!nectarDOMInfo.usingFrontEndEditor) {

								fullHeight = 100 - offsetTop / (windowHeight / 100);
								$(this).css("min-height", fullHeight + "vh");
								$(this).find('> .col.span_12').css("min-height", fullHeight + "vh");

							} else {

								$(this).css("min-height", windowHeight);
								$(this).find('> .col.span_12').css("min-height", windowHeight);

							}

						});

					}

				}


				/**
				* Page builder full height row init.
				*
				* @since 10.5
				*/

				function vcFullHeightRowInit() {

					if( $('.vc_row-o-full-height').length > 0 ) {
						vcFullHeightRow();
						$window.on('smartresize', vcFullHeightRow);
					}

				}


				/**
				* Page builder equal height row IE helper.
				*
				* @since 8.0
				*/
				function fixIeFlexbox() {
					var ua = window.navigator.userAgent,
					msie = ua.indexOf("MSIE ");
					(msie > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) && $(".vc_row-o-full-height").each(function () {
						"flex" === $(this).find('> .span_12').css("display") && $(this).wrap('<div class="vc_ie-flexbox-fixer"></div>')
					});

					if( msie > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) {
						fixIE11Images();
						$(window).on('resize',fixIE11Images);
					}

				}

				/**
				* Fix the IE11 bug with max-width 100% on imgs
				*
				* @since 11.0
				*/
				function fixIE11Images() {

					$('.img-with-aniamtion-wrap img.img-with-animation').each(function() {

						if( $(this).parents('.tabbed').length == 0 && $(this).parents('.toggle').length == 0 ) {

							var $parentWrap = $(this).parents('.img-with-aniamtion-wrap');
							$parentWrap.css({
								'height' : ''
							});
							var height = $(this).height();

							$parentWrap.css({
								'height' : height
							});

						}

					});

				}









				/**
				* Recent post height
				*
				* @since 10.5
				*/
				function recentPostsTitleOnlyEqualHeight() {

					function recentPostHeight() {

						$('.blog-recent[data-style="title_only"]').each(function () {

							if ($(this).find('> .col').length > 1) {
								return false;
							}
							var $parentsSeletor = $(this).parent().parent().parent();

							if ($parentsSeletor.hasClass('vc_col-sm-3') ||
							$parentsSeletor.hasClass('vc_col-sm-4') ||
							$parentsSeletor.hasClass('vc_col-sm-6') ||
							$parentsSeletor.hasClass('vc_col-sm-8') ||
							$parentsSeletor.hasClass('vc_col-sm-9')) {

								if ($('body.mobile').length == 0 && $(this).next('div').length == 0) {
									var tallestColumn = 0;

									$(this).find('> .col').css('padding', '50px 20px');

									$(this).parents('.span_12').find(' > .wpb_column').each(function () {

										if( Math.floor($(this).height()) > tallestColumn ) {
											tallestColumn = Math.floor($(this).height());
										}

									});

									if (Math.floor($(this).find('> .col').outerHeight(true)) < Math.floor($(this).parents('.wpb_row').height()) - 1) {
										$(this).find('> .col').css('padding-top', (tallestColumn - $(this).find('> .col').height()) / 2 + 'px');
										$(this).find('> .col').css('padding-bottom', (tallestColumn - $(this).find('> .col').height()) / 2 + 'px');
									}

								} else {
									$(this).find('> .col').css('padding', '50px 20px');
								}
							}
						});

					}

					// Set heights.
					if( $('.blog-recent[data-style="title_only"]').length > 0 ) {
						recentPostHeight();
						$window.on('smartresize',recentPostHeight);
					}

				}





				/**
				* Helper to calculate recent post slider height
				*
				* @since 7.0
				*/
				function recentPostSliderHeight() {

					$('.nectar-recent-posts-slider').each(function () {

						var $minHeight   = 250,
						$definedHeight   = parseInt($(this).attr('data-height')),
						dif              = ($('body[data-ext-responsive="true"]').length > 0) ? $window.width() / 1400 : $window.width() / 1100,
						$sliderSelectors = $(this).find('.nectar-recent-post-slide, .flickity-viewport');

						if (nectarDOMInfo.winW > 1000 && $('#boxed').length == 0) {

							if ($(this).parents('.full-width-content').length == 0) {

								if ($('body[data-ext-responsive="true"]').length > 0 && nectarDOMInfo.winW >= 1400) {
									$sliderSelectors.css('height', Math.ceil($definedHeight));
								} else if ($('body[data-ext-responsive="true"]').length == 0 && nectarDOMInfo.winW >= 1100) {
									$sliderSelectors.css('height', Math.ceil($definedHeight));
								} else {
									$sliderSelectors.css('height', Math.ceil($definedHeight * dif));
								}

							} else {
								$sliderSelectors.css('height', Math.ceil($definedHeight * dif));
							}

						} else {

							// Column sliders
							var $parentCol = ($(this).parents('.wpb_column').length > 0) ? $(this).parents('.wpb_column') : $(this).parents('.col');

							if ($parentCol.length == 0) {
								$parentCol = $('.main-content');
							}

							if (!$parentCol.hasClass('vc_span12') &&
							!$parentCol.hasClass('main-content') &&
							!$parentCol.hasClass('span_12') &&
							!$parentCol.hasClass('vc_col-sm-12')) {

								var $parentColWidth = sliderColumnDesktopWidth($parentCol),
								$aspectRatio 				= $definedHeight / $parentColWidth;

								// Min height
								if ($aspectRatio * $parentCol.width() <= $minHeight) {
									$sliderSelectors.css('height', $minHeight);
								} else {
									$sliderSelectors.css('height', $aspectRatio * $parentCol.width());
								}

							}

							// Regular
							else {

								// Min height
								if ($definedHeight * dif <= $minHeight) {
									$sliderSelectors.css('height', $minHeight);
								} else {
									$sliderSelectors.css('height', Math.ceil($definedHeight * dif));
								}

							}

						}

					});

				}


				function sliderColumnDesktopWidth(parentCol) {

					var $parentColWidth = 1100,
					$columnNumberParsed = $(parentCol).attr('class').match(/\d+/);

					if ($columnNumberParsed == '2') {
						$parentColWidth = 170
					} else if ($columnNumberParsed == '3') {
						$parentColWidth = 260
					} else if ($columnNumberParsed == '4') {
						$parentColWidth = 340
					} else if ($columnNumberParsed == '6') {
						$parentColWidth = 530
					} else if ($columnNumberParsed == '8') {
						$parentColWidth = 700
					} else if ($columnNumberParsed == '9') {
						$parentColWidth = 805
					} else if ($columnNumberParsed == '10') {
						$parentColWidth = 916.3
					} else if ($columnNumberParsed == '12') {
						$parentColWidth = 1100
					}

					return $parentColWidth;
				}


				/**
				* Spit text into separate lines to animate in
				*
				* @since 7.0
				*/

				function splitLineText() {
					$('.nectar-recent-posts-single_featured.multiple_featured').each(function () {

						var $slideClass = ($(this).find('.project-slides').length > 0) ? '.project-slide' : '.nectar-recent-post-slide',
						$slideInfoClass = ($(this).find('.project-slides').length > 0) ? '.project-info h1' : '.inner-wrap h2 a';

						$(this).find($slideClass).each(function () {

							$(this).find($slideInfoClass).each(function () {

								var textArr = $(this).text();
								textArr = textArr.trim();
								textArr = textArr.split(' ');

								$(this)[0].innerHTML = '';

								for (var i = 0; i < textArr.length; i++) {
									$(this)[0].innerHTML += '<span>' + textArr[i] + '</span> ';
								}

							});

							$(this).find($slideInfoClass + ' > span').wrapInner('<span class="inner" />');

						});

					});

				}


				/**
				* Spit text into separate lines to animate in
				*
				* @since 7.0
				*/

				function splitLineHeadingMarkup() {

					$('.nectar-split-heading[data-animation-type="line-reveal-by-space"]').each(function () {

						var animatedClass = ( $(this).hasClass('animated-in') ) ? ' animated' : '';

						$(this).find('> *').each(function () {

							var textArr = $(this).text();
							textArr = textArr.trim();
							textArr = textArr.split(' ');

							$(this)[0].innerHTML = '';

							for (var i = 0; i < textArr.length; i++) {
								$(this)[0].innerHTML += '<span><span class="inner'+animatedClass+'">' + textArr[i] + '</span></span> ';
							}

						});

						$(this).addClass('markup-generated');

					});

					$('.nectar-split-heading[data-animation-type="letter-fade-reveal"]').each(function () {


						$(this).find('> *').each(function () {

							var textArr = $(this).text();
							textArr = textArr.trim();
							textArr = textArr.split(' ');

							$(this)[0].innerHTML = '';

							for (var i = 0; i < textArr.length; i++) {
								$(this)[0].innerHTML += '<span>' + textArr[i] + '</span> ';
							}

						});


						$(this).find('span').each(function () {

							var $this = $(this);
							var textArr = $(this).text().split('');

							$this.empty();

							$.each(textArr, function (i, el) {
								$this.append("<span>" + el + "</span");
							});

						});

						$(this).addClass('markup-generated');

					});

				}

				function splitLineHeadingInit() {

					if( $('.nectar-split-heading[data-animation-type="line-reveal-by-space"]').length > 0 || $('.nectar-split-heading[data-animation-type="letter-fade-reveal"]').length > 0 ) {
						// Generate markup.
						splitLineHeadingMarkup();
					}

				}


				/**
				* Create recent post sliders
				*
				* @since 7.0
				*/
				function recentPostsFlickityInit() {


					if ($('.nectar-recent-posts-slider-inner').length > 0) {

						var $rpFGroupCells = ($('.nectar-recent-posts-slider_multiple_visible').length > 0) ? '90%' : false;

						var $rpF = $('.nectar-recent-posts-slider-inner').flickity({
							contain: true,
							groupCells: $rpFGroupCells,
							draggable: true,
							lazyLoad: false,
							imagesLoaded: true,
							percentPosition: true,
							prevNextButtons: false,
							pageDots: true,
							resize: true,
							setGallerySize: true,
							wrapAround: true,
							accessibility: false
						});

						setTimeout(function () {
							$('.nectar-recent-posts-slider-inner').addClass('loaded');
						}, 1150);
						var flkty = $rpF.data('flickity');

						$rpF.on('dragStart.flickity', function () {
							$('.flickity-viewport').addClass('is-moving');
						});

						$rpF.on('dragEnd.flickity', function () {
							$('.flickity-viewport').removeClass('is-moving');
						});

						var $dragTimeout;

						$rpF.on('select.flickity', function () {

							$('.flickity-viewport').addClass('no-hover');
							clearTimeout($dragTimeout);
							$dragTimeout = setTimeout(function () {
								$('.flickity-viewport').removeClass('no-hover');
							}, 400);

						});

						recentPostSliderHeight();
						$window.on('resize', recentPostSliderHeight);

						if (!nectarDOMInfo.usingMobileBrowser && !nectarDOMInfo.usingFrontEndEditor) {
							$window.on('resize', recentPostSliderParallaxMargins);
						}


					}



					// Multiple featured controls
					function multipleLargeFeaturedInit() {
						$('.nectar-recent-posts-single_featured.multiple_featured').each(function (sliderIndex) {

							if ($(this).find('> .normal-container').length > 0) {
								$(this).find('> .normal-container').remove();
							}

							$(this).append('<div class="normal-container container"> <ul class="controls" data-color="' + $(this).attr('data-button-color') + '" data-num="' + $(this).find('.nectar-recent-post-slide').length + '"></ul> </div>');
							var $that = $(this);
							var tallestFeaturedSlide = 0;
							var $slideClickTimeout;

							// Store instance
							$nectarCustomSliderRotate[sliderIndex] = {
								autorotate: ''
							};

							$(this).find('.nectar-recent-post-slide').each(function (i) {

								if ($(this).find('.recent-post-container').height() > tallestFeaturedSlide) {
									$(this).siblings().removeClass('tallest');
									$(this).addClass('tallest');
									tallestFeaturedSlide = $(this).find('.recent-post-container').height();
								}

								var $activeClass = (i == 0 && $(this).parents('.nectar-recent-posts-single_featured.multiple_featured[data-autorotate="none"]').length > 0) ? 'class="active"' : '';
								$that.find('.controls').append('<li ' + $activeClass + '><span class="title">' + $(this).find('h2').text() + '</span></li>');
							});

							$(this).addClass('js-loaded');


							// Click event
							$(this).find('.controls li').on('click', function (e) {

								if ($(this).hasClass('active')) {
									return;
								}

								if (e.originalEvent !== undefined) {
									$(this).parent().find('.active').addClass('trans-out');
								}

								var $index = $(this).index(),
								$oldIndex  = $(this).parent().find('.active').index(),
								$that      = $(this);

								clearTimeout($slideClickTimeout);

								$(this).siblings().removeClass('active');
								$(this).addClass('active');

								$slideClickTimeout = setTimeout(function () {

									$that.parents('.multiple_featured')
										.find('.nectar-recent-post-slide:not(:eq(' + $index + '))')
										.css('opacity', '0')
										.removeClass('active');

									$that.parent()
										.find('.trans-out')
										.removeClass('trans-out');

								}, 300);

								$that.parents('.multiple_featured')
									.find('.nectar-recent-post-slide:not(:eq(' + $index + '))')
									.css('z-index', '10');

								$that.parents('.multiple_featured')
									.find('.nectar-recent-post-slide:eq(' + $oldIndex + ')')
									.css('z-index', '15');

								$(this).parents('.multiple_featured').find('.nectar-recent-post-slide').eq($index).css({
									'opacity': '1',
									'z-index': '20'
								}).addClass('active');

								if ($(this).parents('.multiple_featured').attr('data-autorotate') != 'none') {
									nectarCustomSliderResetRotate($that.parents('.nectar-recent-posts-single_featured.multiple_featured'), sliderIndex);
								}
							});


							// Autorotate
							$that = $(this);

							if ($(this).attr('data-autorotate').length > 0 &&
							$(this).attr('data-autorotate') != 'none' &&
							$('body.vc_editor').length == 0) {

								setTimeout(function () {
									var slide_interval = (parseInt($that.attr('data-autorotate')) < 100) ? 4000 : parseInt($that.attr('data-autorotate'));

									$nectarCustomSliderRotate[sliderIndex].autorotate = setInterval(function () {
										nectarCustomSliderRotate($that)
									}, slide_interval);

									// Set first active class
									$that
										.find('.controls > li:first-child')
										.addClass('active');

								}, 30);

							}

						});

						splitLineText();
						$window.on('resize', splitLineText);

					}

					multipleLargeFeaturedInit();

				}



				/**
				* Default recent post slider parallax RAF loop.
				*
				* @since 7.0
				*/
				function recentPostSliderParallax() {

					$('.nectar-recent-posts-slider').each(function () {

						var $offset        = parseInt($(this).find('.flickity-slider').position().left),
						$slides            = $(this).find('.nectar-recent-post-slide'),
						$slideLength       = $slides.length,
						$slideWidth        = $slides.width(),
						$lastChildIndex    = $(this).find('.nectar-recent-post-slide:last-child').index(),
						$slideFirstChildBG =	$(this).find('.nectar-recent-post-slide:first-child .nectar-recent-post-bg'),
						$slideLastChildBG  = $(this).find('.nectar-recent-post-slide:last-child .nectar-recent-post-bg');

						// First going to last
						if ($offset >= -3) {
							$slideLastChildBG.css('margin-left', parseInt(Math.ceil($slideWidth / 3.5)) + 'px');
						} else {
							$slideLastChildBG.css('margin-left', '-' + parseInt(Math.ceil($slideWidth / 3.5 * $lastChildIndex)) + 'px');
						}

						// Last going to first
						if (Math.abs($offset) >= ($slideLength - 1) * $slideWidth) {
							$slideFirstChildBG.css('margin-left', '-' + parseInt(Math.ceil(($slideWidth / 3.5) * $slideLength)) + 'px');
						} else {
							$slideFirstChildBG.css('margin-left', '0px');
						}

						$(this)
							.find('.nectar-recent-post-bg')
							.css('transform', 'translateX(' + Math.ceil($(this).find('.flickity-slider').position().left / -3.5) + 'px)');

					});

					requestAnimationFrame(recentPostSliderParallax);

				}

				/**
				* Default recent post slider margin calculations.
				*
				* @since 7.0
				*/
				function recentPostSliderParallaxMargins() {

					$('.nectar-recent-posts-slider').each(function () {

						var $slideWidth = $(this).find('.nectar-recent-post-slide').width();

						$(this).find('.nectar-recent-post-slide').each(function (i) {
							$(this).find('.nectar-recent-post-bg').css('margin-left', '-' + parseInt(Math.ceil($slideWidth / 3.5) * i) + 'px');
						});

					});

				}



				/**
				* Initialize all recent post elements.
				*
				* @since 7.0
				*/
				function recentPostsInit() {

					// Start flickity based sliders.
					recentPostsFlickityInit();


					// Classic enhanced specific
					$('.blog-recent[data-style="classic_enhanced_alt"] .inner-wrap').each(function () {
						$(this).find('.post-featured-img').each(function () {
							var $src = $(this).find('img').attr('src');
							$(this).css('background-image', 'url(' + $src + ')');
						});
					});

					$('.blog-recent[data-style="classic_enhanced"]').each(function () {
						if ($(this).find('.inner-wrap.has-post-thumbnail').length == 0) {
							$(this).addClass('no-thumbs');
						}
					});

					// Regular recent posts slider.
					if (!nectarDOMInfo.usingMobileBrowser) {
						if ($('.nectar-recent-posts-slider').length > 0 && !nectarDOMInfo.usingFrontEndEditor) {
							window.requestAnimationFrame(recentPostSliderParallax);
						}
					}

					if (!nectarDOMInfo.usingMobileBrowser && !nectarDOMInfo.usingFrontEndEditor) {
						recentPostSliderParallaxMargins();
					}

				}




				/**
				* Parallax on mousemove effect
				*
				* @since 10.5
				*/
				function parallaxItemHoverEffect() {

					//change sizer pos
					$('.style-5').each(function () {
						$(this)
							.find('.sizer')
							.insertBefore($(this).find('.parallaxImg'));
					});

					// Set parent zindex
					$('.style-5')
						.parents('.wpb_row')
						.css('z-index', '100');

					var d           = document,
					bd              = d.getElementsByTagName('body')[0],
					win             = window,
					imgs            = d.querySelectorAll('.parallaxImg'),
					totalImgs       = imgs.length,
					supportsTouch   = 'ontouchstart' in win || navigator.msMaxTouchPoints,
					lazyLoadedItems = false;

					if (totalImgs <= 0) {
						return;
					}

					// Build HTML
					for (var l = 0; l < totalImgs; l++) {

						var thisImg = imgs[l],
						layerElems = thisImg.querySelectorAll('.parallaxImg-layer'),
						totalLayerElems = layerElems.length;

						if (totalLayerElems <= 0) {
							continue;
						}

						while (thisImg.firstChild) {
							thisImg.removeChild(thisImg.firstChild);
						}

						var lastMove = 0;

						//throttle performance old browsers
						var eventThrottle = 80;
						if ( navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge/") < 1 ) {
							eventThrottle = 1;
							$('html').addClass('cssreflections');
						} else {
							$body.addClass('cssreflections');
						}

						var containerHTML = d.createElement('div'),
						shineHTML = d.createElement('div'),
						shadowHTML = d.createElement('div'),
						layersHTML = d.createElement('div'),
						layers = [];

						thisImg.id = 'parallaxImg__' + l;
						containerHTML.className = 'parallaxImg-container';
						shadowHTML.className = 'parallaxImg-shadow';
						layersHTML.className = 'parallaxImg-layers';

						for (var i = 0; i < totalLayerElems; i++) {

							var layer = d.createElement('div'),
							layerInner = d.createElement('div'),
							imgSrc = layerElems[i].getAttribute('data-img');

							$(layer).html($(layerElems[i]).html());
							layer.className = 'parallaxImg-rendered-layer';
							layer.setAttribute('data-layer', i);

							if (i == 0 && $(thisImg).parents('.wpb_gallery').length == 0) {
								layerInner.className = 'bg-img';

								if( $(thisImg).parents('.nectar-fancy-box').length > 0 ) {
									layerInner.setAttribute('data-nectar-img-src', imgSrc);
									lazyLoadedItems = true;
								} else {
									layerInner.style.backgroundImage = 'url(' + imgSrc + ')';
								}
								layer.appendChild(layerInner);
							}
							layersHTML.appendChild(layer);

							layers.push(layer);
						}


						containerHTML.appendChild(layersHTML);
						thisImg.appendChild(containerHTML);
						$(thisImg).wrap('<div class="parallaxImg-wrap" />');
						if (!(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) {
							$(thisImg).parent().append(shadowHTML);
						}

						if (supportsTouch && $('body.using-mobile-browser').length > 0) {
							// Stop processing.
						} else {
							(function (_thisImg, _layers, _totalLayers, _shine) {
								$(thisImg).parents('.style-5').on('mousemove', function (e) {

									var parentEl = $(this);
									var parallaxContainer = parentEl.find('.parallaxImg-container');
									var parallaxShad = parentEl.find('.parallaxImg-shadow');

									var now = Date.now();

									var usingGallery = ($(_thisImg).parents('.wpb_gallery').length > 0) ? true : false;

									if (now > lastMove + eventThrottle) {
										lastMove = now;
										window.requestAnimationFrame(function () {
											processMovement(e, false, _thisImg, _layers, _totalLayers, _shine, parentEl, parallaxContainer, parallaxShad, usingGallery);
										});
									}


								});
								$(thisImg).parents('.style-5').on('mouseenter', function (e) {
									processEnter(e, _thisImg, _layers, _totalLayers, _shine);
								});
								$(thisImg).parents('.style-5').on('mouseleave', function (e) {
									processExit(e, _thisImg, _layers, _totalLayers, _shine);
								});
							})(thisImg, layers, totalLayerElems, shineHTML);
						}

						// Set the depths
						(function (_thisImg, _layers, _totalLayers, _shine) {
							depths(false, _thisImg, _layers, _totalLayers, _shine);
							window.addEventListener('resize', function () {
								depths(false, _thisImg, _layers, _totalLayers, _shine);
							});
						})(thisImg, layers, totalLayerElems, shineHTML);
					}

					if( lazyLoadedItems ) {
						nectarLazyImageLoading();
					}

					function processMovement(e, touchEnabled, elem, layers, totalLayers, shine, parentEl, parallaxContainer, parallaxShad, usingGal) {

						// Stop raf if exit already called
						if (!$(elem.firstChild).hasClass('over')) {
							processExit(e, elem, layers, totalLayers, shine);
							return false
						}

						// Set up multipliers
						var yMult = 0.03;
						var xMult = 0.063;

						var scaleAmount = '1.03';
						var offsetAmount = '-10';
						var usingMasonrySize = false;

						if ($(elem).parents('.col.wide').length > 0) {
							yMult = 0.03;
							xMult = 0.063;
							usingMasonrySize = true;
						} else if ($(elem).parents('.col.regular').length > 0 || $(elem).parents('.wpb_gallery').length > 0) {
							yMult = 0.045;
							xMult = 0.045;
						} else if ($(elem).parents('.col.tall').length > 0) {
							yMult = 0.05;
							xMult = 0.015;
							usingMasonrySize = true;
						} else if ($(elem).parents('.col.wide_tall').length > 0) {
							yMult = 0.04;
							xMult = 0.04;
							usingMasonrySize = true;
						} else if (parentEl.hasClass('nectar-fancy-box')) {
							yMult = 0.045;
							xMult = 0.022;
							scaleAmount = '1.06';
							offsetAmount = '-2';
						} else {
							yMult = 0.045;
							xMult = 0.075;
						}

						var bdst = nectarDOMInfo.scrollTop,
						bdsl = 0,
						pageX = (touchEnabled) ? e.touches[0].pageX : e.pageX,
						pageY = (touchEnabled) ? e.touches[0].pageY : e.pageY,
						offsets = elem.getBoundingClientRect(),
						w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
						h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
						wMultiple = 320 / w,
						offsetX = 0.52 - (pageX - offsets.left - bdsl) / w,
						offsetY = 0.52 - (pageY - offsets.top - bdst) / h,
						dy = (pageY - offsets.top - bdst) - h / 2,
						dx = (pageX - offsets.left - bdsl) - w / 2,
						yRotate = (offsetX - dx) * (yMult * wMultiple),
						xRotate = (dy - offsetY) * (xMult * wMultiple);

						var imgCSS;

						if (usingGal == true) {
							imgCSS = ' perspective(' + w * 3 + 'px) rotateX(' + -xRotate * 1.9 + 'deg) rotateY(' + -yRotate * 1.3 + 'deg)';
						} else {

							if (usingMasonrySize == false) {
								imgCSS = ' perspective(' + w * 3 + 'px) rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)  translateY(' + offsetY * offsetAmount + 'px) translateX(' + offsetX * offsetAmount + 'px) scale(' + scaleAmount + ')';
							} else {
								imgCSS = ' perspective(' + w * 3 + 'px) rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)  translateY(' + offsetY * -10 + 'px) translateX(' + offsetX * -10 + 'px) scale(1.013)';
							}

						}


						// Container transform
						parallaxContainer.css('transform', imgCSS);

						if (!(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) {
							parallaxShad.css('transform', imgCSS);
						}


					}


					function processEnter(e, elem) {

						elem.firstChild.className += ' over';
						elem.className += ' over';

						$(elem).addClass('transition');

						if ($(elem).parents('.wpb_gallery').length > 0) {
							setTimeout(function () {
								$(elem).removeClass('transition');
							}, 450);
						} else {
							setTimeout(function () {
								$(elem).removeClass('transition');
							}, 200);
						}

					}


					function processExit(e, elem) {

						var w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth;
						var container = elem.firstChild;

						container.className = container.className.replace(' over', '');
						elem.className = elem.className.replace(' over', '');
						$(container).css('transform', 'perspective(' + w * 3 + 'px) rotateX(0deg) rotateY(0deg) translateZ(0)');
						$(elem).parents('.parallaxImg-wrap').find('.parallaxImg-shadow').css('transform', 'perspective(' + w * 3 + 'px) rotateX(0deg) rotateY(0deg) translateZ(0)');

						$(elem).addClass('transition');
						setTimeout(function () {
							$(elem).removeClass('transition');
						}, 200);

					}


					function depths(touchEnabled, elem, layers, totalLayers) {

						var w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth;
						var container = elem.firstChild;

						// Set z
						for (var ly = 0; ly < totalLayers; ly++) {
							if (ly == 0) {
								$(layers[ly]).css('transform', 'translateZ(0px)');
							}
							else {
								$(layers[ly]).css('transform', 'translateZ(' + (w * 3) / 27 * (ly * 1.1) + 'px) ');
							}

						}

						totalLayers = totalLayers + 3;

						// Set perspective from beginning
						$(container).css('transform', 'perspective(' + w * 3 + 'px)');

					}

				}


				/**
				* Fancy Box
				*
				* @since 11.0
				*/
				function nectarFancyBoxHover() {

					if( $('.nectar-fancy-box[data-style="hover_desc"]').length == 0 ) {
						return false;
					}

					var $hoverContentHeight = 0;

					$('body').on('mouseenter touchstart','.nectar-fancy-box[data-style="hover_desc"]', function() {
						$hoverContentHeight = parseInt($(this).find('.hover-content').outerHeight(true));
						$(this).addClass('hovered');
						$(this).find('.heading-wrap').css('transform','translateY(-'+ $hoverContentHeight +'px)');
					});

					$('body').on('mouseleave touchend','.nectar-fancy-box[data-style="hover_desc"]', function() {
						$(this).removeClass('hovered');
						$(this).find('.heading-wrap').css('transform','translateY(0)');
					});

				}



				/**
				* Mouse Follow Icon
				*
				* @since 11.0
				*/
				function NectarMouseFollowIcon(el,iconSelector) {

					this.$el = el;
					this.$iconEl = this.$el.find(iconSelector);

					this.elX = 0;
					this.elY = 0;

					this.initialX = this.$el.width() / 2;
					this.initialY = this.$el.height() / 2;

					this.elX = 0;
					this.elY = 0;

					this.lastScroll = 0;
					this.scrollAdjust = 0;

					this.lastX = this.initialX;
					this.lastY = this.initialY;
					this.activeFollow = false;

					this.percentage = 0.13;
					this.percentageTimeout;

					$window.on('resize', this.resizeEvent.bind(this));
					this.mouseEvents();
					this.rafLoop();

				}

				NectarMouseFollowIcon.prototype.resizeEvent = function() {
					this.initialX = this.$el.width() / 2;
					this.initialY = this.$el.height() / 2;
				};

				NectarMouseFollowIcon.prototype.mouseEvents = function() {

					var that = this;

					that.$el.on('mouseenter', function(e) {

						that.activeFollow = true;

						that.elX = e.offsetX;
						that.elY = e.offsetY;

						that.lastScroll = 0;

						clearTimeout(that.percentageTimeout);
						that.percentageTimeout = setTimeout(function(){
							that.percentage = 0.2;
						},700);
					});

					that.$el.on('mouseleave', function() {

						that.activeFollow = false;
						that.lastScroll = 0;

						clearTimeout(that.percentageTimeout);
						that.percentage = 0.13;
					});

					that.$el.on('mousemove', function(e){
						that.elX = e.offsetX;
						that.elY = e.offsetY;
						that.lastScroll = 0;
					});

					$(window).on('scroll',function() {
						if( that.activeFollow == true && that.lastScroll == 0) {
							that.lastScroll = nectarDOMInfo.scrollTop;
						}
					});

				};


				NectarMouseFollowIcon.prototype.rafLoop = function() {

					if( this.activeFollow == true ) {

						this.scrollAdjust = ( this.lastScroll > 0 ) ? nectarDOMInfo.scrollTop - this.lastScroll : 0;

						this.lastY = linearInterpolate(this.lastY, this.elY + this.scrollAdjust, this.percentage);
						this.lastX = linearInterpolate(this.lastX, this.elX, this.percentage);
					} else {
						this.lastY = linearInterpolate(this.lastY, this.initialY, 0.13);
						this.lastX = linearInterpolate(this.lastX, this.initialX, 0.13);
					}

					this.$iconEl.css({
						'transform': 'translateX(' + this.lastX + 'px) translateY(' + this.lastY + 'px)'
					});

					requestAnimationFrame(this.rafLoop.bind(this));

				};




				/**
				* Video Lightbox
				*
				* @since 11.0
				*/
				function nectarVideoLightbox() {

					iconMouseFollowArr = [];

					// Parent hover relationship.
					$body.on('mouseenter','.nectar_video_lightbox[data-parent-hover="1"]', function() {
						var $parentRow = $(this).parents('.wpb_row');
						$parentRow.find('> .row-bg-wrap .row-bg, > .nectar-video-wrap .nectar-video-inner').addClass('transition');
						$parentRow.find('> .row-bg-wrap .row-bg, > .nectar-video-wrap .nectar-video-inner').css({
							'transform' : 'scale(1.08)'
						});
					});

					$body.on('mouseleave','.nectar_video_lightbox[data-parent-hover="1"]', function() {
						var $parentRow = $(this).parents('.wpb_row');
						$parentRow.find('> .row-bg-wrap .row-bg, > .nectar-video-wrap .nectar-video-inner').css({
							'transform' : 'scale(1)'
						});
					});

					// Mouse Indicator.
					$('.nectar-video-box').each(function(i){

						if( $(this).find('.play_button_mouse_follow') ) {

							var $that = $(this);

							$(this).imagesLoaded(function () {

								// Follow mouse.
								if( !nectarDOMInfo.usingMobileBrowser ) {
									iconMouseFollowArr[i] = new NectarMouseFollowIcon($that, '.play_button_mouse_follow');
								}

								// Initial setup.
								var $playColor = ( $that.is('[data-mouse-icon-color]') && $that.attr('data-mouse-icon-color').length > 0 ) ? $that.attr('data-mouse-icon-color') : '#000';

								if( $that.is('[data-mouse-style="solid_color"]') ) {

									$that.find('.play_button_mouse_follow').css({
											'background-color': $playColor
									});
								}

								$that.find('.play_button_mouse_follow').addClass('visible');

							});

						}

					});

				}



				/**
				* Salient slider rotation
				*
				* @since 10.5
				*/
				function nectarCustomSliderRotate(slider) {

					if ($('body.vc_editor').length > 0) {
						return;
					}

					var $controlSelector = (slider.find('.project-slides').length > 0) ? '.dot-nav > span' : '.controls > li',
					$controlSelectorInd  = (slider.find('.project-slides').length > 0) ? 'span' : ' li',
					$slideLength         = slider.find($controlSelector).length,
					$currentSlide        = slider.find($controlSelector + '.active').index();

					if ($currentSlide + 1 == $slideLength) {
						slider.find($controlSelector + ':first-child').trigger('click');
					} else {
						slider.find($controlSelector + '.active').next($controlSelectorInd).trigger('click');
					}
				}


				/**
				* Salient slider rotation reset
				*
				* @since 10.5
				*/
				function nectarCustomSliderResetRotate(slider, index) {
					clearInterval($nectarCustomSliderRotate[index].autorotate);

					// Reinit autorotate
					if (slider.attr('data-autorotate').length > 0) {
						var slide_interval = (parseInt(slider.attr('data-autorotate')) < 100) ? 4000 : parseInt(slider.attr('data-autorotate'));
						$nectarCustomSliderRotate[index].autorotate = setInterval(function () {
							nectarCustomSliderRotate(slider)
						}, slide_interval);
					}
				}



				/**
				* Fullscreen recent project slider
				*
				* @since 10.5
				*/
				function fsProjectSliderInit() {

					$fsProjectSliderArr = [];

					if (typeof SalientRecentProjectsFullScreen === 'undefined') {
						return;
					}

					$('.nectar_fullscreen_zoom_recent_projects').each(function (i) {
						$fsProjectSliderArr[i] = new SalientRecentProjectsFullScreen($(this));
					});

				}





				/**
				* Portfolio single template sticky sidebar
				*
				* @since 6.0
				*/
				function portfolioSidebarFollow() {

					var sidebarFollow = $('.single-portfolio #sidebar').attr('data-follow-on-scroll');

					if ($('body.single-portfolio').length == 0 || $('#sidebar[data-follow-on-scroll]').length == 0) {
						return;
					}

					sidebarFollow = $('.single-portfolio #sidebar').attr('data-follow-on-scroll');

					if (sidebarFollow == 1 &&
						!$body.hasClass('mobile') &&
						parseInt($('#sidebar').height()) + 50 <= parseInt($('.post-area').height())) {

						//padding from top of screen
						var $ssExtraTopSpace = 50;

						if ($('#header-outer[data-remove-fixed="0"]').length > 0 &&
						$('body[data-hhun="1"]').length == 0) {

							$ssExtraTopSpace += $headerOuterEl.outerHeight();

							// Resize effect
							if ($('#header-outer[data-shrink-num][data-header-resize="1"]').length > 0) {
								var headerPadding2 = parseInt($headerOuterEl.attr('data-padding')) - parseInt($headerOuterEl.attr('data-padding')) / 1.8;
								$ssExtraTopSpace -= logoShrinkNum;
								$ssExtraTopSpace -= headerPadding2;
							}

							// Condense
							if ($('body.mobile').length == 0 && $('#header-outer[data-condense="true"]').length > 0) {

								var $headerSpan9 = $('#header-outer[data-format="centered-menu-bottom-bar"] header#top .span_9');

								$ssExtraTopSpace = 50;
								$ssExtraTopSpace += $headerOuterEl.height() - (parseInt($headerSpan9.position().top) - parseInt($('#header-outer #logo').css('margin-top'))) - parseInt(nectarDOMInfo.secondaryHeaderHeight);
							}

						}

						if ($wpAdminBar.length > 0) {
							$ssExtraTopSpace += $wpAdminBar.outerHeight();
						}


						$('.single-portfolio #sidebar').theiaStickySidebar({
							additionalMarginTop: $ssExtraTopSpace,
							updateSidebarHeight: false
						});


					}

				}





				/**
				* Infinite scroll pagination
				*
				* @since 6.0
				*/
				function infiniteScrollInit() {

					if ($('.infinite_scroll').length > 0) {

						// Portfolio
						$('.portfolio-items.infinite_scroll').infinitescroll({
							navSelector: "div#pagination",
							nextSelector: "div#pagination a:first",
							itemSelector: ".portfolio-items.infinite_scroll .element",
							finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
							msgText: " ",
						}, function (newElements) {


							var $container 	= $('.portfolio-items.infinite_scroll:not(.carousel)'),
							$newElems 			= $(newElements).css('opacity', 0);

							// Ensure that images load before adding to masonry layout
							$newElems.imagesLoaded(function () {

								$(newElements).css('opacity', 1);

								$container.isotope('appended', $(newElements));

								$(newElements).find('.work-item').addClass('ajax-loaded');
								$(newElements).addClass('ajax-loaded');

								// Show elems now they're ready
								$(newElements).find('.work-meta, .nectar-love-wrap').css({
									'opacity': 1
								});

								// Keep current filtering
								if ($('.portfolio-filters-inline').length > 0 || $('.portfolio-filters').length > 0) {

									var selector;

									if ($('.portfolio-filters-inline').length > 0) {
										selector = $('.portfolio-filters-inline a.active').attr('data-filter');
									} else {
										selector = $('.portfolio-filters a.active').attr('data-filter');
									}

									$('.portfolio-filters-inline a.active').attr('data-filter');
									$container.isotope({
										filter: selector
									});
								}

								// Set width
								for (var i = 0; i < $portfolio_containers.length; i++) {
									$portfolio_containers[i].reLayout();
								}

								if ($(newElements).find('.work-item.style-5').length > 0) {
									parallaxItemHoverEffect();
								}

								if ($(newElements).find('.inner-wrap').attr('data-animation') == 'none') {
									$('.portfolio-items .col .inner-wrap').removeClass('animated');
								} else {

									for (var i = 0; i < $portfolio_containers.length; i++) {
										$portfolio_containers[i].masonryZindex();
										$portfolio_containers[i].portfolioAccentColor();
									}

									$(newElements).each(function () {

										var $portfolioOffsetPos = ($('#nectar_fullscreen_rows').length > 0) ? '200%' : '90%';

										// Not already visible
										var $that = $(this);
										var waypoint = new Waypoint({
											element: $that,
											handler: function () {

												var $portfolioAnimationDelay = ($that.is('[data-masonry-type="photography"].masonry-items')) ? 85 : 115;

												setTimeout(function () {
													$that.addClass("animated-in");
												}, $portfolioAnimationDelay * $that.attr('data-delay-amount'));


												waypoint.destroy();
											},
											offset: $portfolioOffsetPos

										});


									});
								}


								// Lightbox reinit.
								$('.portfolio-items').each(function () {
									var $unique_id = uniqueIdGenerate();
									$(this).find('a[rel^="prettyPhoto"], a.pretty_photo').attr('rel', 'prettyPhoto[' + $unique_id + '_gal]').removeClass('pretty_photo');
								});


								$('.portfolio-items').each(function () {
									var $unique_id = uniqueIdGenerate();
									$(this).find('a[data-fancybox^="group_"]').attr('data-fancybox', 'group_' + $unique_id);
								});

								lightBoxInit();

								setTimeout(function () {

									for (var i = 0; i < $portfolio_containers.length; i++) {
										$portfolio_containers[i].masonryZindex();
										$portfolio_containers[i].reLayout();
										$portfolio_containers[i].isotopeCatSelection();
									}
									$(newElements).removeClass('ajax-loaded');
								}, 700);

								parallaxRowsBGCals();

							});


						});

						// Blog
						$('.post-area.infinite_scroll .posts-container').infinitescroll({
							navSelector: "div#pagination",
							nextSelector: "div#pagination a:first",
							itemSelector: ".post-area.infinite_scroll .posts-container .post",
							finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
							msgText: " "
						}, function (newElements) {

							if($(newElements).find('[data-nectar-img-src]').length > 0) {
								nectarLazyImageLoading();
							}

							// Only trigger recalc of waypoints and elements if needed.
							if ($('.masonry.classic').length > 0 ||
							    $('.post-area:not(.masonry):not(.featured_img_left)').length > 0 ||
									$('.post-area.standard-minimal').length > 0) {

								// Gallery.
								flexsliderInit();

								// Media players.
								if ($().mediaelementplayer) {
									$(newElements).find('.wp-audio-shortcode, .wp-video-shortcode').mediaelementplayer();
								}

								// Lightbox.
								lightBoxInit();

								// Carousels.
								if ($('.carousel').length > 0) {
									standardCarouselInit();
									clientsCarouselInit();
								}

								// Waypoints.
								waypoints();

								// Testimonial slider.
								$('.testimonial_slider').animate({
									'opacity': '1'
								}, 800);
								nectarTestimonialSliders();
								nectarTestimonialSlidersEvents();

								setTimeout(function () {
									responsiveVideoIframesInit();
									responsiveVideoIframes();
									$window.trigger('resize');
								}, 500);


								parallaxRowsBGCals();

								$window.trigger('resize');

							} // Non meta overlaid style.
							else {
								parallaxRowsBGCals();

								$window.trigger('resize');
							}

							// Trigger Masonry as a callback.
							var $container = $('.infinite_scroll .posts-container');
							if ($container.parent().hasClass('masonry')) {

								$(newElements).addClass('masonry-blog-item');


							} //if masonry.


							// Loading effect.

							//// hide new items while they are loading.
							var $newElems = $(newElements);
							//// ensure that images load before adding to masonry layout.

							if ($newElems.find('img').length == 0) {
								$newElems = $('body');
							}

							$newElems.imagesLoaded(function () {

								if ($container.parent().hasClass('masonry') &&
									!$container.parent().hasClass('auto_meta_overlaid_spaced')) {
									$container.isotope('appended', $(newElements));
								}

								for (var i = 0; i < $nectarMasonryBlogs.length; i++) {
									$nectarMasonryBlogs[i].flickityBlogInit();
								}

								$(newElements).addClass('ajax-loaded');
								// Show elems now they're ready.

								// Classic enhanced specific
								if ($container.parent().hasClass('classic_enhanced')) {
									$container.find('.large_featured.has-post-thumbnail.ajax-loaded .post-featured-img, .wide_tall.has-post-thumbnail.ajax-loaded .post-featured-img').each(function () {
										var $src = $(this).find('img').attr('src');
										$(this).css('background-image', 'url(' + $src + ')');
									});

									$container.find('.large_featured.ajax-loaded .nectar-flickity, .wide_tall.ajax-loaded .nectar-flickity').each(function () {

										$(this).find('.cell').each(function () {
											var $src = $(this).find('img').attr('src');
											$(this).css('background-image', 'url(' + $src + ')');
										});

									});
								}


								if ($(newElements).parents('.posts-container').attr('data-animation') == 'none') {
									$(newElements).find('.inner-wrap').removeClass('animated');
								} else {

									for (var i = 0; i < $nectarMasonryBlogs.length; i++) {
										$nectarMasonryBlogs[i].blogMasonryZindex();
									}

									$(newElements).each(function () {

										var $that = $(this);
										var waypoint = new Waypoint({

											element: $that,
											handler: function () {

												setTimeout(function () {
													$that.addClass("animated-in");
												}, 80 * $that.attr('data-delay-amount'));

												waypoint.destroy();
											},
											offset: '90%'

										});


									});
								}

								setTimeout(function () {
									$(newElements).removeClass('ajax-loaded');
								}, 700);


							});


						});

					}

				}






				/**
				* Scroll to top scroll bind.
				*
				* @since 2.0
				*/
				function toTopBind() {

					if ($('#to-top').length > 0 && $window.width() > 1020 ||
					$('#to-top').length > 0 && $('#to-top.mobile-enabled').length > 0) {

						if (nectarDOMInfo.scrollTop > 350) {
							$window.on('scroll', hideToTop);
						} else {
							$window.on('scroll', showToTop);
						}
					}

				}

				/**
				* Scroll to top show.
				*
				* @since 2.0
				*/
				function showToTop() {

					if (nectarDOMInfo.scrollTop > 350 && !$offCanvasEl.is('.fullscreen.open') ) {

						$('#to-top').stop().transition({
							'transform': 'translateY(-50%)'
						}, 350, 'easeInOutCubic');

						$window.off('scroll', showToTop);
						$window.on('scroll', hideToTop);
					}

				}


				/**
				* Scroll to top hide.
				*
				* @since 2.0
				*/
				function hideToTop() {

					if (nectarDOMInfo.scrollTop < 350 || $offCanvasEl.is('.fullscreen.open') ) {

						var $animationTiming = ($('#slide-out-widget-area.fullscreen.open').length > 0) ? 1150 : 350;

						$('#to-top').stop().transition({
							'transform': 'translateY(105%)'
						}, $animationTiming, 'easeInOutQuint');

						$window.off('scroll', hideToTop);
						$window.on('scroll', showToTop);

					}
				}


				/**
				* Scroll to top initialization.
				*
				* @since 10.5
				*/
				function scrollToTopInit() {

					// Show/hide based on scroll pos
					if ($('.nectar-social.fixed').length == 0) {
						toTopBind();
					}


					// Rounded style
					if ($('body[data-button-style*="rounded"]').length > 0) {
						var $clone = $('#to-top .fa-angle-up').clone();
						$clone.addClass('top-icon');
						$('#to-top').prepend($clone);
					}

					// Scroll up click event
					$body.on('click', '#to-top, a[href="#top"]', function () {
						$('body,html').stop().animate({
							scrollTop: 0
						}, 800, 'easeOutQuad', function () {
							if ($('.nectar-box-roll').length > 0) {
								$body.trigger('mousewheel', [1, 0, 0]);
							}
						});
						return false;
					});

				}









				/**
				* Scrollspy plugin initialization.
				*
				* @since 5.0
				*/
				function scrollSpyInit() {

					var $headerNavSpace = ($('body[data-header-format="left-header"]').length > 0 && $window.width() > 1000) ? 0 : $headerOuterEl.outerHeight();

					if ($('.page-template-template-no-header-footer').length > 0 || $('.page-template-template-no-header').length > 0) {
						$headerNavSpace = 0;
					}

					// Track whether scrollspy is really needed.
					var hashLinksFound = false;

					//prevent jump to top on empty items
					$('header#top .sf-menu li a[href="#"]').on('click', function (e) {
						e.preventDefault();
					});

					if ($('#nectar_fullscreen_rows').length == 0 || $nectarFullPage.$usingFullScreenRows == false) {

						$('a.nectar-next-section').each(function () {

							if ($(this).parents('.wpb_row:not(.inner_row)').length > 0) {

								var $parentRow = $(this).parents('.wpb_row:not(.inner_row)');

								if ($parentRow.next('.wpb_row[id]:not(.inner_row)').length > 0) {

									var $nextRowID = $parentRow.next('.wpb_row[id]:not(.inner_row)').attr('id');
									$(this).attr('href', '#' + $nextRowID);
									hashLinksFound = true;
								}

							}

						});
					}

					else if ($().fullpage) {
						$('a.nectar-next-section').on('click', function () {
							$.fn.fullpage.moveSectionDown();
							return false;
						});
					}


					// Links in off canvas menu.
					if ($('#slide-out-widget-area .off-canvas-menu-container').length > 0) {
						$('#slide-out-widget-area .off-canvas-menu-container').find("a[href*='" + location.pathname + "']").each(function () {

							var $href = $(this).attr('href');

							// Regular animated anchors.
							if ($href != '#' &&
							$href.indexOf("#") != -1 &&
							$href.substr($href.indexOf("#")) !== '#' &&
							$('div' + $href.substr($href.indexOf("#"))).length > 0) {

								$(this).attr('href', $href.substr($href.indexOf("#")));

								$(this).parent()
									.removeClass('current_page_item')
									.removeClass('current-menu-item');

							}

							// Fullpage is a little different.
							if ($('div[data-fullscreen-anchor-id="' + $href.substr($href.indexOf("#") + 1) + '"]').length > 0) {

								$(this).parent()
									.removeClass('current_page_item')
									.removeClass('current-menu-item');

							}

						});
					}

					// Links in header navigation.
					$("#header-outer").find("a[href*='" + location.pathname + "']").each(function () {

						var $href = $(this).attr('href');

						// Regular animated anchors
						if ($href.indexOf("#") != -1 &&
						$href.substr($href.indexOf("#")) !== '#' &&
						$('div' + $href.substr($href.indexOf("#"))).length > 0) {

							$(this).attr('href', $href.substr($href.indexOf("#")));
							$(this).parent()
								.removeClass('current_page_item')
								.removeClass('current-menu-item');

						}

						// Fullpage is a little different
						if ($('div[data-fullscreen-anchor-id="' + $href.substr($href.indexOf("#") + 1) + '"]').length > 0) {

							$(this).parent()
								.removeClass('current_page_item')
								.removeClass('current-menu-item');

						}

					});

					// Hash links in menu?
					if( $("#header-outer").length > 0 ) {
						$("#header-outer").find("a[href*='#']:not([href='#'])").each(function() {
							if( $(this).attr('href') !== '#' &&
							    $(this).attr('href') !== '#searchbox' &&
									$(this).attr('href') !== '#sidewidgetarea') {
								hashLinksFound = true;
							}
						});
					}

					if( $("#slide-out-widget-area .off-canvas-menu-container").length > 0 ) {
						$("#slide-out-widget-area .off-canvas-menu-container").find("a[href*='#']:not([href='#'])").each(function() {
							if( $(this).attr('href') !== '#' ) {
								hashLinksFound = true;
							}
						});
					}

					// Init scrollspy.
					var targetList = [];
					if( hashLinksFound == true ) {
						targetList.push('#header-outer nav');
					}
					if( $('.page-submenu[data-sticky="true"] a[href*="#"]').length > 0 ) {
						targetList.push('.page-submenu[data-sticky="true"]');
					}

					if( targetList.length > 0 ) {
						targetList.forEach(function(tar, i) {
							var $el = (i == 0) ? $body : $(window);
							$el.scrollspy({
								target: tar,
								offset: $headerNavSpace + nectarDOMInfo.adminBarHeight + 40
							});
						});
					}

				}




				/**
				* Called to scroll to hash link on page load
				*
				* @since 5.0
				*/
				function pageLoadHash() {

					var $hash = window.location.hash;

					if( $hash && $hash.length > 0 ) {
						$hash = $hash.replace(/<|>/g,'');
					}

					var $hashSubstrng   = ($hash && $hash.length > 0) ? $hash.substring(1, $hash.length) : 0,
					headerPadding2      = headerPadding - headerPadding / 1.8,
					$hasSlashLength     = 0;


					// If the hash has slashes
					if ($hashSubstrng) {
						$hasSlashLength = $hashSubstrng.split("/");
						$hasSlashLength = $hasSlashLength.length;
					}

					if ($hashSubstrng && $hasSlashLength > 1) {
						$hashSubstrng = $hashSubstrng.replace(/\//g, "");
						$hash         = $hash.replace(/\//g, "");
					}

					if ($hash && $('.main-content').find($hash).length > 0 ||
					$hash && $('.main-content').find('[data-fullscreen-anchor-id="' + $hashSubstrng + '"]').length > 0) {

						var $hashObj    = ($('.main-content').find($hash).length > 0) ? $('.main-content').find($hash) : $('.main-content').find('[data-fullscreen-anchor-id="' + $hashSubstrng + '"]'),
						$headerNavSpace = ($('body[data-header-format="left-header"]').length > 0 && $window.width() > 1000) ? 0 : $('#header-space').outerHeight();

						if ($('.page-template-template-no-header-footer').length > 0 || $('.page-template-template-no-header').length > 0) {
							$headerNavSpace = 0;
						}

						var $timeoutVar = 100;

						if ($('.nectar-box-roll').length > 0 && $('.container-wrap.bottomBoxOut').length > 0) {
							nectarBoxRoll.boxRoll(null, -1);
							$timeoutVar = 2050;
						}

						setTimeout(function () {

							var $scrollTopDistance;

							if ($('body[data-permanent-transparent="1"]').length == 0) {

								if (!$body.hasClass('mobile')) {
									var $resize = ($('#header-outer[data-header-resize="0"]').length > 0) ? 0 : parseInt(logoShrinkNum) + headerPadding2 * 2;
									if ($('#header-outer[data-remove-fixed="1"]').length > 0) {
										$headerNavSpace = 0;
									}
									$scrollTopDistance = $hashObj.offset().top - parseInt($headerNavSpace) + $resize + 3 - nectarDOMInfo.adminBarHeight;


									// Condense
									if ($('body.mobile').length == 0 &&
									    $('#header-outer[data-condense="true"]').length > 0 &&
											$('body.page-template-template-no-header').length === 0 &&
										  $('body.page-template-template-no-header-footer').length === 0) {

											var $headerSpan9       = $('#header-outer[data-format="centered-menu-bottom-bar"] header#top .span_9'),
											$headerHeightStored    = $headerOuterEl.height(),
											$headerHeightCondensed = $headerHeightStored - (parseInt($headerSpan9.height()) + parseInt($('#header-outer #logo').css('margin-top')));

											$scrollTopDistance = $hashObj.offset().top - parseInt($headerNavSpace) + $headerHeightCondensed - nectarDOMInfo.adminBarHeight;
									}

								} else {
									$scrollTopDistance = ($('#header-outer[data-mobile-fixed="1"]').length > 0) ? $hashObj.offset().top + 2 - $headerNavSpace + nectarDOMInfo.adminBarHeight : $hashObj.offset().top - nectarDOMInfo.adminBarHeight + 1;
								}

							} else {
								$scrollTopDistance = $hashObj.offset().top - nectarDOMInfo.adminBarHeight + 1;
							}

							if ($('body[data-hhun="1"]').length > 0 && $('#header-outer[data-remove-fixed="1"]').length == 0) {

								// Alter offset
								if ($('#header-outer.detached').length == 0) {
									$scrollTopDistance = $scrollTopDistance + $headerNavSpace;
								}
							}

							var $pageSubMenu = ($('.page-submenu[data-sticky="true"]').length > 0) ? $('.page-submenu').height() : 0;
							var $headerSecondary;

							if ($('body.material').length > 0 &&
								$headerSecondaryEl.length > 0 &&
								$('body[data-hhun="1"]').length == 0 &&
								$('#header-outer[data-remove-fixed="1"]').length == 0 &&
								!$body.hasClass('mobile')) {

								$headerSecondary = $headerSecondaryEl.height();

							} else {
								$headerSecondary = 0;
							}

							nectar_scrollToY($scrollTopDistance - $pageSubMenu + $headerSecondary, 700, 'easeInOutQuint');

						}, $timeoutVar);
					}
				}


				/**
				* Initialize page load hash functionality
				*
				* @since 10.5
				*/
				function pageLoadHashInit() {

					if ($('body[data-animated-anchors="true"]').length > 0) {
						if ($('.nectar-box-roll').length == 0 && $('#nectar_fullscreen_rows').length == 0) {

							// Inside tabs
							if (typeof nectarGetQueryParam['tab'] != 'undefined') {
								setTimeout(function () {
									pageLoadHash();
								}, 800);
							}
							// Regular
							else {
								pageLoadHash();
							}

						}

						if ($('#nectar_fullscreen_rows[data-mobile-disable="on"]').length > 0 && $('.nectar-box-roll').length == 0 &&
						nectarDOMInfo.usingMobileBrowser) {
							pageLoadHash();
						}

					}

				}


				/**
				* Animated anchor link theme option.
				*
				* @since 10.5
				*/
				function animatedAnchorLinks() {

					if ($('body[data-animated-anchors="true"]').length > 0 ||
					$('.single-product [data-gallery-style="left_thumb_sticky"]').length > 0) {

						var headerPadding2 = headerPadding - headerPadding / 1.8;

						setTimeout(scrollSpyInit, 200);

						var $animatedScrollingTimeout;

						$body.on('click', '#header-outer nav .sf-menu a, #footer-outer .nectar-button, #footer-outer .widget_nav_menu a, #mobile-menu li a, .nectar-scrolling-tabs .scrolling-tab-nav a, .container-wrap a:not(.wpb_tabs_nav a):not(.woocommerce-checkout a):not(.um-woo-view-order):not(.magnific):not([data-fancybox]):not(.woocommerce-tabs .tabs a):not(.slider-prev):not(.slider-next):not(.testimonial-next-prev a):not(.page-numbers), .swiper-slide .button a, #slide-out-widget-area a, #slide-out-widget-area .inner div a', function (e) {

							var triggerAnimatedScroll = true;
							var $hash = $(this).prop("hash");

							if( !$(this).hasClass('nectar-next-section') && headerHideUntilNeeded == '1' ) {
								$body.addClass('animated-scrolling');
								nectarState.animatedScrolling = true;
							}

							clearTimeout($animatedScrollingTimeout);

							$animatedScrollingTimeout = setTimeout(function () {
								$body.removeClass('animated-scrolling');
								nectarState.animatedScrolling = false;
							}, 850);

							var $headerNavSpace = ($('body[data-header-format="left-header"]').length > 0 && $window.width() > 1000) ? 0 : $('#header-space').outerHeight();

							if ($('.page-template-template-no-header-footer').length > 0 ||
							    $('.page-template-template-no-header').length > 0 ||
									$('#header-space').length == 0 ) {
								$headerNavSpace = 0;
							}

							// Delay full page anchors until material right OCM closes
							if (  $nectarFullPage.$usingFullScreenRows != false &&
								    $('#nectar_fullscreen_rows[data-anchors="on"]').length > 0 &&
										$hash && $hash != '' && $hash != '#top' &&
								    $('body.material[data-slide-out-widget-area-style="slide-out-from-right"].material-ocm-open').length > 0) {

										e.preventDefault();

										if (!$(this).hasClass('skip-hash')) {
											if (history.pushState) {
												history.pushState(null, null, $hash);
											} else {
												location.hash = $hash;
											}

										}

										setTimeout(function() {
												$(window).trigger('hashchange');
										},800);

							}


							if ($hash && $body.find($hash).length > 0 && $hash != '#top' && $hash != '' && $(this).attr('href').indexOf(window.location.href.split("#")[0]) !== -1 ||
							$(this).is('[href^="#"]') && $hash != '' && $body.find($hash).length > 0 && $hash != '#top') {

								//update hash
								if (!$(this).hasClass('skip-hash')) {
									if (history.pushState) {
										history.pushState(null, null, $hash);
									} else {
										location.hash = $hash;
									}
								}

								if ($(this).parents('ul').length > 0) {

									$(this)
										.parents('ul')
										.find('li')
										.removeClass('current-menu-item');
								}

								// Side widget area click
								if ($(this).parents('#slide-out-widget-area').length > 0) {

									if ($('body.material[data-slide-out-widget-area-style="slide-out-from-right"].material-ocm-open').length > 0) {

										$('body > .slide_out_area_close')
											.addClass('non-human-allowed')
											.trigger('click');

										// Scroll
										var $clickedLinkStore = $(this);

										triggerAnimatedScroll = false;

										setTimeout(function () {
											$clickedLinkStore.trigger('click');
										}, 1000);

									} else {
										$('#slide-out-widget-area .slide_out_area_close')
											.addClass('non-human-allowed')
											.trigger('click');
									}

									setTimeout(function () {
										if ($('body.material[data-slide-out-widget-area-style="slide-out-from-right"]').length > 0) {
											$('body > .slide_out_area_close').removeClass('non-human-allowed');

										} else {
											$('#slide-out-widget-area .slide_out_area_close').removeClass('non-human-allowed');
										}
									}, 100);
								}

								// Mobile menu click
								if ( $(this).parents('#mobile-menu').length > 0 ) {
									$('.slide-out-widget-area-toggle.mobile-icon a')
										.addClass('non-human-allowed')
										.trigger('click');

										setTimeout(function () {
												$('.slide-out-widget-area-toggle.mobile-icon a').removeClass('non-human-allowed');
										}, 100);
								}

								var $mobileMenuHeight = ($(this).parents('#mobile-menu').length > 0) ? $(this).parents('#mobile-menu').height() : null;
								var $timeoutVar       = 1;
								var $that             = $(this);

								if ($('.nectar-box-roll').length > 0 && $('.container-wrap.bottomBoxOut').length > 0) {
									nectarBoxRoll.boxRoll(null, -1);
									$timeoutVar = 2050;
								}


								setTimeout(function () {

									var $scrollTopDistance;

									// Scrolling
									if ($('body[data-permanent-transparent="1"]').length == 0) {

										if (!$body.hasClass('mobile')) {
											var $resize = ($('#header-outer[data-header-resize="0"]').length > 0) ? 0 : parseInt(logoShrinkNum) + headerPadding2 * 2;
											if ($('#header-outer[data-remove-fixed="1"]').length > 0) {
												$headerNavSpace = 0;
											}

											$scrollTopDistance = $($hash).offset().top - $mobileMenuHeight - parseInt($headerNavSpace) + $resize + 3 - nectarDOMInfo.adminBarHeight;

											// Condense
											if ($('body.mobile').length == 0 &&
											$('body.page-template-template-no-header').length === 0 &&
											$('body.page-template-template-no-header-footer').length === 0 &&
											$('#header-outer[data-condense="true"]').length > 0) {

												var $headerSpan9       = $('#header-outer[data-format="centered-menu-bottom-bar"] header#top .span_9'),
												$headerHeightStored    = $headerOuterEl.height(),
												$headerHeightCondensed = $headerHeightStored - (parseInt($headerSpan9.height()) + parseInt($('#header-outer #logo').css('margin-top')));
												$scrollTopDistance     = $($hash).offset().top - parseInt($headerNavSpace) + $headerHeightCondensed - nectarDOMInfo.adminBarHeight;


											}


										} else {
											$scrollTopDistance = ($('#header-outer[data-mobile-fixed="1"]').length > 0) ? $($hash).offset().top + 2 - $headerNavSpace + nectarDOMInfo.adminBarHeight : $($hash).offset().top - $mobileMenuHeight - nectarDOMInfo.adminBarHeight + 1;
										}

									} else {
										$scrollTopDistance = $($hash).offset().top - nectarDOMInfo.adminBarHeight + 1;
									}

									if ($('body[data-hhun="1"]').length > 0 && $('#header-outer[data-remove-fixed="1"]').length == 0) {

										// Alter offset
										if ($('#header-outer.detached').length == 0 || $that.parents('.page-submenu[data-sticky="true"]').length > 0) {
											$scrollTopDistance = $scrollTopDistance + $headerNavSpace;
										}

										// Hide top header
										if ($that.parents('.page-submenu[data-sticky="true"]').length > 0) {

											$('#header-outer.detached').addClass('invisible');
											$('.page-submenu')
												.addClass('header-not-visible')
												.css('transform', 'translateY(0px)');

										}
									}

									var $pageSubMenu = ($that.parents('.page-submenu[data-sticky="true"]').length > 0) ? $that.parents('.page-submenu').height() : 0;
									var $headerSecondary;

									if ($('body.material').length > 0 &&
										$headerSecondaryEl.length > 0 &&
										$('body[data-hhun="1"]').length == 0 &&
										$('#header-outer[data-remove-fixed="1"]').length == 0 &&
										!$body.hasClass('mobile')) {

										$headerSecondary = $headerSecondaryEl.height();

									} else {

										if($('body[data-hhun="1"]').length > 0 &&
											$headerSecondaryEl.length > 0 &&
											!$body.hasClass('mobile') &&
											$('#header-outer[data-remove-fixed="1"]').length == 0) {
											$headerSecondary = $headerSecondaryEl.height();
										} else {
											$headerSecondary = 0;
										}

									}


									if( triggerAnimatedScroll ) {
										nectar_scrollToY($scrollTopDistance - $pageSubMenu + $headerSecondary, 700, 'easeInOutQuint');
									}


								}, $timeoutVar);

								e.preventDefault();

							}

							if ($hash == '#top') {
								// Side widget area click
								if ($(this).parents('#slide-out-widget-area').length > 0) {
									$('#slide-out-widget-area .slide_out_area_close').trigger('click');
								}
							}

						});


					}

				}






				/**
				* Search results masonry layout.
				*
				* @since 10.0
				*/
				function searchResultMasonry() {

					var $searchContainer = $('#search-results'),
					$dividerNum          = ($searchContainer.is('[data-layout="masonry-no-sidebar"]')) ? 4 : 3;

					$searchContainer.imagesLoaded(function () {

						$searchContainer.isotope({
							itemSelector: '.result',
							layoutMode: 'packery',
							packery: {
								gutter: 0
							}
						});

						$searchContainer
							.find('article')
							.css('opacity', '1');

					});

					$window.on('resize', function () {

						$searchContainer.isotope({
							layoutMode: 'packery',
							packery: {
								gutter: 0
							}
						});
					});

				}


				/**
				* Search results masonry layout initialization.
				*
				* @since 10.5
				*/
				function searchResultMasonryInit() {
					if ($('body.search-results').length > 0 &&
					$('#search-results article').length > 0 &&
					$('#search-results[data-layout="list-no-sidebar"]').length == 0 &&
				  $('#search-results[data-layout="list-with-sidebar"]').length == 0) {
						searchResultMasonry();
					}
				}




				/**
				* Custom colors for portfolio grid elements.
				*
				* @since 10.5
				*/
				function portfolioCustomColoring() {

					//portfolio colors
					if ($('.portfolio-items .col .style-3-alt').length > 0 ||
					$('.portfolio-items .col .style-3').length > 0 ||
					$('.portfolio-items .col .style-2').length > 0 ||
					$('.portfolio-items .col .style-5').length > 0) {

						var portfolioColorCss = '';

						$('.portfolio-items .col').each(function () {

							var $titleColor = $(this).attr('data-title-color'),
							$subTitleColor  = $(this).attr('data-subtitle-color');

							if ($titleColor.length > 0) {
								portfolioColorCss += '.col[data-title-color="' + $titleColor + '"] .vert-center h3, .portfolio-items[data-ps="6"] .col[data-title-color="' + $titleColor + '"] .work-meta h4 { color: ' + $titleColor + '!important; } ';
								portfolioColorCss += ' .portfolio-items[data-ps="8"] .col[data-title-color="' + $titleColor + '"] .line { background-color: ' + $titleColor + '; }';
								portfolioColorCss += '.portfolio-items[data-ps="8"] .col[data-title-color="' + $titleColor + '"] .next-arrow line { stroke: ' + $titleColor + '; } ';
							}
							if ($subTitleColor.length > 0) {
								portfolioColorCss += '.col[data-subtitle-color="' + $subTitleColor + '"] .vert-center p, .portfolio-items[data-ps="6"] .col[data-title-color="' + $titleColor + '"] .work-meta p { color: ' + $subTitleColor + '!important; } ';
							}

						});

						//style
						nectarCreateStyle(portfolioColorCss, 'nectar-portfolio-colors');

					}

				}




				/**
				* Single post pagination/recent post mouse events
				*
				* @since 10.5
				*/
				function postMouseEvents() {


					$body.on('mouseover', '.post-area.featured_img_left .grav-wrap .text a, .masonry.material .masonry-blog-item .grav-wrap .text a, .blog-recent[data-style="material"] .grav-wrap .text a', function () {
						$(this).parents('.grav-wrap')
							.find('img')
							.addClass('hovered');
					});

					$body.on('mouseleave', '.post-area.featured_img_left .grav-wrap .text a, .masonry.material .masonry-blog-item .grav-wrap .text a, .blog-recent[data-style="material"] .grav-wrap .text a', function () {
						$(this).parents('.grav-wrap')
							.find('img')
							.removeClass('hovered');
					});

					$body.on('mouseleave', '.container-wrap[data-nav-pos="after_project_2"] #portfolio-nav ul li, .blog_next_prev_buttons[data-style="fullwidth_next_prev"] ul li', function () {
						$(this).addClass('mouse-leaving');
					});

				}




				/**
				* Masonry portfolio initialization.
				*
				* @since 10.5
				*/
				function masonryPortfolioInit() {

					$portfolio_containers = [];

					var portfolioElCount = 0;

					$('.portfolio-items:not(.carousel)').each(function(i) {

						if( $(this).parents('.wpb_gallery').length > 0 && $(this).find('.nectar-lazy').length > 0 ) {

						  $(this).find('.col').each(function(i) {
								$(this).delay(90*i).queue(function(next){
									$(this).addClass("animated-in");
									next();
								});
							});

							return true;
						}

						$(this).attr('instance', i);
						$(this).parent().parent().find('div[class^=portfolio-filters]').attr('instance', i);

						if (typeof SalientPortfolio !== 'undefined') {
							$portfolio_containers[portfolioElCount] = new SalientPortfolio($(this), fullWidthContentColumns);
							portfolioElCount++;
						}

					});

				}




				/**
				* Perspective load in styling.
				*
				* @since 8.0
				*/
				function updatePerspectiveOrigin() {

						if( nectarDOMInfo.winW > 690 ) {
							$('.posts-container[data-load-animation="perspective"]').css('perspective-origin', '50% ' + (nectarDOMInfo.scrollTop + nectarDOMInfo.winH) + 'px');
						}
						requestAnimationFrame(updatePerspectiveOrigin);

				}


				/**
				* Perspective load in styling.
				*
				* @since 8.0
				*/
				function updatePerspectiveOriginInit() {

					if ($('.posts-container[data-load-animation="perspective"]').length > 0) {
						requestAnimationFrame(updatePerspectiveOrigin);
					}

				}



				/**
				* Blog load in animation.
				*
				* @since 3.0
				*/
				function blogLoadIn(post_container) {

					if (post_container.attr('data-load-animation') == 'none') {

						post_container
							.find('.inner-wrap')
							.removeClass('animated');

					} else {

						post_container.find('article').each(function (i) {

							// Loaded visible
							if ($(this).visible(true)) {

								$(this).delay(110 * i).queue(function (next) {
									$(this).addClass("animated-in");
									next();
								});


							} else {

								// Not already visible
								var $that    = $(this);
								var waypoint = new Waypoint({

									element: $that,
									handler: function () {

										setTimeout(function () {
											$that.addClass("animated-in");
										}, 80 * $that.attr('data-delay-amount'));

										waypoint.destroy();
									},
									offset: '90%'

								});
							}

						});

					}

				}


				/**
				* Masonry blog initialization.
				*
				* @since 10.5
				*/
				function masonryBlogInit() {

					$nectarMasonryBlogs = [];

					$('.posts-container').each(function (i) {

						if ($(this).parent().hasClass('masonry') && !$(this).parent().hasClass('auto_meta_overlaid_spaced')) {

							if (typeof NectarMasonryBlog == 'undefined') {
								return;
							}

							$nectarMasonryBlogs[i] = new NectarMasonryBlog($(this), fullWidthSections, blogLoadIn);

						} else {

							blogLoadIn($(this));

						}

					});
				}



				/**
				* Sticky Sidebar initialization.
				*
				* @since 10.5
				*/
				function stickySidebarInit() {

					if (!$().theiaStickySidebar || nectarDOMInfo.usingMobileBrowser && nectarDOMInfo.winW < 1000 ) {
						return;
					}

					var stickySelectors = '#sidebar[data-nectar-ss="true"], #sidebar[data-nectar-ss="1"], .nectar-scrolling-tabs .scrolling-tab-nav';
					if( window.nectarOptions && window.nectarOptions.woo_sticky_sidebar && window.nectarOptions.woo_sticky_sidebar === '1' ) {
						stickySelectors += ', .woocommerce.archive #sidebar';
					}

					$(stickySelectors).each(function () {

						// Padding from top of screen
						var $ssExtraTopSpace = 50;

						if ($('#header-outer[data-remove-fixed="0"]').length > 0 &&
						$('body[data-hhun="1"]').length == 0 &&
						$('#header-outer[data-format="left-header"]').length == 0) {

							$ssExtraTopSpace += $headerOuterEl.outerHeight();

							// Resize effect
							if ($('#header-outer[data-shrink-num][data-header-resize="1"]').length > 0) {
								var headerPadding2 = parseInt($headerOuterEl.attr('data-padding')) - parseInt($headerOuterEl.attr('data-padding')) / 1.8;
								$ssExtraTopSpace -= logoShrinkNum;
								$ssExtraTopSpace -= headerPadding2;
							}

							// Condense
							if ($('body.mobile').length == 0 && $('#header-outer[data-condense="true"]').length > 0) {

								var $headerSpan9 = $('#header-outer[data-format="centered-menu-bottom-bar"] header#top .span_9');
								$ssExtraTopSpace = 50;
								$ssExtraTopSpace += $headerOuterEl.height() - (parseInt($headerSpan9.position().top) - parseInt($('#header-outer #logo').css('margin-top'))) - parseInt(nectarDOMInfo.secondaryHeaderHeight);
							}

						}

						if ($wpAdminBar.length > 0) {
							$ssExtraTopSpace += $wpAdminBar.outerHeight();
						}


						if ($(this).parents('.wpb_widgetised_column').length > 0) {

							if ($('body.vc_editor').length > 0) {
								// Skip processing.
							} else {
								$(this).parents('.wpb_column').theiaStickySidebar({
									additionalMarginTop: $ssExtraTopSpace,
									updateSidebarHeight: false
								});
							}

						} else {
							$(this).theiaStickySidebar({
								additionalMarginTop: $ssExtraTopSpace,
								updateSidebarHeight: false
							});
						}

					});
				}





				/**
				* Section down arrow animated link
				*
				* @since 10.5
				*/
				function sectionDownArrowEvent() {

					var headerPadding2 = headerPadding - headerPadding / 1.8;

					$body.on('click', '.section-down-arrow, .scroll-down-wrap > .minimal-arrow', function () {

						if ($(this).parents('.nectar-box-roll').length > 0) {
							return false;
						}

						var $currentSection = $(this).parents('#page-header-bg'),
						$topDistance        = $currentSection.height(),
						$offset             = ($currentSection.parents('.first-section').length == 0 || $('body[data-transparent-header="false"]').length > 0) ? $currentSection.offset().top : 0,
						$bodyBorderSize     = ($bodyBorderTop.length > 0 && $window.width() > 1000) ? $bodyBorderTop.height() : 0,
						$headerNavSpace     = ($('body[data-header-format="left-header"]').length > 0) ? 0 : $('#header-space').height(),
						$materialSecondary  = 0;

						if ($('body.material').length > 0 && $headerSecondaryEl.length > 0) {
							$materialSecondary = $headerSecondaryEl.height();
						}

						if ($('body[data-permanent-transparent="1"]').length == 0) {

							// Regular
							if (!$body.hasClass('mobile')) {

								if ($('body[data-hhun="1"]').length > 0 && $('#header-outer[data-remove-fixed="1"]').length == 0) {

									nectar_scrollToY(parseInt($topDistance) + $offset + 2 - $bodyBorderSize * 2, 700, 'easeInOutQuint');

								} else {

									var $resize = ($('#header-outer[data-header-resize="0"]').length > 0) ? 0 : parseInt(logoShrinkNum) + headerPadding2 * 2;
									if ($('#header-outer[data-remove-fixed="1"]').length > 0) {
										$headerNavSpace = 0;
										$offset = 0;
									}

									// Condense
									if ($('body.mobile').length == 0 && $('#header-outer[data-condense="true"]').length > 0) {
										var $headerSpan9 = $('#header-outer[data-format="centered-menu-bottom-bar"] header#top .span_9');
										$headerNavSpace = $headerOuterEl.height() - (parseInt($headerSpan9.position().top) - parseInt($('#header-outer #logo').css('margin-top'))) - parseInt(nectarDOMInfo.secondaryHeaderHeight);
									}

									nectar_scrollToY(parseInt($topDistance - $headerNavSpace) + $resize + 3 + $offset + $materialSecondary, 700, 'easeInOutQuint');

								}

							} else {

								var $scrollPos;

								if($('#header-outer[data-mobile-fixed="1"]').length > 0) {
									$scrollPos = parseInt($topDistance) - $headerNavSpace + parseInt($currentSection.offset().top) + 2;
								} else {
									$scrollPos = parseInt($topDistance) + parseInt($currentSection.offset().top) + 2;
								}

								nectar_scrollToY($scrollPos - $bodyBorderSize * 2, 700, 'easeInOutQuint');

							}

						} else {
							// Permanent transparent
							nectar_scrollToY(parseInt($topDistance) + parseInt($currentSection.offset().top) + 2 - $bodyBorderSize * 2, 700, 'easeInOutQuint');

						}
						return false;
					});

				}





				/**
				* Displace filter column/row BG effect - fullpage
				*
				* @since 10.5
				*/
				function nectarLiquidBGFP() {

					$('.nectar-liquid-bg').removeClass('animated-in');

					for (var k = 0; k < $liquidBG_EL.length; k++) {

						if ($liquidBG_EL[k].animationType == 'displace-filter-fade' && $($liquidBG_EL[k].canvasContainer).parents('.fp-section.active').length > 0) {

							//add bg to container
							if ($($liquidBG_EL[k].canvasContainer).find('.image-added-to-stage').length == 0) {
								$liquidBG_EL[k].imgContainer.addChild($liquidBG_EL[k].bg);
							}

							$($liquidBG_EL[k].canvasContainer)
								.find('.nectar-liquid-bg')
								.addClass('image-added-to-stage');

							$liquidBG_EL[k].animateProps($liquidBG_EL[k]);

						}
					}
				}


				/**
				* Page Full Screen Rows
				*
				* @since 10.5
				*/
				function nectarFullPageInit() {

					if ($('#nectar_fullscreen_rows').length > 0 && $().fullpage) {

						$fullscreenSelector = (window.vc_iframe) ? '.vc_element.vc_vc_row.active ' : '.wpb_row.active ';

						var $disableFPonMobile = ($('#nectar_fullscreen_rows[data-mobile-disable]').length > 0) ? $('#nectar_fullscreen_rows').attr('data-mobile-disable') : 'off';
						if( !nectarDOMInfo.usingMobileBrowser ) {
							$disableFPonMobile = 'off';
						}
						// Support for mobile animation theme option.
						if( $disableFPonMobile != 'on' ) {
							$fullscreenMarkupBool = true;
						} else {
							$fullscreenSelector = '';
						}

						$nectarFullPage = new NectarFullScreenRows(waypoints, $mouseParallaxScenes, nectarLiquidBGFP, nectarDOMInfo, responsiveTooltips, $standAnimatedColTimeout, $svgIcons);

					}

				}




				/**
				* Cross browser adjustments.
				*
				* @since 1.0
				*/
				function crossBrowserAdjust() {

					// Add specific class if on device for better tablet tracking.
					if (nectarDOMInfo.usingMobileBrowser) {
						$body.addClass('using-mobile-browser');
					}

					// Add class for old IE.
					var ua = window.navigator.userAgent;
					var msie = ua.indexOf("Edge/");
					if (msie > 0) {
						$body.addClass('msie');
					}

					// For users updating to 8 with a custom, old header template file
					if ($('html.js').length == 0) {
						$('html').removeClass('no-js').addClass('js');
					}

					//remove br's from code tag
					$('code').find('br').remove();

					// Contact form 7.
					$('.wpcf7-form p:has(input[type=submit])').css('padding-bottom', '0px');

					$('.full-width-content .wpcf7-submit').on('click', function () {
						setTimeout(function () {
							fullWidthContentColumns();
						}, 1000);
						setTimeout(function () {
							fullWidthContentColumns();
						}, 2000);
					});

					// Gravity form inside fw content row
					$('.gform_body').on('click', function () {
						setTimeout(function () {
							fullWidthContentColumns();
						}, 200);
					});

					// Popup Maker.
					$('.pum.pum-theme-salient-page-builder-optimized button.pum-close').wrapInner('<span />');

					// pum inside fspr
					if ($('#nectar_fullscreen_rows').length > 0 &&
					$('.pum-container .pum-content > .wpb_row .full-page-inner > .container > .span_12').length > 0) {
						$('.pum-container .pum-content > .wpb_row .full-page-inner > .container > .span_12').unwrap();
					}

					// Blog bottom padding
					if ($('.single .blog_next_prev_buttons').length > 0) {
						$('.container-wrap').css('padding-bottom', 0);
					}

					// Remove margin on last cols inside of full width sections
					$('.full-width-section').each(function () {
						$(this).find('> .span_12 > div.col_last').last().css('margin-bottom', '0');
					});

					// Remove boxed style from full width content
					$('.full-width-content .col.boxed').removeClass('boxed');

					// Neg marg z-index adjust
					$('.wpb_column.neg-marg').parents('.wpb_row').css('z-index', '110');

					// Using full width section shortcode with WPBakery columns.
					$('.wpb_row.legacy').each(function(){
						if( $(this).find('.wpb_column').length > 0 ) {
							$(this).removeClass('legacy');
						}
					});

				}




				//vc col mobile fixes
				function vcMobileColumns() {

						$('.wpb_row').each(function () {
							if (typeof $(this).find('.span_12').offset() != 'undefined') {

								$(this).find('[class*="vc_col-"]').each(function () {

									var $firstChildOffset = $(this).parents('.span_12').offset().left;

									$(this).removeClass('no-left-margin');

									if ($(this).offset().left < $firstChildOffset + 27) {
										$(this).addClass('no-left-margin');
									} else {
										$(this).removeClass('no-left-margin');
									}
								});
							}
						});
				}

				function vcMobileColumnsInit() {

					var $winDOMWidth   = nectarDOMInfo.winW,
					$winDOMHeight      = nectarDOMInfo.winH,
					$orientChangeTrack = 0;

					// Only needed in legacy column setups.
					if( $body.is('[data-flex-cols="true"]') ) {
						return;
					}

					if ($('[class*="vc_col-xs-"], [class*="vc_col-md-"], [class*="vc_col-lg-"]').length > 0) {

						// Trigger immediately.
						vcMobileColumns();

						// Resize.
						if( !nectarDOMInfo.usingMobileBrowser ) {
							// Bind normally for desktop.
							$window.on('resize',vcMobileColumns);
						}
						else {

							// For mobile make sure the orientation has changed.
							window.addEventListener("orientationchange", function () {
								$orientChangeTrack = 1;
							});

							$window.on('resize', function () {

								if (($window.width() != $winDOMWidth && $window.height != $winDOMHeight) || $orientChangeTrack === 1) {

									vcMobileColumns();

									// Store the current window dimensions.
									$winDOMWidth  = nectarDOMInfo.winW;
									$winDOMHeight = nectarDOMInfo.winH;

									// Reset orientation change tracker.
									$orientChangeTrack = 0;
								}

							});


						} // end mobile only.

					} // endif vc offset cols found.


				}




				/**
				* Select2 plugin initialization.
				*
				* @since 5.0
				*/
				function select2Init() {

					$('select:not(.state_select):not(.country_select):not(.comment-form-rating #rating):not(#tribe-bar-form select):not(.woocommerce-currency-switcher):not(.nectar-custom-product-attr select)').each(function () {

						// Prevent search from triggering on small devices.
						var $minimumToSearch = ( nectarDOMInfo.winW > 690 ) ? 7 : 200;

						// Skip search class
						if( $(this).hasClass('skip-select2-search') || $(this).parents('.skip-select2-search').length > 0 ) {
							$minimumToSearch = 1000;
						}

						if ($(this).parents('#buddypress').length == 0) {

							var woo_product_dropdown_style = (window.nectarOptions && window.nectarOptions.woo_product_variable_select ) ? window.nectarOptions.woo_product_variable_select : 'default';

							// Default.
							var select2OptionsObj = {
								minimumResultsForSearch: $minimumToSearch,
								width: '100%'
							};

							// Inline scenario els
							if( woo_product_dropdown_style == 'underline' ||
							   $(this).parents('.woocommerce-ordering').length > 0 ) {

									 select2OptionsObj = {
										 minimumResultsForSearch: $minimumToSearch,
 										 dropdownParent: $(this).parent(),
 										 dropdownAutoWidth: true
	 								};

							}

							$(this).select2(select2OptionsObj);

						}

					});
				}


				/**
				* Fancy select styling theme option.
				*
				* @since 10.5
				*/
				function fancySelectStyling() {

					if ( $('body[data-fancy-form-rcs="1"]').length > 0 ) {

						$('select:not(.comment-form-rating #rating)').each(function () {

							var $selector;

							//cf7
							if ($(this).parents('.wpcf7-form-control-wrap').length > 0) {

								//select 2 already initialized
								if ($(this).parents('.wpcf7-form-control-wrap').find('.select2-container').length > 0) {
									$selector = $($(this).prev('.select2-container'));
								} else {
									$selector = $(this);
								}

								//if label is found
								if ($selector.parents('.wpcf7-form-control-wrap').parent().find('label').length == 1) {
									$selector.parents('.wpcf7-form-control-wrap').parent().wrapInner('<div class="fancy-select-wrap" />');
								} else {
									//default wrap
									$selector.wrap('<div class="fancy-select-wrap" />');
								}
							}
							//default
							else {

								//select 2 already initialized
								if ($(this).prev('.select2-container').length > 0) {
									$selector = $(this).prev('.select2-container');
								} else {
									$selector = $(this);
								}

								if ($(this).parents('#buddypress').length == 0 && $(this).parents('.widget_categories').length == 0) {
									//if label is found
									if ($selector.prev('label').length == 1) {
										$selector.prev('label').andSelf().wrapAll('<div class="fancy-select-wrap" />');
									} else if ($selector.next('label').length == 1) {
										$selector.next('label').andSelf().wrapAll('<div class="fancy-select-wrap" />');
									} else {
										//default wrap
										$selector.wrap('<div class="fancy-select-wrap" />');
									}
								}

							}
						});

						select2Init();

					}

				}





				/**
				* Back/Forward Safari cache assist.
				*
				* @since 10.5
				*/
				function bfCacheAssist() {

					//Back/forward cache OCM close
					if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 ||
					navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {

						window.onpageshow = function (event) {

							if (event.persisted) {

								// Play video BGs
								$('.nectar-video-wrap, .nectar-slider-wrap .swiper-slide .video-wrap').each(function () {

									if ($(this).find('video').length > 0) {
										$(this).find('video')[0].play();
									}

								});


								// Close mobile nav

								//// Material Skin.
								if ($('body.material-ocm-open').length > 0) {
									$('body > .slide_out_area_close').addClass('non-human-allowed').trigger('click');

									setTimeout(function () {
										$('body > .slide_out_area_close').removeClass('non-human-allowed');
									}, 100);

								} else if ($('#slide-out-widget-area.slide-out-from-right-hover.open').length > 0 && navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
									OCM_mobileSlideOutRightHoverCloseCheck();
								}
								// Others
								else if ($('#slide-out-widget-area.fullscreen.open').length > 0 ||
								$('#slide-out-widget-area.fullscreen-alt.open').length > 0 ||
								$('#slide-out-widget-area.slide-out-from-right.open').length > 0) {

									$('#slide-out-widget-area .slide_out_area_close').addClass('non-human-allowed');
									$('.slide-out-widget-area-toggle:not(.std-menu) a.open')
										.addClass('non-human-allowed')
										.trigger('click');

									setTimeout(function () {
										$('#slide-out-widget-area .slide_out_area_close').removeClass('non-human-allowed');
									}, 100);

								}

							} // Loaded from bf cache

						}; // onpage show

					}

				}






				/*-------------------------------------------------------------------------*/
				/*	WPBakery Frontend Editor
				/*-------------------------------------------------------------------------*/

				/**
				* Control adjustments
				*
				* @since 10.0
				*/
				function addRowCtrls() {

					//remove padding for rows with only fullwidth ns
					$('.wpb_row').removeClass('only-ns');

					$('.nectar-slider-wrap[data-full-width="true"], .page-submenu, .portfolio-items[data-col-num="elastic"]:not(.fullwidth-constrained), .blog-fullwidth-wrap')
						.parents('.wpb_row')
						.addClass('only-ns');

					//padding when column contains item that could get lost under column controls
					$('body.vc_editor.compose-mode .wpb_row .vc_vc_column > .wpb_column > .vc_column-inner').each(function() {

						if ($(this).find('> .vc_element-container > div').length > 0) {

							if ($(this).find('> .vc_element-container > div:first-child').is('.vc_vc_row_inner')) {
								$(this).find('> .vc_element-container > div:first-child').addClass('first-inner-row-el');
							} else {
								$(this).find('> .vc_element-container > div:first-child').removeClass('first-inner-row-el');
							}

						}

					});

				} //addRowCtrl end


				/**
				* Convert front end padding
				*
				* Needed when the flexbox grid is not active due to
				* different markup in front end page builder view.
				*
				* @since 10.0
				*/
				function convertFrontEndPadding() {

					$('.vc_element > .wpb_column[class*="padding-"][class*="-percent"]').each(function() {

						var $elPaddingPercent = 4;

						var elclassName = this.className.match(/padding-\d+/);
						if (elclassName) {
							$elPaddingPercent = elclassName[0].match(/\d+/);
							if ($elPaddingPercent) {
								$elPaddingPercent = $elPaddingPercent[0] / 100;
							} else {
								$elPaddingPercent = 0;
							}
						}

						if ($elPaddingPercent) {
							var $parentRowWidth = $(this).parents('.span_12').width();

							if ($(this).is('[data-padding-pos="all"]')) {
								$(this).css('padding', $parentRowWidth * $elPaddingPercent);
							} else if ($(this).is('[data-padding-pos="top"]')) {
								$(this).css('padding-top', $parentRowWidth * $elPaddingPercent);
							} else if ($(this).is('[data-padding-pos="bottom"]')) {
								$(this).css('padding-bottom', $parentRowWidth * $elPaddingPercent);
							} else if ($(this).is('[data-padding-pos="left"]')) {
								$(this).css('padding-left', $parentRowWidth * $elPaddingPercent);
							} else if ($(this).is('[data-padding-pos="right"]')) {
								$(this).css('padding-right', $parentRowWidth * $elPaddingPercent);
							} else if ($(this).is('[data-padding-pos="top-bottom"]')) {
								$(this).css({
									'padding-top': $parentRowWidth * $elPaddingPercent,
									'padding-bottom': $parentRowWidth * $elPaddingPercent,
								});
							} else if ($(this).is('[data-padding-pos="top-right"]')) {
								$(this).css({
									'padding-top': $parentRowWidth * $elPaddingPercent,
									'padding-right': $parentRowWidth * $elPaddingPercent,
								});
							} else if ($(this).is('[data-padding-pos="bottom-right"]')) {
								$(this).css({
									'padding-right': $parentRowWidth * $elPaddingPercent,
									'padding-bottom': $parentRowWidth * $elPaddingPercent,
								});
							} else if ($(this).is('[data-padding-pos="bottom-left"]')) {
								$(this).css({
									'padding-left': $parentRowWidth * $elPaddingPercent,
									'padding-bottom': $parentRowWidth * $elPaddingPercent,
								});
							} else if ($(this).is('[data-padding-pos="left-right"]')) {
								$(this).css({
									'padding-left': $parentRowWidth * $elPaddingPercent,
									'padding-right': $parentRowWidth * $elPaddingPercent,
								});
							}
						}

					});

					$('.wpb_row[class*="vc_custom_"]').each(function() {

						$(this).parent().addClass('no-bottom-margin');

					});

				}


				/**
				* WPBakery Front end editor integration
				*
				* @since 10.0
				*/
				function wpBakeryFrontendInit() {

					// Set up controls/column padding.
					setTimeout(function() {

						if ($('body.compose-mode').length > 0) {
							$('.container-wrap').addClass('visible-editor-controls');
						}

						if (nectarDOMInfo.usingFrontEndEditor) {
							addRowCtrls();

							if( !$body.is('[data-flex-cols="true"]') ) {
								convertFrontEndPadding();
								$window.on('smartresize',convertFrontEndPadding);
							}

						}

					}, 200);

					// Bind reload event
					$window.on('vc_reload', function() {

						addRowCtrls();
						columnBGColors();
						coloredButtons();
						twentytwentyInit();
						parallaxRowsBGCals();
						flexsliderInit();
						accordionInit();
						ulCheckmarks();
						nectarFancyUlIcons();
						nectarFancyBoxHover();
						oneFourthClasses();
						carouselfGrabbingClass();
						nectarPostGridInit();
						splitLineHeadingInit();
						nectarVideoLightbox();
						nectarKeyframeAssist();
						nectarLazyImageLoading();

						if ($('.carousel').length > 0) {
							standardCarouselInit();
							clientsCarouselInit();
							carouselHeightCalcs();
						}

						if ($('.owl-carousel').length > 0) {
							$('.owl-carousel').each(function() {
								$(this).trigger('destroy.owl.carousel').removeClass('owl-loaded');
								$(this).find('.owl-stage-outer .owl-stage > *').unwrap();
								$(this).find('.owl-stage-outer > *').unwrap();
								$(this).find('.owl-item > *').unwrap();
								$(this).find('.owl-dots').remove();
								$(this).find('.owl-nav').remove();
							});
							owlCarouselInit();
						}

						if ($('.nectar_cascading_images').length > 0) {
							imagesLoaded($('.nectar_cascading_images'), function() {
								cascadingImageBGSizing();
							});
						}

						fullWidthSections();
						fwsClasses();
						recentPostsInit();
						fullWidthRowPaddingAdjust();

						/*flickity carousels*/
						if ($flickitySliders.length > 0) {
							for (var i = 0; i < $flickitySliders.length; i++) {

								$flickitySliders[i].reloadCells();
								$flickitySliders[i].off('scroll.flickity');
								$flickitySliders[i].off('dragStart.flickity');
								$flickitySliders[i].off('dragEnd.flickity');

							}
						}

						flickityLazyInit();

						setTimeout(function() {

							flickityInit();
							if ($flickitySliders.length > 0) {
								for (var i = 0; i < $flickitySliders.length; i++) {
									$flickitySliders[i].reloadCells();
									$flickitySliders[i].resize();
								}
							}

						}, 100);

						/*flickity product carousels*/
						if ($wooFlickityCarousels.length > 0) {
							for (var i = 0; i < $wooFlickityCarousels.length; i++) {

								$wooFlickityCarousels[i].flickity('reloadCells');
								$wooFlickityCarousels[i].off('scroll.flickity');
								$wooFlickityCarousels[i].off('dragStart.flickity');
								$wooFlickityCarousels[i].off('dragEnd.flickity');

							}
						}

						setTimeout(function() {

							if ($('.nectar-woo-flickity').length > 0) {
								productCarouselInit();
							}
							if ($wooFlickityCarousels.length > 0) {
								for (var i = 0; i < $wooFlickityCarousels.length; i++) {
									$wooFlickityCarousels[i].flickity('reloadCells');
									$wooFlickityCarousels[i].flickity('resize');
								}
							}

						}, 100);

						nectarTestimonialSliders();

						for (var i = 0; i < $testimonialSliders.length; i++) {

							if ($testimonialSliders[i].type == 'multiple_visible' ||
							$testimonialSliders[i].type == 'multiple_visible_minimal') {

								$testimonialSliders[i].flickityEl.flickity('reloadCells');
								$testimonialSliders[i].flickityEl.off('select.flickity');
								nectarTestimonialSliders();
								$testimonialSliders[i].flickityEl.resize();
							}

							$testimonialSliders[i].testimonialSliderHeight();
						}
						nectarTestimonialSlidersEvents();

						pricingTableHeight();
						nectarIconMatchColoring();
						lightBoxInit();
						imageWithHotspotEvents();
						largeIconHover();
						nectarBoxRollInit();
						midnightInit();
						responsiveVideoIframesInit();
						responsiveVideoIframes();
						fullWidthContentColumns();
						setTimeout(fullWidthContentColumns, 1000);
						videoBGInit();
						vcFullHeightRowInit();
						$window.off('scroll.parallaxSections').off('resize.parallaxSections');
						parallaxScrollInit();
						masonryBlogInit();
						masonryPortfolioInit();

						if ($portfolio_containers.length > 0) {
							for (var i = 0; i < $portfolio_containers.length; i++) {
								$portfolio_containers[i].portfolioAccentColor();
							}
						}

						parallaxItemHoverEffect();
						fsProjectSliderInit();

						setTimeout(function() {
							if ($('.nectar_fullscreen_zoom_recent_projects').length > 0) {

								if ($fsProjectSliderArr.length > 0) {
									for (var i = 0; i < $fsProjectSliderArr.length; i++) {
										$fsProjectSliderArr[i].sliderCalcs();
									}
								}

							}
						}, 300);

						$window.unbind('.infscr');
						infiniteScrollInit();
						mouseParallaxInit();

						//play video BGs
						$('.nectar-video-wrap').each(function() {
							if ($(this).find('video').length > 0) {
								$(this).find('video').css('visibility', 'visible');
							}
						});

						//tablet inherits small desktop
						$('.wpb_column[data-t-w-inherits]').each(function() {
							if ($(this).is('[data-t-w-inherits="small_desktop"]')) {
								$(this).parent().addClass('inherits-s-desktop-col');
							} else {
								$(this).parent().removeClass('inherits-s-desktop-col');
							}
						});

						//full screen page rows
						if ($('#nectar_fullscreen_rows').length > 0) {

							if ($('#nectar_fullscreen_rows > .vc_element').length == 0) {
								$('#nectar_fullscreen_rows').prepend('<div class="vc_element empty_placeholder" />');
							}


							if ($('#nectar_fullscreen_rows > .vc_element:not(.empty_placeholder)').length > 0) {
								$('#nectar_fullscreen_rows >.vc_element.empty_placeholder').remove();
							}


							$.fn.fullpage.destroy('all');
							nectarFullPageInit();

							//keep tooltip active status
							var nectarFPOffsets = [{
								el: '',
								offset: 0
							}];

							////create list of offsets
							$('#nectar_fullscreen_rows > div.vc_element').each(function(i) {
								nectarFPOffsets[i] = {
									el: $(this),
									offset: $(this).offset().top
								};
							});


							////start active on that index

							//move back to first section when all have been deleted but one
							if ($('#nectar_fullscreen_rows > div.vc_element').length === 1) {
								$('#nectar_fullscreen_rows').css({
									'transform': 'translate3d(0,0,0)'
								});
							}

							$body.scrollTo(0, 0);


						} else {

							//remove container wrap padding/margin when needded
							if ($('body .main-content > .row > .vc_element:first > .wpb_row[class*="full-width-"]').length > 0 ||
							$('body .main-content > .row > .vc_element:first .nectar-slider-wrap[data-full-width="true"]').length > 0) {
								$('.container-wrap').css({
									'padding-top': '0',
									'margin-top': '0'
								});
							} else {
								$('.container-wrap').css({
									'padding-top': '40px'
								});
							}

						}

						//reset svg icon arr
						$svgIcons = [];
						$('.svg-icon-holder')
							.removeClass('animated-in')
							.removeClass('bound');


						//gmap
						if ($('.vc_nectar_gmap').length > 0) {

							setTimeout(function() {

								if (typeof google === 'object' && typeof google.maps === 'object') {
									window.mapAPI_Loaded();
								} else {

									if (window.nectarLove.mapApiKey.length > 0) {
										$.getScript('https://maps.google.com/maps/api/js?sensor=false&key=' + window.nectarLove.mapApiKey + '&callback=mapAPI_Loaded');
									}
								}

							}, 100);
						}


						stickySidebarInit();


						if (typeof window.Waypoint != 'undefined') {
							Waypoint.destroyAll();
							waypoints();
						}

					});

				}








				/**
				* Page transitions and waypoint triggering
				*
				* @since 10.5
				*/
				function pageTransitionInit() {

					var mobileDisabledCondition = false;

					if( $('body[data-ajax-transitions="true"]').length > 0 &&
					    $('#ajax-loading-screen[data-disable-mobile="1"]').length > 0 &&
				       nectarDOMInfo.winW < 1000 ) {

						mobileDisabledCondition = true;

					}

					if ($('body[data-ajax-transitions="true"]').length > 0 && $('#ajax-loading-screen[data-method="standard"]').length > 0 && mobileDisabledCondition == false) {

						$('html').addClass('page-trans-loaded');

						// Fade loading animation
						if ($('#ajax-loading-screen[data-effect="standard"]').length > 0) {

							if ($('.nectar-particles').length == 0) {

								$loadingScreenEl.transition({
									'opacity': 0
								}, 500, function () {
									$(this).css({
										'display': 'none'
									});
								});
								$('#ajax-loading-screen .loading-icon').transition({
									'opacity': 0
								}, 500);

							}

							// Bind waypoints after loading screen has left
							if ($('.nectar-box-roll').length == 0) {
								setTimeout(function () {
									waypoints();
								}, 550);
							}

						}

						// Swipe loading animation
						else {

							if ($('#ajax-loading-screen[data-effect*="horizontal_swipe"]').length > 0) {
								setTimeout(function () {
									$loadingScreenEl.addClass('loaded');
								}, 60);
							}

							if ($('#page-header-wrap #page-header-bg[data-animate-in-effect="zoom-out"] .nectar-video-wrap').length == 0) {
								setTimeout(function () {
									$('#ajax-loading-screen:not(.loaded)').addClass('loaded');
									setTimeout(function () {
										$loadingScreenEl.addClass('hidden');
									}, 1000);
								}, 150);
							}


							// Bind waypoints after loading screen has left
							if ($('.nectar-box-roll').length == 0 && $('#ajax-loading-screen[data-effect*="horizontal_swipe"]').length > 0) {
								setTimeout(function () {
									waypoints();
								}, 750);
							} else if ($('.nectar-box-roll').length == 0) setTimeout(function () {
								waypoints();
							}, 350);

						}


						// Safari back/prev fix
						if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 ||
						navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {

							window.onunload = function () {

								$('#ajax-loading-screen').stop().transition({
									'opacity': 0
								}, 800, function () {
									$(this).css({
										'display': 'none'
									});
								});
								$('#ajax-loading-screen .loading-icon').transition({
									'opacity': 0
								}, 600);
							};
							window.onpageshow = function (event) {

								if (event.persisted) {

									$('#ajax-loading-screen').stop().transition({
										'opacity': 0
									}, 800, function () {
										$(this).css({
											'display': 'none'
										});
									});
									$('#ajax-loading-screen .loading-icon').transition({
										'opacity': 0
									}, 600);

								}

							};

						}

						else if (navigator.userAgent.indexOf('Firefox') != -1) {
							window.onunload = function () {};
						}


						// Remove excess loading images if using page transitions.
						$('.portfolio-loading, .nectar-slider-loading .loading-icon').remove();


						if ($('#ajax-loading-screen[data-disable-fade-on-click="1"]').length == 0) {

							if ($('body.using-mobile-browser #ajax-loading-screen[data-method="standard"][data-disable-mobile="1"]').length == 0) {

								var ignore_onbeforeunload = false;
								$('a[href^="mailto"], a[href^="tel"], .woocommerce-order-downloads a[class*="downloads-file"], .wpdm-cta.download-link a[data-downloadurl], .nectar-ignore-beforeunload a').on('click', function () {
									ignore_onbeforeunload = true;
								});
								window.addEventListener('beforeunload', function () {

									if (!ignore_onbeforeunload) {
										$loadingScreenEl.addClass('set-to-fade');
										transitionPage();
									}
									ignore_onbeforeunload = false;
								});
							}

						}

					}

					// No page transitions
					else {

						// Mobile disabled.
						if( mobileDisabledCondition == true ) {
							$loadingScreenEl.css({
								'opacity': '0',
								'display': 'none'
							}).addClass('loaded').addClass('hidden');
						}

						if ($('.nectar-box-roll').length == 0 && !nectarDOMInfo.usingFrontEndEditor) {

							// Waypoints.
							setTimeout(function () {
								waypoints();
							}, 80);

						}

					}


					function transitionPage() {

						if ($('#ajax-loading-screen[data-effect*="horizontal_swipe"]').length > 0) {
							$loadingScreenEl.removeClass('loaded');
							$loadingScreenEl.addClass('in-from-right');

							setTimeout(function () {
								$loadingScreenEl.addClass('loaded');
							}, 30);

						}
						else {
							if ($('#ajax-loading-screen[data-effect="center_mask_reveal"]').length > 0) {
								$loadingScreenEl.css('opacity', '0').css('display', 'block').transition({
									'opacity': '1'
								}, 450);
							} else {
								$loadingScreenEl.show().transition({
									'opacity': '1'
								}, 450);
							}
						}

					}

				}



			// Document ready event - starting everything up.
			jQuery(document).ready(function ($) {

				// Initialize Nectar DOM helper.
				nectarDOMInfo.init();

				// Priority calls
				nectarBoxRollInit();
				nectarFullPageInit();
				nectarLazyImageLoading();

				// Header navigation.
				initSF();
				navigationSearchInit();
				centeredNavBottomBarInit();
				centeredLogoHeaderInit();
				headerNavPreInit();
				headerNavScrollInit();
				headerNavOffsetInit();

				// Page builder elements.
				salientPageBuilderElInit();

				// Column related.
				columnBGColors();
				vcMobileColumnsInit();

				// Row related.
				fullWidthSections();
				fwsClasses();
				fwCarouselLinkFix();
				fullWidthSectionsPreInit();
				firstFWSection();
				parallaxScrollInit();
				parallaxRowsBGCals();
				fullWidthRowPaddingAdjust();
				fullWidthContentColumns();
				oneFourthClasses();
				fixIeFlexbox();
				vcFullHeightRowInit();

				// Media.
				lightBoxInit();
				audioVideoVis();
				responsiveVideoIframesInit();
				responsiveVideoIframes();
				videoBGInit();
				blogSingle();


				// Off canvas navigation.
				mobileNavMegamenuCorrect();
				materialSkinOCM_Init();
				OCM_dropdownMarkup();
				OCM_dropdownIconPos();
				clickToggleSubmenus();
				OCM_init();


				// Page header
				pageHeaderInit();

				// Footer.
				footerRevealInit();

				// Third party.
				wooCommerceEvents();
				fancySelectStyling();

				// Scrolling
				infiniteScrollInit();
				scrollToTopInit();
				animatedAnchorLinks();
				updatePerspectiveOriginInit();
				sectionDownArrowEvent();

				// Cross browser assist.
				crossBrowserAdjust();
				bfCacheAssist();

				// Front end editing.
				wpBakeryFrontendInit();

				// Page transitions and waypoint activation.
				pageTransitionInit();



				// Main Debounced Resize Event.
				$window.off('smartresize.srInit');
				$window.on('smartresize.srInit', smartResizeInit);

				// Main Resize Event.
				$window.off('resize.srInit');
				$window.on('resize.srInit', resizeInit);

				// Orientation change.
				window.addEventListener("orientationchange", orientationChangeInit);

				// Window Load Event.
				$window.on('load', function () {

					// Set header space.
					if ( $(window).scrollTop() == 0 ) {
						headerSpace();
					}

					$('video').css('visibility', 'visible');

					// Scroll to anchor
					pageLoadHashInit();

					// Row/Column related.
					fullWidthContentColumns();
					parallaxRowsBGCals();

					// Video BG
					resizeVideoToCover();

				});


			});



}(window.jQuery, window, document));