<?php 
require_once("../conexao.php");

//buscar o total de usuarios
$query = $pdo->query("SELECT * FROM usuarios");
$res = $query->fetchAll(PDO::FETCH_ASSOC);
$total_usuarios = @count($res);


$dados = array(
	'total_usuarios' => $total_usuarios,
	
);

$result = json_encode($dados);
echo $result;



?>