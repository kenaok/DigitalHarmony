class Affine	{
	constructor(ctx)	{
		this.ctx = ctx;
		this.mtx = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1],
		];
	}
	
	init()	{
		this.mtx[0][0] = 1; this.mtx[0][1] = 0; this.mtx[0][2] = 0;
		this.mtx[1][0] = 0; this.mtx[1][1] = 1; this.mtx[1][2] = 0;
		this.mtx[2][0] = 0; this.mtx[2][1] = 0; this.mtx[2][2] = 1;
	}
	
	vtrans(vtx)	{
		var v = [0, 0, 1];
		v[0] = vtx[0] * this.mtx[0][0] + vtx[1] * this.mtx[1][0] + vtx[2] * this.mtx[2][0];
		v[1] = vtx[0] * this.mtx[0][1] + vtx[1] * this.mtx[1][1] + vtx[2] * this.mtx[2][1];
		v[2] = vtx[0] * this.mtx[0][2] + vtx[1] * this.mtx[1][2] + vtx[2] * this.mtx[2][2];
		
		return v;
	}
	
	mtrans(m)	{
		var cmp = new Array(3);
		
		var v = new Array(3);
		v[0] = this.mtx[0][0] * m[0][0] + this.mtx[0][1] * m[1][0] + this.mtx[0][2] * m[2][0];
		v[1] = this.mtx[0][0] * m[0][1] + this.mtx[0][1] * m[1][1] + this.mtx[0][2] * m[2][1];
		v[2] = this.mtx[0][0] * m[0][2] + this.mtx[0][1] * m[1][2] + this.mtx[0][2] * m[2][2];
		cmp[0] = v;
		
		v = new Array(3);
		v[0] = this.mtx[1][0] * m[0][0] + this.mtx[1][1] * m[1][0] + this.mtx[1][2] * m[2][0];
		v[1] = this.mtx[1][0] * m[0][1] + this.mtx[1][1] * m[1][1] + this.mtx[1][2] * m[2][1];
		v[2] = this.mtx[1][0] * m[0][2] + this.mtx[1][1] * m[1][2] + this.mtx[1][2] * m[2][2];
		cmp[1] = v;
		
		v = new Array(3);
		v[0] = this.mtx[2][0] * m[0][0] + this.mtx[2][1] * m[1][0] + this.mtx[2][2] * m[2][0];
		v[1] = this.mtx[2][0] * m[0][1] + this.mtx[2][1] * m[1][1] + this.mtx[2][2] * m[2][1];
		v[2] = this.mtx[2][0] * m[0][2] + this.mtx[2][1] * m[1][2] + this.mtx[2][2] * m[2][2];
		cmp[2] = v;
		
		this.mtx = cmp;
	}
	
	scale(x, y)	{
		var m = [
			[x, 0, 0],
			[0, y, 0],
			[0, 0, 1]
		];
		this.mtrans(m);
	}
	
	rotate(th)	{
		var m = [
			[ Math.cos(th), Math.sin(th), 0],
			[-Math.sin(th), Math.cos(th), 0],
			[0, 0, 1]
		];
		this.mtrans(m);
	}
	
	translate(x, y)	{
		var m = [
			[1, 0, 0],
			[0, 1, 0],
			[x, y, 1]
		];
		this.mtrans(m);
	}
	
	moveTo(x, y)	{
		var v = [x, y, 1];
		var vtx = this.vtrans(v);
		
		this.ctx.moveTo(vtx[0], vtx[1]);
	}
	
	lineTo(x, y)	{
		var v = [x, y, 1];
		var vtx = this.vtrans(v);
		
		this.ctx.lineTo(vtx[0], vtx[1]);
	}
}

onload = function()	{
	var canvas = document.getElementById("canvas01");   //canvasÇÃéÊìæ
	var ctx = canvas.getContext("2d");  //ÉRÉìÉeÉLÉXÉgÇÃéÊìæ
	
	function quad(mtx)	{
		ctx.beginPath();
		mtx.moveTo(200, 0);
		mtx.lineTo(200, 200);
		mtx.lineTo(-200, 200);
		mtx.lineTo(-200, 0);
		mtx.lineTo(200, 0);
		ctx.fill();
	}

	var affine = new Affine(ctx);
	
	// ägëÂèkè¨
	affine.scale(0.2, 0.2);
	// âÒì]
	affine.rotate(Math.PI);
	// ïΩçsà⁄ìÆ
	affine.translate(350, 450);
	
    var frame = 0;
    
    function update()	{
    	frame++;
    	
    	var ang = Math.PI / 720 * frame;
    	var rot = Math.sin(ang);
    	
    	// èkè¨ïœä∑
		var spiral = new Affine(ctx);
		spiral.scale(0.95, 0.95);
		spiral.rotate(rot * Math.PI / 2);
		spiral.translate(0, 200);
	
    	ctx.fillStyle = 'rgb(255, 0, 0)';
    
    	var branch = new Affine(ctx);
    	var transform = new Affine(ctx);
    
    	ctx.clearRect(0, 0, 700, 500);
    	for(var i = 0; i < 80; i++)	{
    		transform.init();
    		transform.mtrans(branch.mtx);
    		transform.mtrans(affine.mtx);
    		ctx.fillStyle = (i % 2 == 0)? 'rgb(255, 0, 0)' : 'rgb(255, 255, 0)';
    		quad(transform);
    	
    		branch.mtrans(spiral.mtx);
    	}
    }

    setInterval(update, 33);
}
