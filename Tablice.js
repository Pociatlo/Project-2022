

class DataRepresentation
{
	constructor(x=0, y=0, width=100, height=100, length=1, text="Dane")
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.text = text;

		this.resetData(length);
	}

	resetData(length)
	{
		this.data = [];
		this.dataMaximum = -Infinity;
		for (var i = 0; i < length; i++) {
			this.data.push(Math.round(Math.random()*500+10));
			
			if(this.data[i]>this.dataMaximum)
				this.dataMaximum = this.data[i];
		}
		this.boxdiff = 100/length;
		this.boxwidth = this.width/length-this.boxdiff*2;
		this.boxheight = (this.height-35)/this.dataMaximum;
	}
	draw()
	{
		
		

		
		ctx.fillStyle = '#333';
		ctx.font = '24px Impact';
		ctx.fillText(this.text, this.x,this.y-10, this.width);

		
		for (let i = 0; i < this.data.length; i++) {
			ctx.fillStyle = hslStr(Math.round(this.data[i]/this.dataMaximum*360));
			ctx.fillRect(this.x+i*(this.boxwidth+this.boxdiff*2)+this.boxdiff,this.y+this.height-3, this.boxwidth, -this.data[i]*this.boxheight);
		}
	}
}



class SelectionSort
{
	constructor()
	{
		this.reset();
	}

	step(arr)
	{
		if(this.i!=arr.length-1)
		{	
			if(this.j==arr.length-1)
			{
				this.i+=1;
				this.j=this.i;
			}
			this.j++;
			if(arr[this.i]>arr[this.j])
				[arr[this.i],arr[this.j]] = [arr[this.j],arr[this.i]];
		}
	}

	reset()
	{
		this.i=0;
		this.j=0;
	}

}

class BubbleSort
{
	constructor()
	{
		this.reset();
	}

	step(arr)
	{
		let n = arr.length;
		if(this.i!=n-1)
		{	
			if(this.j==n-this.i-1)
			{
				this.i+=1;
				this.j=0;
			}
			this.j++;
			if(arr[this.j-1]>arr[this.j])
				[arr[this.j], arr[this.j-1]] = [arr[this.j-1], arr[this.j]];
		}
	}

	reset()
	{
		this.i=0;
		this.j=0;
	}

}

class InsertionSort
{
	constructor()
	{
		this.reset();
	}

	step(arr)
	{
		let n = arr.length;
		if(this.i<n)
		{
			if(this.carry===-Infinity)
			{
				this.carry = arr[this.i];
				this.j = this.i-1;
			}
			else
			{
				if(this.j>=0 && arr[this.j]>this.carry)
				{
					arr[this.j+1] = arr[this.j];
					this.j--;
				}
				else
				{
					arr[this.j+1] = this.carry;
					this.carry = arr[this.i+1];
					this.j = this.i;
					this.i++;
				}
			}
		}
	}

	reset()
	{
		this.i=1;
		this.j=0;
		this.carry=-Infinity;
	}

}

class QuickSort
{
	constructor()
	{
		this.reset();
	}

	reset()
	{
		this.i=0;
		this.j=-1;
		this.ranges = [[0,-1]];
		this.pivot = -1;
	}

	step(arr)
	{
		if(this.ranges.length!=0)
		{
			if(this.ranges[0][1]==-1)
				this.ranges[0][1]= arr.length-1;
			else
			{
				this.partition(arr, this.ranges[this.ranges.length-1]);
			}
		}

	}

	partition(arr, range)
	{
		if(this.j==-1)
		{
			this.pivot = range[1];
			this.i = this.j = range[0];
		}
		if(this.j<this.pivot)
		{
			if (arr[this.j]<=arr[this.pivot])
			{
				[arr[this.j],arr[this.i]] = [arr[this.i],arr[this.j]];
				this.i++;
			}

			this.j++;
		}
		if(this.j==this.pivot)
		{
				[arr[this.j],arr[this.i]] = [arr[this.i],arr[this.j]];
				this.ranges.pop();
				if(this.i+1<range[1])
					this.ranges.push([this.i+1,range[1]]);
				if(range[0]<this.i-1)
					this.ranges.push([range[0],this.i-1]);
				this.j=-1;
				this.i=-1;
		}
	}

}

class CoctailShakerSort
{
	constructor()
	{
		this.reset();
	}

	reset()
	{
		this.i=0;
		this.p=0;
		this.q=-1;
		this.growing = true;
	}

	step(arr)
	{
		if(this.q==-1)
			this.q = arr.length-1;
		else if(this.p!=this.q)
		{
			if(this.growing)
			{
				if(this.i==this.q)
				{
					this.growing = false;
					this.q=this.i-1;
					return;
				}
				if(arr[this.i] > arr[this.i+1])
					[arr[this.i],arr[this.i+1]] = [arr[this.i+1],arr[this.i]];

				this.i++;
			} else
			{
				if(this.i==this.p)
				{
					this.growing = true;
					this.p = this.i+1;
					return;
				}
				if(arr[this.i] < arr[this.i-1])
					[arr[this.i],arr[this.i-1]] = [arr[this.i-1],arr[this.i]];

				this.i--;
			}

		}

	}
}

class BogoSort
{
	constructor()
	{
		this.reset();
	}
	reset()
	{
		this.sorted=false;
	}

	step(arr)
	{
		if(!this.sorted)
		{
			for(let i=0;i<arr.length;i++)
			{
				let tmp = Math.floor(Math.random()*arr.length);
				[arr[i],arr[tmp]] = [arr[tmp],arr[i]];
			}

			let potentiallySorted = true;
			for(let i=1;i<arr.length;i++)
			if(arr[i-1]>arr[i])
			{
				potentiallySorted = false;
				break;
			}

			if(potentiallySorted)
				this.sorted=true;
		}
	}
}



let cnv = document.querySelector('#canvas');
let ctx = cnv.getContext('2d');
let sliderSteptime = document.querySelector('#step-time-slider');
let sliderDataAmount = document.querySelector('#amount-data-slider');
let amountOfDataSpan = document.querySelector('#amount-of-data');
let stepTimeSpan = document.querySelector('#step-time');




ctx.font = '30px Arial';

let deltaTime = 0;
let lastFrameTime = 0;

let stepTimer=0;
let stepSpeed = 1;


let sorter = [];
sorter[0] = new SelectionSort();
sorter[1] = new BubbleSort();
sorter[2] = new InsertionSort();
sorter[3] = new QuickSort();
sorter[4] = new CoctailShakerSort();
sorter[5] = new BogoSort();


let datagram = [];
let datagramHeight = 300;
let datagramMarginV = 250;
let datagramMarginH = 70;


cnv.width=window.innerWidth;
cnv.height=100+(datagramHeight+datagramMarginH)*sorter.length;

for (var i = 0; i < sorter.length; i++)
	datagram.push(new DataRepresentation(
		datagramMarginV,
		100+(datagramHeight+datagramMarginH)*i
		,cnv.width-datagramMarginV*2,
		datagramHeight,
		200));

datagram[0].text="Selection Sort - Sortowanie przez selekcję";
datagram[1].text="Bubble Sort - Sortowanie bąbelkowe";
datagram[2].text="Insertion Sort - Sortowanie przez wstawianie";
datagram[3].text="Quick Sort - Sortowanie szybkie";
datagram[4].text="Coctail Shaker Sort - Sortowanie koktajlowe";
datagram[5].text="Bogo Sort - Sortowanie losową permutacją";





loop();

function loop(frameTime=16) {
	deltaTime = frameTime-lastFrameTime;
	update(deltaTime);

	ctx.fillStyle = '#fff';
	ctx.fillRect(0,0,cnv.width, cnv.height);

	draw();
	lastFrameTime = frameTime;
	requestAnimationFrame(loop)
}

function update(deltaTime) {
	stepSpeed = 10/(parseInt(sliderSteptime.value)/(parseInt(sliderSteptime.max)))-10;
	amountOfDataSpan.innerHTML = sliderDataAmount.value;
	if(stepSpeed===Infinity)
		stepTimeSpan.innerHTML = "&#8734";
	else	
		stepTimeSpan.innerHTML = Math.round(stepSpeed*100)/100;

	if(lastFrameTime-stepTimer>stepSpeed)
	{

		for(let j=0;j<Math.floor(1000/60/stepSpeed)+1;j++)
			for(let i=0;i<sorter.length;i++)
			sorter[i].step(datagram[i].data);
		stepTimer = lastFrameTime;
	}
}

function draw() {
	for(let i=0;i<datagram.length;i++)
	datagram[i].draw();
}



function hslStr(val=0)
{
	return "hsl("+val+", 100%, 50%)";
}

function dataAmountChange()
{
	let n = parseInt(sliderDataAmount.value);
	for(let i=0;i<datagram.length;i++)
	{
		datagram[i].resetData(n);
		sorter[i].reset();
	}

}