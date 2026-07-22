const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/exports-L-NJ35mF.js","assets/index.es-CziUkvbq.js","assets/browser-CH3NFxwR.js","assets/esm-D6iYAaMA.js","assets/vanilla-CpArUlac.js"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-BmrihbwG.js";import{F as t,M as n,P as r,V as i,W as a,a as o,g as s,h as c,i as l,o as u,v as d,z as f}from"./esm-D6iYAaMA.js";import{a as p,r as m,s as h,t as g}from"./decorators-CWR3n5_L.js";var _=h`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`,v=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},y=`scroll-lock`,b=class extends m{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=c.state.open,this.caipAddress=s.state.caipAddress,this.isSiweEnabled=r.state.isSiweEnabled,this.connected=s.state.isConnected,this.loading=c.state.loading,this.shake=c.state.shake,this.initializeTheming(),t.prefetch(),this.unsubscribe.push(c.subscribeKey(`open`,e=>e?this.onOpen():this.onClose()),c.subscribeKey(`shake`,e=>this.shake=e),c.subscribeKey(`loading`,e=>{this.loading=e,this.onNewAddress(s.state.caipAddress)}),s.subscribeKey(`isConnected`,e=>this.connected=e),s.subscribeKey(`caipAddress`,e=>this.onNewAddress(e)),r.subscribeKey(`isSiweEnabled`,e=>this.isSiweEnabled=e)),f.sendEvent({type:`track`,event:`MODAL_LOADED`})}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.open?p`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            <wui-card
              shake="${this.shake}"
              role="alertdialog"
              aria-modal="true"
              tabindex="0"
              data-testid="w3m-modal-card"
            >
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){let t=d.state.view===`ConnectingSiwe`,n=d.state.view===`ApproveTransaction`;if(this.isSiweEnabled){let{SIWEController:r}=await e(async()=>{let{SIWEController:e}=await import(`./exports-L-NJ35mF.js`);return{SIWEController:e}},__vite__mapDeps([0,1,2,3,4]));r.state.status!==`success`&&(t||n)?c.shake():c.close()}else c.close()}initializeTheming(){let{themeVariables:e,themeMode:t}=i.state;u(e,l.getColorTheme(t))}onClose(){this.open=!1,this.classList.remove(`open`),this.onScrollUnlock(),n.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add(`open`),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){let e=document.createElement(`style`);e.dataset.w3m=y,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){let e=document.head.querySelector(`style[data-w3m="${y}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;let e=this.shadowRoot?.querySelector(`wui-card`);e?.focus(),window.addEventListener(`keydown`,t=>{if(t.key===`Escape`)this.handleClose();else if(t.key===`Tab`){let{tagName:n}=t.target;n&&!n.includes(`W3M-`)&&!n.includes(`WUI-`)&&e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(t){if(!this.connected||this.loading)return;let n=a.getPlainAddress(this.caipAddress),r=a.getPlainAddress(t),i=a.getNetworkId(this.caipAddress),o=a.getNetworkId(t);if(this.caipAddress=t,this.isSiweEnabled){let{SIWEController:t}=await e(async()=>{let{SIWEController:e}=await import(`./exports-L-NJ35mF.js`);return{SIWEController:e}},__vite__mapDeps([0,1,2,3,4])),a=await t.getSession();if(a&&n&&r&&n!==r){t.state._client?.options.signOutOnAccountChange&&(await t.signOut(),this.onSiweNavigation());return}if(a&&i&&o&&i!==o){t.state._client?.options.signOutOnNetworkChange&&(await t.signOut(),this.onSiweNavigation());return}this.onSiweNavigation()}}onSiweNavigation(){this.open?d.push(`ConnectingSiwe`):c.open({view:`ConnectingSiwe`})}};b.styles=_,v([g()],b.prototype,`open`,void 0),v([g()],b.prototype,`caipAddress`,void 0),v([g()],b.prototype,`isSiweEnabled`,void 0),v([g()],b.prototype,`connected`,void 0),v([g()],b.prototype,`loading`,void 0),v([g()],b.prototype,`shake`,void 0),b=v([o(`w3m-modal`)],b);export{b as W3mModal};