# toe
工具库 
#Toe.moment() 时间工具

##实例化 
	var m = Toe.Moment()

## 打印默认时间 
	 m.format() 
	 m.getTime()

## 按格式打印  
	 m.format('yy-mm-dd h:m:s 周DD') 
	 m.format('yyyy-mm-dd h:m:s') )
	 m.format('周DD') )
	 m.format('周DD',{yesterday:'昨天',today:'今天',tomorrow:'明天'}) )

## 计算日期 
+ 自动计算 最大单位 d=>天 ， 依次变小 h=>小时 m=>分 s=>秒
	 m.fromTime('2021-01-19 16:48:43')

+ 按指定单位计算  
	 m.fromTime('2021-01-18','h')	//,'小时' 
	 m.fromTime('2021-01-18 8:48:43','d')	//'天前' 
	 m.fromTime('2021-01-12 8:48:43','d')	//'天' 

+ 第三个参数为 true 时 是 强制自然天 ，单位必须是 d
	 m.fromTime('2021-01-19 23:48:43')		//'-' 
	 m.fromTime('2021-01-19 23:48:43','d',1)	//'d',1 
	 m.fromTime('2021-01-20 0:48:43'),'-' 
	 m.fromTime('2021-01-17 8:48:43',null,1) //强制无效
+ 将来时间 
	 m.fromTime('2021-03-21 10:48:43')
	 m.fromTime('2021-04-02 8:48:43','d') 			//按天 计算 
	 m.fromTime('2021-01-21 8:48:43','d',1),'-',1 	//按自然天 计算

## 前后移动时间 
	m.move(1,'d')
	m.move(1,'d').format('周DD') )
