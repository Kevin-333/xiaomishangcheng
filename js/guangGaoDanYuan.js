class DanYuan{
	
	constructor(obj,boxDom){
		this.boxDom = boxDom;
		this.dyDoms = '';
		let defaultObj = {
			width:234,
			height:260,
			url:null,
			textH:null,
			textP:null,
			jiage1:null,
			jiage2:""
		}

		for(let key in defaultObj){
			if(obj[key]){
				this[key] = obj[key];
			}else{
				this[key] = defaultObj[key];
			}
		}
		this.render();
		// this.huaGuo();
	}

	render(){
		let dyDom = document.createElement("div");
		dyDom.className = "dybox";
		dyDom.style = `
			width:${this.width}px;
			height:${this.height}px;
			background: white;
			padding:20px 0;
			text-align:center;
			margin-bottom:14px;
			transition:all 0.3s;
		`;


		dyDom.innerHTML = `
			<a href="#">
				<img src=${this.url} style="
					width: 160px;
	    			height: 160px;
	    			margin: 0 37px;
					" />
				<h4 style="
					font-size:14px;
					color:#424242;
					margin-top:10px;"
				>${this.textH}</h4>
			</a>

			<p style="
					margin:5px 0 15px;
				    font-size: 12px;
				    color: #b0b0b0;
				"
			>${this.textP}</p>

			<p style="
				    font-size: 16px;
				    color: red;
				"
			>${this.jiage1}<s style="
				    font-size: 16px;
				    color: black;
					padding-left:5px;
					color: #b0b0b0;
				"
			>${this.jiage2}</s></p>

		`;

		this.boxDom.appendChild(dyDom);
		this.dyDoms = dyDom;
	}

}