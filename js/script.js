class Produto {

    constructor() {
        this.id = 1
        this.arrayProdutos = []
        this.editId = null
    }

    salvar() {
        let produto = this.lerDados()

        if (this.validaCampos(produto)) { //true
            if(this.editId == null){
                this.adicionar(produto)
            }else{
                this.atualizar(this.editId, produto)
            }
        }

        this.cancelar()
        this.listaTabela()
    }

    listaTabela() {
        let tbody = document.querySelector("#tbody")
        tbody.innerText = ''

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_preco = tr.insertCell()
            let td_acao = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id
            td_produto.innerText = this.arrayProdutos[i].nomeProduto
            td_preco.innerText = this.arrayProdutos[i].preco

            let imgEdit = document.createElement('i')
            let imgDelete = document.createElement('i')

            td_acao.appendChild(imgEdit)
            td_acao.appendChild(imgDelete)

            imgEdit.classList.add("far", "fa-edit")
            imgDelete.classList.add("fas", "fa-trash-alt")

            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")")
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")")
        }

        console.log(this.arrayProdutos);
    }

    lerDados() {
        let produto = {}

        produto.id = this.id
        produto.nomeProduto = document.querySelector("#produto").value
        produto.preco = document.querySelector("#preco").value

        return produto
    }

    validaCampos(produto) {

        let msg = ""

        if (produto.nomeProduto == "") {
            msg += "- Informe o nome do produto \n"
        }

        if (produto.preco == "") {
            msg += "- Informe o preço \n"
        }

        if (msg != "") {
            alert(msg)
            return false
        }

        return true
    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto)
        this.id++
    }

    atualizar(id, produto){
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preco = produto.preco
            }
        }
    }

    preparaEdicao(dados){
        this.editId = dados.id

        document.querySelector("#produto").value = dados.nomeProduto
        document.querySelector("#preco").value = dados.preco

        document.querySelector("#btn-salvar").innerText = 'Atualizar'
    }

    cancelar() {
        document.querySelector("#produto").value = ""
        document.querySelector("#preco").value = ""

        document.querySelector("#btn-salvar").innerText = 'Salvar'
        this.editId = null
    }

    deletar(id) {

        if (confirm("Deseja realmente deleter o produto do ID " + id)) {
            let tbody = document.querySelector("#tbody")

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
        }


        console.log(this.arrayProdutos);
    }
}

var produto = new Produto()