class Spdanyuan{

	constructor(obj,boxDom){
		this.boxDom = boxDom;
		this.divDoms =[];

		let defaultObj = {
			divHeight:75,//每张图片的宽度
			boxHeight:1000,//容器的宽度
			imgs:[], //是所有图片的路径
			texts:[]
		}
		for(let key in defaultObj){
			if(obj[key]){
				this[key] = obj[key];
			}else{
				this[key] = defaultObj[key];
			}
		}
		this.render();
		this.hover();
	}

	render(){
		let boxDomwidth = Math.ceil(this.imgs.length/6)*250;
		this.boxDom.style.width = `${boxDomwidth}px`;
		for(let i in this.imgs){ 
			let divDom = document.createElement("div");
			divDom.className = "spBox";
			divDom.style = `				
				width:250px;
				height:${this.divHeight}px;
			`;
			divDom.innerHTML = `
				<a style="
					height:100%;
					color: black;
					display:flex;
					align-items: center;
				"href="#">
					<img style="
						height:45px;
						margin-left:10px;
					" src="${this.imgs[i]}" alt="" />
					<p class="shangPingP" style="
						
						line-height: 45px;
						font-size: 14px;
						
					">${this.texts[i]}</p>
				</a>
			`;
			this.boxDom.appendChild(divDom);
			this.divDoms.push(divDom);

		}	
	}

	hover(){
		console.log(this.divDoms);
		for(let i in this.divDoms){
			this.divDoms[i].onmouseover = function(){
				
				this.children[0].style.color = "#ff6700";
			}
			this.divDoms[i].onmouseout = function(){
				
				this.children[0].style.color = "#000";
			}

		}
		
	}
}
	