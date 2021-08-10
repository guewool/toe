(function(window){
	let toe = window.Toe || {}
	let _moment = function(){

		var args = [].slice.call( arguments )
		let _timer = null
		if( args.length > 0 ) _timer = args[0]
		else _timer = new Date()//
		this.timer = _timer

		// console.log( this  )
		if( !( this instanceof _moment) ) return new _moment( _timer )
		// if( this==window || 'moment' in this ) return new _moment( _timer )

	}
	_moment.prototype = {
		/*
		 * @params  String 'yy-mm-dd'  'yyyy年mm月dd天'
		 * return  yyyy年mm月dd天hh时mm分ss秒
		*/
		format: function( fmtTpl ){
			let _t = this.useTimer || this.timer  
			if(!fmtTpl) return new Date(+_t + + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')

			let weekNum = '日一二三四五六'
			// console.log( this.timer.getTime() )
			
			//"2018-08-08 12:09:12"
			let yyyy = _t.getFullYear()
			var keys = {
				yyyy : yyyy,
				yy : (''+yyyy).substr(2,2),
				mm : _t.getMonth() + 1,
				dd : _t.getDate(),
				h : _t.getHours(),
				m : _t.getMinutes(),
				s : _t.getSeconds(),
				DD : _t.getDay()
			}
			for(var p in keys){
				fmtTpl = fmtTpl.replace(p, p =='DD'? weekNum[ keys[p] ] : doubleStr( keys[p]) )
			}

			return fmtTpl
		},
		/*
		 * return 时间戳
		*/
		getTime: function(){
			return this.timer.getTime()
		},

		/*
		 * @params  n整数， type: d|m 
		*/
		move:function(n,type){
			let _m = [31,28,31,30,31,30,31,31,30,31,30,31],
				_d=1000*3600*24
			var config ={
				d:_d,
				m:_d*_m[0]
			}
			//_m[0] 需要 根据当年 当月判断 未实现

			var newInstance = Object.assign({},this.__proto__)
			let nowtime = +this.timer + config[type]*n
			newInstance.useTimer = new Date( nowtime )
			newInstance.toString = function(){
				return newInstance.useTimer; //Object.prototype.toString.call(newInstance, newInstance.useTimer)
			}
			// newInstance.valueOf = function(){
			// 	console.log('value')
			// 	return newInstance.useTimer
			// }
			
			return newInstance
		},

		/*
		 * params t 自然数|2021-04-11 ;  unit: s|s秒 d|d天  flag:0 相对天数 | 1自然天 默认0
		 * return n天
		*/
		fromTime: function( t, unit,flag ){
			t = isNumber(t)? t : +new Date( t );
			flag = flag || 0
			var deltaT = t - this.timer
			unit = unit || ''
			// console.log( deltaT )
			if( unit=='d' && flag) {
				deltaT= getZeroTime(t)  - getZeroTime(this.timer)
				// console.log('deltaT:', deltaT )
			}
			return this.forUnit( deltaT, unit )
		},
		forUnit: function( dt,unit ){
			let unitStr = ['s','m','h','d']	//单位
			let reduced = [1000,60,60,24]	//换算
			let unitArr = ['秒','分','小时','天']
			let pos = dt>0 ?1 :-1;
			let _type = unit.substr(0,1) // s m h d 

			let index = unitStr.indexOf( _type )+1;
			unitStr.indexOf( _type ) == -1 && (index = unitStr.length)
			dt = Math.abs( dt )
			// console.log( _type,index)
			for( var i=0; i<index; i++){
				let _next = reduced[i]
				// console.log( index, i, _next,dt)
				if( _type =='' && dt/_next <1 ){
					index = i
					console.log('break')
					break;	
				} 
				dt /= _next
				// console.log( 'dt', dt,index,i, _next)
			}
			index -=1
			let _s = pos <0?'前':'后'
			dt = dt <<0
			// console.log( index, dt, unit, _type)
			return dt+ unitArr[index]+ _s;
		}
	}

	function doubleStr(m) {
	    return m < 10 ? '0' + m : m;
	}

	function getZeroTime( t ){
		var d = 24*3600*1000
		return t-t%d
	}

	/**
	* 验证数据 是数字：返回true；不是数字：返回false
	**/
	function isNumber(val) {
	　　return typeof value === 'number' && !isNaN(value);
	}

	toe.Moment = _moment

	window.Toe = toe
})(window)