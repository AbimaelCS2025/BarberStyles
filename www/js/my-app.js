
document.addEventListener('deviceready', onDeviceReady.bind(this), false);

//url para as apis
var url = 'http://github.com/AbimaelCS2025/BarberStyles';
var url_api = url + 'api/';
var url_img = url + 'img/';

//DATAS
const date = new Date();
const dia = date.getDate();
const mes = date.getMonth() + 1;
const ano = date.getFullYear();

if(mes == '4' || mes == '6' || mes == '9' || mes == '11'){
  var dia_final_mes = 30;
}else if(mes == '2'){
  var dia_final_mes = 28;
}else{
  var dia_final_mes = 31;
}

if(mes < 10){
  var zero = '0';
}else{
  var zero = '';
}


var hoje = ano + '-' + zero + mes + '-' + dia;
var inicio_mes = ano + '-' + zero + mes + '-01';
var final_mes = ano + '-' + zero + mes + '-' + dia_final_mes;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Framework7',
    // App id
    id: 'br.com.meuapp',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
    {
      path: '/index/',
      url: 'index.html',
      on: {
        pageInit: function (event, page) {		



          var id_usuario = localStorage.getItem("id");
          if(id_usuario == null || id_usuario == ""){
                        //Chamar pagina inicial Login                       
                        app.views.main.router.navigate('/login/'); 
                      }else{
                        app.views.main.router.navigate('/home/'); 
                      }


                    }
                  }
                },

                {
                  path: '/home/',
                  url: 'home.html',
                  on: {
                    pageInit: function (event, page) {

						//CONTEÚDO DA PÁGINA PRINCIPAL AQUI
            app.panel.close();
            app.panel.enableSwipe('left');

            
            var nome = localStorage.getItem("nome");
            var nivel = localStorage.getItem("nivel");
            var foto = localStorage.getItem("foto");
            $('#nome_usuario').text(nome)
            $('#nivel_usuario').text(nivel)
            $('#foto_usuario').attr('src', url_img + 'perfil/' + foto);


             //ajax para listar dados hone
             $.ajax({
              url: url_api + "home/listar.php",
              method: 'POST',
              data: {url_img},
              dataType: "html",

              success:function(result){
                var dados = JSON.parse(result)                   
                
                $("#valor-usuarios").html(dados.total_usuarios);

              }
            });



             $('#card-usuarios').click(function(event){
              app.views.main.router.navigate('/usuarios/'); 
            });



           }	
         }
       },

       {
        path: '/usuarios/',
        url: 'usuarios.html',
        on: {
          pageInit: function (event, page) {
            var pag = '/usuarios/';
            app.panel.close();
            listar(pag, 'listar', 'lista');  

            //verificar se possui internet


                        //FAZER O FILTRO DOS USUÁRIOS
                        var searchbar = app.searchbar.create({
                          el: '.searchbar',
                          searchContainer: '.list',
                          searchIn: '.item-title',
                          on: {
                            search(sb, query, previousQuery) {

                            }
                          }
                        });



                        


                      }   
                    }
                  },


                  {
                    path: '/cad_usuarios/',
                    url: 'cad_usuarios.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/usuarios/';
                        //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                        app.panel.close();

                        $('#foto').attr("src", url_img + 'perfil/sem-foto.jpg');

                        $('#btn-salvar').click(function(event){
                          event.preventDefault();
                          inserir(pag)
                        });

                        listar(pag, 'listarNivel', 'nivel');

                      }   
                    }
                  },



                  {
                    path: '/login/',
                    url: 'login.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/login/';

                        //DESATIVAR PAINEL MENU
                        app.panel.disableSwipe('left');
                        localStorage.setItem("id", "");
                        
                        $('#btn-login').click(function(event){
                          event.preventDefault();
                          login(pag)
                        });
                      }   
                    }
                  },


                  {
                    path: '/geo/',
                    url: 'geolocalizacao.html',
                    on: {
                      pageInit: function (event, page) {
                       app.panel.close();

                       geo();

                     }   
                   }
                 },


                 {
                  path: '/permissoes/',
                  url: 'permissoes.html',
                  on: {
                    pageInit: function (event, page) {
                      var pag = '/usuarios/';
                      app.panel.close();   



                      $('#input-todos').change(function(event){
                        app.preloader.show(); 
                        let checkbox = document.getElementById('input-todos');
                        var id = $('#id-usuario').val();                        
                        
                        if(checkbox.checked) {
                          $.ajax({
                            url: url + 'sistema/painel/paginas/usuarios/add-permissoes.php',
                            method: 'POST',
                            data: {id},


                            success:function(result){                               
                              listarId('/sistema/painel/paginas/usuarios/', 'listar-permissoes', 'permissoes', id)
                              app.preloader.hide();
                            }
                          });                               
                        } else {
                          $.ajax({
                            url: url + 'sistema/painel/paginas/usuarios/limpar-permissoes.php',
                            method: 'POST',
                            data: {id},


                            success:function(result){ 

                              listarId('/sistema/painel/paginas/usuarios/', 'listar-permissoes', 'permissoes', id)
                              app.preloader.hide();
                            }
                          }); 

                        }
                      });



                    }   
                  }
                },



                {
                  path: '/funcionarios/',
                  url: 'funcionarios.html',
                  on: {
                    pageInit: function (event, page) {
                      var pag = '/funcionarios/';
                      app.panel.close();
                      listar(pag, 'listar', 'lista');                        

                        //FAZER O FILTRO DOS USUÁRIOS
                        var searchbar = app.searchbar.create({
                          el: '.searchbar',
                          searchContainer: '.list',
                          searchIn: '.item-title',
                          on: {
                            search(sb, query, previousQuery) {

                            }
                          }
                        });



                        


                      }   
                    }
                  },



                  {
                    path: '/clientes/',
                    url: 'clientes.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/clientes/';
                        app.panel.close();
                        listar(pag, 'listar', 'lista');                        

                        //FAZER O FILTRO DOS USUÁRIOS
                        var searchbar = app.searchbar.create({
                          el: '.searchbar',
                          searchContainer: '.list',
                          searchIn: '.item-title',
                          on: {
                            search(sb, query, previousQuery) {

                            }
                          }
                        });



                        


                      }   
                    }
                  },




                  {
                    path: '/clientes_retorno/',
                    url: 'clientes_retorno.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/clientes_retorno/';
                        app.panel.close();
                        listar(pag, 'listar', 'lista');                        

                        //FAZER O FILTRO DOS USUÁRIOS
                        var searchbar = app.searchbar.create({
                          el: '.searchbar',
                          searchContainer: '.list',
                          searchIn: '.item-title',
                          on: {
                            search(sb, query, previousQuery) {

                            }
                          }
                        });



                        


                      }   
                    }
                  },



                  {
                    path: '/fornecedores/',
                    url: 'fornecedores.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/fornecedores/';
                        app.panel.close();
                        listar(pag, 'listar', 'lista');                        

                        //FAZER O FILTRO DOS USUÁRIOS
                        var searchbar = app.searchbar.create({
                          el: '.searchbar',
                          searchContainer: '.list',
                          searchIn: '.item-title',
                          on: {
                            search(sb, query, previousQuery) {

                            }
                          }
                        });                     


                      }   
                    }
                  },




                  {
                    path: '/vendas/',
                    url: 'vendas.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/vendas/';
                        app.panel.close();
                        

                        $('#dataInicial').val(inicio_mes)
                        $('#dataFinal').val(final_mes)

                        
                        listar(pag, 'listar', 'lista', '');  
                        

                      }   
                    }
                  },



                  {
                    path: '/cad_vendas/',
                    url: 'cad_vendas.html',
                    on: {
                      pageInit: function (event, page) {
                        var id_usuario = localStorage.getItem("id");
                        var pag = '/vendas/';
                        //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                        app.panel.close();

                        $('#foto').attr("src", url_img + 'contas/sem-foto.jpg');
                        $('#data_venc').val(hoje)
                        $('#id_usuario').val(id_usuario)

                        $('#btn-salvar').click(function(event){
                          event.preventDefault();
                          inserir(pag)
                        });

                        listar(pag, 'listarProd', 'produto');
                        listar(pag, 'listarClientes', 'pessoa');
                        listar(pag, 'listarPgto', 'pgto');

                         window.setTimeout(function(){
                          calcular();
                         }, 500);

                      }   
                    }
                  },




                   {
                    path: '/compras/',
                    url: 'compras.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/compras/';
                        app.panel.close();
                        

                        $('#dataInicial').val(inicio_mes)
                        $('#dataFinal').val(final_mes)

                        
                        listar(pag, 'listar', 'lista', '');  
                        

                      }   
                    }
                  },



                  {
                    path: '/cad_compras/',
                    url: 'cad_compras.html',
                    on: {
                      pageInit: function (event, page) {
                        var id_usuario = localStorage.getItem("id");
                        var pag = '/compras/';
                        //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                        app.panel.close();

                        $('#foto').attr("src", url_img + 'contas/sem-foto.jpg');
                        $('#data_venc').val(hoje)
                        $('#id_usuario').val(id_usuario)

                        $('#btn-salvar').click(function(event){
                          event.preventDefault();
                          inserir(pag)
                        });

                        listar(pag, 'listarProd', 'produto');
                        listar(pag, 'listarClientes', 'pessoa');
                        //listar(pag, 'listarPgto', 'pgto');

                        

                      }   
                    }
                  },



                  {
                    path: '/receber/',
                    url: 'receber.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/receber/';
                        app.panel.close();
                        

                        $('#dataInicial').val(inicio_mes)
                        $('#dataFinal').val(final_mes)

                        
                        listar(pag, 'listar', 'lista', '');  
                        

                      }   
                    }
                  },



                   {
                    path: '/pagar/',
                    url: 'pagar.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/pagar/';
                        app.panel.close();
                        

                        $('#dataInicial').val(inicio_mes)
                        $('#dataFinal').val(final_mes)

                        
                        listar(pag, 'listar', 'lista', '');  
                        

                      }   
                    }
                  },




                    {
                    path: '/comissoes/',
                    url: 'comissoes.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/comissoes/';
                        app.panel.close();
                        

                        $('#dataInicial').val(inicio_mes)
                        $('#dataFinal').val(final_mes)

                        
                        listar(pag, 'listar', 'lista', '');  
                        

                      }   
                    }
                  },



                     {
                    path: '/agenda/',
                    url: 'agenda.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/agenda/';
                        app.panel.close();                       

                        $('#dataInicial').val(hoje)                    

                        
                        listar(pag, 'listar', 'lista', '');  

                        

                      }   
                    }
                  },




                  {
                    path: '/cad_agenda/',
                    url: 'cad_agenda.html',
                    on: {
                      pageInit: function (event, page) {
                        var id_usuario = localStorage.getItem("id");
                        var pag = '/agenda/';
                        //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                        app.panel.close();
                        
                        $('#data-agd').val(hoje)
                        $('#id_funcionario').val(id_usuario)

                        $('#btn-salvar').click(function(event){
                          event.preventDefault();
                          inserir(pag)
                        });

                        listar(pag, 'listarServicos', 'servico');
                        listar('/vendas/', 'listarClientes', 'cliente');
                        //listar(pag, 'listarPgto', 'pgto');

                        listar(pag, 'listar-horarios', 'listar-horarios');



                      }   
                    }
                  },




                   {
                    path: '/servicos/',
                    url: 'servicos.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/servicos/';
                        app.panel.close();
                        

                        $('#dataInicial').val(hoje)
                        $('#dataFinal').val(hoje)

                        
                        listar(pag, 'listar', 'lista', '');  
                        

                      }   
                    }
                  },



                  {
                    path: '/cad_servicos/',
                    url: 'cad_servicos.html',
                    on: {
                      pageInit: function (event, page) {
                        var id_usuario = localStorage.getItem("id");
                        var pag = '/servicos/';
                        //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                        app.panel.close();

                       
                        $('#data_pgto').val(hoje)
                        $('#id_usuario').val(id_usuario)

                       
                        listar('/agenda/', 'listarServicos', 'servico');
                        listar('/vendas/', 'listarClientes', 'cliente');
                        listar('/compras/', 'listarPgto', 'pgto');



                        $('#btn-salvar').click(function(event){
                          event.preventDefault();
                          inserirDireto('/meus_servicos/', 'salvar.php', '/servicos/');
                        });

                        

                      }   
                    }
                  },



                   {
                    path: '/dias/',
                    url: 'dias.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/dias/';
                        app.panel.close(); 
                        
                        listar(pag, 'listar', 'lista', '');  
                        

                      }   
                    }
                  },



                  {
                    path: '/cad_dias/',
                    url: 'cad_dias.html',
                    on: {
                      pageInit: function (event, page) {

                        var id_usuario = localStorage.getItem("id");

                        var pag = '/dias/';
                        app.panel.close(); 
                        
                          
                        $('#id_usuario').val(id_usuario)  

                        $('#btn-salvar').click(function(event){
                          event.preventDefault();
                          inserirDireto('/funcionarios/', 'inserir-dias.php', '/dias/');
                        });

                      }   
                    }
                  },



                  {
                    path: '/horarios/',
                    url: 'horarios.html',
                    on: {
                      pageInit: function (event, page) {
                        var pag = '/horarios/';
                        app.panel.close(); 
                        
                        listar(pag, 'listar', 'lista', '');  
                        

                      }   
                    }
                  },



                  {
                    path: '/cad_horarios/',
                    url: 'cad_horarios.html',
                    on: {
                      pageInit: function (event, page) {

                        var id_usuario = localStorage.getItem("id");
                        
                        var pag = '/horarios/';
                        app.panel.close(); 
                        
                          
                        $('#id_usuario').val(id_usuario)  

                        $('#btn-salvar').click(function(event){
                          event.preventDefault();
                          inserirDireto('/funcionarios/', 'inserir-horario.php', '/horarios/');
                        });

                      }   
                    }
                  },




                  ],
    // ... other parameters
  });

var $$=Dom7;


function onDeviceReady() {	
	
  var mainView = app.views.create('.view-main', {
    url: '/index/'
  });


  let externalUserId = '123456789'; // You will supply the external user id to the OneSignal SDK
  window.plugins.OneSignal.setExternalUserId(externalUserId);

  //notificacoes
  // NOTE: Update the setAppId value below with your OneSignal AppId.
  window.plugins.OneSignal.setAppId("3f6f7a97-331c-4aa0-b646-36acce256981");
  window.plugins.OneSignal.setNotificationOpenedHandler(function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));

  });

    //Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
    window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);


    });





    document.addEventListener("backbutton", onBackKeyDown, false);


    function onBackKeyDown() {

	// variavel para pegar a rota que estamos
	var nome=app.views.main.router.url;

	
}

}



//AJAX GLOBAIS

 //ajax para listar dados
 function listar(tabela, arquivo, elemento, status){
  const dataInicial = $('#dataInicial').val()    
  const dataFinal = $('#dataFinal').val()
  var id_usuario = localStorage.getItem("id");

  $.ajax({
    url: url_api + tabela + arquivo + '.php',
    method: 'POST',
    data: {url_img, dataInicial, dataFinal, status, id_usuario },
    dataType: "html",

    success:function(result){
      //alert(result)
      $("#"+elemento).html(result);

    }
  });
}

function listarId(tabela, arquivo, elemento, id, data){  
  $.ajax({
    url: url + tabela + arquivo + '.php',
    method: 'POST',
    data: {url_img, id, data},
    dataType: "html",

    success:function(result){
      //alert(result)
      $("#"+elemento).html(result);

    }
  });
}






//click do botão salvar  
function inserir(pag){
 app.preloader.show();
 $.ajax({
  url: url_api + pag + "salvar.php",
  method: "post",
  data: $('form').serialize(),

  success: function(mensagem){
                    //alert(mensagem)
                    
                    if(mensagem.trim() === 'Salvo'){                      
                      mensagemToast('Inserido com Sucesso!!', 3000);
                      app.views.main.router.navigate(pag);
                      
                    }else{                        
                     mensagemToast(mensagem, 3000);
                   } 

                   app.preloader.hide();
                 },                
               });
}


function mensagemToast(msg, tempo){
  toastBottom = app.toast.create({
    text: msg,
    closeTimeout: tempo,
  });
  toastBottom.open();
}



function editarUsuario(id, nome, email, senha, nivel, data, foto, ativo){

 app.dialog.create({
  title: '<small>Usuário: ' + nome +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<small><b>Email:</b> ' + email + '<br> <b>Senha:</b> ' + senha + '<br> <b>Cadastrado em:</b> ' +data+' </small><br><br><center><img src="'+url_img+'perfil/'+foto+'" width="150px"></center>',
  buttons: [
  {
    text: '<span style="font-size:12px"><i class="mdi mdi-account-edit"></i>Editar</span>',
    color:'blue',
    onClick: function(){                   
     app.views.main.router.navigate('/cad_usuarios/');

     window.setTimeout(function(){
      $('#nome').val(nome);
      $('#email').val(email);
      $('#senha').val(senha);        
      $('#id').val(id);        
      $('#nivel').val(nivel).change();
      if(ativo == 'Sim'){
        $('#ativo').prop('checked', true);
      }else{
        $('#ativo').prop('checked', false);
      }
      

      $('#foto').attr('src', url_img + 'perfil/' + foto);
      $('#nome_foto').val(foto);    

    }, 100)   

   }
 },
 {
  text: '<span style="font-size:12px"><i class="mdi mdi-delete"></i>Excluir</span>',
  color:'red',
  onClick: function(){
    app.dialog.confirm('Deseja excluir o Registro ' + nome +'?', 'Excluir', function () {
     excluir(id, '/usuarios/');
   });
  }
},
{
  text: '<span style="font-size:12px"><i class="mdi mdi-lock-open"></i>Permissões</span>',
  color:'green',
  onClick: function(){
    app.views.main.router.navigate('/permissoes/');
    window.setTimeout(function(){
      $('#nome').text(nome);
      $('#id-usuario').val(id);

      listarId('/sistema/painel/paginas/usuarios/', 'listar-permissoes', 'permissoes', id)   
    }, 100)           
  }
},
],
verticalButtons: false,
}).open();


}


 //ajax para listar dados
 function excluir(id, tabela, arq, pag){
   app.preloader.show();

   if(arq === '' || arq === undefined){
    arq = 'excluir';
   }   

   $.ajax({
    url: url + 'sistema/painel/paginas/'+tabela+'/'+arq+'.php',
    method: 'POST',
    data: {id},      

    success:function(mensagem){
      if(mensagem.trim() === 'Excluído com Sucesso'){     

       mensagemToast('Excluído com Sucesso!!', 3000);

        if(pag != "" && pag != undefined){
          tabela = pag;
        }
       
       listar(tabela, 'listar', 'lista', ''); 
     }else{
      mensagemToast(mensagem, 3000);
    }

    app.preloader.hide();
  }
});

 }





 function login(pag){
   app.preloader.show();
   $.ajax({
    url: url_api + pag + "login.php",
    method: "post",
    data: $('form').serialize(),

    success: function(mensagem){                    
      var dados = JSON.parse(mensagem)                    
      var id = dados.id

      if(id > 0){                     
        localStorage.setItem("nome", dados.nome);
        localStorage.setItem("email", dados.email);
        localStorage.setItem("id", dados.id);
        localStorage.setItem("nivel", dados.nivel);
        localStorage.setItem("foto", dados.foto);

        app.views.main.router.navigate('/home/');

      }else{                        
       mensagemToast(dados.msg, 3000);
     } 

     app.preloader.hide();
   },                
 });
 }





 function cliqueImagem(pag, pasta){
   var act = app.actions.create({
    grid: true,
    buttons: [
    [
    {
      text: 'Camera',
      icon: '<img src="img/camera.png" width="48"/>',
      onClick: function () {
        camera(pag, pasta);
      }
    },
    {
      text: '',
      icon: ''
    },
    {
      text: 'Galeria',
      icon: '<img src="img/galeria.png" width="48">',
      onClick: function () {
        galeria(pag, pasta);
      }
    },
    ],

    ]
  });

   act.open();
 }


 function camera(pag, pasta) {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    saveToPhotoAlbum: true,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    correctOrientation: true,
    destinationType: Camera.DestinationType.FILE_URI
  });

                      //CASO DE SUCESSO AO TIRAR FOTO 
                      function onSuccess(imageURI) {
                        var image = document.getElementById('foto');
                        app.preloader.show();

                            // //LOCALIZAÇÃO LOCAL DA FOTO
                            //alert(imageURI);

                            //FUNÇÃO DE UPLOAD
                            function uploadFile(localPath, fileName, remoteUrl, callback) {


                                // loads local file with http GET request
                                var xhrLocal = new XMLHttpRequest()
                                xhrLocal.open('get', localPath)
                                xhrLocal.responseType = 'blob'
                                xhrLocal.onerror = () => {
                                  callback(Error('An error ocurred getting localpath on' + localPath))
                                }
                                xhrLocal.onload = () => {

                                    // when data is loaded creates a file reader to read data
                                    var fr = new FileReader()
                                    fr.onload = function (e) {
                                        // fetch the data and accept the blob
                                        console.log(e)
                                        fetch(e.target.result)
                                        .then(res => res.blob())
                                        .then((res) => {
                                                // now creates another http post request to upload the file
                                                var formData = new FormData()
                                                formData.append('file', res, fileName)
                                                // post form data
                                                const xhrRemote = new XMLHttpRequest()
                                                //xhrRemote.responseType = 'json'
                                                // log response
                                                xhrRemote.onerror = () => {
                                                  callback(Error('An error ocurred uploading the file to ' + remoteUrl))
                                                }
                                                xhrRemote.onload = () => {
                                                  if (typeof callback === 'function') {
                                                      //desativar o comentario abaixo enquanto tiver testando
                                                        //alert(xhrRemote.response);

                                                        //passar para o input nome_foto o nome da foto
                                                        $('#nome_foto').val(xhrRemote.response);
                                                        image.src = url_img + pasta + '/' + xhrRemote.response;
                                                        callback(null, 'Upload de Arquivo Realizado: ' + xhrRemote.response)
                                                      }
                                                    }

                                                // create and send the reqeust
                                                xhrRemote.open('POST', remoteUrl)
                                                xhrRemote.send(formData)
                                              })
                                      }
                                    fr.readAsDataURL(xhrLocal.response) // async call
                                  }
                                  xhrLocal.send()
                                }


                                uploadFile(imageURI,
                                  'myfile.jpg',
                                  url_api + pag + '/upload.php',
                                  (err, res) => {
                                    if (err) {
                                        //alert(err)
                                      } else {
                                        //alert(res)
                                        app.preloader.hide();
                                      }
                                    })




                              }

                              function onFail(message) {
                                alert('Falhou. Motivo: ' + message, 'FALHOU!');
                              }
                            }




                            function galeria(pag, pasta){

                             navigator.camera.getPicture(onSuccess, onFail, {
                              quality: 50,
                              saveToPhotoAlbum: true,
                              sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
                              correctOrientation: true,
                              destinationType: Camera.DestinationType.FILE_URI
                            });

                      //CASO DE SUCESSO AO TIRAR FOTO 
                      function onSuccess(imageURI) {
                        var image = document.getElementById('foto');
                        app.preloader.show();

                            // //LOCALIZAÇÃO LOCAL DA FOTO
                            //alert(imageURI);

                            //FUNÇÃO DE UPLOAD
                            function uploadFile(localPath, fileName, remoteUrl, callback) {


                                // loads local file with http GET request
                                var xhrLocal = new XMLHttpRequest()
                                xhrLocal.open('get', localPath)
                                xhrLocal.responseType = 'blob'
                                xhrLocal.onerror = () => {
                                  callback(Error('An error ocurred getting localpath on' + localPath))
                                }
                                xhrLocal.onload = () => {

                                    // when data is loaded creates a file reader to read data
                                    var fr = new FileReader()
                                    fr.onload = function (e) {
                                        // fetch the data and accept the blob
                                        console.log(e)
                                        fetch(e.target.result)
                                        .then(res => res.blob())
                                        .then((res) => {
                                                // now creates another http post request to upload the file
                                                var formData = new FormData()
                                                formData.append('file', res, fileName)
                                                // post form data
                                                const xhrRemote = new XMLHttpRequest()
                                                //xhrRemote.responseType = 'json'
                                                // log response
                                                xhrRemote.onerror = () => {
                                                  callback(Error('An error ocurred uploading the file to ' + remoteUrl))
                                                }
                                                xhrRemote.onload = () => {
                                                  if (typeof callback === 'function') {
                                                      //desativar o comentario abaixo enquanto tiver testando
                                                        //alert(xhrRemote.response);

                                                        //passar para o input nome_foto o nome da foto
                                                        $('#nome_foto').val(xhrRemote.response);
                                                        image.src = url_img + pasta + '/' + xhrRemote.response;
                                                        callback(null, 'Upload de Arquivo Realizado: ' + xhrRemote.response)
                                                      }
                                                    }

                                                // create and send the reqeust
                                                xhrRemote.open('POST', remoteUrl)
                                                xhrRemote.send(formData)
                                              })
                                      }
                                    fr.readAsDataURL(xhrLocal.response) // async call
                                  }
                                  xhrLocal.send()
                                }


                                uploadFile(imageURI,
                                  'myfile.jpg',
                                  url_api + pag + '/upload.php',
                                  (err, res) => {
                                    if (err) {
                                        //alert(err)
                                      } else {
                                        //alert(res)
                                        app.preloader.hide();
                                      }
                                    })




                              }

                              function onFail(message) {
                                alert('Falhou. Motivo: ' + message, 'FALHOU!');
                              }
                            }



                            function geo(){
                              app.preloader.show();
                              navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 3000, enableHighAccuracy: true });

                              function onSuccess (position) {
                                var latitude = position.coords.latitude;
                                var longitude = position.coords.longitude;

                                $.getJSON('https://nominatim.openstreetmap.org/reverse?format=json&lat='+latitude+'&lon='+longitude, function(res){

          //endereco completo
          $('#end_completo').text(res.display_name);

          //rua
          $("#rua").text(res.address.road);


          //rua
          $("#bairro").text(res.address.suburb);

            //cidade ver qual
            var cidade=res.address.city;
            
            if (cidade==""||cidade==null){
                //TENTAR PEGAR POR TOWN
                var cidade=res.address.town;
                
                if (cidade==""||cidade==null){
                  var cidade=res.address.village;
                }
              }

            //cidade
            $("#cidade").text(cidade);
            
            //PUXAR O ESTADO
            $("#estado").text(res.address.state);
            
            //PUXAR O PAIS
            $("#pais").text(res.address.country);

            mostrarMapa(latitude, longitude);
            

          });
                                app.preloader.hide();      
                              };

    // onError Callback receives a PositionError object
    //
    function onError(error) {                
      var erro=error.code;                
      if (erro==3){
        app.dialog.alert('Ative a localização do seu Android','<b>Localização Desativada</b>',function(){
          ativarGeolocation();
        });                    
      }
    }

  }

  function mostrarMapa(latitude, longitude) {
   var map = L.map('map').setView([latitude, longitude], 18);

   L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution:
     '© <a href="http://openstreetmap.org">OpenStreetMap</a>',
     maxZoom: 18
   }).addTo(map);

   var marker = L.marker([latitude, longitude]).addTo(map);
   var popup = marker.bindPopup('<b>Encontrado!</b><br />Você está aqui!');
   popup.openPopup();

 }






 function adicionarPermissao(idpermissao, idusuario){    
  $.ajax({
    url: url + 'sistema/painel/paginas/usuarios/add-permissao.php',
    method: 'POST',
    data: {idpermissao, idusuario},
    dataType: "html",

    success:function(result){
      listarId('/sistema/painel/paginas/usuarios/', 'listar-permissoes', 'permissoes', idusuario)
    }
  }); 
}







function editarFunc(id, nome, email, telefone, nivel, data, foto, ativo, endereco, whats){

 app.dialog.create({
  title: '<small> ' + nome +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<small><b>Email:</b> ' + email + '<br> <b>Telefone:</b><a href="#" onclick="abrirWhats('+whats+')"> ' + telefone + '</a><br> <b>Endereço:</b> ' + endereco + '<br> <b>Cadastrado em:</b> ' +data+' </small><br><br><center><img src="'+url_img+'perfil/'+foto+'" width="150px"></center>',

}).open();


}


function abrirWhats(whats){
  var link = cordova.InAppBrowser.open('http://api.whatsapp.com/send?1=pt_BR&phone='+whats+'&text=', '_system', 'location=no,zoom=no');
  link.show();
}


function editarCliente(id, nome, telefone, data, whats, cartoes, retorno){

 app.dialog.create({
  title: '<small> ' + nome +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<small><b>Telefone:</b><a href="#" onclick="abrirWhats('+whats+')"> ' + telefone + '</a><br> <b>Cadastrado em:</b> ' +data+' <br> <b>Cartões:</b> ' +cartoes+'  <br> <b>Data Retorno:</b> ' +retorno+ '</small>',

}).open();

}


function editarClienteRetorno(id, nome, telefone, data, whats, cartoes, retorno, dias, url){

 app.dialog.create({
  title: '<small> ' + nome +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<small><b>Telefone:</b><a href="#" onclick="alertarCliente('+whats+', \''+dias+'\', \''+url+'\', '+id+', \''+nome+'\')"> ' + telefone + '</a><br> <b>Cadastrado em:</b> ' +data+' <br> <b>Cartões:</b> ' +cartoes+'  <br> <b>Data Retorno:</b> ' +retorno+ '</small>',

}).open();

}


function alertarCliente(whats, dias, url, id, nome){
 // alert(id) 

 $.ajax({
  url: url_api + "clientes_retorno/alertar.php",
  method: 'POST',
  data: {id},
  dataType: "html",

  success:function(result){

   listar('/clientes_retorno/', 'listar', 'lista'); 
 }
}); 

 var link = cordova.InAppBrowser.open('http://api.whatsapp.com/send?1=pt_BR&phone='+whats+'&text=Olá '+nome+', já faz '+dias+' dias que você não vem dar um trato no visual, caso queira fazer um novo agendamento é só acessar nosso site '+url+', será um prazer atendê-lo novamente!!', '_system', 'location=no,zoom=no');
 link.show();
}




function editarForn(id, nome, telefone, data, whats, tipo_chave, chave_pix, endereco){

 app.dialog.create({
  title: '<small> ' + nome +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<small><b>Telefone:</b><a href="#" onclick="abrirWhats('+whats+')"> ' + telefone + '</a><br> <b>Cadastrado em:</b> ' +data+' <br> <b>Endereço:</b> ' +endereco+' <br> <b>Tipo Chave:</b> ' +tipo_chave+' <br> <b>Chave Pix:</b> ' +chave_pix+' <br> </small>',

}).open();

}


function filtro(filtro, pag){                           
  listar(pag, 'listar', 'lista', filtro);
}



function editarVendas(id, descricao, valor, pessoa, venc, pgto, tumb, usu_lanc, usu_baixa, link, ext, ocultar){
  var dir;
  var id_usuario = localStorage.getItem("id");

  if(ext == 'pdf' || ext == 'rar' || ext == 'zip'){
   dir = '_system';
  }else{
   dir = '_blank';
  }
app.dialog.create({
  title: '<small>' + descricao +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<small><b>Valor R$:</b> ' + valor + '<br> <b>Cliente:</b> ' + pessoa + '<br> <b>Vencimento:</b> ' +venc+' <br> <b>Pagamento:</b> ' +pgto+' <br> <b>Usuário Baixa:</b> ' +usu_baixa+' <br> <b>Usuário Venda:</b> ' +usu_lanc+' </small><br><br><center><a href="#" onclick="abrirLink(\''+url_img+'contas/'+link+'\', \''+dir+'\')"><img src="'+url_img+'contas/'+tumb+'" width="150px"></a></center>',
  buttons: [
  
 {
  text: '<span style="font-size:12px"><i class="mdi mdi-delete"></i>Excluir</span>',
  color:'red',
  onClick: function(){
    app.dialog.confirm('Deseja excluir o Registro ' + descricao +'?', 'Excluir', function () {
     excluir(id, '/vendas/');
   });
  }
},
{
  text: '<span style="font-size:12px; display:'+ocultar+'" ><i class="mdi mdi-currency-usd"></i>Baixar</span>',
  color:'green',
  onClick: function(){    
    app.dialog.confirm('Confirmar Pagamento da venda ' + descricao +'?', 'Baixar', function () {
     baixar(id, id_usuario, '/vendas/'); 
   });
        
  }
},
],
verticalButtons: false,
}).open();


}





function editarCompras(id, descricao, valor, pessoa, venc, pgto, tumb, usu_lanc, usu_baixa, link, ext, ocultar){
  var dir;
  var id_usuario = localStorage.getItem("id");

  if(ext == 'pdf' || ext == 'rar' || ext == 'zip'){
   dir = '_system';
  }else{
   dir = '_blank';
  }
app.dialog.create({
  title: '<small>' + descricao +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<small><b>Valor R$:</b> ' + valor + '<br> <b>Fornecedor:</b> ' + pessoa + '<br> <b>Vencimento:</b> ' +venc+' <br> <b>Pagamento:</b> ' +pgto+' <br> <b>Usuário Baixa:</b> ' +usu_baixa+' <br> <b>Usuário Compra:</b> ' +usu_lanc+' </small><br><br><center><a href="#" onclick="abrirLink(\''+url_img+'contas/'+link+'\', \''+dir+'\')"><img src="'+url_img+'contas/'+tumb+'" width="150px"></a></center>',
  buttons: [
  
 {
  text: '<span style="font-size:12px"><i class="mdi mdi-delete"></i>Excluir</span>',
  color:'red',
  onClick: function(){
    app.dialog.confirm('Deseja excluir o Registro ' + descricao +'?', 'Excluir', function () {
     excluir(id, '/compras/');
   });
  }
},
{
  text: '<span style="font-size:12px; display:'+ocultar+'" ><i class="mdi mdi-currency-usd"></i>Baixar</span>',
  color:'green',
  onClick: function(){    
    app.dialog.confirm('Confirmar Pagamento da venda ' + descricao +'?', 'Baixar', function () {
     baixar(id, id_usuario, '/compras/'); 
   });
        
  }
},
],
verticalButtons: false,
}).open();


}



function abrirLink(lk, dir){
   var link = cordova.InAppBrowser.open(lk, dir, 'location=no,zoom=no');
  link.show();
}


function baixar(id, id_usuario, pag){
   app.preloader.show();
  $.ajax({
    url: url_api + pag + "baixar.php",
    method: 'POST',
    data: {id, id_usuario},      

    success:function(mensagem){
      if(mensagem.trim() === 'Baixado com Sucesso'){     

       mensagemToast('Baixado com Sucesso!!', 3000);
       
       listar(pag, 'listar', 'lista', ''); 
     }else{
      mensagemToast(mensagem, 3000);
    }

    app.preloader.hide();
  }
});
}



function calcular(){

    var quant = $('#quantidade').val();
    var produto = $('#produto').val();

    $.ajax({
        url: url + 'sistema/painel/paginas/vendas/calcular.php',
        method: 'POST',
        data: {produto, quant},
        dataType: "text",

        success: function (mensagem) {  

           $('#valor').val(mensagem)
        },      

    });
}






function editarReceber(id, descricao, valor, pessoa, venc, pgto, tumb, usu_lanc, usu_baixa, link, ext, ocultar, classe_whats, telefone, whats){
  var dir;
  var id_usuario = localStorage.getItem("id");

  if(ext == 'pdf' || ext == 'rar' || ext == 'zip'){
   dir = '_system';
  }else{
   dir = '_blank';
  }
app.dialog.create({
  title: '<small>' + descricao +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<small><b>Valor R$:</b> ' + valor + '<br> <b>Cliente:</b> ' + pessoa + '<br> <b>Telefone:</b><a href="#" onclick="abrirWhats('+whats+')" style="color:'+classe_whats+'"> ' + telefone + '</a> <br> <b>Vencimento:</b> ' +venc+' <br> <b>Pagamento:</b> ' +pgto+' <br> <b>Usuário Baixa:</b> ' +usu_baixa+' <br> <b>Usuário Venda:</b> ' +usu_lanc+' </small><br><br><center><a href="#" onclick="abrirLink(\''+url_img+'contas/'+link+'\', \''+dir+'\')"><img src="'+url_img+'contas/'+tumb+'" width="150px"></a></center>',
  buttons: [
  
 {
  text: '<span style="font-size:12px"><i class="mdi mdi-delete"></i>Excluir</span>',
  color:'red',
  onClick: function(){
    app.dialog.confirm('Deseja excluir o Registro ' + descricao +'?', 'Excluir', function () {
     excluir(id, '/receber/');
   });
  }
},
{
  text: '<span style="font-size:12px; display:'+ocultar+'" ><i class="mdi mdi-currency-usd"></i>Baixar</span>',
  color:'green',
  onClick: function(){    
    app.dialog.confirm('Confirmar Pagamento da venda ' + descricao +'?', 'Baixar', function () {
     baixar(id, id_usuario, '/receber/'); 
   });
        
  }
},
],
verticalButtons: false,
}).open();


}








function editarPagar(id, descricao, valor, pessoa, venc, pgto, tumb, usu_lanc, usu_baixa, link, ext, ocultar, classe_whats, telefone, whats, nome_func, chave){
  var dir;
  var id_usuario = localStorage.getItem("id");

  if(ext == 'pdf' || ext == 'rar' || ext == 'zip'){
   dir = '_system';
  }else{
   dir = '_blank';
  }
app.dialog.create({
  title: '<small>' + descricao +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<div class="page-content"><small><b>Valor R$:</b> ' + valor + '<br> <b>Fornecedor:</b> ' + pessoa + '<br> <b>Funcionário:</b> ' + nome_func + '<br>  ' + chave + '<br> <b>Telefone:</b><a href="#" onclick="abrirWhats('+whats+')" style="color:'+classe_whats+'"> ' + telefone + '</a> <br> <b>Vencimento:</b> ' +venc+' <br> <b>Pagamento:</b> ' +pgto+' <br> <b>Usuário Baixa:</b> ' +usu_baixa+' <br> <b>Usuário Venda:</b> ' +usu_lanc+' </small><br><br><center><a href="#" onclick="abrirLink(\''+url_img+'contas/'+link+'\', \''+dir+'\')"><img src="'+url_img+'contas/'+tumb+'" width="150px"></a></center></div>',
  buttons: [
  
 {
  text: '<span style="font-size:12px"><i class="mdi mdi-delete"></i>Excluir</span>',
  color:'red',
  onClick: function(){
    app.dialog.confirm('Deseja excluir o Registro ' + descricao +'?', 'Excluir', function () {
     excluir(id, '/pagar/');
   });
  }
},
{
  text: '<span style="font-size:12px; display:'+ocultar+'" ><i class="mdi mdi-currency-usd"></i>Baixar</span>',
  color:'green',
  onClick: function(){    
    app.dialog.confirm('Confirmar Pagamento da venda ' + descricao +'?', 'Baixar', function () {
     baixar(id, id_usuario, '/pagar/'); 
   });
        
  }
},
],
verticalButtons: false,
}).open();


}







function editarComissoes(id, descricao, valor, pessoa, venc, pgto, tumb, usu_lanc, usu_baixa, link, ext, ocultar, telefone, whats, nome_func, servico, data_lanc){
    
app.dialog.create({
  title: '<small>' + descricao +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<div class="page-content"><small><b>Valor R$:</b> ' + valor + '<br> <b>Cliente:</b> ' + pessoa + '</a> <br> <b>Vencimento:</b> ' +venc+' <br> <b>Pagamento:</b> ' +pgto+' <br> <b>Usuário Baixa:</b> ' +usu_baixa+' <br> <b>Usuário Lançou:</b> ' +usu_lanc+' <br> <b>Data Serviço:</b> ' +data_lanc+' </small></div>',
  
}).open();


}







function editarAgenda(id, usuario, cliente, hora, data, obs, status, nome_serv, id_cliente, id_serv, id_func, valor_serv, ocultar){
  
  var id_usuario = localStorage.getItem("id");
  
app.dialog.create({
  title: '<small>' + hora + ' : ' + nome_serv +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<div class="page-content"><small><b>Cliente :</b> ' + cliente + '<br> <b>Agendado Por:</b> ' + usuario + '<br> <b>Data:</b> ' + data + '<br> <b>Status:</b> ' +status+ '<br> <b>Obs:</b> ' +obs+' </center></div>',
  buttons: [
  
 {
  text: '<span style="font-size:12px"><i class="mdi mdi-delete"></i>Excluir</span>',
  color:'red',
  onClick: function(){
    app.dialog.confirm('Deseja excluir o Registro ' + hora +'?', 'Excluir', function () {
     excluir(id, '/agenda/');
   });
  }
},
{
  text: '<span style="font-size:12px; display:'+ocultar+'" ><i class="mdi mdi-check"></i>Finalizar</span>',
  color:'green',
  onClick: function(){    
   finalizarServico(id, id_cliente, nome_serv, valor_serv, id_serv, id_func, cliente); 
    listar('/agenda/', 'listarFunc', 'func');
    listar('/compras/', 'listarPgto', 'pgto'); 
    window.setTimeout(function(){
    $('#func').val(id_func).change();
    $('#valor').val(valor_serv); 
    $('#data_pgto').val(hoje); 
    $('#id_agd').val(id); 
    $('#cliente_agd').val(id_cliente); 
    $('#servico_agd').val(id_serv); 
    $('#descricao_serv_agd').val(nome_serv);   
    $('#id_usuario').val(id_usuario);   
  }, 200)
  }
},
],
verticalButtons: false,
}).open();


}


function finalizarServico(id_agd, id_cliente, nome_serv, valor_serv, id_serv, id_func, nome_cli){
  app.dialog.create({
  title: '<small>' + nome_serv + ' - ' + nome_cli + '</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<div class="" >'+
      '<form>'+
        '<div class="list no-hairlines-md" style="margin:-15px">'+
          '<ul>'+

           ' <li class="item-content item-input">'+
             ' <div class="item-inner">'+
               ' <div class="item-title item-label">Funcionário</div>'+
                '<div class="item-input-wrap input-dropdown-wrap">'+
                 ' <select name="funcionario_agd" id="func" style="font-size:12px" onchange="">'+

                  '</select>'+
                '</div>'+
              '</div>'+
            '</li>'+

            '<div class="row">'+
            '<div class="col-50">'+
            '<li class="item-content item-input">'+            
                  '<div class="item-inner">'+
                    '<div class="item-title item-label">Valor</div>'+
                    '<div class="item-input-wrap">'+
                     '<input style="font-size:12px" type="text" name="valor_serv_agd" placeholder="Valor Serviço" id="valor"/>'+
                      '<span class="input-clear-button"></span>'+
                   '</div>'+
                  '</div>'+
                '</li>'+
              '</div>'+


               '<div class="col-50">'+
            '<li class="item-content item-input">'+            
                  '<div class="item-inner">'+
                    '<div class="item-title item-label">Data PGTO</div>'+
                    '<div class="item-input-wrap">'+
                     '<input style="font-size:12px" type="date" name="data_pgto"  id="data_pgto"/>'+
                      '<span class="input-clear-button"></span>'+
                   '</div>'+
                  '</div>'+
                '</li>'+
              '</div>'+

              '</div>'+


               ' <li class="item-content item-input">'+
             ' <div class="item-inner">'+
               ' <div class="item-title item-label">Forma PGTO</div>'+
                '<div class="item-input-wrap input-dropdown-wrap">'+
                 ' <select name="pgto" id="pgto" style="font-size:12px" onchange="">'+

                  '</select>'+
                '</div>'+
              '</div>'+
            '</li>'+


            '<li class="item-content item-input">'+            
                  '<div class="item-inner">'+
                    '<div class="item-title item-label">Observações</div>'+
                    '<div class="item-input-wrap">'+
                     '<input style="font-size:12px" type="text" name="obs" placeholder="Observações" id="obs"/>'+
                      '<span class="input-clear-button"></span>'+
                   '</div>'+
                  '</div>'+
                '</li>'+
           

          '</ul>'+
        '</div>  '+ 

        '<input type="hidden" name="id_agd" id="id_agd">'+  
          '<input type="hidden" name="cliente_agd" id="cliente_agd">'+  
          '<input type="hidden" name="servico_agd" id="servico_agd">'+ 
          '<input type="hidden" name="descricao_serv_agd" id="descricao_serv_agd">'+  
           '<input type="hidden" name="id_usuario" id="id_usuario">'+     

        '<button type="button" style="margin-top:10px" onclick="inserirServico()" class="button button-fill primario" id="btn-salvar">Salvar</button>'+

      '</form>'+
   ' </div>',
  
}).open();
}


function inserirServico(){
    app.preloader.show();

    var id_usuario = localStorage.getItem("id");

    var funcionario_agd = $('#func').val();
    var valor_serv_agd = $('#valor').val(); 
    var data_pgto = $('#data_pgto').val(); 
    var id_agd = $('#id_agd').val(); 
    var cliente_agd = $('#cliente_agd').val(); 
    var servico_agd = $('#servico_agd').val(); 
    var descricao_serv_agd = $('#descricao_serv_agd').val();   
    var obs = $('#obs').val(); 
    var pgto = $('#pgto').val(); 
       

 $.ajax({
  url: url + 'sistema/painel/paginas/agenda/inserir-servico.php',
  method: "post",
  data: {funcionario_agd, valor_serv_agd, data_pgto, id_agd, cliente_agd, servico_agd, descricao_serv_agd, obs, pgto, id_usuario},

  success: function(mensagem){                    //alert(mensagem)
                    
                    if(mensagem.trim() === 'Salvo com Sucesso'){                      
                      mensagemToast('Inserido com Sucesso!!', 3000);
                      app.dialog.close();
                      listar('/agenda/', 'listar', 'lista', ''); 
                      
                    }else{                        
                     mensagemToast(mensagem, 3000);
                   } 

                   app.preloader.hide();
                 },                
               });
}


function inserirDireto(pag, nome_arquivo, nav){
  app.preloader.show();
 $.ajax({
  url: url + 'sistema/painel/paginas' + pag + nome_arquivo,
  method: "post",
  data: $('form').serialize(),

  success: function(mensagem){
                    //alert(mensagem)
                    
                    if(mensagem.trim() === 'Salvo com Sucesso'){                      
                      mensagemToast('Inserido com Sucesso!!', 3000);
                      app.views.main.router.navigate(nav);
                      
                    }else{                        
                     mensagemToast(mensagem, 3000);
                   } 

                   app.preloader.hide();
                 },                
               });
}



function mudarData(){
    var dataInicial = $('#data-agd').val(); 
     var id_usuario = localStorage.getItem("id");   
     $.ajax({
    url: url_api +'agenda/listar-horarios.php',
    method: 'POST',
    data: {dataInicial, id_usuario },
    dataType: "html",

    success:function(result){
      //alert(result)
      $("#listar-horarios").html(result);

    }
  });
  }






function editarServicos(id, descricao, valor, pessoa, venc, pgto, tumb, usu_lanc, usu_baixa, link, ext, ocultar, pgto){
 
  var id_usuario = localStorage.getItem("id");
 
app.dialog.create({
  title: '<small>' + descricao +'</small> <a href="#" onclick="app.dialog.close();"><span style="position:absolute; top:10px; right:10px"> x </span></a>',
  text: '<small><b>Valor R$:</b> ' + valor + '<br> <b>Cliente:</b> ' + pessoa + '<br> <b>Vencimento:</b> ' +venc+' <br> <b>Pagamento:</b> ' +pgto+' <br> <b>Usuário Baixa:</b> ' +usu_baixa+' <br> <b>Usuário Serviço:</b> ' +usu_lanc+' <br> <b>Forma de PGTO:</b> ' +pgto+' </small>',
  buttons: [
  
 {
  text: '<span style="font-size:12px"><i class="mdi mdi-delete"></i>Excluir</span>',
  color:'red',
  onClick: function(){
    app.dialog.confirm('Deseja excluir o Registro ' + descricao +'?', 'Excluir', function () {
      excluir(id, '/meus_servicos/', '', '/servicos/');
   });
  }
},
{
  text: '<span style="font-size:12px; display:'+ocultar+'" ><i class="mdi mdi-currency-usd"></i>Baixar</span>',
  color:'green',
  onClick: function(){    
    app.dialog.confirm('Confirmar Pagamento da venda ' + descricao +'?', 'Baixar', function () {
     baixar(id, id_usuario, '/servicos/'); 
   });
        
  }
},
],
verticalButtons: false,
}).open();


}





function editarDias(id, dia){
 
  var id_usuario = localStorage.getItem("id");
 
 app.dialog.confirm('Deseja excluir o Registro ' + dia +'?', 'Excluir', function () {     
    excluir(id, '/funcionarios/', 'excluir-dias', '/dias/');
   });


}




function editarHorarios(id, hora){
 
  var id_usuario = localStorage.getItem("id");
 
 app.dialog.confirm('Deseja excluir o Registro ' + hora +'?', 'Excluir', function () {     
    excluir(id, '/funcionarios/', 'excluir-horarios', '/horarios/');
   });


}


function redirecionarPag(pag){
  var data = $('#dataInicial').val();
  window.setTimeout(function(){    
    $('#data-agd').val(data);   
  }, 200)
  app.views.main.router.navigate(pag); 
}
