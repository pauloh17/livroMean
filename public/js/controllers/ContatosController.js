angular.module('contatooh').controller('ContatosController',function($scope, Contato) {
	$scope.contatos = []
	//$scope.total = 0;
	$scope.filtro = ''
	$scope.incrementa = function() {
	//	$scope.total++;
	}
	
	$scope.mensagem = {texto: ''}

	function buscaContatos() {
		Contato.query(
			function(contatos) {
				$scope.contatos = contatos
				$scope.mensagem = {}
			},
			function(erro) {
				console.log(erro)
				$scope.mensagem = {texto: 'Não foi possível obter a lista'}
			}
		)
	}
	buscaContatos()


	$scope.remove = function(contato) {
		Contato.delete({id: contato._id},
			buscaContatos,
			function(erro) {
				$scope.mensagem = {
					texto: 'Não foi possível remover o contato'
				}
			}
		)
	}
})