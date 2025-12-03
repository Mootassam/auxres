import{n as C,P as ue,i as I,u as G,V,W as fe,j as d,L as pe}from"./index-7100f67f.js";import{u as me}from"./useDispatch-b386ec41.js";var ge=Object.defineProperty,z=Object.getOwnPropertySymbols,W=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable,X=(u,a,r)=>a in u?ge(u,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):u[a]=r,F=(u,a)=>{for(var r in a||(a={}))W.call(a,r)&&X(u,r,a[r]);if(z)for(var r of z(a))q.call(a,r)&&X(u,r,a[r]);return u},D=(u,a)=>{var r={};for(var c in u)W.call(u,c)&&a.indexOf(c)<0&&(r[c]=u[c]);if(u!=null&&z)for(var c of z(u))a.indexOf(c)<0&&q.call(u,c)&&(r[c]=u[c]);return r};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var P;(u=>{const a=class g{constructor(e,n,t,o){if(this.version=e,this.errorCorrectionLevel=n,this.modules=[],this.isFunction=[],e<g.MIN_VERSION||e>g.MAX_VERSION)throw new RangeError("Version value out of range");if(o<-1||o>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let s=[];for(let i=0;i<this.size;i++)s.push(!1);for(let i=0;i<this.size;i++)this.modules.push(s.slice()),this.isFunction.push(s.slice());this.drawFunctionPatterns();const l=this.addEccAndInterleave(t);if(this.drawCodewords(l),o==-1){let i=1e9;for(let h=0;h<8;h++){this.applyMask(h),this.drawFormatBits(h);const p=this.getPenaltyScore();p<i&&(o=h,i=p),this.applyMask(h)}}x(0<=o&&o<=7),this.mask=o,this.applyMask(o),this.drawFormatBits(o),this.isFunction=[]}static encodeText(e,n){const t=u.QrSegment.makeSegments(e);return g.encodeSegments(t,n)}static encodeBinary(e,n){const t=u.QrSegment.makeBytes(e);return g.encodeSegments([t],n)}static encodeSegments(e,n,t=1,o=40,s=-1,l=!0){if(!(g.MIN_VERSION<=t&&t<=o&&o<=g.MAX_VERSION)||s<-1||s>7)throw new RangeError("Invalid value");let i,h;for(i=t;;i++){const m=g.getNumDataCodewords(i,n)*8,v=E.getTotalBits(e,i);if(v<=m){h=v;break}if(i>=o)throw new RangeError("Data too long")}for(const m of[g.Ecc.MEDIUM,g.Ecc.QUARTILE,g.Ecc.HIGH])l&&h<=g.getNumDataCodewords(i,m)*8&&(n=m);let p=[];for(const m of e){r(m.mode.modeBits,4,p),r(m.numChars,m.mode.numCharCountBits(i),p);for(const v of m.getData())p.push(v)}x(p.length==h);const N=g.getNumDataCodewords(i,n)*8;x(p.length<=N),r(0,Math.min(4,N-p.length),p),r(0,(8-p.length%8)%8,p),x(p.length%8==0);for(let m=236;p.length<N;m^=253)r(m,8,p);let y=[];for(;y.length*8<p.length;)y.push(0);return p.forEach((m,v)=>y[v>>>3]|=m<<7-(v&7)),new g(i,n,y,s)}getModule(e,n){return 0<=e&&e<this.size&&0<=n&&n<this.size&&this.modules[n][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),n=e.length;for(let t=0;t<n;t++)for(let o=0;o<n;o++)t==0&&o==0||t==0&&o==n-1||t==n-1&&o==0||this.drawAlignmentPattern(e[t],e[o]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const n=this.errorCorrectionLevel.formatBits<<3|e;let t=n;for(let s=0;s<10;s++)t=t<<1^(t>>>9)*1335;const o=(n<<10|t)^21522;x(o>>>15==0);for(let s=0;s<=5;s++)this.setFunctionModule(8,s,c(o,s));this.setFunctionModule(8,7,c(o,6)),this.setFunctionModule(8,8,c(o,7)),this.setFunctionModule(7,8,c(o,8));for(let s=9;s<15;s++)this.setFunctionModule(14-s,8,c(o,s));for(let s=0;s<8;s++)this.setFunctionModule(this.size-1-s,8,c(o,s));for(let s=8;s<15;s++)this.setFunctionModule(8,this.size-15+s,c(o,s));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const n=this.version<<12|e;x(n>>>18==0);for(let t=0;t<18;t++){const o=c(n,t),s=this.size-11+t%3,l=Math.floor(t/3);this.setFunctionModule(s,l,o),this.setFunctionModule(l,s,o)}}drawFinderPattern(e,n){for(let t=-4;t<=4;t++)for(let o=-4;o<=4;o++){const s=Math.max(Math.abs(o),Math.abs(t)),l=e+o,i=n+t;0<=l&&l<this.size&&0<=i&&i<this.size&&this.setFunctionModule(l,i,s!=2&&s!=4)}}drawAlignmentPattern(e,n){for(let t=-2;t<=2;t++)for(let o=-2;o<=2;o++)this.setFunctionModule(e+o,n+t,Math.max(Math.abs(o),Math.abs(t))!=1)}setFunctionModule(e,n,t){this.modules[n][e]=t,this.isFunction[n][e]=!0}addEccAndInterleave(e){const n=this.version,t=this.errorCorrectionLevel;if(e.length!=g.getNumDataCodewords(n,t))throw new RangeError("Invalid argument");const o=g.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][n],s=g.ECC_CODEWORDS_PER_BLOCK[t.ordinal][n],l=Math.floor(g.getNumRawDataModules(n)/8),i=o-l%o,h=Math.floor(l/o);let p=[];const N=g.reedSolomonComputeDivisor(s);for(let m=0,v=0;m<o;m++){let M=e.slice(v,v+h-s+(m<i?0:1));v+=M.length;const L=g.reedSolomonComputeRemainder(M,N);m<i&&M.push(0),p.push(M.concat(L))}let y=[];for(let m=0;m<p[0].length;m++)p.forEach((v,M)=>{(m!=h-s||M>=i)&&y.push(v[m])});return x(y.length==l),y}drawCodewords(e){if(e.length!=Math.floor(g.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let n=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let o=0;o<this.size;o++)for(let s=0;s<2;s++){const l=t-s,h=(t+1&2)==0?this.size-1-o:o;!this.isFunction[h][l]&&n<e.length*8&&(this.modules[h][l]=c(e[n>>>3],7-(n&7)),n++)}}x(n==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let n=0;n<this.size;n++)for(let t=0;t<this.size;t++){let o;switch(e){case 0:o=(t+n)%2==0;break;case 1:o=n%2==0;break;case 2:o=t%3==0;break;case 3:o=(t+n)%3==0;break;case 4:o=(Math.floor(t/3)+Math.floor(n/2))%2==0;break;case 5:o=t*n%2+t*n%3==0;break;case 6:o=(t*n%2+t*n%3)%2==0;break;case 7:o=((t+n)%2+t*n%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[n][t]&&o&&(this.modules[n][t]=!this.modules[n][t])}}getPenaltyScore(){let e=0;for(let s=0;s<this.size;s++){let l=!1,i=0,h=[0,0,0,0,0,0,0];for(let p=0;p<this.size;p++)this.modules[s][p]==l?(i++,i==5?e+=g.PENALTY_N1:i>5&&e++):(this.finderPenaltyAddHistory(i,h),l||(e+=this.finderPenaltyCountPatterns(h)*g.PENALTY_N3),l=this.modules[s][p],i=1);e+=this.finderPenaltyTerminateAndCount(l,i,h)*g.PENALTY_N3}for(let s=0;s<this.size;s++){let l=!1,i=0,h=[0,0,0,0,0,0,0];for(let p=0;p<this.size;p++)this.modules[p][s]==l?(i++,i==5?e+=g.PENALTY_N1:i>5&&e++):(this.finderPenaltyAddHistory(i,h),l||(e+=this.finderPenaltyCountPatterns(h)*g.PENALTY_N3),l=this.modules[p][s],i=1);e+=this.finderPenaltyTerminateAndCount(l,i,h)*g.PENALTY_N3}for(let s=0;s<this.size-1;s++)for(let l=0;l<this.size-1;l++){const i=this.modules[s][l];i==this.modules[s][l+1]&&i==this.modules[s+1][l]&&i==this.modules[s+1][l+1]&&(e+=g.PENALTY_N2)}let n=0;for(const s of this.modules)n=s.reduce((l,i)=>l+(i?1:0),n);const t=this.size*this.size,o=Math.ceil(Math.abs(n*20-t*10)/t)-1;return x(0<=o&&o<=9),e+=o*g.PENALTY_N4,x(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,n=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let o=this.size-7;t.length<e;o-=n)t.splice(1,0,o);return t}}static getNumRawDataModules(e){if(e<g.MIN_VERSION||e>g.MAX_VERSION)throw new RangeError("Version number out of range");let n=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;n-=(25*t-10)*t-55,e>=7&&(n-=36)}return x(208<=n&&n<=29648),n}static getNumDataCodewords(e,n){return Math.floor(g.getNumRawDataModules(e)/8)-g.ECC_CODEWORDS_PER_BLOCK[n.ordinal][e]*g.NUM_ERROR_CORRECTION_BLOCKS[n.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let n=[];for(let o=0;o<e-1;o++)n.push(0);n.push(1);let t=1;for(let o=0;o<e;o++){for(let s=0;s<n.length;s++)n[s]=g.reedSolomonMultiply(n[s],t),s+1<n.length&&(n[s]^=n[s+1]);t=g.reedSolomonMultiply(t,2)}return n}static reedSolomonComputeRemainder(e,n){let t=n.map(o=>0);for(const o of e){const s=o^t.shift();t.push(0),n.forEach((l,i)=>t[i]^=g.reedSolomonMultiply(l,s))}return t}static reedSolomonMultiply(e,n){if(e>>>8||n>>>8)throw new RangeError("Byte out of range");let t=0;for(let o=7;o>=0;o--)t=t<<1^(t>>>7)*285,t^=(n>>>o&1)*e;return x(t>>>8==0),t}finderPenaltyCountPatterns(e){const n=e[1];x(n<=this.size*3);const t=n>0&&e[2]==n&&e[3]==n*3&&e[4]==n&&e[5]==n;return(t&&e[0]>=n*4&&e[6]>=n?1:0)+(t&&e[6]>=n*4&&e[0]>=n?1:0)}finderPenaltyTerminateAndCount(e,n,t){return e&&(this.finderPenaltyAddHistory(n,t),n=0),n+=this.size,this.finderPenaltyAddHistory(n,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,n){n[0]==0&&(e+=this.size),n.pop(),n.unshift(e)}};a.MIN_VERSION=1,a.MAX_VERSION=40,a.PENALTY_N1=3,a.PENALTY_N2=3,a.PENALTY_N3=40,a.PENALTY_N4=10,a.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],a.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],u.QrCode=a;function r(w,e,n){if(e<0||e>31||w>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)n.push(w>>>t&1)}function c(w,e){return(w>>>e&1)!=0}function x(w){if(!w)throw new Error("Assertion error")}const f=class b{constructor(e,n,t){if(this.mode=e,this.numChars=n,this.bitData=t,n<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let n=[];for(const t of e)r(t,8,n);return new b(b.Mode.BYTE,e.length,n)}static makeNumeric(e){if(!b.isNumeric(e))throw new RangeError("String contains non-numeric characters");let n=[];for(let t=0;t<e.length;){const o=Math.min(e.length-t,3);r(parseInt(e.substring(t,t+o),10),o*3+1,n),t+=o}return new b(b.Mode.NUMERIC,e.length,n)}static makeAlphanumeric(e){if(!b.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let n=[],t;for(t=0;t+2<=e.length;t+=2){let o=b.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;o+=b.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),r(o,11,n)}return t<e.length&&r(b.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,n),new b(b.Mode.ALPHANUMERIC,e.length,n)}static makeSegments(e){return e==""?[]:b.isNumeric(e)?[b.makeNumeric(e)]:b.isAlphanumeric(e)?[b.makeAlphanumeric(e)]:[b.makeBytes(b.toUtf8ByteArray(e))]}static makeEci(e){let n=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)r(e,8,n);else if(e<16384)r(2,2,n),r(e,14,n);else if(e<1e6)r(6,3,n),r(e,21,n);else throw new RangeError("ECI assignment value out of range");return new b(b.Mode.ECI,0,n)}static isNumeric(e){return b.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return b.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,n){let t=0;for(const o of e){const s=o.mode.numCharCountBits(n);if(o.numChars>=1<<s)return 1/0;t+=4+s+o.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let n=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?n.push(e.charCodeAt(t)):(n.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return n}};f.NUMERIC_REGEX=/^[0-9]*$/,f.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,f.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let E=f;u.QrSegment=f})(P||(P={}));(u=>{(a=>{const r=class{constructor(x,f){this.ordinal=x,this.formatBits=f}};r.LOW=new r(0,1),r.MEDIUM=new r(1,0),r.QUARTILE=new r(2,3),r.HIGH=new r(3,2),a.Ecc=r})(u.QrCode||(u.QrCode={}))})(P||(P={}));(u=>{(a=>{const r=class{constructor(x,f){this.modeBits=x,this.numBitsCharCount=f}numCharCountBits(x){return this.numBitsCharCount[Math.floor((x+7)/17)]}};r.NUMERIC=new r(1,[10,12,14]),r.ALPHANUMERIC=new r(2,[9,11,13]),r.BYTE=new r(4,[8,16,16]),r.KANJI=new r(8,[8,10,12]),r.ECI=new r(7,[0,0,0]),a.Mode=r})(u.QrSegment||(u.QrSegment={}))})(P||(P={}));var k=P;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var xe={L:k.QrCode.Ecc.LOW,M:k.QrCode.Ecc.MEDIUM,Q:k.QrCode.Ecc.QUARTILE,H:k.QrCode.Ecc.HIGH},K=128,Z="L",J="#FFFFFF",ee="#000000",te=!1,ne=1,we=4,be=0,Ee=.1;function oe(u,a=0){const r=[];return u.forEach(function(c,x){let f=null;c.forEach(function(E,w){if(!E&&f!==null){r.push(`M${f+a} ${x+a}h${w-f}v1H${f+a}z`),f=null;return}if(w===c.length-1){if(!E)return;f===null?r.push(`M${w+a},${x+a} h1v1H${w+a}z`):r.push(`M${f+a},${x+a} h${w+1-f}v1H${f+a}z`);return}E&&f===null&&(f=w)})}),r.join("")}function se(u,a){return u.slice().map((r,c)=>c<a.y||c>=a.y+a.h?r:r.map((x,f)=>f<a.x||f>=a.x+a.w?x:!1))}function ve(u,a,r,c){if(c==null)return null;const x=u.length+r*2,f=Math.floor(a*Ee),E=x/a,w=(c.width||f)*E,e=(c.height||f)*E,n=c.x==null?u.length/2-w/2:c.x*E,t=c.y==null?u.length/2-e/2:c.y*E,o=c.opacity==null?1:c.opacity;let s=null;if(c.excavate){let i=Math.floor(n),h=Math.floor(t),p=Math.ceil(w+n-i),N=Math.ceil(e+t-h);s={x:i,y:h,w:p,h:N}}const l=c.crossOrigin;return{x:n,y:t,h:e,w,excavation:s,opacity:o,crossOrigin:l}}function Ce(u,a){return a!=null?Math.max(Math.floor(a),0):u?we:be}function re({value:u,level:a,minVersion:r,includeMargin:c,marginSize:x,imageSettings:f,size:E,boostLevel:w}){let e=C.useMemo(()=>{const i=(Array.isArray(u)?u:[u]).reduce((h,p)=>(h.push(...k.QrSegment.makeSegments(p)),h),[]);return k.QrCode.encodeSegments(i,xe[a],r,void 0,void 0,w)},[u,a,r,w]);const{cells:n,margin:t,numCells:o,calculatedImageSettings:s}=C.useMemo(()=>{let l=e.getModules();const i=Ce(c,x),h=l.length+i*2,p=ve(l,E,i,f);return{cells:l,margin:i,numCells:h,calculatedImageSettings:p}},[e,E,f,c,x]);return{qrcode:e,margin:t,cells:n,numCells:o,calculatedImageSettings:s}}var ye=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),ie=C.forwardRef(function(a,r){const c=a,{value:x,size:f=K,level:E=Z,bgColor:w=J,fgColor:e=ee,includeMargin:n=te,minVersion:t=ne,boostLevel:o,marginSize:s,imageSettings:l}=c,h=D(c,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:p}=h,N=D(h,["style"]),y=l==null?void 0:l.src,m=C.useRef(null),v=C.useRef(null),M=C.useCallback(S=>{m.current=S,typeof r=="function"?r(S):r&&(r.current=S)},[r]),[L,U]=C.useState(!1),{margin:B,cells:O,numCells:T,calculatedImageSettings:R}=re({value:x,level:E,minVersion:t,boostLevel:o,includeMargin:n,marginSize:s,imageSettings:l,size:f});C.useEffect(()=>{if(m.current!=null){const S=m.current,A=S.getContext("2d");if(!A)return;let _=O;const j=v.current,H=R!=null&&j!==null&&j.complete&&j.naturalHeight!==0&&j.naturalWidth!==0;H&&R.excavation!=null&&(_=se(O,R.excavation));const Y=window.devicePixelRatio||1;S.height=S.width=f*Y;const $=f/T*Y;A.scale($,$),A.fillStyle=w,A.fillRect(0,0,T,T),A.fillStyle=e,ye?A.fill(new Path2D(oe(_,B))):O.forEach(function(le,ce){le.forEach(function(de,he){de&&A.fillRect(he+B,ce+B,1,1)})}),R&&(A.globalAlpha=R.opacity),H&&A.drawImage(j,R.x+B,R.y+B,R.w,R.h)}}),C.useEffect(()=>{U(!1)},[y]);const ae=F({height:f,width:f},p);let Q=null;return y!=null&&(Q=C.createElement("img",{src:y,key:y,style:{display:"none"},onLoad:()=>{U(!0)},ref:v,crossOrigin:R==null?void 0:R.crossOrigin})),C.createElement(C.Fragment,null,C.createElement("canvas",F({style:ae,height:f,width:f,ref:M,role:"img"},N)),Q)});ie.displayName="QRCodeCanvas";var Ne=C.forwardRef(function(a,r){const c=a,{value:x,size:f=K,level:E=Z,bgColor:w=J,fgColor:e=ee,includeMargin:n=te,minVersion:t=ne,boostLevel:o,title:s,marginSize:l,imageSettings:i}=c,h=D(c,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:p,cells:N,numCells:y,calculatedImageSettings:m}=re({value:x,level:E,minVersion:t,boostLevel:o,includeMargin:n,marginSize:l,imageSettings:i,size:f});let v=N,M=null;i!=null&&m!=null&&(m.excavation!=null&&(v=se(N,m.excavation)),M=C.createElement("image",{href:i.src,height:m.h,width:m.w,x:m.x+p,y:m.y+p,preserveAspectRatio:"none",opacity:m.opacity,crossOrigin:m.crossOrigin}));const L=oe(v,p);return C.createElement("svg",F({height:f,width:f,viewBox:`0 0 ${y} ${y}`,ref:r,role:"img"},h),!!s&&C.createElement("title",null,s),C.createElement("path",{fill:w,d:`M0,0 h${y}v${y}H0z`,shapeRendering:"crispEdges"}),C.createElement("path",{fill:e,d:L,shapeRendering:"crispEdges"}),M)});Ne.displayName="QRCodeSVG";function Pe(){const u=me(),{symbol:a}=ue(),[r,c]=I.useState(a||"ETH"),[x,f]=I.useState(!1),[E,w]=I.useState("Address copied"),e=G(V.selectRows);G(V.selectLoading);const[n,t]=I.useState("");I.useEffect(()=>{u(fe.doFetch())},[u]),I.useEffect(()=>{if(e&&e.length>0){const i=e.find(h=>h.symbol===r);t(i&&i.address||"0xBcBEF105855cB0f29f1b100B28eC4BB18eE911A4")}else t("0xBcBEF105855cB0f29f1b100B28eC4BB18eE911A4")},[r,e]);const o=()=>{if(!n){console.error("No address to copy");return}navigator.clipboard.writeText(n).then(()=>{w("Address copied"),f(!0),setTimeout(()=>f(!1),3e3)}).catch(i=>{console.error("Failed to copy address: ",i)})},s=()=>{const i=document.querySelector(".qr-box canvas");if(i){const h=document.createElement("a");h.download=`${r}-deposit-address.png`,h.href=i.toDataURL("image/png"),h.click(),w("QR code saved"),f(!0),setTimeout(()=>f(!1),3e3)}},l=i=>{c(i.target.value)};return d.jsxs("div",{className:"deposit-container",children:[d.jsx("div",{className:"header",children:d.jsxs("div",{className:"nav-bar",children:[d.jsx(pe,{to:"/deposit",className:"back-arrow",children:d.jsx("i",{className:"fas fa-arrow-left"})}),d.jsx("div",{className:"page-title",children:"Deposit"})]})}),d.jsx("div",{className:"content-card",children:d.jsxs("div",{className:"deposit-content",children:[d.jsxs("div",{className:"section",children:[d.jsx("div",{className:"section-label",children:"Deposit currency"}),d.jsxs("div",{className:"currency-display",children:[d.jsx("div",{className:"currency-icon",children:d.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r}.png`,alt:r,onError:i=>{i.target.onerror=null,i.target.style.display="none";const h=i.target.parentElement;h&&(h.textContent=r,h.style.background="#f0f0f0",h.style.color="#333")}})}),d.jsx("div",{className:"currency-name",children:r})]}),d.jsx("div",{className:"section-note",children:"Fixed currency - cannot be changed"})]}),d.jsxs("div",{className:"section",children:[d.jsx("div",{className:"section-label",children:"Deposit network"}),d.jsxs("div",{className:"network-select-wrapper",children:[d.jsxs("select",{className:"network-select",value:r,onChange:l,children:[d.jsx("option",{value:"ETH",children:"Ethereum (ERC20)"}),d.jsx("option",{value:"BSC",children:"Binance Smart Chain (BEP20)"}),d.jsx("option",{value:"TRX",children:"Tron (TRC20)"}),d.jsx("option",{value:"SOL",children:"Solana"}),d.jsx("option",{value:"BTC",children:"Bitcoin"})]}),d.jsx("div",{className:"select-arrow",children:d.jsx("i",{className:"fas fa-chevron-down"})})]})]}),d.jsxs("div",{className:"qr-section",children:[d.jsx("div",{className:"section-label",children:"Save QR code"}),d.jsxs("div",{className:"qr-container",children:[d.jsx("div",{className:"qr-box",children:d.jsx(ie,{value:n,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0})}),d.jsxs("div",{className:"address-section",children:[d.jsx("div",{className:"address-label",children:"Wallet Address"}),d.jsx("div",{className:"address-text",id:"walletAddress",children:n}),d.jsxs("div",{className:"address-actions",children:[d.jsxs("button",{type:"button",className:"action-btn copy-btn",onClick:o,children:[d.jsx("i",{className:"fas fa-copy"})," Copy Address"]}),d.jsxs("button",{type:"button",className:"action-btn save-btn",onClick:s,children:[d.jsx("i",{className:"fas fa-download"})," Save QR Code"]})]})]})]})]}),d.jsxs("div",{className:"hint-section",children:[d.jsx("div",{className:"hint-title",children:"Hint"}),d.jsxs("div",{className:"hint-content",children:[d.jsx("div",{className:"hint-item",children:"1. Please select the above-mentioned token system and currency type and transfer the corresponding amount for deposit. Please do not transfer any other irrelevant assets, otherwise they will not be retrieved."}),d.jsx("div",{className:"hint-item",children:"2. After you recharge the above address, you need to confirm the entire network node before it can be credited;"}),d.jsx("div",{className:"hint-item",children:"3. Please make sure that your computer and browser are safe to prevent information from being tampered with or leaked;"}),d.jsx("div",{className:"hint-item",children:"4. The above deposit address is the official payment address of the platform, please look for the official deposit address of the platform, and the loss of funds caused by incorrect charging shall be borne by yourself;"})]})]})]})}),d.jsxs("div",{className:`toast ${x?"visible":""}`,children:[d.jsx("i",{className:"fas fa-check-circle toast-icon"}),E]}),d.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .deposit-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching HelpCenter */
        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card - Matching HelpCenter */
        .content-card {
          background: #f2f4f7;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .deposit-content {
          width: 100%;
        }

        /* Section Styles */
        .section {
          margin-bottom: 14px;
        }

        .section-label {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 8px;
        }

        /* Currency Display */
        .currency-display {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          margin-bottom: 8px;
        }

        .currency-icon {
          width: 23px;
          height: 23px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          overflow: hidden;
        }

        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .currency-icon:not(:has(img)) {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .currency-name {
          font-size: 13px;
          font-weight: 600;
          color: #222;
        }

        .section-note {
          font-size: 12px;
          color: #666;
          font-style: italic;
        }

        /* Network Select */
        .network-select-wrapper {
          position: relative;
        }

        .network-select {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 14px;
          background-color: white;
          color: #333;
          appearance: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .network-select:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
        }

        /* QR Section */
        .qr-container {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .qr-box {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          padding: 10px;
          background: white;
          border-radius: 8px;
        }

        .qr-box canvas {
          border-radius: 8px;
        }

        .address-section {
          text-align: center;
        }

        .address-label {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          margin-bottom: 12px;
        }

        .address-text {
          font-size: 13px;
          color: #333;
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          word-break: break-all;
          font-family: monospace;
          line-height: 1.4;
        }

        .address-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .action-btn {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .copy-btn {
          background: #106cf5;
          color: white;
        }

        .copy-btn:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
        }

        .save-btn {
          background: white;
          color: #106cf5;
          border: 1px solid #106cf5;
        }

        .save-btn:hover {
          background: #f0f7ff;
          transform: translateY(-2px);
        }

        /* Hint Section */
        .hint-section {
          margin-top: 24px;
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .hint-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 12px;
        }

        .hint-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .hint-item {
          font-size: 10px;
          color: #666;
          line-height: 1.4;
          position: relative;
          padding-left: 12px;
        }

        .hint-item::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #106cf5;
          font-weight: bold;
        }

        /* Toast Notification */
        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.3s ease;
          z-index: 1000;
        }

        .toast.visible {
          transform: translateX(-50%) translateY(0);
        }

        .toast-icon {
          color: #4CAF50;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .deposit-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
            border-radius: 30px 30px 0 0;
          }

          .currency-display {
            padding: 12px;
          }

          .currency-icon {
            width: 36px;
            height: 36px;
          }

          .currency-name {
            font-size: 15px;
          }

          .network-select {
            padding: 12px 14px;
            font-size: 14px;
          }

          .qr-container {
            padding: 20px;
          }

          .qr-box canvas {
            width: 160px;
            height: 160px;
          }

          .address-text {
            font-size: 12px;
            padding: 10px;
          }

          .address-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }

          .hint-section {
            padding: 16px;
          }

          .hint-title {
            font-size: 13px;
          }

          .hint-item {
            font-size: 9px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .deposit-content {
            max-width: 500px;
            margin: 0 auto;
          }

          .address-actions {
            flex-direction: row;
          }
        }
      `})]})}export{Pe as default};
