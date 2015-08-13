// countdown.js
// -----------------------------------------------------------------

Countdown = function() {
	_(this).bindAll('update', 'executeAnimation', 'finishAnimation');
	this.setVars.apply(this, arguments);
	this.update();
};

this.timeNum = 0;

Countdown.prototype = {
	duration: 800,

	setVars: function(time, el, template, duration) {
		this.max = time;
		this.time = time;
		this.timeNum = time;
		this.el = el;
		this.template = _(template.innerHTML).template();
		this.delta = -1;
		this.duration = duration;
	},

	update: function() {
		this.checkTime();
		this.setSizes();

		this.setupAnimation();
		_(this.executeAnimation).delay(20);
		_(this.finishAnimation).delay(this.duration * 0.9);

		_(this.update).delay(this.duration);
	},

	checkTime: function() {
    
    // Loop through the hash chars
    if(this.timeNum == 30){
      this.timeNum = 0
    }

    this.time = makeHash(this.timeNum++);
		this.toggleDirection('up', 'down');
		this.nextTime = makeHash(this.timeNum);
	},

	toggleDirection: function(add, remove) {
		this.el.classList.add(add);
		this.el.classList.remove(remove);
	},

	setSizes: function() {
		this.currentSize = this.getSize(this.time);
		this.nextSize = this.getSize(this.nextTime);
	},

	getSize: function(time) {
		return time > 9 ? 'small' : '';
	},

	setupAnimation: function() {
		this.el.innerHTML = this.template(this);
		this.el.classList.remove('changed');
	},

	executeAnimation: function() {
		this.el.classList.add('changing');
	},

	finishAnimation: function() {
		this.el.classList.add('changed');
		this.el.classList.remove('changing');
	}
};

function makeHash(id) {
	var hash = 'u562hdn7zwi39alo8b4ervtxfcks01u'; // 30 chars
  return hash.charAt(id);
}