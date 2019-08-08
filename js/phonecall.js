class Phonecall{
	
	constructor(obj,boxDom){
		this.boxDom = boxDom;
		this.dyDoms = '';
		let defaultObj = {
			width:606,
			height:482,
			url:null,
			textTit:null,
			textP:null,
			jiage1:null
		}

		for(let key in defaultObj){
			if(obj[key]){
				this[key] = obj[key];
			}else{
				this[key] = defaultObj[key];
			}
		}
		this.render();
	}

	render(){
		let dyDom = document.createElement("div");
		dyDom.className = "dybox";
		dyDom.style = `		
			width: 606px;
			height: 482px;
			background: #fff;
			margin-top: 14px;
		`;


		dyDom.innerHTML = `
			<a href="#"><img width="100%" src=${this.url} alt=""></a>
			<h3 style="
				font-size: 24px;
				font-weight: 10;
				margin-top: 38px;
				margin-left: 48px;"
			><a style="color: rgba(51,51,51,0.9);"
			 href="#">${this.textTit}</a></h3>
			<p style="margin-left: 48px;
				color: rgba(51,51,51,0.7);
				font-size: 14px;"
			>${this.textP}
				<span style="
					float: right;
					margin-right: 48px;
					color: #ff6700;
					font-size: 30px;
					line-height: 0;"
				>${this.jiage1}
					<i style="
						font-style: normal;
						font-size: 14px;"
					>元起</i>
				</span>
			</p>

		`;

		this.boxDom.appendChild(dyDom);
		this.dyDoms = dyDom;
	}

}