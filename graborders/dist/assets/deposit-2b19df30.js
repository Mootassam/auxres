import{n as R,S as me,u as K,V as Z,i as I,X as pe,Y as ge,Z as xe,W as be,j as i,L as we,_ as ve}from"./index-3c6c971f.js";import{u as ye,y as Ee,F as Ne}from"./FormErrors-53875466.js";import{F as J}from"./FieldFormItem-0206dc1d.js";import{u as Ce}from"./useDispatch-55cc451c.js";var Me=Object.defineProperty,V=Object.getOwnPropertySymbols,te=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable,ee=(u,l,n)=>l in u?Me(u,l,{enumerable:!0,configurable:!0,writable:!0,value:n}):u[l]=n,X=(u,l)=>{for(var n in l||(l={}))te.call(l,n)&&ee(u,n,l[n]);if(V)for(var n of V(l))oe.call(l,n)&&ee(u,n,l[n]);return u},q=(u,l)=>{var n={};for(var d in u)te.call(u,d)&&l.indexOf(d)<0&&(n[d]=u[d]);if(u!=null&&V)for(var d of V(u))l.indexOf(d)<0&&oe.call(u,d)&&(n[d]=u[d]);return n};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var U;(u=>{const l=class b{constructor(e,o,t,s){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<b.MIN_VERSION||e>b.MAX_VERSION)throw new RangeError("Version value out of range");if(s<-1||s>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let r=[];for(let a=0;a<this.size;a++)r.push(!1);for(let a=0;a<this.size;a++)this.modules.push(r.slice()),this.isFunction.push(r.slice());this.drawFunctionPatterns();const c=this.addEccAndInterleave(t);if(this.drawCodewords(c),s==-1){let a=1e9;for(let p=0;p<8;p++){this.applyMask(p),this.drawFormatBits(p);const f=this.getPenaltyScore();f<a&&(s=p,a=f),this.applyMask(p)}}x(0<=s&&s<=7),this.mask=s,this.applyMask(s),this.drawFormatBits(s),this.isFunction=[]}static encodeText(e,o){const t=u.QrSegment.makeSegments(e);return b.encodeSegments(t,o)}static encodeBinary(e,o){const t=u.QrSegment.makeBytes(e);return b.encodeSegments([t],o)}static encodeSegments(e,o,t=1,s=40,r=-1,c=!0){if(!(b.MIN_VERSION<=t&&t<=s&&s<=b.MAX_VERSION)||r<-1||r>7)throw new RangeError("Invalid value");let a,p;for(a=t;;a++){const h=b.getNumDataCodewords(a,o)*8,E=v.getTotalBits(e,a);if(E<=h){p=E;break}if(a>=s)throw new RangeError("Data too long")}for(const h of[b.Ecc.MEDIUM,b.Ecc.QUARTILE,b.Ecc.HIGH])c&&p<=b.getNumDataCodewords(a,h)*8&&(o=h);let f=[];for(const h of e){n(h.mode.modeBits,4,f),n(h.numChars,h.mode.numCharCountBits(a),f);for(const E of h.getData())f.push(E)}x(f.length==p);const S=b.getNumDataCodewords(a,o)*8;x(f.length<=S),n(0,Math.min(4,S-f.length),f),n(0,(8-f.length%8)%8,f),x(f.length%8==0);for(let h=236;f.length<S;h^=253)n(h,8,f);let C=[];for(;C.length*8<f.length;)C.push(0);return f.forEach((h,E)=>C[E>>>3]|=h<<7-(E&7)),new b(a,o,C,r)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let s=0;s<o;s++)t==0&&s==0||t==0&&s==o-1||t==o-1&&s==0||this.drawAlignmentPattern(e[t],e[s]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let r=0;r<10;r++)t=t<<1^(t>>>9)*1335;const s=(o<<10|t)^21522;x(s>>>15==0);for(let r=0;r<=5;r++)this.setFunctionModule(8,r,d(s,r));this.setFunctionModule(8,7,d(s,6)),this.setFunctionModule(8,8,d(s,7)),this.setFunctionModule(7,8,d(s,8));for(let r=9;r<15;r++)this.setFunctionModule(14-r,8,d(s,r));for(let r=0;r<8;r++)this.setFunctionModule(this.size-1-r,8,d(s,r));for(let r=8;r<15;r++)this.setFunctionModule(8,this.size-15+r,d(s,r));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;x(o>>>18==0);for(let t=0;t<18;t++){const s=d(o,t),r=this.size-11+t%3,c=Math.floor(t/3);this.setFunctionModule(r,c,s),this.setFunctionModule(c,r,s)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let s=-4;s<=4;s++){const r=Math.max(Math.abs(s),Math.abs(t)),c=e+s,a=o+t;0<=c&&c<this.size&&0<=a&&a<this.size&&this.setFunctionModule(c,a,r!=2&&r!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let s=-2;s<=2;s++)this.setFunctionModule(e+s,o+t,Math.max(Math.abs(s),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=b.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const s=b.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],r=b.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],c=Math.floor(b.getNumRawDataModules(o)/8),a=s-c%s,p=Math.floor(c/s);let f=[];const S=b.reedSolomonComputeDivisor(r);for(let h=0,E=0;h<s;h++){let j=e.slice(E,E+p-r+(h<a?0:1));E+=j.length;const L=b.reedSolomonComputeRemainder(j,S);h<a&&j.push(0),f.push(j.concat(L))}let C=[];for(let h=0;h<f[0].length;h++)f.forEach((E,j)=>{(h!=p-r||j>=a)&&C.push(E[h])});return x(C.length==c),C}drawCodewords(e){if(e.length!=Math.floor(b.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let s=0;s<this.size;s++)for(let r=0;r<2;r++){const c=t-r,p=(t+1&2)==0?this.size-1-s:s;!this.isFunction[p][c]&&o<e.length*8&&(this.modules[p][c]=d(e[o>>>3],7-(o&7)),o++)}}x(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let s;switch(e){case 0:s=(t+o)%2==0;break;case 1:s=o%2==0;break;case 2:s=t%3==0;break;case 3:s=(t+o)%3==0;break;case 4:s=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:s=t*o%2+t*o%3==0;break;case 6:s=(t*o%2+t*o%3)%2==0;break;case 7:s=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&s&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let r=0;r<this.size;r++){let c=!1,a=0,p=[0,0,0,0,0,0,0];for(let f=0;f<this.size;f++)this.modules[r][f]==c?(a++,a==5?e+=b.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,p),c||(e+=this.finderPenaltyCountPatterns(p)*b.PENALTY_N3),c=this.modules[r][f],a=1);e+=this.finderPenaltyTerminateAndCount(c,a,p)*b.PENALTY_N3}for(let r=0;r<this.size;r++){let c=!1,a=0,p=[0,0,0,0,0,0,0];for(let f=0;f<this.size;f++)this.modules[f][r]==c?(a++,a==5?e+=b.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,p),c||(e+=this.finderPenaltyCountPatterns(p)*b.PENALTY_N3),c=this.modules[f][r],a=1);e+=this.finderPenaltyTerminateAndCount(c,a,p)*b.PENALTY_N3}for(let r=0;r<this.size-1;r++)for(let c=0;c<this.size-1;c++){const a=this.modules[r][c];a==this.modules[r][c+1]&&a==this.modules[r+1][c]&&a==this.modules[r+1][c+1]&&(e+=b.PENALTY_N2)}let o=0;for(const r of this.modules)o=r.reduce((c,a)=>c+(a?1:0),o);const t=this.size*this.size,s=Math.ceil(Math.abs(o*20-t*10)/t)-1;return x(0<=s&&s<=9),e+=s*b.PENALTY_N4,x(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let s=this.size-7;t.length<e;s-=o)t.splice(1,0,s);return t}}static getNumRawDataModules(e){if(e<b.MIN_VERSION||e>b.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return x(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(b.getNumRawDataModules(e)/8)-b.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*b.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let s=0;s<e-1;s++)o.push(0);o.push(1);let t=1;for(let s=0;s<e;s++){for(let r=0;r<o.length;r++)o[r]=b.reedSolomonMultiply(o[r],t),r+1<o.length&&(o[r]^=o[r+1]);t=b.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(s=>0);for(const s of e){const r=s^t.shift();t.push(0),o.forEach((c,a)=>t[a]^=b.reedSolomonMultiply(c,r))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let s=7;s>=0;s--)t=t<<1^(t>>>7)*285,t^=(o>>>s&1)*e;return x(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];x(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};l.MIN_VERSION=1,l.MAX_VERSION=40,l.PENALTY_N1=3,l.PENALTY_N2=3,l.PENALTY_N3=40,l.PENALTY_N4=10,l.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],l.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],u.QrCode=l;function n(y,e,o){if(e<0||e>31||y>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(y>>>t&1)}function d(y,e){return(y>>>e&1)!=0}function x(y){if(!y)throw new Error("Assertion error")}const m=class M{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)n(t,8,o);return new M(M.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!M.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const s=Math.min(e.length-t,3);n(parseInt(e.substring(t,t+s),10),s*3+1,o),t+=s}return new M(M.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!M.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let s=M.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;s+=M.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),n(s,11,o)}return t<e.length&&n(M.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new M(M.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:M.isNumeric(e)?[M.makeNumeric(e)]:M.isAlphanumeric(e)?[M.makeAlphanumeric(e)]:[M.makeBytes(M.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)n(e,8,o);else if(e<16384)n(2,2,o),n(e,14,o);else if(e<1e6)n(6,3,o),n(e,21,o);else throw new RangeError("ECI assignment value out of range");return new M(M.Mode.ECI,0,o)}static isNumeric(e){return M.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return M.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const s of e){const r=s.mode.numCharCountBits(o);if(s.numChars>=1<<r)return 1/0;t+=4+r+s.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};m.NUMERIC_REGEX=/^[0-9]*$/,m.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,m.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let v=m;u.QrSegment=m})(U||(U={}));(u=>{(l=>{const n=class{constructor(x,m){this.ordinal=x,this.formatBits=m}};n.LOW=new n(0,1),n.MEDIUM=new n(1,0),n.QUARTILE=new n(2,3),n.HIGH=new n(3,2),l.Ecc=n})(u.QrCode||(u.QrCode={}))})(U||(U={}));(u=>{(l=>{const n=class{constructor(x,m){this.modeBits=x,this.numBitsCharCount=m}numCharCountBits(x){return this.numBitsCharCount[Math.floor((x+7)/17)]}};n.NUMERIC=new n(1,[10,12,14]),n.ALPHANUMERIC=new n(2,[9,11,13]),n.BYTE=new n(4,[8,16,16]),n.KANJI=new n(8,[8,10,12]),n.ECI=new n(7,[0,0,0]),l.Mode=n})(u.QrSegment||(u.QrSegment={}))})(U||(U={}));var _=U;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Se={L:_.QrCode.Ecc.LOW,M:_.QrCode.Ecc.MEDIUM,Q:_.QrCode.Ecc.QUARTILE,H:_.QrCode.Ecc.HIGH},se=128,ne="L",re="#FFFFFF",ie="#000000",ae=!1,le=1,Ae=4,Re=0,je=.1;function ce(u,l=0){const n=[];return u.forEach(function(d,x){let m=null;d.forEach(function(v,y){if(!v&&m!==null){n.push(`M${m+l} ${x+l}h${y-m}v1H${m+l}z`),m=null;return}if(y===d.length-1){if(!v)return;m===null?n.push(`M${y+l},${x+l} h1v1H${y+l}z`):n.push(`M${m+l},${x+l} h${y+1-m}v1H${m+l}z`);return}v&&m===null&&(m=y)})}),n.join("")}function de(u,l){return u.slice().map((n,d)=>d<l.y||d>=l.y+l.h?n:n.map((x,m)=>m<l.x||m>=l.x+l.w?x:!1))}function ke(u,l,n,d){if(d==null)return null;const x=u.length+n*2,m=Math.floor(l*je),v=x/l,y=(d.width||m)*v,e=(d.height||m)*v,o=d.x==null?u.length/2-y/2:d.x*v,t=d.y==null?u.length/2-e/2:d.y*v,s=d.opacity==null?1:d.opacity;let r=null;if(d.excavate){let a=Math.floor(o),p=Math.floor(t),f=Math.ceil(y+o-a),S=Math.ceil(e+t-p);r={x:a,y:p,w:f,h:S}}const c=d.crossOrigin;return{x:o,y:t,h:e,w:y,excavation:r,opacity:s,crossOrigin:c}}function Ie(u,l){return l!=null?Math.max(Math.floor(l),0):u?Ae:Re}function ue({value:u,level:l,minVersion:n,includeMargin:d,marginSize:x,imageSettings:m,size:v,boostLevel:y}){let e=R.useMemo(()=>{const a=(Array.isArray(u)?u:[u]).reduce((p,f)=>(p.push(..._.QrSegment.makeSegments(f)),p),[]);return _.QrCode.encodeSegments(a,Se[l],n,void 0,void 0,y)},[u,l,n,y]);const{cells:o,margin:t,numCells:s,calculatedImageSettings:r}=R.useMemo(()=>{let c=e.getModules();const a=Ie(d,x),p=c.length+a*2,f=ke(c,v,a,m);return{cells:c,margin:a,numCells:p,calculatedImageSettings:f}},[e,v,m,d,x]);return{qrcode:e,margin:t,cells:o,numCells:s,calculatedImageSettings:r}}var Pe=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),he=R.forwardRef(function(l,n){const d=l,{value:x,size:m=se,level:v=ne,bgColor:y=re,fgColor:e=ie,includeMargin:o=ae,minVersion:t=le,boostLevel:s,marginSize:r,imageSettings:c}=d,p=q(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:f}=p,S=q(p,["style"]),C=c==null?void 0:c.src,h=R.useRef(null),E=R.useRef(null),j=R.useCallback(z=>{h.current=z,typeof n=="function"?n(z):n&&(n.current=z)},[n]),[L,Y]=R.useState(!1),{margin:T,cells:F,numCells:B,calculatedImageSettings:A}=ue({value:x,level:v,minVersion:t,boostLevel:s,includeMargin:o,marginSize:r,imageSettings:c,size:m});R.useEffect(()=>{if(h.current!=null){const z=h.current,P=z.getContext("2d");if(!P)return;let Q=F;const D=E.current,g=A!=null&&D!==null&&D.complete&&D.naturalHeight!==0&&D.naturalWidth!==0;g&&A.excavation!=null&&(Q=de(F,A.excavation));const N=window.devicePixelRatio||1;z.height=z.width=m*N;const w=m/B*N;P.scale(w,w),P.fillStyle=y,P.fillRect(0,0,B,B),P.fillStyle=e,Pe?P.fill(new Path2D(ce(Q,T))):F.forEach(function(O,k){O.forEach(function($,W){$&&P.fillRect(W+T,k+T,1,1)})}),A&&(P.globalAlpha=A.opacity),g&&P.drawImage(D,A.x+T,A.y+T,A.w,A.h)}}),R.useEffect(()=>{Y(!1)},[C]);const G=X({height:m,width:m},f);let H=null;return C!=null&&(H=R.createElement("img",{src:C,key:C,style:{display:"none"},onLoad:()=>{Y(!0)},ref:E,crossOrigin:A==null?void 0:A.crossOrigin})),R.createElement(R.Fragment,null,R.createElement("canvas",X({style:G,height:m,width:m,ref:j,role:"img"},S)),H)});he.displayName="QRCodeCanvas";var ze=R.forwardRef(function(l,n){const d=l,{value:x,size:m=se,level:v=ne,bgColor:y=re,fgColor:e=ie,includeMargin:o=ae,minVersion:t=le,boostLevel:s,title:r,marginSize:c,imageSettings:a}=d,p=q(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:f,cells:S,numCells:C,calculatedImageSettings:h}=ue({value:x,level:v,minVersion:t,boostLevel:s,includeMargin:o,marginSize:c,imageSettings:a,size:m});let E=S,j=null;a!=null&&h!=null&&(h.excavation!=null&&(E=de(S,h.excavation)),j=R.createElement("image",{href:a.src,height:h.h,width:h.w,x:h.x+f,y:h.y+f,preserveAspectRatio:"none",opacity:h.opacity,crossOrigin:h.crossOrigin}));const L=ce(E,f);return R.createElement("svg",X({height:m,width:m,viewBox:`0 0 ${C} ${C}`,ref:n,role:"img"},p),!!r&&R.createElement("title",null,r),R.createElement("path",{fill:y,d:`M0,0 h${C}v${C}H0z`,shapeRendering:"crispEdges"}),R.createElement("path",{fill:e,d:L,shapeRendering:"crispEdges"}),j)});ze.displayName="QRCodeSVG";function _e(){var D;const u=Ce(),l=me(),n=((l==null?void 0:l.id)||"").toString(),d=K(Z.selectRows),x=K(Z.selectLoading),[m,v]=I.useState(!1),[y,e]=I.useState("Address copied"),[o,t]=I.useState(!1),[s,r]=I.useState(!1),[c,a]=I.useState(""),[p,f]=I.useState(null),[S,C]=I.useState([]),[h,E]=I.useState(null),[j,L]=I.useState(0),[Y,T]=I.useState(""),F={USDT:10,BTC:.001,ETH:.01,SOL:.1,BNB:.01,XRP:10,ADA:10,DOGE:50,LTC:.1,TRX:10},B=I.useMemo(()=>pe().shape({amount:ge().typeError("Amount must be a number").positive("Amount must be positive").required("Amount is required").min(j||0,`Minimum deposit is ${j}`),txid:xe().required("Transaction ID is required")}),[j]),A=ye({resolver:Ee.yupResolver(B),mode:"onChange",defaultValues:{amount:"",txid:""}});I.useEffect(()=>{u(be.doFetch())},[u]),I.useEffect(()=>{if(!d||!n){n&&L(F[n.toUpperCase()]||0);return}const g=d.find(w=>!w||!w.symbol?!1:w.symbol.toString().toLowerCase()===n.toString().toLowerCase());if(!g){f(null),C([]),E(null),a(""),L(F[n.toUpperCase()]||0);return}f(g);const N=F[n.toUpperCase()]??(g==null?void 0:g.minDeposit)??(g==null?void 0:g.minimumAmount)??0;if(L(Number(N)||0),Array.isArray(g.network)&&g.network.length>0){const w=g.network.map((k,$)=>({_id:k._id??`${g._id??n}-network-${$}`,name:k.name??k.network??`${g.name??n} Network`,wallet:k.wallet??k.address??k.depositAddress??"",raw:k}));C(w);const O=w.find(k=>k._id===h)||w[0];E(O._id),a(O.wallet||"")}else if(g.address){const w={_id:g._id??`${n}-single`,name:`${g.name??n} Network`,wallet:g.address,raw:null};C([w]),E(w._id),a(w.wallet||"")}else C([]),E(null),a("")},[d,n]),I.useEffect(()=>{if(!h)return;const g=S.find(N=>N._id===h);g&&a(g.wallet||"")},[h,S]);const G=async()=>{if(!c){console.error("No address to copy");return}try{await navigator.clipboard.writeText(c),e("Address copied"),v(!0),setTimeout(()=>v(!1),3e3)}catch(g){console.error("Failed to copy address: ",g),e("Failed to copy address"),v(!0),setTimeout(()=>v(!1),3e3)}},H=()=>{var N;const g=document.querySelector(".qr-box canvas");if(!(g instanceof HTMLCanvasElement)){console.error("QR canvas not found"),e("Unable to save QR"),v(!0),setTimeout(()=>v(!1),3e3);return}try{const w=document.createElement("a"),O=(((N=S.find(k=>k._id===h))==null?void 0:N.name)||"deposit").replace(/\s+/g,"-");w.download=`${n}-${O}-address.png`,w.href=g.toDataURL("image/png"),w.click(),e("QR code saved"),v(!0),setTimeout(()=>v(!1),3e3)}catch(w){console.error("Failed to save QR code",w),e("Unable to save QR"),v(!0),setTimeout(()=>v(!1),3e3)}},z=g=>{const N=g.target.value;E(N),A.setValue("amount",""),A.clearErrors("amount")},P=async g=>{if(!h||!p||!c){console.error("Missing required information");return}t(!0);try{const N=new Date,w=N.getFullYear(),O=String(N.getMonth()+1).padStart(2,"0"),k=String(N.getDate()).padStart(2,"0"),$=Math.floor(Math.random()*1e7).toString().padStart(7,"0"),fe={orderno:`RE${w}${O}${k}${$}`,amount:g.amount,txid:g.txid,rechargechannel:n,status:"pending",network:h,rechargetime:N.toISOString()};T(g.amount),await u(ve.doCreate(fe)),r(!0),A.reset()}catch(N){console.error("Deposit submission error:",N)}finally{t(!1)}},Q=()=>{r(!1),T("")};return i.jsxs("div",{className:"deposit-container",children:[i.jsx("div",{className:"header",children:i.jsxs("div",{className:"nav-bar",children:[i.jsx(we,{to:"/deposit",className:"back-arrow","aria-label":"Back to deposits",children:i.jsx("i",{className:"fas fa-arrow-left"})}),i.jsxs("div",{className:"page-title",children:["Deposit ",n||"..."]})]})}),i.jsx("div",{className:"content-card",children:i.jsxs("div",{className:"deposit-content",children:[i.jsxs("div",{className:"section",children:[i.jsx("div",{className:"section-label",children:"Deposit currency"}),i.jsxs("div",{className:"currency-display",children:[i.jsx("div",{className:"currency-icon","aria-hidden":!0,children:i.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${n}.png`,alt:n,onError:g=>{const N=g.target;if(N&&N instanceof HTMLImageElement){N.onerror=null,N.style.display="none";const w=N.parentElement;w&&(w.textContent=n&&n.charAt(0)||"C",w.style.background="#f0f0f0",w.style.color="#333",w.style.fontSize="12px",w.style.fontWeight="bold",w.style.display="inline-flex",w.style.alignItems="center",w.style.justifyContent="center",w.style.width="36px",w.style.height="36px",w.style.borderRadius="6px")}}})}),i.jsx("div",{className:"currency-name",children:(p==null?void 0:p.name)||n})]}),i.jsx("div",{className:"section-note",children:"Fixed currency - cannot be changed"})]}),S.length>0&&i.jsxs("div",{className:"section",children:[i.jsx("div",{className:"section-label",children:"Deposit network"}),i.jsxs("div",{className:"network-select-wrapper",children:[i.jsx("select",{className:"network-select",value:h||"",onChange:z,"aria-label":"Select deposit network",children:S.map(g=>i.jsx("option",{value:g._id,children:g.name},g._id))}),i.jsx("div",{className:"select-arrow",children:i.jsx("i",{className:"fas fa-chevron-down"})})]})]}),c&&i.jsxs("div",{className:"qr-section",children:[i.jsx("div",{className:"section-label",children:"Save QR code"}),i.jsxs("div",{className:"qr-container",children:[i.jsx("div",{className:"qr-box","aria-hidden":!0,children:i.jsx(he,{value:c,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0})}),i.jsxs("div",{className:"address-section",children:[i.jsx("div",{className:"address-label",children:"Wallet Address"}),i.jsx("div",{className:"address-text",id:"walletAddress",children:c}),i.jsxs("div",{className:"address-actions",children:[i.jsxs("button",{type:"button",className:"action-btn copy-btn",onClick:G,"aria-label":"Copy address",children:[i.jsx("i",{className:"fas fa-copy"})," Copy Address"]}),i.jsxs("button",{type:"button",className:"action-btn save-btn",onClick:H,"aria-label":"Save QR code",children:[i.jsx("i",{className:"fas fa-download"})," Save QR Code"]})]})]})]})]}),c&&i.jsx(Ne,{...A,children:i.jsxs("form",{onSubmit:A.handleSubmit(P),className:"deposit-form",children:[i.jsx("div",{className:"section",children:i.jsxs("div",{className:"form-group",children:[i.jsx(J,{name:"amount",label:`Amount (${n})`,placeholder:`Minimum: ${j} ${n}`,className:"form-input"}),i.jsxs("div",{className:"min-amount-note",children:["Minimum deposit: ",j," ",n]})]})}),i.jsx("div",{className:"section",children:i.jsx("div",{className:"form-group",children:i.jsx(J,{name:"txid",label:"Transaction ID",placeholder:"Enter your transaction ID",className:"form-input"})})}),i.jsx("div",{className:"form-actions",children:i.jsx("button",{type:"submit",className:"submit-btn",disabled:!A.formState.isValid||o,"aria-disabled":!A.formState.isValid||o,children:o?i.jsxs(i.Fragment,{children:[i.jsx("i",{className:"fas fa-spinner fa-spin"})," Processing..."]}):"Confirm Deposit"})})]})}),x&&i.jsxs("div",{className:"loading-section",role:"status","aria-live":"polite",children:[i.jsx("div",{className:"spinner"}),i.jsx("div",{children:"Loading deposit information..."})]}),!x&&!c&&n&&i.jsxs("div",{className:"error-section",role:"alert",children:[i.jsx("i",{className:"fas fa-exclamation-triangle"}),i.jsxs("div",{children:["No deposit address found for ",n]}),i.jsx("div",{className:"error-note",children:"Please contact support or try another currency."})]}),i.jsxs("div",{className:"hint-section",children:[i.jsx("div",{className:"hint-title",children:"Important Notes"}),i.jsxs("div",{className:"hint-content",children:[i.jsxs("div",{className:"hint-item",children:["1. Send only ",n," to this deposit address. Sending other currencies may result in permanent loss."]}),i.jsxs("div",{className:"hint-item",children:["2. Ensure you are using the correct network (",(D=S.find(g=>g._id===h))==null?void 0:D.name,")."]}),i.jsxs("div",{className:"hint-item",children:["3. Minimum deposit amount: ",j," ",n]}),i.jsx("div",{className:"hint-item",children:"4. Transactions typically require 1-3 network confirmations before being credited to your account."}),i.jsx("div",{className:"hint-item",children:"5. Always double-check the address before sending funds."})]})]})]})}),i.jsxs("div",{className:`toast ${m?"visible":""}`,role:"status","aria-live":"polite",children:[i.jsx("i",{className:"fas fa-check-circle toast-icon"}),y]}),s&&i.jsx("div",{className:"modal-overlay",role:"dialog","aria-modal":"true",children:i.jsxs("div",{className:"modal-content",children:[i.jsxs("div",{className:"modal-header",children:[i.jsx("h3",{children:"Deposit Submitted Successfully"}),i.jsx("button",{className:"modal-close",onClick:Q,"aria-label":"Close",children:i.jsx("i",{className:"fas fa-times"})})]}),i.jsxs("div",{className:"modal-body",children:[i.jsx("div",{className:"success-icon",children:i.jsx("i",{className:"fas fa-check-circle"})}),i.jsxs("div",{className:"success-message",children:["Your deposit of ",Y," ",n," has been submitted for processing."]}),i.jsxs("div",{className:"success-details",children:[i.jsx("p",{children:"Please wait for network confirmations. This usually takes 5-30 minutes."}),i.jsx("p",{children:"You can track the status in your transaction history."})]})]}),i.jsx("div",{className:"modal-footer",children:i.jsx("button",{className:"modal-btn",onClick:Q,children:"OK"})})]})}),i.jsx("style",{children:`
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

        .header {
          min-height: 60px;
          position: relative;
          padding: 15px 20px;
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

        .section {
          margin-bottom: 14px;
        }

        .section-label {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 8px;
        }

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

        .deposit-form {
          margin-top: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .amount-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .amount-input {
          width: 100%;
          padding: 14px 16px;
          padding-right: 60px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 14px;
          background-color: white;
          color: #333;
          transition: all 0.3s ease;
        }

        .amount-input:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .amount-suffix {
          position: absolute;
          right: 16px;
          color: #666;
          font-weight: 600;
          pointer-events: none;
        }


        .form-input:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .error-message {
          color: #ff4757;
          font-size: 12px;
          margin-top: 4px;
        }

        .min-amount-note {
          font-size: 12px;
          color: #666;
          margin-top: 8px;
          font-style: italic;
        }

        .form-actions {
          margin-top: 24px;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .fa-spin {
          animation: fa-spin 1s infinite linear;
        }

        @keyframes fa-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          width: 90%;
          max-width: 400px;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: #222;
        }

        .modal-close {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: #ff4757;
        }

        .modal-body {
          padding: 30px 20px;
          text-align: center;
        }

        .success-icon {
          font-size: 60px;
          color: #4CAF50;
          margin-bottom: 20px;
        }

        .success-message {
          font-size: 16px;
          color: #222;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .success-details {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }

        .success-details p {
          margin: 10px 0;
        }

        .modal-footer {
          padding: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .modal-btn {
          width: 100%;
          padding: 14px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .modal-btn:hover {
          background: #0a4fc4;
        }

        .loading-section {
          text-align: center;
          padding: 40px 0;
          color: #666;
        }

        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #106cf5;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-section {
          text-align: center;
          padding: 40px 20px;
          color: #ff4757;
        }

        .error-section i {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .error-note {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
        }

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

          .amount-input {
            padding: 12px 14px;
            font-size: 14px;
          }

          .submit-btn {
            padding: 14px;
            font-size: 15px;
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

          .modal-content {
            width: 95%;
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
      `})]})}export{_e as default};
