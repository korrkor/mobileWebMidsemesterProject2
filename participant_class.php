<?php

include_once("adb.php");

class participant_class extends adb {

    function participant_class()
    {
        adb::adb();
    }

   
    function get_all_participant()
    {
        $query = "Select * from participants";          
//                      print $query;
        return $this->query($query);
    }

    function loginAdmin($username,$password)
    {
        $query="Select count(*) as c from admin_participant where user_name = '$username' and password='$password' ";
//     print $query;  
         $this->query($query);
         $result = $this->fetch();
      if ($result['c'] == 1) {  
         return true;
      } else {
         return false;
      }
        return $this->query($query);
    }


    
    function add_participant($name,$phone_number,$email)
    {
        $query = "Insert into participants (name,phone_number,email) values ('$name',$phone_number,'$email')";          
//                      print $query;
        return $this->query($query);
    }

}

?>