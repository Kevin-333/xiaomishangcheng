
// new ShoppingCar([
// 		{
// 			"编号":"01001",
// 			"商品名称":"麻辣烫",
// 			"单价":20,
// 			"数量":3
// 		},
// 		{
// 			"编号":"01002",
// 			"商品名称":"222",
// 			"单价":120,
// 			"数量":2
// 		}
// 	],$("box"));

class ShoppingCar{	
	//构造函数
	constructor(datas,boxDom){

		this.datas = datas;
		this.boxDom = boxDom;
		this.tableDom = null;

		this.render();
		this.addEvent();

	}

	//render
	render(){
		//1、创建table
		this.tableDom = $create("table");
		this.tableDom.style.cssText = `
				margin: 3.125rem auto;
				background: #fff;

				`;
		this.boxDom.appendChild(this.tableDom);
		//2、创建标题
		//1)、行
		let trDom = $create("tr");
		this.tableDom.appendChild(trDom);
		//2)、列
		for(let key in this.datas[0]){
			let tdDom = $create("th");
			tdDom.innerHTML = key;
			trDom.appendChild(tdDom);
		}
		let tdDom = $create("th");
		tdDom.style.cssText = `
				text-align: center;
				`;
		tdDom.innerHTML = "小计";
		trDom.appendChild(tdDom);

		tdDom = $create("th");
		tdDom.style.cssText = `
				text-align: center;
				`;
		tdDom.innerHTML = "操作";
		trDom.appendChild(tdDom);

		//3、创建数据
		var totalMoney = 0;
		for(var i in this.datas){

			//1)、行
			let trDom = $create("tr");
			this.tableDom.appendChild(trDom);
			//2)、列
			for(let key in this.datas[i]){
				let tdDom = $create("td");
				tdDom.style.cssText = `
				text-align: center;
				`;
				tdDom.innerHTML =  this.datas[i][key];
				trDom.appendChild(tdDom);
			}
			//3)、小计
			let tdDom = $create("td");
			tdDom.style.cssText = `
				text-align: center;
				`;
			let xiaoji= this.datas[i]["单价"]*this.datas[i]["数量"];
			totalMoney += xiaoji;
			tdDom.innerHTML = xiaoji;
			trDom.appendChild(tdDom);

			//4)、删除按钮
			let tdDelDom = $create("td");
			tdDelDom.style.cssText = `
				text-align: center;
				`;

			tdDelDom.innerHTML = `<input type="button" style="border-radius: 50%;" value="x" />`;
			trDom.appendChild(tdDelDom);

			//5)、加减号
			var num = trDom.children[3].innerHTML;

			trDom.children[3].innerHTML = `
				<input type="button" value="-" />
				<span>${num}</span>
				<input type="button" value="+" />
			`;
		}

		//4、总计
		//1)、行
		trDom = $create("tr");
		this.tableDom.appendChild(trDom);
		//2)、列
		tdDom = $create("td");
		tdDom.colSpan = 6;
		tdDom.style.cssText = `
				text-align: center;
				`;
		tdDom.innerHTML = "共计："+totalMoney;
		trDom.appendChild(tdDom);
	}

	//绑定事件
	addEvent(){
		let obj = this;
		let trDoms = this.tableDom.rows;
		for(let i=1;i<trDoms.length-1;i++){
			//取出减号，绑定事件
			let reduceBtn = trDoms[i].cells[3].firstElementChild;
			reduceBtn.onclick = function(){
				//1、改变数量
				let num = this.nextElementSibling.innerHTML;
				num--;
				if(num<0){
					return;
				}
				this.nextElementSibling.innerHTML=num;
				//2、改变小计
				let price = this.parentNode.previousElementSibling.innerHTML;
				let xiaoji = num*price;
				this.parentNode.nextElementSibling.innerHTML = xiaoji;

				//3、计算合计
				obj.calTotalMoney();
				//4、保存数据
				obj.saveData();
			}

			//取出加号，绑定事件
			let addBtn = trDoms[i].cells[3].lastElementChild;
			addBtn.onclick = function(){
				let num = this.previousElementSibling.innerHTML;
				num++;
				this.previousElementSibling.innerHTML=num;
				//2、改变小计
				let price = this.parentNode.previousElementSibling.innerHTML;
				let xiaoji = num*price;
				this.parentNode.nextElementSibling.innerHTML = xiaoji;	
				//3、计算合计
				obj.calTotalMoney();
				//4、保存数据
				obj.saveData();
			}

			//取出删除按钮；
			let delBtn = trDoms[i].lastElementChild.firstElementChild;
			delBtn.onclick = function(){
				if(confirm("亲，您真的要删除吗？")){
					this.parentNode.parentNode.remove();
					obj.calTotalMoney();
					obj.saveData();
				}
			}
			
		}

	}

	calTotalMoney(){
		let trDoms = this.tableDom.rows;
		let totalMoney=0;
		for(let j=1;j<trDoms.length-1;j++){
			totalMoney+=parseFloat(trDoms[j].cells[4].innerHTML);
		}
		this.tableDom.rows[this.tableDom.rows.length-1].cells[0].innerHTML = "共计:"+totalMoney;
	}

	saveData(){
		var objs=[];
		//1、从界面上获取数据
		let trDoms = this.tableDom.rows;
		for(let i=1;i<trDoms.length-1;i++){
			let obj = {
				"编号":trDoms[i].cells[0].innerHTML,
				"商品名称":trDoms[i].cells[1].innerHTML,
				"单价":trDoms[i].cells[2].innerHTML,
				"数量":trDoms[i].cells[3].children[1].innerHTML
			}
			objs.push(obj);
		}

		//2、存储；
		localStorage.setItem('datas',JSON.stringify(objs));
	}
}

function $create(tagName) {
	return document.createElement(tagName);
}