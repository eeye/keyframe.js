KeyframeJs = function(channels, options) {
  var easings = {
    easeInQuad: function(t, b, c, d) {
      return c * (t /= d) * t + b
    },
    easeOutQuad: function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b
    },
    easeInOutQuad: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    },
    easeInCubic: function(t, b, c, d) {
      return c * (t /= d) * t * t + b
    },
    easeOutCubic: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b
    },
    easeInOutCubic: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b
      return c / 2 * ((t -= 2) * t * t + 2) + b
    },
    easeInQuart: function(t, b, c, d) {
      return c * (t /= d) * t * t * t + b
    },
    easeOutQuart: function(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b
    },
    easeInOutQuart: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b
    },
    easeInQuint: function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b
    },
    easeOutQuint: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },
    easeInOutQuint: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
    },
    easeInSine: function(t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },
    easeOutSine: function(t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b
    },
    easeInOutSine: function(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    },
    easeInExpo: function(t, b, c, d) {
      return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOutExpo: function(t, b, c, d) {
      return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOutExpo: function(t, b, c, d) {
      if (t === 0) return b
      if (t === d) return b + c
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
    },
    easeInCirc: function(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },
    easeOutCirc: function(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },
    easeInOutCirc: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    },
    easeInElastic: function(t, b, c, d) {
      var s = 1.70158
      var p = 0
      var a = c
      if (t === 0) return b
      if ((t /= d) === 1) return b + c
      if (!p) p = d * 0.3
      if (a < Math.abs(c)) {
        a = c
        s = p / 4
      } else s = p / (2 * Math.PI) * Math.asin(c / a)
      return (
        -(
          a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin((t * d - s) * (2 * Math.PI) / p)
        ) + b
      )
    },
    easeOutElastic: function(t, b, c, d) {
      var s = 1.70158
      var p = 0
      var a = c
      if (t === 0) return b
      if ((t /= d) === 1) return b + c
      if (!p) p = d * 0.3
      if (a < Math.abs(c)) {
        a = c
        s = p / 4
      }
      s = p / (2 * Math.PI) * Math.asin(c / a)
      return (
        a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) +
        c +
        b
      )
    },
    easeInOutElastic: function(t, b, c, d) {
      var s = 1.70158
      var p = 0
      var a = c
      if (t === 0) return b
      if ((t /= d / 2) === 2) return b + c
      if (!p) p = d * (0.3 * 1.5)
      if (a < Math.abs(c)) {
        a = c
        s = p / 4
      } else s = p / (2 * Math.PI) * Math.asin(c / a)
      if (t < 1)
        return (
          -0.5 *
            (a *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin((t * d - s) * (2 * Math.PI) / p)) +
          b
        )
      return (
        a *
          Math.pow(2, -10 * (t -= 1)) *
          Math.sin((t * d - s) * (2 * Math.PI) / p) *
          0.5 +
        c +
        b
      )
    },
    easeInBack: function(t, b, c, d, s) {
      if (s === undefined) s = 1.70158
      return c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    easeOutBack: function(t, b, c, d, s) {
      if (s === undefined) s = 1.70158
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    easeInOutBack: function(t, b, c, d, s) {
      if (s === undefined) s = 1.70158
      if ((t /= d / 2) < 1)
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
    },
    easeOutBounce: function(t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
      }
    },
  }

  if (typeof options !== 'object') options = {}

  var _options = {
    onUpdate:
      typeof options.onUpdate === 'function' ? options.onUpdate : function() {},
    onBegin:
      typeof options.onBegin === 'function' ? options.onBegin : function() {},
    onLoop:
      typeof options.onLoop === 'function' ? options.onLoop : function() {},
    onEnd: typeof options.onEnd === 'function' ? options.onEnd : function() {},
    mode:
      ['loopReverse', 'loop', 'stop'].indexOf(options.mode) > -1
        ? options.mode
        : 'stop',
    speed: options.speed >= 0 ? options.speed : 1,
    direction: [1, -1].indexOf(options.direction) > -1 ? options.direction : 1,
    initial_time: options.initial_time >= 0 ? options.initial_time : 0,
  }
  var _duration = 0,
    _channels = channels,
    _current_time = _options.initial_time,
    _last_now,
    _direction = _options.direction,
    _speed = _options.speed,
    _run = false,
    _target = null,
    _pause = false,
    _mode = _options.mode,
    _that = this
    _skip = false;
  function init() {
    getDuration()
  }

  function getDuration() {
    var longest = 0
    for (var prop in _channels) {
      for (var keyframe in _channels[prop].keyframes) {
        if (longest < _channels[prop].keyframes[keyframe][0])
          longest = _channels[prop].keyframes[keyframe][0]
      }
    }
    _duration = longest
  }

  function end() {
    switch (_mode) {
      case 'loopReverse':
      _options.onLoop.call(_that)
        _that.reverse()
        break
      case 'loop':
      _options.onLoop.call(_that)
        _that.reset()
        break
      case 'stop':
        _that.stop()
        _options.onEnd.call(_that)
        break
    }
  }

  function updateChannel(channel) {
    var keyframe = getKeyFrame(channel)
    var value_distance = keyframe.till_value - keyframe.from_value
    if (value_distance === 0) {
      channel.onUpdate.call(_that, keyframe.till_value)
      return
    }
    var time_distance = keyframe.till_time - keyframe.from_time
    var easing = keyframe.easing
    var value
    if (easings[easing]) {
      var t = _current_time - keyframe.from_time
      var d = time_distance
      var b = keyframe.from_value
      var c = keyframe.till_value - keyframe.from_value
      value = easings[easing](t, b, c, d)
    } else {
      var fraction =
        time_distance === 0
          ? 1
          : (_current_time - keyframe.from_time) / time_distance
      value = keyframe.from_value + value_distance * fraction
    }
    channel.onUpdate(value)
  }

  function getKeyFrame(channel) {
    var keyframe = {
      from_time: 0,
      till_time: null,
      from_value: null,
      till_value: null,
      easing: null,
    }
    for (var i = 0; i < channel.keyframes.length; i++) {
      if (_current_time > channel.keyframes[i][0]) {
        keyframe.from_time = channel.keyframes[i][0]
        keyframe.from_value = channel.keyframes[i][1]
      }
      if (
        _current_time <= channel.keyframes[i][0] &&
        (keyframe.till_time === null ||
          keyframe.till_time > channel.keyframes[i][0])
      ) {
        keyframe.till_time = channel.keyframes[i][0]
        keyframe.till_value = channel.keyframes[i][1]
        keyframe.easing = channel.keyframes[i][2]
      }
    }
    if (keyframe.from_value === null) {
      keyframe.from_value = channel.start_value
    }
    if (keyframe.till_time === null) {
      keyframe.till_time = keyframe.from_time
      keyframe.till_value = keyframe.from_value
    }
    return keyframe
  }

  function animate(now) {
    if (!_run) return
    _that.update(now)
    requestAnimationFrame(animate)
  }

  this.update = function(now) {
    if (!now || _pause) return
    if (!_last_now) {
      _last_now = now
      return
    }
    var passed = (now - _last_now) / 1000
    _last_now = now
    _current_time += passed * _direction * _speed
    if (_current_time > _duration) _current_time = _duration
    if (_current_time < 0) _current_time = 0
    if (
      _target &&
      ((_direction > 0 && _target < _current_time) ||
        (_direction <= 0 && _target > _current_time))
    )
      _current_time = _target
    for (var key in _channels) {
      updateChannel(_channels[key])
    }
    _options.onUpdate.call(_that, passed)
    _skip = !_skip
    if (
      (_current_time === _duration && _direction > 0) ||
      (_current_time === 0 && _direction < 0)
    ) {
      end()
    }
  }

  this.reset = function() {
    _direction > 0 ? (_current_time = 0) : (_current_time = _duration)
  }

  this.getDuration = function() {
    return _duration
  }

  this.setSpeed = function(speed) {
    _speed = Math.abs(parseFloat(speed))
    return this
  }

  this.setTime = function(time) {
    _target = null
    _current_time = parseFloat(time)
    return this
  }

  this.setTarget = function(time) {
    if (isNaN(time)) return (_target = null)
    time = parseFloat(time)
    this.setDirection(_current_time >= time ? -1 : 1)
    _target = time
    return this
  }

  this.setDirection = function(direction) {
    _target = null
    _direction = direction <= 0 ? -1 : 1
    return this
  }

  this.getTime = function() {
    return _current_time
  }

  this.togglePause = function() {
    _pause = !_pause
  }

  this.addChannel = function(name, channel) {
    _channels[name] = channel
    _that.getDuration()
  }

  this.dropChannel = function(name) {
    if (_channels[name]) {
      delete _channels[name]
      _that.getDuration()
    }
  }

  this.setMode = function(mode) {
    switch (mode) {
      case 'loopReverse':
      case 'loop':
      case 'stop':
        _mode = mode
        break
      default:
        _mode = 'stop'
        break
    }
  }

  this.reverse = function() {
    _direction = _direction * -1
  }

  this.start = function() {
    _run = true
    animate()
    _options.onBegin.call(_that)
  }

  this.stop = function() {
    _run = false
    _that.reset()
  }

  init()
}

if (typeof module === 'object') {
  module.exports = KeyframeJS
}
