<?php
  //header('Content-Type: application/json');

  //echo json_decode("This is php!!");
  echo file_get_contents('php://input');
  echo json_decode(file_get_contents('php://input'), true);