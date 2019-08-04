
class BannerPlayer{
	
	constructor(obj,boxDom){
		this.boxDom = boxDom;
		this.imgDoms = [];
		this.aDoms = [];
		this.liDoms = [];
		this.arrowBoxDom = null;
		let defaultObj = {
			width:400,
			height:300,
			imgs:[],			
			timeSpace:100,		
			douIsCircle:true,
			myTimer:null,
			ord:0,
		}

		for(let key in defaultObj){
			if(obj[key]){
				this[key] = obj[key];
			}else{
				this[key] = defaultObj[key];
			}
		}

		this.render();
		this.addEvent();	}

	render(){
		this.boxDom.style.position = "relative";

		for(let i=0;i<this.imgs.length;i++){
			let aDom = document.createElement("a");
			aDom.href='#';
			
			let imgDom = document.createElement("img");
			imgDom.src = this.imgs[i];
			imgDom.style.cssText = `
				position: absolute;
				left:0px;
				top:0px;
				width: 100%;
				height: 100%;	
				z-index: 1;`;	

			imgDom.style.opacity = (i==0?1:0);
			
			if(i==0){
				imgDom.style.zIndex = 2;
			}
			this.aDoms.push(aDom);
			this.boxDom.appendChild(aDom);

			this.imgDoms.push(imgDom);
			this.aDoms[i].appendChild(imgDom);
		}

		let doudouBox = document.createElement("ul");
		doudouBox.style.cssText = `
				padding:0px;
				position: absolute;
				list-style: none;
				z-index: 3;`;	
		doudouBox.style.right = "50px";
		doudouBox.style.bottom = "20px";
			
		this.boxDom.appendChild(doudouBox);

		for(let i=0;i<this.imgs.length;i++){
			let liDom = document.createElement("li");
			liDom.setAttribute("index",i);
			liDom.style.cssText = `
				float:left;
				width:6px;
				height:6px;
				margin-right:10px;
				border:1px solid rgba(0,0,0,0.4);
				background:	rgba(0,0,0,0.4);		
			`;
			if(this.douIsCircle){
				liDom.style.borderRadius="50%";
			}
			if(i==0){
				liDom.style.backgroundColor='white';
			}
			doudouBox.appendChild(liDom);
			this.liDoms.push(liDom);
		}

		this.arrowBoxDom = document.createElement("div");

		this.arrowBoxDom.style.cssText = `
				position: absolute;
				left:0px;
				top:${(this.height-50)/2}px;
				width: 100%;
				height: 50px;
				z-index: 4;`;
		this.boxDom.appendChild(this.arrowBoxDom);

		let leftDivDom = document.createElement("div");
		leftDivDom.innerHTML= '<'
		leftDivDom.style.cssText = `
				position: absolute;
				left:234px;
				top:0;
				height: 100%;
				width: 30px;
				background-color: gray;
				opacity: 0.3;
				font-size:35px`;
		this.arrowBoxDom.appendChild(leftDivDom);


		let rightDivDom = document.createElement("div");
		rightDivDom.innerHTML= '>'
		rightDivDom.style.cssText = `
				float:right;
				height: 100%;
				width: 30px;
				background-color: gray;
				opacity: 0.3;
				font-size:35px`;
		this.arrowBoxDom.appendChild(rightDivDom);
	}

	addEvent(){

		let obj = this;
		for(var i=0;i<this.liDoms.length;i++){
			this.liDoms[i].onclick = function(){
				obj.goImg(parseInt(this.getAttribute("index")));
			};
		}

		let leftBtn = this.arrowBoxDom.firstElementChild;
		leftBtn.onclick = ()=>{
			this.preImg();
		}
		let rightBtn = this.arrowBoxDom.lastElementChild;
		rightBtn.onclick = ()=>{
			this.nextImg();
		}

	}
	
	stopPlay(){
		window.clearInterval(this.myTimer);
		this.myTimer = null;
	}

	goImg(transOrd){
		var preOrd = this.ord; 
		this.ord = transOrd;

		if(this.ord>this.imgs.length-1){
			this.ord = 0;
		}else if(this.ord<0){
			this.ord = this.imgs.length-1;
		}

		this.reRender(preOrd,this.ord);
	}

	reRender(preOrd,ord){
		this.imgDoms[ord].style.opacity = 0;		
		this.fadeInOut(this.imgDoms[ord],this.imgDoms[preOrd],this.timeSpace/2);
		
		this.liDoms[preOrd].style.backgroundColor='rgba(0,0,0,0.4)';
		this.liDoms[ord].style.backgroundColor= 'white';	
	}

	preImg(){
		this.goImg(this.ord-1);
	}

	nextImg(){
		this.goImg(this.ord+1);
	}

	fadeInOut(domObjIn,domObjOut,timeLong){
		var currOpacity = 0;
		var step = 1/(timeLong/10);
		var myTimer = setInterval(function(){

			currOpacity+=step;//
			if(currOpacity>=1){
				currOpacity=1;
				window.clearInterval(myTimer);
			}
			domObjIn.style.opacity = currOpacity;
			domObjOut.style.opacity = 1- currOpacity;
		},10);
	}

}
