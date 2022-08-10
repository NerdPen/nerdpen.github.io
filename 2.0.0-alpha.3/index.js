(()=>{"use strict";var t={275:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Config=void 0;const i=s(374);class a extends i.EventEmitter{constructor(){super(),this._clientData=null,this._origin={sandbox:"https://gadget.payment.qa.91dev.tw",production:"https://gadget.payment.91app.com"}}static getInstance(){return a._instance||(a._instance=new a),a._instance}set clientData(t){this._clientData=Object.assign({},t)}get clientData(){return this._clientData}get version(){return"2.0.0-alpha.3"}get origin(){return this._origin[this.clientData.serverType]}get apiDomain(){return this._origin[this.clientData.serverType]}get iframeDomain(){return`./${this.version}`}}e.Config=a},374:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EventEmitter=void 0,e.EventEmitter=class{constructor(){this.listeners=new Map}on(t,e){this.listeners.has(t)?this.listeners.get(t).push(e):this.listeners.set(t,[e])}emit(t,e){this.listeners.has(t)&&this.listeners.get(t).forEach((t=>{t(e)}))}off(t){this.listeners.has(t)&&this.listeners.delete(t)}}},906:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.PostMessageEmitter=void 0,e.PostMessageEmitter=class{constructor(t,e,s){this.current=t,this.target=e,this.origin=s,this.listeners=new Map,this.current.addEventListener("message",(t=>{const{type:e,payload:s}=t.data;this.listeners.get(e)&&this.listeners.get(e).forEach((t=>{t(s)}))}))}on(t,e){this.listeners.get(t)||this.listeners.set(t,[e])}emit(t,e){const s={type:t,payload:e};this.target.postMessage(s,this.origin)}registerEvent(t){return e=>this.on(t,e)}}},887:(t,e)=>{var s;Object.defineProperty(e,"__esModule",{value:!0}),e.CardBrand=void 0,(s=e.CardBrand||(e.CardBrand={})).Unknown="Unknown",s.MasterCard="MasterCard",s.VISA="VISA",s.JCB="JCB",s.AMEX="AMEX",s.UnionPay="UnionPay"},252:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.CreditCard=void 0;const i=s(374),a=s(432),r=s(316),n=s(887),d=s(275);class o extends i.EventEmitter{constructor(){super(),this.setup=this.setup.bind(this),this.getToken=this.getToken.bind(this),this.creditCardData={canGetToken:!1,cardBrand:n.CardBrand.Unknown,fields:{number:{target:null,status:r.FieldStatus.Normal,value:"",errorMessage:""},expirationDate:{target:null,status:r.FieldStatus.Normal,value:"",errorMessage:""},ccv:{target:null,status:r.FieldStatus.Normal,value:"",errorMessage:""}}}}setup(t){if(!d.Config.getInstance().clientData)throw new Error("Error: Please run PaymentSDK.setupSDK(appId, appKey, serverType)");this.setupConfig=t,this.createFields()}createFields(){Object.keys(this.setupConfig.fields).forEach((t=>{const e=t,s="string"==typeof this.setupConfig.fields[e].element?document.getElementById(this.setupConfig.fields[e].element.toString().replace("#","")):this.setupConfig.fields[e].element,i=document.createElement("iframe"),r={type:e,placeholder:this.setupConfig.fields[e].placeholder};i.src=`${d.Config.getInstance().iframeDomain}/fields/index.html?${encodeURIComponent(JSON.stringify(r))}`,s.appendChild(i);const n=new a.FieldFrame(i);this.creditCardData.fields[e].target=n,n.onUpdateCardBrand((t=>{this.creditCardData.cardBrand=t,"number"!==e&&n.emit("SYNC_CARD_BRAND",t)})),n.onUpdate((t=>{this.creditCardData=Object.assign(Object.assign({},this.creditCardData),{fields:Object.assign(Object.assign({},this.creditCardData.fields),{[t.type]:Object.assign(Object.assign({},this.creditCardData.fields[t.type]),{status:t.status,value:t.value,errorMessage:t.errorMessage})})}),this.creditCardData.canGetToken=void 0===Object.keys(this.creditCardData.fields).find((t=>1!==this.creditCardData.fields[t].status));const s=Object.assign(Object.assign({},this.creditCardData),{fields:{number:{status:this.creditCardData.fields.number.status,errorMessage:this.creditCardData.fields.number.errorMessage},expirationDate:{status:this.creditCardData.fields.expirationDate.status,errorMessage:this.creditCardData.fields.expirationDate.errorMessage},ccv:{status:this.creditCardData.fields.ccv.status,errorMessage:this.creditCardData.fields.ccv.errorMessage}}});"number"===e&&this.emit("UPDATE",s),this.focusToNextField()}))}))}focusToNextField(){if(void 0!==Object.keys(this.creditCardData.fields).find((t=>this.creditCardData.fields[t].status===r.FieldStatus.Success))){const t=Object.keys(this.creditCardData.fields).find((t=>this.creditCardData.fields[t].status!==r.FieldStatus.Success));t&&this.creditCardData.fields[t].target&&this.creditCardData.fields[t].target.emit("FOCUS_FIELD")}}getFieldData(t){return this.creditCardData.fields[t]}getToken(t){const e={appId:d.Config.getInstance().clientData.appId.toString(),appKey:d.Config.getInstance().clientData.appKey,sdkVer:d.Config.getInstance().version,cardNumber:this.getFieldData("number").value,cardExpiryDate:this.getFieldData("expirationDate").value,cardSecurityCode:this.getFieldData("ccv").value};this.getFieldData("number").target.onGetTokenCompleted((e=>{t(e)})),this.getFieldData("number").target.emit("GET_TOKEN",e)}onUpdate(t){return this.on("UPDATE",(e=>{t(e)}))}}e.CreditCard=o},316:(t,e)=>{var s;Object.defineProperty(e,"__esModule",{value:!0}),e.FieldStatus=void 0,(s=e.FieldStatus||(e.FieldStatus={}))[s.Normal=0]="Normal",s[s.Success=1]="Success",s[s.Error=-1]="Error"},432:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.FieldFrame=void 0;const i=s(906),a=s(275);class r extends i.PostMessageEmitter{constructor(t){super(window,t.contentWindow,"*"),this.element=t,this.onUpdate=this.onUpdate.bind(this),this.onUpdateCardBrand=this.onUpdateCardBrand.bind(this),this.onGetTokenCompleted=this.onGetTokenCompleted.bind(this),this.element.setAttribute("scrolling","no"),this.element.setAttribute("frameborder","0"),this.element.setAttribute("allowtransparency","true"),this.element.setAttribute("width","100%"),this.element.setAttribute("height","100%"),this.element.addEventListener("load",(()=>this.syncClientData()))}syncClientData(){this.emit("SYNC_CLIENT",a.Config.getInstance().clientData)}onUpdate(t){return this.on("UPDATE_FIELD",(e=>{t(e)}))}onUpdateCardBrand(t){return this.on("UPDATE_CARD_BRAND",(e=>{t(e)}))}onGetTokenCompleted(t){return this.on("GET_TOKEN_COMPLETED",(e=>{t(e)}))}}e.FieldFrame=r}},e={};function s(i){var a=e[i];if(void 0!==a)return a.exports;var r=e[i]={exports:{}};return t[i](r,r.exports,s),r.exports}(()=>{const t=s(275),e=s(252);window.PaymentSDK=new class{constructor(){this.setupSDK=(t,e,s)=>{this.config.clientData={appId:t,appKey:e,serverType:s},this.createPayment()},this.config=t.Config.getInstance(),this.setupSDK=this.setupSDK.bind(this)}createPayment(){this.creditCard=new e.CreditCard}}})()})();
//# sourceMappingURL=index.js.map?t=c9e67e57b41aa8a8160c