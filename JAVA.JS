const svg=document.querySelector('#svg')
const path=document.querySelector('#path')
const rect=document.querySelector('#rect')
const cir=document.querySelector('#cirs')
const btn5=document.querySelector('.btn5')
const btn6=document.querySelector('.btn6')
const btn7=document.querySelector('.btn7')
const tools=document.querySelector('.tools')
const btn1=document.querySelector('.btn1')
const btn2=document.querySelector('.btn2')

let a = []
let c = []
let cc = []
let r = []
let rr= []
let d;
let selected;
let flag = 0;
let draw = 0;
let recmove = 0;
let circy = 0;
let swap = true;
let stopcir = 0;
let stoprec = 0;

function drag() {
    draw =!draw
}
   svg.addEventListener('mousedown',OnSelect)
   svg.addEventListener('mousemove',move)
   svg.addEventListener('mouseup',()=>(selected=undefined))
    
   function OnSelect(e){
      if(draw == 0) return;
      const circleid=e.target.id
      if(!/C\d/.test(circleid)) return;
      selected=circleid.replace('C',"")
   }
   
   function move(e){
      const actualx=Math.round(e.x/svg.clientWidth*350)
    const actualy=Math.round(e.y/svg.clientHeight*350)
   
    let points = {x:actualx,y:actualy}
    
    a[selected] = points;
   //  drawsvg()
    if(flag == 0){
    drawsvg()} return;
   }

function pendraw() {
   flag = !flag
}
      svg.addEventListener('click',function(e){

       if(e.target.id === 'C0'){ return end()}

       if(flag==0) return;
       const actualx=Math.round(e.x/svg.clientWidth*350)
       const actualy=Math.round(e.y/svg.clientHeight*350)
       
       let points = {x:actualx,y:actualy}
       
       a.push(points)
       drawsvg()

       })

       function drawsvg(){
          grp.innerHTML=''
    for(i=0;i<a.length;i++){
       if(i == 0){
          d=`M ${a[i].x} ${a[i].y}`
         }else{
            d+=`L ${a[i].x} ${a[i].y}`
    }
    drawcircle(a[i].x,a[i].y,i)
    path.setAttribute('d',d)
    }
   
   }

function drawcircle(x,y,i){

   const Islast=(i === a.length-1)
   
   const link='http://www.w3.org/2000/svg'
   const circle=document.createElementNS(link,'circle')
   circle.setAttribute('id',`C${i}`)
   circle.setAttribute('cx',x)
   circle.setAttribute('cy',y)
   circle.setAttribute('r',1.5)
   circle.setAttribute('stroke', Islast ? 'black':'transparent')
   circle.setAttribute('fill', Islast ? 'rgba(82, 220, 233, 0.477)': 'transparent')
   circle.setAttribute('class','ch')
   grp.appendChild(circle)

}

function OnRect(){
   recmove = !recmove
}

btn2.addEventListener('click',function(){

   if(recmove == 0) return;
   svg.addEventListener('mousedown',function(e){
      const recNumber={
         x:Math.abs(e.x/svg.clientWidth*350),
         y:Math.abs(e.y/svg.clientHeight*350)
      }
      
      r.push(recNumber)
      
      RecDraw()
      
   })
   svg.addEventListener('mousemove',function(e){
      
      
      if(stoprec == false) return;
   
   const rNumber={
      x:Math.abs(e.x/svg.clientWidth*350),
      y:Math.abs(e.y/svg.clientHeight*350)
   }
   rr.push(rNumber)
   RecDraw()
})
   
   svg.addEventListener('mouseup',function(){
      stoprec = !stoprec
})

function RecDraw(){
   rect.innerHTML=""
   const link='http://www.w3.org/2000/svg'
   const rects=document.createElementNS(link,'rect')
   
     
    r.map((element3)=>{
      rect.setAttribute('x',element3.x)
      rect.setAttribute('y',element3.y)
    
      rr.map((element4)=>{
        let x2=element4.x
        let y2=element4.y
        let x1=element3.x
        let y1=element3.y
         
        let wid=Math.abs(x2-x1)
        let hei=Math.abs(y2-y1)
        rect.setAttribute('width',wid)
        rect.setAttribute('height',hei)
      }
      )}
      )   
      rect.appendChild(rects)
   }})

function pencircle(){
   circy = !circy
}

btn1.addEventListener('click',function(){
   
   svg.addEventListener('mousedown',function(e){
      const realNumber={
          x:Math.round(e.x/svg.clientWidth*350),
         y:Math.round(e.y/svg.clientHeight*350)
      }
         c.push(realNumber)
         CircleDraw()
      })

   svg.addEventListener('mousemove',function(e){
      
      if(circy == 0) return;
      const Number={
         x:Math.round(e.x/svg.clientWidth*350),
         y:Math.round(e.y/svg.clientHeight*350)
      }
      cc.push(Number)
      CircleDraw()
   })
   svg.addEventListener('mouseup',function(){
      stopcir = !stopcir
   })
     })
      
      function CircleDraw(){
      if(stopcir == 0) return;
      cir.innerHTML=""
      const link='http://www.w3.org/2000/svg'
      const circle2=document.createElementNS(link,'circle')
      
         c.map((element2)=>{
         circle2.setAttribute('cx',element2.x)
         circle2.setAttribute('cy',element2.y)
       
         cc.map((element)=>{
           let x2=element.x
           let y2=element.y
           let x1=element2.x
           let y1=element2.y
            let r = Math.floor(Math.sqrt(Math.pow(x1-x2,2)+(y1-y2,2)))
            circle2.setAttribute('r',r)
         })
          cir.appendChild(circle2)
   })
   }
        btn5.addEventListener('click',function(){
        location.reload()
   })

   btn6.addEventListener('click',function undo(){
      a.pop()
      drawsvg()
    })
   function swaps(){
      swap = !swap
      // console.log(swap)
   }
   btn7.addEventListener('click',function(){
      if(swap == true){
   document.body.style.background="black"
   path.setAttribute('stroke','lime')
   path.setAttribute('stroke-width','2')
   rect.setAttribute('stroke','white')
   cirs.setAttribute('stroke','white')
}else{
   document.body.style.background="white"}
})

function end(){
   let d=path.getAttribute('d')
  d+='Z'
  path.setAttribute('d',d)
  let lastCircle=document.querySelector(`#C${a.length-1}`)
     lastCircle.style.fill='transparent'
     lastCircle.style.stroke='transparent'
}