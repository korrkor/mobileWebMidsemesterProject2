<?php

include("gen.php");

$cmd = get_datan("cmd");
switch ($cmd)
{
    case 1:
        add_participant();
        break;

    case 2:
        get_participants();
        break;

    case 3:
        admin_login();
        break;

    default:
        echo "{";
        echo jsonn("result", 0) . ",";
        echo jsons("message", "unknown command");
        echo "}";
}

function admin_login()
{
    include_once './participant_class.php';
    $obj = new participant_class();

    $user_name = get_data("user_name");
    $password = get_data("password");
    if ($obj->loginAdmin($user_name, $password))
    {
        echo "{";
        echo jsonn("result", 1) . ",";
        echo jsons("message", "added");
        echo "}";
        return;
    }
    else
    {
        echo "{";
        echo jsonn("result", 0) . ",";
        echo jsons("message", "not added");
        echo "}";
        return;
    }
}

function get_participants()
{
    include_once './participant_class.php';
    $obj = new participant_class();
    $obj->get_all_participant();
    $row = $obj->fetch();

    $participants = array();


    while ($row)
    {
        $row_array['name'] = $row["name"];
        $row_array['email'] = $row["email"];
        $row_array['number'] = $row["phone_number"];

        array_push($participants, $row_array);
        $row = $obj->fetch();
    }

//   return $location;
    print_r(json_encode($participants));
}

function add_participant()
{
    include_once './participant_class.php';
    $obj = new participant_class();
    $name = get_data("name");
    $email = get_data("email");
    $number = get_datan("number");
//    $event = get_datan("event");
//    $certainty = get_datan("certainty");

    if ($obj->add_participant($name, $number, $email))
    {
        echo "{";
        echo jsonn("result", 1) . ",";
        echo jsons("message", "added");
        echo "}";
    }
    else
    {
        echo "{";
        echo jsonn("result", 0) . ",";
        echo jsons("message", "did not add");
        echo "}";
    }
}

?>