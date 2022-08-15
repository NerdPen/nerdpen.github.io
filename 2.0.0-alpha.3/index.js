(()=>{"use strict";var e={275:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Config=void 0;const i=s(374);class r extends i.EventEmitter{constructor(){super(),this._clientData=null,this._origin={sandbox:"https://gadget.payment.qa.91dev.tw",production:"https://gadget.payment.91app.com"}}static getInstance(){return r._instance||(r._instance=new r),r._instance}set clientData(e){this._clientData=Object.assign({},e)}get clientData(){return this._clientData}get version(){return"2.0.0-alpha.3"}get origin(){return this._origin[this.clientData.serverType]}get apiDomain(){return this._origin[this.clientData.serverType]}get iframeDomain(){return`./${this.version}`}}t.Config=r},374:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0,t.EventEmitter=class{constructor(){this.listeners=new Map}on(e,t){this.listeners.has(e)?this.listeners.get(e).push(t):this.listeners.set(e,[t])}emit(e,t){this.listeners.has(e)&&this.listeners.get(e).forEach((e=>{e(t)}))}off(e){this.listeners.has(e)&&this.listeners.delete(e)}}},906:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PostMessageEmitter=void 0,t.PostMessageEmitter=class{constructor(e,t,s){this.current=e,this.target=t,this.origin=s,this.listeners=new Map,this.current.addEventListener("message",(e=>{const{type:t,payload:s}=e.data;this.listeners.get(t)&&this.listeners.get(t).forEach((e=>{e(s)}))}))}on(e,t){this.listeners.get(e)||this.listeners.set(e,[t])}emit(e,t){const s={type:e,payload:t};this.target.postMessage(s,this.origin)}registerEvent(e){return t=>this.on(e,t)}}},887:(e,t)=>{var s;Object.defineProperty(t,"__esModule",{value:!0}),t.CardBrand=void 0,(s=t.CardBrand||(t.CardBrand={})).Unknown="Unknown",s.MasterCard="MasterCard",s.VISA="VISA",s.JCB="JCB",s.AMEX="AMEX",s.UnionPay="UnionPay"},252:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CreditCard=void 0;const i=s(374),r=s(462),a=s(432),n=s(316),o=s(887),d=s(275);class l extends i.EventEmitter{constructor(){super(),this.setup=this.setup.bind(this),this.getToken=this.getToken.bind(this),this.creditCardData={canGetToken:!1,cardBrand:o.CardBrand.Unknown,fields:{number:{target:null,status:n.FieldStatus.Normal,value:"",errorMessage:""},expirationDate:{target:null,status:n.FieldStatus.Normal,value:"",errorMessage:""},ccv:{target:null,status:n.FieldStatus.Normal,value:"",errorMessage:""}}}}setup(e){var t,s,i,a,n,o;if(!d.Config.getInstance().clientData)throw new Error("Error: Please run PaymentSDK.setupSDK(appId, appKey, serverType)");Object.entries(e.styles||{}).forEach((([e,t])=>{if(!r.AllowedStyleClassName.includes(e))throw new Error(`${e} is not valid calss name`);Object.keys(t).forEach((t=>{if("input"===e&&!r.AllowedStyles.includes(t))throw new Error(`${e}.${t} is not valid style`);if("input"!==e&&!["borderColor","color"].includes(t))throw new Error(`${e}.${t} is not valid style`)}))})),this.setupConfig=Object.assign(Object.assign({},e),{styles:{input:Object.assign({height:"40px",width:"100%",color:"#000",borderColor:"#DDDDDD"},(null===(t=e.styles)||void 0===t?void 0:t.input)||{}),"input:focus":Object.assign({color:"#000",borderColor:"#DDDDDD"},(null===(s=e.styles)||void 0===s?void 0:s["input:focus"])||{}),".valid":Object.assign({color:"#000",borderColor:"#DDDDDD"},(null===(i=e.styles)||void 0===i?void 0:i[".valid"])||{}),".valid:focus":Object.assign({color:"#000",borderColor:"#DDDDDD"},(null===(a=e.styles)||void 0===a?void 0:a[".valid:focus"])||{}),".invalid":Object.assign({borderColor:"#FF5353",color:"#FF5353"},(null===(n=e.styles)||void 0===n?void 0:n[".invalid"])||{}),".invalid:focus":Object.assign({borderColor:"#FF5353",color:"#FF5353"},(null===(o=e.styles)||void 0===o?void 0:o[".invalid:focus"])||{})}}),this.createFields()}createFields(){Object.keys(this.setupConfig.fields).forEach((e=>{const t=e,s="string"==typeof this.setupConfig.fields[t].element?document.getElementById(this.setupConfig.fields[t].element.toString().replace("#","")):this.setupConfig.fields[t].element,i=document.createElement("iframe"),r={type:t,placeholder:this.setupConfig.fields[t].placeholder,styles:this.setupConfig.styles};i.src=`${d.Config.getInstance().iframeDomain}/fields/index.html?${encodeURIComponent(JSON.stringify(r))}`,i.height=this.setupConfig.styles.input.height,i.width=this.setupConfig.styles.input.width,s.appendChild(i);const o=new a.FieldFrame(i);this.creditCardData.fields[t].target=o,o.onUpdateCardBrand((e=>{this.creditCardData.cardBrand=e,"number"!==t&&o.emit("SYNC_CARD_BRAND",e)})),o.onUpdate((e=>{this.creditCardData=Object.assign(Object.assign({},this.creditCardData),{fields:Object.assign(Object.assign({},this.creditCardData.fields),{[e.type]:Object.assign(Object.assign({},this.creditCardData.fields[e.type]),{status:e.status,value:e.value,errorMessage:e.errorMessage})})}),this.creditCardData.canGetToken=void 0===Object.entries(this.creditCardData.fields).find((([e,t])=>t.status!==n.FieldStatus.Success));const s=Object.assign(Object.assign({},this.creditCardData),{fields:{number:{status:this.creditCardData.fields.number.status,errorMessage:this.creditCardData.fields.number.errorMessage},expirationDate:{status:this.creditCardData.fields.expirationDate.status,errorMessage:this.creditCardData.fields.expirationDate.errorMessage},ccv:{status:this.creditCardData.fields.ccv.status,errorMessage:this.creditCardData.fields.ccv.errorMessage}}});"number"===t&&this.emit("UPDATE",s),this.focusToNextField(e.type)}))}))}focusToNextField(e){if(this.creditCardData.fields[e].status===n.FieldStatus.Success){const t=Object.keys(this.creditCardData.fields).findIndex((t=>t===e));Object.entries(this.creditCardData.fields).forEach((([e,s],i)=>{i===t+1&&s.target.emit("FOCUS_FIELD")}))}}getFieldData(e){return this.creditCardData.fields[e]}getToken(e){const t={appId:d.Config.getInstance().clientData.appId.toString(),appKey:d.Config.getInstance().clientData.appKey,sdkVer:d.Config.getInstance().version,cardNumber:this.getFieldData("number").value,cardExpiryDate:this.getFieldData("expirationDate").value,cardSecurityCode:this.getFieldData("ccv").value};this.getFieldData("number").target.onGetTokenCompleted((t=>{e(t)})),this.getFieldData("number").target.emit("GET_TOKEN",t)}onUpdate(e){return this.on("UPDATE",(t=>{e(t)}))}}t.CreditCard=l},462:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AllowedStyleClassName=t.AllowedStyles=void 0,t.AllowedStyles=["borderColor","width","height","color"],t.AllowedStyleClassName=["input","input:focus",".valid",".valid:focus",".invalid",".invalid:focus"]},316:(e,t)=>{var s;Object.defineProperty(t,"__esModule",{value:!0}),t.FieldStatus=void 0,(s=t.FieldStatus||(t.FieldStatus={}))[s.Normal=0]="Normal",s[s.Success=1]="Success",s[s.Error=-1]="Error"},432:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FieldFrame=void 0;const i=s(906),r=s(275);class a extends i.PostMessageEmitter{constructor(e){super(window,e.contentWindow,"*"),this.element=e,this.onUpdate=this.onUpdate.bind(this),this.onUpdateCardBrand=this.onUpdateCardBrand.bind(this),this.onGetTokenCompleted=this.onGetTokenCompleted.bind(this),this.element.setAttribute("scrolling","no"),this.element.setAttribute("frameborder","0"),this.element.setAttribute("allowtransparency","true"),this.element.setAttribute("width","100%"),this.element.addEventListener("load",(()=>this.syncClientData()))}syncClientData(){this.emit("SYNC_CLIENT",r.Config.getInstance().clientData)}onUpdate(e){return this.on("UPDATE_FIELD",(t=>{e(t)}))}onUpdateCardBrand(e){return this.on("UPDATE_CARD_BRAND",(t=>{e(t)}))}onGetTokenCompleted(e){return this.on("GET_TOKEN_COMPLETED",(t=>{e(t)}))}}t.FieldFrame=a}},t={};function s(i){var r=t[i];if(void 0!==r)return r.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,s),a.exports}(()=>{const e=s(275),t=s(252);window.PaymentSDK=new class{constructor(){this.setupSDK=(e,t,s)=>{this.config.clientData={appId:e,appKey:t,serverType:s},this.createPayment()},this.config=e.Config.getInstance(),this.setupSDK=this.setupSDK.bind(this)}createPayment(){this.creditCard=new t.CreditCard}}})()})();
//# sourceMappingURL=index.js.map?t=e9eaa4a92e4961d65ce7