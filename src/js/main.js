const template = document.createElement('template');
template.innerHTML=`
<style>
.product-card {
    font-family: 'Roboto', seans-sherif;
    text-align: justify;
    padding-right: 10px;
    text-justify: inter-word;
    background: lightskyblue;
    width: 520px;
    height: 280px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #aaaaaa;
}

.product-card .price{
text-align: left;
font-size: 26px;
font-weight: bold;
color: darkblue;
}

.product-card .img{
    border-radius: 5px;
    background-color: #CDEBFD;
    background-repeat: no-repeat;
    background-size: contain;
}

.product-card .specyfication{
display: none;
}

.product-card ul.nav  {
padding-left: 0px;

}

.product-card ul.nav > li  {
display: inline-block;
padding-right: 10px;
cursor: pointer;
}      

#nav-desc{
text-decoration: underline;
}
</style>

<div class="product-card">
    <div class="img"></div>
    <div>
        <h3></h3>
        <div class="price"><slot name="price"/></div>
        <ul class="nav"><li id="nav-desc">Description</li><li id="nav-spec">Specyfication</li></ul>
        <div class="description">
            <p><slot name="description" /></p>
        </div>
        <div class="specyfication">
            <p><slot name="specyfication" /></p>
        </div>
    </div>
</div>
`;
class ProductCard extends HTMLElement{

    constructor() {
        super();

        const picture = this.getAttribute('picture');

        this.showSpecyfication = true;
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText=this.getAttribute('name');
        this.shadowRoot.querySelector('.img').style.backgroundImage = 'url('+picture+')';

    }

    nav(show){

        const spec = this.shadowRoot.querySelector('.specyfication');
        const desc = this.shadowRoot.querySelector('.description');
        const navSpec = this.shadowRoot.querySelector('#nav-spec');
        const navDesc = this.shadowRoot.querySelector('#nav-desc');

        switch (show){
            case 'showSpec':
                spec.style.display = 'block';
                desc.style.display = 'none';
                navSpec.style.textDecoration = 'underline';
                navDesc.style.textDecoration = 'none';
                break;
            case 'showDesc':
                spec.style.display = 'none';
                desc.style.display = 'block';
                navSpec.style.textDecoration = 'none';
                navDesc.style.textDecoration = 'underline';
                break;
        }

    }

    connectedCallback(){
        this.shadowRoot.querySelector('#nav-spec').addEventListener('click', () => this.nav('showSpec'));
        this.shadowRoot.querySelector('#nav-desc').addEventListener('click', () => this.nav('showDesc'));
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#nav-spec').removeEventListener();
        this.shadowRoot.querySelector('#nav-desc').removeEventListener();

    }

}

customElements.define('product-card', ProductCard);